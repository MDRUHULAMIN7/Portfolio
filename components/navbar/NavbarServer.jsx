import { Suspense } from "react";
import Navbar from "./Navbar";
import { dbConnect } from "@/service/mongoose";
import { getAvatar } from "@/queries/avatar";
import { getSocialLinks } from "@/queries/social";
import { getPermissions } from "@/queries/permissions";
import { auth } from "@/auth";

async function NavbarServerInner() {
  await dbConnect();
  const [avatarData, links, loginPermission, session] = await Promise.all([
    getAvatar(),
    getSocialLinks(),
    getPermissions(),
    auth(),
  ]);

  return (
    <Navbar
      avatarData={avatarData?.[0] || {}}
      links={links?.[0] || {}}
      loginPermission={loginPermission?.[0] || {}}
      session={session || null}
      nav={true}
    />
  );
}

export default function NavbarServer({ fallback = null }) {
  return (
    <Suspense fallback={fallback}>
      <NavbarServerInner />
    </Suspense>
  );
}
