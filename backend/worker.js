// ==========================================
// ASSAD AI - SECURE CLOUDFLARE WORKER
// ==========================================

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

    // Handle browser preflight requests
    if (request.method === "OPTIONS") {
      if (!allowedOrigin || origin !== allowedOrigin) {
        return new Response(null, { status: 403, headers });
      }

      return new Response(null, {
        status: 204,
        headers
      });
    }

    // Health check
    if (request.method === "GET" && url.pathname === "/health") {
      return jsonResponse({
        ok: true,
        service: "ASSAD AI API",
        status: "online"
      }, 200, headers);
    }

    // Only allow the chat endpoint
    if (request.method !== "POST" || url.pathname !== "/api/chat") {
      return jsonResponse({
        error: "Endpoint not found"
      }, 404, headers);
    }

    // Check website origin
    if (!allowedOrigin || origin !== allowedOrigin) {
      return jsonResponse({
        error: "Origin not allowed"
      }, 403, headers);
    }

    // Check API configuration
    if (!env.OPENAI_API_KEY) {
      return jsonResponse({
        error: "API key is not configured"
      }, 503, headers);
    }

    const model = env.OPENAI_MODEL || "gpt-6-astra";

    let body;

    try {
      body = await request.json();
    } catch {
      return jsonResponse({
        error: "Invalid JSON request"
      }, 400, headers);
    }

    // Validate messages
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

    const messages = [];

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

      // Responses API accepts previous assistant messages
      // as ordinary text input messages.
      messages.push({
        role: message.role,
        content: message.content.trim()
      });
    }

    // Send request to OpenAI
    let response;

    try {
      response = await fetch(
        "https://api.openai.com/v1/responses",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model,
            instructions:
              "You are ASSAD, a helpful, intelligent and practical multilingual AI assistant. " +
              "Reply in the same language as the user. " +
              "Help users turn ideas into realistic plans and clear steps. " +
              "Be friendly, professional and easy to understand. " +
              "Ask one short question when essential information is missing. " +
              "Never promise financial success or claim actions you did not perform.",
            input: messages,
            max_output_tokens: 1200
          })
        }
      );
    } catch (error) {
      return jsonResponse({
        error: "Could not connect to the AI provider"
      }, 502, headers);
    }

    // Read provider response
    let data;

    try {
      data = await response.json();
    } catch {
      return jsonResponse({
        error: "Invalid response from AI provider"
      }, 502, headers);
    }

    if (!response.ok) {
      return jsonResponse({
        error: "AI provider request failed",
        provider_status: response.status
      }, 502, headers);
    }

    // Extract assistant text
    let reply = "";

    if (Array.isArray(data.output)) {
      for (const item of data.output) {
        if (
          item.type === "message" &&
          item.role === "assistant" &&
          Array.isArray(item.content)
        ) {
          for (const part of item.content) {
            if (part.type === "output_text") {
              reply += part.text || "";
            }
          }
        }
      }
    }

    if (!reply.trim()) {
      return jsonResponse({
        error: "The AI returned an empty response"
      }, 502, headers);
    }

    // Return the answer to the website
    return jsonResponse({
      reply: reply.trim()
    }, 200, headers);
  }
};
