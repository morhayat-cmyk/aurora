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
    Car,
    Bot,
    TrendingDown,
    BookOpen,
    GitPullRequest
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

const UseCaseCard = ({ icon: Icon, title, description, outcome, listItems, badge }) => (
    <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-xl hover:border-emerald-500/30 transition-colors duration-300 h-full flex flex-col group">
        <div className="flex items-start justify-between mb-6">
            <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-emerald-500/10 transition-colors">
                {Icon && <Icon className="w-8 h-8 text-emerald-400" />}
            </div>
            {badge && <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider font-semibold">{badge}</span>}
        </div>

        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-300 text-md leading-relaxed mb-6">
            {description}
        </p>

        {listItems && (
            <div className="mb-6 bg-gray-950/50 p-4 rounded-lg border border-gray-800/50">
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

        <div className="mt-auto pt-6 border-t border-gray-800">
            <div className="flex items-start">
                <span className="text-emerald-500 font-bold text-sm uppercase tracking-wider w-24 flex-shrink-0 mt-0.5">Outcome</span>
                <span className="text-gray-300 text-sm italic">{outcome}</span>
            </div>
        </div>
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
        { name: 'AI Grounding', href: '#ai-grounding' },
        { name: 'Performance', href: '#performance' },
        { name: 'Efficiency', href: '#efficiency' },
        { name: 'Safety', href: '#safety' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/90 backdrop-blur-md border-b border-gray-800 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                        <span className="font-bold text-gray-900 text-xl">L</span>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">LOCI <span className="text-gray-500 font-normal text-sm ml-2 hidden sm:inline">Use Cases</span></span>
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
                        <span className="text-sm font-medium text-emerald-400">Engineering Applications</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Execution Reasoning Applied to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Real Engineering Problems</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
                        LOCI’s execution reasoning applies across teams, domains, and industries. See how execution-aware insight helps teams make better decisions — as software is built.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="primary" onClick={() => scrollToId('footer-cta')}>Book a Demo</Button>
                        <Button variant="secondary">View Documentation</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AISection = () => {
    return (
        <section className="py-24 bg-gray-900/30 border-y border-gray-800" id="ai-grounding">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="AI & Automation"
                    title="Grounding AI Development"
                    subtitle="Making LLM coding agents reliable through execution-aware boundaries."
                />

                <div className="max-w-4xl mx-auto">
                    <UseCaseCard
                        icon={Bot}
                        title="Grounding LLM Coding Agents"
                        description="Teams increasingly rely on LLM coding agents like Cursor and Copilot. Without execution context, these tools can generate code that looks correct but behaves poorly at runtime. LOCI provides execution-grounded signal."
                        listItems={[
                            "Constrains generation within real execution limits",
                            "Prevents performance-regressing suggestions",
                            "Guides optimization decisions with execution truth"
                        ]}
                        outcome="LLM coding agents become more reliable because they operate within execution-aware boundaries."
                        badge="High Impact"
                    />
                </div>
            </div>
        </section>
    );
};

const CoreEngineeringSection = () => {
    return (
        <section className="py-24 bg-gray-950" id="performance">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Core Engineering"
                    title="Performance & Security"
                    subtitle="Detecting regressions and risks before tests run."
                />

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <UseCaseCard
                        icon={TrendingDown}
                        title="Performance Regression Prevention"
                        description="Frequent code changes make regressions hard to detect early. LOCI reasons about how changes affect execution, flagging latency (average and tail), throughput degradation, and critical-path expansion."
                        listItems={[
                            "Detects latency regressions",
                            "Flags throughput degradation",
                            "Identifies critical-path expansion"
                        ]}
                        outcome="Teams know early whether a change is performance-safe — before tests and benchmarks run."
                    />

                    <UseCaseCard
                        icon={Lock}
                        title="Security-Critical Execution Paths"
                        description="Many correctness and security risks depend on how code executes, not just what it does. LOCI highlights paths where correctness depends on rare control-flow or unsafe memory patterns."
                        listItems={[
                            "Highlights rare control-flow risks",
                            "Flags unsafe/fragile memory access",
                            "Identifies risky execution behavior"
                        ]}
                        outcome="This execution insight helps teams understand and reduce risk early, without replacing existing security tools."
                        badge="Security"
                    />
                </div>
            </div>
        </section>
    );
};

const EfficiencySection = () => {
    return (
        <section className="py-24 bg-gray-900/30 border-y border-gray-800" id="efficiency">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Optimization"
                    title="Efficiency & Cost"
                    subtitle="Optimizing power, thermal, and compute resources."
                />

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <UseCaseCard
                        icon={Zap}
                        title="Power & Thermal Efficiency"
                        description="Execution behavior directly affects power consumption. LOCI reasons about execution cost, flagging power spikes, inefficient CPU/GPU utilization, and thermal stress."
                        listItems={[
                            "Flags power spikes",
                            "Identifies inefficient utilization",
                            "Highlights thermal stress risks"
                        ]}
                        outcome="Teams can address efficiency and cost issues as software is built, before deployment."
                    />

                    <UseCaseCard
                        icon={Gauge}
                        title="Execution-Aware Optimization"
                        description="Optimization efforts often rely on trial and error. LOCI identifies hot execution paths and inefficient instruction sequences, guiding refactoring."
                        listItems={[
                            "Identifies hot execution paths",
                            "Flags inefficient instruction sequences",
                            "Highlights high-cost memory access"
                        ]}
                        outcome="This execution reasoning guides refactoring and optimization, reducing guesswork and tuning cycles."
                    />
                </div>
            </div>
        </section>
    );
};

const ProcessSection = () => {
    return (
        <section className="py-24 bg-gray-950" id="process">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Team Process"
                    title="Review & Onboarding"
                    subtitle="Improving team velocity and knowledge transfer."
                />

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <UseCaseCard
                        icon={GitPullRequest}
                        title="Execution-Aware Code Review"
                        description="Code reviews often lack execution context. LOCI adds execution reasoning to reviews by showing why a change affects performance and which paths matter most."
                        listItems={[
                            "Shows why changes affect performance",
                            "Highlights critical paths",
                            "Displays behavior diffs across builds"
                        ]}
                        outcome="Reviewers can make faster, more confident decisions with execution truth."
                    />

                    <UseCaseCard
                        icon={Users}
                        title="Execution Knowledge & Onboarding"
                        description="Execution knowledge is often tribal. LOCI makes execution behavior visible by showing how systems actually run and highlighting critical bottlenecks."
                        listItems={[
                            "Shows how systems actually run",
                            "Highlights critical paths/bottlenecks",
                            "Explains execution impact of changes"
                        ]}
                        outcome="New team members ramp faster with concrete execution insight instead of guesswork."
                    />
                </div>
            </div>
        </section>
    );
};

const AutomotiveSection = () => {
    return (
        <section className="py-24 bg-emerald-900/10 border-t border-gray-800" id="safety">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto items-center">
                    <div className="md:w-1/3">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                            <Car className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Functional Safety & System Availability</h2>
                        <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-4">
                            Automotive
                        </div>
                    </div>

                    <div className="md:w-2/3 bg-gray-900 border border-gray-800 p-8 rounded-xl">
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            For automotive and safety-critical systems, predictability and availability matter. LOCI helps functional safety managers and system engineers understand worst-case execution paths and execution variability.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center text-sm text-gray-400">
                                <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                                <span>Understand worst-case paths</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-400">
                                <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                                <span>Identify execution variability</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-400">
                                <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                                <span>Analyze impact on availability</span>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-gray-800">
                            <p className="text-emerald-400 font-medium italic">
                                Outcome: Supports functional safety processes by surfacing risks early — before integration and vehicle-level validation.
                            </p>
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
                        <h2 className="text-3xl font-bold text-white mb-4">See LOCI in Action</h2>
                        <p className="text-gray-400 text-lg">
                            Apply execution reasoning to your specific engineering challenges.
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

const AuroralabsUseCase = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-emerald-500/30">
            <Navbar />
            <Hero />
            <AISection />
            <CoreEngineeringSection />
            <EfficiencySection />
            <ProcessSection />
            <AutomotiveSection />
            <Footer />
        </div>
    );
};

export default AuroralabsUseCase;
