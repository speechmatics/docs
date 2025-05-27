// This is used to ensure the dark theme is applied both as a class and a data-theme attribute
// This is because Radix Themes requires the class to be set to 'dark' to apply the dark theme
// However, Docusaurus also sets the data-theme attribute to 'dark' when the dark mode switch is clicked
// We use a MutationObserver to watch for changes to the data-theme attribute and apply the dark class accordingly
(() => {
  const root = document.documentElement;
  if (root.getAttribute("data-theme") === "dark") {
    root.classList.add("dark");
  }

  const observer = new MutationObserver(() => {
    if (
      root.getAttribute("data-theme") === "dark" &&
      !root.classList.contains("dark")
    ) {
      root.classList.add("dark");
    } else if (
      root.getAttribute("data-theme") !== "dark" &&
      root.classList.contains("dark")
    ) {
      root.classList.remove("dark");
    }
  });

  observer.observe(root, {
    attributes: true,
    attributeFilter: ["data-theme", "class"],
  });
})();
