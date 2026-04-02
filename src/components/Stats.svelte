<script lang="ts">
    import Card from "$lib/components/ui/card/card.svelte";
    import CardContent from "$lib/components/ui/card/card-content.svelte";

    const stats = [
        { value: "0", label: "Third-Party Dependencies", desc: "Pure Go standard library only" },
        { value: "0", label: "Network Requests", desc: "Complete offline operation" },
        { value: "0", label: "Telemetry", desc: "No tracking or data collection" },
        { value: "3", label: "Output Formats", desc: "Text, JSON, and SARIF" }
    ];
</script>

<section class="w-full border-b">
    <div class="max-w-6xl mx-auto px-5 md:px-10 py-16">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {#each stats as stat}
                <Card>
                    <CardContent class="flex flex-col gap-1 text-center items-center">
                        <span class="text-2xl md:text-3xl font-bold text-primary">{stat.value}</span>
                        <span class="text-sm font-semibold">{stat.label}</span>
                        <span class="text-xs text-muted-foreground">{stat.desc}</span>
                    </CardContent>
                </Card>
            {/each}
        </div>
    </div>
</section>
