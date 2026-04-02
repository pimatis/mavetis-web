<script lang="ts">
    import Card from "$lib/components/ui/card/card.svelte";
    import CardContent from "$lib/components/ui/card/card-content.svelte";

    const features = [
        { icon: "ph-fill ph-arrows-left-right", title: "Regression Core", desc: "Security downgrade detection, config drift, and observability leak detection across Git diffs." },
        { icon: "ph-fill ph-shield-check", title: "Air-Gapped Operation", desc: "Complete offline analysis with zero external network dependencies and zero telemetry." },
        { icon: "ph-fill ph-fingerprint", title: "Policy Layer", desc: "Rule profiles (auth, fintech, backend, frontend) and trust zones for risk-weighted review." },
        { icon: "ph-fill ph-git-branch", title: "Boundary Enforcement", desc: "Diff-level architectural boundary checks for privileged modules and admin surfaces." },
        { icon: "ph-fill ph-package", title: "Supply-Chain Trust", desc: "Dependency lifecycle correlation, registry trust drift, and lockfile consistency checks." },
        { icon: "ph-fill ph-code", title: "Flexible Rule Engine", desc: "Custom YAML-based rules with typed policies, contextual scoping, and repository snapshots." },
        { icon: "ph-fill ph-chart-bar", title: "SARIF Integration", desc: "Native JSON and SARIF output formats for seamless CI/CD pipeline integration." },
        { icon: "ph-fill ph-git-merge", title: "Git Hook Integration", desc: "Automated pre-commit and pre-push scanning with configurable fail thresholds." },
        { icon: "ph-fill ph-list-checks", title: "OWASP / ASVS", desc: "Coverage across secrets, auth, injection, cryptography, and supply chain security." },
        { icon: "ph-fill ph-lock", title: "Security Architecture", desc: "No third-party dependencies, no cloud services, no accounts, no AI components." },
        { icon: "ph-fill ph-database", title: "Repository Snapshots", desc: "Opt-in snapshot baselines from existing security-sensitive code anchors." },
        { icon: "ph-fill ph-lightning", title: "Deterministic Execution", desc: "Pure Go standard library implementation ensuring consistent, reproducible results." }
    ];
</script>

<section class="w-full border-b">
    <div class="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-20">
        <div class="text-center mb-12">
            <h2 class="text-xl font-bold tracking-tight">Delivered Capability Layers</h2>
            <p class="text-muted-foreground text-sm mt-2">Enterprise-grade security analysis for Git-based development workflows</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {#each features as feature}
                <Card>
                    <CardContent class="flex flex-col gap-3">
                        <span class="{feature.icon} text-lg text-primary"></span>
                        <h3 class="text-sm font-semibold">{feature.title}</h3>
                        <p class="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </CardContent>
                </Card>
            {/each}
        </div>
    </div>
</section>
