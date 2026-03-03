import { Suspense } from "react";
import HeroContainer from "./HeroContainer";
import { getResume } from "@/queries/avatar";
import { dbConnect } from "@/service/mongoose";

async function HeroServerInner() {
  await dbConnect();
  const resumeData = await getResume();
  return <HeroContainer resumeUrl={resumeData?.resume || ""} />;
}

export default function HeroServer({ fallback = null }) {
  return (
    <Suspense fallback={fallback}>
      <HeroServerInner />
    </Suspense>
  );
}
