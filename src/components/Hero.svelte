<script lang="ts">
    import { onMount } from "svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";

    let os: "macos" | "linux" | "windows" = $state("linux");
    let copied = $state(false);
    let version = $state("");
    let loading = $state(true);

    const installCommands = {
        macos: "curl -fsSL https://raw.githubusercontent.com/pimatis/mavetis/main/install.sh | sh",
        linux: "curl -fsSL https://raw.githubusercontent.com/pimatis/mavetis/main/install.sh | sh",
        windows: "iwr https://raw.githubusercontent.com/pimatis/mavetis/main/install.ps1 -UseBasicParsing | iex"
    };

    const osLabels = {
        macos: "macOS / Linux",
        linux: "macOS / Linux",
        windows: "Windows PowerShell"
    };

    onMount(async () => {
        const platform = navigator.userAgent;
        if (platform.includes("Win")) os = "windows";
        else if (platform.includes("Mac")) os = "macos";
        else os = "linux";

        const res = await fetch("/api/github/releases");
        const data = await res.json();
        version = data.version;
        loading = false;
    });

    function copyCommand() {
        navigator.clipboard.writeText(installCommands[os]);
        copied = true;
        setTimeout(() => copied = false, 2000);
    }
</script>

<section class="w-full border-b">
    <div class="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div class="flex flex-col gap-6">
            <h1 class="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                Secure Every Git Diff Before It Ships
            </h1>
            <p class="text-muted-foreground text-sm leading-relaxed max-w-md">
                Enterprise-grade security analysis for Git workflows. Comprehensive static analysis on code changes with complete network isolation. Zero telemetry. Zero dependencies.
            </p>
            {#if loading}
                <span class="flex items-center gap-1.5 text-xs text-muted-foreground w-fit">
                    <span class="ph ph-spinner animate-spin"></span>
                    Loading
                </span>
            {:else if version}
                <a href="https://github.com/pimatis/mavetis/releases" class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit">
                    <span class="ph-fill ph-tag text-primary"></span>
                    Latest: {version}
                </a>
            {/if}
            <div class="flex flex-col gap-3 mt-2">
                <div class="flex gap-1 text-xs">
                    <button onclick={() => os = "macos"} class="px-3 py-1.5 border border-border transition-colors {(os === 'macos' || os === 'linux') ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}">macOS & Linux</button>
                    <button onclick={() => os = "windows"} class="px-3 py-1.5 border border-border transition-colors {os === 'windows' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}">Windows</button>
                </div>
                <div class="flex items-center gap-2 border border-border px-3 py-1">
                    <span class="text-xs text-muted-foreground shrink-0">{osLabels[os]}</span>
                    <Input readonly value={installCommands[os]} class="border-0 bg-transparent px-0 h-7 text-xs font-mono flex-1 truncate" />
                    <button onclick={copyCommand} aria-label="Copy command" class="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                        {#if copied}
                            <span class="ph-fill ph-check text-primary"></span>
                        {:else}
                            <span class="ph-fill ph-copy"></span>
                        {/if}
                    </button>
                </div>
                <div class="flex gap-3">
                    <Button variant="outline" href="https://github.com/pimatis/mavetis" class="px-5">
                        <span class="ph-fill ph-github-logo mr-1.5"></span>
                        GitHub
                    </Button>
                </div>
            </div>
        </div>

        <div class="bg-card border border-border">
            <div class="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/50">
                <span class="w-2.5 h-2.5 border border-border"></span>
                <span class="w-2.5 h-2.5 border border-border"></span>
                <span class="w-2.5 h-2.5 border border-border"></span>
                <span class="text-xs text-muted-foreground ml-2">~/project/mavetis</span>
            </div>
            <div class="p-4 text-xs leading-relaxed font-mono space-y-1">
                <p class="text-muted-foreground">$ <span class="text-foreground">mavetis review --staged</span></p>
                <p class="mt-3"><span class="text-muted-foreground">Mode:</span> staged</p>
                <p><span class="text-muted-foreground">Files:</span> 9</p>
                <p><span class="text-muted-foreground">Findings:</span> 14 <span class="text-muted-foreground">(critical=3 high=11 medium=0 low=0)</span></p>
                <p class="mt-4"></p>
                <p class="text-destructive font-semibold">[CRITICAL] Auth middleware removed from protected route</p>
                <p><span class="text-muted-foreground">Rule:</span> authorization.scope.deleted</p>
                <p><span class="text-muted-foreground">File:</span> src/routes/admin/ban/+page.server.ts:42</p>
                <p><span class="text-muted-foreground">Confidence:</span> high</p>
                <p class="text-muted-foreground mt-1">Snippet: <span class="text-foreground">export const POST = async (req) =&gt;</span></p>
                <p class="mt-4"></p>
                <p class="text-yellow-500 font-semibold">[HIGH] File upload without MIME validation</p>
                <p><span class="text-muted-foreground">Rule:</span> semantic.upload.unsafe</p>
                <p><span class="text-muted-foreground">File:</span> src/controllers/photo.controller.ts:87</p>
                <p><span class="text-muted-foreground">Confidence:</span> high</p>
                <p class="text-muted-foreground mt-1">Snippet: <span class="text-foreground">const buffer = await file.arrayBuffer();</span></p>
            </div>
        </div>
    </div>
</section>
