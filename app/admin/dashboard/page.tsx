import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard | Cappiello Hair & Beauty",
  description: "Pannello di gestione appuntamenti.",
};

export default function AdminDashboardPage() {
  // Dashboard rimossa — redirect all'Inbox
  redirect("/admin/inbox");
}
