import React from 'react';
import {
    Globe,
    Cpu,
    Server,
    ArrowUpRight,
    Linkedin,
    Activity,
    Briefcase,
    MapPin,
    ChevronRight,
    TrendingUp,
    Award
} from 'lucide-react';

const App = () => {
    // Verified "Yes" Leads Data - High Resolution
    const stats = {
        totalQualified: 93,
        totalMQL: 168,
        conversionRate: 55.3,
        period: "Q4 2025",
        targetRegions: ["US", "UK", "IL"]
    };

    const campaigns = [
        {
            id: 1,
            name: 'Network Solutions',
            qualified: 29,
            mql: 54,
            rate: '53.7%',
            status: 'High Growth',
            accounts: ['Meta', 'Nokia', 'Micron'],
            icon: Globe
        },
        {
            id: 2,
            name: 'Embedded Systems',
            qualified: 33,
            mql: 68,
            rate: '48.5%',
            status: 'Volume Leader',
            accounts: ['ASML', 'Honeywell', 'GE'],
            icon: Cpu
        },
        {
            id: 3,
            name: 'Cloud Infrastructure',
            qualified: 31,
            mql: 46,
            rate: '67.4%',
            status: 'Peak Efficiency',
            accounts: ['Microsoft', 'Boeing', 'BoA'],
            icon: Server
        },
    ];

    const highValueLeads = [
        { name: "Sujitha Sekar Rajan", company: "Meta", role: "Network Engineer", region: "US", date: "Dec 04" },
        { name: "Mohammed Abda", company: "Microsoft", role: "Infra Architect", region: "US", date: "Dec 24" },
        { name: "Vigneswaran Karunanithi", company: "ASML", role: "Lead Engineer", region: "EU", date: "Dec 11" },
        { name: "Nagaraj Venkatapuram", company: "Amazon", role: "Embedded Dev", region: "US", date: "Dec 08" },
        { name: "Finn Cost", company: "Boeing", role: "Millennium Space", region: "US", date: "Dec 05" },
        { name: "Rama Krishna Velpuri", company: "Honeywell", role: "Embedded Systems", region: "US", date: "Dec 22" },
        { name: "Anotida David Zimvumi", company: "GE Aerospace", role: "Embedded Dev", region: "UK", date: "Dec 15" },
        { name: "Rassul Ismailov", company: "Meta", role: "Network Engineer", region: "IL", date: "Dec 09" },
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
            {/* Top Thin Nav */}
            <nav className="border-b border-slate-100 px-8 py-4 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-6">
                    <span className="text-sm font-bold tracking-tighter border-r border-slate-200 pr-6 uppercase">Lead Intel v2.0</span>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Linkedin className="w-3 h-3 fill-current text-[#0077b5]" />
                        LinkedIn Acquisition Active
                    </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live System</span>
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-md text-[11px] font-bold hover:bg-slate-800 transition-all uppercase tracking-wider">Generate PDF</button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-8 py-12">
                {/* Header Section */}
                <header className="mb-16">
                    <h1 className="text-5xl font-light tracking-tight text-slate-900 mb-2">Executive Overview</h1>
                    <p className="text-slate-500 text-lg">Detailed performance audit for the <span className="text-indigo-600 font-medium">{stats.totalQualified} verified accounts</span> acquired in December.</p>
                </header>

                {/* Hero KPI Grid */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-px bg-slate-100 border border-slate-100 rounded-xl overflow-hidden mb-16 shadow-2xl shadow-slate-100">
                    <KPICell title="Qualified Growth" value={stats.totalQualified} label="Verified YES Signals" trend="+18.4%" />
                    <KPICell title="MQL Throughput" value={stats.totalMQL} label="Gross Leads Generated" trend="+5.2%" />
                    <KPICell title="Conversion" value={`${stats.conversionRate}%`} label="Qualification Efficiency" />
                    <KPICell title="Target Regions" value={stats.targetRegions.length} label="US, UK, Israel Concentration" />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Campaigns */}
                    <div className="lg:col-span-8 space-y-16">
                        <section>
                            <div className="flex items-end justify-between mb-8">
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Campaign Performance</h2>
                                <span className="text-xs font-medium text-slate-400">Sorted by Volume</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {campaigns.map((c) => (
                                    <CampaignCard key={c.id} {...c} />
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="flex items-end justify-between mb-8">
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">High-Value Account Log</h2>
                                <button className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:underline">View All Leads <ChevronRight className="w-3 h-3" /></button>
                            </div>
                            <div className="border border-slate-100 rounded-xl overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100">
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prospect</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Organization</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Vertical</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Verification</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {highValueLeads.map((lead, i) => (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors cursor-default group">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-bold text-slate-900 leading-tight">{lead.name}</div>
                                                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">{lead.role}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-semibold text-slate-700">{lead.company}</span>
                                                        <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-bold uppercase">{lead.region}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <Activity className="w-4 h-4 text-slate-300 mx-auto" />
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded">Qualified</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Strategic Insights */}
                    <div className="lg:col-span-4 space-y-12">
                        <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-indigo-600" /> Strategic Insights
                            </h3>
                            <div className="space-y-10">
                                <InsightItem
                                    title="Embedded Resilience"
                                    content="Industrial sector leads (ASML, GE) represent 35% of the 'Yes' pool, showing our strongest product-market fit."
                                />
                                <InsightItem
                                    title="Network Penetration"
                                    content="Meta and Nokia multi-person interest suggests a strategic shift toward infrastructure scaling solutions."
                                />
                                <InsightItem
                                    title="Regional Dominance"
                                    content="70% of high-value qualified leads are US-based, despite international campaign visibility."
                                />
                            </div>
                        </section>

                        <section className="px-8">
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Vertical Quality</h3>
                            <div className="space-y-6">
                                <VerticalBar label="Enterprise Tier 1" percentage={65} />
                                <VerticalBar label="Mid-Market Growth" percentage={28} />
                                <VerticalBar label="R&D / Academic" percentage={7} />
                            </div>
                        </section>

                        <div className="p-8 border border-indigo-100 bg-indigo-50/30 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Award className="w-4 h-4 text-indigo-600" />
                                </div>
                                <span className="text-xs font-bold text-indigo-900 uppercase tracking-widest">CEO Action Item</span>
                            </div>
                            <p className="text-sm text-indigo-900/70 leading-relaxed font-medium">
                                Increase December budget for <span className="font-bold text-indigo-900">Cloud Infrastructure</span>. The 67% conversion efficiency indicates a highly receptive market segment for early 2026.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- Minimalist Components ---

const KPICell = ({ title, value, label, trend }) => (
    <div className="bg-white p-8">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{title}</h3>
            {trend && <span className="text-[10px] font-black text-emerald-600 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> {trend}</span>}
        </div>
        <div className="text-4xl font-light text-slate-900 tracking-tighter mb-1">{value}</div>
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
    </div>
);

const CampaignCard = ({ name, qualified, mql, rate, status, icon: Icon }) => (
    <div className="group cursor-default">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <Icon className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">{name}</span>
        </div>
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <div>
                    <div className="text-3xl font-light text-slate-900 tracking-tighter">{qualified}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Qualified Leads</div>
                </div>
                <div className="text-right">
                    <div className="text-xs font-bold text-slate-900">{rate}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Rate</div>
                </div>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: rate }}></div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{status}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{mql} MQLs</span>
            </div>
        </div>
    </div>
);

const InsightItem = ({ title, content }) => (
    <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-indigo-600 before:rounded-full">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-2">{title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">{content}</p>
    </div>
);

const VerticalBar = ({ label, percentage }) => (
    <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
            <span className="text-slate-400">{label}</span>
            <span className="text-slate-900">{percentage}%</span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-slate-900 h-full rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);

export default App;
