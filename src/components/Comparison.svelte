<script lang="ts">
    const rows = [
        { feature: "Air-Gapped Operation", mavetis: true, cloud: false },
        { feature: "Zero Telemetry", mavetis: true, cloud: false },
        { feature: "No Third-Party Dependencies", mavetis: true, cloud: false },
        { feature: "Regression Detection", mavetis: true, cloud: false },
        { feature: "Policy Profiles (auth, fintech, backend)", mavetis: true, cloud: false },
        { feature: "Trust Zones (critical, restricted)", mavetis: true, cloud: false },
        { feature: "Typed Custom Rules (YAML)", mavetis: true, cloud: false },
        { feature: "Supply-Chain Trust Analysis", mavetis: true, cloud: false },
        { feature: "Repository Snapshots", mavetis: true, cloud: false },
        { feature: "Baseline Suppressions", mavetis: true, cloud: false },
        { feature: "Init Wizard", mavetis: true, cloud: false },
        { feature: "SARIF / JSON Output", mavetis: true, cloud: true }
    ];
</script>

<section class="w-full border-b">
    <div class="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-20">
        <div class="text-center mb-12">
            <h2 class="text-xl font-bold tracking-tight">Why Mavetis</h2>
            <p class="text-muted-foreground text-sm mt-2">Local-first vs cloud-based security scanners</p>
        </div>
        <div class="border border-border">
            <div class="grid grid-cols-3 bg-secondary/50 border-b border-border text-xs font-semibold">
                <div class="p-3 border-r border-border">Capability</div>
                <div class="p-3 border-r border-border text-primary">Mavetis</div>
                <div class="p-3 text-muted-foreground">Cloud Scanners</div>
            </div>
            {#each rows as row, i}
                <div class="grid grid-cols-3 text-xs {i < rows.length - 1 ? 'border-b border-border' : ''}">
                    <div class="p-3 border-r border-border">{row.feature}</div>
                    <div class="p-3 border-r border-border text-center">
                        {#if row.mavetis}
                            <span class="ph-fill ph-check text-primary"></span>
                        {:else}
                            <span class="ph-fill ph-x text-destructive"></span>
                        {/if}
                    </div>
                    <div class="p-3 text-center">
                        {#if row.cloud}
                            <span class="ph-fill ph-check text-muted-foreground"></span>
                        {:else}
                            <span class="ph-fill ph-x text-destructive"></span>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
