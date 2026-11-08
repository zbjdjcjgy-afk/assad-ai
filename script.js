/* ==========================================
   ASSAD AI - COMPLETE JAVASCRIPT
   Compatible with current index.html
   ========================================== */

"use strict";

/* ========== CONFIGURATION ========== */

const API_URL =
  "https://assad-ai-api.zbjdjcjgy.workers.dev/api/chat";

const $ = (selector) => document.querySelector(selector);

const STORAGE = {
  conversations: "assad_conversations",
  language: "assad_language",
  projects: "assad_projects"
};

const state = {
  language: localStorage.getItem(STORAGE.language) || "ar",
  conversations: [],
  currentId: null,
  waiting: false,
  projects: [],
  historyOpen: true
};

/* ========== AGENTS ========== */

const agents = {
  general: {
    instruction:
      "أنت ASSAD CORE، مساعد ذكي شامل. أجب بوضوح ودقة، واستعمل لغة المستخدم."
  },

  coding: {
    instruction:
      "أنت ASSAD CODE، خبير في البرمجة. قدم أكواداً صحيحة وكاملة، واشرح الأخطاء والحلول خطوة بخطوة."
  },

  planning: {
    instruction:
      "أنت ASSAD PLAN، خبير التخطيط. حوّل أهداف المستخدم إلى خطوات عملية منظمة مع ترتيب الأولويات."
  },

  research: {
    instruction:
      "أنت ASSAD RESEARCH، مساعد متخصص في البحث والتحليل. حلل المعلومات بعناية ولا تخترع الحقائق."
  },

  writing: {
    instruction:
      "أنت ASSAD WRITE، كاتب محترف. اكتب نصوصاً واضحة وجذابة ومناسبة لهدف المستخدم."
  }
};

/* ========== TRANSLATIONS ========== */

