import React, { useState, useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
    PieChart, Pie
} from 'recharts';
import {
    Users, CheckCircle2, XCircle, Building2, Briefcase,
    Search, Filter, ExternalLink, TrendingUp, Target, Mail, Zap
} from 'lucide-react';

const rawData = [
    { date: "Jan 07, 2026", campaign: "Technical Solution - Network Engineers", firstName: "Rick", lastName: "Rutledge", email: "rickr@tritelcomm.com", company: "TriTelComm PVD", linkedin: "https://www.linkedin.com/in/rick-rutledge-a304821", comments: "Company not fit icp", relevant: "no", role: "Network Engineer" },
    { date: "Jan 07, 2026", campaign: "Technical Solution - Infrastructure Engineers", firstName: "Dong H.", lastName: "Ahn", email: "donga@nvidia.com", company: "NVIDIA", linkedin: "https://www.linkedin.com/in/dahn1", comments: "", relevant: "yes", role: "Infrastructure Engineer" },
    { date: "Jan 07, 2026", campaign: "Technical Solution - Infrastructure Engineers", firstName: "Amy", lastName: "Pattana", email: "Amy.lily@canonical.com", company: "Canonical", linkedin: "https://www.linkedin.com/in/amylily", comments: "User experience designer - company is relevant", relevant: "yes", role: "UX Designer" },
    { date: "Jan 08, 2026", campaign: "Technical Solution - Infrastructure Engineers", firstName: "Mohammed", lastName: "Alam", email: "mohammed_alam@f2onsite.com", company: "USAA", linkedin: "https://www.linkedin.com/in/mohammed-alam-2501408", comments: "", relevant: "yes", role: "Infrastructure Engineer" },
    { date: "Jan 08, 2026", campaign: "Technical Solution - Embedded Software Engineers", firstName: "Murali", lastName: "K", email: "muralikrishna.kandibanda@stellantis.com", company: "Stellantis", linkedin: "https://www.linkedin.com/in/murali-k-b5102312", comments: "", relevant: "yes", role: "Embedded Software Engineer" },
    { date: "Jan 08, 2026", campaign: "Technical Solution - Network Engineers", firstName: "Jeremiah", lastName: "Abe", email: "jsoft_solutions@outlook.com", company: "JSoft Digital Solutions Ltd.", linkedin: "https://www.linkedin.com/in/jeremiah-abe-98374537", comments: "", relevant: "no", role: "Network Engineer" },
    { date: "Jan 08, 2026", campaign: "Technical Solution - Infrastructure Engineers", firstName: "Vijayalakshmi", lastName: "Madala", email: "vijayam@kyndryl.com", company: "Kyndryl", linkedin: "https://www.linkedin.com/in/vijayalakshmi-m-047969b8", comments: "", relevant: "yes", role: "Infrastructure Engineer" },
    { date: "Jan 09, 2026", campaign: "Technical Solution - Network Engineers", firstName: "Harvey", lastName: "Bhullar", email: "hbhullar@its.jnj.com", company: "Johnson & Johnson", linkedin: "https://www.linkedin.com/in/harveybhullar", comments: "", relevant: "yes", role: "Network Engineer" },
    { date: "Jan 09, 2026", campaign: "Technical Solution - Network Engineers", firstName: "Emre", lastName: "Rizaner", email: "Emre.rizaner@csl-group.com", company: "CSL Group", linkedin: "https://www.linkedin.com/in/emre-rizaner-13670955", comments: "", relevant: "yes", role: "Network Engineer" },
    { date: "Jan 10, 2026", campaign: "Technical Solution - Network Engineers", firstName: "Dileesh", lastName: "T", email: "dileesh.thankappanpillai@tateandlyle.com", company: "Tate & Lyle", linkedin: "https://www.linkedin.com/in/dileesht", comments: "", relevant: "no", role: "Network Engineer" },
    { date: "Jan 10, 2026", campaign: "Technical Solution - Infrastructure Engineers", firstName: "Carlos", lastName: "Tronco", email: "ctronco@certestechnology.com", company: "Dell Technologies", linkedin: "https://www.linkedin.com/in/ctronco", comments: "", relevant: "yes", role: "Infrastructure Engineer" },
    { date: "Jan 11, 2026", campaign: "Technical Solution - Network Engineers", firstName: "Dima", lastName: "Baranov", email: "Dmitri.Baranov@elbitsystems.com", company: "Elbit Systems Israel", linkedin: "https://www.linkedin.com/in/dima-baranov-b5202450", comments: "", relevant: "yes", role: "Network Engineer" },
    { date: "Jan 11, 2026", campaign: "Technical Solution - Network Engineers", firstName: "Elisee", lastName: "Kitsisa", email: "ekitsisa@geico.com", company: "GEICO", linkedin: "https://www.linkedin.com/in/elisee-kitsisa-704676a7", comments: "", relevant: "no", role: "Network Engineer" },
    { date: "Jan 11, 2026", campaign: "Technical Solution - Network Engineers", firstName: "Abdul-Saboor", lastName: "Khan", email: "saboor.khan@gmail.com", company: "Workplace Safety and Insurance Board (WSIB)", linkedin: "https://www.linkedin.com/in/abdul-saboor-khan-0795b6a2", comments: "", relevant: "no", role: "Network Engineer" },
    { date: "Jan 11, 2026", campaign: "Technical Solution - Network Engineers", firstName: "Siva Satish Kumar", lastName: "Lavu", email: "Satish.lavu@gmail.com", company: "Qentelli", linkedin: "https://www.linkedin.com/in/siva-satish-kumar-lavu-6b330a59", comments: "", relevant: "yes", role: "Network Engineer" },
    { date: "Jan 11, 2026", campaign: "Technical Solution - Embedded Software Engineers", firstName: "Amit", lastName: "Singh", email: "Amit.Singh@aam.com", company: "AAM - American Axle & Manufacturing", linkedin: "https://www.linkedin.com/in/aisingh34", comments: "", relevant: "yes", role: "Embedded Software Engineer" },
    { date: "Jan 11, 2026", campaign: "Technical Solution - Network Engineers", firstName: "Jaroslaw (Jerry)", lastName: "Rozmus", email: "rozmusjs@gmail.com", company: "Crabel Capital Management, LLC", linkedin: "https://www.linkedin.com/in/jaroslaw-jerry-rozmus-7353307", comments: "", relevant: "no", role: "Network Engineer" },
    { date: "Jan 12, 2026", campaign: "Technical Solution - Embedded Software Engineers", firstName: "Somanath", lastName: "Rudrakshala", email: "somanath.r@rediffmail.com", company: "Capgemini Engineering", linkedin: "https://www.linkedin.com/in/somanath-rudrakshala-19760b18", comments: "", relevant: "yes", role: "Embedded Software Engineer" }
];

