const quickQueries = [
  "Что по муке за 2025?",
  "Кто согласовал счёт 44-09?",
  "Чем закрыт платёж от 15.09?",
  "Что изменилось между v2 и v3 договора с ООО \"Мука\"?",
  "Покажи неоплаченные счета за сентябрь"
];

const knowledgeBase = {
  "что по муке за 2025?": {
    title: "Сводка по муке за 2025",
    summary: "Купили 42 т, средняя цена 31,6 ₽/кг. В сентябре рост +10% к августу.",
    meta: [
      "Актуально на 25.09.2025",
      "Ответственный аналитик: Иван Петров",
      "Использовано 5 карточек и 12 версий документов"
    ],
    metrics: [
      { label: "Объём", value: "42 т", detail: "Годовой объём закупок" },
      { label: "Средняя цена", value: "31,6 ₽/кг", detail: "По всем закрытым заказам" },
      { label: "Сентябрь к августу", value: "+10%", detail: "Рост средней цены" },
      { label: "Доля автоматизации", value: "87%", detail: "Карточек без ручных правок" }
    ],
    table: {
      columns: ["Месяц", "Объём, т", "Средняя цена", "MoM %"],
      rows: [
        { month: "Июль", volume: "3,6", price: "30,2 ₽", mom: "−2%" },
        { month: "Август", volume: "4,2", price: "28,7 ₽", mom: "−5%" },
        { month: "Сентябрь", volume: "5,1", price: "31,6 ₽", mom: "+10%", highlight: true }
      ]
    },
    sources: [
      {
        title: "PO-2025-0912.pdf",
        type: "Заказ",
        description: "Исходный заказ на поставку муки. Подтверждён 12.09 Марией Смирновой.",
        body: "Документ загружен из закупочной системы. Версия v3, включена индексация CPI+2%."
      },
      {
        title: "Invoice-44-09.pdf",
        type: "Счёт",
        description: "Счёт 44-09 на 150 000 ₽ от 14.09.",
        body: "Автораспознавание извлекло сумму, дату, счёт привязан к PO-2025-0912 зелёной связью по номеру."
      },
      {
        title: "Payment-2025-09-15.pdf",
        type: "Платёж",
        description: "Платёжка от 15.09 на 150 000 ₽.",
        body: "Связано по назначению платежа и сумме. Подтверждено бухгалтерией 15.09 09:12."
      },
      {
        title: "Re: счёт 44-09",
        type: "Письмо",
        description: "Переписка об оплате счёта.",
        body: "Тред из почты. Ветка подтянута автоматически, прикреплены три вложения."
      }
    ],
    explanation: [
      {
        title: "Как посчитан рост",
        body: "(Средняя цена сентября / Средняя цена августа) − 1 = (31,6 / 28,7) − 1 = 0,10"
      },
      {
        title: "Использованные факты",
        body: "Заказы: PO-2025-0912 (v3), Проведения: Payment-2025-09-15, Приёмка: Acceptance-2025-09-16, Переписка: Тред \"Re: счёт 44-09\""
      },
      {
        title: "Почему связали документы",
        body: "Счёт 44-09 связан с заказом по номеру и контрагенту (зелёная связь). Платёж связан с счётом по сумме и назначению (зелёная + жёлтая, подтверждено)."
      }
    ]
  },
  "кто согласовал счёт 44-09?": {
    title: "Согласование счёта 44-09",
    summary: "Согласовала Мария Смирнова 12.09 в 14:32. Возражений не зафиксировано.",
    meta: [
      "Маршрут: инициатор Иван Петров → финконтроль Мария Смирнова",
      "Карточка согласования в таск-трекере закрыта автоматически",
      "Аудит-лог: 4 просмотра, 0 правок"
    ],
    metrics: [
      { label: "Статус", value: "Согласован", detail: "Открытых блокеров нет" },
      { label: "Комментарий", value: "\"Лимит в бюджете есть\"", detail: "Внесён при согласовании" },
      { label: "Время прохождения", value: "3 ч 12 мин", detail: "От инициирования до решения" }
    ],
    table: {
      columns: ["Этап", "Исполнитель", "Статус", "Когда"],
      rows: [
        { stage: "Инициирование", owner: "Иван Петров", status: "Завершено", time: "12.09 11:20" },
        { stage: "Финконтроль", owner: "Мария Смирнова", status: "Согласовано", time: "12.09 14:32", highlight: true }
      ]
    },
    sources: [
      {
        title: "Approval-44-09",
        type: "Карточка согласования",
        description: "Подписано в таск-трекере 12.09.",
        body: "Аудит-лог содержит подписи Ивана Петрова и Марии Смирновой. Жёлтая связь с заказом подтверждена пользователем."
      },
      {
        title: "Сообщение в треде",
        type: "Чат",
        description: "Подтверждение лимита бюджета.",
        body: "Система сохранила переписку из рабочего чата. Мария приложила расчёт экономии."
      }
    ],
    explanation: [
      {
        title: "Как найден ответственный",
        body: "Карточка Approval-44-09 содержит поле responsible=Мария Смирнова. Документ связан с счётом 44-09 зелёной связью по ID карточки."
      },
      {
        title: "Проверка возражений",
        body: "Алгоритм искал комментарии со статусом 'Возражение'. Не найдено записей."
      }
    ]
  },
  "чем закрыт платёж от 15.09?": {
    title: "Связи платежа от 15.09",
    summary: "Платёж на 150 000 ₽ закрывает Invoice-44-09 по PO-2025-0912.",
    meta: [
      "Назначение: Оплата по договору с ООО \"Мука\"",
      "Совпадение суммы и контрагента",
      "Подтверждено бухгалтерией 15.09"
    ],
    metrics: [
      { label: "Сумма", value: "150 000 ₽", detail: "Строка из выписки" },
      { label: "Связей", value: "3", detail: "Счёт, заказ, переписка" },
      { label: "Уверенность", value: "96%", detail: "Зелёные связи: 2, жёлтые: 1" }
    ],
    table: {
      columns: ["Объект", "Тип связи", "Основание"],
      rows: [
        { entity: "Invoice-44-09", link: "Зелёная", reason: "Номер счёта в назначении платежа" },
        { entity: "PO-2025-0912", link: "Зелёная", reason: "Совпадение номера заказа" },
        { entity: "Письмо поставщика", link: "Жёлтая", reason: "Семантическое совпадение темы" }
      ]
    },
    sources: [
      {
        title: "Payment-2025-09-15.pdf",
        type: "Платёжка",
        description: "Выписка из банка",
        body: "Загружена из интернет-банка по вебхуку. Обработана модулем AI-Capture." 
      },
      {
        title: "Invoice-44-09.pdf",
        type: "Счёт",
        description: "Счёт на оплату",
        body: "Хэш файла совпадает с версией в системе."
      }
    ],
    explanation: [
      {
        title: "Как связали платёж",
        body: "В назначении платежа найден номер счёта 44-09. Сумма и контрагент совпали с Invoice-44-09 (зелёная связь)."
      },
      {
        title: "Проверка альтернатив",
        body: "В кандидаты попали ещё 2 счёта. Отклонены из-за разных сумм."
      }
    ]
  },
  "что изменилось между v2 и v3 договора с ооо \"мука\"?": {
    title: "Сравнение v2↔v3 договора с ООО \"Мука\"",
    summary: "В v3 лимит увеличен с 3 до 5 млн ₽, добавлена индексация CPI+2%.",
    meta: [
      "Версия v3 от 12.09.2025",
      "Согласовали: Иванов, Сидорова",
      "В историю внесены 2 комментария"
    ],
    metrics: [
      { label: "Лимит", value: "5 млн ₽", detail: "Было 3 млн ₽ в v2" },
      { label: "Новая опция", value: "Индексация CPI+2%", detail: "Добавлен раздел 4.3" }
    ],
    table: {
      columns: ["Поле", "v2", "v3"],
      rows: [
        { field: "Лимит", v2: "3 000 000 ₽", v3: "5 000 000 ₽", highlight: true },
        { field: "Индексация", v2: "—", v3: "CPI + 2%", highlight: true },
        { field: "Срок", v2: "до 31.12.2025", v3: "до 31.12.2025" }
      ]
    },
    sources: [
      {
        title: "Договор-ООО-Мука-v3.pdf",
        type: "Договор",
        description: "Подписанная версия v3",
        body: "Файл загружен из папки договоров. Содержит электронную подпись."
      },
      {
        title: "Протокол согласования",
        type: "Протокол",
        description: "Совещание 12.09",
        body: "Записан в системе задач. Решение добавлено в карточку договора."
      }
    ],
    explanation: [
      {
        title: "Как найдены отличия",
        body: "Алгоритм сравнения документов подсветил изменения сумм и новых пунктов в разделе 4."
      }
    ]
  },
  "покажи неоплаченные счета за сентябрь": {
    title: "Неоплаченные счета за сентябрь",
    summary: "4 счёта на 420 000 ₽. Среднее ожидание оплаты 9 дней.",
    meta: [
      "Последняя синхронизация 25.09 08:45",
      "2 счёта с просрочкой более 7 дней",
      "Предложено 3 автоматических напоминания"
    ],
    metrics: [
      { label: "Счета", value: "4", detail: "Всего в очереди" },
      { label: "Сумма", value: "420 000 ₽", detail: "По всем неоплаченным" },
      { label: "Просрочка", value: "2", detail: "> 7 дней" }
    ],
    table: {
      columns: ["Номер", "Контрагент", "Сумма", "Дата", "PO", "Ответственный", "Дней в ожидании"],
      rows: [
        { number: "INV-0915", vendor: "ООО \"Зерно\"", amount: "120 000 ₽", date: "05.09", po: "PO-2025-0903", owner: "Ирина К.", days: "20", highlight: true },
        { number: "INV-0918", vendor: "ИП Сидоров", amount: "80 000 ₽", date: "12.09", po: "PO-2025-0912", owner: "Мария С.", days: "13" },
        { number: "INV-0922", vendor: "ООО \"Мука\"", amount: "150 000 ₽", date: "15.09", po: "PO-2025-0912", owner: "Иван П.", days: "10" },
        { number: "INV-0927", vendor: "ООО \"Агро\"", amount: "70 000 ₽", date: "19.09", po: "PO-2025-0920", owner: "Ольга Н.", days: "6" }
      ]
    },
    sources: [
      {
        title: "Отчёт по оплатам",
        type: "Отчёт",
        description: "Формируется еженедельно",
        body: "Собран автоматически из ERP и банка."
      }
    ],
    explanation: [
      {
        title: "Как определена неоплата",
        body: "Нет зелёной связи с платежом, ожидается подтверждение из банка."
      }
    ]
  }
};