const translations = {
  ar: {
    navChat: "المساعد",
    navTools: "الأدوات",
    navAbout: "عن المنصة",
    prototype: "نسخة تجريبية",
    eyebrow: "مساحة واحدة لأفكارك ومشاريعك",
    headline: "أهلاً بك في ASSAD AI",
    intro: "قل لنا ما الذي تريد إنجازه. سنساعدك على فهم الفكرة وترتيب الخطوات والبدء بثقة.",
    chatTitle: "محادثة ASSAD",
    chatSub: "مساعدك لتنظيم الأفكار وتحويلها إلى عمل",
    online: "متصل",
    chooseAgent: "اختر الوكيل:",
    historyTitle: "سجل المحادثات",
    newChat: "محادثة جديدة",
    localNote: "يُحفظ السجل على هذا الجهاز فقط.",
    welcome: "مرحباً! أنا ASSAD. أخبرني بفكرتك أو هدفك، وسنقسمه معاً إلى خطوات واضحة.",
    now: "الآن",
    history: "السجل",
    clearChat: "مسح المحادثة",
    quickTitle: "لست متأكداً من أين تبدأ؟ جرّب:",
    chip1: "✦ إنشاء مشروع تجاري",
    chip2: "⌘ تعلم مهارة جديدة",
    chip3: "▤ تطوير فكرة تطبيق",
    messageLabel: "اكتب رسالتك",
    placeholder: "اكتب فكرتك أو اسأل ASSAD...",
    privacy: "🔒 لا تضع كلمات مرور أو معلومات حساسة هنا.",
    send: "إرسال",
    apiHint: "المحادثة الذكية تعمل عبر خادم ASSAD AI.",
    workspace: "مساحة العمل",
    toolsTitle: "أدواتك في مكان واحد",
    toolsIntro: "كل ما تحتاجه لتنظيم أفكارك وإنجاز أعمالك.",
    available: "متاح",
    core: "المساعد الرئيسي لفهم الأفكار والتخطيط وحل المشكلات.",
    open: "افتح المساعد ←",
    agents: "وكلاء متخصصون للبرمجة والتخطيط والبحث والكتابة.",
    chooseAgentLink: "اختر وكيلاً ←",
    work: "أنشئ مشاريعك ونظّم مهامك وتابع إنجازك.",
    openWorkspace: "افتح مساحة العمل ←",
    creative: "أنشئ أفكاراً وبرومبتات للصور والفيديو والمنشورات.",
    openCreative: "افتح الاستوديو ←",
    workspaceTitle: "مساحة مشاريعك",
    workspaceDesc: "أنشئ مشاريعك، أضف المهام، وتابع تقدمك.",
    projectPlaceholder: "اسم المشروع...",
    addProject: "＋ إنشاء مشروع",
    workspaceLocal: "مشاريعك محفوظة محلياً على جهازك.",
    creativeTitle: "استوديو صناعة المحتوى",
    creativeDesc: "جهّز طلبك الإبداعي وأرسله إلى ASSAD لصياغته.",
    contentType: "نوع المحتوى",
    imagePrompt: "برومبت صورة",
    videoPrompt: "برومبت فيديو قصير",
    socialPost: "منشور لوسائل التواصل",
    contentIdeas: "أفكار محتوى",
    creativeDetails: "صف فكرتك",
    creativePlaceholder: "اكتب وصف فكرتك هنا...",
    sendToAssistant: "✦ جهّز الطلب مع ASSAD",
    creativeNote: "هذه الأداة تنشئ النصوص والبرومبتات. توليد الصور والفيديو مباشرة يحتاج ربط خدمة خارجية.",
    how: "كيف نعمل؟",
    howTitle: "ثلاث خطوات بسيطة",
    step1: "أخبرنا بما تريد",
    step1d: "اكتب هدفك حتى لو كانت الفكرة غير مكتملة.",
    step2: "رتّب خطتك",
    step2d: "حوّل الفكرة إلى مراحل وخطوات مفهومة.",
    step3: "ابدأ التنفيذ",
    step3d: "اختر خطوة صغيرة وابدأ في إنجازها.",
    footer: "أفكار أكبر. خطوات أوضح. إنجاز حقيقي.",
    footerStatus: "نسخة أولية قيد التطوير",
    thinking: "أسد يفكر...",
    error: "تعذر الاتصال بـ ASSAD حالياً.",
    copy: "نسخ",
    copied: "تم نسخ النص.",
    delete: "حذف",
    completed: "مكتمل",
    pending: "قيد التنفيذ",
    emptyHistory: "لا توجد محادثات بعد.",
    emptyProjects: "لا توجد مشاريع حالياً.",
    taskPlaceholder: "اكتب مهمة جديدة...",
    addTask: "إضافة مهمة",
    projectTasks: "مهام المشروع",
    projectCreated: "تم إنشاء المشروع.",
    confirmDelete: "هل تريد حذف هذا العنصر؟",
    networkError: "تعذر الوصول إلى الخادم. تحقق من اتصال الإنترنت."
  },

  en: {
    navChat: "Assistant",
    navTools: "Tools",
    navAbout: "About",
    prototype: "Beta version",
    eyebrow: "One place for your ideas and projects",
    headline: "Welcome to ASSAD AI",
    intro: "Tell us what you want to achieve. We'll help you organize your ideas and take the next step.",
    chatTitle: "ASSAD Chat",
    chatSub: "Your assistant for ideas and projects",
    online: "Online",
    chooseAgent: "Choose agent:",
    historyTitle: "Chat history",
    newChat: "New chat",
    localNote: "History is saved on this device.",
    welcome: "Hello! I'm ASSAD. How can I help you?",
    now: "Now",
    history: "History",
    clearChat: "Clear chat",
    quickTitle: "Not sure where to start? Try:",
    chip1: "✦ Create a business",
    chip2: "⌘ Learn a new skill",
    chip3: "▤ Develop an app idea",
    messageLabel: "Write your message",
    placeholder: "Write your idea or ask ASSAD...",
    privacy: "🔒 Do not enter passwords or sensitive information.",
    send: "Send",
    apiHint: "Powered by the ASSAD AI server.",
    workspace: "Workspace",
    toolsTitle: "Your tools in one place",
    toolsIntro: "Everything you need to organize your work.",
    available: "Available",
    core: "Your main assistant for ideas and problem solving.",
    open: "Open assistant ←",
    agents: "Specialized agents for coding, planning, research and writing.",
    chooseAgentLink: "Choose an agent ←",
    work: "Create projects and organize tasks.",
    openWorkspace: "Open workspace ←",
    creative: "Create ideas and prompts for images and videos.",
    openCreative: "Open studio ←",
    workspaceTitle: "Your projects",
    workspaceDesc: "Create projects and track your progress.",
    projectPlaceholder: "Project name...",
    addProject: "＋ Create project",
    workspaceLocal: "Your projects are saved on this device.",
    creativeTitle: "Creative studio",
    creativeDesc: "Prepare your creative request with ASSAD.",
    contentType: "Content type",
    imagePrompt: "Image prompt",
    videoPrompt: "Video prompt",
    socialPost: "Social media post",
    contentIdeas: "Content ideas",
    creativeDetails: "Describe your idea",
    creativePlaceholder: "Describe your idea here...",
    sendToAssistant: "✦ Generate with ASSAD",
    creativeNote: "Image and video generation requires an external service.",
    how: "How it works",
    howTitle: "Three simple steps",
    step1: "Tell us what you need",
    step1d: "Write your goal, even if it is not complete.",
    step2: "Organize your plan",
    step2d: "Turn your idea into clear steps.",
    step3: "Start building",
    step3d: "Choose one small step and begin.",
    footer: "Bigger ideas. Clearer steps. Real progress.",
    footerStatus: "Early version in development",
    thinking: "ASSAD is thinking...",
    error: "Unable to connect to ASSAD.",
    copy: "Copy",
    copied: "Text copied.",
    delete: "Delete",
    completed: "Completed",
    pending: "In progress",
    emptyHistory: "No conversations yet.",
    emptyProjects: "No projects yet.",
    taskPlaceholder: "Write a new task...",
    addTask: "Add task",
    projectTasks: "Project tasks",
    projectCreated: "Project created.",
    confirmDelete: "Delete this item?",
    networkError: "Unable to reach the server."
  },

  fr: {
    navChat: "Assistant",
    navTools: "Outils",
    navAbout: "À propos",
    prototype: "Version bêta",
    eyebrow: "Un espace pour vos idées et projets",
    headline: "Bienvenue sur ASSAD AI",
    intro: "Dites-nous ce que vous souhaitez accomplir.",
    chatTitle: "Discussion ASSAD",
    chatSub: "Votre assistant intelligent",
    online: "En ligne",
    chooseAgent: "Choisir un agent :",
    historyTitle: "Historique",
    newChat: "Nouvelle discussion",
    localNote: "Historique enregistré sur cet appareil.",
    welcome: "Bonjour ! Je suis ASSAD. Comment puis-je vous aider ?",
    now: "Maintenant",
    history: "Historique",
    clearChat: "Effacer la discussion",
    quickTitle: "Vous ne savez pas par où commencer ?",
    chip1: "Créer une entreprise",
    chip2: "Apprendre une compétence",
    chip3: "Développer une application",
    messageLabel: "Votre message",
    placeholder: "Écrivez votre message à ASSAD...",
    privacy: "Ne partagez pas vos mots de passe.",
    send: "Envoyer",
    apiHint: "Propulsé par ASSAD AI.",
    workspace: "Espace de travail",
    toolsTitle: "Vos outils",
    toolsIntro: "Tout pour organiser votre travail.",
    available: "Disponible",
    core: "Votre assistant principal.",
    open: "Ouvrir l'assistant ←",
    agents: "Agents spécialisés.",
    chooseAgentLink: "Choisir un agent ←",
    work: "Organisez vos projets et tâches.",
    openWorkspace: "Ouvrir l'espace ←",
    creative: "Créez des idées et des prompts.",
    openCreative: "Ouvrir le studio ←",
    workspaceTitle: "Vos projets",
    workspaceDesc: "Créez vos projets et suivez vos progrès.",
    projectPlaceholder: "Nom du projet...",
    addProject: "＋ Créer un projet",
    workspaceLocal: "Projets enregistrés sur cet appareil.",
    creativeTitle: "Studio créatif",
    creativeDesc: "Préparez votre demande avec ASSAD.",
    contentType: "Type de contenu",
    imagePrompt: "Prompt image",
    videoPrompt: "Prompt vidéo",
    socialPost: "Publication",
    contentIdeas: "Idées de contenu",
    creativeDetails: "Décrivez votre idée",
    creativePlaceholder: "Décrivez votre idée ici...",
    sendToAssistant: "✦ Créer avec ASSAD",
    creativeNote: "La génération d'images et de vidéos nécessite un service externe.",
    how: "Comment ça marche ?",
    howTitle: "Trois étapes simples",
    step1: "Dites-nous votre objectif",
    step1d: "Écrivez votre objectif.",
    step2: "Organisez votre plan",
    step2d: "Transformez votre idée en étapes.",
    step3: "Commencez",
    step3d: "Choisissez une petite étape.",
    footer: "De grandes idées. Des étapes claires.",
    footerStatus: "Version initiale en développement",
    thinking: "ASSAD réfléchit...",
    error: "Impossible de contacter ASSAD.",
    copy: "Copier",
    copied: "Texte copié.",
    delete: "Supprimer",
    completed: "Terminé",
    pending: "En cours",
    emptyHistory: "Aucune discussion.",
    emptyProjects: "Aucun projet.",
    taskPlaceholder: "Nouvelle tâche...",
    addTask: "Ajouter",
    projectTasks: "Tâches du projet",
    projectCreated: "Projet créé.",
    confirmDelete: "Supprimer cet élément ?",
    networkError: "Impossible de joindre le serveur."
  }
};

