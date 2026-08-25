"use client";

import { ExternalLink, Laptop, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";

const devices = [
  { id: "desktop", label: "Desktop", icon: Laptop, width: "100%" },
  { id: "tablet", label: "iPad", icon: Tablet, width: "820px" },
  { id: "mobile", label: "Mobile", icon: Smartphone, width: "390px" },
] as const;

type Device = (typeof devices)[number]["id"];

export function DevicePreview({ slug, name }: { slug: string; name: string }) {
  const [device, setDevice] = useState<Device>("desktop");
  const current = devices.find((item) => item.id === device)!;

  return (
    <div className="device-preview">
      <div className="preview-toolbar">
        <div className="device-tabs">
          {devices.map(({ id, label, icon: Icon }) => (
            <button className={device === id ? "active" : ""} onClick={() => setDevice(id)} key={id}>
              <Icon size={17} /><span>{label}</span>
            </button>
          ))}
        </div>
        <span className="viewport-label">{device === "desktop" ? "1440 × 900" : device === "tablet" ? "820 × 1180" : "390 × 844"}</span>
        <a href={`/mau/${slug}`} target="_blank" rel="noreferrer">Mở toàn màn hình <ExternalLink size={15} /></a>
      </div>
      <div className={`device-stage ${device}`}>
        <div className="device-frame" style={{ width: current.width }}>
          <div className="frame-camera" />
          <iframe title={`Xem trước giao diện ${name} trên ${current.label}`} src={`/mau/${slug}`} />
        </div>
      </div>
    </div>
  );
}
