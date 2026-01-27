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
    CheckSquare
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

const Card = ({ icon: Icon, title, description, badge, listItems }) => (
    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl hover:border-emerald-500/30 transition-colors duration-300 group h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-emerald-500/10 transition-colors">
                {Icon && <Icon className="w-6 h-6 text-emerald-400" />}
            </div>
            {badge && <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">{badge}</span>}
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <div className="text-gray-400 text-sm leading-relaxed flex-grow">
            {description && <p className="mb-4">{description}</p>}
            {listItems && (
                <ul className="space-y-2 mt-2">
                    {listItems.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0"></span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);

const PipelineStep = ({ step, title, active }) => (
    <div className={`flex flex-col items-center relative z-10 ${active ? 'opacity-100' : 'opacity-60'} transition-opacity duration-300`}>
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 border-2 transition-all duration-300 ${active ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-110' : 'bg-gray-900 border-gray-700 text-gray-500'}`}>
            {step}
        </div>
        <span className={`font-mono text-xs md:text-sm ${active ? 'text-emerald-400 font-bold' : 'text-gray-500'}`}>{title}</span>
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
        { name: 'The Problem', href: '#problem' },
        { name: 'Solution', href: '#solution' },
        { name: 'Use Cases', href: '#use-cases' },
        { name: 'Workflow', href: '#workflow' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/90 backdrop-blur-md border-b border-gray-800 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                        <span className="font-bold text-gray-900 text-xl">L</span>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">LOCI <span className="text-gray-500 font-normal text-sm ml-2 hidden sm:inline">Playbook</span></span>
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
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-gray-950"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                    <div className="inline-flex items-center space-x-2 bg-gray-900/50 border border-gray-700 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm animate-fade-in-up">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-emerald-400">LOCI Playbook</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Execution Reasoning <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">As You Build Software</span>
                    </h1>

                    <h2 className="text-xl md:text-2xl text-gray-200 mb-6 font-medium max-w-3xl">
                        Grounding LLM coding agents and validating execution behavior before tests run.
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mt-8">
                        <Button variant="primary" className="w-full sm:w-auto h-12 px-8 flex items-center justify-center group" onClick={() => scrollToId('footer-cta')}>
                            Start Free
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="secondary" className="w-full sm:w-auto h-12 px-8 flex items-center justify-center">
                            Book a Demo
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProblemSection = () => {
    return (
        <section className="py-20 bg-gray-900/30 border-y border-gray-800" id="problem">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20">
                            The Problem
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Signal Arrives <span className="text-gray-500">Too Late.</span>
                        </h2>
                        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                            Modern software teams move fast, but execution insight arrives late. Performance regressions, inefficiencies, and availability risks are usually discovered during testing, benchmarking, or production.
                        </p>
                        <p className="text-lg text-gray-400 leading-relaxed border-l-2 border-emerald-500/30 pl-4">
                            LLM coding agents accelerate development, but without execution context they often generate code that looks correct yet behaves poorly at runtime.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 flex items-start space-x-4 opacity-70">
                            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-white font-semibold">Expensive Fixes</h3>
                                <p className="text-sm text-gray-500">Issues found in production are costly and disruptive to fix.</p>
                            </div>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 flex items-start space-x-4 opacity-70">
                            <Brain className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-white font-semibold">Ungrounded AI</h3>
                                <p className="text-sm text-gray-500">Generative code lacks physics-based awareness of hardware.</p>
                            </div>
                        </div>
                        <div className="bg-emerald-900/10 p-6 rounded-lg border border-emerald-500/30 flex items-start space-x-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                            <Clock className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-white font-semibold">The Need</h3>
                                <p className="text-sm text-gray-400">Teams need execution truth earlier — while software is still being built.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const WhatIsLoci = () => {
    return (
        <section className="py-24 bg-gray-950" id="solution">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Solution"
                    title="What LOCI Is"
                    subtitle="LOCI is an execution-aware AI system that provides execution reasoning for software teams."
                />

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <Card
                        icon={Activity}
                        title="Execution Reasoning"
                        description="As software is built, LOCI analyzes compiled executables and reasons about how code will run on real CPUs and GPUs — without executing the software."
                    />
                    <Card
                        icon={Layers}
                        title="Binary Decomposition"
                        description="LOCI decomposes the binary and applies execution models trained on real CPU and GPU behavior. It reasons about control flow, instruction sequences, and memory access."
                    />
                    <Card
                        icon={CheckSquare}
                        title="No Hallucinations"
                        description="Unlike LLMs trained on text, LOCI predicts bounded, inspectable execution outcomes grounded in real hardware measurements. Results are physically meaningful."
                    />
                </div>
            </div>
        </section>
    );
};

const Workflow = () => {
    return (
        <section className="py-20 bg-gray-900/30 border-y border-gray-800" id="workflow">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Integration"
                    title="Where LOCI Fits"
                    subtitle="LOCI operates after build and before tests, giving teams early execution insight."
                />

                <div className="relative max-w-5xl mx-auto mt-12 mb-16">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-gray-800 via-emerald-900/50 to-gray-800 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative">
                        <PipelineStep step={<Code className="w-5 h-5" />} title="Code" active={false} />
                        <PipelineStep step={<Server className="w-5 h-5" />} title="Build" active={false} />
                        <PipelineStep step={<Activity className="w-8 h-8 animate-pulse" />} title="LOCI Signal" active={true} />
                        <PipelineStep step={<Zap className="w-5 h-5" />} title="Test" active={false} />
                        <PipelineStep step={<GitBranch className="w-5 h-5" />} title="Merge" active={false} />
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                        <div className="text-emerald-400 font-bold mb-1">No instrumentation</div>
                        <p className="text-sm text-gray-500">Works on the binary itself</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                        <div className="text-emerald-400 font-bold mb-1">No runtime overhead</div>
                        <p className="text-sm text-gray-500">Pure static analysis speed</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                        <div className="text-emerald-400 font-bold mb-1">No workflow disruption</div>
                        <p className="text-sm text-gray-500">Integrates via API & MCP</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const UseCases = () => {
    const useCases = [
        {
            icon: Brain,
            title: "Grounding LLM Agents",
            description: "LOCI provides execution-grounded signal that constrains generation within execution limits and prevents performance-regressing suggestions.",
            badge: "AI Safety"
        },
        {
            icon: Clock,
            title: "Performance Regressions",
            description: "Flags performance risks early, including latency, throughput regressions, tail behavior amplification, and critical-path expansion.",
        },
        {
            icon: Zap,
            title: "Power & Thermal Efficiency",
            description: "Reasons about power spikes, inefficient CPU/GPU utilization, and thermal stress introduced by code changes.",
        },
        {
            icon: Lock,
            title: "Security-Critical Paths",
            description: "Highlights execution paths where rare control-flow paths dominate behavior or memory access patterns are fragile.",
        },
        {
            icon: BarChart3,
            title: "Project KPI Validation",
            description: "Validates project-defined KPIs: latency targets, utilization limits, and power budgets. Violations are flagged early.",
            badge: "KPIs"
        },
        {
            icon: Shield,
            title: "Functional Safety",
            description: "For automotive systems, LOCI analyzes worst-case execution paths and variability to support functional safety processes.",
        }
    ];

    return (
        <section className="py-24 bg-gray-950" id="use-cases">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Applications"
                    title="Use Cases"
                    subtitle="Applied execution reasoning across the development lifecycle."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {useCases.map((uc, i) => (
                        <Card key={i} {...uc} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const InteractionModes = () => {
    return (
        <section className="py-24 bg-gray-900/30 border-y border-gray-800">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Workflow"
                    title="How Teams Interact with LOCI"
                    subtitle="Execution reasoning available where developers work."
                />

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-xl border border-gray-800">
                        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                            <Github className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">GitHub-Native</h3>
                        <p className="text-gray-400 text-sm">Execution reasoning appears in pull request comments, build feedback, and repository-level insights.</p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-xl border border-gray-800">
                        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Ask LOCI Directly</h3>
                        <p className="text-gray-400 text-sm">Query LOCI by mentioning @LOCI-DEV in PRs. Also accessible via MCP and APIs for programmatic interaction.</p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-xl border border-gray-800">
                        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                            <Terminal className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">CI, IDE & Tooling</h3>
                        <p className="text-gray-400 text-sm">Integrates with CI pipelines, IDEs, and LLM coding agents. Signal available everywhere.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Adoption = () => {
    return (
        <section className="py-24 bg-gray-950">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto">
                    <div className="md:w-1/2">
                        <SectionHeading
                            align="left"
                            badge="Adoption"
                            title="Why Teams Adopt LOCI"
                            subtitle="LOCI restores signal where engineering pressure is highest."
                        />
                        <ul className="space-y-4">
                            {[
                                "Gain execution insight earlier",
                                "Reduce late-stage surprises",
                                "Improve confidence in LLM-assisted development",
                                "Validate performance and availability assumptions",
                                "Fit seamlessly into existing workflows"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-gray-300">
                                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:w-1/2 bg-gray-900 border border-gray-800 rounded-xl p-8">
                        <h3 className="text-xl font-bold text-white mb-4">Proof, Not Promises</h3>
                        <p className="text-gray-400 mb-6">
                            LOCI operates on real-world software. It is applied to production-grade open-source projects such as <strong>OpenSSL</strong> and <strong>LLaMA.cpp</strong> and is used by teams across automotive, embedded, and infrastructure domains.
                        </p>
                        <div className="p-4 bg-gray-950 rounded border border-gray-800 text-sm text-emerald-400 font-mono">
                            Outputs are inspectable, explainable, and grounded in execution behavior.
                        </div>
                    </div>
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
                        <h2 className="text-3xl font-bold text-white mb-4">Get Started</h2>
                        <p className="text-gray-400 text-lg">
                            See how LOCI brings execution reasoning to LLM coding agents — as you build your software.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="primary">Start Free</Button>
                        <Button variant="secondary">Book a Demo</Button>
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

const LociPlaybook = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-emerald-500/30">
            <Navbar />
            <Hero />
            <ProblemSection />
            <WhatIsLoci />
            <Workflow />
            <UseCases />
            <InteractionModes />
            <Adoption />
            <Footer />
        </div>
    );
};

export default LociPlaybook;