function tr(key) {
  const lang = translations[state.language] || translations.ar;
  return lang[key] || translations.ar[key] || key;
}

/* ========== STORAGE ========== */

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value === null ? fallback : value;
  } catch (error) {
    return fallback;
  }
}

function saveConversations() {
  localStorage.setItem(
    STORAGE.conversations,
    JSON.stringify(state.conversations)
  );
}

function saveProjects() {
  localStorage.setItem(
    STORAGE.projects,
    JSON.stringify(state.projects)
  );
}

function loadData() {
  state.conversations = readStorage(
    STORAGE.conversations,
    []
  );

  state.projects = readStorage(
    STORAGE.projects,
    []
  );

  if (!Array.isArray(state.conversations)) {
    state.conversations = [];
  }

  if (!Array.isArray(state.projects)) {
    state.projects = [];
  }

  if (state.conversations.length) {
    state.currentId = state.conversations[0].id;
  }
}

/* ========== HELPERS ========== */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function formatText(value) {
  let text = escapeHTML(value || "");

  text = text.replace(
    /```([\s\S]*?)```/g,
    "<pre><code>$1</code></pre>"
  );

  text = text.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );

  text = text.replace(
    /\*(.*?)\*/g,
    "<em>$1</em>"
  );

  text = text.replace(/\n/g, "<br>");

  return text;
}

