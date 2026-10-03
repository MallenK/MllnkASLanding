// PostToolUse (Bash): tras un `hyperframes render`, recuerda lanzar la revisión de diseño antes de publicar.
let raw = "";
process.stdin.on("data", (d) => (raw += d));
process.stdin.on("end", () => {
  try {
    const cmd = JSON.parse(raw)?.tool_input?.command || "";
    if (!/hyperframes(@[\w.]+)?\s+render/.test(cmd)) return;
    const msg = "Se acaba de renderizar una pieza hf-*. ANTES de ordenarla/publicarla ejecuta la skill `revisar-pieza` (o delega en el subagente `revisor-diseno`): node studio/qa/auditar.mjs <hf-proyecto> --sheet. ordenar-publicaciones.mjs no copiará el vídeo sin informe QA limpio.";
    process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PostToolUse", additionalContext: msg } }));
  } catch {}
});
