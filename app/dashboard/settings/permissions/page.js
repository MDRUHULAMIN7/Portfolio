import Heading from "@/components/Heading";
import { getPermissions } from "@/queries/permissions";
import PermissionsTableClient from "./_components/PermissionsTableClient";


export default async function Permissions() {
  const permissions = await getPermissions();

  return (
    <div className="p-6">
      <Heading title1="Permissions" title2="Manage user permissions" />
      <PermissionsTableClient permissionsData={permissions} />
    </div>
  );
}
