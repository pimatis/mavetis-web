<script lang="ts">
    const workflowSteps = [
        { icon: "ph-fill ph-code", label: "Developer stages changes", cmd: "git add ." },
        { icon: "ph-fill ph-shield-check", label: "Mavetis scans locally", cmd: "mavetis review --staged" },
        { icon: "ph-fill ph-list-checks", label: "Findings analyzed", cmd: "Profile & zone rules applied" },
        { icon: "ph-fill ph-prohibit", label: "Regressions blocked", cmd: "Pre-commit hook enforced" }
    ];
</script>

<section class="w-full border-b">
    <div class="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-20">
        <div class="text-center mb-12">
            <h2 class="text-xl font-bold tracking-tight">How It Works</h2>
            <p class="text-muted-foreground text-sm mt-2">Security regression blocked before merge</p>
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-0">
            {#each workflowSteps as step, i}
                <div class="flex-1 flex flex-col items-center gap-3 p-6 text-center">
                    <div class="w-10 h-10 border border-border bg-secondary flex items-center justify-center">
                        <span class="{step.icon} text-primary"></span>
                    </div>
                    <span class="text-xs font-medium">{step.label}</span>
                    <span class="text-xs text-muted-foreground font-mono">{step.cmd}</span>
                </div>
                {#if i < workflowSteps.length - 1}
                    <span class="ph-fill ph-arrow-right text-muted-foreground hidden sm:block"></span>
                    <span class="ph-fill ph-arrow-down text-muted-foreground block sm:hidden"></span>
                {/if}
            {/each}
        </div>
    </div>
</section>