const January7_11Leads = () => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const stats = useMemo(() => {
        const total = rawData.length;
        const relevant = rawData.filter(d => d.relevant === 'yes').length;
        const notRelevant = total - relevant;
        const campaigns = rawData.reduce((acc, curr) => {
            acc[curr.campaign] = (acc[curr.campaign] || 0) + 1;
            return acc;
        }, {});

        const companies = [...new Set(rawData.map(d => d.company))].length;

        return { total, relevant, notRelevant, campaigns, companies };
    }, []);

    const chartData = [
        { name: 'Relevant', value: stats.relevant, color: '#10b981' },
        { name: 'Not Relevant', value: stats.notRelevant, color: '#ef4444' }
    ];

    const campaignData = Object.entries(stats.campaigns).map(([name, value]) => ({
        name: name.split(' - ')[1] || name,
        value
    }));

    const filteredLeads = rawData.filter(lead => {
        const matchesFilter = filter === 'all' || lead.relevant === filter;
        const matchesSearch =
            lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.role.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Lead Analytics Dashboard</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Campaign Period: Jan 07 - Jan 11</span>
                            <span className="text-slate-300">|</span>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                <Zap className="w-3 h-3" /> Trio Marketing & Lemlist
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 flex items-center gap-2">
                            <Target className="w-5 h-5 text-indigo-500" />
                            <span className="font-semibold text-slate-700">{((stats.relevant / stats.total) * 100).toFixed(1)}% Relevance Rate</span>
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={<Users className="w-6 h-6 text-blue-500" />} label="Total Leads" value={stats.total} />
                    <StatCard icon={<CheckCircle2 className="w-6 h-6 text-emerald-500" />} label="Relevant" value={stats.relevant} />
                    <StatCard icon={<XCircle className="w-6 h-6 text-rose-500" />} label="Not Relevant" value={stats.notRelevant} />
                    <StatCard icon={<Building2 className="w-6 h-6 text-amber-500" />} label="Unique Companies" value={stats.companies} />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-slate-400" /> Lead Relevance Distribution
                        </h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center gap-8 mt-4">
                                {chartData.map(item => (
                                    <div key={item.name} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-sm font-medium text-slate-600">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                            <Filter className="w-5 h-5 text-slate-400" /> Leads by Campaign
                        </h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={campaignData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        width={150}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Lead List / Companies Analysis */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-indigo-500" />
                            <h3 className="text-xl font-bold text-slate-800">Company & Lead Insights</h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-grow md:flex-grow-0">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search leads or companies..."
                                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex bg-slate-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${filter === 'all' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                                >All</button>
                                <button
                                    onClick={() => setFilter('yes')}
                                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${filter === 'yes' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
                                >Relevant</button>
                                <button
                                    onClick={() => setFilter('no')}
                                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${filter === 'no' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500 hover:text-slate-700'}`}
                                >Not Relevant</button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                    <th className="px-6 py-4">Professional</th>
                                    <th className="px-6 py-4">Job Title & Company Info</th>
                                    <th className="px-6 py-4">Outreach Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredLeads.map((lead, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${lead.relevant === 'yes' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                                    {lead.firstName[0]}{lead.lastName[0]}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 leading-none flex items-center gap-1.5">
                                                        {lead.firstName} {lead.lastName}
                                                        {lead.relevant === 'yes' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                                                    </p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tight">{lead.date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded uppercase leading-none">
                                                        {lead.role}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-medium text-slate-700 leading-tight">{lead.company}</p>
                                                <p className="text-xs text-slate-500 italic truncate max-w-xs">{lead.comments || lead.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50/50 px-2 py-1 rounded border border-rose-100 w-fit">
                                                    <Mail className="w-3 h-3" />
                                                    <span className="text-[10px] font-bold">2 EMAILS SENT / NO REPLY</span>
                                                </div>
                                                <span className="text-[9px] text-slate-400 font-medium">via Lemlist Automation</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href={lead.linkedin}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg inline-block transition-all"
                                                title="View Profile"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredLeads.length === 0 && (
                        <div className="p-12 text-center text-slate-400">
                            No leads found matching your search criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 group hover:border-indigo-100 transition-colors">
        <div className="p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
    </div>
);

export default January7_11Leads;
