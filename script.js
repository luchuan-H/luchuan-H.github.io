const sectionLinks = Array.from(document.querySelectorAll("[data-section-link]"));
const sections = Array.from(document.querySelectorAll("[data-section]"));
const languageButtons = Array.from(document.querySelectorAll("[data-lang-button]"));

let currentLanguage = "en";

function showSection(sectionName) {
  sections.forEach((section) => {
    section.classList.toggle("is-active", section.dataset.section === sectionName);
  });

  sectionLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.sectionLink === sectionName);
  });
}

function showLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-lang]").forEach((block) => {
    block.classList.toggle("is-active", block.dataset.lang === language);
  });

  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.langButton === language));
  });
}

sectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const sectionName = link.dataset.sectionLink;
    history.replaceState(null, "", `#${sectionName}`);
    showSection(sectionName);
    showLanguage(currentLanguage);
  });
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showLanguage(button.dataset.langButton);
  });
});

const initialSection = window.location.hash.replace("#", "") || "about";
showSection(sections.some((section) => section.dataset.section === initialSection) ? initialSection : "about");
showLanguage(currentLanguage);
