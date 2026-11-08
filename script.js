
/* =========================================
   ASSAD AI - MAIN APPLICATION
   ========================================= */

const API_URL = "https://assad-ai-api.zbjdjcjgy.workers.dev/api/chat";

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

const STORAGE = {
  conversations: "assad_ai_conversations_v2",
  projects: "assad_ai_projects_v2",
  language: "assad_ai_language"
};

const translations = {
  ar: {
    navChat:"المساعد",navTools:"الأدوات",navAbout:"عن المنصة",
    prototype:"نسخة تجريبية",eyebrow:"مساحة واحدة لأفكارك ومشاريعك",
    headline:'أهلاً بك في <span>ASSAD AI</span>',
    intro:"قل لنا ما الذي تريد إنجازه. سنساعدك على فهم الفكرة وترتيب الخطوات والبدء بثقة.",
    chatTitle:"محادثة ASSAD",chatSub:"مساعدك لتنظيم الأفكار وتحويلها إلى عمل",
    online:"متصل",chooseAgent:"اختر الوكيل:",historyTitle:"سجل المحادثات",
    newChat:"محادثة جديدة",localNote:"يُحفظ السجل على هذا الجهاز فقط.",
    welcome:"مرحباً! أنا ASSAD. أخبرني بفكرتك أو هدفك، وسنقسمه معاً إلى خطوات واضحة.",
    now:"الآن",history:"السجل",clearChat:"مسح المحادثة",
    quickTitle:"لست متأكداً من أين تبدأ؟ جرّب:",
    chip1:"✦ إنشاء مشروع تجاري",chip2:"⌘ تعلم مهارة جديدة",
    chip3:"▤ تطوير فكرة تطبيق",messageLabel:"اكتب رسالتك",
    placeholder:"اكتب فكرتك أو اسأل ASSAD...",privacy:"🔒 لا تضع كلمات مرور أو معلومات حساسة هنا.",
    send:"إرسال",apiHint:"المحادثة الذكية تعمل عبر خادم ASSAD AI.",
    workspace:"مساحة العمل",toolsTitle:"أدواتك في مكان واحد",
    toolsIntro:"كل ما تحتاجه لتنظيم أفكارك وإنجاز أعمالك.",
    available:"متاح",core:"المساعد الرئيسي لفهم الأفكار والتخطيط وحل المشكلات.",
    open:"افتح المساعد ←",agents:"وكلاء متخصصون للبرمجة والتخطيط والبحث والكتابة.",
    chooseAgentLink:"اختر وكيلاً ←",work:"أنشئ مشاريعك ونظّم مهامك وتابع إنجازك.",
    openWorkspace:"افتح مساحة العمل ←",
    creative:"أنشئ أفكاراً وبرومبتات للصور والفيديو والمنشورات.",
    openCreative:"افتح الاستوديو ←",workspaceTitle:"مساحة مشاريعك",
    workspaceDesc:"أنشئ مشاريعك، أضف المهام، وتابع تقدمك.",
    projectPlaceholder:"اسم المشروع...",addProject:"＋ إنشاء مشروع",
    workspaceLocal:"مشاريعك محفوظة محلياً على جهازك.",
    creativeTitle:"استوديو صناعة المحتوى",
    creativeDesc:"جهّز طلبك الإبداعي وأرسله إلى ASSAD لصياغته.",
    contentType:"نوع المحتوى",imagePrompt:"برومبت صورة",
    videoPrompt:"برومبت فيديو قصير",socialPost:"منشور لوسائل التواصل",
    contentIdeas:"أفكار محتوى",creativeDetails:"صف فكرتك",
    creativePlaceholder:"مثلاً: فيديو كوميدي عن موزة وخوخة...",
    sendToAssistant:"✦ جهّز الطلب مع ASSAD",
    creativeNote:"هذه الأداة تنشئ النصوص والبرومبتات. توليد الصور والفيديو مباشرة يحتاج ربط خدمة خارجية.",
    how:"كيف نعمل؟",howTitle:"ثلاث خطوات بسيطة",
    step1:"أخبرنا بما تريد",step1d:"اكتب هدفك حتى لو كانت الفكرة غير مكتملة.",
    step2:"رتّب خطتك",step2d:"حوّل الفكرة إلى مراحل وخطوات مفهومة.",
    step3:"ابدأ التنفيذ",step3d:"اختر خطوة صغيرة وابدأ في إنجازها.",
    footer:"أفكار أكبر. خطوات أوضح. إنجاز حقيقي.",
    footerStatus:"نسخة أولية قيد التطوير"
  },

  en: {
    navChat:"Assistant",navTools:"Tools",navAbout:"About",
    prototype:"Prototype",eyebrow:"One space for your ideas and projects",
    headline:'Welcome to <span>ASSAD AI</span>',
    intro:"Tell us what you want to achieve. We'll help you understand your idea and organize your next steps.",
    chatTitle:"ASSAD Chat",chatSub:"Your assistant for turning ideas into action",
    online:"Online",chooseAgent:"Choose agent:",historyTitle:"Chat history",
    newChat:"New chat",localNote:"History is saved on this device only.",
    welcome:"Hello! I'm ASSAD. Tell me your idea or goal and we'll break it into clear steps.",
    now:"Now",history:"History",clearChat:"Clear chat",
    quickTitle:"Not sure where to start? Try:",
    chip1:"✦ Create a business",chip2:"⌘ Learn a new skill",
    chip3:"▤ Develop an app idea",messageLabel:"Write your message",
    placeholder:"Write your idea or ask ASSAD...",privacy:"🔒 Don't enter passwords or sensitive information.",
    send:"Send",apiHint:"AI chat runs through the ASSAD AI server.",
    workspace:"Workspace",toolsTitle:"Your tools in one place",
    toolsIntro:"Everything you need to organize ideas and get things done.",
    available:"Available",core:"Your main assistant for ideas, planning and problem solving.",
    open:"Open assistant ←",agents:"Specialized agents for coding, planning, research and writing.",
    chooseAgentLink:"Choose an agent ←",work:"Create projects, organize tasks and track progress.",
    openWorkspace:"Open workspace ←",creative:"Create prompts for images, videos and social posts.",
    openCreative:"Open studio ←",workspaceTitle:"Your projects",
    workspaceDesc:"Create projects, add tasks and track your progress.",
    projectPlaceholder:"Project name...",addProject:"＋ Create project",
    workspaceLocal:"Your projects are saved locally on this device.",
    creativeTitle:"Creative Studio",
    creativeDesc:"Prepare a creative request and let ASSAD write it.",
    contentType:"Content type",imagePrompt:"Image prompt",
    videoPrompt:"Short video prompt",socialPost:"Social media post",
    contentIdeas:"Content ideas",creativeDetails:"Describe your idea",
    creativePlaceholder:"Example: A funny video about a banana and a peach...",
    sendToAssistant:"✦ Prepare with ASSAD",
    creativeNote:"This tool creates text and prompts. Direct image and video generation requires an external service.",
    how:"How it works",howTitle:"Three simple steps",
    step1:"Tell us what you want",step1d:"Describe your goal, even if it's incomplete.",
    step2:"Organize your plan",step2d:"Turn the idea into understandable steps.",
    step3:"Start building",step3d:"Choose one small step and begin.",
    footer:"Bigger ideas. Clearer steps. Real progress.",
    footerStatus:"Prototype in development"
  },

  fr: {
    navChat:"Assistant",navTools:"Outils",navAbout:"À propos",
    prototype:"Prototype",eyebrow:"Un espace pour vos idées et projets",
    headline:'Bienvenue sur <span>ASSAD AI</span>',
    intro:"Dites-nous ce que vous souhaitez accomplir. Nous vous aiderons à organiser vos idées.",
    chatTitle:"Discussion ASSAD",chatSub:"Votre assistant pour transformer les idées en actions",
    online:"En ligne",chooseAgent:"Choisir un agent :",historyTitle:"Historique",
    newChat:"Nouvelle discussion",localNote:"Historique enregistré sur cet appareil uniquement.",
    welcome:"Bonjour ! Je suis ASSAD. Présentez-moi votre idée ou votre objectif.",
    now:"Maintenant",history:"Historique",clearChat:"Effacer",
    quickTitle:"Vous ne savez pas par où commencer ?",
    chip1:"✦ Créer une entreprise",chip2:"⌘ Apprendre une compétence",
    chip3:"▤ Développer une application",messageLabel:"Votre message",
    placeholder:"Écrivez votre idée ou posez une question...",privacy:"🔒 Ne saisissez pas de mots de passe ni d'informations sensibles.",
    send:"Envoyer",apiHint:"Le chat utilise le serveur ASSAD AI.",
    workspace:"Espace de travail",toolsTitle:"Vos outils au même endroit",
    toolsIntro:"Tout pour organiser vos idées et vos projets.",
    available:"Disponible",core:"Votre assistant principal pour les idées et la planification.",
    open:"Ouvrir l'assistant ←",agents:"Agents spécialisés en programmation, planification, recherche et rédaction.",
    chooseAgentLink:"Choisir un agent ←",work:"Créez des projets et suivez vos tâches.",
    openWorkspace:"Ouvrir l'espace ←",creative:"Créez des prompts pour images, vidéos et publications.",
    openCreative:"Ouvrir le studio ←",workspaceTitle:"Vos projets",
    workspaceDesc:"Créez des projets, ajoutez des tâches et suivez vos progrès.",
    projectPlaceholder:"Nom du projet...",addProject:"＋ Créer un projet",
    workspaceLocal:"Vos projets sont enregistrés sur cet appareil.",
    creativeTitle:"Studio créatif",
    creativeDesc:"Préparez votre demande créative avec ASSAD.",
    contentType:"Type de contenu",imagePrompt:"Prompt d'image",
    videoPrompt:"Prompt de vidéo courte",socialPost:"Publication sociale",
    contentIdeas:"Idées de contenu",creativeDetails:"Décrivez votre idée",
    creativePlaceholder:"Exemple : Une vidéo drôle avec une banane et une pêche...",
    sendToAssistant:"✦ Préparer avec ASSAD",
    creativeNote:"Création de textes et prompts. La génération directe nécessite un service externe.",
    how:"Comment ça marche ?",howTitle:"Trois étapes simples",
    step1:"Dites-nous votre objectif",step1d:"Décrivez votre idée.",
    step2:"Organisez votre plan",step2d:"Transformez votre idée en étapes.",
    step3:"Commencez",step3d:"Choisissez une petite étape.",
    footer:"De grandes idées. Des étapes claires. De vrais résultats.",
    footerStatus:"Prototype en développement"
  }
};

