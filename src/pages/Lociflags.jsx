import React, { useState, useEffect } from 'react';
import {
    Terminal,
    Cpu,
    Zap,
    Shield,
    Code,
    GitBranch,
    Activity,
    CheckCircle,
    ArrowRight,
    Menu,
    X,
    Server,
    Database,
    Layers,
    BarChart3,
    Clock,
    AlertTriangle,
    Github,
    ChevronDown,
    ChevronUp,
    Play
} from 'lucide-react';

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";
    const variants = {
        primary: "bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
        secondary: "bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700 focus:ring-gray-500",
        outline: "bg-transparent border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10",
        ghost: "text-gray-400 hover:text-white hover:bg-gray-800"
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

const SectionHeading = ({ badge, title, subtitle, align = 'center' }) => (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
        {badge && (
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20">
                {badge}
            </span>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            {title}
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
        </p>
    </div>
);

const Card = ({ icon: Icon, title, description, badge }) => (
    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl hover:border-emerald-500/30 transition-colors duration-300 group h-full">
        <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-emerald-500/10 transition-colors">
                <Icon className="w-6 h-6 text-emerald-400" />
            </div>
            {badge && <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">{badge}</span>}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
);

// --- Helpers ---

const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

// --- Sections ---

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'What is Loci', href: '#what-is-loci' },
        { name: 'Capabilities', href: '#capabilities' },
        { name: 'Integration', href: '#integration' },
        { name: 'Playground', href: '#playground' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/90 backdrop-blur-md border-b border-gray-800 py-3 shadow-lg' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                        <span className="font-bold text-gray-900 text-xl">L</span>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">LOCI FLAGS</span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToId(link.href.replace('#', ''));
                            }}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Button variant="outline" className="text-sm">Docs</Button>
                    <Button variant="primary" className="text-sm px-4 py-2">Get Started</Button>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-300 hover:text-white">
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-gray-900 border-b border-gray-800 absolute w-full px-6 py-4 flex flex-col space-y-4 shadow-2xl">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(false);
                                scrollToId(link.href.replace('#', ''));
                            }}
                            className="text-gray-300 hover:text-white py-2 block"
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="pt-4 border-t border-gray-800 flex flex-col space-y-3">
                        <Button variant="outline" className="w-full">Docs</Button>
                        <Button variant="primary" className="w-full">Get Started</Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gray-950">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-gray-950"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center space-x-2 bg-gray-900/50 border border-gray-700 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-emerald-400">LOCI: Execution-Aware Signaling</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Reason About <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Execution Risk</span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                        LOCI provides the missing layer for software teams: deep visibility into how compiled code behaves on target hardware—before it ever runs in production.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <Button variant="primary" className="w-full sm:w-auto h-12 px-8 flex items-center justify-center group" onClick={() => scrollToId('what-is-loci')}>
                            Explore Loci
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="secondary" className="w-full sm:w-auto h-12 px-8 flex items-center justify-center">
                            <Github className="mr-2 w-4 h-4" />
                            View Source
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const WhatIsLoci = () => {
    return (
        <section className="py-24 bg-gray-950 border-t border-gray-800" id="what-is-loci">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Introduction"
                    title="What is LOCI?"
                    subtitle="LOCI is a binary-level reasoning engine that predicts execution behavior without traditional tests."
                />

                <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                    <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                        <p>
                            Most AI coding tools and static analyzers stop at syntax. They can tell you if a function is valid, but they can't tell you if it will trigger a thermal spike or miss a 50ms latency KPI.
                        </p>
                        <p>
                            <strong className="text-emerald-400">LOCI fills this gap.</strong> By decomposing compiled binaries and applying models trained on real hardware traces, LOCI provides physically meaningful predictions about latency, memory pressure, and power consumption.
                        </p>
                        <div className="pt-4">
                            <div className="flex items-center space-x-3 text-white mb-2">
                                <CheckCircle className="text-emerald-500 w-5 h-5" />
                                <span>Structural execution analysis</span>
                            </div>
                            <div className="flex items-center space-x-3 text-white mb-2">
                                <CheckCircle className="text-emerald-500 w-5 h-5" />
                                <span>Hardware-specific modeling</span>
                            </div>
                            <div className="flex items-center space-x-3 text-white">
                                <CheckCircle className="text-emerald-500 w-5 h-5" />
                                <span>Zero-overhead prediction</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Layers className="w-40 h-40" />
                        </div>
                        <div className="relative">
                            <div className="text-emerald-400 font-mono text-sm mb-4">LOCI ARCHITECTURE</div>
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                    <h4 className="text-white font-semibold mb-1">Binary Decomposition</h4>
                                    <p className="text-sm text-gray-500">CFG extraction & instruction mapping</p>
                                </div>
                                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                    <h4 className="text-white font-semibold mb-1">Constraint Modeling</h4>
                                    <p className="text-sm text-gray-500">Hardware-aware execution bounds</p>
                                </div>
                                <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                    <h4 className="text-emerald-400 font-semibold mb-1">Reasoning Engine</h4>
                                    <p className="text-sm text-emerald-500/70">Probabilistic execution signaling</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Features = () => {
    const features = [
        {
            icon: Clock,
            title: "Performance Regressions",
            description: "Detect latency spikes (p95, p99) and throughput degradation before deployment.",
            badge: "Critical"
        },
        {
            icon: Cpu,
            title: "Hardware Inefficiency",
            description: "Flag excessive instruction costs, GPU kernel divergence, and cache-unfriendly patterns.",
        },
        {
            icon: Zap,
            title: "Power & Cost",
            description: "Identify power spikes and execution paths that stress thermal limits or increase cloud costs.",
        },
        {
            icon: AlertTriangle,
            title: "High-Risk Paths",
            description: "Highlight rare but expensive branches and worst-case control flow paths.",
        },
        {
            icon: Shield,
            title: "KPI Validation",
            description: "Automatically enforce project budgets for latency, memory, and utilization.",
            badge: "Automated"
        },
        {
            icon: Database,
            title: "LLM Grounding",
            description: "Provide execution-aware signals to Cursor, Copilot, and Gemini to prevent bad code generation.",
            badge: "New"
        }
    ];

    return (
        <section className="py-24 bg-gray-950 border-t border-gray-800" id="capabilities">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Capabilities"
                    title="What LOCI Flags"
                    subtitle="LOCI reasons about execution risks that static analysis misses and testing catches too late."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <Card key={i} {...f} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const HowToIntegrate = () => {
    return (
        <section className="py-24 bg-gray-900/30 border-y border-gray-800" id="integration">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Getting Started"
                    title="How to Integrate LOCI"
                    subtitle="Getting LOCI up and running is designed to be seamless with your existing tools."
                />

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="flex flex-col items-center text-center p-8 bg-gray-900 border border-gray-800 rounded-2xl">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                            <span className="text-emerald-400 font-bold">1</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4">Install CLI</h4>
                        <p className="text-gray-400 text-sm">
                            Use npm or brew to install the LOCI toolbelt to analyze binaries locally or in CI.
                        </p>
                        <div className="mt-6 w-full p-3 bg-black rounded font-mono text-xs text-emerald-400 border border-gray-800 text-left">
                            $ npm install -g loci-cli
                        </div>
                    </div>

                    <div className="flex flex-col items-center text-center p-8 bg-gray-900 border border-gray-800 rounded-2xl">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                            <span className="text-emerald-400 font-bold">2</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4">Connect MCP</h4>
                        <p className="text-gray-400 text-sm">
                            Connect our Model Context Protocol server to your IDE or LLM agent.
                        </p>
                        <Button variant="outline" className="mt-6 py-1.5 px-4 text-xs">View MCP Setup</Button>
                    </div>

                    <div className="flex flex-col items-center text-center p-8 bg-gray-900 border border-gray-800 rounded-2xl">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                            <span className="text-emerald-400 font-bold">3</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4">Set Thresholds</h4>
                        <p className="text-gray-400 text-sm">
                            Define your latency and power budgets in a simple `loci.yaml` file.
                        </p>
                        <div className="mt-6 w-full p-3 bg-black rounded font-mono text-xs text-gray-500 border border-gray-800 text-left">
                            <span className="text-blue-400">kpis:</span><br />
                            <span className="pl-2">- </span><span className="text-emerald-400">latency_p99: 50ms</span><br />
                            <span className="pl-2">- </span><span className="text-emerald-400">power_max: 5W</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Playground = () => {
    return (
        <section className="py-24 bg-gray-950" id="playground">
            <div className="container mx-auto px-6">
                <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20">
                            Coming Soon
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">LOCI Playground</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Upload a binary and see the execution graph in real-time. Test your assumptions before you merge.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Button variant="primary" className="flex items-center space-x-2 opacity-50 cursor-not-allowed">
                                <Play className="w-4 h-4" />
                                <span>Launch Playground</span>
                            </Button>
                            <Button variant="ghost">Get Notified</Button>
                        </div>
                    </div>
                    {/* Abstract background blobs */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-950 border-t border-gray-900 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
                            <span className="font-bold text-gray-900 text-xs">L</span>
                        </div>
                        <span className="font-bold text-white">LOCI FLAGS</span>
                    </div>
                    <p>&copy; {new Date().getFullYear()} Aurora Labs. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

// --- Main App Component ---

const Lociflags = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-emerald-500/30">
            <Navbar />
            <Hero />
            <WhatIsLoci />
            <Features />
            <HowToIntegrate />
            <Playground />
            <Footer />
        </div>
    );
};

export default Lociflags;
