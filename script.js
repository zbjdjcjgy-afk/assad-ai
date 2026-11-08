/* =========================================
   ASSAD AI - MAIN APPLICATION
   ========================================= */

const API_URL = "https://assad-ai-api.zbjdjcjgy.workers.dev/api/chat";

const $ = (selector) => document.querySelector(selector);

const state = {
  language: localStorage.getItem("assad_language") || "ar",
  agent: localStorage.getItem("assad_agent") || "general",
  conversations: [],
  currentConversationId: null,
  isWaiting: false,
  workspace: JSON.parse(localStorage.getItem("assad_workspace") || "[]")
};

const translations = {
  ar: {
    newChat: "محادثة جديدة",
    clear: "مسح المحادثة",
    send: "إرسال",
    placeholder: "اكتب رسالتك إلى ASSAD...",
    thinking: "أسد يفكر...",
    copied: "تم نسخ الإجابة",
    copy: "نسخ",
    error: "تعذر الاتصال بالمساعد حالياً. تحقق من الاتصال وحاول مجدداً.",
    empty: "مرحباً! أنا ASSAD، كيف يمكنني مساعدتك؟",
    general: "المساعد العام",
    coding: "البرمجة",
    planning: "التخطيط",
    research: "البحث والتحليل",
    writing: "الكتابة",
    history: "سجل المحادثات",
    workspace: "مساحة العمل",
    creative: "الاستوديو الإبداعي",
    taskPlaceholder: "اكتب مهمة جديدة...",
    addTask: "إضافة مهمة",
    delete: "حذف",
    imagePrompt: "برومبت صورة",
    videoPrompt: "برومبت فيديو",
    post: "منشور",
    idea: "فكرة محتوى",
    generate: "إنشاء",
    result: "النتيجة",
    language: "اللغة",
    user: "أنت",
    assistant: "ASSAD"
  },
  en: {
    newChat: "New chat",
    clear: "Clear chat",
    send: "Send",
    placeholder: "Write your message to ASSAD...",
    thinking: "ASSAD is thinking...",
    copied: "Answer copied",
    copy: "Copy",
    error: "Couldn't connect to ASSAD. Check your connection and try again.",
    empty: "Hello! I'm ASSAD. How can I help you?",
    general: "General assistant",
    coding: "Programming",
    planning: "Planning",
    research: "Research & analysis",
    writing: "Writing",
    history: "Chat history",
    workspace: "Workspace",
    creative: "Creative studio",
    taskPlaceholder: "Write a new task...",
    addTask: "Add task",
    delete: "Delete",
    imagePrompt: "Image prompt",
    videoPrompt: "Video prompt",
    post: "Social post",
    idea: "Content idea",
    generate: "Generate",
    result: "Result",
    language: "Language",
    user: "You",
    assistant: "ASSAD"
  },
  fr: {
    newChat: "Nouvelle discussion",
    clear: "Effacer la discussion",
    send: "Envoyer",
    placeholder: "Écrivez votre message à ASSAD...",
    thinking: "ASSAD réfléchit...",
    copied: "Réponse copiée",
    copy: "Copier",
    error: "Impossible de contacter ASSAD. Vérifiez votre connexion.",
    empty: "Bonjour ! Je suis ASSAD. Comment puis-je vous aider ?",
    general: "Assistant général",
    coding: "Programmation",
    planning: "Planification",
    research: "Recherche et analyse",
    writing: "Rédaction",
    history: "Historique",
    workspace: "Espace de travail",
    creative: "Studio créatif",
    taskPlaceholder: "Écrivez une nouvelle tâche...",
    addTask: "Ajouter",
    delete: "Supprimer",
    imagePrompt: "Prompt image",
    videoPrompt: "Prompt vidéo",
    post: "Publication",
    idea: "Idée de contenu",
    generate: "Générer",
    result: "Résultat",
    language: "Langue",
    user: "Vous",
    assistant: "ASSAD"
  }
};

