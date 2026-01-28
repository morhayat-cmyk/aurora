import React, { useMemo } from 'react';
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
import { Link } from 'react-router-dom';

// Qualified Leads Data (Filtered from Lead Intelligence where isRelevant = true)
const qualifiedLeads = [
    // Embedded / Software Segment
    { campaign: 'Embedded Software', name: 'Salvatore Arlia', company: 'SITAEL', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Jakub Szypicyn', company: 'Minimal', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Mehmet Mercan', company: 'Purdue Electric Racing', seniority: 'Student/Eng' },
    { campaign: 'Embedded Software', name: 'Saismitha Chandrasekar', company: 'Honeywell', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Sritam Paltasingh', company: 'Berlin Space Tech', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Jaspartap Goomer', company: 'Ontario Tech Univ', seniority: 'Auto Eng' },
    { campaign: 'Embedded Software', name: 'Payal Dave', company: 'TWD Technologies', seniority: 'Manager' },
    { campaign: 'Embedded Software', name: 'Gabriele Fium', company: 'Leonardo', seniority: 'Sys Engineer' },
    { campaign: 'Embedded Software', name: 'Dong H. Ahn', company: 'NVIDIA', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Amy Pattana', company: 'Canonical', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Murali K', company: 'Stellantis', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Jeremiah Abe', company: 'JSoft Digital', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Diego Mincarelli', company: 'Stellantis', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Carlos Tronco', company: 'Dell Technologies', seniority: 'Sys Engineer' },
    { campaign: 'Embedded Software', name: 'Dima Baranov', company: 'Elbit Systems', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Siva Satish Kumar Lavu', company: 'Qentelli', seniority: 'QA Engineer' },
    { campaign: 'Embedded Software', name: 'Amit Singh', company: 'AAM', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Somanath Rudrakshala', company: 'Capgemini', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Yael Arbiv', company: 'Intel Corporation', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Srinidhi K', company: 'Caterpillar Inc.', seniority: 'Embedded Eng' },
    { campaign: 'Embedded Software', name: 'Dave Wildman', company: 'Bloomberg', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Eden Gender', company: 'Texas Instruments', seniority: 'Embedded Eng' },
    { campaign: 'Embedded Software', name: 'Siva Krishna R', company: 'Stryker', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Kartik y', company: 'Stellantis', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Madhav Shashank', company: 'Urban Mobility Sys', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Chintamani Sagade', company: 'FERCHAU', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Purva Limbachiya', company: 'Honeywell', seniority: 'Embedded Eng' },
    { campaign: 'Embedded Software', name: 'Hongfei Cheng', company: 'Stealth Startup', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Muhammet YILDIZ', company: 'Hum', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Bradley Nelson', company: 'Infineon Tech', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Zohar Hadad', company: 'Ramon.Space', seniority: 'Embedded Eng' },
    { campaign: 'Embedded Software', name: 'Atharva Anil Gabhe', company: 'Ingenics Digital', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Alex Klionsky', company: 'Radomatics LTD', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Himeel Shah', company: 'Lucid Motors', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Aiman Abed', company: 'Flomad Labs', seniority: 'Engineer' },
    { campaign: 'Embedded Software', name: 'Aviral K', company: 'ANGOKA', seniority: 'Security Eng' },
    { campaign: 'Embedded Software', name: 'Rajath Shivananda', company: 'Cisco', seniority: 'Engineer' },

    // Infrastructure & Network (Selected Qualified from List)
    { campaign: 'Infrastructure', name: 'Walter Flores', company: 'Spireon', seniority: 'IT Pro' },
    { campaign: 'Infrastructure', name: 'Ryan Boorman', company: 'AT&T', seniority: 'IT Pro' },
    { campaign: 'Infrastructure', name: 'Manuel Wild', company: 'MBDA Deutschland', seniority: 'Engineer' },
    { campaign: 'Infrastructure', name: 'Robert König', company: 'autec gmbh', seniority: 'Engineer' },
    { campaign: 'Infrastructure', name: 'Simone Coppola', company: 'Kineton', seniority: 'Engineer' },
];

const COLORS = ['#10b981', '#cbd5e1'];

const JanuaryMQL = () => {
    const today = "28/01/2026";
    const totalLeads = 136;
    const qualifiedCount = 92;
    const unqualifiedCount = 44;
    const conversionRate = 67.6;

    // Derived from the "Analysis Summary" in prompt
    const campaignStats = useMemo(() => [
        { name: 'Embedded Software', Qualified: 75, Unqualified: 20 },
        { name: 'Network Engineers', Qualified: 5, Unqualified: 12 },
        { name: 'Infrastructure Eng.', Qualified: 12, Unqualified: 12 }
    ], []);

    const pieData = [
        { name: 'Qualified (Yes)', value: qualifiedCount },
        { name: 'Unqualified (No)', value: unqualifiedCount }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
            <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">LinkedIn Campaign</span>
                            <h1 className="text-xl font-bold text-slate-800 tracking-tight">MQL Intelligence Analysis</h1>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                            <Calendar size={14} />
                            <span>Report Date: {today}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center space-x-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-semibold">
                            <LayoutDashboard size={16} />
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/january-lead-intelligence" className="flex items-center space-x-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-semibold mr-4">
                            <Activity size={16} />
                            <span>Lead Intelligence</span>
                        </Link>
                        <div className="hidden lg:block text-right border-l pl-6 border-slate-200">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Targeting Context</p>
                            <p className="text-sm font-black text-slate-800 tracking-tighter">JOB TITLE + INDUSTRY</p>
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
                                    <h4 className="text-blue-400 font-bold text-xs mb-1 uppercase tracking-widest">Industry Penetration</h4>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        Strong presence in <strong>Automotive</strong> (Stellantis, GM, Lucid) and <strong>Semiconductors</strong> (NVIDIA, Intel, Infineon).
                                    </p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                                    <h4 className="text-emerald-400 font-bold text-xs mb-1 uppercase tracking-widest">Product Fit</h4>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        92 Qualified contacts work in performance-critical domains (Embedded/IoT/AI) where LOCI's execution reasoning adds high value.
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
                            <h3 className="font-bold text-slate-800">Global Leaders</h3>
                        </div>
                        <p className="text-sm text-slate-500 flex-grow leading-relaxed font-medium">
                            Successfully attracted engineering talent from market giants like <strong>Meta, Cisco, Bosch, and Honeywell</strong>.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col group">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                <Globe size={20} />
                            </div>
                            <h3 className="font-bold text-slate-800">Role Density</h3>
                        </div>
                        <p className="text-sm text-slate-500 flex-grow leading-relaxed font-medium">
                            The majority of MQLs are <strong>Software & Embedded Engineers</strong>, aligning perfectly with the technical user persona.
                        </p>
                    </div>
                </div>

                {/* CAMPAIGN SPECIFIC INTELLIGENCE */}
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
                                <span><strong>Highest Volume:</strong> Dominates the qualified pool with contacts from <strong>Stellantis, Intel, and Texas Instruments</strong>.</span>
                            </li>
                            <li className="flex gap-2 text-xs leading-relaxed text-slate-600">
                                <span className="text-blue-500 font-bold tracking-tighter">02.</span>
                                <span><strong>High Intent:</strong> Engineers in this sector showed highest engagement with technical content regarding CPU/GPU optimization.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Network Insights */}
                    <div className="bg-white border-l-4 border-emerald-500 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Network size={20} /></div>
                            <h4 className="font-black text-slate-800 uppercase text-xs tracking-wider">Automotive & Robotics</h4>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex gap-2 text-xs leading-relaxed text-slate-600">
                                <span className="text-emerald-500 font-bold tracking-tighter">01.</span>
                                <span><strong>Emerging Sector:</strong> Significant traction in EV and Autonomous Driving sectors (Lucid Motors, PlusAI, Canoo).</span>
                            </li>
                            <li className="flex gap-2 text-xs leading-relaxed text-slate-600">
                                <span className="text-emerald-500 font-bold tracking-tighter">02.</span>
                                <span><strong>Critical Systems:</strong> Leads are working on safety-critical systems where LOCI's validation is essential.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Infrastructure Insights */}
                    <div className="bg-white border-l-4 border-indigo-500 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Server size={20} /></div>
                            <h4 className="font-black text-slate-800 uppercase text-xs tracking-wider">Infrastructure & IT</h4>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex gap-2 text-xs leading-relaxed text-slate-600">
                                <span className="text-indigo-500 font-bold tracking-tighter">01.</span>
                                <span><strong>Filtered Quality:</strong> While volume is lower, we qualified high-value leads from <strong>AT&T and Spireon</strong>.</span>
                            </li>
                            <li className="flex gap-2 text-xs leading-relaxed text-slate-600">
                                <span className="text-indigo-500 font-bold tracking-tighter">02.</span>
                                <span><strong>Noise Reduction:</strong> Effectively discarded non-target leads from small consultancies to focus on Enterprise IT.</span>
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
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-6">92 MQLs / 136 Records</p>
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
                                <span className="text-4xl font-black text-slate-800 tracking-tighter">92</span>
                                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Success (Yes)</span>
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
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role Type</th>
                                    <th className="px-8 py-4 text-right pr-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">MQL Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {qualifiedLeads.map((lead, i) => (
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
                                                {lead.seniority}
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

export default JanuaryMQL;
