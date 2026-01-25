import PageTitle from "@/components/widgets/page-title";
import LedgerSearchComponent from "./_client/ledger-search";

export default function LedgerManagementPage() {
    return (
        <section>
            <PageTitle icon="Tags" title="Ledger Management" />
            <LedgerSearchComponent />
        </section>
    )
}