knowledgeBase["кто согласовал счёт 44-09 и были ли возражения?"] = knowledgeBase["кто согласовал счёт 44-09?"];
knowledgeBase["чем закрыт платёж от 15.09 на 150 000 ₽?"] = knowledgeBase["чем закрыт платёж от 15.09?"];

const activityFeedData = [
  { title: "Новый счёт 44-12", text: "ООО \"Мука\" на 95 000 ₽", tag: "AI-Capture" },
  { title: "Платёж проведён", text: "Payment-2025-09-18 закрыт автоматически", tag: "Автосшивка" },
  { title: "Обновление договора", text: "Договор с ООО \"Мука\" v3 → v4 (черновик)", tag: "Версия" },
  { title: "Алерт", text: "Платёж без закрывающих документов", tag: "Качество" }
];

const qualityAlerts = [
  { title: "Счёт INV-0915 без платежа", text: "Связь ожидает подтверждения более 10 дней" },
  { title: "Не хватает выписки №54", text: "Подключите банк \"Восток\" для завершения связки" }
];

const automationSwitches = [
  { id: "capture", label: "AI-Capture", description: "Автосбор и распознавание PDF/фото" },
  { id: "stitch", label: "Автосшивка", description: "Зелёные связи без участия людей" },
  { id: "rag", label: "RAG ответы", description: "Автоматический индекс для ИИ" }
];

