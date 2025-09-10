"use client";

import {  useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import {
  Calendar1,
  CalendarRange,
  ChartColumn,
  ChartNoAxesCombined,
  Earth,
  Heart,
  PersonStanding,
  Telescope,
  TriangleAlert,
  User,
} from "lucide-react";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function VisitorsChart() {
  const [visitors, setVisitors] = useState([]);
  const [filterType, setFilterType] = useState("year");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch visitors data
  const fetchVisitors = async (year, month = null) => {
    if (!year) return;

    setLoading(true);
    let url = `/api/visitors?year=${year}`;
    if (month) {
      url += `&month=${month}`;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setVisitors(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setVisitors([]);
    }
    setLoading(false);
  };

  // Extract available years from data
  const availableYears = useMemo(() => {
    return [2025, 2026, 2027, 2028, 2029, 2030];
  }, []);

  // Group data for chart based on filter type
  const groupedData = useMemo(() => {
    if (!visitors || visitors.length === 0) return null;

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (filterType === "year") {
      // Group by months for the selected year
      const monthCounts = new Array(12).fill(0);

      visitors.forEach((v) => {
        const date = new Date(v.visitedAt);
        const month = date.getMonth();
        monthCounts[month]++;
      });

      return {
        labels: monthNames,
        datasets: [
          {
            label: `Monthly Visitors - ${selectedYear}`,
            data: monthCounts,
            backgroundColor: "rgba(59, 130, 246, 0.7)",
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 2,
            borderRadius: 8,
          },
        ],
      };
    } else if (filterType === "month") {
      // Group by days for the selected month
      const year = parseInt(selectedYear);
      const month = parseInt(selectedMonth) - 1;
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const dayCounts = new Array(daysInMonth).fill(0);

      visitors.forEach((v) => {
        const date = new Date(v.visitedAt);
        const day = date.getDate();
        dayCounts[day - 1]++;
      });

      const labels = Array.from({ length: daysInMonth }, (_, i) =>
        (i + 1).toString()
      );

      return {
        labels: labels,
        datasets: [
          {
            label: `Daily Visitors - ${monthNames[month]} ${selectedYear}`,
            data: dayCounts,
            backgroundColor: "rgba(147, 51, 234, 0.7)",
            borderColor: "rgba(147, 51, 234, 1)",
            borderWidth: 2,
            borderRadius: 8,
          },
        ],
      };
    } else if (filterType === "day") {
      // Group by hours for the selected month
      const hourCounts = new Array(24).fill(0);

      visitors.forEach((v) => {
        const date = new Date(v.visitedAt);
        const hour = date.getHours();
        hourCounts[hour]++;
      });

      const labels = Array.from(
        { length: 24 },
        (_, i) => `${i.toString().padStart(2, "0")}:00`
      );

      return {
        labels: labels,
        datasets: [
          {
            label: `Hourly Visitors - ${
              monthNames[parseInt(selectedMonth) - 1]
            } ${selectedYear}`,
            data: hourCounts,
            backgroundColor: "rgba(236, 72, 153, 0.7)",
            borderColor: "rgba(236, 72, 153, 1)",
            borderWidth: 2,
            borderRadius: 8,
          },
        ],
      };
    }

    return null;
  }, [visitors, filterType, selectedYear, selectedMonth]);

  const handleFilterChange = (type) => {
    setFilterType(type);
    setSelectedYear("");
    setSelectedMonth("");
    setVisitors([]);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedMonth("");
    if (filterType === "year") {
      fetchVisitors(year);
    } else {
      setVisitors([]);
    }
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    if ((filterType === "month" || filterType === "day") && selectedYear) {
      fetchVisitors(selectedYear, month);
    }
  };

  const canShowData = useMemo(() => {
    if (filterType === "year") return selectedYear;
    if (filterType === "month") return selectedYear && selectedMonth;
    if (filterType === "day") return selectedYear && selectedMonth;
    return false;
  }, [filterType, selectedYear, selectedMonth]);

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    name: new Date(2024, i).toLocaleString("default", { month: "long" }),
  }));

  const stats = useMemo(() => {
    if (!visitors || visitors.length === 0) return null;

    const totalVisitors = visitors.length;
    const uniqueIPs = new Set(visitors.map((v) => v.ip)).size;

    // Calculate average visits per period
    let average = 0;
    if (groupedData?.datasets?.[0]?.data) {
      const nonZeroData = groupedData.datasets[0].data.filter((v) => v > 0);
      if (nonZeroData.length > 0) {
        average = (
          nonZeroData.reduce((a, b) => a + b, 0) / nonZeroData.length
        ).toFixed(1);
      }
    }

    return { totalVisitors, uniqueIPs, average };
  }, [visitors, groupedData]);

  return (
    <div className=" bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-8  rounded-lg">
      <div className="container mx-auto md:px-4 px-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-700 bg-clip-text text-transparent pb-4">
              Visitor Analytics
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Comprehensive insights into your website traffic patterns
            </p>
          </div>

          {stats && visitors.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">
                      Total Visitors
                    </p>
                    <p className="text-white text-3xl font-bold">
                      {stats.totalVisitors}
                    </p>
                  </div>
                  <div className="text-blue-200 text-4xl">
                    {" "}
                    <User size={28} />{" "}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-xl p-4 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-100 text-sm font-medium">
                      Unique IPs
                    </p>
                    <p className="text-white text-3xl font-bold">
                      {stats.uniqueIPs}
                    </p>
                  </div>
                  <div className="text-cyan-200 text-4xl">
                    <Earth size={28} />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl p-4 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-pink-100 text-sm font-medium">
                      Avg per Period
                    </p>
                    <p className="text-white text-3xl font-bold">
                      {stats.average}
                    </p>
                  </div>
                  <div className="text-pink-200 text-4xl">
                    <ChartNoAxesCombined size={28} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Chart Section */}
          <div className=" rounded-2xl ">
            <div className="mb-8 ">
              <div className="flex flex-wrap gap-6  p-2 bg-gray-800/50 rounded-xl border border-gray-600/50">
                <div className="flex-1 min-w-[200px] ">
                  <label className="flex justify-center items-center gap-x-2 text-sm font-semibold text-gray-300 mb-3">
                    <ChartColumn size={16} /> Analysis Type
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="w-full p-4 rounded-xl bg-gray-700/80 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all duration-300"
                  >
                    <option value="year">Yearly Overview (Monthly Data)</option>
                    <option value="month">
                      Monthly Breakdown (Daily Data)
                    </option>
                    <option value="day">Daily Analysis (Hourly Data)</option>
                  </select>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="flex justify-center items-center gap-x-2text-sm font-semibold text-gray-300 mb-3">
                    <CalendarRange size={16} />
                    Select Year <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => handleYearChange(e.target.value)}
                    className="w-full p-4 rounded-xl bg-gray-700/80 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all duration-300"
                  >
                    <option value="">Choose Year</option>
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {(filterType === "month" || filterType === "day") && (
                  <div className="flex-1 min-w-[200px]">
                    <label className="flex justify-center items-center gap-x-2 text-sm font-semibold text-gray-300 mb-3">
                      <Calendar1 size={16} /> Select Month{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => handleMonthChange(e.target.value)}
                      disabled={!selectedYear}
                      className="w-full p-4 rounded-xl bg-gray-700/80 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Choose Month</option>
                      {months.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Status Messages */}
              {!canShowData && (
                <div className="mt-6">
                  <div className="flex items-center p-4 bg-amber-900/50 border border-amber-700/50 rounded-xl text-amber-200">
                    <span className="text-2xl mr-3 text-yellow-500">
                      <TriangleAlert />
                    </span>
                    <div>
                      <p className="font-medium">Selection Required</p>
                      <p className="text-sm text-amber-300">
                        {filterType === "year" &&
                          "Select a year to view monthly visitor trends"}
                        {filterType === "month" &&
                          "Select both year and month to view daily patterns"}
                        {filterType === "day" &&
                          "Select both year and month to view hourly distribution"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chart Area */}
            <div className=" rounded-xl  backdrop-blur-sm max-w-sm md:max-w-lg xl:max-w-4xl mx-auto">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
                    <div className="animate-ping absolute inset-0 rounded-full h-16 w-16 border-4 border-blue-400 opacity-20"></div>
                  </div>
                  <p className="mt-6 text-gray-300 text-lg font-medium">
                    Analyzing visitor data...
                  </p>
                </div>
              ) : !canShowData ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <div className="text-8xl text-gray-100 mb-6 opacity-50">
                    <Telescope size={72} className="text-gray-100" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-300 mb-2">
                    Ready to Explore Your Data
                  </h3>
                  <p className="text-lg text-center text-gray-300 max-w-md">
                    Select the required filters above to generate analytics
                    visualizations
                  </p>
                </div>
              ) : !groupedData || visitors.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <div className="text-8xl mb-6 opacity-50"></div>
                  <h3 className="text-2xl font-bold text-gray-300 mb-2">
                    No Data Available
                  </h3>
                  <p className="text-lg text-center text-gray-300  max-w-md">
                    No visitor data found for the selected time period
                  </p>
                </div>
              ) : (
                <div>
                  <div className="mb-6 p-4 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-lg border border-gray-600/50">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {filterType === "year" &&
                        ` Monthly Visitors for ${selectedYear}`}
                      {filterType === "month" &&
                        ` Daily Visitors - ${
                          months.find((m) => m.value == selectedMonth)?.name
                        } ${selectedYear}`}
                      {filterType === "day" &&
                        ` Hourly Visitors - ${
                          months.find((m) => m.value == selectedMonth)?.name
                        } ${selectedYear}`}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {visitors.length} total visits • {stats?.uniqueIPs} unique
                      IPs • {stats?.average} avg per period
                    </p>
                  </div>

                  {/* Chart Container */}
                  <div className="w-full rounded-xl bg-gray-900 ">
                    <div className="h-[500px]">
                      <Bar
                        data={groupedData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          interaction: {
                            intersect: false,
                            mode: "index",
                          },
                          animation: {
                            duration: 1000,
                            easing: "easeOutQuart",
                          },
                          plugins: {
                            legend: {
                              display: true,
                              labels: {
                                color: "#f3f4f6",
                                font: {
                                  size: 14,
                                  weight: "bold",
                                },
                                padding: 20,
                              },
                              position: "top",
                            },
                            tooltip: {
                              backgroundColor: "rgba(17, 24, 39, 0.95)",
                              titleColor: "#f9fafb",
                              bodyColor: "#f9fafb",
                              borderColor: "#6b7280",
                              borderWidth: 2,
                              cornerRadius: 12,
                              padding: 12,
                              displayColors: true,
                              callbacks: {
                                title: function (context) {
                                  const label = context[0].label;
                                  if (filterType === "year")
                                    return `Month: ${label}`;
                                  if (filterType === "month")
                                    return `Day ${label}`;
                                  if (filterType === "day")
                                    return `Time: ${label}`;
                                  return label;
                                },
                                label: function (context) {
                                  return `Visitors: ${context.parsed.y}`;
                                },
                                afterLabel: function (context) {
                                  const total = context.dataset.data.reduce(
                                    (a, b) => a + b,
                                    0
                                  );
                                  if (total === 0) return "";
                                  const percentage = (
                                    (context.parsed.y / total) *
                                    100
                                  ).toFixed(1);
                                  return `Share: ${percentage}%`;
                                },
                              },
                            },
                          },
                          scales: {
                            x: {
                              ticks: {
                                color: "#d1d5db",
                                font: {
                                  size: 12,
                                  weight: "500",
                                },
                                maxRotation: 45,
                                minRotation: 0,
                                autoSkip: false,
                              },
                              grid: {
                                color: "rgba(75, 85, 99, 0.3)",
                                display: true,
                              },
                              title: {
                                display: true,
                                text:
                                  filterType === "year"
                                    ? "Months"
                                    : filterType === "month"
                                    ? "Days"
                                    : "Hours",
                                color: "#9ca3af",
                                font: {
                                  size: 14,
                                  weight: "bold",
                                },
                                padding: 20,
                              },
                            },
                            y: {
                              ticks: {
                                color: "#d1d5db",
                                stepSize: 1,
                                beginAtZero: true,
                                font: {
                                  size: 12,
                                  weight: "500",
                                },
                                callback: function (value) {
                                  return Number.isInteger(value) ? value : "";
                                },
                              },
                              grid: {
                                color: "rgba(75, 85, 99, 0.2)",
                                display: true,
                              },
                              title: {
                                display: true,
                                text: "Number of Visitors",
                                color: "#9ca3af",
                                font: {
                                  size: 14,
                                  weight: "bold",
                                },
                                padding: 20,
                              },
                            },
                          },
                          layout: {
                            padding: {
                              top: 20,
                              right: 20,
                              bottom: 20,
                              left: 20,
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-200">
            <p className="text-sm">
              Powered by advanced analytics • Updated in real-time •
              <span className="">Built with for insights</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
