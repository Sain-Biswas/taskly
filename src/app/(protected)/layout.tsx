import { auth } from "@/server/auth/server.auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthenticationLayout({
  children,
}: LayoutProps<"/">) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return children;
}
