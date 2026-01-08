import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field.tsx";
import { GalleryVerticalEnd } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useAuth } from "@/auth.tsx";
import { userLoginSchema, type userLoginValues } from "@/types/Auth.ts";
import { toast } from "sonner";

export const Route = createFileRoute("/(auth)/login")({
  component: LoginComponent,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/dashboard" });
    }
  },
});

function LoginComponent() {
  const auth = useAuth();
  const navigate = useNavigate({ from: "/login" });

  const form = useForm<userLoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: standardSchemaResolver(userLoginSchema),
  });

  async function onSubmit(data: userLoginValues): Promise<void> {
    const success = await auth.login(data);

    if (success) {
      await navigate({ to: "/dashboard" });
    } else {
      toast.error("Invalid email or password");
      form.reset();
    }
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={"flex flex-col gap-6"}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <a href="#" className="flex flex-col items-center gap-2 font-medium">
                  <div className="flex size-8 items-center justify-center rounded-md">
                    <GalleryVerticalEnd className="size-6" />
                  </div>
                  <span className="sr-only">Task management system</span>
                </a>
                <h1 className="text-xl font-bold">Welcome to Task management system</h1>
                <FieldDescription>
                  Don&apos;t have an account? <Link to="/register">Sign up</Link>
                </FieldDescription>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...form.register("email")}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input {...form.register("password")} type="password" required autoComplete="off" />
              </Field>
              <Field>
                <Button className="hover:cursor-pointer" type="submit">
                  Login
                </Button>
              </Field>
            </FieldGroup>
          </form>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
