import { useTheme } from "../store/useThemeStore";
import { MoonStarIcon, SunIcon } from "lucide-react";

function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div onClick={toggleTheme} className="btn btn-outline px-2">
      {theme === "dark" ? <MoonStarIcon /> : <SunIcon />}
    </div>
  );
}
export default ThemeSelector;
