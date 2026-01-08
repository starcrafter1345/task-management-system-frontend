import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field.tsx";
import { useAuth } from "@/auth.tsx";
import { useForm } from "react-hook-form";
import { GalleryVerticalEnd } from "lucide-react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { registerFormSchema, type RegisterFormValues } from "@/types/Auth.ts";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";

export const Route = createFileRoute("/(auth)/register")({
  component: RegisterComponent,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/dashboard" });
    }
  },
});

function RegisterComponent() {
  const auth = useAuth();
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    resolver: standardSchemaResolver(registerFormSchema),
  });

  async function onSubmit(data: RegisterFormValues): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { repeatPassword, ...payload } = data;
    const success = await auth.register(payload);

    if (success) {
      toast.success("Registration successful!");
      await navigate({ to: "/dashboard" });
    } else {
      toast.error("Registration failed");
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
                  Have an account? <Link to="/login">Log in</Link>
                </FieldDescription>
              </div>

              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  {...form.register("username")}
                  type="text"
                  placeholder="jn1990"
                  required
                />
                <FieldError errors={[form.formState.errors.username]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...form.register("email")}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                <FieldError errors={[form.formState.errors.email]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...form.register("password")}
                  type="password"
                  required
                  autoComplete="off"
                />
                <FieldError errors={[form.formState.errors.password]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="repeatPassword">Repeat Password</FieldLabel>
                <Input
                  {...form.register("repeatPassword")}
                  type="password"
                  required
                  autoComplete="off"
                />
                <FieldError errors={[form.formState.errors.repeatPassword]} />
              </Field>

              <Field>
                <Button className="hover:cursor-pointer" type="submit">
                  Sign Up
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
