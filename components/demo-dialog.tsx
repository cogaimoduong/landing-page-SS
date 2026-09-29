"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { useLocale } from "@/components/locale-provider";

export function DemoDialog({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  const { locale } = useLocale();
  const closeLabel = locale === "en" ? "Close dialog" : "Đóng cửa sổ";
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; };
  }, []);
  return <dialog ref={ref} className="demo-dialog" aria-labelledby={titleId} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="dialog-surface"><header><h2 id={titleId}>{title}</h2><button type="button" onClick={onClose} aria-label={closeLabel}><X size={22} /></button></header>{children}</div>
  </dialog>;
}