const agents = {
  general: {
    name: "ASSAD GENERAL",
    instruction: "أنت ASSAD، مساعد ذكي مفيد وواضح. أجب بلغة المستخدم، وقدم إجابات دقيقة ومنظمة."
  },
  coding: {
    name: "ASSAD CODER",
    instruction: "أنت خبير برمجة. اشرح الحلول خطوة بخطوة، واكتب أكواداً كاملة وصحيحة، وانتبه للأخطاء."
  },
  planning: {
    name: "ASSAD PLANNER",
    instruction: "أنت خبير تخطيط وتنظيم. حوّل الأهداف إلى خطوات عملية واضحة مع ترتيب الأولويات."
  },
  research: {
    name: "ASSAD RESEARCH",
    instruction: "أنت مساعد متخصص في البحث والتحليل. حلل المعلومات بعناية، وميّز بين الحقائق والاحتمالات."
  },
  writing: {
    name: "ASSAD WRITER",
    instruction: "أنت كاتب محترف. اكتب نصوصاً جذابة وواضحة ومناسبة للهدف والجمهور."
  }
};

function t(key) {
  const language = translations[state.language] || translations.ar;
  return language[key] || translations.ar[key] || key;
}

function saveConversations() {
  localStorage.setItem(
    "assad_conversations",
    JSON.stringify(state.conversations)
  );
}

function loadConversations() {
  try {
    state.conversations = JSON.parse(
      localStorage.getItem("assad_conversations") || "[]"
    );
  } catch (error) {
    state.conversations = [];
  }

  if (state.conversations.length > 0) {
    state.currentConversationId = state.conversations[0].id;
  }
}

function currentConversation() {
  return state.conversations.find(
    (conversation) => conversation.id === state.currentConversationId
  );
}

function createConversation() {
  const conversation = {
    id: Date.now().toString(),
    title: t("newChat"),
    messages: [],
    createdAt: new Date().toISOString()
  };

  state.conversations.unshift(conversation);
  state.currentConversationId = conversation.id;

  saveConversations();
  renderChat();
  renderHistory();
}

function ensureConversation() {
  if (!currentConversation()) {
    createConversation();
  }
  return currentConversation();
}

function setLanguage(language) {
  if (!translations[language]) return;

  state.language = language;
  localStorage.setItem("assad_language", language);

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  updateInterface();
}

function setAgent(agent) {
  if (!agents[agent]) return;

  state.agent = agent;
  localStorage.setItem("assad_agent", agent);

  document.querySelectorAll("[data-agent]").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.agent === agent
    );
  });
}

function updateInterface() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = t(key);
  });

  document.querySelectorAll("[data-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.placeholder);
  });

  document.documentElement.lang = state.language;
  document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";

  const languageSelect = $("#languageSelect");
  if (languageSelect) languageSelect.value = state.language;

  const agentSelect = $("#agentSelect");
  if (agentSelect) agentSelect.value = state.agent;

  renderChat();
  renderHistory();
  renderWorkspace();
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return entities[character];
  });
}

function formatMessage(text) {
  let safe = escapeHTML(text);

  safe = safe.replace(
    /```([\s\S]*?)```/g,
    (match, code) => {
      return `<pre><code>${code.trim()}</code></pre>`;
    }
  );

  safe = safe.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  safe = safe.replace(/\*(.*?)\*/g, "<em>$1</em>");
  safe = safe.replace(/\n/g, "<br>");

  return safe;
}