const agents = {
  general: {
    name: "ASSAD CORE",
    instruction: "You are ASSAD CORE, a helpful general AI assistant. Respond clearly, accurately and practically. Match the user's language."
  },
  coding: {
    name: "ASSAD CODE",
    instruction: "You are ASSAD CODE, a senior software engineer. Help with programming, debugging and architecture. Give complete working code when requested. Explain how to install and run it. Match the user's language."
  },
  planning: {
    name: "ASSAD PLAN",
    instruction: "You are ASSAD PLAN, an expert project planner. Convert goals into realistic milestones, concrete actions, priorities and measurable outcomes. Match the user's language."
  },
  research: {
    name: "ASSAD RESEARCH",
    instruction: "You are ASSAD RESEARCH, an analytical research assistant. Separate facts from assumptions, explain uncertainty and structure your analysis. Never pretend to browse the internet or verify sources when you cannot. Match the user's language."
  },
  writing: {
    name: "ASSAD WRITE",
    instruction: "You are ASSAD WRITE, a professional writing assistant. Produce polished writing suited to the requested audience, format and tone. Match the user's language."
  }
};

/* =========================================
   STORAGE HELPERS
   ========================================= */

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("ASSAD storage error:", error);
    alert("مساحة التخزين ممتلئة أو غير متاحة. احذف بعض البيانات القديمة.");
    return false;
  }
}

