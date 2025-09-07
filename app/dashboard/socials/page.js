import Heading from "@/components/Heading";
import LoadingUi from "@/components/loadings/LoadingUi";
import { getSocialLinks } from "@/queries/social";
import { dbConnect } from "@/service/mongoose";
import SocialsTable from "./_components/SocialsTable";


export default async function SocialsPage() {
  await dbConnect();
  const socials = await getSocialLinks();

  if (!socials) return <div><LoadingUi /></div>;

  return (
    <div>
      <Heading title1="Socials Links" title2="Manage Your Socials Link" />
      <SocialsTable socials={socials} />
    </div>
  );
}
