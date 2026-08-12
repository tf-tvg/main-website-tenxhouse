(function () {
  "use strict";

  const PREVIEW_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "raw.githack.com"]);
  const PREVIEW_STATUSES = new Set([
    "Approved for internal testing",
    "Approved for public launch"
  ]);

  const host = window.location.hostname.toLowerCase();
  const isProduction = !PREVIEW_HOSTS.has(host) && !host.endsWith(".localhost");

  function element(tagName, className, text) {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function safeHref(value) {
    if (!value) return "";

    try {
      const url = new URL(value, window.location.href);
      if (url.protocol === "http:" || url.protocol === "https:") return url.href;
    } catch (_error) {
      return "";
    }

    return "";
  }

  function linkOrArticle(record, className) {
    const href = safeHref(record.source_url || record.registration_url);
    const node = element(href ? "a" : "article", className);
    if (href) node.href = href;
    return node;
  }

  function isVisible(record) {
    const governance = record && record.governance;
    if (!governance || governance.visibility === "hidden") return false;

    if (isProduction) {
      return governance.visibility === "public" &&
        governance.approval_status === "Approved for public launch";
    }

    return (governance.visibility === "preview" || governance.visibility === "public") &&
      PREVIEW_STATUSES.has(governance.approval_status);
  }

  function previewLabel(record) {
    if (isProduction || record.governance.approval_status === "Approved for public launch") {
      return null;
    }

    const label = element(
      "span",
      "inline-flex items-center rounded bg-gray-200 px-2 py-1 text-xs font-bold uppercase tracking-wide text-gray-600",
      "Preview content"
    );
    label.dataset.contentPreview = "true";
    return label;
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value.length === 10 ? `${value}T12:00:00+02:00` : value);
    if (Number.isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat("en-ZA", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Africa/Johannesburg"
    }).format(date);
  }

  async function loadCollection(name) {
    const response = await fetch(new URL(`content/${name}.json`, document.baseURI), {
      cache: "no-store",
      headers: { Accept: "application/json" }
    });

    if (!response.ok) throw new Error(`Unable to load ${name}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error(`${name} must be an array`);
    return data.filter(isVisible);
  }

  function packageEnquiryUrl(record) {
    const price = Number(record.monthly_price_zar).toLocaleString("en-US");
    const packageValue = `${record.name} - R${price}/month`;
    return `forms.html?type=Business%20Support&package=${encodeURIComponent(packageValue)}`;
  }

  function packageFeature(text, included) {
    const item = element("li", included ? "flex items-center" : "flex items-center text-gray-400");
    const icon = element("i", included ? "fas fa-check-circle text-brand-green mr-3" : "fas fa-times mr-3");
    item.append(icon, element("span", "", text));
    return item;
  }

  function packageCard(record) {
    const classes = record.featured
      ? "pricing-card bg-white p-8 rounded-2xl shadow-lg border-2 border-brand-orange relative"
      : "pricing-card bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-200";
    const card = element("article", classes);

    if (record.featured) {
      card.append(element(
        "div",
        "featured-badge absolute bg-brand-orange text-white px-4 py-1 rounded-full font-bold",
        "POPULAR"
      ));
    }

    const governanceLabel = previewLabel(record);
    if (governanceLabel) card.append(governanceLabel);
    card.append(element("h3", "text-2xl font-bold mb-2 mt-3", record.name));
    card.append(element("p", "text-gray-600 mb-6", record.description));

    const price = element("div", "text-3xl font-bold mb-6", `R${Number(record.monthly_price_zar).toLocaleString("en-US")}`);
    price.append(element("span", "text-lg font-normal", "/month"));
    card.append(price);

    const features = element("ul", "space-y-4 mb-8");
    (record.includes || []).forEach((item) => features.append(packageFeature(item, true)));
    (record.excludes || []).forEach((item) => features.append(packageFeature(item, false)));
    card.append(features);

    const actions = element("div", "space-y-3");
    const enquiryUrl = packageEnquiryUrl(record);
    const getStarted = element("a", "block text-center brand-btn py-3 rounded-lg font-bold", "Get Started");
    const askMore = element("a", "block text-center brand-outline py-3 rounded-lg font-bold", "Ask More");
    getStarted.href = enquiryUrl;
    askMore.href = enquiryUrl;
    actions.append(getStarted, askMore);
    card.append(actions);
    return card;
  }

  async function renderPackages() {
    const target = document.getElementById("packageCards");
    if (!target) return;

    const records = await loadCollection("packages");
    target.replaceChildren();
    if (!records.length) {
      const empty = element("div", "md:col-span-3 border border-gray-200 bg-gray-50 p-8 text-center rounded-lg");
      empty.append(
        element("h3", "text-2xl font-bold mb-3", "Packages are being finalised"),
        element("p", "text-gray-600", "Approved package details will appear here once commercial review is complete.")
      );
      target.append(empty);
      return;
    }

    records.forEach((record) => target.append(packageCard(record)));
  }

  async function renderFormPackages() {
    const target = document.getElementById("package_interest");
    if (!target) return;

    const requestedPackage = new URLSearchParams(window.location.search).get("package") || "";
    const staticOptions = Array.from(target.querySelectorAll("[data-static-option]"));
    const records = await loadCollection("packages");
    const fragment = document.createDocumentFragment();

    staticOptions.forEach((option, index) => {
      if (index === 1) {
        records.forEach((record) => {
          const price = Number(record.monthly_price_zar).toLocaleString("en-US");
          const value = `${record.name} - R${price}/month`;
          const packageOption = element("option", "", value);
          packageOption.value = value;
          fragment.append(packageOption);
        });
      }
      fragment.append(option);
    });

    target.replaceChildren(fragment);
    if (Array.from(target.options).some((option) => option.value === requestedPackage)) {
      target.value = requestedPackage;
    } else {
      target.value = "";
    }
  }

  function resourceMeta(record) {
    const parts = [record.category, formatDate(record.publication_date)].filter(Boolean);
    return parts.join(" | ");
  }

  function resourceAction(record) {
    if (safeHref(record.source_url)) {
      const label = record.source_type === "LinkedIn" ? "Open article" : "Read article";
      const action = element("span", "font-bold text-brand-orange", label);
      const icon = element("i", "fas fa-arrow-right ml-1");
      action.append(icon);
      return action;
    }

    return element("span", "font-semibold text-gray-500", "Full article in editorial review");
  }

  function featuredResourceCard(record) {
    const card = linkOrArticle(
      record,
      "block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
    );
    const body = element("div", "bg-brand-black text-white p-8 md:p-10");
    const label = previewLabel(record);
    if (label) body.append(label);
    body.append(
      element("p", "text-brand-orange font-semibold mb-3 mt-3", resourceMeta(record)),
      element("h3", "text-3xl md:text-4xl font-bold mb-4", record.title),
      element("p", "text-gray-200", record.excerpt)
    );

    const footer = element("div", "p-8 flex flex-wrap items-center justify-between gap-3");
    footer.append(
      element("span", "text-gray-600", `${record.read_time_minutes || 1} min read`),
      resourceAction(record)
    );
    card.append(body, footer);
    return card;
  }

  function supportingResourceCard(record) {
    const card = linkOrArticle(
      record,
      "block bg-white rounded-2xl shadow-sm border border-gray-100 p-7 hover:shadow-lg transition-all"
    );
    const label = previewLabel(record);
    if (label) card.append(label);
    card.append(
      element("p", "text-sm text-brand-green font-semibold mb-2 mt-3", resourceMeta(record)),
      element("h3", "text-2xl font-bold mb-3", record.title),
      element("p", "text-gray-600 mb-4", record.excerpt),
      resourceAction(record)
    );
    return card;
  }

  function linkedInResourceCard(record) {
    const card = linkOrArticle(
      record,
      "block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all"
    );
    const label = previewLabel(record);
    if (label) card.append(label);
    card.append(
      element("p", "text-sm text-gray-500 mb-3 mt-3", `LinkedIn | ${formatDate(record.publication_date)}`),
      element("h3", "text-xl font-bold mb-3", record.title),
      element("p", "text-gray-600", record.excerpt)
    );
    return card;
  }

  async function renderResources() {
    const guideTarget = document.getElementById("resourceGuides");
    const linkedInTarget = document.getElementById("linkedinResources");
    if (!guideTarget || !linkedInTarget) return;

    const records = await loadCollection("resources");
    const guides = records.filter((record) => record.source_type !== "LinkedIn");
    const linkedIn = records.filter((record) => record.source_type === "LinkedIn");
    guideTarget.replaceChildren();
    linkedInTarget.replaceChildren();

    if (!guides.length) {
      const empty = element("div", "border border-gray-200 bg-gray-50 p-8 text-center rounded-lg");
      empty.append(
        element("h3", "text-2xl font-bold mb-3", "Useful resources are in review"),
        element("p", "text-gray-600", "Approved, source-reviewed guides will appear here as they are cleared for publication.")
      );
      guideTarget.append(empty);
    } else {
      const featured = guides.find((record) => record.featured) || guides[0];
      const supporting = guides.filter((record) => record !== featured);
      guideTarget.append(featuredResourceCard(featured));
      const supportingGrid = element("div", "grid gap-6");
      supporting.forEach((record) => supportingGrid.append(supportingResourceCard(record)));
      guideTarget.append(supportingGrid);
    }

    if (!linkedIn.length) {
      document.getElementById("linkedinSection")?.classList.add("hidden");
    } else {
      document.getElementById("linkedinSection")?.classList.remove("hidden");
      linkedIn.forEach((record) => linkedInTarget.append(linkedInResourceCard(record)));
    }
  }

  function eventCard(record) {
    const card = element("article", "bg-white border border-gray-200 rounded-lg p-7 shadow-sm");
    const label = previewLabel(record);
    if (label) card.append(label);
    card.append(
      element("p", "text-brand-green font-semibold uppercase tracking-wide mb-2 mt-3", record.event_status),
      element("h2", "text-2xl font-bold mb-3", record.name),
      element("p", "text-gray-600 mb-5", record.summary)
    );

    const details = element("dl", "grid gap-3 text-sm mb-6");
    const rows = [
      ["Organiser", record.organiser],
      ["Date", formatDate(record.starts_at)],
      ["Format", record.format],
      ["Location", record.location],
      ["Price", Number(record.price_zar) === 0 ? "Free" : record.price_zar ? `R${Number(record.price_zar).toLocaleString("en-US")}` : "To be confirmed"]
    ];
    rows.filter((row) => row[1]).forEach(([term, value]) => {
      const row = element("div", "flex flex-wrap gap-2");
      row.append(element("dt", "font-bold", `${term}:`), element("dd", "text-gray-600", value));
      details.append(row);
    });
    card.append(details);

    const href = safeHref(record.registration_url);
    if (href && record.event_status === "Registration open") {
      const action = element("a", "brand-btn inline-block px-6 py-3 rounded-lg font-bold", "Register");
      action.href = href;
      card.append(action);
    } else {
      card.append(element("p", "font-semibold text-gray-500", "Registration details pending"));
    }
    return card;
  }

  async function renderEvents() {
    const target = document.getElementById("eventsContent");
    if (!target) return;

    const records = await loadCollection("events");
    if (!records.length) return;
    target.replaceChildren();
    const grid = element("div", "grid md:grid-cols-2 gap-8 max-w-5xl mx-auto");
    records.forEach((record) => grid.append(eventCard(record)));
    target.append(grid);
  }

  async function renderFaqs() {
    const target = document.getElementById("faqList");
    if (!target) return;

    const records = await loadCollection("faqs");
    target.replaceChildren();
    if (!records.length) {
      target.append(element("p", "rounded border border-stone-200 bg-stone-50 p-6 text-stone-700", "Approved answers are being prepared."));
      return;
    }

    records
      .sort((a, b) => Number(a.sort_order) - Number(b.sort_order))
      .forEach((record) => {
        const article = element("article", "border-b border-stone-200 pb-6");
        const label = previewLabel(record);
        if (label) article.append(label);
        article.append(
          element("h2", "text-xl font-black mt-3", record.question),
          element("p", "mt-2 text-stone-700", record.answer)
        );
        target.append(article);
      });
  }

  async function initialise() {
    const page = document.body.dataset.contentPage;
    const renderers = {
      home: renderPackages,
      forms: renderFormPackages,
      insights: renderResources,
      events: renderEvents,
      faqs: renderFaqs
    };

    if (!renderers[page]) return;

    try {
      await renderers[page]();
      document.body.dataset.contentState = "loaded";
    } catch (_error) {
      document.body.dataset.contentState = "fallback";
    }

    document.dispatchEvent(new CustomEvent("tenxhouse:content-ready", {
      detail: { page, state: document.body.dataset.contentState }
    }));
  }

  initialise();
})();
