import { LockOpen, UserPlus } from "lucide-react";
import AuthFormTemplate from "../_template/auth-form-template";
import FormGroup from "@/components/custom/form-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <AuthFormTemplate title="Sign Up" icon={<UserPlus />}>
            <form action="">
                <FormGroup label="Name" className="mb-3">
                    <Input placeholder="Enter Your Name" />
                </FormGroup>

                <FormGroup label="Login Id" className="mb-3">
                    <Input placeholder="Enter Login Id" />
                </FormGroup>

                <FormGroup label="Password" className="mb-3">
                    <Input type="password" placeholder="Enter Password" />
                </FormGroup>

                <div>
                    <Button type="submit" className="me-2">
                        <UserPlus /> Sign Up
                    </Button>

                    <Button type="button" variant={'outline'} asChild>
                        <Link href={"/signin"}>
                            <LockOpen /> Sign In
                        </Link>
                    </Button>
                </div>
            </form>
        </AuthFormTemplate>
    )
}