/* =========================================
   CHAT STATE
   ========================================= */

let conversations = readStorage(STORAGE.conversations, []);
let currentConversationId = null;
let history = [];
let busy = false;
let currentLanguage = localStorage.getItem(STORAGE.language) || "ar";

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getWelcomeMessage() {
  return translations[currentLanguage].welcome;
}

function getCurrentConversation() {
  return conversations.find(c => c.id === currentConversationId);
}

function saveConversations() {
  writeStorage(STORAGE.conversations, conversations);
}

function createConversation() {
  const conversation = {
    id: makeId(),
    title: currentLanguage === "en" ? "New chat" :
      currentLanguage === "fr" ? "Nouvelle discussion" : "محادثة جديدة",
    agent: $("#agent-select").value,
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  conversations.unshift(conversation);
  currentConversationId = conversation.id;
  history = [];
  saveConversations();
  renderChat();
  renderHistory();
  $("#agent-select").value = conversation.agent;
}

function ensureConversation() {
  if (!currentConversationId || !getCurrentConversation()) {
    createConversation();
  }
  return getCurrentConversation();
}

function saveMessage(role, content) {
  const conversation = ensureConversation();

  conversation.messages.push({ role, content });
  conversation.updatedAt = Date.now();

  if (role === "user" && conversation.messages.length === 1) {
    conversation.title = content.slice(0, 35) || "ASSAD Chat";
  }

  conversation.agent = $("#agent-select").value;
  history = conversation.messages.map(m => ({
    role: m.role,
    content: m.content
  }));

  saveConversations();
  renderHistory();
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function renderChat() {
  const chat = $("#chat");
  if (!chat) return;

  chat.innerHTML = "";

  const conversation = getCurrentConversation();
  const messages = conversation ? conversation.messages : [];

  if (!messages.length) {
    addMessage("bot", getWelcomeMessage(), false);
    return;
  }

  messages.forEach(message => {
    addMessage(message.role === "assistant" ? "bot" : "user", message.content, false);
  });

  chat.scrollTop = chat.scrollHeight;
}

function addMessage(type, content, scroll = true) {
  const chat = $("#chat");
  if (!chat) return;

  const row = document.createElement("div");
  row.className = "message " + (type === "user" ? "user" : "bot");

  if (type === "bot") {
    const image = document.createElement("img");
    image.src = "assets/logo.svg";
    image.alt = "ASSAD";
    row.appendChild(image);
  }

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const paragraph = document.createElement("p");
  paragraph.textContent = content;
  bubble.appendChild(paragraph);

  const time = document.createElement("small");
  time.textContent = new Date().toLocaleTimeString(
    currentLanguage === "ar" ? "ar" : currentLanguage,
    { hour: "2-digit", minute: "2-digit" }
  );
  bubble.appendChild(time);

  if (type === "bot") {
    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "copy-btn";
    copy.textContent = currentLanguage === "en" ? "Copy answer" :
      currentLanguage === "fr" ? "Copier" : "نسخ الإجابة";

    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(content);
        copy.textContent = currentLanguage === "en" ? "Copied ✓" :
          currentLanguage === "fr" ? "Copié ✓" : "تم النسخ ✓";
      } catch {
        copy.textContent = "تعذر النسخ";
      }
    });

    bubble.appendChild(copy);
  }

  row.appendChild(bubble);
  chat.appendChild(row);

  if (scroll) chat.scrollTop = chat.scrollHeight;
}

