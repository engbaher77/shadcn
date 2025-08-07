"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import { RegisterForm } from "@/components/register-form";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations("auth");

  return (
    <div className="grid min-h-svh w-full lg:grid-cols-[1fr_1fr]">
      <div className="flex flex-col p-6 md:p-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M13 8H7" />
                <path d="M17 12H7" />
              </svg>
            </div>
            <span className="font-semibold text-brand">Omnibot</span>
          </Link>

          <div className="text-sm text-muted-foreground">
            <span>{t("alreadyHaveAccount")}</span>
            <Button
              variant="link"
              onClick={() => router.push("/login")}
              className="text-brand font-medium"
            >
              Sign in
            </Button>
          </div>
          <LanguageSwitcher />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <RegisterForm onRegisterSuccess={() => router.push("/login")} />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-brand/5 via-primary/5 to-accent/10 relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-primary/10" />
        <Image
          src="https://images.unsplash.com/photo-1611224923853-80b023f02d71"
          alt="Business communication and messaging"
          width="1920"
          height="1080"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.3] dark:grayscale opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">
                Unify Your Communications
              </h2>
              <p className="text-lg text-muted-foreground">
                Manage WhatsApp, Instagram, Facebook, Email, and SMS from one
                powerful platform.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 bg-background/10 backdrop-blur-sm rounded-lg p-3">
                <div className="w-8 h-8 rounded-full bg-whatsapp/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-whatsapp"></div>
                </div>
                <span className="text-sm font-medium">WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 bg-background/10 backdrop-blur-sm rounded-lg p-3">
                <div className="w-8 h-8 rounded-full bg-instagram/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-instagram"></div>
                </div>
                <span className="text-sm font-medium">Instagram</span>
              </div>
              <div className="flex items-center gap-2 bg-background/10 backdrop-blur-sm rounded-lg p-3">
                <div className="w-8 h-8 rounded-full bg-facebook/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-facebook"></div>
                </div>
                <span className="text-sm font-medium">Facebook</span>
              </div>
              <div className="flex items-center gap-2 bg-background/10 backdrop-blur-sm rounded-lg p-3">
                <div className="w-8 h-8 rounded-full bg-email/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-email"></div>
                </div>
                <span className="text-sm font-medium">Email</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
