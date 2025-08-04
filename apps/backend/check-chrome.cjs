// apps/backend/check-chrome.cjs
const puppeteer = require("puppeteer");

console.log("Chromium executable path:", puppeteer.executablePath());
console.log("Chromium revision:", puppeteer._preferredRevision);
