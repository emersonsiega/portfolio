"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@/components/icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
    >
      <span className={!dark ? "active" : ""}>
        <Icon name="sun" size={17} />
      </span>
      <span className={dark ? "active" : ""}>
        <Icon name="moon" size={17} />
      </span>
    </button>
  );
}
