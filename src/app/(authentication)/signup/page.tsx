import { Button } from "@/shadcn/ui/button";
import { IconCopyright, IconLayoutKanbanFilled } from "@tabler/icons-react";
import Link from "next/link";
import SignupForm from "./_form";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col md:min-h-full">
      <header className="flex justify-center md:hidden">
        <div className="grid size-24 place-content-center bg-foreground">
          <div className="grid size-12 place-content-center rounded-full bg-background">
            <IconLayoutKanbanFilled className="size-8 -rotate-90 text-foreground" />
          </div>
        </div>
      </header>
      <div className="flex grow flex-col items-center justify-center gap-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create a Taskly Account</h1>
          <p className="text-muted-foreground">
            Welcome! Create an account to get started
          </p>
        </div>
        <SignupForm />
        <div className="text-sm">
          Already have an account?
          <Button variant={"link"} size={"sm"}>
            <Link href={"/signin"}>Sign Up</Link>
          </Button>
        </div>
      </div>
      <footer className="flex items-center justify-start gap-1 p-2 md:hidden">
        <IconCopyright size={16} />
        <p>2025 Taskly. All rights reserved.</p>
      </footer>
    </main>
  );
}
