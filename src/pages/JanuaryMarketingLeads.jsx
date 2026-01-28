import React, { useState, useMemo } from 'react';
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
    MousePointer2,
    Activity,
    Target,
    Briefcase,
    Globe,
    TrendingUp,
    Layers,
    Wifi,
    Cpu
} from 'lucide-react';

// --- Data Configuration ---

const CAMPAIGN_DATA = {
    embedded: {
        title: "Embedded Campaign",
        icon: Cpu,
        color: "#8b5cf6", // Violet
        kpi: {
            audience: 28000,
            spend: 8696,
            impressions: 42535,
            reach: 8708,
            clicks: 548,
            ctr: 1.29,
            leads: 82,
            cpl: 106.05,
            reachPercentage: 20.47
        },
        geo: [
            { name: 'United States', impressions: 15050, clicks: 167, ctr: 1.11, leads: 123, openRate: 0.82 },
            { name: 'Germany', impressions: 7242, clicks: 105, ctr: 1.45, leads: 79, openRate: 1.09 },
            { name: 'Italy', impressions: 3095, clicks: 40, ctr: 1.29, leads: 33, openRate: 1.07 },
            { name: 'Israel', impressions: 3091, clicks: 63, ctr: 2.04, leads: 46, openRate: 1.49 },
            { name: 'Netherlands', impressions: 2473, clicks: 31, ctr: 1.25, leads: 29, openRate: 1.17 },
            { name: 'Canada', impressions: 4020, clicks: 40, ctr: 1.00, leads: 30, openRate: 0.75 },
            { name: 'UK', impressions: 2831, clicks: 43, ctr: 1.52, leads: 31, openRate: 1.10 },
        ],
        titles: [
            "Senior embedded software engineer", "Embedded developer", "Embedded design engineer",
            "Embedded software engineer", "Embedded system developer", "Senior embedded engineer",
            "Embedded system software engineer", "Senior embedded system engineer", "Embedded engineer", "Embedded system engineer"
        ]
    },
    network: {
        title: "Network Campaign",
        icon: Wifi,
        color: "#06b6d4", // Cyan
        kpi: {
            audience: 150000,
            spend: 2584,
            impressions: 14261,
            reach: 9084,
            clicks: 160,
            ctr: 1.12,
            leads: 25,
            cpl: 103.36,
            reachPercentage: 63.70
        },
        geo: [
            { name: 'United States', impressions: 9511, clicks: 102, ctr: 1.07, leads: 198, openRate: 1.16 },
            { name: 'Germany', impressions: 421, clicks: 4, ctr: 1.53, leads: 17, openRate: 1.31 }, // Note: Leads here likely refers to Lead Form Opens based on context, keeping label consistent
            { name: 'Italy', impressions: 708, clicks: 8, ctr: 1.13, leads: 26, openRate: 0.96 },
            { name: 'Israel', impressions: 266, clicks: 7, ctr: 2.63, leads: 18, openRate: 1.77 },
            { name: 'Netherlands', impressions: 582, clicks: 7, ctr: 1.20, leads: 19, openRate: 0.85 },
            { name: 'Canada', impressions: 955, clicks: 13, ctr: 1.36, leads: 12, openRate: 1.01 },
            { name: 'UK', impressions: 1809, clicks: 19, ctr: 1.05, leads: 28, openRate: 1.10 },
        ],
        titles: [
            "Network engineer", "Hardware networking specialist", "Hardware network engineer",
            "Senior network engineer", "Networking manager", "Director of networking"
        ]
    },
    infra: {
        title: "Infra Campaign",
        icon: Layers,
        color: "#ec4899", // Pink
        kpi: {
            audience: 57000,
            spend: 2382,
            impressions: 17375,
            reach: 10255,
            clicks: 150,
            ctr: 0.86,
            leads: 26,
            cpl: 91.62,
            reachPercentage: 59.02
        },
        geo: [
            { name: 'United States', impressions: 6878, clicks: 78, ctr: 1.13, leads: 111, openRate: 0.82 },
            { name: 'Germany', impressions: 1079, clicks: 5, ctr: 0.46, leads: 15, openRate: 0.36 },
            { name: 'Italy', impressions: 1509, clicks: 10, ctr: 0.66, leads: 25, openRate: 0.43 },
            { name: 'Israel', impressions: 1390, clicks: 13, ctr: 0.94, leads: 22, openRate: 0.51 },
            { name: 'Netherlands', impressions: 1223, clicks: 4, ctr: 0.33, leads: 17, openRate: 0.38 },
            { name: 'Canada', impressions: 2453, clicks: 12, ctr: 0.49, leads: 18, openRate: 0.74 },
            { name: 'UK', impressions: 5663, clicks: 51, ctr: 0.90, leads: 51, openRate: 0.63 },
        ],
        titles: [
            "Infrastructure Manager", "Information Technology Infrastructure Engineer", "Network Infrastructure Engineer",
            "Lead Infrastructure Engineer", "Manager Infrastructure Engineering", "Infrastructure System Engineer",
            "Principal Infrastructure Engineer", "Senior Lead Infrastructure Engineer", "Director of Infrastructure",
            "Infrastructure Engineer", "Head of Infrastructure", "Infrastructure Lead", "Senior Infrastructure Engineer"
        ]
    }
};

