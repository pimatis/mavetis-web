<script lang="ts">
    import Card from "$lib/components/ui/card/card.svelte";
    import CardContent from "$lib/components/ui/card/card-content.svelte";

    let selectedExample = $state(0);

    const examples = [
        {
            label: "Staged Changes",
            cmd: "mavetis review --staged --path 'src/**' --profile auth --explain",
            desc: "Review staged authentication changes with profile-aware explanations"
        },
        {
            label: "Branch Diff",
            cmd: "mavetis review --base main --path 'src/**' --profile backend",
            desc: "Compare backend changes against a base branch"
        },
        {
            label: "File Review",
            cmd: "mavetis review src/auth/login.go src/api/handler.ts --explain",
            desc: "Review local files directly without a Git diff context"
        },
        {
            label: "Config Review",
            cmd: "mavetis review @config/nginx.conf --profile backend --format json",
            desc: "Review config or infra files in machine-readable form"
        },
        {
            label: "With Suggestions",
            cmd: "mavetis review src/scan/load.go --with-suggested",
            desc: "Review local files together with bounded suggested imports"
        },
        {
            label: "CI/CD Integration",
            cmd: "mavetis ci --base main --format json --profile fintech",
            desc: "Optimized analysis for continuous integration with fintech policy"
        },
        {
            label: "Baseline Create",
            cmd: "mavetis baseline --create --base main",
            desc: "Capture current findings as a baseline to suppress known issues"
        },
        {
            label: "Init Wizard",
            cmd: "mavetis init",
            desc: "Initialize project configuration interactively with default .mavetis.yaml"
        }
    ];

    const flags = [
        { flag: "--staged", desc: "Review staged Git changes" },
        { flag: "--base <branch>", desc: "Compare against base branch" },
        { flag: "--path <glob>", desc: "Restrict review scope with glob pattern" },
        { flag: "--profile <name>", desc: "Apply rule profile (auth, fintech, backend, frontend)" },
        { flag: "--explain", desc: "Verbose finding explanations" },
        { flag: "--with-suggested", desc: "Include bounded local import suggestions" },
        { flag: "--format <fmt>", desc: "Output format (text, json, sarif)" },
        { flag: "--severity <level>", desc: "Filter by severity (critical, high, medium, low)" },
        { flag: "--fail-on <level>", desc: "Set blocking threshold for exit code 1" },
        { flag: "--config <path>", desc: "Custom config file path (.mavetis.yaml)" },
        { flag: "--baseline <path>", desc: "Suppress known findings from baseline file" },
        { flag: "--stdin-targets", desc: "Read file targets from stdin" }
    ];

    const regressionEngines = [
        {
            icon: "ph-fill ph-arrow-down",
            title: "Security Downgrades",
            items: [
                "SameSite policy weakening",
                "Cookie and token lifetime growth",
                "bcrypt cost reduction",
                "Rate-limit threshold increases",
                "Timeout expansion",
                "MFA requirement weakening"
            ]
        },
        {
            icon: "ph-fill ph-gear",
            title: "Config Drift",
            items: [
                "Debug mode activation",
                "Non-production environment fallbacks",
                "Wildcard CORS and weakened CSP",
                "Legacy TLS configuration",
                "Privileged container settings",
                "Architectural boundary violations",
                "HSTS / X-Frame / X-Content-Type header removal"
            ]
        },
        {
            icon: "ph-fill ph-eye",
            title: "Observability Leaks",
            items: [
                "Request body logging",
                "Authorization material leakage",
                "PII in telemetry",
                "Raw error serialization",
                "Sensitive tracing attributes",
                "Security-intent regressions",
                "Health data in logs and observability"
            ]
        }
    ];

    const detectionCapabilities = [
        {
            icon: "ph-fill ph-key",
            title: "Secrets & Cryptography",
            items: [
                "Cloud provider credentials (AWS, Stripe, Supabase)",
                "Config file secrets (dotenv, JWT)",
                "Private key and high-entropy patterns",
                "Weak randomness, hashing, and ciphers",
                "IV/nonce misuse and reuse",
                "Insecure algorithm selection",
                "Weak password hashing (MD5, SHA1, SHA256)",
                "Plaintext password comparison",
                "RSA key size under 2048",
                "PII and sensitive data exposure"
            ]
        },
        {
            icon: "ph-fill ph-shield-check",
            title: "Access Control & Sessions",
            items: [
                "Authentication bypass vulnerabilities",
                "Deleted or disabled auth middleware",
                "Insecure token storage",
                "Session fixation and invalidation",
                "IDOR and ownership verification gaps",
                "JWT decode-without-verify flaws",
                "Weak hash and plaintext credential detection"
            ]
        },
        {
            icon: "ph-fill ph-bug",
            title: "Injection & Input",
            items: [
                "SSRF, SQL injection, command injection",
                "XSS and unsafe deserialization",
                "Path traversal and Zip Slip",
                "Server-Side Template Injection (SSTI)",
                "Dynamic code evaluation (eval)",
                "Data flow from request to sink",
                "ReDoS via user-controlled regex",
                "XML XXE injection",
                "Open redirect vulnerabilities",
                "Local/Remote File Inclusion (LFI/RFI)"
            ]
        },
        {
            icon: "ph-fill ph-package",
            title: "Supply Chain",
            items: [
                "Remote and git-based dependencies",
                "Version pinning and floating versions",
                "Typosquatting attack patterns",
                "Lockfile integrity violations",
                "Install-time script execution",
                "Mutable GitHub Action references"
            ]
        },
        {
            icon: "ph-fill ph-wrench",
            title: "Configuration Security",
            items: [
                "Missing HSTS header configuration",
                "Missing X-Frame-Options header",
                "Missing X-Content-Type-Options header",
                "Security header regressions in config"
            ]
        },
        {
            icon: "ph-fill ph-currency-dollar",
            title: "Business Logic",
            items: [
                "Mass assignment vulnerabilities",
                "Price tampering in requests",
                "Go unsafe.Pointer memory violations"
            ]
        }
    ];

    const policyLayer = [
        {
            icon: "ph-fill ph-sliders-horizontal",
            title: "Rule Profiles",
            items: [
                "auth — authentication, tokens, sessions, crypto",
                "fintech — full default surface for high-assurance",
                "backend — server-side, supply-chain, config, network",
                "frontend — browser auth, XSS, CORS, privacy"
            ]
        },
        {
            icon: "ph-fill ph-map-pin",
            title: "Trust Zones",
            items: [
                "zones.critical — two severity levels up to critical",
                "zones.restricted — one severity level, fail-on=medium",
                "Automatic severity uplift in sensitive paths",
                "Stricter blocking thresholds inside protected dirs"
            ]
        },
        {
            icon: "ph-fill ph-git-branch",
            title: "Boundary Enforcement",
            items: [
                "Public routes importing internal admin code",
                "UI layers importing auth or security helpers",
                "Public surfaces reaching privileged services",
                "Diff-bounded evaluation on changed hunks only"
            ]
        },
        {
            icon: "ph-fill ph-shield-warning",
            title: "Typed Rule DSL",
            items: [
                "forbiddenImport — block forbidden module imports",
                "requiredMiddleware — enforce middleware on routes",
                "configKeyConstraint — constrain deployable config",
                "pathBoundary — source-to-target trust boundaries"
            ]
        }
    ];

    const supplyChainTrust = [
        { title: "Lifecycle and dependency correlation" },
        { title: "Registry trust drift detection" },
        { title: "Private-to-public registry move alerts" },
        { title: "Package allowlist and denylist enforcement" },
        { title: "Lockfile consistency checks" },
        { title: "Manifest-without-lockfile drift detection" }
    ];

    const exitCodes = [
        { code: "0", label: "Clean", desc: "No blocking findings or help output", color: "text-primary" },
        { code: "1", label: "Blocked", desc: "Findings matched --fail-on threshold", color: "text-destructive" },
        { code: "2", label: "Error", desc: "Usage or runtime error", color: "text-yellow-500" }
    ];
