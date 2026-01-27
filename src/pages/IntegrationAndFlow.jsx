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
    HardDrive,
    Eye,
    FileText,
    Globe,
    Award,
    Link,
    GitCommit,
    Monitor
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

const IntegrationCard = ({ icon: Icon, title, description, listItems, badge }) => (
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
        { name: 'GitHub', href: '#github' },
        { name: 'CI/CD', href: '#cicd' },
        { name: 'IDE', href: '#ide' },
        { name: 'AI Grounding', href: '#ai' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/90 backdrop-blur-md border-b border-gray-800 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                        <span className="font-bold text-gray-900 text-xl">L</span>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">LOCI <span className="text-gray-500 font-normal text-sm ml-2 hidden sm:inline">Integrations</span></span>
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
                        <span className="text-sm font-medium text-emerald-400">Embedded Workflow</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Integrations & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Workflow</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
                        LOCI integrates directly into modern software development workflows, providing execution reasoning as code is built — without disrupting how teams write, review, or ship software.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="primary" onClick={() => scrollToId('footer-cta')}>View Documentation</Button>
                        <Button variant="secondary">Browse Marketplace</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const CoreIntegrationsSection = () => {
    return (
        <section className="py-24 bg-gray-900/30 border-y border-gray-800" id="github">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Seamless"
                    title="Native Integration"
                    subtitle="No new processes. No instrumentation. No runtime overhead."
                />

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <IntegrationCard
                        icon={Github}
                        title="GitHub-Native"
                        description="As code is pushed and built, LOCI analyzes compiled artifacts and surfaces execution-level signal directly where developers work. Developers see execution reasoning in context, without leaving GitHub."
                        listItems={[
                            "Pull request comments",
                            "Commit and build feedback",
                            "Repository-level insights",
                            "Direct context integration"
                        ]}
                        badge="Native"
                    />
                    <IntegrationCard
                        icon={Server}
                        title="CI/CD Pipelines"
                        description="LOCI plugs into existing CI pipelines via lightweight APIs and MCP. Teams get execution-grounded signal early, reducing wasted test cycles and late-stage surprises."
                        listItems={[
                            "Works after build, before tests",
                            "No test infra changes",
                            "No performance impact",
                            "Early execution signal"
                        ]}
                        id="cicd"
                    />
                </div>
            </div>
        </section>
    );
};

const WorkflowSection = () => {
    return (
        <section className="py-20 bg-gray-950" id="workflow">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Process"
                    title="Where LOCI Fits"
                    subtitle="Adding execution reasoning exactly where it’s most valuable."
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

                <div className="max-w-2xl mx-auto text-center">
                    <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-800">
                        <div className="text-emerald-400 font-bold mb-2 text-xl">&lt; 5-Minute Integration</div>
                        <p className="text-gray-400">
                            Teams can enable LOCI in existing repositories and pipelines with minimal setup. No code changes. No instrumentation. No long onboarding.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const DeveloperToolsSection = () => {
    return (
        <section className="py-24 bg-gray-900/30 border-y border-gray-800" id="ide">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Tooling"
                    title="Developer Tools"
                    subtitle="Catch issues early — while code is still fresh."
                />

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <IntegrationCard
                        icon={Monitor}
                        title="IDE & Local Dev"
                        description="LOCI integrates with IDEs and local developer workflows, enabling immediate execution reasoning during development."
                        listItems={[
                            "Terminal and IDE feedback",
                            "Local build analysis",
                            "Immediate reasoning",
                            "Faster iterations"
                        ]}
                    />
                    <IntegrationCard
                        icon={Bot}
                        title="Grounding AI Agents"
                        description="LOCI integrates with LLM-based coding tools (Cursor, Copilot, Gemini) to ground generation with execution reasoning. It makes them more reliable."
                        listItems={[
                            "Avoids regression code",
                            "Stays within project KPIs",
                            "Aligns with real execution",
                            "Enhances AI reliability"
                        ]}
                        badge="AI Ready"
                        id="ai"
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
                        <h2 className="text-3xl font-bold text-white mb-4">Integrate in Minutes</h2>
                        <p className="text-gray-400 text-lg">
                            Start getting execution reasoning in your workflow today.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="primary">Start Free</Button>
                        <Button variant="secondary">Read Docs</Button>
                    </div>
                </div>

                <div className="border-t border-gray-950 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
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

const IntegrationsAndWorkflowApp = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-emerald-500/30">
            <Navbar />
            <Hero />
            <CoreIntegrationsSection />
            <WorkflowSection />
            <DeveloperToolsSection />
            <Footer />
        </div>
    );
};

export default IntegrationsAndWorkflowApp;
