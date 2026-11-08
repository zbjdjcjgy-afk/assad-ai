
// ASSAD AI - Main JavaScript

const ASSAD_API_URL = "https://assad-ai-api.zbjdjcjgy.workers.dev/api/chat";

const T = {
  ar: {
    navChat:"المساعد",navTools:"الأدوات",navAbout:"عن المنصة",prototype:"نسخة تجريبية",
    eyebrow:"مساحة واحدة لأفكارك ومشاريعك",
    headline:'أهلاً بك في <span>ASSAD AI</span>',
    intro:"قل لنا ما الذي تريد إنجازه. سنساعدك على فهم الفكرة وترتيب الخطوات والبدء بثقة.",
    chatTitle:"محادثة ASSAD",chatSub:"مساعدك لتنظيم الأفكار وتحويلها إلى عمل",
    notReady:"الربط الذكي قيد الإعداد",
    welcome:"مرحباً! أنا ASSAD. أخبرني بفكرتك أو هدفك، وسنقسمه معاً إلى خطوات واضحة.",
    now:"الآن",quickTitle:"لست متأكداً من أين تبدأ؟ جرّب:",
    chip1:"✦ إنشاء مشروع تجاري",chip2:"⌘ تعلم مهارة جديدة",chip3:"▤ تطوير فكرة تطبيق",
    messageLabel:"اكتب رسالتك",placeholder:"اكتب فكرتك أو اسأل ASSAD...",
    privacy:"🔒 لا تضع كلمات مرور أو معلومات حساسة هنا.",
    send:"إرسال",apiHint:"المحادثة الذكية الحقيقية ستعمل بعد إعداد الخادم ومفتاح API الآمن.",
    workspace:"مساحة العمل",toolsTitle:"أدواتك في مكان واحد",
    toolsIntro:"ابدأ بأداة واحدة، وسنضيف المزيد مع تطور المنصة.",
    available:"متاح تجريبياً",
    core:"المساعد الرئيسي لفهم الأفكار والتخطيط وحل المشكلات.",
    open:"افتح المساعد ←",soon:"قريباً",
    agents:"وكلاء متخصصون للمهام متعددة الخطوات.",
    work:"نظّم مشاريعك وملاحظاتك وخطواتك القادمة.",
    creative:"أدوات مستقبلية لصناعة المحتوى والأفكار البصرية.",
    how:"كيف نعمل؟",howTitle:"ثلاث خطوات بسيطة",
    step1:"أخبرنا بما تريد",step1d:"اكتب هدفك حتى لو كانت الفكرة غير مكتملة.",
    step2:"رتّب خطتك",step2d:"حوّل الفكرة إلى مراحل وخطوات مفهومة.",
    step3:"ابدأ التنفيذ",step3d:"اختر خطوة صغيرة وابدأ في إنجازها.",
    footer:"أفكار أكبر. خطوات أوضح. إنجاز حقيقي.",
    footerStatus:"نسخة أولية قيد التطوير",
    missing:"واجهة المحادثة جاهزة، لكن خادم الذكاء الاصطناعي لم يُربط بعد. سنكمل إعداده في الخطوة التالية.",
    error:"تعذر الاتصال بالمساعد حالياً. تحقق من إعداد الخادم ثم حاول مجدداً.",
    thinking:"ASSAD يفكر الآن...",
    tooLong:"الرسالة طويلة جداً. اختصرها قليلاً."
  },

  en: {
    navChat:"Assistant",navTools:"Tools",navAbout:"About",prototype:"Prototype",
    eyebrow:"One space for your ideas and projects",
    headline:'Welcome to <span>ASSAD AI</span>',
    intro:"Tell us what you want to achieve. We'll help shape the idea, organize the steps and start with confidence.",
    chatTitle:"Chat with ASSAD",chatSub:"Your partner for turning ideas into action",
    notReady:"AI connection pending",
    welcome:"Hello! I'm ASSAD. Tell me your idea or goal, and we'll break it into clear steps together.",
    now:"Now",quickTitle:"Not sure where to start? Try:",
    chip1:"✦ Start a business",chip2:"⌘ Learn a new skill",chip3:"▤ Build an app idea",
    messageLabel:"Write your message",placeholder:"Share an idea or ask ASSAD...",
    privacy:"🔒 Do not share passwords or sensitive data.",
    send:"Send",apiHint:"Live AI chat will be enabled after the secure server and API key are configured.",
    workspace:"Workspace",toolsTitle:"Your tools, all in one place",
    toolsIntro:"Start with one tool. More will arrive as the platform grows.",
    available:"Prototype available",
    core:"Your main assistant for ideas, planning and problem-solving.",
    open:"Open assistant →",soon:"Coming soon",
    agents:"Specialized agents for multi-step tasks.",
    work:"Organize projects, notes and next actions.",
    creative:"Future tools for content and visual ideas.",
    how:"How it works",howTitle:"Three simple steps",
    step1:"Tell us what you want",step1d:"Share your goal, even if the idea is incomplete.",
    step2:"Organize your plan",step2d:"Turn the idea into clear stages and steps.",
    step3:"Start doing",step3d:"Choose one small action and make progress.",
    footer:"Bigger ideas. Clearer steps. Real progress.",
    footerStatus:"Early prototype in development",
    missing:"The chat is ready, but the AI server is not connected yet. We'll finish setup next.",
    error:"The assistant could not be reached. Check the server and try again.",
    thinking:"ASSAD is thinking...",
    tooLong:"That message is too long. Please shorten it."
  },

  fr: {
    navChat:"Assistant",navTools:"Outils",navAbout:"À propos",prototype:"Prototype",
    eyebrow:"Un espace pour vos idées et projets",
    headline:'Bienvenue sur <span>ASSAD AI</span>',
    intro:"Dites-nous ce que vous souhaitez accomplir. Nous vous aiderons à clarifier l'idée et organiser les étapes.",
    chatTitle:"Discuter avec ASSAD",chatSub:"Votre partenaire pour passer des idées à l'action",
    notReady:"Connexion IA en attente",
    welcome:"Bonjour ! Je suis ASSAD. Parlez-moi de votre idée ou objectif et nous le diviserons en étapes claires.",
    now:"Maintenant",quickTitle:"Vous ne savez pas par où commencer ? Essayez :",
    chip1:"✦ Créer une entreprise",chip2:"⌘ Apprendre une compétence",chip3:"▤ Créer une application",
    messageLabel:"Votre message",placeholder:"Partagez une idée ou posez une question...",
    privacy:"🔒 Ne partagez pas de mots de passe ni de données sensibles.",
    send:"Envoyer",apiHint:"Le chat IA sera activé après la configuration du serveur sécurisé et de la clé API.",
    workspace:"Espace de travail",toolsTitle:"Vos outils au même endroit",
    toolsIntro:"Commencez avec un outil. D'autres arriveront progressivement.",
    available:"Prototype disponible",
    core:"Votre assistant principal pour réfléchir, planifier et résoudre des problèmes.",
    open:"Ouvrir l'assistant →",soon:"Bientôt",
    agents:"Des agents spécialisés pour les tâches en plusieurs étapes.",
    work:"Organisez vos projets, notes et prochaines actions.",
    creative:"De futurs outils pour le contenu et les idées visuelles.",
    how:"Comment ça marche ?",howTitle:"Trois étapes simples",
    step1:"Dites-nous votre objectif",step1d:"Partagez votre objectif, même si l'idée est incomplète.",
    step2:"Organisez votre plan",step2d:"Transformez l'idée en étapes claires.",
    step3:"Passez à l'action",step3d:"Choisissez une petite action et avancez.",
    footer:"De grandes idées. Des étapes claires. Des progrès réels.",
    footerStatus:"Prototype initial en développement",
    missing:"L'interface est prête, mais le serveur IA n'est pas encore connecté.",
    error:"Impossible de joindre l'assistant. Vérifiez la configuration du serveur.",
    thinking:"ASSAD réfléchit...",
    tooLong:"Message trop long. Veuillez le raccourcir."
  }
};