// --- Components ---

const StatCard = ({ label, value, subtext, prefix = "", suffix = "", icon: Icon, trend }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-600 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-slate-700/50 rounded-lg text-slate-300">
                {Icon && <Icon size={20} />}
            </div>
            {trend && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend === 'high' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                    {trend === 'high' ? 'High Perf.' : 'Steady'}
                </span>
            )}
        </div>
        <div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">{label}</h3>
            <div className="text-2xl font-bold text-white tracking-tight">
                {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
            </div>
            {subtext && <p className="text-xs text-slate-500 mt-2">{subtext}</p>}
        </div>
    </div>
);

const SectionHeader = ({ title, subtitle }) => (
    <div className="mb-6 mt-8">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <div className="h-6 w-1 bg-indigo-500 rounded-full"></div>
            {title}
        </h3>
        {subtitle && <p className="text-slate-400 text-sm ml-3 mt-1">{subtitle}</p>}
    </div>
);

const JanuaryMarketingLeads = () => {
    const [activeTab, setActiveTab] = useState('embedded');
    const data = CAMPAIGN_DATA[activeTab];

    // Calculate global totals for the header
    const totals = useMemo(() => {
        return Object.values(CAMPAIGN_DATA).reduce((acc, curr) => ({
            spend: acc.spend + curr.kpi.spend,
            leads: acc.leads + curr.kpi.leads,
            impressions: acc.impressions + curr.kpi.impressions
        }), { spend: 0, leads: 0, impressions: 0 });
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-indigo-500/30">

            {/* Top Navigation / Header */}
            <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <TrendingUp className="text-white" size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white tracking-tight">Aurora Labs</h1>
                                <p className="text-xs text-indigo-400 font-medium tracking-wider uppercase">Marketing Board Deck</p>
                            </div>
                        </div>

                        {/* Global Stats Summary (Small) */}
                        <div className="hidden md:flex gap-6 text-sm">
                            <div>
                                <span className="text-slate-500 block text-xs">Total Investment</span>
                                <span className="text-white font-semibold">${totals.spend.toLocaleString()}</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block text-xs">Total Impressions</span>
                                <span className="text-white font-semibold">{(totals.impressions / 1000).toFixed(1)}k</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block text-xs">Total Leads</span>
                                <span className="text-emerald-400 font-semibold">{totals.leads}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-2 mb-8 bg-slate-800/40 p-1 rounded-2xl border border-slate-700/50 w-full md:w-fit">
                    {Object.keys(CAMPAIGN_DATA).map((key) => {
                        const tabData = CAMPAIGN_DATA[key];
                        const Icon = tabData.icon;
                        const isActive = activeTab === key;
                        return (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                                        ? 'bg-slate-700 text-white shadow-md ring-1 ring-slate-600'
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                    }
                `}
                            >
                                <Icon size={16} className={isActive ? 'text-indigo-400' : ''} />
                                {tabData.title}
                            </button>
                        );
                    })}
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        label="Total Spend"
                        value={data.kpi.spend}
                        prefix="$"
                        icon={DollarSign}
                        subtext={`${(data.kpi.spend / data.kpi.leads).toFixed(0)} per lead avg`}
                    />
                    <StatCard
                        label="Leads Generated"
                        value={data.kpi.leads}
                        icon={Users}
                        trend="high"
                        subtext={`CPL: $${data.kpi.cpl}`}
                    />
                    <StatCard
                        label="Click Through Rate"
                        value={data.kpi.ctr}
                        suffix="%"
                        icon={MousePointer2}
                        subtext={`${data.kpi.clicks} Total Clicks`}
                    />
                    <StatCard
                        label="Total Impressions"
                        value={data.kpi.impressions}
                        icon={Activity}
                        subtext={`Reach: ${data.kpi.reach.toLocaleString()}`}
                    />
                </div>

                {/* Audience Reach Visual */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-white mb-6">Geo Performance (Impressions vs Clicks)</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.geo} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis yAxisId="left" orientation="left" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f8fafc' }}
                                        itemStyle={{ color: '#e2e8f0' }}
                                        cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                    />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="impressions" name="Impressions" fill={data.color} radius={[4, 4, 0, 0]} maxBarSize={50} />
                                    <Bar yAxisId="right" dataKey="clicks" name="Clicks" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col">
                        <h3 className="text-lg font-semibold text-white mb-2">Market Penetration</h3>
                        <p className="text-slate-400 text-sm mb-6">Percentage of targeted audience reached.</p>

                        <div className="flex-1 flex flex-col items-center justify-center relative">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Reached', value: data.kpi.reachPercentage },
                                            { name: 'Remaining', value: 100 - data.kpi.reachPercentage }
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        <Cell fill={data.color} />
                                        <Cell fill="#334155" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                <span className="text-3xl font-bold text-white">{data.kpi.reachPercentage}%</span>
                                <span className="text-xs text-slate-400 uppercase tracking-wide">Reached</span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Target size={16} className="text-slate-400" />
                                    <span className="text-sm text-slate-300">Total Audience Size</span>
                                </div>
                                <span className="text-white font-semibold">{data.kpi.audience.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Globe size={16} className="text-slate-400" />
                                    <span className="text-sm text-slate-300">Unique Reach</span>
                                </div>
                                <span className="text-white font-semibold">{data.kpi.reach.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Data Table */}
                <SectionHeader title="Geographic Breakdown" subtitle="Detailed metrics by targeted region" />
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden shadow-sm mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-700/75 bg-slate-900/50 text-xs uppercase tracking-wider text-slate-400">
                                    <th className="p-4 font-medium">Region</th>
                                    <th className="p-4 font-medium text-right">Impressions</th>
                                    <th className="p-4 font-medium text-right">Clicks</th>
                                    <th className="p-4 font-medium text-right">CTR</th>
                                    <th className="p-4 font-medium text-right">Lead Forms</th>
                                    <th className="p-4 font-medium text-right">Open Rate</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {data.geo.map((row, index) => (
                                    <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                        <td className="p-4 font-medium text-white flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }}></div>
                                            {row.name}
                                        </td>
                                        <td className="p-4 text-right text-slate-300">{row.impressions.toLocaleString()}</td>
                                        <td className="p-4 text-right text-slate-300">{row.clicks}</td>
                                        <td className="p-4 text-right">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${row.ctr > 1.2 ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 bg-slate-700/30'}`}>
                                                {row.ctr}%
                                            </span>
                                        </td>
                                        <td className="p-4 text-right text-white font-semibold">{row.leads}</td>
                                        <td className="p-4 text-right text-slate-400">{row.openRate}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Job Titles / Targeting */}
                <SectionHeader title="Targeted Roles" subtitle="Job titles actively engaged in this campaign" />
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-wrap gap-2">
                        {data.titles.map((title, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-700/50 text-slate-200 border border-slate-600 hover:border-indigo-500/50 hover:bg-slate-700 transition-colors cursor-default"
                            >
                                <Briefcase size={12} className="text-slate-400" />
                                {title}
                            </span>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default JanuaryMarketingLeads;
