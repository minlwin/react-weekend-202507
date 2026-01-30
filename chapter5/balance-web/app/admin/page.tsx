import PageTitle from "@/components/widgets/page-title";
import { Metadata } from "next";
import AdminDashboardComponent from "./_client/admin-dashboard";

export const metadata: Metadata = {
  title: "ADMIN | Home",
  description: "Admin Home page of Balance Application.",
};

export default function AdminPage() {
    return (
        <section className="space-y-6">
            <PageTitle title="Dashboard" icon="LayoutDashboard" />

            <AdminDashboardComponent />
        </section>
    )
}