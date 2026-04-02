<script lang="ts">
    import { onMount } from "svelte";
    import Button from "$lib/components/ui/button/button.svelte";

    let stars = $state(0);
    let version = $state("");
    let loading = $state(true);

    let items = [
      {
        name: "Github",
        href: "https://github.com/pimatis/mavetis",
        icon: "ph-fill ph-github-logo"
      },
      {
        name: "Support",
        href: "mailto:hi@pimatis.org",
        icon: "ph-fill ph-envelope"
      }
    ];

    onMount(async () => {
        const [starsRes, releasesRes] = await Promise.all([
            fetch("/api/github/stars"),
            fetch("/api/github/releases")
        ]);
        const starsData = await starsRes.json();
        const releasesData = await releasesRes.json();
        stars = starsData.stars;
        version = releasesData.version;
        loading = false;
    });
</script>

<nav class="w-full h-14 bg-card border-b flex items-center">
    <div class="max-w-6xl w-full mx-auto px-5 md:px-10 flex items-center">
        <div class="flex items-center gap-2">
            <a href="/">
                <img src="https://cdn.pimatis.org/mavetis-text-logo.png" alt="Mavetis Logo" class="w-20">
            </a>
            {#if loading}
                <span class="flex items-center gap-1 text-xs text-muted-foreground">
                    <span class="ph ph-spinner animate-spin"></span>
                    Loading
                </span>
            {:else if version}
                <span class="text-xs text-muted-foreground border border-border px-2 py-0.5">{version}</span>
            {/if}
        </div>
        <div class="flex items-center gap-1 ml-auto">
            {#each items as item}
                <Button variant="ghost" href={item.href} class="group flex items-center">
                    <span class={item.icon}></span>
                    <span class="max-w-0 overflow-hidden opacity-0 group-hover:max-w-25 group-hover:opacity-100 group-hover:pl-1 transition-all duration-400 ease-in-out whitespace-nowrap">{item.name}</span>
                </Button>
            {/each}
            {#if stars > 0}
                <span class="text-muted-foreground mx-1">|</span>
                <a href="https://github.com/pimatis/mavetis" class="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                    <span class="ph-fill ph-star text-primary"></span>
                    {stars}
                </a>
            {/if}
        </div>
    </div>
</nav>
