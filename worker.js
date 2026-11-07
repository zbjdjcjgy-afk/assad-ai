// Cloudflare Worker: the API key stays server-side and is never sent to the browser.
const cors = (origin, allowed) => ({
  "Access-Control-Allow-Origin": origin === allowed && allowed ? origin : "null",
  "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
  "Access-Control-Allow-Headers": "Content-Type",
  "Vary": "Origin"
});
export default {
  async fetch(request, env) {
    const origin=request.headers.get("Origin")||"", allowed=env.ALLOWED_ORIGIN||"", headers=cors(origin,allowed), url=new URL(request.url);
    if(request.method==="OPTIONS") return new Response(null,{status:origin===allowed&&allowed?204:403,headers});
    if(request.method==="GET"&&url.pathname==="/health") return Response.json({ok:true,service:"ASSAD AI API"},{headers});
    if(request.method!=="POST"||url.pathname!=="/api/chat") return Response.json({error:"Not found"},{status:404,headers});
    if(!allowed||origin!==allowed) return Response.json({error:"Origin not allowed"},{status:403});
    if(!env.OPENAI_API_KEY) return Response.json({error:"API key is not configured"},{status:503,headers});
    let body;try{body=await request.json()}catch{return Response.json({error:"Invalid JSON"},{status:400,headers})}
    if(!Array.isArray(body.messages)||body.messages.length<1||body.messages.length>20) return Response.json({error:"Send 1 to 20 messages"},{status:400,headers});
    const input=[];
    for(const m of body.messages){
      if(!m||!["user","assistant"].includes(m.role)||typeof m.content!=="string"||!m.content.trim()||m.content.length>4000) return Response.json({error:"Invalid message"},{status:400,headers});
      input.push({role:m.role,content:[{type:m.role==="assistant"?"output_text":"input_text",text:m.content.trim()}]});
    }
    let upstream;
    try{upstream=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Authorization":"Bearer "+env.OPENAI_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({model:env.OPENAI_MODEL||"gpt-6-astra",instructions:"You are ASSAD, a friendly and practical multilingual assistant. Reply in the user's language. Explain clearly, turn goals into realistic steps, ask one concise question when needed, be honest about uncertainty, and never promise financial success or claim actions you did not perform.",input,max_output_tokens:1200})})}
    catch{return Response.json({error:"AI provider connection failed"},{status:502,headers})}
    const data=await upstream.json().catch(()=>({}));
    if(!upstream.ok)return Response.json({error:"AI provider request failed",provider_status:upstream.status},{status:502,headers});
    let reply=typeof data.output_text==="string"?data.output_text:"";
    if(!reply&&Array.isArray(data.output))for(const item of data.output)if(item.type==="message"&&Array.isArray(item.content))reply+=item.content.filter(x=>x.type==="output_text").map(x=>x.text||"").join("");
    if(!reply.trim())return Response.json({error:"Empty AI response"},{status:502,headers});
    return Response.json({reply:reply.trim()},{headers});
  }
};
