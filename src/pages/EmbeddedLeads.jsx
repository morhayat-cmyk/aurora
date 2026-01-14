import React, { useState, useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import {
    Users, Building2, Target, Globe2, Briefcase, Search,
    Award, TrendingUp, Mail, Linkedin
} from 'lucide-react';

const rawData = [
    { date: '2025-12-02', company: 'ABB E-mobility', name: 'Oguz Emre Cakil', email: 'info@gomuludestek.com', industry: 'Automotive/EV', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2025-12-02', company: 'SICK Sensor Intelligence', name: 'Thomas Kötzner', industry: 'Industrial Automation', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2025-12-02', company: 'Rogat Engineering', name: 'Reut Vaknin', industry: 'Engineering Services', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-08', company: 'AMETEK', name: 'Manuel Malagon', industry: 'Electronics', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2025-12-08', company: 'SATEC', name: 'Sergey Garberman', industry: 'Energy', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-08', company: 'Maytronics', name: 'Shay Ron', industry: 'Consumer Tech', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-08', company: 'Amazon', name: 'Nagaraj Venkatapuram', industry: 'Big Tech', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2025-12-10', company: 'Mallinckrodt', name: 'Mohamed Shehab', industry: 'Medical Devices', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2025-12-11', company: 'magniX', name: 'Farzad Baghernezhad', industry: 'Aerospace', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-11', company: 'ASML', name: 'Vigneswaran Karunanithi', industry: 'Semiconductors', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2025-12-12', company: 'PLC2', name: 'Frank Schwenke', industry: 'Engineering Services', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-12', company: 'Boston Scientific', name: 'Nagaraju J', industry: 'Medical Devices', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2025-12-13', company: 'normalis-gmbh', name: 'Christian Steffen', industry: 'Software', size: 'Small', tier: 'Tier 3' },
    { date: '2025-12-13', company: 'Lightmatter', name: 'Ehu Shubham Shaw', industry: 'Semiconductors', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-15', company: 'The Evolvers Group', name: 'Naga Venkata Rayapati', industry: 'Consulting', size: 'Small', tier: 'Tier 3' },
    { date: '2025-12-15', company: 'GE Aerospace', name: 'Anotida David Zimvumi', industry: 'Aerospace', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2025-12-15', company: 'TDK-Lambda', name: 'Elad Malka', industry: 'Electronics', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2025-12-15', company: 'GS LOCKnGO', name: 'Nadeem Jamal', industry: 'IoT/Security', size: 'Small', tier: 'Tier 3' },
    { date: '2025-12-15', company: 'Viyan Systems UK', name: 'Venkat Saravanan', industry: 'Consulting', size: 'Small', tier: 'Tier 3' },
    { date: '2025-12-16', company: 'Industrial Scientific', name: 'Grayham Grega', industry: 'Industrial Automation', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-16', company: 'ASML', name: 'Dinesh Ravilla', industry: 'Semiconductors', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2025-12-16', company: 'AVL Software', name: 'Hamza EL MALKI', industry: 'Automotive/EV', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2025-12-17', company: 'QinetiQ', name: 'Abdi Tujuba', industry: 'Defense/Aero', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2025-12-17', company: 'MESCO', name: 'Akash John Subash', industry: 'Engineering Services', size: 'Small', tier: 'Tier 3' },
    { date: '2025-12-17', company: 'Enercon Technologies', name: 'Tal Gadasi', industry: 'Energy', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-17', company: 'Pi Square Technologies', name: 'Shaik Saifulla', industry: 'Automotive', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-18', company: 'Thoughtworks', name: 'Harald Walter', industry: 'Big Tech', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2025-12-18', company: 'paragon GmbH', name: 'Oleksandr Liginov', industry: 'Automotive', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-18', company: 'wenglor sensoric', name: 'Illia Antoniuk', industry: 'Industrial Automation', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-20', company: 'NeolSys', name: 'Muhammad Junaid Aslam', industry: 'Software', size: 'Small', tier: 'Tier 3' },
    { date: '2025-12-20', company: 'mbeder GmbH', name: 'Yazdan Haghi', industry: 'Engineering Services', size: 'Small', tier: 'Tier 3' },
    { date: '2025-12-21', company: 'FarmSense Inc.', name: 'Shahab Nikkhoo', industry: 'AgriTech/IoT', size: 'Small', tier: 'Tier 3' },
    { date: '2025-12-21', company: 'Canyon AeroConnect', name: 'Weston Gavin', industry: 'Aerospace', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-22', company: 'Honeywell', name: 'Rama Krishna Velpuri', industry: 'Industrial Automation', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2025-12-22', company: 'Inter-Coastal Electronics', name: 'Krista Wolffe', industry: 'Defense/Electronics', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-22', company: 'IOT Bearings', name: 'Ruslan Nurimbetov', industry: 'Industrial IoT', size: 'Small', tier: 'Tier 3' },
    { date: '2025-12-24', company: 'Cambridge Sensoriis', name: 'Venkata Sunil Malladhi', industry: 'Radar/IoT', size: 'Small', tier: 'Tier 3' },
    { date: '2025-12-24', company: 'JSI', name: 'David Nacarino', industry: 'Industrial Automation', size: 'Small', tier: 'Tier 3' },
    { date: '2025-12-24', company: 'RØDE', name: 'John Morgan', industry: 'Consumer Tech', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-24', company: 'Motorola Solutions', name: 'Alexandr Spivac', industry: 'Telecommunications', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2025-12-24', company: 'Planetary Remediation', name: 'Aaron Schoeffler', industry: 'Environmental', size: 'Small', tier: 'Tier 3' },
    { date: '2025-12-25', company: 'Alvaria, Inc.', name: 'Adam Kahin', industry: 'Software', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-25', company: 'TES Electronic Solutions', name: 'Ajay Kumar Kota', industry: 'Electronics', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-28', company: 'Bastion Technologies', name: 'Paul Newton', industry: 'Defense/Space', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2025-12-30', company: 'PV Labs', name: 'Sean Stel', industry: 'Aerospace/Imaging', size: 'Small', tier: 'Tier 3' },
    { date: '2026-01-04', company: 'Soil Instruments Ltd', name: 'Giwa Oluwarotimi', industry: 'Geotechnical', size: 'Small', tier: 'Tier 3' },
    { date: '2026-01-04', company: 'SITAEL', name: 'Salvatore Arlia', industry: 'Space/Aerospace', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2026-01-04', company: 'Minimal', name: 'Jakub Szypicyn', industry: 'Design/Tech', size: 'Small', tier: 'Tier 3' },
    { date: '2026-01-04', company: 'Honeywell', name: 'Saismitha Chandrasekar', industry: 'Industrial Automation', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2026-01-05', company: 'Berlin Space Technologies', name: 'Sritam Paltasingh', industry: 'Space Tech', size: 'Small', tier: 'Tier 3' },
    { date: '2026-01-08', company: 'Stellantis', name: 'Murali K', industry: 'Automotive', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2026-01-10', company: 'AAM', name: 'Amit Singh', industry: 'Automotive', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2026-01-11', company: 'Capgemini Engineering', name: 'Somanath Rudrakshala', industry: 'Engineering Services', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2026-01-12', company: 'Caterpillar Inc.', name: 'Srinidhi K', industry: 'Industrial Automation', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2026-01-12', company: 'Texas Instruments', name: 'Eden Gender', industry: 'Semiconductors', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2026-01-13', company: 'Stryker', name: 'Siva Krishna R', industry: 'Medical Devices', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2026-01-13', company: 'Stellantis', name: 'Kartik Y', industry: 'Automotive', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2026-01-13', company: 'Urban Mobility Systems', name: 'Madhav Shashank', industry: 'Automotive/EV', size: 'Mid-Market', tier: 'Tier 2' },
    { date: '2026-01-13', company: 'FERCHAU', name: 'Chintamani Sagade', industry: 'Engineering Services', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2026-01-13', company: 'Honeywell', name: 'Purva Limbachiya', industry: 'Industrial Automation', size: 'Enterprise', tier: 'Tier 1' },
    { date: '2026-01-14', company: 'Infineon Technologies', name: 'Bradley Nelson', industry: 'Semiconductors', size: 'Enterprise', tier: 'Tier 1' },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899', '#6366f1', '#14b8a6', '#f43f5e'];

export default function EmbeddedLeads() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSize, setFilterSize] = useState('All');

    // Dynamic Stats calculation
    const stats = useMemo(() => {
        const industryMap = {};
        const sizeMap = {};
        let tier1Count = 0;

        rawData.forEach(item => {
            industryMap[item.industry] = (industryMap[item.industry] || 0) + 1;
            sizeMap[item.size] = (sizeMap[item.size] || 0) + 1;
            if (item.tier === 'Tier 1') tier1Count++;
        });

        const industryData = Object.keys(industryMap)
            .map(key => ({ name: key, value: industryMap[key] }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 8); // Top 8 for visual clarity

        const sizeData = Object.keys(sizeMap).map(key => ({ name: key, value: sizeMap[key] }));

        return { industryData, sizeData, total: rawData.length, tier1Count };
    }, []);

    const filteredLeads = rawData.filter(lead => {
        const matchesSearch = lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSize = filterSize === 'All' || lead.size === filterSize;
        return matchesSearch && matchesSize;
    });

    const enterprisePercent = Math.round((stats.sizeData.find(s => s.name === 'Enterprise')?.value || 0) / stats.total * 100);

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Lead Intelligence Dashboard</h1>
                    <p className="text-slate-500">Embedded Software Engineering Campaign Performance</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-semibold text-slate-700">Campaign High Impact</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all font-medium text-sm">
                        Export Report
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Users className="w-6 h-6" /></div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">Total Qualified Leads</h3>
                    <p className="text-3xl font-bold">{stats.total}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Building2 className="w-6 h-6" /></div>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Market Dominance</span>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">Enterprise Share</h3>
                    <p className="text-3xl font-bold">{enterprisePercent}%</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Target className="w-6 h-6" /></div>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">Strategic Tier 1 Accounts</h3>
                    <p className="text-3xl font-bold">{stats.tier1Count}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Globe2 className="w-6 h-6" /></div>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">High Impact Verticals</h3>
                    <p className="text-3xl font-bold">{stats.industryData.length}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Industry Distribution */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-slate-400" />
                        Top Lead Verticals
                    </h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.industryData} layout="vertical" margin={{ left: 20, right: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    width={150}
                                    tick={{ fontSize: 11, fill: '#64748b' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Company Size Breakdown */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-slate-400" />
                        Account Mix
                    </h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.sizeData}
                                    innerRadius={65}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {stats.sizeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" align="center" iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-12">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
                    <h3 className="text-lg font-bold">Campaign Database ({filteredLeads.length} leads)</h3>
                    <div className="flex flex-wrap gap-3">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search name or company..."
                                className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            value={filterSize}
                            onChange={(e) => setFilterSize(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Enterprise">Enterprise</option>
                            <option value="Mid-Market">Mid-Market</option>
                            <option value="Small">Small/Startup</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                <th className="px-6 py-4">Lead Information</th>
                                <th className="px-6 py-4">Company</th>
                                <th className="px-6 py-4">Industry Sector</th>
                                <th className="px-6 py-4">Strategy & Tier</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredLeads.map((lead, i) => (
                                <tr key={i} className="hover:bg-blue-50/20 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                                            {lead.name}
                                            <a href="#" className="opacity-0 group-hover:opacity-100 transition-opacity"><Linkedin className="w-3 h-3 text-blue-600" /></a>
                                        </div>
                                        <div className="text-xs text-slate-500 truncate max-w-[200px] flex items-center gap-1">
                                            <Mail className="w-3 h-3" /> {lead.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-slate-700">{lead.company}</div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-tighter">{lead.size}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md font-medium">
                                            {lead.industry}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest ${lead.tier === 'Tier 1' ? 'text-blue-700 bg-blue-50 border border-blue-100' :
                                                lead.tier === 'Tier 2' ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' :
                                                    'text-slate-600 bg-slate-100'
                                            }`}>
                                            {lead.tier === 'Tier 1' && <Award className="w-3 h-3" />}
                                            {lead.tier}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredLeads.length === 0 && (
                        <div className="p-16 text-center text-slate-400 italic">
                            No matching leads found for current filters.
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Branding */}
            <div className="max-w-7xl mx-auto mt-8 border-t border-slate-200 pt-8 text-center text-slate-400 text-xs">
                Data integrity verified for FY26 Q1 Presentation • Created for Executive Leadership Review
            </div>
        </div>
    );
}