function makeId() {
  return Date.now().toString(36) +
    Math.random().toString(36).slice(2, 8);
}

function currentConversation() {
  return state.conversations.find(
    item => item.id === state.currentId
  );
}

function scrollChat() {
  const chat = $("#chat");
  if (chat) {
    chat.scrollTop = chat.scrollHeight;
  }
}

/* ========== LANGUAGE ========== */

function updateLanguage() {
  document.documentElement.lang = state.language;

  document.documentElement.dir =
    state.language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;

    if (translations[state.language][key]) {
      element.textContent = tr(key);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.dataset.i18nPlaceholder;

    if (translations[state.language][key]) {
      element.placeholder = tr(key);
    }
  });

  const languageSelect = $("#language");

  if (languageSelect) {
    languageSelect.value = state.language;
  }

  renderChat();
  renderHistory();
  renderProjects();
}

function changeLanguage(language) {
  if (!translations[language]) return;

  state.language = language;

  localStorage.setItem(
    STORAGE.language,
    language
  );

  updateLanguage();
}

/* ========== CONNECTION STATUS ========== */

function setConnection(online, message) {
  const connection = $("#connection");

  if (!connection) return;

  const label = connection.querySelector("span");

  if (label) {
    label.textContent =
      message || (online ? "متصل" : "غير متصل");
  }

  connection.classList.toggle("offline", !online);
}

/* ========== CONVERSATIONS ========== */

function createConversation() {
  const conversation = {
    id: makeId(),
    title: tr("newChat"),
    messages: [],
    createdAt: new Date().toISOString()
  };

  state.conversations.unshift(conversation);
  state.currentId = conversation.id;

  saveConversations();
  renderChat();
  renderHistory();

  const prompt = $("#prompt");
  if (prompt) prompt.focus();
}

function ensureConversation() {
  let conversation = currentConversation();

  if (!conversation) {
    createConversation();
    conversation = currentConversation();
  }

  return conversation;
}

function addMessage(role, content) {
  const conversation = ensureConversation();

  conversation.messages.push({
    role,
    content,
    time: new Date().toISOString()
  });

  if (
    role === "user" &&
    conversation.messages.length === 1
  ) {
    conversation.title = content.slice(0, 38);
  }

  saveConversations();
  renderChat();
  renderHistory();
}

