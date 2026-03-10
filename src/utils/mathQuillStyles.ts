let mathQuillStylesLoaded = false;

export async function ensureMathQuillStyles() {
  if (mathQuillStylesLoaded || typeof window === "undefined") {
    return;
  }

  const { addStyles } = await import("react-mathquill");
  addStyles();
  mathQuillStylesLoaded = true;
}
