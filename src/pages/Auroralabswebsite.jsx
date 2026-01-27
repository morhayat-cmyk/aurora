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
    ChevronUp
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

const PipelineStep = ({ step, title, active }) => (
    <div className={`flex flex-col items-center relative z-10 ${active ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 border-2 ${active ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-gray-900 border-gray-700 text-gray-500'}`}>
            {step}
        </div>
        <span className={`font-mono text-sm ${active ? 'text-emerald-400 font-bold' : 'text-gray-500'}`}>{title}</span>
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
        { name: 'Product', href: '#product' },
        { name: 'Integrations', href: '#integrations' },
        { name: 'Use Cases', href: '#use-cases' },
        { name: 'Technology', href: '#technology' },
        { name: 'Proof', href: '#proof' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/90 backdrop-blur-md border-b border-gray-800 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                        <span className="font-bold text-gray-900 text-xl">L</span>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">LOCI <span className="text-gray-500 text-sm font-normal ml-1">by Aurora Labs</span></span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Button variant="ghost" className="text-sm">Sign In</Button>
                    <Button variant="primary" className="text-sm px-4 py-2">Start Free</Button>
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
                        <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white py-2 block">
                            {link.name}
                        </a>
                    ))}
                    <div className="pt-4 border-t border-gray-800 flex flex-col space-y-3">
                        <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                        <Button variant="primary" className="w-full">Start Free</Button>
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
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center space-x-2 bg-gray-900/50 border border-gray-700 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm animate-fade-in-up">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-emerald-400">Now grounding LLM Coding Agents</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Execution-Aware AI for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Software Teams</span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                        LOCI analyzes compiled executables to reason about how code will run on real CPUs and GPUs.
                        Catch performance regressions, power spikes, and bugs <strong>as you build</strong>—before tests run.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <Button variant="primary" className="w-full sm:w-auto h-12 px-8 flex items-center justify-center group">
                            Start Free
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="secondary" className="w-full sm:w-auto h-12 px-8 flex items-center justify-center">
                            <Github className="mr-2 w-4 h-4" />
                            View on GitHub
                        </Button>
                    </div>

                    <div className="mt-16 w-full max-w-5xl bg-gray-900 rounded-lg border border-gray-800 shadow-2xl overflow-hidden backdrop-blur-sm">
                        <div className="flex items-center px-4 py-3 border-b border-gray-800 bg-gray-900/50">
                            <div className="flex space-x-2 mr-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <div className="text-xs text-gray-500 font-mono">loci-cli analyze --target=release</div>
                        </div>
                        <div className="p-6 font-mono text-sm text-left overflow-x-auto">
                            <div className="flex flex-col space-y-2">
                                <div className="text-gray-400">$ loci analyze ./build/app</div>
                                <div className="text-blue-400">→ Analyzing binary structure... [Done]</div>
                                <div className="text-blue-400">→ Mapping control flow & kernels... [Done]</div>
                                <div className="text-blue-400">→ Applying execution models (T4 GPU / x86_64)...</div>
                                <br />
                                <div className="text-yellow-400 font-bold">WARNING: Performance Regression Detected</div>
                                <div className="pl-4 border-l-2 border-yellow-500/30 text-gray-300">
                                    <div className="flex justify-between max-w-md"><span>Latency (p99):</span> <span className="text-red-400">+145ms (Violates KPI &lt; 50ms)</span></div>
                                    <div className="flex justify-between max-w-md"><span>Memory Bandwidth:</span> <span className="text-orange-400">Saturation Risk (92% Peak)</span></div>
                                    <div className="mt-2 text-gray-500 text-xs">Path: src/inference/engine.cpp:402 (matrix_mul_tiled)</div>
                                </div>
                                <br />
                                <div className="text-emerald-400">Analysis Complete: 1 Critical, 2 Warnings. Time: 4.2s</div>
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
        <section className="py-20 border-y border-gray-800 bg-gray-900/30" id="product">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Workflow"
                    title="Earlier Insight. Fewer Surprises."
                    subtitle="LOCI fits naturally into your existing pipeline. No instrumentation, no runtime overhead."
                />

                <div className="relative max-w-4xl mx-auto mt-12">
                    {/* Connecting Line */}
                    <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-800 z-0"></div>

                    <div className="grid grid-cols-5 gap-4">
                        <PipelineStep step={<Code className="w-5 h-5" />} title="Code" active={false} />
                        <PipelineStep step={<Server className="w-5 h-5" />} title="Build" active={false} />
                        <PipelineStep step={<Activity className="w-6 h-6 animate-pulse" />} title="LOCI" active={true} />
                        <PipelineStep step={<Zap className="w-5 h-5" />} title="Test" active={false} />
                        <PipelineStep step={<GitBranch className="w-5 h-5" />} title="Merge" active={false} />
                    </div>

                    <div className="mt-12 grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                            <h3 className="text-lg font-semibold text-white mb-2">Binary-Level Understanding</h3>
                            <p className="text-gray-400 text-sm">LOCI decomposes compiled executables into functions, loops, and kernels, analyzing control flow without needing source code heuristics.</p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                            <h3 className="text-lg font-semibold text-white mb-2">Bounded Execution Models</h3>
                            <p className="text-gray-400 text-sm">Unlike LLMs that guess, LOCI uses models trained on real hardware behavior to predict physically meaningful, bounded values.</p>
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
        <section className="py-24 bg-gray-950">
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

