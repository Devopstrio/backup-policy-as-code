import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const outfit = Outfit({ subsets: ['latin'] });

export default function BPacLanding() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className={`min-h-screen bg-[#020617] text-slate-100 ${inter.className}`}>
            <Head>
                <title>BPac | Enterprise Backup Governance</title>
                <meta name="description" content="Backup Policy as Code for Global Estates" />
            </Head>

            {/* Premium Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-[#020617]/90 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40">
                            <span className="font-extrabold text-2xl">P</span>
                        </div>
                        <div>
                            <span className={`${outfit.className} text-2xl font-black tracking-tighter`}>BPAC</span>
                            <span className="block text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Policy Engine</span>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-slate-400">
                        <a href="#governance" className="hover:text-indigo-400 transition-all">Governance</a>
                        <a href="#compliance" className="hover:text-indigo-400 transition-all">Compliance</a>
                        <a href="#remdiation" className="hover:text-indigo-400 transition-all">Remediation</a>
                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl transition-all shadow-xl shadow-indigo-600/20"
                        >
                            Portal Login
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative pt-48 pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />

                <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-300 uppercase tracking-widest mb-10">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
                        Zero-Touch Governance
                    </div>
                    <h1 className={`${outfit.className} text-7xl md:text-8xl font-black mb-10 leading-[0.95] tracking-tight`}>
                        Your Backup Rules, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Defined as Code.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed">
                        Automate backup governance across Azure, AWS, and GCP. Define RPO/RTO mandates in YAML, and let our engine handle the enforcement, drift detection, and remediation.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="w-full sm:w-auto px-10 py-5 bg-indigo-600 rounded-2xl font-bold text-lg hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/20">
                            Get Started with Packs
                        </button>
                        <button className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                            View Enterprise Demo
                        </button>
                    </div>
                </div>
            </main>

            <section className="max-w-7xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { title: 'Policy Packs', desc: 'Pre-defined Gold/Silver/Bronze tiers for rapid onboarding.', icon: '📦' },
                    { title: 'Drift Detection', desc: 'Hourly scans to detect unauthorized policy changes.', icon: '🕵️' },
                    { title: 'Auto-Remediation', desc: 'Instant rollback of non-compliant infrastructure.', icon: '⚡' },
                    { title: 'Audit Evidence', desc: 'Automated evidence generation for ISO/SOC2 audits.', icon: '🛡️' }
                ].map((f, i) => (
                    <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/[0.08] transition-all">
                        <div className="text-4xl mb-6">{f.icon}</div>
                        <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                        <p className="text-slate-500 text-sm">{f.desc}</p>
                    </div>
                ))}
            </section>

            <footer className="py-12 border-t border-white/5 text-center text-slate-600 text-xs font-bold uppercase tracking-widest">
                © 2026 devopstrio bpac - enterprise backup policy as code
            </footer>
        </div>
    );
}