function renderChat() {
  const container = $("#messages");
  if (!container) return;

  const conversation = currentConversation();

  if (!conversation || conversation.messages.length === 0) {
    container.innerHTML = `
      <div class="welcome-message">
        <div class="welcome-logo">A</div>
        <h2>ASSAD AI</h2>
        <p>${escapeHTML(t("empty"))}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = conversation.messages.map((message, index) => {
    const isUser = message.role === "user";

    return `
      <div class="message ${isUser ? "user-message" : "assistant-message"}">
        <div class="message-avatar">
          ${isUser ? "أنت" : "A"}
        </div>
        <div class="message-content">
          <div class="message-name">
            ${isUser ? t("user") : t("assistant")}
          </div>
          <div class="message-text">
            ${formatMessage(message.content || "")}
          </div>
          ${!isUser ? `
            <div class="message-actions">
              <button class="copy-message" data-copy-index="${index}">
                ${t("copy")}
              </button>
            </div>
          ` : ""}
        </div>
      </div>
    `;
  }).join("");

  container.scrollTop = container.scrollHeight;
}

function renderHistory() {
  const container = $("#chatHistory");
  if (!container) return;

  container.innerHTML = state.conversations.map((conversation) => {
    const active = conversation.id === state.currentConversationId;

    return `
      <button
        class="history-item ${active ? "active" : ""}"
        data-conversation-id="${conversation.id}"
      >
        <span>${escapeHTML(conversation.title)}</span>
      </button>
    `;
  }).join("");
}

function openConversation(id) {
  const conversation = state.conversations.find(
    (item) => item.id === id
  );

  if (!conversation) return;

  state.currentConversationId = id;
  renderChat();
  renderHistory();
}

function clearCurrentConversation() {
  const conversation = currentConversation();
  if (!conversation) return;

  conversation.messages = [];
  conversation.title = t("newChat");

  saveConversations();
  renderChat();
  renderHistory();
}

function addMessage(role, content) {
  const conversation = ensureConversation();

  conversation.messages.push({
    role,
    content,
    createdAt: new Date().toISOString()
  });

  if (role === "user" && conversation.messages.length === 1) {
    conversation.title = content.slice(0, 35);
  }

  saveConversations();
  renderChat();
  renderHistory();
}

function showTyping() {
  const container = $("#messages");
  if (!container) return;

  const old = $("#typingIndicator");
  if (old) old.remove();

  const indicator = document.createElement("div");
  indicator.id = "typingIndicator";
  indicator.className = "message assistant-message typing-message";

  indicator.innerHTML = `
    <div class="message-avatar">A</div>
    <div class="message-content">
      <div class="message-name">ASSAD</div>
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
      <div class="typing-status">${t("thinking")}</div>
    </div>
  `;

  container.appendChild(indicator);
  container.scrollTop = container.scrollHeight;
}

function hideTyping() {
  const indicator = $("#typingIndicator");
  if (indicator) indicator.remove();
}async function sendMessage() {
  if (state.isWaiting) return;

  const input = $("#messageInput");
  if (!input) return;

  const message = input.value.trim();
  if (!message) return;

  input.value = "";

  const conversation = ensureConversation();

  addMessage("user", message);

  state.isWaiting = true;
  showTyping();

  const agent = agents[state.agent] || agents.general;

  const messages = conversation.messages.map((item, index) => {
    let content = item.content || "";

    if (
      item.role === "user" &&
      index === conversation.messages.length - 1
    ) {
      content =
        "تعليمات المساعد: " + agent.instruction +
        "\n\nرسالة المستخدم:\n" + content;
    }

    return {
      role: item.role,
      content
    };
  });

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages
      })
    });

    let data;

    try {
      data = await response.json();
    } catch (error) {
      throw new Error("الخادم لم يرجع استجابة JSON صحيحة");
    }

    if (!response.ok) {
      const errorMessage =
        data.error ||
        data.message ||
        `HTTP ${response.status}`;

      throw new Error(errorMessage);
    }

    let answer = "";

    if (typeof data.reply === "string") {
      answer = data.reply;
    } else if (typeof data.response === "string") {
      answer = data.response;
    } else if (typeof data.answer === "string") {
      answer = data.answer;
    } else if (
      data.result &&
      typeof data.result.response === "string"
    ) {
      answer = data.result.response;
    } else if (
      data.choices &&
      data.choices[0] &&
      data.choices[0].message
    ) {
      answer = data.choices[0].message.content || "";
    }

    if (!answer.trim()) {
      throw new Error("الخادم أعاد إجابة فارغة");
    }

    addMessage("assistant", answer);

  } catch (error) {
    console.error("ASSAD API ERROR:", error);

    addMessage(
      "assistant",
      t("error") + "\n\nتفاصيل الخطأ: " + error.message
    );

  } finally {
    hideTyping();
    state.isWaiting = false;
    if (input) input.focus();
  }
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert(t("copied"));
      })
      .catch(() => {
        fallbackCopy(text);
      });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    alert(t("copied"));
  } catch (error) {
    alert("تعذر نسخ النص");
  }

  textarea.remove();
}

function renderWorkspace() {
  const container = $("#workspaceTasks");
  if (!container) return;

  if (!state.workspace.length) {
    container.innerHTML = `
      <p class="empty-workspace">لا توجد مهام حالياً.</p>
    `;
    return;
  }

  container.innerHTML = state.workspace.map((task, index) => `
    <div class="workspace-task ${task.done ? "completed" : ""}">
      <label>
        <input
          type="checkbox"
          data-task-check="${index}"
          ${task.done ? "checked" : ""}
        >
        <span>${escapeHTML(task.text)}</span>
      </label>

      <button data-task-delete="${index}">
        ${t("delete")}
      </button>
    </div>
  `).join("");
}

function saveWorkspace() {
  localStorage.setItem(
    "assad_workspace",
    JSON.stringify(state.workspace)
  );
}

function addWorkspaceTask() {
  const input = $("#taskInput");
  if (!input) return;

  const value = input.value.trim();
  if (!value) return;

  state.workspace.push({
    text: value,
    done: false,
    createdAt: new Date().toISOString()
  });

  input.value = "";

  saveWorkspace();
  renderWorkspace();
}

function toggleWorkspaceTask(index, done) {
  if (!state.workspace[index]) return;

  state.workspace[index].done = done;

  saveWorkspace();
  renderWorkspace();
}

function deleteWorkspaceTask(index) {
  if (!state.workspace[index]) return;

  state.workspace.splice(index, 1);

  saveWorkspace();
  renderWorkspace();
}

const creativeInstructions = {
  image: {
    title: "إنشاء برومبت صورة",
    instruction: "اكتب برومبت احترافي لتوليد صورة بالذكاء الاصطناعي. اهتم بالتفاصيل والإضاءة والألوان وزاوية التصوير والجودة."
  },
  video: {
    title: "إنشاء برومبت فيديو",
    instruction: "اكتب برومبت احترافي لتحريك أو إنشاء فيديو بالذكاء الاصطناعي. وضح حركة الشخصية والكاميرا والمشهد والإضاءة."
  },
  post: {
    title: "كتابة منشور",
    instruction: "اكتب منشوراً جذاباً لمنصات التواصل الاجتماعي، مع افتتاحية قوية ونص مناسب ووسوم عند الحاجة."
  },
  idea: {
    title: "أفكار محتوى",
    instruction: "اقترح أفكار محتوى مبتكرة وقابلة للتنفيذ، واشرح طريقة تنفيذ كل فكرة باختصار."
  }
};

function generateCreative() {
  const typeSelect = $("#creativeType");
  const input = $("#creativeInput");
  const output = $("#creativeOutput");

  if (!typeSelect || !input || !output) return;

  const type = typeSelect.value;
  const details = input.value.trim();

  if (!details) {
    alert("اكتب وصفاً أو فكرة أولاً.");
    return;
  }

  const selected = creativeInstructions[type] ||
    creativeInstructions.image;

  const prompt =
    selected.instruction +
    "\n\nالمطلوب:\n" + details +
    "\n\nاكتب النتيجة باللغة " +
    (state.language === "ar" ? "العربية" :
      state.language === "fr" ? "الفرنسية" : "الإنجليزية") +
    ".";

  output.textContent = "جارٍ تجهيز طلبك...";

  generateCreativeResult(prompt, output);
}

async function generateCreativeResult(prompt, output) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Request failed");
    }

    let answer = "";

    if (typeof data.reply === "string") {
      answer = data.reply;
    } else if (typeof data.response === "string") {
      answer = data.response;
    } else if (typeof data.answer === "string") {
      answer = data.answer;
    } else if (
      data.choices &&
      data.choices[0] &&
      data.choices[0].message
    ) {
      answer = data.choices[0].message.content || "";
    }

    if (!answer.trim()) {
      throw new Error("Empty response");
    }

    output.textContent = answer;

  } catch (error) {
    console.error("Creative API error:", error);
    output.textContent = t("error") + "\n" + error.message;
  }
}

function switchPanel(panelName) {
  document.querySelectorAll("[data-panel]").forEach((panel) => {
    panel.classList.toggle(
      "active",
      panel.dataset.panel === panelName
    );
  });

  document.querySelectorAll("[data-open-panel]").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.openPanel === panelName
    );
  });
}

function initializeSelectors() {
  const languageSelect = $("#languageSelect");

  if (languageSelect) {
    languageSelect.value = state.language;

    languageSelect.addEventListener("change", (event) => {
      setLanguage(event.target.value);
    });
  }

  const agentSelect = $("#agentSelect");

  if (agentSelect) {
    agentSelect.value = state.agent;

    agentSelect.addEventListener("change", (event) => {
      setAgent(event.target.value);
    });
  }

  document.querySelectorAll("[data-agent]").forEach((button) => {
    button.addEventListener("click", () => {
      setAgent(button.dataset.agent);
    });
  });
}function initializeEvents() {
  const sendButton = $("#sendButton");
  const messageInput = $("#messageInput");
  const newChatButton = $("#newChatButton");
  const clearButton = $("#clearChatButton");
  const addTaskButton = $("#addTaskButton");
  const taskInput = $("#taskInput");
  const creativeButton = $("#creativeButton");

  if (sendButton) {
    sendButton.addEventListener("click", sendMessage);
  }

  if (messageInput) {
    messageInput.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {
        event.preventDefault();
        sendMessage();
      }
    });
  }

  if (newChatButton) {
    newChatButton.addEventListener("click", createConversation);
  }

  if (clearButton) {
    clearButton.addEventListener("click", clearCurrentConversation);
  }

  if (addTaskButton) {
    addTaskButton.addEventListener("click", addWorkspaceTask);
  }

  if (taskInput) {
    taskInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        addWorkspaceTask();
      }
    });
  }

  if (creativeButton) {
    creativeButton.addEventListener("click", generateCreative);
  }

  document.addEventListener("click", (event) => {
    const historyButton = event.target.closest("[data-conversation-id]");

    if (historyButton) {
      openConversation(historyButton.dataset.conversationId);
      return;
    }

    const copyButton = event.target.closest("[data-copy-index]");

    if (copyButton) {
      const conversation = currentConversation();
      const index = Number(copyButton.dataset.copyIndex);

      if (
        conversation &&
        conversation.messages[index]
      ) {
        copyText(conversation.messages[index].content);
      }
      return;
    }

    const deleteButton = event.target.closest("[data-task-delete]");

    if (deleteButton) {
      deleteWorkspaceTask(
        Number(deleteButton.dataset.taskDelete)
      );
      return;
    }

    const panelButton = event.target.closest("[data-open-panel]");

    if (panelButton) {
      switchPanel(panelButton.dataset.openPanel);
    }
  });

  document.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-task-check]");

    if (checkbox) {
      toggleWorkspaceTask(
        Number(checkbox.dataset.taskCheck),
        checkbox.checked
      );
    }
  });

  const creativeCopyButton = $("#creativeCopyButton");

  if (creativeCopyButton) {
    creativeCopyButton.addEventListener("click", () => {
      const output = $("#creativeOutput");

      if (output && output.textContent.trim()) {
        copyText(output.textContent);
      }
    });
  }
}

function initializeApplication() {
  loadConversations();

  initializeSelectors();
  initializeEvents();

  if (!currentConversation()) {
    createConversation();
  }

  updateInterface();
  renderWorkspace();

  console.log("ASSAD AI initialized successfully.");
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
  );
} else {
  initializeApplication();
}
