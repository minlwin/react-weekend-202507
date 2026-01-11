import SignUpForm from "@/components/forms/signup-form";
import PageTitle from "@/components/widgets/page-title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Balance | Sign In",
  description: "Home page of Balance Application.",
};

export default function SignUpPage() {
    return (
        <section className="space-y-6">
            <PageTitle icon="UserPlus" title="Sign Up" />
            <SignUpForm />
        </section>
    )
}