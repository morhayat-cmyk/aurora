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
    Cell
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
    Award,
    LayoutDashboard,
    ChevronRight,
    Calendar,
    ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Data Configuration (Original Aurora Labs Data) ---

const CAMPAIGN_DATA = {
    embedded: {
        id: 'embedded',
        title: "Embedded Software", // Renamed for display
        subtitle: "Engineering & Systems",
        color: "#8b5cf6",
        kpi: {
            audience: 28000,
            spend: 8696,
            impressions: 42535,
            reach: 8708,
            clicks: 548,
            ctr: 1.29,
            leads: 82,
            cpl: 106.05,
        },
        geo: [
            { name: 'United States', impressions: 15050, clicks: 167, leads: 123 },
            { name: 'Germany', impressions: 7242, clicks: 105, leads: 79 },
            { name: 'Italy', impressions: 3095, clicks: 40, leads: 33 },
            { name: 'Israel', impressions: 3091, clicks: 63, leads: 46 },
            { name: 'Netherlands', impressions: 2473, clicks: 31, leads: 29 },
            { name: 'Canada', impressions: 4020, clicks: 40, leads: 30 },
            { name: 'UK', impressions: 2831, clicks: 43, leads: 31 },
        ],
        titles: [
            "Senior embedded software engineer", "Embedded developer", "Embedded design engineer",
            "Embedded software engineer", "Embedded system developer", "Senior embedded engineer",
            "Embedded system software engineer"
        ]
    },
    network: {
        id: 'network',
        title: "Network Engineer", // Renamed for display
        subtitle: "Hardware & Connectivity",
        color: "#06b6d4",
        kpi: {
            audience: 150000,
            spend: 2584,
            impressions: 14261,
            reach: 9084,
            clicks: 160,
            ctr: 1.12,
            leads: 25,
            cpl: 103.36,
        },
        geo: [
            { name: 'United States', impressions: 9511, clicks: 102, leads: 198 },
            { name: 'Germany', impressions: 421, clicks: 4, leads: 17 },
            { name: 'Italy', impressions: 708, clicks: 8, leads: 26 },
            { name: 'Israel', impressions: 266, clicks: 7, leads: 18 },
            { name: 'Netherlands', impressions: 582, clicks: 7, leads: 19 },
            { name: 'Canada', impressions: 955, clicks: 13, leads: 12 },
            { name: 'UK', impressions: 1809, clicks: 19, leads: 28 },
        ],
        titles: [
            "Network engineer", "Hardware networking specialist", "Hardware network engineer",
            "Senior network engineer", "Networking manager", "Director of networking"
        ]
    },
    infra: {
        id: 'infra',
        title: "Infrastructure Engineer", // Renamed for display
        subtitle: "IT & Architecture",
        color: "#ec4899",
        kpi: {
            audience: 57000,
            spend: 2382,
            impressions: 17375,
            reach: 10255,
            clicks: 150,
            ctr: 0.86,
            leads: 26,
            cpl: 91.62,
        },
        geo: [
            { name: 'United States', impressions: 6878, clicks: 78, leads: 111 },
            { name: 'Germany', impressions: 1079, clicks: 5, leads: 15 },
            { name: 'Italy', impressions: 1509, clicks: 10, leads: 25 },
            { name: 'Israel', impressions: 1390, clicks: 13, leads: 22 },
            { name: 'Netherlands', impressions: 1223, clicks: 4, leads: 17 },
            { name: 'Canada', impressions: 2453, clicks: 12, leads: 18 },
            { name: 'UK', impressions: 5663, clicks: 51, leads: 51 },
        ],
        titles: [
            "Infrastructure Manager", "IT Infrastructure Engineer", "Network Infrastructure Engineer",
            "Lead Infrastructure Engineer", "Manager Infrastructure Engineering", "Principal Infrastructure Engineer"
        ]
    }
};

// --- Components ---

