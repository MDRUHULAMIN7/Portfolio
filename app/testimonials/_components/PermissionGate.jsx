import { getPermissions } from "@/queries/permissions";
import ReviewAdd from "./ReviewAdd";

export default async function PermissionGate() {
  const permission = await getPermissions();
  const allow = Boolean(permission?.[0]?.addReview);
  if (!allow) return null;
  return <ReviewAdd />;
}