const objectCards = [
  {
    id: "PO-2025-0912",
    name: "PO-2025-0912",
    type: "Закупка",
    status: "В работе",
    owner: "Иван Петров",
    value: "150 000 ₽",
    timeline: [
      "11.09 Создан заказ",
      "12.09 Согласован",
      "15.09 Получен счёт 44-09",
      "16.09 Оплата 150 000 ₽"
    ],
    related: ["Invoice-44-09", "Payment-2025-09-15", "Чат: Re: счёт 44-09"],
    automation: "Зелёных связей: 5, жёлтых: 1 (подтверждена)"
  },
  {
    id: "Invoice-44-09",
    name: "Invoice-44-09",
    type: "Счёт",
    status: "Оплачен",
    owner: "Мария Смирнова",
    value: "150 000 ₽",
    timeline: [
      "14.09 Получен счёт",
      "14.09 AI-Capture распознал данные",
      "14.09 Привязан к PO-2025-0912",
      "15.09 Оплачен"
    ],
    related: ["PO-2025-0912", "Payment-2025-09-15", "Approval-44-09"],
    automation: "Автозаполнение полей: 100%"
  },
  {
    id: "Payment-2025-09-15",
    name: "Payment-2025-09-15",
    type: "Платёж",
    status: "Зачтён",
    owner: "Пётр Ким",
    value: "150 000 ₽",
    timeline: [
      "15.09 Платёж в банке",
      "15.09 Автосшивка → Invoice-44-09",
      "16.09 Подтверждение бухгалтерии"
    ],
    related: ["Invoice-44-09", "PO-2025-0912"],
    automation: "Связи подтверждены автоматически"
  }
];