const KPICard = ({ title, value, subtext, icon: Icon, colorClass }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 flex items-start justify-between hover:shadow-md transition-shadow">
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
        {Object.values(CAMPAIGN_DATA).map((segment) => (
            <button
                key={segment.id}
                onClick={() => onSelect(segment.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selected === segment.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
            >
                {segment.title}
            </button>
        ))}
    </div>
);

const ComparisonChart = ({ data }) => {
    // Transform object data to array for Recharts
    const chartData = Object.values(data).map(item => ({
        name: item.title.split(" ")[0], // Short name (Embedded, Network, Infra)
        Impressions: item.kpi.impressions,
        Clicks: item.kpi.clicks,
        Leads: item.kpi.leads * 10 // Scale for visibility
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
    <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={90} />
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

export default function JanuaryMarketingLeads() {
    const [selectedSegmentId, setSelectedSegmentId] = useState("embedded");

    // Calculate Aggregates for Overview
    const totalSpent = Object.values(CAMPAIGN_DATA).reduce((acc, curr) => acc + curr.kpi.spend, 0);
    const totalImpressions = Object.values(CAMPAIGN_DATA).reduce((acc, curr) => acc + curr.kpi.impressions, 0);
    const totalLeads = Object.values(CAMPAIGN_DATA).reduce((acc, curr) => acc + curr.kpi.leads, 0);
    const avgCPL = totalSpent / totalLeads;

    const currentData = CAMPAIGN_DATA[selectedSegmentId];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-4 md:p-8">

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                            <span>Marketing</span>
                            <ChevronRight size={14} />
                            <span>Campaigns</span>
                            <ChevronRight size={14} />
                            <span className="text-blue-600 font-medium">Q1 2025</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">January Leads Summary</h1>
                    </div>

                    <div className="flex gap-3 items-center">
                        <div className="hidden md:flex items-center gap-6 mr-4 border-r border-slate-200 pr-6">
                            <a href="#" className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                                <LayoutDashboard size={16} />
                                <span>Dashboard</span>
                            </a>
                            <Link to="/january-lead-intelligence" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium text-sm">
                                <Activity size={16} />
                                <span>Intelligence</span>
                            </Link>
                            <Link to="/january-mql" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium text-sm border-l pl-4 border-slate-200">
                                <TrendingUp size={16} />
                                <span>View MQL</span>
                            </Link>
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-sm flex items-center gap-2 text-slate-600">
                            <Calendar size={16} className="text-slate-400" />
                            <span>Jan 01 - Jan 31, 2025</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid gap-8">

                {/* Aggregate KPIs Row */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-indigo-500" /> Overall Performance
                        </h2>
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Consolidated View</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <KPICard
                            title="Total Spent"
                            value={`$${totalSpent.toLocaleString()}`}
                            subtext="Across 3 campaigns"
                            icon={DollarSign}
                            colorClass="bg-blue-500 text-blue-600"
                        />
                        <KPICard
                            title="Total Impressions"
                            value={(totalImpressions / 1000).toFixed(1) + 'k'}
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
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-semibold mb-2">Segment Comparison</h3>
                            <p className="text-sm text-slate-500 mb-6">Traffic volume vs. Lead conversion across engineering verticals.</p>
                            <ComparisonChart data={CAMPAIGN_DATA} />
                        </div>

                        {/* Segment Deep Dive */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Filter className="w-5 h-5 text-slate-400" /> Segment Details
                                </h3>
                                <SegmentSelector selected={selectedSegmentId} onSelect={setSelectedSegmentId} />
                            </div>

                            {/* Selected Segment KPIs */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide">Audience</p>
                                    <p className="text-xl font-bold text-slate-800">{currentData.kpi.audience.toLocaleString()}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide">CTR</p>
                                    <p className="text-xl font-bold text-slate-800">{currentData.kpi.ctr}%</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide">Unique Reach</p>
                                    <p className="text-xl font-bold text-slate-800">{currentData.kpi.reach.toLocaleString()}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide">CPL</p>
                                    <p className="text-xl font-bold text-slate-800">${currentData.kpi.cpl}</p>
                                </div>
                            </div>

                            {/* Geo Chart */}
                            <div className="mb-8">
                                <h4 className="text-md font-medium text-slate-700 mb-4 flex items-center gap-2">
                                    <Globe size={16} className="text-slate-400" /> Performance by Geography
                                </h4>
                                <GeoPerformanceChart data={currentData.geo} />
                            </div>

                            {/* Geo Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
                                        <tr>
                                            <th className="px-4 py-3 rounded-l-lg font-semibold">Country</th>
                                            <th className="px-4 py-3 font-semibold text-right">Impressions</th>
                                            <th className="px-4 py-3 font-semibold text-right">Clicks</th>
                                            <th className="px-4 py-3 rounded-r-lg font-semibold text-right">Leads</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {currentData.geo.map((geo, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-4 py-3 font-medium text-slate-700">{geo.name}</td>
                                                <td className="px-4 py-3 text-right text-slate-500">{geo.impressions.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-right text-slate-500">{geo.clicks}</td>
                                                <td className="px-4 py-3 text-right font-semibold">
                                                    <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs">
                                                        {geo.leads}
                                                    </span>
                                                </td>
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
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-slate-500" /> Targeted Titles
                            </h3>
                            <p className="text-sm text-slate-500 mb-4">
                                Primary job titles included in the <strong className="text-slate-700">{currentData.title}</strong> audience segment:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {currentData.titles.map((title, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200">
                                        {title}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Quick Insights */}
                        <div className="bg-indigo-900 p-6 rounded-xl shadow-lg text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-16 bg-white/5 rounded-full -mr-8 -mt-8 blur-2xl"></div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 relative z-10">
                                <TrendingUp className="w-5 h-5 text-indigo-300" /> Key Insights
                            </h3>
                            <ul className="space-y-5 text-sm text-indigo-100 relative z-10">
                                <li className="flex gap-3 items-start">
                                    <span className="bg-indigo-700/50 border border-indigo-600 w-6 h-6 flex items-center justify-center rounded-full shrink-0 text-xs font-bold mt-0.5">1</span>
                                    <p>
                                        <strong className="text-white block mb-1">Highest Engagement</strong>
                                        {currentData.title} shows a {currentData.kpi.ctr}% CTR, performing {currentData.kpi.ctr > 1.0 ? "above" : "within"} industry benchmarks.
                                    </p>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="bg-indigo-700/50 border border-indigo-600 w-6 h-6 flex items-center justify-center rounded-full shrink-0 text-xs font-bold mt-0.5">2</span>
                                    <p>
                                        <strong className="text-white block mb-1">Top Region</strong>
                                        The United States accounts for {((currentData.geo[0].impressions / currentData.kpi.impressions) * 100).toFixed(0)}% of total impressions this month.
                                    </p>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="bg-indigo-700/50 border border-indigo-600 w-6 h-6 flex items-center justify-center rounded-full shrink-0 text-xs font-bold mt-0.5">3</span>
                                    <p>
                                        <strong className="text-white block mb-1">Audience Reach</strong>
                                        Currently penetrating {((currentData.kpi.reach / currentData.kpi.audience) * 100).toFixed(1)}% of the total addressable market for this segment.
                                    </p>
                                </li>
                            </ul>

                            <button className="mt-6 w-full py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                                Download Full Report <ArrowUpRight size={14} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