function showTyping() {
  removeTyping();

  const chat = $("#chat");
  const row = document.createElement("div");
  row.className = "message bot";
  row.id = "assad-typing";

  const image = document.createElement("img");
  image.src = "assets/logo.svg";
  image.alt = "ASSAD";

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const typing = document.createElement("div");
  typing.className = "typing";

  for (let i = 0; i < 3; i++) {
    typing.appendChild(document.createElement("span"));
  }

  const status = document.createElement("small");
  status.id = "typing-status";
  status.textContent = currentLanguage === "en" ? "ASSAD is thinking..." :
    currentLanguage === "fr" ? "ASSAD réfléchit..." : "ASSAD يفكر الآن...";

  bubble.append(typing, status);
  row.append(image, bubble);
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;

  const labels = currentLanguage === "en"
    ? ["Thinking...", "Organizing ideas...", "Preparing the answer..."]
    : currentLanguage === "fr"
    ? ["Réflexion...", "Organisation des idées...", "Préparation de la réponse..."]
    : ["يفكر في طلبك...", "يرتب الأفكار...", "يجهز الإجابة..."];

  let index = 0;
  row._timer = setInterval(() => {
    index = (index + 1) % labels.length;
    if ($("#typing-status")) $("#typing-status").textContent = labels[index];
  }, 2200);
}

function removeTyping() {
  const old = $("#assad-typing");
  if (!old) return;
  if (old._timer) clearInterval(old._timer);
  old.remove();
}

/* =========================================
   SEND MESSAGE
   ========================================= */

