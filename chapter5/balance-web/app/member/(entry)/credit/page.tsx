import PageTitle from "@/components/widgets/page-title";
import EntrySearchComponent from "../_client/entry-search";

export default function CreditManagementPage() {
    return (
        <section className="space-y-6">
            <PageTitle title="Credit Management" icon="ArrowUpRight" />
            <EntrySearchComponent type="Credit" />
        </section>
    )
}