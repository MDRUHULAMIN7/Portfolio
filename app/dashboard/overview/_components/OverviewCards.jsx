"use client";

import { useEffect, useState } from "react";

import { Users, Eye, Star, FileText, FolderKanban, Layers, Briefcase } from "lucide-react";
import LoadingUi from "@/components/loadings/LoadingUi";

export default function OverviewCards() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("/api/overview");
      if (!res.ok) throw new Error("Failed to fetch overview data");
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  if (loading) {
    return <div className="p-10 text-center"><LoadingUi/></div>;
  }

  if (!data) {
    return <div className="p-10 text-center text-red-500">Failed to load overview.</div>;
  }

  const {
    totalVisitors,
    totalReviews,
    avgRating,
    totalUsers,
    totalBlogs,
    totalProjects,
    totalSkills,
    currentWork,
  } = data;

  const cards = [
    { title: "Visitors", value: totalVisitors, icon: <Eye className="w-6 h-6 text-blue-500" /> },
    { title: "Reviews", value: totalReviews, icon: <Star className="w-6 h-6 text-yellow-500" /> },
    { title: "Avg Rating", value: avgRating.toFixed(1), icon: <Star className="w-6 h-6 text-green-500" /> },
    { title: "Users", value: totalUsers, icon: <Users className="w-6 h-6 text-purple-500" /> },
    { title: "Blogs", value: totalBlogs, icon: <FileText className="w-6 h-6 text-orange-500" /> },
    { title: "Projects", value: totalProjects, icon: <FolderKanban className="w-6 h-6 text-pink-500" /> },
    { title: "Skills", value: totalSkills, icon: <Layers className="w-6 h-6 text-indigo-500" /> },
  ];

  return (
    <div className="p-8">
      

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex items-center justify-between p-6 bg-gray-900 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div>
              <h2 className="text-sm text-gray-500">{card.title}</h2>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
            {card.icon}
          </div>
        ))}
      </div>

      {/* Current Work Section */}
      <div className="mt-10 p-6 bg-gray-900 rounded-2xl shadow">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-gray-600" /> Current Workplace
        </h2>
        {currentWork ? (
          <div className="mt-3">
            <p className="text-lg font-semibold">{currentWork.designation}</p>
            <p className="text-gray-600 ">{currentWork.company}</p>
            <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
              {currentWork.status}
            </span>
          </div>
        ) : (
          <p className="text-gray-500 mt-2">No ongoing workplace found</p>
        )}
      </div>
    </div>
  );
}
