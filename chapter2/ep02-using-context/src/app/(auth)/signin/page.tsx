import FormGroup from "@/components/custom/form-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockOpen, UserPlus } from "lucide-react";
import Link from "next/link";
import AuthFormTemplate from "../_template/auth-form-template";

export default function SignInPage() {
    return (
        <AuthFormTemplate title="Sign In" icon={<LockOpen />}>
            <form action="" className="mt-4">
                <FormGroup label="Login ID" className="mb-3">
                    <Input placeholder="Enter Login ID" />
                </FormGroup>

                <FormGroup label="Password" className="mb-3">
                    <Input type="password" placeholder="Enter Password" />
                </FormGroup>

                <div>
                    <Button type="submit" className="me-1">
                        <LockOpen /> Sign In
                    </Button>

                    <Button type="button" asChild variant={"outline"}>
                        <Link href={"/signup"}>
                            <UserPlus /> Sign Up
                        </Link>
                    </Button>
                </div>
            </form>            
        </AuthFormTemplate>
    )
}