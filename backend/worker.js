
// ==========================================
// ASSAD AI - CLOUDFLARE WORKERS AI
// ==========================================

const MODEL = "@cf/zai-org/glm-4.7-flash";

const corsHeaders = (origin, allowedOrigin) => {
  const allowed = origin === allowedOrigin && allowedOrigin;

  return {
    "Access-Control-Allow-Origin": allowed ? origin : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
};

const jsonResponse = (data, status, headers) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...headers,
      "Content-Type": "application/json; charset=utf-8"
    }
  });
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = env.ALLOWED_ORIGIN || "";
    const headers = corsHeaders(origin, allowedOrigin);

    // OPTIONS
    if (request.method === "OPTIONS") {
      if (!allowedOrigin || origin !== allowedOrigin) {
        return new Response(null, { status: 403, headers });
      }

      return new Response(null, { status: 204, headers });
    }

    // Health check
    if (request.method === "GET" && url.pathname === "/health") {
      return jsonResponse({
        ok: true,
        service: "ASSAD AI API",
        provider: "Cloudflare Workers AI",
        status: "online"
      }, 200, headers);
    }

    // Chat endpoint
    if (request.method !== "POST" || url.pathname !== "/api/chat") {
      return jsonResponse({
        error: "Endpoint not found"
      }, 404, headers);
    }

    // Check origin
    if (!allowedOrigin || origin !== allowedOrigin) {
      return jsonResponse({
        error: "Origin not allowed"
      }, 403, headers);
    }

    // Check AI binding
    if (!env.AI) {
      return jsonResponse({
        error: "Workers AI binding is not configured"
      }, 503, headers);
    }

    // Read request
    let body;

    try {
      body = await request.json();
    } catch {
      return jsonResponse({
        error: "Invalid JSON request"
      }, 400, headers);
    }

    if (
      !body ||
      !Array.isArray(body.messages) ||
      body.messages.length < 1 ||
      body.messages.length > 20
    ) {
      return jsonResponse({
        error: "Send between 1 and 20 messages"
      }, 400, headers);
    }

    // System instructions
    const messages = [{
      role: "system",
      content:
        "You are ASSAD, a helpful, intelligent and practical multilingual AI assistant. " +
        "Reply in the same language as the user. " +
        "Help users turn ideas into realistic plans and clear steps. " +
        "Be friendly, professional and easy to understand. " +
        "Ask one short question when essential information is missing. " +
        "Never promise financial success or claim actions you did not perform."
    }];

    // Validate messages
    for (const message of body.messages) {
      if (
        !message ||
        !["user", "assistant"].includes(message.role) ||
        typeof message.content !== "string" ||
        !message.content.trim() ||
        message.content.length > 4000
      ) {
        return jsonResponse({
          error: "Invalid message format"
        }, 400, headers);
      }

      messages.push({
        role: message.role,
        content: message.content.trim()
      });
    }

    // Run AI
    try {
      const result = await env.AI.run(MODEL, {
        messages,
        max_tokens: 1200,
temperature: 0.6,
reasoning_effort: null,
chat_template_kwargs: {
  enable_thinking: false
}
      });

      // Extract visible answer
      let reply = "";

      if (typeof result === "string") {
        reply = result;

      } else if (typeof result?.response === "string") {
        reply = result.response;

      } else if (typeof result?.result?.response === "string") {
        reply = result.result.response;

      } else if (
        Array.isArray(result?.choices) &&
        typeof result.choices[0]?.message?.content === "string"
      ) {
        reply = result.choices[0].message.content;
      }

      // Empty response handling
      if (!reply.trim()) {
        console.error(
          "Workers AI returned an empty response:",
          result
        );

        return jsonResponse({
          error: "The AI returned an empty response"
        }, 502, headers);
      }

      // Successful response
      return jsonResponse({
        reply: reply.trim()
      }, 200, headers);

    } catch (error) {
      console.error(
        "Workers AI error:",
        error?.message || error
      );

      return jsonResponse({
        error: "AI provider request failed"
      }, 502, headers);
    }
  }
};
