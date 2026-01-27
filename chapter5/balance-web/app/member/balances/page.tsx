import PageTitle from "@/components/widgets/page-title";
import BalanceSearchComponent from "./_client/balance-search";

export default function BalanceManagementPage() {
    return (
        <section>
            <PageTitle title="Balance Management" icon="PieChart" />
            <BalanceSearchComponent />
        </section>
    )
}