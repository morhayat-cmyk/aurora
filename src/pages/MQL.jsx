import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import {
    Users, CheckCircle, XCircle, TrendingUp, Filter, Search,
    ExternalLink, Building2, Award, Target, AlertCircle, Zap,
    ShieldCheck, HardHat, Cpu, Calendar, Globe, Award as Medal, Activity,
    Server, Network, Code, LayoutDashboard, PieChart as PieChartIcon
} from 'lucide-react';

// Data mapping based on the provided logs (31 Qualified out of 91 Total)
const rawData = [
    // Embedded Software Segment (MQLs)
    { campaign: 'Embedded Software', qualified: 1, name: 'Thomas Kötzner', company: 'SICK Sensor Intelligence', seniority: 'Specialist' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Reut Vaknin', company: 'Rogat Engineering', seniority: 'Engineer' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Manuel Malagon', company: 'AMETEK', seniority: 'Engineer' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Shay Ron', company: 'Maytronics', seniority: 'Lead' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Nagaraj Venkatapuram', company: 'Amazon', seniority: 'Lead' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Mohamed Shehab', company: 'Mallinckrodt Pharmaceuticals', seniority: 'Engineer' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Farzad Baghernezhad', company: 'magniX', seniority: 'Specialist' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Vigneswaran Karunanithi', company: 'ASML', seniority: 'Specialist' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Nagaraju J', company: 'Boston Scientific', seniority: 'Engineer' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Ehu Shubham Shaw', company: 'Lightmatter', seniority: 'Lead' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Anotida David Zimvumi', company: 'GE Aerospace', seniority: 'Engineer' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Elad Malka', company: 'TDK-Lambda Israel', seniority: 'Senior' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Grayham Grega', company: 'Industrial Scientific', seniority: 'Principal' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Dinesh Ravilla', company: 'ASML', seniority: 'Specialist' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Hamza EL MALKI', company: 'AVL Software', seniority: 'Safety Lead' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Abdi Tujuba', company: 'QinetiQ', seniority: 'Engineer' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Tal Gadasi', company: 'Enercon Technologies', seniority: 'Engineer' },
    { campaign: 'Embedded Software', qualified: 1, name: 'Shaik Saifulla', company: 'Pi Square Technologies', seniority: 'Director' },

    // Network Engineers Segment (MQLs)
    { campaign: 'Network Engineers', qualified: 1, name: 'Sujitha Sekar Rajan', company: 'Meta', seniority: 'Production Eng' },
    { campaign: 'Network Engineers', qualified: 1, name: 'Shubham Yadav', company: 'TCS', seniority: 'Architect' },
    { campaign: 'Network Engineers', qualified: 1, name: 'Nityambhu Sankar Bhuyan', company: 'Nokia', seniority: 'Specialist' },
    { campaign: 'Network Engineers', qualified: 1, name: 'Waqas Sardar', company: 'Hyundai AutoEver', seniority: 'Senior' },
    { campaign: 'Network Engineers', qualified: 1, name: 'Harshdipsinh Barad', company: 'Atlanticus', seniority: 'Engineer' },
    { campaign: 'Network Engineers', qualified: 1, name: 'Norton Azzolini', company: 'Fiserv', seniority: 'Architect' },
    { campaign: 'Network Engineers', qualified: 1, name: 'Jeffery Nyarko', company: 'Philips', seniority: 'Manager' },
    { campaign: 'Network Engineers', qualified: 1, name: 'William Rucker', company: 'Brightstar Lottery', seniority: 'Engineer' },

    // Infrastructure Engineers Segment (MQLs)
    { campaign: 'Infrastructure Engineers', qualified: 1, name: 'Finn Cost', company: 'Millennium Space Systems', seniority: 'Ground Eng' },
    { campaign: 'Infrastructure Engineers', qualified: 1, name: 'Roelant Wondergem', company: 'DHL Express', seniority: 'Senior Director' },
    { campaign: 'Infrastructure Engineers', qualified: 1, name: 'Kane Edupuganti', company: 'Cox Automotive Inc.', seniority: 'Team Lead' },
    { campaign: 'Infrastructure Engineers', qualified: 1, name: 'Keith Carter', company: 'Hive Financial Systems', seniority: 'Senior DevOps' },
    { campaign: 'Infrastructure Engineers', qualified: 1, name: 'David Haastrup', seniority: 'Specialist', company: 'Takem Inc.' },
];

