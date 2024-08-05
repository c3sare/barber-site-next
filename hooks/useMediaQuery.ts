"use client";

import React from "react";
import { useState } from "react";

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  React.useEffect(() => {
    const matchQueryList = window.matchMedia(query);

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    setMatches(matchQueryList.matches);

    matchQueryList.addEventListener("change", handleChange);

    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
