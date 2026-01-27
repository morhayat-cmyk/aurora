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
    CheckSquare
} from 'lucide-react';

// --- Helpers ---

const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

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

const Card = ({ icon: Icon, title, description, badge, listItems, id }) => (
    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl hover:border-emerald-500/30 transition-colors duration-300 group h-full flex flex-col" id={id}>
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
        { name: 'Product', href: '#what-loci-does' },
        { name: 'Workflow', href: '#workflow' },
        { name: 'Validation', href: '#validation' },
        { name: 'Integrations', href: '#integrations' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/90 backdrop-blur-md border-b border-gray-800 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                        <span className="font-bold text-gray-900 text-xl">L</span>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">LOCI</span>
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
                    <Button variant="primary" className="text-sm px-4 py-2" onClick={() => scrollToId('get-started')}>Start Free</Button>
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
                        <Button variant="primary" className="w-full" onClick={() => { setIsOpen(false); scrollToId('get-started'); }}>Start Free</Button>
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
                        <span className="text-sm font-medium text-emerald-400">Execution reasoning for modern teams</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Execution-Aware AI for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Software Teams</span>
                    </h1>

                    <h2 className="text-xl md:text-2xl text-gray-200 mb-6 font-medium">
                        Execution reasoning to ground LLM-generated code and validate performance, power, and bugs early.
                    </h2>

                    <p className="text-lg text-gray-400 mb-10 max-w-3xl leading-relaxed">
                        LOCI provides execution reasoning trained on real CPU and GPU software runtime behavior, delivered via GitHub, MCP, and APIs.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <Button variant="primary" className="w-full sm:w-auto h-12 px-8 flex items-center justify-center group" onClick={() => scrollToId('get-started')}>
                            Start Free
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="secondary" className="w-full sm:w-auto h-12 px-8 flex items-center justify-center">
                            Book a Demo
                        </Button>
                        <Button variant="outline" className="w-full sm:w-auto h-12 px-8 flex items-center justify-center border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600">
                            <Github className="mr-2 w-4 h-4" />
                            See LOCI in action
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const WhatLociDoes = () => {
    return (
        <section className="py-20 bg-gray-900/30 border-y border-gray-800" id="what-loci-does">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20">
                            Core Concept
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            LOCI provides execution reasoning, <span className="text-gray-500">not guesswork.</span>
                        </h2>
                        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                            As your software is built, LOCI analyzes compiled executables and reasons about how they will execute on real CPUs and GPUs — without running the software.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 flex items-start space-x-4 opacity-50">
                            <X className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-white font-semibold">This is not log analysis.</h3>
                                <p className="text-sm text-gray-500">We don't just parse text outputs.</p>
                            </div>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 flex items-start space-x-4 opacity-50">
                            <X className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-white font-semibold">This is not code summarization.</h3>
                                <p className="text-sm text-gray-500">We don't just read syntax.</p>
                            </div>
                        </div>
                        <div className="bg-emerald-900/10 p-6 rounded-lg border border-emerald-500/30 flex items-start space-x-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                            <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-white font-semibold">This is execution-aware reasoning.</h3>
                                <p className="text-sm text-gray-400">Physics-based prediction of runtime behavior.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Workflow = () => {
    return (
        <section className="py-20 bg-gray-950" id="workflow">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Workflow"
                    title="Where LOCI Fits"
                    subtitle="Earlier insight. Fewer surprises."
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
                        <div className="text-emerald-400 font-bold mb-1">No new pipelines</div>
                        <p className="text-sm text-gray-500">Fits your existing flow</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                        <div className="text-emerald-400 font-bold mb-1">No instrumentation</div>
                        <p className="text-sm text-gray-500">Zero code changes required</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                        <div className="text-emerald-400 font-bold mb-1">No runtime overhead</div>
                        <p className="text-sm text-gray-500">Pure static analysis speed</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Differentiators = () => {
    return (
        <section className="py-24 bg-gray-900/20 border-t border-gray-800" id="validation">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Differentiation"
                    title="Why LOCI Is Different"
                    subtitle="Grounding AI and validating KPIs with execution truth."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <Card
                        icon={Brain}
                        title="Execution truth for LLM coding agents"
                        description="Unlike LLMs that generate unconstrained text, LOCI predicts bounded execution-time values derived from real CPU and GPU measurements."
                        listItems={[
                            "Grounds tools like Cursor & Copilot",
                            "Enables safer code generation",
                            "Prevents hallucinated efficiency"
                        ]}
                    />

                    {/* Feature 2 */}
                    <Card
                        icon={Gauge}
                        title="Performance & Project KPI Validation"
                        description="The same execution reasoning is used to validate project KPIs early in the development process:"
                        listItems={[
                            "Latency and throughput regressions",
                            "CPU and GPU inefficiencies",
                            "Power and execution cost increases",
                            "Violations of performance boundaries"
                        ]}
                        badge="KPI-Safe"
                    />

                    {/* Feature 3 */}
                    <Card
                        icon={Github}
                        title="GitHub-native. Git-like platform ready."
                        description="Integrates in minutes via MCP and APIs across CI, IDEs, compilers, and LLM-based code tools."
                        listItems={[
                            "Integrates in minutes",
                            "Works with CI/CD",
                            "Native IDE support"
                        ]}
                        id="integrations"
                    />
                </div>
            </div>
        </section>
    );
};

const Proof = () => {
    return (
        <section className="py-24 bg-gray-950 border-y border-gray-800" id="proof">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-white mb-6">Proof, Not Promises</h2>
                        <p className="text-gray-400 text-lg mb-8">
                            LOCI operates on real code, in the open. We provide inspectable results, not black-box claims.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center text-gray-300">
                                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                                <span>Active on GitHub</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                                <span>Applied to production-grade projects like <strong className="text-white">OpenSSL</strong> and <strong className="text-white">LLaMA.cpp</strong></span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                                <span>Inspectable results</span>
                            </li>
                        </ul>
                    </div>

                    <div className="md:w-1/2 grid grid-cols-2 gap-4 w-full">
                        <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl flex flex-col items-center justify-center text-center hover:border-emerald-500/30 transition-all">
                            <div className="text-4xl font-bold text-white mb-2">OpenSSL</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest">Target Project</div>
                        </div>
                        <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl flex flex-col items-center justify-center text-center hover:border-emerald-500/30 transition-all">
                            <div className="text-4xl font-bold text-white mb-2">LLaMA</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest">cpp Implementation</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const EngineeringConfidence = () => {
    const benefits = [
        {
            title: "Fewer late-stage regressions",
            icon: AlertTriangle,
        },
        {
            title: "Faster code reviews with execution signal",
            icon: Clock,
        },
        {
            title: "Reduced test cycles and rework",
            icon: WorkflowIcon,
        },
        {
            title: "More predictable delivery timelines",
            icon: BarChart3,
        }
    ];

    return (
        <section className="py-24 bg-gray-900/30">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Results"
                    title="Engineering Confidence, Earlier"
                    subtitle="LOCI restores signal where engineering pressure is highest."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, idx) => (
                        <div key={idx} className="bg-gray-900 border border-gray-800 p-6 rounded-lg text-center hover:bg-gray-800 transition-colors">
                            <div className="bg-emerald-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <benefit.icon className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-white font-medium">{benefit.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-950 border-t border-gray-900 pt-16 pb-8" id="get-started">
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

                <div className="grid md:grid-cols-4 gap-12 mb-12 border-t border-gray-900 pt-12">
                    <div className="col-span-1">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                                <span className="font-bold text-gray-900">L</span>
                            </div>
                            <span className="text-xl font-bold text-white">LOCI</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-6">
                            Execution-aware reasoning for modern software teams.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#what-loci-does" onClick={(e) => { e.preventDefault(); scrollToId('what-loci-does'); }} className="hover:text-emerald-400">GitHub App</a></li>
                            <li><a href="#integrations" onClick={(e) => { e.preventDefault(); scrollToId('integrations'); }} className="hover:text-emerald-400">MCP Server</a></li>
                            <li><a href="#integrations" onClick={(e) => { e.preventDefault(); scrollToId('integrations'); }} className="hover:text-emerald-400">API</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-emerald-400">Documentation</a></li>
                            <li><a href="#proof" onClick={(e) => { e.preventDefault(); scrollToId('proof'); }} className="hover:text-emerald-400">Case Studies</a></li>
                            <li><a href="#" className="hover:text-emerald-400">GitHub</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-emerald-400">About</a></li>
                            <li><a href="#" className="hover:text-emerald-400">Contact</a></li>
                            <li><a href="#" className="hover:text-emerald-400">Privacy</a></li>
                        </ul>
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

const Auroralabs2 = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-emerald-500/30">
            <Navbar />
            <Hero />
            <WhatLociDoes />
            <Workflow />
            <Differentiators />
            <Proof />
            <EngineeringConfidence />
            <Footer />
        </div>
    );
};

export default Auroralabs2;