async function sendMessage(text) {
  if (busy || !text.trim()) return;

  busy = true;

  const input = $("#prompt");
  const send = $("#send");

  input.value = "";
  input.style.height = "auto";
  send.disabled = true;
  send.style.opacity = ".55";

  const conversation = ensureConversation();
  conversation.agent = $("#agent-select").value;

  addMessage("user", text);
  saveMessage("user", text);
  showTyping();

  const selectedAgent = agents[conversation.agent] || agents.general;

  const messages = [
    {
      role: "system",
      content: selectedAgent.instruction
    },
    ...history
  ];

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages })
    });

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const data = await response.json();

    const answer = data.reply ||
      data.response ||
      data.message?.content ||
      data.result?.response ||
      data.choices?.[0]?.message?.content;

    if (typeof answer !== "string" || !answer.trim()) {
      throw new Error("Empty AI response");
    }

    removeTyping();
    addMessage("bot", answer);
    saveMessage("assistant", answer);

  } catch (error) {
    console.error("ASSAD API error:", error);
    removeTyping();

    const errorMessage = currentLanguage === "en"
      ? "I couldn't connect to ASSAD right now. Please check your connection and try again."
      : currentLanguage === "fr"
      ? "Impossible de contacter ASSAD pour le moment. Vérifiez votre connexion et réessayez."
      : "تعذر الاتصال بـ ASSAD حالياً. تحقق من اتصال الإنترنت وحاول مرة أخرى.";

    addMessage("bot", errorMessage);
  } finally {
    busy = false;
    send.disabled = false;
    send.style.opacity = "1";
    input.focus();
  }
}

/* =========================================
   CHAT HISTORY
   ========================================= */