function selectConversation(id) {
  const conversation = state.conversations.find(
    item => item.id === id
  );

  if (!conversation) return;

  state.currentId = id;

  renderChat();
  renderHistory();
}

function deleteConversation(id) {
  state.conversations = state.conversations.filter(
    item => item.id !== id
  );

  if (state.currentId === id) {
    state.currentId =
      state.conversations.length
        ? state.conversations[0].id
        : null;
  }

  if (!state.currentId) {
    createConversation();
  }

  saveConversations();
  renderChat();
  renderHistory();
}

function clearConversation() {
  const conversation = currentConversation();

  if (!conversation) return;

  if (!confirm(tr("confirmDelete"))) return;

  conversation.messages = [];
  conversation.title = tr("newChat");

  saveConversations();
  renderChat();
  renderHistory();
}

/* ========== CHAT RENDERING ========== */

function renderChat() {
  const chat = $("#chat");

  if (!chat) return;

  const conversation = currentConversation();

  if (!conversation || !conversation.messages.length) {
    chat.innerHTML = `
      <div class="message bot">
        <img src="assets/logo.svg" alt="ASSAD">
        <div class="bubble">
          <p>${escapeHTML(tr("welcome"))}</p>
          <small>${escapeHTML(tr("now"))}</small>
        </div>
      </div>
    `;

    return;
  }

  chat.innerHTML = conversation.messages.map((message, index) => {
    const user = message.role === "user";

    return `
      <div class="message ${user ? "user" : "bot"}">
        ${
          user
            ? ""
            : '<img src="assets/logo.svg" alt="ASSAD">'
        }

        <div class="bubble">
          <p>${formatText(message.content)}</p>

          <small>
            ${user ? "أنت" : "ASSAD"}
          </small>

          ${
            !user
              ? `
                <button
                  type="button"
                  class="copy-btn"
                  data-copy="${index}"
                >
                  ${escapeHTML(tr("copy"))}
                </button>
              `
              : ""
          }
        </div>
      </div>
    `;
  }).join("");

  scrollChat();
}

function renderHistory() {
  const container = $("#history-list");

  if (!container) return;

  if (!state.conversations.length) {
    container.innerHTML = `
      <p class="local-note">${escapeHTML(tr("emptyHistory"))}</p>
    `;
    return;
  }

  container.innerHTML = state.conversations.map(conversation => `
    <div class="history-item ${
      conversation.id === state.currentId ? "active" : ""
    }">

      <button
        type="button"
        class="history-open"
        data-open-chat="${escapeHTML(conversation.id)}"
      >
        ${escapeHTML(conversation.title || tr("newChat"))}
      </button>

      <button
        type="button"
        class="history-delete"
        data-delete-chat="${escapeHTML(conversation.id)}"
        aria-label="Delete"
      >
        ×
      </button>

    </div>
  `).join("");
}

/* ========== TYPING INDICATOR ========== */

function showTyping() {
  const chat = $("#chat");

  if (!chat) return;

  hideTyping();

  const indicator = document.createElement("div");

  indicator.id = "assad-typing";
  indicator.className = "message bot";

  indicator.innerHTML = `
    <img src="assets/logo.svg" alt="ASSAD">

    <div class="bubble">
      <div class="typing">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <small id="typing-status">${escapeHTML(tr("thinking"))}</small>
    </div>
  `;

  chat.appendChild(indicator);
  scrollChat();
}

function hideTyping() {
  const indicator = $("#assad-typing");

  if (indicator) indicator.remove();
}

/* ========== API RESPONSE READER ========== */

function extractAnswer(data) {
  if (!data) return "";

  if (typeof data.reply === "string") {
    return data.reply;
  }

  if (typeof data.response === "string") {
    return data.response;
  }

  if (typeof data.answer === "string") {
    return data.answer;
  }

  if (
    data.result &&
    typeof data.result.response === "string"
  ) {
    return data.result.response;
  }

  if (
    data.choices &&
    data.choices[0] &&
    data.choices[0].message
  ) {
    const content = data.choices[0].message.content;

    if (typeof content === "string") {
      return content;
    }

    if (Array.isArray(content)) {
      return content.map(item => item.text || "").join("\n");
    }
  }

  return "";
}

/* ========== SEND MESSAGE ========== */

