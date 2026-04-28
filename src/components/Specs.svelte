<script lang="ts">
    import Card from "$lib/components/ui/card/card.svelte";
    import CardContent from "$lib/components/ui/card/card-content.svelte";

    const specs = [
        { icon: "ph-fill ph-cpu", title: "Analysis Engine", items: ["Regression detection", "Policy-aware review", "Boundary enforcement", "Supply-chain trust analysis"] },
        { icon: "ph-fill ph-file-code", title: "Detection Areas", items: ["Secrets & cryptography", "Access control & sessions", "Injection & input validation", "Supply chain security", "Business logic flaws", "Configuration header regressions", "File inclusion attacks", "Go semantic analysis"] },
        { icon: "ph-fill ph-sliders-horizontal", title: "Rule Profiles", items: ["auth — authentication & tokens", "fintech — high-assurance review", "backend — server-side security", "frontend — browser-facing auth"] },
        { icon: "ph-fill ph-funnel", title: "Output Formats", items: ["Interactive text (ANSI)", "Machine-readable JSON", "SARIF 2.1.0", "Exit codes for CI/CD"] }
    ];
</script>

<section class="w-full border-b">
    <div class="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-20">
        <div class="text-center mb-12">
            <h2 class="text-xl font-bold tracking-tight">Technical Specifications</h2>
            <p class="text-muted-foreground text-sm mt-2">Pure Go standard library implementation</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {#each specs as spec}
                <Card>
                    <CardContent class="flex flex-col gap-4">
                        <span class="{spec.icon} text-lg text-primary"></span>
                        <h3 class="text-sm font-semibold">{spec.title}</h3>
                        <ul class="flex flex-col gap-2">
                            {#each spec.items as item}
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
</section>
