import Radial3DBackground from "@/components/animated/radial-3d-background";
import { auth } from "@/server/auth/server.auth";
import { IconCopyright, IconLayoutKanbanFilled } from "@tabler/icons-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthenticationLayout({
  children,
}: LayoutProps<"/">) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect("/dashboard");
  }

  return (
    <main className="grid min-h-screen grid-cols-1 md:grid-cols-2 md:p-4">
      <div className="relative hidden h-full overflow-hidden rounded-md md:block">
        <Radial3DBackground />
        <div className="absolute top-0 left-10 grid size-36 place-content-center bg-background">
          <div className="grid size-18 place-content-center rounded-full bg-foreground">
            <IconLayoutKanbanFilled className="size-16 -rotate-90 text-background" />
          </div>
        </div>
        <div className="absolute bottom-2 left-10 z-10 flex items-center gap-1 text-sm text-background">
          <IconCopyright size={16} />
          <p>2025 Taskly. All rights reserved.</p>
        </div>
      </div>
      <div className="h-full">{children}</div>
    </main>
  );
}
