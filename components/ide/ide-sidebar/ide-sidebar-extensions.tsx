"use client";

import { capabilities } from "@/content/capabilities";
import { certifications } from "@/content/certifications";
import { proof } from "@/content/proof";
import { useIdeWorkspace } from "@/hooks/use-ide-workspace";
import { TechLogoLabel } from "@/components/ui/brand-logo";

export function IdeSidebarExtensions() {
  const { openFile } = useIdeWorkspace();

  return (
    <div className="flex h-full flex-col">
      <div className="px-3 py-2 text-xs font-medium text-muted">Skills &amp; credentials</div>
      <p className="px-3 pb-2 text-[11px] text-muted">Stack, capabilities, and certifications</p>
      <div className="flex-1 overflow-y-auto pb-4">
        <p className="px-3 py-1 font-mono text-[10px] uppercase text-muted">Primary stack</p>
        <ul className="mb-3">
          {proof.primaryStack.map((tech) => (
            <li key={tech}>
              <button
                type="button"
                className="flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-left font-mono text-[12px] hover:bg-[var(--ide-tab-inactive)]"
                onClick={() => openFile("skills/frontend.stack")}
              >
                <span className="text-green-400">●</span>
                <TechLogoLabel name={tech} />
              </button>
            </li>
          ))}
        </ul>
        <p className="px-3 py-1 font-mono text-[10px] uppercase text-muted">Capabilities</p>
        <ul className="mb-3">
          {capabilities.map((cap) => (
            <li key={cap.id}>
              <div className="px-3 py-1.5">
                <p className="font-mono text-[12px]">{cap.title}</p>
                <p className="text-[11px] text-muted">{cap.summary}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="px-3 py-1 font-mono text-[10px] uppercase text-muted">Certifications</p>
        <ul>
          {certifications.map((cert) => (
            <li key={cert.id} className="px-3 py-1.5">
              <p className="font-mono text-[12px]">{cert.title}</p>
              <p className="text-[11px] text-muted">
                {cert.issuer} · {cert.issued}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
