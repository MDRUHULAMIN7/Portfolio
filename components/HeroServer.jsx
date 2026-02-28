import { Suspense } from "react";
import HeroContainer from "./HeroContainer";
import { getAvatar } from "@/queries/avatar";
import { dbConnect } from "@/service/mongoose";

async function HeroServerInner() {
  await dbConnect();
  const avatarData = await getAvatar();
  return <HeroContainer avatarData={avatarData} />;
}

export default function HeroServer({ fallback = null }) {
  return (
    <Suspense fallback={fallback}>
      <HeroServerInner />
    </Suspense>
  );
}
