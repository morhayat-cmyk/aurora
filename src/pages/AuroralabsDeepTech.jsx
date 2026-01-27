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
    Brain,
    Gauge,
    Workflow as WorkflowIcon,
    Search,
    MessageSquare,
    FileCode,
    Lock,
    CheckSquare,
    Users,
    Bot,
    Binary,
    Microchip,
    Radio,
    HardDrive
} from 'lucide-react';

// --- Helpers ---

const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

// --- Shared Design Components ---

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

const TechCard = ({ icon: Icon, title, description, listItems, badge }) => (
    <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-xl hover:border-emerald-500/30 transition-colors duration-300 h-full flex flex-col group">
        <div className="flex items-start justify-between mb-6">
            <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-emerald-500/10 transition-colors">
                {Icon && <Icon className="w-8 h-8 text-emerald-400" />}
            </div>
            {badge && <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">{badge}</span>}
        </div>

        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-300 text-md leading-relaxed mb-6 flex-grow">
            {description}
        </p>

        {listItems && (
            <div className="border-t border-gray-800 pt-6">
                <ul className="space-y-2">
                    {listItems.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0"></span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);

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
        { name: 'Analysis', href: '#analysis' },
        { name: 'Modeling', href: '#modeling' },
        { name: 'Signals', href: '#signals' },
        { name: 'Production', href: '#production' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/90 backdrop-blur-md border-b border-gray-800 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                        <span className="font-bold text-gray-900 text-xl">L</span>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">LOCI <span className="text-gray-500 font-normal text-sm ml-2 hidden sm:inline">Technology</span></span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToId(link.href.replace('#', ''));
                            }}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Button variant="ghost" className="text-sm">Sign In</Button>
                    <Button variant="primary" className="text-sm px-4 py-2" onClick={() => scrollToId('footer-cta')}>Start Free</Button>
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
                        <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                        <Button variant="primary" className="w-full" onClick={() => { setIsOpen(false); scrollToId('footer-cta'); }}>Start Free</Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-gray-950"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                    <div className="inline-flex items-center space-x-2 bg-gray-900/50 border border-gray-700 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm animate-fade-in-up">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-emerald-400">Under the Hood</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Technology <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Deep Dive</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
                        LOCI is built around execution reasoning — the ability to reason about how software will execute on real CPUs and GPUs without running the software.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="primary" onClick={() => scrollToId('footer-cta')}>Read Documentation</Button>
                        <Button variant="secondary">View API Reference</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FoundationsSection = () => {
    return (
        <section className="py-24 bg-gray-900/30 border-y border-gray-800" id="analysis">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Foundations"
                    title="From Source to Reality"
                    subtitle="We analyze what actually runs, not just what you wrote."
                />

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <TechCard
                        icon={FileCode}
                        title="Executable Reality"
                        description="Most analysis tools operate on source code or runtime data. LOCI operates on compiled executables. After build, the executable already encodes the ground truth of execution."
                        listItems={[
                            "Control-flow and execution paths",
                            "Instruction sequences",
                            "Memory allocation behavior",
                            "CPU and GPU kernels"
                        ]}
                    />
                    <TechCard
                        icon={Layers}
                        title="Binary-Level Decomposition"
                        description="LOCI decomposes executables into execution-relevant components. This binary-level view allows reasoning about execution without relying on source-level heuristics or runtime traces."
                        listItems={[
                            "Functions, loops, and kernels",
                            "Control-flow graphs and branches",
                            "Instruction-level sequences",
                            "Memory access patterns"
                        ]}
                        badge="Core Tech"
                    />
                </div>
            </div>
        </section>
    );
};

const ModelingSection = () => {
    return (
        <section className="py-24 bg-gray-950" id="modeling">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="The Engine"
                    title="Execution Models"
                    subtitle="Physics-based reasoning grounded in hardware behavior."
                />

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <TechCard
                        icon={Cpu}
                        title="CPU & GPU Execution Models"
                        description="LOCI applies execution models trained on real CPU and GPU behavior. These models capture the complex interactions of hardware components grounded in measured behavior, not abstract rules."
                        listItems={[
                            "Instruction throughput and latency",
                            "Branching and divergence behavior",
                            "Memory hierarchy effects",
                            "CPU/GPU scheduling"
                        ]}
                    />
                    <TechCard
                        icon={CheckCircle}
                        title="Bounded Prediction"
                        description="Unlike LLMs that generate unconstrained text, LOCI predicts bounded execution outcomes. Because predictions are bounded by executable structure, hallucinated outputs are structurally impossible."
                        listItems={[
                            "Numeric and constrained outputs",
                            "Comparable across builds",
                            "Physically meaningful results",
                            "No hallucinations"
                        ]}
                        badge="Differentiator"
                    />
                </div>
            </div>
        </section>
    );
};

const LearningSection = () => {
    return (
        <section className="py-24 bg-gray-900/30 border-y border-gray-800" id="signals">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Intelligence"
                    title="Learning & Signals"
                    subtitle="Refining accuracy with real-world measurements."
                />

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <TechCard
                        icon={Brain}
                        title="Learning from Measured Execution"
                        description="LOCI’s execution models are refined using measured execution data. This allows LOCI to improve accuracy while remaining grounded in physical reality."
                        listItems={[
                            "CPU and GPU traces",
                            "Performance counters",
                            "Execution timing behavior",
                            "Power behavior"
                        ]}
                    />
                    <TechCard
                        icon={Radio}
                        title="Execution-Aware Signal"
                        description="LOCI produces execution-aware signals designed to be consumed by developers, CI systems, IDEs, and LLM coding agents."
                        listItems={[
                            "Execution-time estimates",
                            "Performance regression indicators",
                            "Efficiency and cost signals",
                            "High-risk execution path identification"
                        ]}
                    />
                </div>
            </div>
        </section>
    );
};

const ApplicationSection = () => {
    return (
        <section className="py-24 bg-gray-950" id="production">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Impact"
                    title="Applied Technology"
                    subtitle="From grounding AI to securing production systems."
                />

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <TechCard
                        icon={Bot}
                        title="Grounding LLM Coding Agents"
                        description="LOCI provides execution-grounded constraints that LLM coding agents can use to guide generation and optimization. Instead of guessing, LLMs operate within execution-aware boundaries."
                        listItems={[
                            "Execution-aware boundaries",
                            "Informed by real CPU/GPU behavior",
                            "Improves generation quality",
                            "Reduces trial-and-error cycles"
                        ]}
                        badge="AI Safety"
                    />
                    <TechCard
                        icon={Server}
                        title="Designed for Production Systems"
                        description="LOCI is designed for performance- and reliability-critical software. The technology prioritizes correctness, predictability, and trust over speculative reasoning."
                        listItems={[
                            "AI inference and training systems",
                            "Networking and infrastructure",
                            "High-performance computing",
                            "Data center and edge workloads"
                        ]}
                        badge="Enterprise"
                    />
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-950 border-t border-gray-900 pt-16 pb-8" id="footer-cta">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
                    <div className="max-w-xl mb-8 md:mb-0">
                        <h2 className="text-3xl font-bold text-white mb-4">Explore the Tech</h2>
                        <p className="text-gray-400 text-lg">
                            Dive deeper into our execution reasoning architecture.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="primary">Read Whitepaper</Button>
                        <Button variant="secondary">API Docs</Button>
                    </div>
                </div>

                <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Aurora Labs. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <span>Terms</span>
                        <span>Privacy</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// --- Main App Component ---

const TechnologyDeepDiveApp = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-emerald-500/30">
            <Navbar />
            <Hero />
            <FoundationsSection />
            <ModelingSection />
            <LearningSection />
            <ApplicationSection />
            <Footer />
        </div>
    );
};

export default TechnologyDeepDiveApp;
