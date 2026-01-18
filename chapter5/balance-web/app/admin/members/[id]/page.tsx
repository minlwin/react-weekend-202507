import PageTitle from "@/components/widgets/page-title";
import MemberDetailsComponent from "../_client/member-details-component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ADMIN | Members",
  description: "Member Management page of Balance Application.",
};

export default function MemberDetailsPage() {
    return (
        <section>
            <PageTitle title="Member Details" icon="User" />
            <MemberDetailsComponent />
        </section>
    )
}