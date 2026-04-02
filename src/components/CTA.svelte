<script lang="ts">
    import { onMount } from "svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Card from "$lib/components/ui/card/card.svelte";
    import CardContent from "$lib/components/ui/card/card-content.svelte";

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
    <div class="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-20">
        <Card class="rounded-none">
            <CardContent class="flex flex-col gap-8 px-8 md:px-12">
                <div class="flex flex-col gap-3">
                    <h2 class="text-xl font-bold tracking-tight">Start Securing Your Codebase</h2>
                    <p class="text-muted-foreground text-sm max-w-md">
                        No account required. No data leaves your machine. Pure Go. Zero dependencies.
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
                </div>
                <div class="flex flex-col gap-3">
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
                </div>
                <div class="flex gap-3">
                    <Button variant="outline" href="https://github.com/pimatis/mavetis" class="px-5">
                        <span class="ph-fill ph-github-logo mr-1.5"></span>
                        GitHub
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
</section>
