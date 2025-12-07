import React, { useState } from 'react';
import {
  Users,
  Send,
  MailCheck,
  MailOpen,
  MessageSquare,
  AlertCircle,
  TrendingUp,
  Activity,
  ArrowRight
} from 'lucide-react';

const Card = ({ title, value, subtext, icon: Icon, color, trend }) => (
  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg flex items-start justify-between">
    <div>
      <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
      {subtext && <p className={`text-sm ${trend === 'positive' ? 'text-green-400' : trend === 'negative' ? 'text-red-400' : 'text-gray-500'}`}>{subtext}</p>}
    </div>
    <div className={`p-3 rounded-lg bg-opacity-20 ${color}`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-').replace('/20', '')}`} />
    </div>
  </div>
);

const FunnelStep = ({ label, count, percent, color, prevCount }) => {
  const width = prevCount ? Math.max(15, (count / prevCount) * 100) : 100;

  return (
    <div className="flex items-center mb-4 relative group">
      <div className="w-32 text-right pr-4 text-gray-400 font-medium text-sm">{label}</div>
      <div className="flex-1 h-12 bg-gray-700/30 rounded-r-lg relative overflow-hidden flex items-center">
        <div
          className={`h-full ${color} opacity-80 rounded-r-lg transition-all duration-500 ease-out`}
          style={{ width: `${width}%` }}
        ></div>
        <div className="absolute left-4 font-bold text-white text-lg">
          {count.toLocaleString()} <span className="text-xs font-normal opacity-70 ml-1">({percent}%)</span>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  // Consolidated Data Calculations
  // Campaign A: 1017 Leads, 2944 Sent, 2916 Delivered, 675 Opens
  // Campaign D: 835 Leads, 1195 Sent, 1153 Delivered, 234 Opens

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
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-8">

      {/* Header Section */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Outreach Performance Review
          </h1>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-medium text-gray-300">Status: Completed</span>
        </div>
      </header>

      {/* Top Level KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card
          title="Total Leads Targeted"
          value={stats.totalLeads.toLocaleString()}
          icon={Users}
          color="bg-blue-500 text-blue-500"
        />
        <Card
          title="Messages Delivered"
          value={stats.delivered.toLocaleString()}
          subtext={`${rates.deliveryRate}% Delivery Rate`}
          icon={MailCheck}
          color="bg-green-500 text-green-500"
          trend="positive"
        />
        <Card
          title="Total Opens"
          value={stats.opens.toLocaleString()}
          subtext={`${rates.openRate}% Open Rate`}
          icon={MailOpen}
          color="bg-purple-500 text-purple-500"
        />
        <Card
          title="Conversion (Replies)"
          value="0"
          subtext="0.0% Response Rate"
          icon={AlertCircle}
          color="bg-red-500 text-red-500"
          trend="negative"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Funnel Visualization */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Activity className="w-5 h-5 mr-2 text-indigo-400" />
              Engagement Funnel
            </h2>
            <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded uppercase tracking-wider">Aggregate View</span>
          </div>

          <div className="space-y-2 py-4">
            {/* Custom Funnel Implementation */}
            <FunnelStep
              label="Total Sent"
              count={stats.messagesSent}
              percent={100}
              color="bg-blue-600"
              prevCount={stats.messagesSent} // Base
            />
            <FunnelStep
              label="Delivered"
              count={stats.delivered}
              percent={rates.deliveryRate}
              color="bg-indigo-600"
              prevCount={stats.messagesSent}
            />
            <FunnelStep
              label="Opened"
              count={stats.opens}
              percent={rates.openRate}
              color="bg-purple-600"
              prevCount={stats.delivered}
            />
            <FunnelStep
              label="Engaged (Replies)"
              count={0}
              percent={0}
              color="bg-gray-600"
              prevCount={stats.opens}
            />
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700 grid grid-cols-2 gap-4">
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <p className="text-gray-400 text-xs uppercase font-semibold">Technical Health</p>
              <div className="flex items-baseline mt-1 space-x-2">
                <span className="text-2xl font-bold text-green-400">{rates.deliveryRate}%</span>
                <span className="text-sm text-gray-400">Delivery Success</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Only {stats.bounces} bounced emails ({rates.bounceRate}%)</p>
            </div>
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <p className="text-gray-400 text-xs uppercase font-semibold">Content Health</p>
              <div className="flex items-baseline mt-1 space-x-2">
                <span className="text-2xl font-bold text-yellow-400">{rates.openRate}%</span>
                <span className="text-sm text-gray-400">Open Rate</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Healthy open rate, indicating subject lines are working.</p>
            </div>
          </div>
        </div>

        {/* Campaign Breakdown & Insights */}
        <div className="space-y-8">

          {/* Strategic Insights Box */}
          <div className="bg-gradient-to-br from-red-900/40 to-gray-800 rounded-xl p-6 border border-red-900/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <AlertCircle className="w-24 h-24 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-red-400" />
              Key Insight: Zero Conversion
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              While technical delivery ({rates.deliveryRate}%) and interest capture (open rate: {rates.openRate}%) are performing at industry standards, the campaign failed to generate a single reply or booked meeting.
            </p>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-red-200 bg-red-900/20 p-2 rounded">
                <ArrowRight className="w-4 h-4 mr-2" />
                <span>Review Call-to-Action (CTA) clarity</span>
              </div>
              <div className="flex items-center text-sm text-red-200 bg-red-900/20 p-2 rounded">
                <ArrowRight className="w-4 h-4 mr-2" />
                <span>Audit lead targeting vs. offer relevance</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
