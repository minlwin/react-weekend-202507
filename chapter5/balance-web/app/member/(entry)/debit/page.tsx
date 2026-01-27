import PageTitle from "@/components/widgets/page-title";
import EntrySearchComponent from "../_client/entry-search";

export default function DebitManagementPage() {
    return (
        <section className="space-y-6">
            <PageTitle title="Debit Management" icon="ArrowDownRight" />
            <EntrySearchComponent type="Debit" />
        </section>
    )
}