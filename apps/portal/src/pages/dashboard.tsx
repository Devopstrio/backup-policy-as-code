import React, { useState } from 'react';
import Head from 'next/head';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export default function GovernanceDashboard() {
    const [complianceScore, setComplianceScore] = useState(98.4);

    return (
        <div className="min-h-screen bg-[#020617] text-white flex">
            {/* Sidebar */}
            <aside className="w-80 bg-[#0f172a]/50 border-r border-white/5 flex flex-col">
                <div className="p-10 flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black">P</div>
                    <span className="font-bold text-xl tracking-tighter">BPAC Admin</span>
                </div>

                <nav className="flex-1 px-6 space-y-2">
                    {['Overview', 'Policy Catalog', 'Compliance', 'Drift Control', 'Approvals', 'Settings'].map((item) => (
                        <div key={item} className={`px-5 py-4 rounded-2xl cursor-pointer transition-all ${item === 'Overview' ? 'bg-indigo-600 shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                            <span className="text-sm font-bold">{item}</span>
                        </div>
                    ))}
                </nav>

                <div className="p-8">
                    <div className="p-6 bg-indigo-600/10 border border-indigo-600/20 rounded-3xl">
                        <p className="text-xs text-indigo-400 font-bold mb-3 uppercase">Health Index</p>
                        <div className="text-3xl font-black mb-2">{complianceScore}%</div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full" style={{ width: `${complianceScore}%` }} />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 p-16">
                <header className="flex justify-between items-start mb-16">
                    <div>
                        <h1 className={`${outfit.className} text-5xl font-black mb-4`}>Governance Hub</h1>
                        <p className="text-slate-500 text-lg">Continuous enforcement of 1,240 backup policies across 12 regions.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">Audit Export</button>
                        <button className="px-8 py-4 bg-indigo-600 rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20">New Policy Pack</button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <MetricCard title="Active Policies" value="1.2K" sub="Across 3 Clouds" color="indigo" />
                    <MetricCard title="Compliant Assets" value="45,820" sub="98.4% Efficiency" color="emerald" />
                    <MetricCard title="Drift Events" value="12" sub="Detected last 24h" color="rose" />
                </div>

                <section className="bg-white/5 border border-white/10 rounded-[40px] p-10">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-2xl font-bold">Policy Enforcement Queue</h2>
                        <span className="text-xs font-bold text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full">REAL-TIME SYNC</span>
                    </div>

                    <div className="space-y-4">
                        <QueueItem name="Global SQL Platinum Pack" target="Azure (Multiple)" status="ENFORCED" time="2m ago" />
                        <QueueItem name="AWS Mission Critical EBS" target="us-east-1" status="DRIFT_DETECTED" time="15m ago" warning />
                        <QueueItem name="M365 Legal Retention" target="SaaS" status="PENDING_APPROVAL" time="1h ago" info />
                    </div>
                </section>
            </main>
        </div>
    );
}

const MetricCard = ({ title, value, sub, color }: any) => (
    <div className="bg-[#0f172a]/50 border border-white/5 rounded-[32px] p-8 hover:border-indigo-500/30 transition-all group">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 group-hover:text-indigo-400 transition-colors">{title}</p>
        <div className="text-5xl font-black mb-2 tracking-tighter">{value}</div>
        <p className="text-slate-500 font-medium">{sub}</p>
    </div>
);

const QueueItem = ({ name, target, status, time, warning, info }: any) => (
    <div className="flex justify-between items-center p-6 bg-[#020617] border border-white/5 rounded-3xl hover:bg-white/5 transition-all cursor-pointer">
        <div className="flex items-center gap-6">
            <div className={`w-3 h-3 rounded-full ${warning ? 'bg-rose-500 animate-pulse' : info ? 'bg-amber-500' : 'bg-emerald-500'}`} />
            <div>
                <p className="font-bold text-lg">{name}</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{target}</p>
            </div>
        </div>
        <div className="text-right">
            <div className={`text-xs font-black mb-1 ${warning ? 'text-rose-400' : info ? 'text-amber-400' : 'text-emerald-400'}`}>{status}</div>
            <div className="text-[10px] text-slate-600 font-bold">{time}</div>
        </div>
    </div>
);
