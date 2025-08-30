"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PermissionsTableClient({ permissionsData }) {
  const [permissions, setPermissions] = useState(permissionsData);
  const [loadingField, setLoadingField] = useState(null);
  console.log(permissions)

  const togglePermission = async (permId, field) => {
    try {
      setLoadingField(`${permId}-${field}`);

      const currentValue = permissions.find((p) => p.id === permId)[field];
      const newValue = !currentValue;

      const res = await fetch("/api/permissions/toggle", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: permId, field, value: newValue }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        toast.success(`${field} updated to ${newValue}`);
        setPermissions((prev) =>
          prev.map((p) =>
            p.id === permId ? { ...p, [field]: newValue } : p
          )
        );
      } else {
        toast.error(result.error || "Failed to update permission");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoadingField(null);
    }
  };

  return (
    <div className="p-4">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Last Updated</th>
              <th className="px-4 py-2 text-center">Login</th>
              <th className="px-4 py-2 text-center">Register</th>
              <th className="px-4 py-2 text-center">Add Review</th>
              <th className="px-4 py-2 text-center">See Visitors</th>
            </tr>
          </thead>
          <tbody>
            {permissions?.map((p) => (
              <tr key={p.id} className="border-b border-gray-700">
                <td className="px-4 py-2">{new Date(p.updatedAt).toLocaleString()}</td>
                {["login", "register", "addReview", "seeVisitors"].map((field) => (
                  <td key={field} className="px-4 py-2 text-center">
                    <button
                      disabled={loadingField === `${p.id}-${field}`}
                      onClick={() => togglePermission(p.id, field)}
                      className={`px-2 py-1 rounded-lg ${
                        p[field] ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {loadingField === `${p.id}-${field}`
                        ? "Loading..."
                        : p[field].toString()}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {permissions?.map((p) => (
          <div
            key={p.id}
            className="bg-gray-800 text-white p-4 rounded-xl shadow-md space-y-3"
          >
            <div className="font-semibold text-lg">Last Updated: {new Date(p.updatedAt).toLocaleString()}</div>
            {["login", "register", "addReview", "seeVisitors"].map((field) => (
              <div key={field} className="flex items-center justify-between">
                <span className="capitalize">{field}</span>
                <button
                  disabled={loadingField === `${p.id}-${field}`}
                  onClick={() => togglePermission(p.id, field)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    p[field] ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {loadingField === `${p.id}-${field}`
                    ? "..."
                    : p[field].toString()}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
