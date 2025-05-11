import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, CheckCircle, Clock, RefreshCw, Users } from "lucide-react";
import Link from "next/link";
import { LandingFooter } from "@/components/landing-footer";
import { LandingHeader } from "@/components/landing-header";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20 z-0"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    Secure credential management for{" "}
                    <span className="gradient-text">development teams</span>
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Secretly helps teams manage, rotate, and secure API keys,
                    tokens, and secrets across all your environments.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button size="lg" asChild>
                    <Link href="/register">
                      Start for Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[500px] rounded-xl border bg-card p-2 shadow-2xl shadow-primary/20">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="Secretly Dashboard"
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Key Features
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to manage secrets securely across your
                organization
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Automatic Secret Rotation</CardTitle>
                  <CardDescription>
                    Schedule automatic rotation of credentials to enhance
                    security and compliance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Configurable rotation schedules</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Automatic service updates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Zero-downtime credential updates</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href="/docs/rotation">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-card/50 border-accent/20">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Granular Access Control</CardTitle>
                  <CardDescription>
                    Define who can access, modify, or view specific credentials
                    across your organization.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 shrink-0" />
                      <span>Role-based permissions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 shrink-0" />
                      <span>Environment-specific access</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 shrink-0" />
                      <span>Temporary access grants</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href="/docs/access-control">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Comprehensive Audit Trails</CardTitle>
                  <CardDescription>
                    Track every interaction with your credentials for security
                    and compliance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Detailed activity logs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Exportable audit reports</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Anomaly detection</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href="/docs/audit-trails">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        {/* Pricing Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-muted-foreground">
                Choose the plan that's right for your team
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $0
                    <span className="ml-1 text-lg font-medium text-muted-foreground">
                      /month
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Up to 3 projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>5 team members</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>100 credentials</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Basic audit logs (7 days)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Community support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/register">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-card/50 border-primary relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Most Popular
                </div>
                <CardHeader>
                  <CardTitle>Team</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $29
                    <span className="ml-1 text-lg font-medium text-muted-foreground">
                      /month
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Unlimited projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Up to 20 team members</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Unlimited credentials</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Advanced audit logs (30 days)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Automatic secret rotation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/register?plan=team">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    Custom
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Everything in Team</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Unlimited team members</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>SSO & SAML integration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Advanced audit logs (1 year)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Custom integrations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Dedicated support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>SLA guarantees</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/contact-sales">Contact Sales</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
