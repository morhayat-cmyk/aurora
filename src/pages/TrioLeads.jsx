import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts';
import {
    Users,
    DollarSign,
    MousePointer,
    Target,
    Globe,
    Briefcase,
    Activity,
    Filter,
    TrendingUp,
    Award
} from 'lucide-react';

// --- Data Extraction from User Files ---
const reportData = {
    "Embedded Software": {
        audienceSize: 28000,
        spent: 2152,
        impressions: 6114,
        reach: 3285,
        clicks: 128,
        ctr: 0.0209,
        leads: 8,
        cpl: 269,
        geoData: [
            { name: 'United States', impressions: 1273, clicks: 26, leads: 20 },
            { name: 'Germany', impressions: 835, clicks: 12, leads: 8 },
            { name: 'Italy', impressions: 405, clicks: 8, leads: 8 },
            { name: 'Israel', impressions: 381, clicks: 13, leads: 8 },
            { name: 'Netherlands', impressions: 315, clicks: 12, leads: 10 },
        ],
        jobTitles: [
            "Senior embedded software engineer", "Embedded developer", "Embedded design engineer",
            "Embedded software engineer", "Embedded system developer", "Senior embedded engineer",
            "Embedded system software engineer"
        ]
    },
    "Network Engineer": {
        audienceSize: 150000,
        spent: 2068,
        impressions: 8279,
        reach: 5018,
        clicks: 119,
        ctr: 0.0144,
        leads: 19,
        cpl: 108.84,
        geoData: [
            { name: 'United States', impressions: 2800, clicks: 41, leads: 31 },
            { name: 'Germany', impressions: 672, clicks: 3, leads: 0 }, // Handled 'Below reporting minimum' as 0
            { name: 'Italy', impressions: 563, clicks: 13, leads: 11 },
            { name: 'Israel', impressions: 376, clicks: 5, leads: 3 },
            { name: 'Netherlands', impressions: 239, clicks: 8, leads: 4 },
        ],
        jobTitles: [
            "Network engineer", "Hardware networking specialist", "Hardware network engineer",
            "Senior network engineer", "Networking manager", "Director of networking"
        ]
    },
    "Infrastructure Engineer": {
        audienceSize: 57000,
        spent: 1961,
        impressions: 12200,
        reach: 6563,
        clicks: 98,
        ctr: 0.008,
        leads: 13,
        cpl: 150.85,
        geoData: [
            { name: 'United States', impressions: 2800, clicks: 30, leads: 25 },
            { name: 'Germany', impressions: 672, clicks: 4, leads: 4 },
            { name: 'Italy', impressions: 563, clicks: 6, leads: 6 },
            { name: 'Israel', impressions: 376, clicks: 13, leads: 3 },
            { name: 'Netherlands', impressions: 239, clicks: 8, leads: 8 },
        ],
        jobTitles: [
            "Infrastructure Manager", "IT Infrastructure Engineer", "Network Infrastructure Engineer",
            "Lead Infrastructure Engineer", "Manager Infrastructure Engineering", "Principal Infrastructure Engineer"
        ]
    }
};

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

// --- Components ---