async function sendMessage(textOverride) {
  if (state.waiting) return;

  const prompt = $("#prompt");

  const message = (
    textOverride !== undefined
      ? textOverride
      : prompt ? prompt.value : ""
  ).trim();

  if (!message) return;

  if (prompt) prompt.value = "";

  const conversation = ensureConversation();

  addMessage("user", message);

  state.waiting = true;

  const sendButton = $("#send");

  if (sendButton) {
    sendButton.disabled = true;
    sendButton.style.opacity = "0.6";
  }

  showTyping();

  const agentSelect = $("#agent-select");

  const selectedAgent =
    agentSelect ? agentSelect.value : "general";

  const agent =
    agents[selectedAgent] || agents.general;

  /*
    IMPORTANT:
    Worker receives only user and assistant roles.
    Agent instructions are included inside the latest user message.
  */

  const messages = conversation.messages.map((item, index) => {
    let content = item.content || "";

    if (
      item.role === "user" &&
      index === conversation.messages.length - 1
    ) {
      content =
        agent.instruction +
        "\n\nرسالة المستخدم:\n" +
        content;
    }

    return {
      role: item.role,
      content: content
    };
  });

  try {
    setConnection(true, "جاري الاتصال...");

    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        messages: messages
      })
    });

    const rawText = await response.text();

    let data;

    try {
      data = JSON.parse(rawText);
    } catch (parseError) {
      throw new Error(
        "الخادم لم يرجع JSON صالحاً. HTTP " +
        response.status +
        ". الرد: " +
        rawText.slice(0, 250)
      );
    }

    if (!response.ok) {
      throw new Error(
        data.error ||
        data.message ||
        "HTTP " + response.status
      );
    }

    const answer = extractAnswer(data);

    if (!answer || !answer.trim()) {
      throw new Error(
        "الخادم أعاد إجابة فارغة. تحقق من إعدادات Workers AI."
      );
    }

    addMessage("assistant", answer);

    setConnection(true, "متصل");

  } catch (error) {
    console.error("ASSAD CHAT ERROR:", error);

    setConnection(false, "حدث خطأ");

    const details =
      error && error.message
        ? error.message
        : "خطأ غير معروف";

    addMessage(
      "assistant",
      tr("error") +
      "\n\nتفاصيل الخطأ: " +
      details
    );

  } finally {
    hideTyping();

    state.waiting = false;

    if (sendButton) {
      sendButton.disabled = false;
      sendButton.style.opacity = "1";
    }

    if (prompt) prompt.focus();
  }
}

/* ========== COPY MESSAGE ========== */

async function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");

      textarea.value = text;
      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand("copy");

      textarea.remove();
    }

    alert(tr("copied"));

  } catch (error) {
    console.error("Copy error:", error);
    alert("تعذر نسخ النص.");
  }
}

/* ========== HISTORY PANEL ========== */

function toggleHistory() {
  const panel = $("#history-panel");

  if (!panel) return;

  state.historyOpen = !state.historyOpen;

  panel.style.display =
    state.historyOpen ? "" : "none";
}

function closeHistory() {
  const panel = $("#history-panel");

  if (!panel) return;

  state.historyOpen = false;
  panel.style.display = "none";
}

/* ========== PROJECTS ========== */

function renderProjects() {
  const container = $("#projects-list");

  if (!container) return;

  if (!state.projects.length) {
    container.innerHTML = `
      <p class="local-note">${escapeHTML(tr("emptyProjects"))}</p>
    `;
    return;
  }

  container.innerHTML = state.projects.map((project, index) => {
    const tasks = Array.isArray(project.tasks)
      ? project.tasks
      : [];

    const done = tasks.filter(task => task.done).length;

    return `
      <article class="project-card">

        <div class="project-header">
          <h3>${escapeHTML(project.name)}</h3>

          <button
            type="button"
            class="history-delete"
            data-delete-project="${index}"
          >
            ×
          </button>
        </div>

        <p class="local-note">
          ${done} / ${tasks.length} ${escapeHTML(tr("completed"))}
        </p>

        <div class="project-progress">
          <div style="width:${
            tasks.length
              ? Math.round(done / tasks.length * 100)
              : 0
          }%"></div>
        </div>

        <form class="task-form" data-task-form="${index}">
          <input
            type="text"
            maxlength="120"
            placeholder="${escapeHTML(tr("taskPlaceholder"))}"
            data-task-input="${index}"
            required
          >

          <button type="submit">
            ＋
          </button>
        </form>

        <div class="project-tasks">
          ${
            tasks.map((task, taskIndex) => `
              <div class="project-task">
                <label>
                  <input
                    type="checkbox"
                    data-task-toggle="${index}"
                    data-task-index="${taskIndex}"
                    ${task.done ? "checked" : ""}
                  >

                  <span style="${
                    task.done
                      ? "text-decoration:line-through;opacity:.6"
                      : ""
                  }">
                    ${escapeHTML(task.text)}
                  </span>
                </label>

                <button
                  type="button"
                  data-task-delete="${index}"
                  data-task-index="${taskIndex}"
                >
                  ×
                </button>
              </div>
            `).join("")
          }
        </div>

      </article>
    `;
  }).join("");
}

