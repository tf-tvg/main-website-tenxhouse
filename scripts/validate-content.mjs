import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const allowedApprovalStatuses = new Set([
  "Draft",
  "Approved for internal testing",
  "Approved for public launch",
  "Paused",
  "Retired"
]);
const allowedVisibility = new Set(["hidden", "preview", "public"]);
const catalogues = {
  packages: { idPattern: /^TXH-PKG-\d{3}$/, required: ["id", "name", "description", "monthly_price_zar"] },
  resources: { idPattern: /^TXH-RES-\d{3}$/, required: ["id", "slug", "title", "category", "excerpt", "author", "reviewer"] },
  events: { idPattern: /^TXH-EVT-\d{3}$/, required: ["id", "slug", "name", "summary", "organiser", "format", "event_status"] },
  faqs: { idPattern: /^TXH-FAQ-\d{3}$/, required: ["id", "question", "answer", "category", "sort_order"] },
  "hosted-companies": { idPattern: /^TXH-HC-\d{3}$/, required: ["id", "name", "role"] },
  benefits: { idPattern: /^TXH-BEN-\d{3}$/, required: ["id", "provider", "summary", "qualifying_package", "key_terms"] }
};

const errors = [];
let recordCount = 0;

function addError(catalogue, index, message) {
  errors.push(`${catalogue}[${index}]: ${message}`);
}

function isBlank(value) {
  return value === undefined || value === null || value === "";
}

function isIsoDate(value) {
  return !value || /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2})?$/.test(value);
}

for (const [catalogue, rules] of Object.entries(catalogues)) {
  const filePath = path.join(root, "content", `${catalogue}.json`);
  let records;

  try {
    records = JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    errors.push(`${catalogue}: ${error.message}`);
    continue;
  }

  if (!Array.isArray(records)) {
    errors.push(`${catalogue}: top-level value must be an array`);
    continue;
  }

  recordCount += records.length;
  const ids = new Set();
  const slugs = new Set();

  records.forEach((record, index) => {
    rules.required.forEach((field) => {
      if (isBlank(record[field])) addError(catalogue, index, `missing required field "${field}"`);
    });

    if (!rules.idPattern.test(record.id || "")) addError(catalogue, index, `invalid ID "${record.id || ""}"`);
    if (ids.has(record.id)) addError(catalogue, index, `duplicate ID "${record.id}"`);
    ids.add(record.id);

    if (record.slug) {
      if (!/^[a-z0-9-]+$/.test(record.slug)) addError(catalogue, index, `invalid slug "${record.slug}"`);
      if (slugs.has(record.slug)) addError(catalogue, index, `duplicate slug "${record.slug}"`);
      slugs.add(record.slug);
    }

    const governance = record.governance;
    if (!governance || typeof governance !== "object") {
      addError(catalogue, index, "missing governance object");
      return;
    }

    if (!allowedApprovalStatuses.has(governance.approval_status)) {
      addError(catalogue, index, `invalid approval status "${governance.approval_status || ""}"`);
    }
    if (!allowedVisibility.has(governance.visibility)) {
      addError(catalogue, index, `invalid visibility "${governance.visibility || ""}"`);
    }
    if (isBlank(governance.approval_owner)) addError(catalogue, index, "missing approval owner");
    if (!isIsoDate(governance.review_date)) addError(catalogue, index, "review date must use YYYY-MM-DD");

    if (governance.visibility === "public") {
      if (governance.approval_status !== "Approved for public launch") {
        addError(catalogue, index, "public visibility requires public-launch approval");
      }
      if (!governance.review_date) addError(catalogue, index, "public records require a review date");
    }

    ["publication_date", "valid_from", "valid_to", "starts_at", "ends_at"].forEach((field) => {
      if (!isIsoDate(record[field])) addError(catalogue, index, `${field} must use an ISO date`);
    });

    if (catalogue === "packages") {
      if (!Number.isFinite(record.monthly_price_zar) || record.monthly_price_zar < 0) {
        addError(catalogue, index, "monthly_price_zar must be a non-negative number");
      }
      if (!Array.isArray(record.includes) || !record.includes.length) {
        addError(catalogue, index, "at least one inclusion is required");
      }
    }

    if (catalogue === "resources" && governance.visibility === "public") {
      if (/APPROVAL REQUIRED/i.test(record.author) || /APPROVAL REQUIRED/i.test(record.reviewer)) {
        addError(catalogue, index, "public resources require approved author and reviewer names");
      }
      if (!record.source_ledger_url) addError(catalogue, index, "public resources require a source ledger URL");
      if (record.source_type === "TenXHouse guide" && (!Array.isArray(record.sections) || !record.sections.length)) {
        addError(catalogue, index, "public TenXHouse guides require article sections");
      }
      if (record.source_type !== "TenXHouse guide" && !record.source_url) {
        addError(catalogue, index, "public external resources require a source URL");
      }
    }

    if (catalogue === "events" && governance.visibility === "public") {
      ["starts_at", "registration_url", "cancellation_terms"].forEach((field) => {
        if (isBlank(record[field])) addError(catalogue, index, `public events require "${field}"`);
      });
    }

    if (catalogue === "benefits" && governance.visibility === "public" && !record.claim_route) {
      addError(catalogue, index, "public benefits require a Creator portal claim route");
    }
  });
}

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`Content validation passed: ${recordCount} records across ${Object.keys(catalogues).length} catalogues.`);
}
