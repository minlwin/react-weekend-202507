import PageTitle from "@/components/widgets/page-title";
import { Metadata } from "next";
import DashboardComponent from "./_client/dashboard";

export const metadata: Metadata = {
  title: "BALANCE | Home",
  description: "Member Management page of Balance Application.",
};


export default function MemberPage() {
    return (
        <section className="space-y-6">
            <PageTitle title="Welcome!" icon="Smile" />
            <DashboardComponent />
        </section>
    )
}