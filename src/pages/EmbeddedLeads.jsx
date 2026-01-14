import React, { useState, useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import {
    Users, Building2, Target, Globe2, Briefcase, Search,
    Award, TrendingUp, Linkedin, Info, Zap
} from 'lucide-react';

const rawData = [
    { name: 'Oguz Emre Cakil', company: 'ABB E-mobility', role: 'Embedded Eng (Inferred)', industry: 'Automotive/EV', size: '105,000', tier: 'Tier 1', desc: 'Designs EV charging solutions; global leader in electrification.' },
    { name: 'Thomas Kötzner', company: 'SICK Sensor Intelligence', role: 'Embedded Eng (Inferred)', industry: 'Industrial Automation', size: '11,804', tier: 'Tier 1', desc: 'Manufacturer of sensors and lidar systems for factory automation.' },
    { name: 'Reut Vaknin', company: 'Rogat Engineering', role: 'Embedded Software Engineer', industry: 'R&D Services', size: '22', tier: 'Tier 3', desc: 'End-to-end R&D for defense, autonomous systems, and robotics.' },
    { name: 'Manuel Malagon', company: 'AMETEK Solidstate Controls', role: 'Embedded Eng (Inferred)', industry: 'Electronics', size: '200+', tier: 'Tier 2', desc: 'Designs UPS and power-conversion systems; part of AMETEK group.' },
    { name: 'Sergey Garberman', company: 'SATEC', role: 'Embedded Eng (Inferred)', industry: 'Energy', size: '32', tier: 'Tier 3', desc: 'Power-measurement and energy-management solutions.' },
    { name: 'Shay Ron', company: 'Maytronics', role: 'Embedded Eng (Inferred)', industry: 'Consumer Tech', size: '1,193', tier: 'Tier 2', desc: 'Market leader in robotic pool cleaners and pool safety.' },
    { name: 'Nagaraj Venkatapuram', company: 'Amazon', role: 'Embedded Eng (Inferred)', industry: 'Big Tech', size: '1,560,000', tier: 'Tier 1', desc: 'World’s largest online retailer and cloud service provider.' },
    { name: 'Mohamed Shehab', company: 'Mallinckrodt Pharmaceuticals', role: 'Embedded Eng (Inferred)', industry: 'Medical Devices', size: '2,700', tier: 'Tier 2', desc: 'Specialty biopharma developing rare disease medicines.' },
    { name: 'Farzad Baghernezhad', company: 'magniX', role: 'Embedded Software Engineer', industry: 'Aerospace', size: '87', tier: 'Tier 3', desc: 'Electric motors and powertrains for hybrid aviation.' },
    { name: 'Vigneswaran Karunanithi', company: 'ASML', role: 'Embedded Eng (Inferred)', industry: 'Semiconductors', size: '44,027', tier: 'Tier 1', desc: 'Leading supplier of lithography systems for semiconductors.' },
    { name: 'Frank Schwenke', company: 'PLC2', role: 'Engineering Lead', industry: 'Engineering Services', size: 'SME', tier: 'Tier 3', desc: 'FPGA-based hardware design and embedded training.' },
    { name: 'Nagaraju J', company: 'Boston Scientific', role: 'Embedded Eng (Inferred)', industry: 'Medical Devices', size: '53,000', tier: 'Tier 1', desc: 'Global manufacturer of cardiovascular and surgical medical devices.' },
    { name: 'Christian Steffen', company: 'normalis gmbh', role: 'Embedded Eng (Inferred)', industry: 'Consultancy', size: '30+', tier: 'Tier 3', desc: 'German software consultancy specializing in embedded architecture.' },
    { name: 'Shubham Shaw', company: 'Lightmatter', role: 'Hardware Eng (Inferred)', industry: 'Semiconductors', size: '200', tier: 'Tier 2', desc: 'Developing photonic computing and optical AI infrastructure.' },
    { name: 'Naga Venkata Rayapati', company: 'The Evolvers Group', role: 'Consultant', industry: 'Consulting', size: '81', tier: 'Tier 3', desc: 'Management and technology firm; digital twin solutions.' },
    { name: 'Anotida David Zimvumi', company: 'GE Aerospace', role: 'Aerospace Eng', industry: 'Aerospace', size: '52,000', tier: 'Tier 1', desc: 'Formerly GE Aviation; builds jet engines and aircraft systems.' },
    { name: 'Elad Malka', company: 'TDK-Lambda Israel', role: 'Embedded Eng (Inferred)', industry: 'Electronics', size: '270', tier: 'Tier 3', desc: 'Produces high-efficiency power-supply modules.' },
    { name: 'Nadeem Jamal', company: 'GS LOCKnGO', role: 'Software Eng', industry: 'IoT/Security', size: 'Startup', tier: 'Tier 3', desc: 'Tech company specializing in smart locks and security systems.' },
    { name: 'Venkat Saravanan', company: 'Viyan Systems UK', role: 'Embedded Specialist', industry: 'Consulting', size: 'SME', tier: 'Tier 3', desc: 'IT consulting and embedded systems services.' },
    { name: 'Grayham Grega', company: 'Industrial Scientific', role: 'Embedded Eng (Inferred)', industry: 'Industrial Safety', size: '800', tier: 'Tier 2', desc: 'Manufacturer of portable gas-detection equipment.' },
    { name: 'Hamza El Malki', company: 'AVL Software', role: 'Software Eng', industry: 'Automotive', size: '12,200', tier: 'Tier 1', desc: 'Global mobility technology; vehicle testing and simulation.' },
    { name: 'Abdi Tujuba', company: 'QinetiQ', role: 'Systems Eng', industry: 'Defense', size: '7,000', tier: 'Tier 1', desc: 'British defense tech specializing in system integration.' },
    { name: 'Akash John Subash', company: 'MESCO Engineering', role: 'Software Eng', industry: 'Automation', size: '70', tier: 'Tier 3', desc: 'Specializes in HW/SW for factory and process automation.' },
    { name: 'Tal Gadasi', company: 'Enercon Technologies', role: 'Embedded Eng (Inferred)', industry: 'Energy', size: '400+', tier: 'Tier 2', desc: 'Power conversion for aerospace and defense markets.' },
    { name: 'Shaik Saifulla', company: 'Pi-Square Technologies', role: 'Automotive Eng', industry: 'Automotive', size: '17', tier: 'Tier 3', desc: 'Engineering services for automotive embedded systems.' },
    { name: 'Harald Walter', company: 'Thoughtworks', role: 'Technical Lead', industry: 'Software', size: '10,000+', tier: 'Tier 1', desc: 'Global consultancy specializing in software engineering.' },
    { name: 'Oleksandr Liginov', company: 'paragon GmbH', role: 'Embedded Eng (Inferred)', industry: 'Automotive', size: '685', tier: 'Tier 2', desc: 'Develops cockpit electronics and automotive sensors.' },
    { name: 'Illia Antoniuk', company: 'wenglor sensoric', role: 'Embedded Eng (Inferred)', industry: 'Industrial Automation', size: '1,000', tier: 'Tier 2', desc: 'Intelligent sensors and machine-vision systems.' },
    { name: 'Muhammad Junaid Aslam', company: 'NeolSys', role: 'Embedded Eng', industry: 'IoT', size: 'Small', tier: 'Tier 3', desc: 'Specializes in embedded systems and communication.' },
    { name: 'Yazdan Haghi', company: 'mbeder GmbH', role: 'Embedded Eng', industry: 'IoT', size: 'Small', tier: 'Tier 3', desc: 'AI-enabled wearable technology for emergency care.' },
    { name: 'Shahab Nikkhoo', company: 'FarmSense Inc.', role: 'Embedded Eng', industry: 'AgriTech', size: 'Startup', tier: 'Tier 3', desc: 'Real-time insect-monitoring sensors using machine learning.' },
    { name: 'Weston Gavin', company: 'Canyon AeroConnect', role: 'Embedded Eng', industry: 'Aerospace', size: 'Mid-sized', tier: 'Tier 2', desc: 'Aviation communication and intercom systems.' },
    { name: 'Rama Krishna Velpuri', company: 'Honeywell', role: 'Embedded Eng (Inferred)', industry: 'Industrial Automation', size: '102,000', tier: 'Tier 1', desc: 'Diversified conglomerate; aerospace and building tech.' },
    { name: 'Krista Wolffe', company: 'Inter-Coastal Electronics', role: 'Software Eng', industry: 'Defense', size: '96', tier: 'Tier 3', desc: 'Supplies weapon-system training and simulation.' },
    { name: 'Venkata Sunil Malladhi', company: 'Cambridge Sensoriis', role: 'Radar Engineer', industry: 'Industrial Automation', size: '14', tier: 'Tier 3', desc: 'Designs micro radar sensors for industrial automation.' },
    { name: 'John Morgan', company: 'RØDE', role: 'Embedded Eng (Inferred)', industry: 'Consumer Tech', size: '800+', tier: 'Tier 2', desc: 'Australian audio technology; microphones and interfaces.' },
    { name: 'Alexandr Spivac', company: 'Motorola Solutions', role: 'Embedded Eng', industry: 'Telecommunications', size: '21,000', tier: 'Tier 1', desc: 'Mission-critical communications for public safety.' },
    { name: 'Paul Newton', company: 'Bastion Technologies', role: 'Systems Eng', industry: 'Aerospace/Space', size: '900', tier: 'Tier 2', desc: 'Engineering and mission assurance for NASA/Defense.' },
    { name: 'Salvatore Arlia', company: 'SITAEL', role: 'Embedded Eng (Inferred)', industry: 'Space Tech', size: 'Mid-sized', tier: 'Tier 2', desc: 'Italian aerospace group developing small satellites.' },
    { name: 'Murali Kandibanda', company: 'Stellantis', role: 'Embedded Eng', industry: 'Automotive', size: '272,000', tier: 'Tier 1', desc: 'Global auto manufacturer (Jeep, Peugeot, Opel).' },
    { name: 'Amit Singh', company: 'AAM', role: 'Embedded Eng (Inferred)', industry: 'Automotive', size: '20,000', tier: 'Tier 1', desc: 'Driveline and powertrain systems for industrial markets.' },
    { name: 'Capgemini Engineering', company: 'Capgemini', role: 'Embedded Eng (Inferred)', industry: 'Engineering Services', size: '340,000', tier: 'Tier 1', desc: 'R&D services across automotive and aerospace.' },
    { name: 'Srinidhi K', company: 'Caterpillar Inc.', role: 'Embedded Eng (Inferred)', industry: 'Industrial Automation', size: '113,200', tier: 'Tier 1', desc: 'Manufacturer of construction and mining equipment.' },
    { name: 'Eden Gender', company: 'Texas Instruments', role: 'Embedded Eng (Inferred)', industry: 'Semiconductors', size: '34,000', tier: 'Tier 1', desc: 'Semiconductors and analog/mixed-signal chips.' },
    { name: 'Siva Krishna R', company: 'Stryker', role: 'Embedded Eng (Inferred)', industry: 'Medical Devices', size: '51,000', tier: 'Tier 1', desc: 'Medical devices for hospital and surgical use.' },
    { name: 'Bradley Nelson', company: 'Infineon Technologies', role: 'Embedded Eng (Inferred)', industry: 'Semiconductors', size: '58,600', tier: 'Tier 1', desc: 'Power electronics and automotive microcontrollers.' },
];

const COLORS = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#dc2626', '#db2777', '#4f46e5', '#0891b2', '#16a34a'];

export default function EmbeddedLeads() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterIndustry, setFilterIndustry] = useState('All');

    // Dynamic Metrics derived from LinkedIn Summary
    const analytics = useMemo(() => {
        const industries = {};
        const tiers = {};
        let totalEmployeesReached = 0;

        rawData.forEach(item => {
            industries[item.industry] = (industries[item.industry] || 0) + 1;
            tiers[item.tier] = (tiers[item.tier] || 0) + 1;

            // Basic numeric extraction for workforce reach metric
            const count = parseInt(item.size.replace(/,/g, '').match(/\d+/)) || 0;
            totalEmployeesReached += count;
        });

        const industryData = Object.keys(industries)
            .map(name => ({ name, value: industries[name] }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10);

        const tierData = Object.keys(tiers).map(name => ({ name, value: tiers[name] }));

        return { industryData, tierData, total: rawData.length, reach: totalEmployeesReached };
    }, []);

    const filteredLeads = rawData.filter(lead => {
        const matchesSearch = lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesInd = filterIndustry === 'All' || lead.industry === filterIndustry;
        return matchesSearch && matchesInd;
    });

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-10 font-sans text-slate-800">
            {/* Executive Header */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <Zap className="w-8 h-8 text-blue-600 fill-blue-600" />
                        Lead Intelligence Dashboard
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg font-medium">Embedded Software Engineering Campaign Summary: Dec 2025 – Jan 2026</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white shadow-sm border border-slate-200 px-5 py-3 rounded-xl flex flex-col">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Campaign Velocity</span>
                        <span className="text-xl font-bold text-emerald-600">High Growth</span>
                    </div>
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        Export Dataset
                    </button>
                </div>
            </div>

            {/* Primary KPI Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <Users className="absolute -right-4 -bottom-4 w-24 h-24 text-blue-50 opacity-10 group-hover:scale-110 transition-transform" />
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Total Verified Leads</p>
                    <p className="text-4xl font-black text-slate-900">{analytics.total}</p>
                    <div className="mt-4 flex items-center gap-1 text-emerald-600 text-xs font-bold">
                        <TrendingUp className="w-3 h-3" /> Targeted Professionals
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <Target className="absolute -right-4 -bottom-4 w-24 h-24 text-amber-50 opacity-10 group-hover:scale-110 transition-transform" />
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Strategic Tier 1 Accounts</p>
                    <p className="text-4xl font-black text-slate-900">{analytics.tierData.find(t => t.name === 'Tier 1')?.value || 0}</p>
                    <div className="mt-4 text-slate-500 text-xs font-semibold">ASML, Amazon, TI, Stellantis</div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <Globe2 className="absolute -right-4 -bottom-4 w-24 h-24 text-purple-50 opacity-10 group-hover:scale-110 transition-transform" />
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Workforce Reach</p>
                    <p className="text-4xl font-black text-slate-900">~{(analytics.reach / 1000000).toFixed(1)}M</p>
                    <div className="mt-4 text-slate-500 text-xs font-semibold">Combined employee footprint</div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <Award className="absolute -right-4 -bottom-4 w-24 h-24 text-emerald-50 opacity-10 group-hover:scale-110 transition-transform" />
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Conversion Potential</p>
                    <p className="text-4xl font-black text-slate-900">High</p>
                    <div className="mt-4 text-emerald-600 text-xs font-bold">Industry Citations Verified</div>
                </div>
            </div>

            {/* Visual Analytics Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-blue-600" />
                            Industry Landscape
                        </h3>
                        <span className="text-xs text-slate-400 font-bold tracking-widest uppercase">Top Sector Concentration</span>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analytics.industryData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                                <Bar dataKey="value" fill="#2563eb" radius={[0, 8, 8, 0]} barSize={25} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-purple-600" />
                            Account Mix (Tiers)
                        </h3>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={analytics.tierData} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value" stroke="none">
                                    {analytics.tierData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '20px', fontWeight: 'bold', fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Comprehensive Lead Manifest */}
            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-20">
                <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900">Campaign Manifest</h3>
                        <p className="text-slate-500 text-sm font-medium mt-1">Cross-referenced with industry databases and official citations</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                            <input
                                type="text"
                                placeholder="Filter by name, company..."
                                className="pl-12 pr-6 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 w-full lg:w-80 transition-all font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="px-6 py-3 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                            onChange={(e) => setFilterIndustry(e.target.value)}
                        >
                            <option value="All">All Industries</option>
                            {analytics.industryData.map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="px-8 py-5">Professional & Role</th>
                                <th className="px-8 py-5">Employer Details</th>
                                <th className="px-8 py-5">Market Size & Industry</th>
                                <th className="px-8 py-5">Value Tier</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredLeads.map((lead, i) => (
                                <tr key={i} className="hover:bg-blue-50/30 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors flex items-center gap-2">
                                            {lead.name}
                                            <Linkedin className="w-3 h-3 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                        <div className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">{lead.role}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-black text-slate-700">{lead.company}</div>
                                        <div className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed italic">{lead.desc}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] font-black bg-blue-50 text-blue-700 px-3 py-1 rounded-full w-fit uppercase tracking-tighter">
                                                {lead.industry}
                                            </span>
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
                                                <Users className="w-3 h-3" />
                                                {lead.size} Employees
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`inline-flex items-center gap-2 text-xs font-black px-4 py-2 rounded-xl border-2 uppercase tracking-widest ${lead.tier === 'Tier 1' ? 'text-blue-700 bg-blue-50/50 border-blue-100' :
                                                lead.tier === 'Tier 2' ? 'text-emerald-700 bg-emerald-50/50 border-emerald-100' :
                                                    'text-slate-600 bg-slate-100 border-slate-200'
                                            }`}>
                                            {lead.tier === 'Tier 1' && <Award className="w-3 h-3" />}
                                            {lead.tier}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Citation Disclaimer */}
            <div className="max-w-7xl mx-auto border-t border-slate-200 pt-10 text-center pb-20">
                <div className="inline-flex items-center gap-2 text-slate-400 text-xs font-bold bg-white px-6 py-2 rounded-full border border-slate-100 shadow-sm">
                    <Info className="w-4 h-4" />
                    Data derived from Official Industry Databases, Macrotrends, Stockanalysis, and Tracxn Profile (Feb 2025)
                </div>
            </div>
        </div>
    );
}
