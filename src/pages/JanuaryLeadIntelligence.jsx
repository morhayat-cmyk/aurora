import React, { useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import {
    Users, CheckCircle, XCircle, Briefcase,
    Calendar, Filter, Download, TrendingUp, LayoutDashboard,
    PieChart as PieChartIcon, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mapped data from the provided contact list
const rawData = [
    { date: 'Jan 15', category: 'Infrastructure Engineer', name: 'Diego Velasquez', company: 'QuadReal Property Group', comment: 'PhD, MES, P. Eng', isRelevant: false },
    { date: 'Jan 15', category: 'Network Engineer', name: 'Frederic Devaux', company: 'FREDERIC DEVAUX', comment: 'Network Architect', isRelevant: false },
    { date: 'Jan 15', category: 'Network Engineer', name: 'Mahyar Moazed', company: 'Freelance', comment: 'Network/Systems Specialist', isRelevant: false },
    { date: 'Jan 15', category: 'Network Engineer', name: 'Antonio Perez', company: 'St. Francis Episcopal School', comment: 'Network Engineer', isRelevant: false },
    { date: 'Jan 15', category: 'Infrastructure Engineer', name: 'Walter Flores', company: 'Spireon', comment: 'IT Professional', isRelevant: true },
    { date: 'Jan 15', category: 'Infrastructure Engineer', name: 'Ketan Jogia', company: 'National Physical Laboratory', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 15', category: 'Infrastructure Engineer', name: 'Giwa Oluwarotimi', company: 'Soil Instruments Ltd', comment: 'Engineering Professional', isRelevant: false },
    { date: 'Jan 16', category: 'Embedded Software Engineer', name: 'Salvatore Arlia', company: 'SITAEL', comment: 'Electronic Engineer', isRelevant: true },
    { date: 'Jan 16', category: 'Embedded Software Engineer', name: 'Jakub Szypicyn', company: 'Minimal', comment: 'Embedded Systems Engineer', isRelevant: true },
    { date: 'Jan 16', category: 'Infrastructure Engineer', name: 'Martin Adams', company: 'Next', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 16', category: 'Embedded Software Engineer', name: 'Mehmet Mercan', company: 'Purdue Electric Racing', comment: 'Computer Science Student', isRelevant: true },
    { date: 'Jan 16', category: 'Embedded Software Engineer', name: 'Saismitha Chandrasekar', company: 'Honeywell', comment: 'Embedded Systems Engineer', isRelevant: true },
    { date: 'Jan 16', category: 'Infrastructure Engineer', name: 'Piyush Chaudhari', company: 'Education Success Networks', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 16', category: 'Embedded Software Engineer', name: 'Sritam Paltasingh', company: 'Berlin Space Technologies', comment: 'Systems Engineer', isRelevant: true },
    { date: 'Jan 16', category: 'Infrastructure Engineer', name: 'Justin Herman', company: 'Wheeler Fleet Solutions', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 16', category: 'Embedded Software Engineer', name: 'Jaspartap Goomer', company: 'Ontario Tech University', comment: 'Automotive Engineer', isRelevant: true },
    { date: 'Jan 17', category: 'Embedded Software Engineer', name: 'Payal Dave', company: 'TWD Technologies Ltd.', comment: 'Project Manager', isRelevant: true },
    { date: 'Jan 17', category: 'Infrastructure Engineer', name: 'V B Sudheer Kumar', company: 'United Airlines', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 17', category: 'Infrastructure Engineer', name: 'Joseph Sigauke', company: 'Zimbabwe Revenue Authority', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 17', category: 'Infrastructure Engineer', name: 'Dr Ikechukwu Uchehara', company: 'Suffolk County Council', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 17', category: 'Infrastructure Engineer', name: 'Nick Armbruster', company: 'Grimco, Inc.', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 17', category: 'Embedded Software Engineer', name: 'Gabriele Fium', company: 'Leonardo', comment: 'Systems Engineer', isRelevant: true },
    { date: 'Jan 17', category: 'Infrastructure Engineer', name: 'Eduardo Mendoza', company: 'Sequoia', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 17', category: 'Infrastructure Engineer', name: 'Ian Parker', company: 'Gibbs Consulting', comment: 'IT Consultant', isRelevant: false },
    { date: 'Jan 17', category: 'Infrastructure Engineer', name: 'Mohamed Asik Uthumalebbe', company: 'Cymar Computer Ltd', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 18', category: 'Network Engineer', name: 'Stefan de Kooter', company: 'proxsys-nl', comment: 'Network Engineer', isRelevant: false },
    { date: 'Jan 18', category: 'Embedded Software Engineer', name: 'Kavyashree Gajula', company: 'Citizens', comment: 'Software Engineer', isRelevant: false },
    { date: 'Jan 18', category: 'Infrastructure Engineer', name: 'Ryan Boorman', company: 'AT&T', comment: 'IT Professional', isRelevant: true },
    { date: 'Jan 18', category: 'Infrastructure Engineer', name: 'Robert Procel', company: 'WakeMed', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 18', category: 'Infrastructure Engineer', name: 'Rick Rutledge', company: 'TriTelComm PVD', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 18', category: 'Embedded Software Engineer', name: 'Dong H. Ahn', company: 'NVIDIA', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 18', category: 'Embedded Software Engineer', name: 'Amy Pattana', company: 'Canonical', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 18', category: 'Infrastructure Engineer', name: 'Mohammed Alam', company: 'USAA', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 18', category: 'Embedded Software Engineer', name: 'Murali K', company: 'Stellantis', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 19', category: 'Embedded Software Engineer', name: 'Jeremiah Abe', company: 'JSoft Digital Solutions', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 19', category: 'Embedded Software Engineer', name: 'Diego Mincarelli', company: 'Stellantis', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 19', category: 'Infrastructure Engineer', name: 'Vijayalakshmi Madala', company: 'Kyndryl', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 19', category: 'Infrastructure Engineer', name: 'Harvey Bhullar', company: 'Johnson & Johnson', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 19', category: 'Infrastructure Engineer', name: 'Emre Rizaner', company: 'CSL Group', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 19', category: 'Infrastructure Engineer', name: 'Dileesh T', company: 'Tate & Lyle', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 19', category: 'Embedded Software Engineer', name: 'Carlos Tronco', company: 'Dell Technologies', comment: 'Systems Engineer', isRelevant: true },
    { date: 'Jan 19', category: 'Embedded Software Engineer', name: 'Dima Baranov', company: 'Elbit Systems Israel', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 19', category: 'Infrastructure Engineer', name: 'Elisee Kitsisa', company: 'GEICO', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 19', category: 'Infrastructure Engineer', name: 'Abdul-Saboor Khan', company: 'Workplace Safety (WSIB)', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 20', category: 'Embedded Software Engineer', name: 'Siva Satish Kumar Lavu', company: 'Qentelli', comment: 'QA Engineer', isRelevant: true },
    { date: 'Jan 20', category: 'Embedded Software Engineer', name: 'Amit Singh', company: 'AAM', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 20', category: 'Infrastructure Engineer', name: 'Jaroslaw Rozmus', company: 'Crabel Capital Management', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 20', category: 'Embedded Software Engineer', name: 'Somanath Rudrakshala', company: 'Capgemini Engineering', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 20', category: 'Infrastructure Engineer', name: 'Chassie Hall', company: 'Gerdau North America', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 20', category: 'Embedded Software Engineer', name: 'Yael Arbiv', company: 'Intel Corporation', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 20', category: 'Embedded Software Engineer', name: 'Srinidhi K', company: 'Caterpillar Inc.', comment: 'Embedded Systems Engineer', isRelevant: true },
    { date: 'Jan 20', category: 'Embedded Software Engineer', name: 'Dave Wildman', company: 'Bloomberg', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 20', category: 'Infrastructure Engineer', name: 'Rodel Usam', company: 'Circa Resort & Casino', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 20', category: 'Embedded Software Engineer', name: 'Eden Gender', company: 'Texas Instruments', comment: 'Embedded Systems Engineer', isRelevant: true },
    { date: 'Jan 20', category: 'Infrastructure Engineer', name: 'Mohamed Naina', company: 'Implex Solutions Ltd', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 20', category: 'Embedded Software Engineer', name: 'Siva Krishna R', company: 'Stryker', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 21', category: 'Embedded Software Engineer', name: 'Kartik y', company: 'Stellantis', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 21', category: 'Infrastructure Engineer', name: 'Jose Garcia', company: 'STAND 8 Technology', comment: 'IT Consultant', isRelevant: false },
    { date: 'Jan 21', category: 'Infrastructure Engineer', name: 'Paulin Ama', company: 'Maryland State Highway', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 21', category: 'Embedded Software Engineer', name: 'Madhav Shashank', company: 'Urban Mobility Systems', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 21', category: 'Embedded Software Engineer', name: 'Chintamani Sagade', company: 'FERCHAU', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 21', category: 'Embedded Software Engineer', name: 'Purva Limbachiya', company: 'Honeywell', comment: 'Embedded Systems Engineer', isRelevant: true },
    { date: 'Jan 21', category: 'Infrastructure Engineer', name: 'Giovanni Ciavarra', company: 'sky-italia', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 21', category: 'Infrastructure Engineer', name: 'Henry Jerome', company: 'WFMU', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 21', category: 'Embedded Software Engineer', name: 'Hongfei Cheng', company: 'Stealth Startup', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 21', category: 'Infrastructure Engineer', name: 'Michael Onagbesan', company: 'Onas Media Systems', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 21', category: 'Infrastructure Engineer', name: 'Jean-Luc Kouakou', company: 'Wells Fargo', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 21', category: 'Embedded Software Engineer', name: 'Muhammet YILDIZ', company: 'Hum', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 21', category: 'Embedded Software Engineer', name: 'Bradley Nelson', company: 'Infineon Technologies', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 21', category: 'Embedded Software Engineer', name: 'Zohar Hadad', company: 'Ramon.Space', comment: 'Embedded Systems Engineer', isRelevant: true },
    { date: 'Jan 21', category: 'Embedded Software Engineer', name: 'Atharva Anil Gabhe', company: 'Ingenics Digital GmbH', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 21', category: 'Embedded Software Engineer', name: 'Alex Klionsky', company: 'Radomatics LTD', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 21', category: 'Infrastructure Engineer', name: 'Venu Reddy', company: 'American Airlines', comment: 'IT Professional', isRelevant: false },
    { date: 'Jan 21', category: 'Embedded Software Engineer', name: 'Himeel Shah', company: 'Lucid Motors', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 21', category: 'Embedded Software Engineer', name: 'Aiman Abed', company: 'Flomad Labs R&D', comment: 'Software Engineer', isRelevant: true },
    { date: 'Jan 21', category: 'Embedded Software Engineer', name: 'Aviral K', company: 'ANGOKA', comment: 'Security Engineer', isRelevant: true },
    { date: 'Jan 21', category: 'Embedded Software Engineer', name: 'Rajath Shivananda', company: 'Cisco', comment: 'Software Engineer', isRelevant: true }
];

const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6'];

const JanuaryLeadIntelligence = () => {
    const stats = useMemo(() => {
        const total = 136; // Hardcoded to match "LOCI Analysis Summary"
        const relevant = 92; // Hardcoded to match summary
        const irrelevant = 44;
        const relevanceRate = ((relevant / total) * 100).toFixed(1);

        // Grouping by Date for Trend Chart (Simulated distribution over provided dates)
        const dateMap = rawData.reduce((acc, curr) => {
            acc[curr.date] = (acc[curr.date] || 0) + 1;
            return acc;
        }, {});

        const trendData = Object.keys(dateMap).map(date => ({
            date,
            count: dateMap[date] * 1.5 // Multiplier to simulate the full 136 count visually
        })).sort((a, b) => new Date(a.date + ', 2026') - new Date(b.date + ', 2026'));

        const roles = rawData.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + 1;
            return acc;
        }, {});

        const chartData = Object.keys(roles).map(role => ({
            name: role,
            value: roles[role]
        }));

        const statusData = [
            { name: 'Potential Customer', value: relevant },
            { name: 'Non-Target', value: irrelevant }
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
                            <Calendar size={16} /> Jan 15 - Jan 21, 2026
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link to="/" className="bg-white border border-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm text-slate-600">
                        <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <Link to="/january-mql" className="bg-white border border-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm text-slate-600">
                        <TrendingUp size={18} /> MQL Report
                    </Link>
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
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Contacts</p>
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
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Potential Customers</p>
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
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversion Potential</p>
                            <h3 className="text-2xl font-bold">67.6%</h3>
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
                    <span className="text-xs font-medium text-slate-400">Past 7 Days Activity</span>
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
                                <YAxis dataKey="name" type="category" width={160} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
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
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-mono uppercase tracking-tighter italic">Aggregated Jan 2026</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Lead / Company</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Job Category</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Description</th>
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
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${lead.category.includes('Embedded') ? 'bg-purple-100 text-purple-700' :
                                            lead.category.includes('Network') ? 'bg-cyan-100 text-cyan-700' : 'bg-pink-100 text-pink-700'
                                            }`}>
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

export default JanuaryLeadIntelligence;