</script>

<section class="w-full border-b">
    <div class="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-20">
        <div class="text-center mb-12">
            <h2 class="text-xl font-bold tracking-tight">Review Command</h2>
            <p class="text-muted-foreground text-sm mt-2">Deep security analysis on every code change</p>
        </div>

        <div class="grid lg:grid-cols-2 gap-px bg-border mb-16">
            <Card>
                <CardContent class="flex flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <span class="ph-fill ph-terminal text-lg text-primary"></span>
                        <h3 class="text-sm font-semibold">Command Examples</h3>
                    </div>
                    <div class="flex flex-col gap-1">
                        {#each examples as example, i}
                            <button onclick={() => selectedExample = i} class="text-left px-3 py-2 border border-border transition-colors {selectedExample === i ? 'bg-secondary' : 'hover:bg-secondary/50'}">
                                <span class="text-xs font-medium {selectedExample === i ? 'text-foreground' : 'text-muted-foreground'}">{example.label}</span>
                            </button>
                        {/each}
                    </div>
                    <div class="bg-card border border-border">
                        <div class="px-3 py-2 border-b border-border bg-secondary/50">
                            <span class="text-xs text-muted-foreground font-mono">$ {examples[selectedExample].cmd}</span>
                        </div>
                        <div class="px-3 py-2">
                            <p class="text-xs text-muted-foreground">{examples[selectedExample].desc}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent class="flex flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <span class="ph-fill ph-flag text-lg text-primary"></span>
                        <h3 class="text-sm font-semibold">Flags Reference</h3>
                    </div>
                    <div class="flex flex-col gap-0">
                        {#each flags as flag, i}
                            <div class="flex items-start gap-3 px-3 py-2 {i < flags.length - 1 ? 'border-b border-border' : ''}">
                                <code class="text-xs text-primary font-mono shrink-0 min-w-[130px]">{flag.flag}</code>
                                <span class="text-xs text-muted-foreground">{flag.desc}</span>
                            </div>
                        {/each}
                    </div>
                </CardContent>
            </Card>
        </div>

        <div class="mb-16">
            <div class="text-center mb-8">
                <h3 class="text-sm font-semibold">Regression Core</h3>
                <p class="text-xs text-muted-foreground mt-1">Security weakening treated as a first-class signal in Git diffs</p>
            </div>
            <div class="grid sm:grid-cols-3 gap-px bg-border">
                {#each regressionEngines as engine}
                    <Card>
                        <CardContent class="flex flex-col gap-4">
                            <span class="{engine.icon} text-lg text-primary"></span>
                            <h4 class="text-sm font-semibold">{engine.title}</h4>
                            <ul class="flex flex-col gap-2">
                                {#each engine.items as item}
                                    <li class="text-xs text-muted-foreground flex items-center gap-2">
                                        <span class="w-1 h-1 bg-primary"></span>
                                        {item}
                                    </li>
                                {/each}
                            </ul>
                        </CardContent>
                    </Card>
                {/each}
            </div>
        </div>

        <div class="mb-16">
            <div class="text-center mb-8">
                <h3 class="text-sm font-semibold">Detection Capabilities</h3>
                <p class="text-xs text-muted-foreground mt-1">Coverage across secrets, auth, injection, and supply chain security</p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {#each detectionCapabilities as capability}
                    <Card>
                        <CardContent class="flex flex-col gap-4">
                            <span class="{capability.icon} text-lg text-primary"></span>
                            <h4 class="text-sm font-semibold">{capability.title}</h4>
                            <ul class="flex flex-col gap-2">
                                {#each capability.items as item}
                                    <li class="text-xs text-muted-foreground flex items-center gap-2">
                                        <span class="w-1 h-1 bg-primary"></span>
                                        {item}
                                    </li>
                                {/each}
                            </ul>
                        </CardContent>
                    </Card>
                {/each}
            </div>
        </div>

        <div class="mb-16">
            <div class="text-center mb-8">
                <h3 class="text-sm font-semibold">Policy Layer & Boundary Enforcement</h3>
                <p class="text-xs text-muted-foreground mt-1">Policy-aware diff review with typed rule primitives</p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
                {#each policyLayer as policy}
                    <Card>
                        <CardContent class="flex flex-col gap-4">
                            <span class="{policy.icon} text-lg text-primary"></span>
                            <h4 class="text-sm font-semibold">{policy.title}</h4>
                            <ul class="flex flex-col gap-2">
                                {#each policy.items as item}
                                    <li class="text-xs text-muted-foreground flex items-center gap-2">
                                        <span class="w-1 h-1 bg-primary"></span>
                                        {item}
                                    </li>
                                {/each}
                            </ul>
                        </CardContent>
                    </Card>
                {/each}
            </div>
        </div>

        <div class="mb-16">
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                <Card>
                    <CardContent class="flex flex-col gap-5">
                        <div class="flex items-center gap-2">
                            <span class="ph-fill ph-link text-lg text-primary"></span>
                            <h3 class="text-sm font-semibold">Supply-Chain Trust</h3>
                        </div>
                        <ul class="flex flex-col gap-3">
                            {#each supplyChainTrust as item}
                                <li class="text-xs text-muted-foreground flex items-center gap-2">
                                    <span class="w-1 h-1 bg-primary"></span>
                                    {item.title}
                                </li>
                            {/each}
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent class="flex flex-col gap-5">
                        <div class="flex items-center gap-2">
                            <span class="ph-fill ph-database text-lg text-primary"></span>
                            <h3 class="text-sm font-semibold">Security Snapshots</h3>
                        </div>
                        <div class="flex flex-col gap-4">
                            <p class="text-xs text-muted-foreground leading-relaxed">
                                Generate opt-in snapshot baselines from existing security-sensitive code anchors. Enforced only when a changed hunk weakens the captured baseline.
                            </p>
                            <div class="bg-card border border-border">
                                <div class="px-3 py-2 border-b border-border bg-secondary/50">
                                    <span class="text-xs text-muted-foreground font-mono">$ mavetis rules snapshot</span>
                                </div>
                                <div class="p-3 text-xs leading-relaxed font-mono space-y-1">
                                    <p class="text-muted-foreground">snapshot:</p>
                                    <p class="pl-4">path: <span class="text-foreground">.mavetis-snapshots.yaml</span></p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent class="flex flex-col gap-5">
                        <div class="flex items-center gap-2">
                            <span class="ph-fill ph-line-segment text-lg text-primary"></span>
                            <h3 class="text-sm font-semibold">Baseline Suppressions</h3>
                        </div>
                        <div class="flex flex-col gap-4">
                            <p class="text-xs text-muted-foreground leading-relaxed">
                                Record known findings and focus only on newly introduced issues. Ideal for legacy codebases migrating to continuous security review.
                            </p>
                            <div class="bg-card border border-border">
                                <div class="px-3 py-2 border-b border-border bg-secondary/50">
                                    <span class="text-xs text-muted-foreground font-mono">$ mavetis baseline --create --base main</span>
                                </div>
                                <div class="p-3 text-xs leading-relaxed font-mono space-y-1">
                                    <p class="text-muted-foreground">baseline:</p>
                                    <p class="pl-4">- rule: <span class="text-foreground">inject.sql.raw</span></p>
                                    <p class="pl-6">path: <span class="text-foreground">src/api/handler.go</span></p>
                                    <p class="pl-6">line: <span class="text-foreground">45</span></p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-8">
            <div class="flex flex-col gap-4">
                <h3 class="text-sm font-semibold">Exit Codes</h3>
                <div class="flex flex-col gap-0 border border-border">
                    {#each exitCodes as exit, i}
                        <div class="flex items-center gap-3 px-4 py-3 {i < exitCodes.length - 1 ? 'border-b border-border' : ''}">
                            <code class="text-sm font-mono font-bold {exit.color} w-6">{exit.code}</code>
                            <div class="flex flex-col">
                                <span class="text-xs font-medium">{exit.label}</span>
                                <span class="text-xs text-muted-foreground">{exit.desc}</span>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="flex flex-col gap-4">
                <h3 class="text-sm font-semibold">Git Hook Integration</h3>
                <div class="bg-card border border-border">
                    <div class="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/50">
                        <span class="w-2.5 h-2.5 border border-border"></span>
                        <span class="w-2.5 h-2.5 border border-border"></span>
                        <span class="w-2.5 h-2.5 border border-border"></span>
                        <span class="text-xs text-muted-foreground ml-2">mavetis hooks install</span>
                    </div>
                    <div class="p-4 text-xs leading-relaxed font-mono space-y-1">
                        <p class="text-muted-foreground">pre-commit:</p>
                        <p class="pl-4">command: <span class="text-foreground">mavetis review --staged --fail-on high</span></p>
                        <p class="mt-3 text-muted-foreground">pre-push:</p>
                        <p class="pl-4">command: <span class="text-foreground">mavetis review --base &lt;default-branch&gt; --fail-on high</span></p>
                        <p class="mt-3 text-muted-foreground">existing hooks:</p>
                        <p class="pl-4 text-muted-foreground">backed up as <span class="text-foreground">.bak</span> before modification</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
