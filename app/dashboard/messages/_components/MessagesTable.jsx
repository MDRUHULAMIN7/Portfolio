"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import LoadingUi from "@/components/loadings/LoadingUi";

export default function MessagesTable() {
  const [data, setData] = useState({ items: [], total: 0, page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);

  const fetchPage = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contact?page=${page}&limit=10`, { cache: "no-store" });
      const json = await res.json();
      setData(json);
    } catch (e) {
      setData({ items: [], total: 0, page: 1, totalPages: 1 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(1);
  }, []);

  const handleDelete = async (id) => {
    const prev = data.items;
    setData((d) => ({ ...d, items: d.items.filter((m) => m.id !== id) }));
    try {
      await fetch(`/api/contact/${id}`, { method: "DELETE" });
    } catch {
      setData((d) => ({ ...d, items: prev }));
    }
  };

  if (loading && data.items.length === 0) {
    return <div className="p-10 text-center"><LoadingUi /></div>;
  }

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Subject</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Message</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {data.items.map((m) => (
              <tr key={m.id} className="hover:bg-gray-800">
                <td className="px-4 py-3 text-white">{m.firstName} {m.lastName}</td>
                <td className="px-4 py-3 text-gray-300">{m.email}</td>
                <td className="px-4 py-3 text-gray-300">{m.phone}</td>
                <td className="px-4 py-3 text-gray-300">{m.subject}</td>
                <td className="px-4 py-3 text-gray-400 max-w-xs truncate">{m.message}</td>
                <td className="px-4 py-3 text-gray-400">{new Date(m.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-white inline-flex items-center gap-1"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {data.items.length === 0 && !loading && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-400">No messages found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800">
        <span className="text-sm text-gray-400">
          Page {data.page} of {data.totalPages}
        </span>
        <div className="flex gap-2">
          <button
            disabled={data.page <= 1 || loading}
            onClick={() => fetchPage(data.page - 1)}
            className="px-3 py-1 rounded bg-gray-700 text-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={data.page >= data.totalPages || loading}
            onClick={() => fetchPage(data.page + 1)}
            className="px-3 py-1 rounded bg-gray-700 text-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