const versions = [
  { id: "v1", date: "01.08.2025", summary: "Базовый договор", changes: ["Лимит 3 млн ₽", "Без индексации"] },
  { id: "v2", date: "28.08.2025", summary: "Уточнены сроки", changes: ["Срок до 31.12.2025", "Добавлен SLA поставки"] },
  { id: "v3", date: "12.09.2025", summary: "Расширение лимита", changes: ["Лимит 5 млн ₽", "Индексация CPI+2%"], diff: [
      { type: "removed", text: "Лимит 3 млн ₽" },
      { type: "added", text: "Лимит 5 млн ₽" },
      { type: "added", text: "Добавлен пункт 4.3: Индексация CPI+2%" }
    ]
  }
];

const securityInfo = [
  {
    title: "Права доступа",
    text: "Наследуем права из ERP и CRM. Пользователь видит только то, что видит в исходных системах."
  },
  {
    title: "Маскирование",
    text: "Чувствительные поля (зарплаты, персональные данные) скрываются по ролям и при экспортe."
  },
  {
    title: "Аудит-лог",
    text: "Фиксируем, кто видел ответ ИИ и какие документы задействованы."
  },
  {
    title: "Право на тишину",
    text: "Если данных не хватает — объясняем, какие источники нужно подключить."
  }
];

const answerCard = document.getElementById("answerCard");
const quickQueriesContainer = document.getElementById("quickQueries");
const activityFeedContainer = document.getElementById("activityFeed");
const qualityAlertsContainer = document.getElementById("qualityAlerts");
const automationPanel = document.getElementById("automationPanel");
const objectList = document.getElementById("objectList");
const objectView = document.getElementById("objectView");
const versionSelector = document.getElementById("versionSelector");
const versionSummary = document.getElementById("versionSummary");
const versionDiff = document.getElementById("versionDiff");
const securityList = document.getElementById("securityList");
const queryInput = document.getElementById("queryInput");
const askButton = document.getElementById("askButton");
const compareButton = document.getElementById("compareButton");
const modal = document.getElementById("sourceModal");
const modalTitle = document.getElementById("sourceModalTitle");
const modalBody = document.getElementById("sourceModalBody");
const closeModalButton = document.getElementById("closeModal");
const toast = document.getElementById("toast");

let selectedObject = null;
let selectedVersion = versions[versions.length - 1];

