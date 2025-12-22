import React, { useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import {
    Users, CheckCircle, XCircle, Building2, Briefcase, Info,
    Calendar, Filter, Download, TrendingUp, LayoutDashboard, Activity, PieChart as PieChartIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const rawData = [
    { date: 'Dec 18', category: 'Network Engineer', name: 'Alvin Abrams', email: 'aabrams@alvarezandmarsal.com', company: 'Alvarez & Marsal', comment: 'sent fr', isRelevant: true },
    { date: 'Dec 18', category: 'Embedded Software Engineer', name: 'Harald Walter', email: 'Harald.walter@thoughtworks.com', company: 'Thoughtworks', comment: 'sent fr', isRelevant: true },
    { date: 'Dec 18', category: 'Network Engineer', name: 'MALICK SAWADOGO', email: 'malicksawadogo2@gmail.com', company: 'Uber', comment: 'sent fr', isRelevant: true },
    { date: 'Dec 18', category: 'Embedded Software Engineer', name: 'Oleksandr Liginov', email: 'oleksandr.liginov@paragon.ag', company: 'paragon GmbH', comment: 'sent fr', isRelevant: true },
    { date: 'Dec 18', category: 'Embedded Software Engineer', name: 'Illia Antoniuk', email: 'illia.antoniuk@wenglor.com', company: 'wenglor sensoric group', comment: 'sent fr', isRelevant: true },
    { date: 'Dec 18', category: 'Network Engineer', name: 'Tofael Islam', email: 'tofaeli@gmail.com', company: 'Fixnetix Ltd', comment: 'sent fr', isRelevant: true },
    { date: 'Dec 18', category: 'Infrastructure Engineer', name: 'Amit Pancholia', email: 'apancholia@trinamix.com', company: 'Syntax', comment: 'sent fr', isRelevant: true },
    { date: 'Dec 19', category: 'Network Engineer', name: 'Andrew Yudin', email: 'andrew.yudin@cheetahdigital.com', company: 'Zeta Global', comment: 'sent - FR', isRelevant: true },
    { date: 'Dec 19', category: 'Network Engineer', name: 'Toshi Felton', email: 'tfelton_Consultant@canon.cusa.com', company: 'Canon USA', comment: 'sent - FR', isRelevant: true },
    { date: 'Dec 19', category: 'Infrastructure Engineer', name: 'Francesco Novi', email: 'francesco.novi@diogenesoftware.it', company: 'Freelance', comment: 'not relevnt - no company', isRelevant: false },
    { date: 'Dec 19', category: 'Infrastructure Engineer', name: 'Micah Akpabio', email: 'micahakpabio@raffiatech.co.uk', company: 'Raffia Tech', comment: 'not relevnt - small company', isRelevant: false },
    { date: 'Dec 19', category: 'Infrastructure Engineer', name: 'Mario Montero', email: 'mmontero@cloudteck.net', company: 'Banco de Crédito BCP', comment: 'sent - FR', isRelevant: true },
    { date: 'Dec 19', category: 'Infrastructure Engineer', name: 'Andy Carse', email: 'andy.carse@gmail.com', company: 'Carse I.T Services', comment: 'not relevnt - looking for job', isRelevant: false },
    { date: 'Dec 20', category: 'Embedded Software Engineer', name: 'Muhammad Junaid Aslam', email: 'junaid@neolsys.com', company: 'NeolSys', comment: 'not interested', isRelevant: false },
    { date: 'Dec 20', category: 'Network Engineer', name: 'Noah Wallach', email: 'noah-data@enabled.com', company: 'Net Enabled', comment: 'not relevnt - small company', isRelevant: false },
    { date: 'Dec 20', category: 'Infrastructure Engineer', name: 'Blerta Kaceli', email: 'Blerta.kaceli@ehmchealth.org', company: 'Englewood Hospital', comment: 'sent FR', isRelevant: true },
    { date: 'Dec 20', category: 'Embedded Software Engineer', name: 'Yazdan Haghi', email: 'yazdanhaghi1999@gmail.com', company: 'mbeder GmbH', comment: 'not relevnt - small company', isRelevant: false },
    { date: 'Dec 21', category: 'Embedded Software Engineer', name: 'Shahab Nikkhoo', email: 'shahabnikkhoo@gmail.com', company: 'FarmSense Inc.', comment: 'not relevnt - small company', isRelevant: false },
    { date: 'Dec 21', category: 'Network Engineer', name: 'Nishith Bhavsar', email: 'Nishith.Bhavsar@amd.com', company: 'AMD', comment: 'Sent FR', isRelevant: true },
    { date: 'Dec 21', category: 'Embedded Software Engineer', name: 'Weston Gavin', email: 'Weston.gavin@canyonaero.com', company: 'Canyon AeroConnect', comment: 'Sent FR', isRelevant: true },
    { date: 'Dec 21', category: 'Infrastructure Engineer', name: 'Madhu Aiyappen', email: 'maiyappen@cls-bank.com', company: 'CLS bank', comment: 'Not ICP - Banks', isRelevant: false },
];

const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6'];

const LeadIntelligence = () => {
    const stats = useMemo(() => {
        const total = rawData.length;
        const relevant = rawData.filter(d => d.isRelevant).length;
        const irrelevant = total - relevant;
        const relevanceRate = ((relevant / total) * 100).toFixed(1);

        // Grouping by Date for Trend Chart
        const dateMap = rawData.reduce((acc, curr) => {
            acc[curr.date] = (acc[curr.date] || 0) + 1;
            return acc;
        }, {});

        const trendData = Object.keys(dateMap).map(date => ({
            date,
            count: dateMap[date]
        })).sort((a, b) => new Date(a.date + ', 2025') - new Date(b.date + ', 2025'));

        const roles = rawData.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + 1;
            return acc;
        }, {});

        const chartData = Object.keys(roles).map(role => ({
            name: role,
            value: roles[role]
        }));

        const statusData = [
            { name: 'Relevant', value: relevant },
            { name: 'Not Relevant', value: irrelevant }
        ];

        return { total, relevant, irrelevant, relevanceRate, chartData, statusData, trendData };
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Lead Intelligence Dashboard</h1>
                    <div className="flex items-center gap-4 mt-2">
                        <p className="text-slate-500 flex items-center gap-2 text-sm">
                            <Briefcase size={16} /> Campaign: Tech Solutions
                        </p>
                        <span className="h-4 w-px bg-slate-300"></span>
                        <p className="text-indigo-600 flex items-center gap-2 text-sm font-semibold">
                            <Calendar size={16} /> Dec 18 - Dec 21, 2025
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link to="/" className="bg-white border border-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm text-slate-600">
                        <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                        <Filter size={18} /> Filter
                    </button>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                        <Download size={18} /> Export Data
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</p>
                            <h3 className="text-2xl font-bold">{stats.total}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Relevant</p>
                            <h3 className="text-2xl font-bold">{stats.relevant}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                            <XCircle size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Discarded</p>
                            <h3 className="text-2xl font-bold">{stats.irrelevant}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Relevance Rate</p>
                            <h3 className="text-2xl font-bold">{stats.relevanceRate}%</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Level Date Trend */}
            <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <TrendingUp size={20} className="text-indigo-500" /> Daily Lead Volume Trend
                    </h2>
                    <span className="text-xs font-medium text-slate-400">Past 4 Days Activity</span>
                </div>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats.trendData}>
                            <defs>
                                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Briefcase className="text-slate-400" size={20} /> Distribution by Job Function
                    </h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.chartData} layout="vertical" margin={{ left: 40, right: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <CheckCircle className="text-slate-400" size={20} /> Lead Quality Breakdown
                    </h2>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {stats.statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <h2 className="text-lg font-bold">Detailed Lead Log</h2>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-mono uppercase tracking-tighter italic">Aggregated Dec 2025</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Lead / Company</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Job Category</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Result</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Relevant</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rawData.map((lead, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">{lead.date}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-900">{lead.name}</div>
                                        <div className="text-xs text-indigo-600 font-medium">{lead.company}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-medium text-slate-600">
                                            {lead.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500 italic max-w-xs truncate">
                                        {lead.comment}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {lead.isRelevant ? (
                                            <CheckCircle className="inline text-emerald-500" size={18} />
                                        ) : (
                                            <XCircle className="inline text-red-400" size={18} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LeadIntelligence;