const COLORS = ['#10b981', '#cbd5e1'];

const MQL = () => {
    const today = "18/12/2025";
    const totalLeads = 91;
    const qualifiedLeads = 31;
    const unqualifiedLeads = 60;
    const conversionRate = 34.1;

    const campaignStats = useMemo(() => [
        { name: 'Embedded Software', Qualified: 18, Unqualified: 19 },
        { name: 'Network Engineers', Qualified: 8, Unqualified: 22 },
        { name: 'Infrastructure Eng.', Qualified: 5, Unqualified: 19 }
    ], []);

    const pieData = [
        { name: 'Qualified (1)', value: qualifiedLeads },
        { name: 'Unqualified (0)', value: unqualifiedLeads }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
            <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">LinkedIn Campaign</span>
                            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Lead Intelligence Analysis</h1>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                            <Calendar size={14} />
                            <span>Final Report: {today}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center space-x-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-semibold">
                            <LayoutDashboard size={16} />
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/lead-intelligence" className="flex items-center space-x-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-semibold mr-4">
                            <Activity size={16} />
                            <span>Lead Intelligence</span>
                        </Link>
                        <Link to="/trio-leads" className="flex items-center space-x-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-semibold mr-4">
                            <PieChartIcon size={16} />
                            <span>Trio Leads</span>
                        </Link>
                        <div className="hidden lg:block text-right border-l pl-6 border-slate-200">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Targeting Context</p>
                            <p className="text-sm font-black text-slate-800 tracking-tighter">JOB TITLE ONLY</p>
                        </div>
                        <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-emerald-200">
                            <TrendingUp size={16} /> {conversionRate}% Quality Rate
                        </span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-8 py-8">

                {/* CEO STRATEGIC SUMMARY PANEL */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
                        <div className="absolute -right-10 -bottom-10 opacity-10">
                            <Activity size={240} />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-emerald-400">
                                <Target size={28} />
                                Strategic Insight Summary
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                                    <h4 className="text-blue-400 font-bold text-xs mb-1 uppercase tracking-widest">Inbound Authority</h4>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        By focusing on <strong>Job Title</strong>, we attracted elite active practitioners. 100% of MQLs are currently employed at high-tier technical organizations.
                                    </p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                                    <h4 className="text-emerald-400 font-bold text-xs mb-1 uppercase tracking-widest">Industry Density</h4>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        Qualified leads are manual-vetted from <strong>Global Leaders</strong> (Meta, ASML, DHL, GE). Our brand is successfully poaching from the best.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col group">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-all">
                                <Medal size={20} />
                            </div>
                            <h3 className="font-bold text-slate-800">Elite Credentials</h3>
                        </div>
                        <p className="text-sm text-slate-500 flex-grow leading-relaxed font-medium">
                            Targeted Job Titles yielded <strong>CCIE Architects, ISO 26262 Leads, and PhDs</strong>. This confirms our Title-First strategy filters for technical "Top 1%."
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col group">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                <Globe size={20} />
                            </div>
                            <h3 className="font-bold text-slate-800">Global Validation</h3>
                        </div>
                        <p className="text-sm text-slate-500 flex-grow leading-relaxed font-medium">
                            Outreach worked seamlessly across <strong>US, EU, and Israel</strong> labor markets. The technical titles used are globally standardized assets.
                        </p>
                    </div>
                </div>

                {/* CAMPAIGN SPECIFIC INTELLIGENCE - NEW SECTION */}
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4 pl-2">Segment Deep-Dive</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Embedded Insights */}
                    <div className="bg-white border-l-4 border-blue-500 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Code size={20} /></div>
                            <h4 className="font-black text-slate-800 uppercase text-xs tracking-wider">Embedded Software</h4>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex gap-2 text-xs leading-relaxed text-slate-600">
                                <span className="text-blue-500 font-bold tracking-tighter">01.</span>
                                <span><strong>Sector Validation:</strong> Highest conversion in <strong>Med-Tech and Aerospace</strong> (SICK, Boston Scientific, GE). High barriers to entry.</span>
                            </li>
                            <li className="flex gap-2 text-xs leading-relaxed text-slate-600">
                                <span className="text-blue-500 font-bold tracking-tighter">02.</span>
                                <span><strong>MQL Profile:</strong> Attracted specialized <strong>Firmware and Safety</strong> engineers. High-value IP territory.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Network Insights */}
                    <div className="bg-white border-l-4 border-emerald-500 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Network size={20} /></div>
                            <h4 className="font-black text-slate-800 uppercase text-xs tracking-wider">Network Engineers</h4>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex gap-2 text-xs leading-relaxed text-slate-600">
                                <span className="text-emerald-500 font-bold tracking-tighter">01.</span>
                                <span><strong>Enterprise Focus:</strong> Messaging resonates with <strong>Hyperscalers</strong> (Meta, Nokia, Hyundai). </span>
                            </li>
                            <li className="flex gap-2 text-xs leading-relaxed text-slate-600">
                                <span className="text-emerald-500 font-bold tracking-tighter">02.</span>
                                <span><strong>The "0" Factor:</strong> High disqualification volume due to <strong>SME/Freelance</strong> overlap. Requires stricter company size filters.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Infrastructure Insights */}
                    <div className="bg-white border-l-4 border-indigo-500 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Server size={20} /></div>
                            <h4 className="font-black text-slate-800 uppercase text-xs tracking-wider">Infrastructure Eng.</h4>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex gap-2 text-xs leading-relaxed text-slate-600">
                                <span className="text-indigo-500 font-bold tracking-tighter">01.</span>
                                <span><strong>Seniority Yield:</strong> Fewer leads but higher rank. Secured <strong>Senior Directors (DHL)</strong> and Team Leads.</span>
                            </li>
                            <li className="flex gap-2 text-xs leading-relaxed text-slate-600">
                                <span className="text-indigo-500 font-bold tracking-tighter">02.</span>
                                <span><strong>Strategic Skillset:</strong> High validation for <strong>Cloud & DevOps</strong> roles within legacy Logistics/Finance giants.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Charts & Table Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Recruitment Funnel Efficiency</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Status 1 (Qualified) vs. Status 0 (Discarded)</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Qualified</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Discarded</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={campaignStats} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="Qualified" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                                    <Bar dataKey="Unqualified" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
                        <h3 className="text-lg font-bold text-slate-800 mb-1">MQL Concentration</h3>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-6">31 MQLs / 91 Records</p>
                        <div className="flex-grow flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={95}
                                        paddingAngle={10}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-4xl font-black text-slate-800 tracking-tighter">31</span>
                                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Success (1)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Strategic Registry */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Verified MQL Registry</h3>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Confidential Report</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-50">
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Decision Maker</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Strategic Account</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Technical Domain</th>
                                    <th className="px-8 py-4 text-right pr-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">MQL Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {rawData.filter(l => l.qualified).slice(0, 12).map((lead, i) => (
                                    <tr key={i} className="hover:bg-slate-50/80 transition-all cursor-default group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold group-hover:bg-blue-600">
                                                    {lead.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <p className="text-xs font-bold text-slate-800">{lead.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-2">
                                                <Building2 size={12} className="text-slate-300" />
                                                <span className="text-xs font-semibold text-slate-600">{lead.company}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-black uppercase tracking-tight">
                                                {lead.campaign}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-right pr-12">
                                            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-black uppercase tracking-tighter ring-1 ring-emerald-200">Qualified</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>

            <footer className="max-w-7xl mx-auto px-8 py-8 border-t border-slate-200 text-center">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">LinkedIn Campaign Intelligence • {today} • Proprietary Data</p>
            </footer>
        </div>
    );
};

export default MQL;