function renderQuickQueries() {
  quickQueriesContainer.innerHTML = "";
  quickQueries.forEach(query => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.textContent = query;
    chip.addEventListener("click", () => {
      queryInput.value = query;
      handleQuery(query);
    });
    quickQueriesContainer.appendChild(chip);
  });
}

function renderActivity() {
  activityFeedContainer.innerHTML = "";
  activityFeedData.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.title}</strong><span>${item.text}</span><div class="tag">${item.tag}</div>`;
    activityFeedContainer.appendChild(li);
  });
}

function renderAlerts() {
  qualityAlertsContainer.innerHTML = "";
  qualityAlerts.forEach(alert => {
    const li = document.createElement("li");
    li.innerHTML = `<div>${alert.title}</div><span>${alert.text}</span>`;
    qualityAlertsContainer.appendChild(li);
  });
}

function renderAutomation() {
  automationPanel.innerHTML = "";
  automationSwitches.forEach(({ id, label, description }) => {
    const container = document.createElement("div");
    container.className = "toggle";

    const text = document.createElement("div");
    text.innerHTML = `<label>${label}</label><div class="muted">${description}</div>`;

    const switchEl = document.createElement("div");
    switchEl.className = "switch";
    switchEl.setAttribute("role", "switch");
    switchEl.setAttribute("aria-checked", "false");
    switchEl.tabIndex = 0;

    const toggle = () => {
      const isOn = switchEl.classList.toggle("on");
      switchEl.setAttribute("aria-checked", String(isOn));
      showToast(`${label}: ${isOn ? "включено" : "выключено"}`);
    };

    switchEl.addEventListener("click", toggle);
    switchEl.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });

    container.appendChild(text);
    container.appendChild(switchEl);
    automationPanel.appendChild(container);
  });
}

function renderObjects() {
  objectList.innerHTML = "";
  if (!selectedObject) {
    selectedObject = objectCards[0];
  }
  objectCards.forEach(card => {
    const chip = document.createElement("button");
    chip.className = `object-chip${selectedObject?.id === card.id ? " active" : ""}`;
    chip.textContent = `${card.type}: ${card.name}`;
    chip.addEventListener("click", () => {
      selectedObject = card;
      renderObjects();
    });
    objectList.appendChild(chip);
  });

  renderObjectView(selectedObject);
}

function renderObjectView(card) {
  objectView.innerHTML = `
    <h3>${card.name}</h3>
    <p class="muted">${card.type} · ${card.status} · ${card.value}</p>
    <dl>
      <dt>Ответственный</dt><dd>${card.owner}</dd>
      <dt>Автоматизация</dt><dd>${card.automation}</dd>
      <dt>Связанные объекты</dt><dd>${card.related.join(", ")}</dd>
    </dl>
    <h4>История</h4>
    <ul>${card.timeline.map(item => `<li>${item}</li>`).join("")}</ul>
    <div class="object-actions">
      <button class="ghost" type="button">Открыть переписку</button>
      <button class="primary" type="button">Создать задачу</button>
    </div>
  `;
}

function renderVersions() {
  versionSelector.innerHTML = "";
  if (!selectedVersion) {
    selectedVersion = versions[versions.length - 1];
  }
  versions.forEach(version => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `version-chip${selectedVersion?.id === version.id ? " active" : ""}`;
    chip.textContent = `${version.id.toUpperCase()} · ${version.date}`;
    chip.addEventListener("click", () => {
      selectedVersion = version;
      renderVersions();
    });
    versionSelector.appendChild(chip);
  });
  renderVersionSummary(selectedVersion);
}

function renderVersionSummary(version) {
  versionSummary.innerHTML = `
    <strong>${version.summary}</strong>
    <ul>${version.changes.map(change => `<li>${change}</li>`).join("")}</ul>
  `;

  if (version.diff) {
    versionDiff.innerHTML = version.diff
      .map(item => `<div class="diff-${item.type}">${item.type === "added" ? "+" : "−"} ${item.text}</div>`)
      .join("");
  } else {
    versionDiff.innerHTML = `<div class="muted">Выберите версию с отличиями, чтобы увидеть сравнение.</div>`;
  }
}

function renderSecurity() {
  securityList.innerHTML = "";
  securityInfo.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.title}</strong><span>${item.text}</span>`;
    securityList.appendChild(li);
  });
}

