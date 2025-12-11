import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Users,
    Send,
    MailCheck,
    MailOpen,
    MessageSquare,
    AlertCircle,
    TrendingUp,
    Activity,
    ArrowRight,
    BarChart3,
    Calendar,
    PieChart
} from 'lucide-react';

const Card = ({ title, value, subtext, icon: Icon, trend, trendValue }) => (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${title.includes('Targeted') ? 'bg-blue-50 text-blue-600' :
                title.includes('Delivered') ? 'bg-emerald-50 text-emerald-600' :
                    title.includes('Opens') ? 'bg-violet-50 text-violet-600' :
                        'bg-rose-50 text-rose-600'
                }`}>
                <Icon className="w-6 h-6" strokeWidth={2} />
            </div>
            {trend && (
                <div className={`flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${trend === 'positive' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                    {trend === 'positive' ? '+' : ''}{trendValue}
                </div>
            )}
        </div>

        <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">{value}</h3>
            <p className="text-slate-500 text-sm font-medium">{title}</p>
            {subtext && <p className="text-slate-400 text-xs mt-2">{subtext}</p>}
        </div>
    </div>
);

const FunnelStep = ({ label, count, percent, color, prevCount, index }) => {
    const width = prevCount ? Math.max(15, (count / prevCount) * 100) : 100;

    return (
        <div className="relative mb-6 last:mb-0">
            <div className="flex items-center justify-between mb-2 text-sm">
                <span className="font-semibold text-slate-700">{label}</span>
                <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{count.toLocaleString()}</span>
                    <span className="text-slate-400 text-xs">({percent}%)</span>
                </div>
            </div>

            <div className="h-4 bg-slate-100 rounded-full overflow-hidden w-full relative">
                <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
                    style={{ width: `${width}%` }}
                ></div>
            </div>
        </div>
    );
};

