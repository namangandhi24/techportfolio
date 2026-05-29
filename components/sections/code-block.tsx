import { highlightCode, apiClientSample } from "@/lib/shiki";

export async function CodeBlock() {
  const html = await highlightCode(apiClientSample, "typescript");

  return (
    <div className="code-panel overflow-hidden rounded-2xl border border-[var(--code-panel-border)] bg-[var(--code-panel-bg)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-white/50">api-client.ts</span>
      </div>
      <div
        className="overflow-x-auto p-4 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
