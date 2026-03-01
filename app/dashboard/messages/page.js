import Heading from "@/components/Heading";
import MessagesTable from "./_components/MessagesTable";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  return (
    <div className="p-4">
      <Heading title1="Messages" title2="Contact submissions" />
      <div className="mt-4">
        <MessagesTable />
      </div>
    </div>
  );
}
