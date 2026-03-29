export type ThemeMode = "light" | "dark";

const THEME_KEY = "lumena-theme";
const THEME_EVENT = "lumena-theme-change";

export function getThemeSnapshot(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(THEME_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function subscribeTheme(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = () => onStoreChange();

  window.addEventListener("storage", handleChange);
  window.addEventListener(THEME_EVENT, handleChange);
  mediaQuery.addEventListener("change", handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(THEME_EVENT, handleChange);
    mediaQuery.removeEventListener("change", handleChange);
  };
}

export function applyTheme(theme: ThemeMode) {
  if (typeof window === "undefined") {
    return;
  }

  const root = window.document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  window.localStorage.setItem(THEME_KEY, theme);
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function toggleTheme() {
  applyTheme(getThemeSnapshot() === "dark" ? "light" : "dark");
}
