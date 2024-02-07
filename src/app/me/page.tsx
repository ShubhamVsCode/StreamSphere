import { auth, signOut } from "@/auth";

import { redirect } from "next/navigation";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/me");
  }

  return (
    <>
      {session.user.id}
      {session.user.name}
      {session.user.email}
      <Image
        src={session.user.image || ""}
        alt='user'
        width={100}
        height={100}
      />

      <Button
        onClick={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        Sign out
      </Button>
    </>
  );
}