const KPICard = ({ title, value, subtext, icon: Icon, colorClass }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow">
        <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
            {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
        </div>
    </div>
);

const SegmentSelector = ({ selected, onSelect }) => (
    <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(reportData).map((segment) => (
            <button
                key={segment}
                onClick={() => onSelect(segment)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selected === segment
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
            >
                {segment}
            </button>
        ))}
    </div>
);

const ComparisonChart = ({ data }) => {
    const chartData = Object.keys(data).map(key => ({
        name: key,
        Impressions: data[key].impressions,
        Clicks: data[key].clicks,
        Leads: data[key].leads * 10 // Scale leads for visibility
    }));

    return (
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                        cursor={{ fill: '#f1f5f9' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend />
                    <Bar dataKey="Impressions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Clicks" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Leads" name="Leads (x10)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const GeoPerformanceChart = ({ data }) => (
    <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="impressions" name="Impressions" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="clicks" name="Clicks" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

export default function TrioLeads() {
    const [selectedSegment, setSelectedSegment] = useState("Embedded Software");

    // Calculate Aggregates for Overview
    const totalSpent = Object.values(reportData).reduce((acc, curr) => acc + curr.spent, 0);
    const totalImpressions = Object.values(reportData).reduce((acc, curr) => acc + curr.impressions, 0);
    const totalLeads = Object.values(reportData).reduce((acc, curr) => acc + curr.leads, 0);
    const avgCPL = totalSpent / totalLeads;

    const currentData = reportData[selectedSegment];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-4 md:p-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">LOCI Audience Report</h1>
                        <p className="text-slate-500 mt-1">Campaign Performance Dashboard</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-sm">
                            <span className="text-slate-500">Date Range:</span> <span className="font-semibold">Campaign Duration</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid gap-8">

                {/* Aggregate KPIs Row */}
                <section>
                    <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5" /> Overall Performance
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <KPICard
                            title="Total Spent"
                            value={`$${totalSpent.toLocaleString()}`}
                            subtext="Across all segments"
                            icon={DollarSign}
                            colorClass="bg-blue-500 text-blue-600"
                        />
                        <KPICard
                            title="Total Impressions"
                            value={totalImpressions.toLocaleString()}
                            subtext="Total visibility"
                            icon={Globe}
                            colorClass="bg-emerald-500 text-emerald-600"
                        />
                        <KPICard
                            title="Total Leads"
                            value={totalLeads}
                            subtext="Conversions generated"
                            icon={Target}
                            colorClass="bg-amber-500 text-amber-600"
                        />
                        <KPICard
                            title="Average CPL"
                            value={`$${avgCPL.toFixed(2)}`}
                            subtext="Cost Per Lead"
                            icon={Award}
                            colorClass="bg-indigo-500 text-indigo-600"
                        />
                    </div>
                </section>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Interactive Detail View */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Chart: Comparative Overview */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-semibold mb-6">Segment Comparison</h3>
                            <ComparisonChart data={reportData} />
                        </div>

                        {/* Segment Deep Dive */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Filter className="w-5 h-5 text-slate-400" /> Segment Details
                                </h3>
                                <SegmentSelector selected={selectedSegment} onSelect={setSelectedSegment} />
                            </div>

                            {/* Selected Segment KPIs */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Audience Size</p>
                                    <p className="text-xl font-bold text-slate-800">{currentData.audienceSize.toLocaleString()}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <p className="text-xs text-slate-500 uppercase font-semibold">CTR</p>
                                    <p className="text-xl font-bold text-slate-800">{(currentData.ctr * 100).toFixed(2)}%</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Reach</p>
                                    <p className="text-xl font-bold text-slate-800">{currentData.reach.toLocaleString()}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <p className="text-xs text-slate-500 uppercase font-semibold">CPL</p>
                                    <p className="text-xl font-bold text-slate-800">${currentData.cpl}</p>
                                </div>
                            </div>

                            {/* Geo Chart */}
                            <h4 className="text-md font-medium text-slate-600 mb-4">Performance by Geography</h4>
                            <GeoPerformanceChart data={currentData.geoData} />

                            {/* Geo Table */}
                            <div className="mt-8 overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                        <tr>
                                            <th className="px-4 py-3 rounded-l-lg">Country</th>
                                            <th className="px-4 py-3">Impressions</th>
                                            <th className="px-4 py-3">Clicks</th>
                                            <th className="px-4 py-3 rounded-r-lg">Leads</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentData.geoData.map((geo, idx) => (
                                            <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                                <td className="px-4 py-3 font-medium text-slate-700">{geo.name}</td>
                                                <td className="px-4 py-3">{geo.impressions.toLocaleString()}</td>
                                                <td className="px-4 py-3">{geo.clicks}</td>
                                                <td className="px-4 py-3 text-indigo-600 font-semibold">{geo.leads}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                    {/* Right Column: Targeting Info & Insights */}
                    <div className="space-y-8">

                        {/* Audience Targeting Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-slate-500" /> Job Titles Targeted
                            </h3>
                            <p className="text-sm text-slate-500 mb-4">
                                Primary job titles included in the <strong>{selectedSegment}</strong> audience segment:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {currentData.jobTitles.map((title, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full border border-slate-200">
                                        {title}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Quick Insights */}
                        <div className="bg-indigo-900 p-6 rounded-xl shadow-lg text-white">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-indigo-300" /> Key Insights
                            </h3>
                            <ul className="space-y-4 text-sm text-indigo-100">
                                <li className="flex gap-3">
                                    <span className="bg-indigo-700 w-6 h-6 flex items-center justify-center rounded-full shrink-0 text-xs font-bold">1</span>
                                    <p><strong>Network Engineers</strong> represent the largest audience pool ({reportData["Network Engineer"].audienceSize.toLocaleString()}) but have a lower CTR compared to Embedded Engineers.</p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="bg-indigo-700 w-6 h-6 flex items-center justify-center rounded-full shrink-0 text-xs font-bold">2</span>
                                    <p><strong>Embedded Software</strong> campaigns are the most efficient in terms of engagement, boasting the highest CTR ({reportData["Embedded Software"].ctr * 100}%) across all segments.</p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="bg-indigo-700 w-6 h-6 flex items-center justify-center rounded-full shrink-0 text-xs font-bold">3</span>
                                    <p><strong>United States</strong> is consistently the top-performing geography for impressions and clicks across all three engineering disciplines.</p>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
