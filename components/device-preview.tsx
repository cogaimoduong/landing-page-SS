"use client";

import { ExternalLink, Laptop, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";
import { getTemplate } from "@/lib/templates";
import { useLocale } from "@/components/locale-provider";

const devices = [
  { id: "desktop", label: "Desktop", icon: Laptop, width: "100%" },
  { id: "tablet", label: "iPad", icon: Tablet, width: "820px" },
  { id: "mobile", label: "Mobile", icon: Smartphone, width: "390px" },
] as const;

type Device = (typeof devices)[number]["id"];

export function DevicePreview({ slug, name, app = false }: { slug: string; name: string; app?: boolean }) {
  const { locale } = useLocale();
  const originalUrl = getTemplate(slug, locale)?.originalUrl;
  const previewUrl = originalUrl || `/mau/${slug}`;
  const availableDevices = app ? devices.filter((item) => item.id === "mobile") : devices;
  const [device, setDevice] = useState<Device>(app ? "mobile" : "desktop");
  const current = devices.find((item) => item.id === device)!;
  const copy = locale === "en"
    ? {
        original: "Open original website",
        fullscreen: "Open full screen",
        frameTitle: "Preview",
        on: "on",
        originalNotice: "The original website is displayed directly. If it cannot be viewed in the frame,",
        openHere: "open the original website here ↗",
      }
    : {
        original: "Mở website gốc",
        fullscreen: "Mở toàn màn hình",
        frameTitle: "Xem trước giao diện",
        on: "trên",
        originalNotice: "Đang hiển thị trực tiếp website gốc. Nếu website không cho phép xem trong khung,",
        openHere: "mở website gốc tại đây ↗",
      };

  return (
    <div className="device-preview">
      <div className="preview-toolbar">
        <div className="device-tabs">
          {availableDevices.map(({ id, label, icon: Icon }) => (
            <button className={device === id ? "active" : ""} onClick={() => setDevice(id)} key={id}>
              <Icon size={17} /><span>{label}</span>
            </button>
          ))}
        </div>
        <span className="viewport-label">{device === "desktop" ? "1440 × 900" : device === "tablet" ? "820 × 1180" : "390 × 844"}</span>
        <a href={previewUrl} target="_blank" rel="noreferrer">{originalUrl ? copy.original : copy.fullscreen} <ExternalLink size={15} /></a>
      </div>
      <div className={`device-stage ${device}`}>
        <div className="device-frame" style={{ width: current.width }}>
          <div className="frame-camera" />
          <iframe title={`${copy.frameTitle} ${name} ${copy.on} ${current.label}`} src={previewUrl} />
        </div>
      </div>
      {originalUrl && <p className="original-preview-note">{copy.originalNotice} <a href={originalUrl} target="_blank" rel="noreferrer">{copy.openHere}</a>.</p>}
    </div>
  );
}