function addProject(name) {
  const cleanName = name.trim();

  if (!cleanName) return;

  state.projects.unshift({
    id: makeId(),
    name: cleanName,
    tasks: [],
    createdAt: new Date().toISOString()
  });

  saveProjects();
  renderProjects();
}

function deleteProject(index) {
  if (!state.projects[index]) return;

  if (!confirm(tr("confirmDelete"))) return;

  state.projects.splice(index, 1);

  saveProjects();
  renderProjects();
}

function addTask(projectIndex, taskText) {
  const project = state.projects[projectIndex];

  if (!project || !taskText.trim()) return;

  if (!Array.isArray(project.tasks)) {
    project.tasks = [];
  }

  project.tasks.push({
    text: taskText.trim(),
    done: false
  });

  saveProjects();
  renderProjects();
}

function toggleTask(projectIndex, taskIndex, checked) {
  const project = state.projects[projectIndex];

  if (!project || !project.tasks[taskIndex]) return;

  project.tasks[taskIndex].done = checked;

  saveProjects();
  renderProjects();
}

function deleteTask(projectIndex, taskIndex) {
  const project = state.projects[projectIndex];

  if (!project || !project.tasks[taskIndex]) return;

  project.tasks.splice(taskIndex, 1);

  saveProjects();
  renderProjects();
}

/* ========== CREATIVE STUDIO ========== */

const creativeTypes = {
  image: {
    instruction:
      "اكتب برومبت احترافي لتوليد صورة بالذكاء الاصطناعي. اذكر الشخصية والمشهد والإضاءة والألوان والتفاصيل وزاوية التصوير والجودة."
  },

  video: {
    instruction:
      "اكتب برومبت احترافي لتوليد فيديو بالذكاء الاصطناعي. اشرح حركة الشخصية والكاميرا والمشهد والإضاءة وتسلسل الأحداث."
  },

  post: {
    instruction:
      "اكتب منشوراً احترافياً وجذاباً لوسائل التواصل الاجتماعي. اجعله مناسباً للجمهور مع افتتاحية قوية."
  },

  ideas: {
    instruction:
      "اقترح أفكار محتوى مبتكرة وقابلة للتنفيذ. اشرح كل فكرة وطريقة تنفيذها."
  }
};

function sendCreativeRequest() {
  const typeElement = $("#creative-type");
  const detailsElement = $("#creative-details");

  if (!typeElement || !detailsElement) return;

  const type = typeElement.value;
  const details = detailsElement.value.trim();

  if (!details) {
    alert("اكتب وصف فكرتك أولاً.");
    detailsElement.focus();
    return;
  }

  const selected =
    creativeTypes[type] || creativeTypes.image;

  const languageName = {
    ar: "العربية",
    en: "الإنجليزية",
    fr: "الفرنسية"
  }[state.language];

  const request =
    selected.instruction +
    "\n\nالتفاصيل:\n" +
    details +
    "\n\nاكتب النتيجة باللغة " +
    languageName +
    ".";

  document.querySelector("#assistant").scrollIntoView({
    behavior: "smooth"
  });

  sendMessage(request);
}

/* ========== QUICK PROMPTS ========== */

function initializeQuickPrompts() {
  document.querySelectorAll("[data-prompt]").forEach(button => {
    button.addEventListener("click", () => {
      const prompt = button.dataset.prompt;

      document.querySelector("#assistant").scrollIntoView({
        behavior: "smooth"
      });

      sendMessage(prompt);
    });
  });
}

/* ========== EVENT LISTENERS ========== */

