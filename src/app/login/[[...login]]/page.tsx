import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-1 font-medium">
            Secretly
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignIn fallback={<span>loading</span>} />
          </div>
        </div>
      </div>
      <div className="lg:flex items-center justify-center size-full hidden bg-white text-lg sm:text-xl px-24 py-4">
        <span className="text-gray-600">
          Secretly helps teams manage, rotate, and secure API keys, tokens, and
          secrets across all your environments.
        </span>
      </div>
    </div>
  );
}
