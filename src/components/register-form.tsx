"use client";

import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/lib/redux/hooks";
import { loginSuccess } from "@/lib/redux/features/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { authService } from "@/lib/api/authService";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

interface RegisterFormProps extends React.ComponentProps<"div"> {
  onRegisterSuccess: () => void;
}

export function RegisterForm({
  className,
  onRegisterSuccess,
  ...props
}: RegisterFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const response = await authService.register(values);
      toast.success("Account created successfully!");

      dispatch(loginSuccess(response));
      setCookie("auth_token", response.accessToken);
      toast.success("Welcome back to Omnibot!");
      router.push("/");

      onRegisterSuccess();
    } catch (error) {
      console.error("Registration failed:", error);
      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);
          toast.error(
            errorData.message || "Registration failed. Please try again."
          );
        } catch {
          toast.error(error.message);
        }
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 mb-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-brand"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M13 8H7" />
            <path d="M17 12H7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          Start Your 14-Day Free Trial
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          Create your Omnibot account and unify all your business communications
        </p>
        <div className="flex items-center gap-2 text-xs text-success font-medium">
          <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          NO CREDIT CARD REQUIRED
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4"
          autoComplete="off"
        >
          {/* Hidden honeypot fields to prevent autofill */}
          <div style={{ display: "none" }}>
            <input type="text" name="fake-username" autoComplete="username" />
            <input
              type="password"
              name="fake-password"
              autoComplete="current-password"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      {...field}
                      autoComplete="new-password"
                      data-form-type="other"
                      className="transition-all duration-200 focus:ring-2 focus:ring-brand/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      {...field}
                      autoComplete="new-password"
                      data-form-type="other"
                      className="transition-all duration-200 focus:ring-2 focus:ring-brand/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="your@business.com"
                      {...field}
                      autoComplete="new-password"
                      data-form-type="other"
                      type="text"
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      {...field}
                      autoComplete="new-password"
                      data-form-type="other"
                      className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-brand/20"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
                <div className="text-xs text-muted-foreground mt-1">
                  Must contain uppercase, lowercase, and number
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-brand hover:bg-brand/90 text-brand-foreground font-medium h-11"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-brand-foreground/30 border-t-brand-foreground rounded-full animate-spin" />
                Creating your account...
              </div>
            ) : (
              "Start Free Trial"
            )}
          </Button>
        </form>
      </Form>

      <div className="space-y-4">
        <p className="text-muted-foreground px-2 text-center text-xs leading-relaxed">
          By creating an account, you agree to our{" "}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-brand transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-brand transition-colors"
          >
            Privacy Policy
          </a>
        </p>

        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <svg
              className="h-4 w-4 text-brand"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            What you get with your free trial:
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-success"></div>
              Connect up to 3 messaging channels
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-success"></div>
              Unlimited message history
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-success"></div>
              Team collaboration tools
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-success"></div>
              24/7 customer support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
