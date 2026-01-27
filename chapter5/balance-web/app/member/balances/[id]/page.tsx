import PageTitle from "@/components/widgets/page-title";
import BalanceDetailsComponent from "../_client/balance-details";

export default function BalanceDetailsPage() {
    return (
        <section className="space-y-6">
            <PageTitle title="Balance Details" icon="PieChart" />
            <BalanceDetailsComponent />
        </section>
    )
}