function initializeEvents() {

  /* Chat form */

  const chatForm = $("#chat-form");

  if (chatForm) {
    chatForm.addEventListener("submit", event => {
      event.preventDefault();
      sendMessage();
    });
  }

  /* New conversation */

  const newChatButton = $("#new-chat");

  if (newChatButton) {
    newChatButton.addEventListener("click", createConversation);
  }

  /* Clear conversation */

  const clearButton = $("#clear-chat");

  if (clearButton) {
    clearButton.addEventListener("click", clearConversation);
  }

  /* History buttons */

  const historyToggle = $("#history-toggle");

  if (historyToggle) {
    historyToggle.addEventListener("click", toggleHistory);
  }

  const closeHistoryButton = $("#close-history");

  if (closeHistoryButton) {
    closeHistoryButton.addEventListener("click", closeHistory);
  }

  /* Agent selector */

  const agentSelect = $("#agent-select");

  if (agentSelect) {
    agentSelect.addEventListener("change", () => {
      localStorage.setItem(
        "assad_agent",
        agentSelect.value
      );
    });

    const savedAgent = localStorage.getItem("assad_agent");

    if (savedAgent && agents[savedAgent]) {
      agentSelect.value = savedAgent;
    }
  }

  /* Language selector */

  const languageSelect = $("#language");

  if (languageSelect) {
    languageSelect.addEventListener("change", event => {
      changeLanguage(event.target.value);
    });
  }

  /* Creative studio */

  const creativeButton = $("#creative-send");

  if (creativeButton) {
    creativeButton.addEventListener("click", sendCreativeRequest);
  }

  /* Project creation */

  const projectForm = $("#project-form");

  if (projectForm) {
    projectForm.addEventListener("submit", event => {
      event.preventDefault();

      const input = $("#project-name");

      if (!input) return;

      addProject(input.value);

      input.value = "";
    });
  }

  /* Dynamic buttons */

  document.addEventListener("click", event => {

    const openChat = event.target.closest("[data-open-chat]");

    if (openChat) {
      selectConversation(openChat.dataset.openChat);
      return;
    }

    const deleteChat = event.target.closest("[data-delete-chat]");

    if (deleteChat) {
      const id = deleteChat.dataset.deleteChat;

      if (confirm(tr("confirmDelete"))) {
        deleteConversation(id);
      }

      return;
    }

    const copyButton = event.target.closest("[data-copy]");

    if (copyButton) {
      const conversation = currentConversation();

      const index = Number(copyButton.dataset.copy);

      if (conversation && conversation.messages[index]) {
        copyText(conversation.messages[index].content);
      }

      return;
    }

    const deleteProjectButton =
      event.target.closest("[data-delete-project]");

    if (deleteProjectButton) {
      deleteProject(
        Number(deleteProjectButton.dataset.deleteProject)
      );

      return;
    }

    const deleteTaskButton =
      event.target.closest("[data-task-delete]");

    if (deleteTaskButton) {
      deleteTask(
        Number(deleteTaskButton.dataset.taskDelete),
        Number(deleteTaskButton.dataset.taskIndex)
      );

      return;
    }
  });

  /* Dynamic forms */

  document.addEventListener("submit", event => {
    const taskForm = event.target.closest("[data-task-form]");

    if (!taskForm) return;

    event.preventDefault();

    const projectIndex = Number(taskForm.dataset.taskForm);

    const input = taskForm.querySelector("input");

    if (!input) return;

    addTask(projectIndex, input.value);
  });

  /* Task checkbox */

  document.addEventListener("change", event => {
    const checkbox = event.target.closest("[data-task-toggle]");

    if (!checkbox) return;

    toggleTask(
      Number(checkbox.dataset.taskToggle),
      Number(checkbox.dataset.taskIndex),
      checkbox.checked
    );
  });

  initializeQuickPrompts();
}

/* ========== APPLICATION START ========== */

function initializeApp() {
  try {
    loadData();

    initializeEvents();

    if (!currentConversation()) {
      createConversation();
    }

    updateLanguage();

    renderChat();
    renderHistory();
    renderProjects();

    const year = $("#year");

    if (year) {
      year.textContent = new Date().getFullYear();
    }

    console.log("ASSAD AI started successfully.");

  } catch (error) {
    console.error("ASSAD INITIALIZATION ERROR:", error);
  }
}

/* Wait for HTML */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeApp
  );
} else {
  initializeApp();
}