function renderHistory() {
  const list = $("#history-list");
  if (!list) return;

  list.innerHTML = "";

  if (!conversations.length) {
    const empty = document.createElement("p");
    empty.className = "local-note";
    empty.textContent = currentLanguage === "en" ? "No saved chats yet." :
      currentLanguage === "fr" ? "Aucune discussion enregistrée." : "لا توجد محادثات محفوظة بعد.";
    list.appendChild(empty);
    return;
  }

  conversations.forEach(conversation => {
    const item = document.createElement("div");
    item.className = "history-item" +
      (conversation.id === currentConversationId ? " active" : "");

    const open = document.createElement("button");
    open.type = "button";
    open.className = "history-open";
    open.textContent = conversation.title || "ASSAD";
    open.title = conversation.title || "ASSAD";

    open.addEventListener("click", () => {
      openConversation(conversation.id);
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "history-delete";
    remove.textContent = "×";
    remove.title = currentLanguage === "en" ? "Delete chat" : "حذف المحادثة";

    remove.addEventListener("click", () => {
      if (!confirm(currentLanguage === "en" ? "Delete this conversation?" :
        currentLanguage === "fr" ? "Supprimer cette discussion ?" : "هل تريد حذف هذه المحادثة؟")) return;

      conversations = conversations.filter(c => c.id !== conversation.id);

      if (currentConversationId === conversation.id) {
        currentConversationId = null;
        history = [];
        renderChat();
      }

      saveConversations();
      renderHistory();
    });

    item.append(open, remove);
    list.appendChild(item);
  });
}

function openConversation(id) {
  const conversation = conversations.find(c => c.id === id);
  if (!conversation) return;

  currentConversationId = id;
  history = conversation.messages.map(m => ({
    role: m.role,
    content: m.content
  }));

  $("#agent-select").value = agents[conversation.agent] ? conversation.agent : "general";

  renderChat();
  renderHistory();

  $("#history-panel").classList.remove("open");
}

function clearCurrentConversation() {
  if (!confirm(currentLanguage === "en" ? "Clear this conversation?" :
    currentLanguage === "fr" ? "Effacer cette discussion ?" : "هل تريد مسح هذه المحادثة؟")) return;

  const conversation = getCurrentConversation();

  if (conversation) {
    conversation.messages = [];
    conversation.title = currentLanguage === "en" ? "New chat" :
      currentLanguage === "fr" ? "Nouvelle discussion" : "محادثة جديدة";
    conversation.updatedAt = Date.now();
  }

  history = [];
  saveConversations();
  renderChat();
  renderHistory();
}

/* =========================================
   WORKSPACE PROJECTS
   ========================================= */

let projects = readStorage(STORAGE.projects, []);

function saveProjects() {
  writeStorage(STORAGE.projects, projects);
}

function renderProjects() {
  const container = $("#projects-list");
  if (!container) return;

  container.innerHTML = "";

  if (!projects.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = currentLanguage === "en"
      ? "No projects yet. Create your first project!"
      : currentLanguage === "fr"
      ? "Aucun projet. Créez votre premier projet !"
      : "لا توجد مشاريع بعد. أنشئ مشروعك الأول!";
    container.appendChild(empty);
    return;
  }

  projects.forEach(project => {
    const card = document.createElement("article");
    card.className = "project-card";

    const top = document.createElement("div");
    top.className = "project-top";

    const title = document.createElement("h3");
    title.textContent = "▤ " + project.name;

    const deleteButton = document.createElement("button");
    deleteButton.className = "project-delete";
    deleteButton.type = "button";
    deleteButton.textContent = currentLanguage === "en" ? "Delete" :
      currentLanguage === "fr" ? "Supprimer" : "حذف";

    deleteButton.addEventListener("click", () => {
      if (!confirm(currentLanguage === "en" ? "Delete this project?" :
        currentLanguage === "fr" ? "Supprimer ce projet ?" : "هل تريد حذف المشروع؟")) return;

      projects = projects.filter(p => p.id !== project.id);
      saveProjects();
      renderProjects();
    });

    top.append(title, deleteButton);

    const tasks = project.tasks || [];
    const completed = tasks.filter(t => t.done).length;
    const percentage = tasks.length ? Math.round(completed / tasks.length * 100) : 0;

    const progress = document.createElement("div");
    progress.className = "project-progress";

    const fill = document.createElement("span");
    fill.style.width = percentage + "%";
    progress.appendChild(fill);

    const meta = document.createElement("div");
    meta.className = "project-meta";

    const count = document.createElement("span");
    count.textContent = completed + " / " + tasks.length;

    const percent = document.createElement("span");
    percent.textContent = percentage + "%";

    meta.append(count, percent);

    const taskForm = document.createElement("form");
    taskForm.className = "task-form";

    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.maxLength = 150;
    taskInput.placeholder = currentLanguage === "en" ? "New task..." :
      currentLanguage === "fr" ? "Nouvelle tâche..." : "مهمة جديدة...";
    taskInput.required = true;

    const taskButton = document.createElement("button");
    taskButton.type = "submit";
    taskButton.textContent = "+";

    taskForm.append(taskInput, taskButton);

    taskForm.addEventListener("submit", event => {
      event.preventDefault();

      const name = taskInput.value.trim();
      if (!name) return;

      project.tasks.push({
        id: makeId(),
        name,
        done: false
      });

      saveProjects();
      renderProjects();
    });

    const taskList = document.createElement("div");
    taskList.className = "task-list";

    tasks.forEach(task => {
      const row = document.createElement("label");
      row.className = "task-row" + (task.done ? " done" : "");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = !!task.done;

      checkbox.addEventListener("change", () => {
        task.done = checkbox.checked;
        saveProjects();
        renderProjects();
      });

      const name = document.createElement("span");
      name.textContent = task.name;

      row.append(checkbox, name);
      taskList.appendChild(row);
    });

    card.append(top, progress, meta, taskForm, taskList);
    container.appendChild(card);
  });
}

function createProject(name) {
  projects.unshift({
    id: makeId(),
    name,
    tasks: [],
    createdAt: Date.now()
  });

  saveProjects();
  renderProjects();
}

/* =========================================
   CREATIVE STUDIO
   ========================================= */

function prepareCreativeRequest() {
  const type = $("#creative-type").value;
  const details = $("#creative-details").value.trim();

  if (!details) {
    alert(currentLanguage === "en" ? "Please describe your idea first." :
      currentLanguage === "fr" ? "Décrivez d'abord votre idée." :
      "اكتب وصف فكرتك أولاً.");
    $("#creative-details").focus();
    return;
  }

  const requests = {
    ar: {
      image: "اكتب لي برومبت احترافياً ومفصلاً لتوليد صورة بالذكاء الاصطناعي. اجعله غنياً بالتفاصيل والإضاءة وزاوية الكاميرا والأسلوب الفني. فكرتي: ",
      video: "اكتب لي برومبت احترافياً لإنشاء فيديو قصير بالذكاء الاصطناعي، مع وصف المشاهد وحركة الكاميرا والشخصيات والحوار والمؤثرات الصوتية. فكرتي: ",
      post: "اكتب لي منشوراً احترافياً وجذاباً لوسائل التواصل الاجتماعي، مع بداية قوية ودعوة للتفاعل وهاشتاغات مناسبة. فكرتي: ",
      ideas: "اقترح لي 15 فكرة محتوى إبداعية ومميزة قابلة للانتشار، واشرح طريقة تنفيذ كل فكرة باختصار. المجال: "
    },
    en: {
      image: "Write a detailed professional AI image generation prompt including lighting, camera angle, composition and art style. My idea: ",
      video: "Write a professional AI short-video prompt with scenes, camera movement, characters, dialogue and sound effects. My idea: ",
      post: "Write an engaging social media post with a strong hook, call to action and relevant hashtags. My idea: ",
      ideas: "Give me 15 original and engaging content ideas and briefly explain how to execute each one. Topic: "
    },
    fr: {
      image: "Écrivez un prompt professionnel détaillé pour générer une image IA, avec éclairage, cadrage et style artistique. Mon idée : ",
      video: "Écrivez un prompt professionnel pour une courte vidéo IA avec scènes, mouvements de caméra et dialogues. Mon idée : ",
      post: "Rédigez une publication engageante avec une accroche, un appel à l'action et des hashtags. Mon idée : ",
      ideas: "Proposez 15 idées de contenu originales et expliquez brièvement comment les réaliser. Sujet : "
    }
  };

  const message = requests[currentLanguage][type] + details;

  $("#prompt").value = message;
  $("#assistant").scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    $("#prompt").focus();
  }, 350);
}