const Integrations = () => {
    return (
        <section className="py-24 bg-gray-900/30 border-y border-gray-800" id="integrations">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
                    <SectionHeading
                        align="left"
                        badge="Integrations"
                        title="Works Where You Work"
                        subtitle="Integrate in minutes via MCP and APIs. No new pipelines, no new dashboards to learn."
                    />

                    <ul className="space-y-4 mt-8">
                        {[
                            "GitHub & GitHub Marketplace Native",
                            "CI/CD Pipeline Integration (Actions, GitLab, Jenkins)",
                            "IDE Support (VS Code, JetBrains)",
                            "LLM Agent Grounding (Cursor, Claude Code)"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center text-gray-300">
                                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8">
                        <Button variant="outline">View Documentation</Button>
                    </div>
                </div>

                <div className="md:w-1/2 grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-8 rounded-xl flex items-center justify-center border border-gray-700 hover:border-emerald-500/50 transition-colors">
                        <span className="text-2xl font-bold text-white">GitHub</span>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-xl flex items-center justify-center border border-gray-700 hover:border-emerald-500/50 transition-colors">
                        <span className="text-2xl font-bold text-white">Cursor</span>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-xl flex items-center justify-center border border-gray-700 hover:border-emerald-500/50 transition-colors">
                        <span className="text-2xl font-bold text-white">Claude</span>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-xl flex items-center justify-center border border-gray-700 hover:border-emerald-500/50 transition-colors">
                        <span className="text-2xl font-bold text-white">Jenkins</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

const UseCases = () => {
    const [activeTab, setActiveTab] = useState(0);

    const cases = [
        {
            title: "Grounding LLM Agents",
            content: "LLMs generate code that looks correct but often performs poorly. LOCI provides bounded execution signals that tools like Cursor and Copilot use to avoid regressions and stay within project KPIs.",
            icon: Database
        },
        {
            title: "Automotive Safety",
            content: "For safety-critical systems, predictability is everything. LOCI analyzes worst-case execution paths and variability, supporting functional safety processes without needing physical vehicle validation.",
            icon: Shield
        },
        {
            title: "Optimization & Cost",
            content: "Stop guessing where to optimize. LOCI identifies hot execution paths, inefficient instruction sequences, and memory bottlenecks, helping you reduce cloud compute costs and energy consumption.",
            icon: BarChart3
        }
    ];

    return (
        <section className="py-24" id="use-cases">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Use Cases"
                    title="Applied Execution Reasoning"
                    subtitle="From AI infrastructure to automotive control systems."
                />

                <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
                    {/* Tabs */}
                    <div className="md:w-1/3 flex flex-col space-y-2">
                        {cases.map((c, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTab(i)}
                                className={`text-left px-6 py-4 rounded-lg transition-all duration-200 flex items-center ${activeTab === i ? 'bg-gray-800 border-l-4 border-emerald-500 text-white' : 'text-gray-400 hover:bg-gray-900'}`}
                            >
                                <c.icon className={`w-5 h-5 mr-3 ${activeTab === i ? 'text-emerald-400' : 'text-gray-500'}`} />
                                <span className="font-medium">{c.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="md:w-2/3 bg-gray-900 border border-gray-800 rounded-2xl p-8 min-h-[300px] flex flex-col justify-center">
                        <div className="mb-6">
                            <div className="inline-block p-3 rounded-lg bg-emerald-500/10 mb-4">
                                {React.createElement(cases[activeTab].icon, { className: "w-8 h-8 text-emerald-400" })}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{cases[activeTab].title}</h3>
                            <p className="text-gray-300 leading-relaxed text-lg">{cases[activeTab].content}</p>
                        </div>
                        <div className="flex items-center text-emerald-400 text-sm font-medium cursor-pointer hover:text-emerald-300">
                            Read Case Study <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Technology = () => {
    return (
        <section className="py-24 bg-gray-950 border-t border-gray-800" id="technology">
            <div className="container mx-auto px-6">
                <SectionHeading
                    badge="Deep Dive"
                    title="Technology Under the Hood"
                    subtitle="We don't just summarize code. We execute it virtually."
                />

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
                    <div className="space-y-8">
                        <div className="flex">
                            <div className="flex-shrink-0 mt-1">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 border border-gray-700 text-emerald-400 font-bold text-sm">1</div>
                            </div>
                            <div className="ml-6">
                                <h4 className="text-xl font-bold text-white mb-2">Binary Decomposition</h4>
                                <p className="text-gray-400">LOCI works directly on compiled binaries, decomposing them into execution units, control-flow graphs, and instruction sequences. No source code required.</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-shrink-0 mt-1">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 border border-gray-700 text-emerald-400 font-bold text-sm">2</div>
                            </div>
                            <div className="ml-6">
                                <h4 className="text-xl font-bold text-white mb-2">Execution Modeling</h4>
                                <p className="text-gray-400">We apply models trained on real CPU/GPU traces to capture branching behavior, memory pressure, and scheduling interactions.</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-shrink-0 mt-1">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 border border-gray-700 text-emerald-400 font-bold text-sm">3</div>
                            </div>
                            <div className="ml-6">
                                <h4 className="text-xl font-bold text-white mb-2">Bounded Prediction</h4>
                                <p className="text-gray-400">LOCI predicts physically meaningful values (e.g., ms, watts, instructions). Hallucination is structurally impossible.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative bg-gray-900 rounded-xl border border-gray-800 p-8">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <Cpu className="w-32 h-32" />
                        </div>
                        <h4 className="text-lg font-mono text-emerald-400 mb-4">&gt; Execution Context</h4>
                        <div className="space-y-3 font-mono text-sm text-gray-300">
                            <div className="flex justify-between border-b border-gray-800 pb-2">
                                <span>Architecture</span>
                                <span className="text-white">x86_64 / NVIDIA Ampere</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-800 pb-2">
                                <span>Optimization</span>
                                <span className="text-white">-O3 (Release)</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-800 pb-2">
                                <span>Input State</span>
                                <span className="text-white">Bounded (Project Config)</span>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span>Model Confidence</span>
                                <span className="text-emerald-400">99.8%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Proof = () => {
    return (
        <section className="py-20 bg-gray-900" id="proof">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-white mb-8">Proof, Not Promises</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                    LOCI is applied to production-grade open-source projects like <strong className="text-white">OpenSSL</strong> and <strong className="text-white">LLaMA.cpp</strong>.
                    Our results are inspectable, explainable, and verifiable.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 max-w-4xl mx-auto">
                    {/* Mock Logos for Trust */}
                    <div className="flex items-center justify-center text-xl font-bold text-gray-500">OpenSSL</div>
                    <div className="flex items-center justify-center text-xl font-bold text-gray-500">LLaMA.cpp</div>
                    <div className="flex items-center justify-center text-xl font-bold text-gray-500">Linux Foundation</div>
                    <div className="flex items-center justify-center text-xl font-bold text-gray-500">Automotive Grade Linux</div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-950 border-t border-gray-900 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                                <span className="font-bold text-gray-900">L</span>
                            </div>
                            <span className="text-xl font-bold text-white">LOCI</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-6">
                            Execution-aware reasoning for modern software teams. Ground your code in reality.
                        </p>
                        <div className="flex space-x-4">
                            <Github className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
                            <div className="w-5 h-5 bg-gray-500 rounded-full hover:bg-white cursor-pointer opacity-80"></div>
                            <div className="w-5 h-5 bg-gray-500 rounded-full hover:bg-white cursor-pointer opacity-80"></div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-emerald-400">How it Works</a></li>
                            <li><a href="#" className="hover:text-emerald-400">What LOCI Flags</a></li>
                            <li><a href="#" className="hover:text-emerald-400">Integrations</a></li>
                            <li><a href="#" className="hover:text-emerald-400">Pricing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-emerald-400">Documentation</a></li>
                            <li><a href="#" className="hover:text-emerald-400">API Reference</a></li>
                            <li><a href="#" className="hover:text-emerald-400">Case Studies</a></li>
                            <li><a href="#" className="hover:text-emerald-400">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-emerald-400">About Aurora Labs</a></li>
                            <li><a href="#" className="hover:text-emerald-400">Careers</a></li>
                            <li><a href="#" className="hover:text-emerald-400">Contact</a></li>
                            <li><a href="#" className="hover:text-emerald-400">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Aurora Labs. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <span>Terms</span>
                        <span>Privacy</span>
                        <span>Security</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// --- Main App Component ---

const Auroralabswebsite = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-emerald-500/30">
            <Navbar />
            <Hero />
            <Workflow />
            <Features />
            <Integrations />
            <UseCases />
            <Technology />
            <Proof />

            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-900/10"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to see the execution truth?</h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Start using LOCI on your GitHub repositories today. No credit card required.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Button variant="primary" className="h-14 px-10 text-lg">Start Free</Button>
                        <Button variant="secondary" className="h-14 px-10 text-lg">Book a Demo</Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Auroralabswebsite;