export default function Dashboard() {
    const stats = {
        totalLeads: 1017 + 835,
        messagesSent: 2944 + 1195,
        delivered: 2916 + 1153,
        opens: 675 + 234,
        replies: 0,
        bounces: 28 + 42,
    };

    const rates = {
        deliveryRate: ((stats.delivered / stats.messagesSent) * 100).toFixed(1),
        openRate: ((stats.opens / stats.delivered) * 100).toFixed(1),
        bounceRate: ((stats.bounces / stats.messagesSent) * 100).toFixed(1),
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-200">
                    <div>
                        <div className="flex items-center space-x-2 text-indigo-600 mb-2 font-semibold tracking-wide uppercase text-xs">
                            <BarChart3 className="w-4 h-4" />
                            <span>Campaign Analytics</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                            Outreach Performance
                        </h1>
                        <p className="text-slate-500 text-lg">Detailed insights into lead engagement and conversion.</p>
                    </div>

                    <div className="mt-6 md:mt-0 flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end mr-4">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</span>
                            <div className="flex items-center text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full text-sm border border-emerald-100">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
                                Completed
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Link to="/trio-leads" className="group flex items-center space-x-2 bg-white text-slate-700 hover:text-indigo-600 border border-slate-200 px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                <PieChart className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                                <span className="font-semibold">View Trio Leads</span>
                            </Link>
                            <a href="/deep-dive.html" target="_blank" className="group flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                <Activity className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                                <span className="font-semibold">View Deep Dive</span>
                                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </a>
                        </div>
                    </div>
                </header>

                {/* Top Level KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <Card
                        title="Total Leads"
                        value={stats.totalLeads.toLocaleString()}
                        icon={Users}
                        subtext="2 Active Campaigns"
                    />
                    <Card
                        title="Delivered"
                        value={stats.delivered.toLocaleString()}
                        trend="positive"
                        trendValue={`${rates.deliveryRate}%`}
                        icon={MailCheck}
                        subtext="Messages successfully landed"
                    />
                    <Card
                        title="Total Opens"
                        value={stats.opens.toLocaleString()}
                        trend="positive"
                        trendValue={`${rates.openRate}%`}
                        icon={MailOpen}
                        subtext="Unique recipients opened"
                    />
                    <Card
                        title="Replies"
                        value="0"
                        trend="negative"
                        trendValue="0.0%"
                        icon={MessageSquare}
                        subtext="Direct response count"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Funnel Visualization */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-1">Engagement Funnel</h2>
                                <p className="text-slate-500 text-sm">Step-by-step breakdown of campaign flow</p>
                            </div>
                            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <Activity className="w-5 h-5 text-indigo-500" />
                            </div>
                        </div>

                        <div className="space-y-4 px-2">
                            <FunnelStep
                                label="Messages Sent"
                                count={stats.messagesSent}
                                percent={100}
                                color="bg-slate-300"
                                prevCount={stats.messagesSent}
                            />
                            <FunnelStep
                                label="Delivered"
                                count={stats.delivered}
                                percent={rates.deliveryRate}
                                color="bg-indigo-500"
                                prevCount={stats.messagesSent}
                            />
                            <FunnelStep
                                label="Opened"
                                count={stats.opens}
                                percent={rates.openRate}
                                color="bg-violet-500"
                                prevCount={stats.delivered}
                            />
                            <FunnelStep
                                label="Replies"
                                count={0}
                                percent={0}
                                color="bg-rose-500"
                                prevCount={stats.opens}
                            />
                        </div>

                        <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-2 gap-6">
                            <div>
                                <div className="flex w-full items-center justify-between mb-2">
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Delivery Health</p>
                                    <span className="bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Excellent</span>
                                </div>
                                <div className="text-3xl font-bold text-slate-800 tracking-tight">{rates.deliveryRate}%</div>
                                <p className="text-sm text-slate-400 mt-1">Bounce rate stabilized at {rates.bounceRate}%</p>
                            </div>
                            <div className="pl-6 border-l border-slate-100">
                                <div className="flex w-full items-center justify-between mb-2">
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Engagement Quality</p>
                                    <span className="bg-amber-100 text-amber-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Fair</span>
                                </div>
                                <div className="text-3xl font-bold text-slate-800 tracking-tight">{rates.openRate}%</div>
                                <p className="text-sm text-slate-400 mt-1">Open rate above industry avg.</p>
                            </div>
                        </div>
                    </div>

                    {/* Campaign Breakdown & Insights */}
                    <div className="space-y-6">

                        {/* Strategic Insights Box */}
                        <div className="bg-gradient-to-br from-rose-50 to-white rounded-3xl p-8 border border-rose-100 shadow-lg shadow-rose-100/50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <AlertCircle className="w-32 h-32 text-rose-600" />
                            </div>

                            <div className="relative">
                                <div className="flex items-center space-x-2 text-rose-600 mb-4">
                                    <TrendingUp className="w-5 h-5" />
                                    <span className="font-bold uppercase text-xs tracking-wider">Critical Insight</span>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                    Zero Conversions
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    Despite solid technical delivery and open rates, no leads converted. This strongly suggests a disconnect in the offer or CTA rather than a targeting issue.
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-center text-sm text-rose-900 bg-white/60 p-3 rounded-xl border border-rose-100/50">
                                        <div className="min-w-6 mr-2 flex justify-center"><ArrowRight className="w-4 h-4 text-rose-500" /></div>
                                        <span className="font-medium">Revise Call-to-Action (CTA)</span>
                                    </div>
                                    <div className="flex items-center text-sm text-rose-900 bg-white/60 p-3 rounded-xl border border-rose-100/50">
                                        <div className="min-w-6 mr-2 flex justify-center"><ArrowRight className="w-4 h-4 text-rose-500" /></div>
                                        <span className="font-medium">Check offer relevance</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-indigo-500/20">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-2">Need a strategy pivot?</h3>
                                <p className="text-slate-400 text-sm mb-4">Download the full deep dive report to analyze audience seniority matches.</p>
                                <a href="/deep-dive.html" target="_blank" className="inline-flex items-center text-sm font-semibold text-white border-b-2 border-white/20 hover:border-white pb-1 transition-all">
                                    View Report <ArrowRight className="w-4 h-4 ml-1" />
                                </a>
                            </div>
                            {/* Decorative circles */}
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
                            <div className="absolute top-8 left-8 w-24 h-24 bg-rose-500 rounded-full blur-3xl opacity-10"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
