<script lang="ts">
    import Card from "$lib/components/ui/card/card.svelte";
    import CardContent from "$lib/components/ui/card/card-content.svelte";

    const commands = [
        {
            label: "Primary",
            value: "mavetis rules explain --id webhook.signature.missing",
            desc: "Explain any builtin, custom, or synthetic semantic rule by identifier."
        },
        {
            label: "Alias",
            value: "mavetis explain rule webhook.signature.missing",
            desc: "Compatibility alias for the same deterministic explanation output."
        }
    ];

    const explanationFields = [
        { key: "severity", value: "critical" },
        { key: "category", value: "webhook" },
        { key: "confidence", value: "medium" },
        { key: "standards", value: "OWASP-ASVS-V4.1, OWASP-ASVS-V6.2" },
        { key: "vulnerable-example", value: "app.post('/webhook', handler)" },
        { key: "safe-example", value: "verify signature against raw body first" }
    ];

    const ruleSources = [
        {
            icon: "ph-fill ph-shield-check",
            title: "Builtin Rules",
            desc: "Core catalog entries resolve through the central rule explanation layer."
        },
        {
            icon: "ph-fill ph-file-yaml",
            title: "Custom YAML Rules",
            desc: "Custom rule files can expose vulnerable-example and safe-example guidance."
        },
        {
            icon: "ph-fill ph-node-tree",
            title: "Synthetic Semantic Rules",
            desc: "Semantic metadata now lives in the rule layer and is shared by the engine."
        }
    ];
</script>

<section class="w-full border-b">
    <div class="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-20">
        <div class="text-center mb-12">
            <h2 class="text-xl font-bold tracking-tight">Rule Explanation Layer</h2>
            <p class="text-muted-foreground text-sm mt-2">Deterministic rule intelligence for humans and CI logs</p>
        </div>

        <div class="grid lg:grid-cols-[1.08fr_0.92fr] gap-px bg-border mb-10">
            <Card>
                <CardContent class="flex flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <span class="ph-fill ph-terminal-window text-lg text-primary"></span>
                        <h3 class="text-sm font-semibold">Explain Commands</h3>
                    </div>
                    <div class="flex flex-col gap-3">
                        {#each commands as command}
                            <div class="border border-border bg-card">
                                <div class="px-3 py-2 border-b border-border bg-secondary/50 flex items-center justify-between gap-3">
                                    <span class="text-xs font-medium">{command.label}</span>
                                    <span class="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">rule id</span>
                                </div>
                                <div class="p-3 flex flex-col gap-2">
                                    <code class="text-xs text-primary font-mono break-all">$ {command.value}</code>
                                    <p class="text-xs text-muted-foreground leading-relaxed">{command.desc}</p>
                                </div>
                            </div>
                        {/each}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent class="flex flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <span class="ph-fill ph-list-magnifying-glass text-lg text-primary"></span>
                        <h3 class="text-sm font-semibold">Text Output Shape</h3>
                    </div>
                    <div class="bg-card border border-border font-mono text-xs leading-relaxed">
                        <div class="px-3 py-2 border-b border-border bg-secondary/50 text-muted-foreground">rule explanation</div>
                        <div class="p-3 space-y-1">
                            <p><span class="text-muted-foreground">id:</span> <span class="text-foreground">webhook.signature.missing</span></p>
                            <p><span class="text-muted-foreground">title:</span> <span class="text-foreground">Webhook handler without signature verification</span></p>
                            {#each explanationFields as field}
                                <p><span class="text-muted-foreground">{field.key}:</span> <span class="text-foreground">{field.value}</span></p>
                            {/each}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div class="grid sm:grid-cols-3 gap-px bg-border">
            {#each ruleSources as source}
                <Card>
                    <CardContent class="flex flex-col gap-3">
                        <span class="{source.icon} text-lg text-primary"></span>
                        <h3 class="text-sm font-semibold">{source.title}</h3>
                        <p class="text-xs text-muted-foreground leading-relaxed">{source.desc}</p>
                    </CardContent>
                </Card>
            {/each}
        </div>
    </div>
</section>
