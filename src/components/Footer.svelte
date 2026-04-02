<script lang="ts">
    const links = [
        { label: "Documentation", href: "https://github.com/pimatis/mavetis#readme" },
        { label: "GitHub", href: "https://github.com/pimatis/mavetis" },
        { label: "Releases", href: "https://github.com/pimatis/mavetis/releases" }
    ];
</script>

<footer class="w-full">
    <div class="max-w-6xl mx-auto px-5 md:px-10 py-10">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="flex flex-col gap-1">
                <a href="/">
                    <img src="https://cdn.pimatis.org/mavetis-text-logo.png" alt="Mavetis Logo" class="w-20">
                </a>
                <span class="text-xs text-muted-foreground">Enterprise-grade security analysis for Git workflows</span>
            </div>
            <div class="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-6">
                {#each links as link}
                    <a href={link.href} class="text-xs text-muted-foreground hover:text-foreground transition-colors">{link.label}</a>
                {/each}
            </div>
        </div>
        <div class="mt-8 pt-6 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span class="text-xs text-muted-foreground">© {new Date().getFullYear()} <a href="https://pimatis.org" class="hover:text-primary">Pimatis</a></span>
            <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <span class="ph-fill ph-shield-check text-primary"></span>
                <span>No third-party dependencies. Zero cloud services.</span>
            </div>
        </div>
    </div>
</footer>
