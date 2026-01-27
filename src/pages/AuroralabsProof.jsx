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
    Award
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

const ProofCard = ({ icon: Icon, title, description, listItems, badge }) => (
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
        { name: 'Verification', href: '#verification' },
        { name: 'Real World', href: '#real-world' },
        { name: 'Openness', href: '#openness' },
        { name: 'Why Trust', href: '#trust' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/90 backdrop-blur-md border-b border-gray-800 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                        <span className="font-bold text-gray-900 text-xl">L</span>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">LOCI <span className="text-gray-500 font-normal text-sm ml-2 hidden sm:inline">Proof & Credibility</span></span>
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
                        <span className="text-sm font-medium text-emerald-400">Verifiable Execution</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Proof & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Credibility</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
                        LOCI is built to earn trust through observable behavior, not marketing claims. Every signal is grounded in execution reasoning derived from real CPU and GPU behavior.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="primary" onClick={() => scrollToId('verification')}>View Case Studies</Button>
                        <Button variant="secondary">Inspect on GitHub</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const VerificationSection = () => {
    return (
        <section className="py-24 bg-gray-900/30 border-y border-gray-800" id="verification">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Inspectable"
                    title="Results You Can Verify"
                    subtitle="No black boxes. Just execution truth."
                />

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <ProofCard
                        icon={Eye}
                        title="Inspectable Results"
                        description="LOCI does not produce opaque scores or black-box outputs. Engineers can inspect results directly and understand what changed and why."
                        listItems={[
                            "Execution paths involved",
                            "Contributing functions and loops",
                            "Performance impact explanation",
                            "Build-over-build diffs"
                        ]}
                    />
                    <ProofCard
                        icon={Code}
                        title="Used on Real Code"
                        description="LOCI operates on real-world software, not synthetic examples. It is actively used to analyze large open-source projects and performance-critical systems."
                        listItems={[
                            "OpenSSL",
                            "LLaMA.cpp",
                            "Production-grade codebases",
                            "Performance-critical systems"
                        ]}
                        badge="Real World"
                    />
                </div>
            </div>
        </section>
    );
};

const WorkflowSection = () => {
    return (
        <section className="py-24 bg-gray-950" id="real-world">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="For Engineers"
                    title="Designed for Reality"
                    subtitle="Built for daily use in real engineering workflows."
                />

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <ProofCard
                        icon={FileText}
                        title="Designed for Engineers"
                        description="LOCI is designed for real engineering workflows, avoiding free-form or speculative explanations. It fits naturally into existing tools."
                        listItems={[
                            "Works on compiled binaries",
                            "Bounded, quantitative outputs",
                            "Integrates into GitHub & CI",
                            "No speculative explanations"
                        ]}
                    />
                    <ProofCard
                        icon={Bot}
                        title="Grounding AI in Practice"
                        description="When used with LLM coding agents, LOCI provides execution-grounded signal that constrains code generation within execution limits."
                        listItems={[
                            "Constrains generation to limits",
                            "Avoids performance regressions",
                            "Improves optimization decisions",
                            "Reduces trial-and-error"
                        ]}
                        badge="AI Safety"
                    />
                </div>
            </div>
        </section>
    );
};

const OpennessSection = () => {
    return (
        <section className="py-24 bg-gray-900/30 border-y border-gray-800" id="openness">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Transparency"
                    title="Open Where It Matters"
                    subtitle="Evaluate LOCI based on real behavior, not promises."
                />

                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex flex-col items-start p-6 rounded-xl bg-gray-900 border border-gray-800">
                            <Github className="w-10 h-10 text-emerald-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">GitHub-Native Workflows</h3>
                            <p className="text-gray-400 text-sm">Visible and active in public pull request interactions.</p>
                        </div>
                        <div className="flex flex-col items-start p-6 rounded-xl bg-gray-900 border border-gray-800">
                            <Globe className="w-10 h-10 text-emerald-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Public Usage</h3>
                            <p className="text-gray-400 text-sm">Community-facing usage allows for open evaluation.</p>
                        </div>
                    </div>

                    <div className="mt-8 p-8 rounded-xl bg-gray-900 border border-gray-800 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Built on Measured Reality</h3>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                            Unlike tools that infer behavior from text or rules, LOCI reasons over execution behavior derived from measured CPU and GPU characteristics. This makes outputs consistent, bounded, and reliable.
                        </p>
                        <div className="flex justify-center space-x-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Consistent
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Bounded
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Reliable
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TrustSection = () => {
    return (
        <section className="py-24 bg-gray-950" id="trust">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto items-center">
                    <div className="md:w-1/2">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                            <Award className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Why Teams Trust LOCI</h2>
                        <p className="text-gray-400 text-lg mb-6">
                            Trust comes from predictability, not claims. Teams choose LOCI because it delivers early, grounded insight.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Provides early, execution-grounded insight",
                                "Reduces late-stage surprises",
                                "Improves confidence in code changes",
                                "Fits naturally into existing workflows"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-gray-300">
                                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:w-1/2 bg-gray-900 border border-gray-800 p-8 rounded-xl flex flex-col items-center justify-center text-center">
                        <div className="mb-4">
                            <Shield className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white">Execution Truth</h3>
                        </div>
                        <p className="text-gray-400 mb-6">
                            "Every signal LOCI produces is grounded in execution reasoning derived from real CPU and GPU behavior."
                        </p>
                        <Button variant="outline">Read the Whitepaper</Button>
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
                        <h2 className="text-3xl font-bold text-white mb-4">Verify for Yourself</h2>
                        <p className="text-gray-400 text-lg">
                            See the execution reasoning difference on your own code.
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

const ProofAndCredibilityApp = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-emerald-500/30">
            <Navbar />
            <Hero />
            <VerificationSection />
            <WorkflowSection />
            <OpennessSection />
            <TrustSection />
            <Footer />
        </div>
    );
};

export default ProofAndCredibilityApp;