// عناصر الصفحة
const lang = document.getElementById("language");
const chat = document.getElementById("chat");
const input = document.getElementById("prompt");
const send = document.getElementById("send");

let history = [];
let busy = false;

// الترجمة
const tr = k => (T[lang.value] || T.ar)[k] || T.ar[k] || k;

function setLang(v) {
  const d = T[v] || T.ar;

  document.documentElement.lang = v;
  document.documentElement.dir = v === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(e => {
    if (d[e.dataset.i18n] !== undefined) {
      e.innerHTML = d[e.dataset.i18n];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(e => {
    if (d[e.dataset.i18nPlaceholder]) {
      e.placeholder = d[e.dataset.i18nPlaceholder];
    }
  });
}

lang.addEventListener("change", e => setLang(e.target.value));

// إضافة رسالة
function add(role, text) {
  const row = document.createElement("div");

  row.className = "message " + (role === "user" ? "user" : "bot");

  if (role !== "user") {
    const img = document.createElement("img");
    img.src = "assets/logo.svg";
    img.alt = "ASSAD";
    row.append(img);
  }

  const b = document.createElement("div");
  b.className = "bubble";

  const p = document.createElement("p");
  p.textContent = text;
  b.append(p);

  const s = document.createElement("small");
  s.textContent = tr("now");
  b.append(s);

  row.append(b);
  chat.append(row);

  chat.scrollTop = chat.scrollHeight;

  return row;
}

// عبارات الانتظار حسب اللغة
function getThinkingMessages() {
  const messages = {
    ar: [
      "أحلل سؤالك...",
      "أجهز أفضل إجابة لك...",
      "أرتب الأفكار...",
      "أراجع المعلومات...",
      "لحظات فقط، أقترب من الانتهاء..."
    ],

    en: [
      "Analyzing your question...",
      "Preparing the best answer...",
      "Organizing ideas...",
      "Reviewing the information...",
      "Almost ready..."
    ],

    fr: [
      "J'analyse votre question...",
      "Je prépare la meilleure réponse...",
      "J'organise les idées...",
      "Je vérifie les informations...",
      "Presque terminé..."
    ]
  };

  return messages[lang.value] || messages.ar;
}

// إنشاء مؤشر الانتظار
function createThinkingMessage() {
  const row = add("bot", "");

  row.classList.add("thinking-message");

  const bubble = row.querySelector(".bubble");
  bubble.replaceChildren();

  const indicator = document.createElement("div");
  indicator.className = "typing-indicator";

  for (let i = 0; i < 3; i++) {
    indicator.append(document.createElement("span"));
  }

  const status = document.createElement("div");
  status.className = "thinking-text";

  const time = document.createElement("small");
  time.textContent = tr("now");

  bubble.append(indicator, status, time);

  let index = 0;
  let messages = getThinkingMessages();

  status.textContent = messages[index];

  const timer = setInterval(() => {
    messages = getThinkingMessages();

    index = (index + 1) % messages.length;
    status.textContent = messages[index];

    chat.scrollTop = chat.scrollHeight;
  }, 2500);

  return {
    row,
    timer
  };
}

// إرسال الرسائل إلى ASSAD AI
async function submitMessage(text) {
  const msg = text.trim();

  if (!msg || busy) return;

  if (msg.length > 4000) {
    add("bot", tr("tooLong"));
    return;
  }

  add("user", msg);

  input.value = "";
  input.style.height = "auto";

  history.push({
    role: "user",
    content: msg
  });

  if (history.length > 20) {
    history = history.slice(-20);
  }

  if (!ASSAD_API_URL) {
    add("bot", tr("missing"));
    return;
  }

  busy = true;
  send.disabled = true;
  send.firstChild.textContent = tr("thinking");

  // عرض مؤشر الانتظار
  const thinking = createThinkingMessage();

  try {
    const r = await fetch(ASSAD_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: history
      })
    });

    const data = await r.json();

    if (!r.ok) {
      throw Error(data.error || "API error");
    }

    const answer = String(data.reply || "").trim();

    if (!answer) {
      throw Error("Empty answer");
    }

    // إيقاف حركة الانتظار
    clearInterval(thinking.timer);
    thinking.row.remove();

    history.push({
      role: "assistant",
      content: answer
    });

    if (history.length > 20) {
      history = history.slice(-20);
    }

    // إظهار الإجابة
    add("bot", answer);

  } catch (e) {

    // إيقاف حركة الانتظار عند الخطأ
    clearInterval(thinking.timer);
    thinking.row.remove();

    history.pop();

    add("bot", tr("error"));

  } finally {

    busy = false;
    send.disabled = false;
    send.firstChild.textContent = tr("send");

  }
}

// إرسال النموذج
document.getElementById("chat-form").addEventListener("submit", e => {
  e.preventDefault();
  submitMessage(input.value);
});

// ضبط ارتفاع مربع الكتابة
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 140) + "px";
});

// الأزرار السريعة
document.querySelectorAll("[data-prompt]").forEach(b => {
  b.addEventListener("click", () => {
    input.value = b.dataset.prompt;
    input.focus();
    input.dispatchEvent(new Event("input"));
  });
});

// السنة الحالية
document.getElementById("year").textContent = new Date().getFullYear();

// اللغة الافتراضية
setLang("ar");