function renderAnswer(data) {
  if (!data) {
    answerCard.innerHTML = `
      <div class="empty-state">
        <h2>Нет готового ответа</h2>
        <p>Эта демо-версия знает только преднастроенные сценарии. Попробуйте вопросы из списка слева.</p>
      </div>
    `;
    return;
  }

  const metrics = data.metrics
    .map(metric => `
      <div class="metric">
        <span>${metric.label}</span>
        <strong>${metric.value}</strong>
        <div class="muted">${metric.detail}</div>
      </div>
    `)
    .join("");

  const tableHeader = `<tr>${data.table.columns.map(column => `<th>${column}</th>`).join("")}</tr>`;
  const tableRows = data.table.rows
    .map(row => {
      const values = Object.values(row).filter(value => value !== true && value !== false);
      const className = row.highlight ? " class=\"highlight\"" : "";
      return `<tr${className}>${values.map(value => `<td>${value}</td>`).join("")}</tr>`;
    })
    .join("");

  const sources = data.sources
    .map(source => `
      <button class="source-item" type="button" data-title="${source.title}" data-body="${source.body}">
        <div>
          <strong>${source.title}</strong>
          <span>${source.description}</span>
        </div>
        <span>${source.type}</span>
      </button>
    `)
    .join("");

  const explanation = data.explanation
    .map(exp => `
      <details>
        <summary>${exp.title}</summary>
        <pre>${exp.body}</pre>
      </details>
    `)
    .join("");

  answerCard.innerHTML = `
    <div class="answer-header">
      <div>
        <h2>${data.title}</h2>
        <p>${data.summary}</p>
      </div>
      <div class="answer-meta">${data.meta.map(item => `<span>${item}</span>`).join("")}</div>
    </div>
    <div class="metrics">${metrics}</div>
    <div class="table-wrapper">
      <table>${tableHeader}${tableRows}</table>
    </div>
    <div class="sources">
      <h3>Источники</h3>
      ${sources}
    </div>
    <div class="explain">
      <h3>Пояснения</h3>
      ${explanation}
    </div>
  `;

  answerCard.querySelectorAll(".source-item").forEach(button => {
    button.addEventListener("click", () => {
      const { title, body } = button.dataset;
      openModal(title, body);
    });
  });
}

function handleQuery(rawQuery) {
  const normalized = rawQuery.trim().toLowerCase();
  const answer = knowledgeBase[normalized];
  renderAnswer(answer);
}

function openModal(title, body) {
  modalTitle.textContent = title;
  modalBody.innerHTML = `<p>${body}</p>`;
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
}

function showToast(message) {
  toast.textContent = message;
  toast.setAttribute("aria-hidden", "false");
  setTimeout(() => {
    toast.setAttribute("aria-hidden", "true");
  }, 2200);
}

askButton.addEventListener("click", () => {
  if (!queryInput.value.trim()) {
    showToast("Введите вопрос");
    return;
  }
  handleQuery(queryInput.value);
});

queryInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    handleQuery(queryInput.value);
  }
});

compareButton.addEventListener("click", () => {
  const v2 = versions.find(v => v.id === "v2");
  const v3 = versions.find(v => v.id === "v3");
  if (!v2 || !v3) return;

  versionDiff.innerHTML = `
    <div class="diff-removed">− ${v2.changes[0]}</div>
    <div class="diff-added">+ ${v3.changes[0]}</div>
    <div class="diff-added">+ Добавлен пункт 4.3: Индексация CPI+2%</div>
  `;
  showToast("Сравнение версий обновлено");
});

modal.addEventListener("click", event => {
  if (event.target === modal) {
    closeModal();
  }
});

closeModalButton.addEventListener("click", closeModal);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeModal();
  }
});

function init() {
  renderQuickQueries();
  renderActivity();
  renderAlerts();
  renderAutomation();
  renderObjects();
  renderVersions();
  renderSecurity();
  renderVersionSummary(selectedVersion);
  handleQuery(quickQueries[0]);
}

init();
