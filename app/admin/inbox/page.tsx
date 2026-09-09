import type { Metadata } from "next";
import { AdminInbox } from "@/components/admin-inbox";
import "./inbox.css";
export const metadata: Metadata = { title: "Hộp thư quản trị | DevDes" };
export default function AdminInboxPage() { return <AdminInbox />; }