/* =========================================
   LANGUAGE
   ========================================= */

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : "ar";
  localStorage.setItem(STORAGE.language, currentLanguage);

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

  $$("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    const value = translations[currentLanguage][key];

    if (value !== undefined) {
      if (key === "headline") element.innerHTML = value;
      else element.textContent = value;
    }
  });

  $$("[data-i18n-placeholder]").forEach(element => {
    const key = element.dataset.i18nPlaceholder;
    const value = translations[currentLanguage][key];
    if (value !== undefined) element.placeholder = value;
  });

  $("#language").value = currentLanguage;
  renderChat();
  renderHistory();
  renderProjects();
}

/* =========================================
   EVENT LISTENERS
   ========================================= */

function initializeApp() {
  $("#year").textContent = new Date().getFullYear();

  $("#chat-form").addEventListener("submit", event => {
    event.preventDefault();
    sendMessage($("#prompt").value);
  });

  $("#prompt").addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      $("#chat-form").requestSubmit();
    }
  });

  $("#new-chat").addEventListener("click", createConversation);

  $("#clear-chat").addEventListener("click", clearCurrentConversation);

  $("#history-toggle").addEventListener("click", () => {
    $("#history-panel").classList.toggle("open");
  });

  $("#close-history").addEventListener("click", () => {
    $("#history-panel").classList.remove("open");
  });

  $("#agent-select").addEventListener("change", () => {
    const conversation = getCurrentConversation();
    if (conversation) {
      conversation.agent = $("#agent-select").value;
      saveConversations();
      renderHistory();
    }
  });

  $("#project-form").addEventListener("submit", event => {
    event.preventDefault();

    const input = $("#project-name");
    const name = input.value.trim();

    if (!name) return;

    createProject(name);
    input.value = "";
  });

  $("#creative-send").addEventListener("click", prepareCreativeRequest);

  $$(".chips button").forEach(button => {
    button.addEventListener("click", () => {
      $("#prompt").value = button.dataset.prompt || "";
      $("#assistant").scrollIntoView({ behavior: "smooth" });
      $("#prompt").focus();
    });
  });

  $("#language").addEventListener("change", event => {
    applyLanguage(event.target.value);
  });

  // Restore previous conversation or create a new one.
  const lastConversation = conversations[0];

  if (lastConversation) {
    openConversation(lastConversation.id);
  } else {
    createConversation();
  }

  renderHistory();
  renderProjects();
  applyLanguage(currentLanguage);
}

document.addEventListener("DOMContentLoaded", initializeApp);
