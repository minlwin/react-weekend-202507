import PageTitle from "@/components/widgets/page-title";
import LedgerDetailsComponent from "../_client/ledger-details";

export default function LedgetDetailsPage() {
    return (
        <section className="space-y-6">
            <PageTitle title="Ledger Details" icon="Tag" />
            <LedgerDetailsComponent />
        </section>
    )
}