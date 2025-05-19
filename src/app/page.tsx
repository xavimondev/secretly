import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LandingFooter } from "@/components/landing-footer";
import { LandingHeader } from "@/components/landing-header";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20 z-0"></div>
        <div className="container relative z-10 px-4 md:px-6 mt-64">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
                  Secure credential management for{" "}
                  <span className="gradient-text">development teams</span>
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                  Secretly helps teams manage and secure API keys, tokens, and
                  secrets across all your environments.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" asChild>
                  <Link href="/login">
                    Start now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
