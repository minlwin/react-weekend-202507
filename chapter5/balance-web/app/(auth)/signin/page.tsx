import PageTitle from "@/components/widgets/page-title";
import { Metadata } from "next";
import SignInFormComponent from "./_client/signin-form";

export const metadata: Metadata = {
  title: "Balance | Sign In",
  description: "Home page of Balance Application.",
};

export default function SignInPage() {
    return (
        <section className="space-y-6">
            <PageTitle title="Sign In" icon="LogIn" />
            <SignInFormComponent />
        </section>
    )
}