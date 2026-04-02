<script lang="ts">
    import Navbar from "../components/Navbar.svelte";
    import Footer from "../components/Footer.svelte";
    import { page } from "$app/stores";
    import Button from "$lib/components/ui/button/button.svelte";
</script>

<Navbar />

<div class="min-h-screen flex flex-col">
    <main class="flex-1 flex items-center justify-center">
        <div class="max-w-6xl w-full mx-auto px-5 md:px-10 py-16 md:py-24">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="flex flex-col gap-6">
                    <div class="inline-flex items-center gap-2 text-xs text-muted-foreground border border-border px-3 py-1.5 w-fit">
                        <span class="ph-fill ph-warning text-destructive"></span>
                        <span>Error {$page.status}</span>
                    </div>
                    <h1 class="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                        {#if $page.status === 404}
                            Resource Not Found
                        {:else}
                            Something Went Wrong
                        {/if}
                    </h1>
                    <p class="text-muted-foreground text-sm leading-relaxed max-w-md">
                        {#if $page.status === 404}
                            The requested resource could not be located. It may have been moved, deleted, or never existed.
                        {:else}
                            An unexpected error occurred during the request. Please try again or return to the homepage.
                        {/if}
                    </p>
                    <div class="flex gap-3 mt-2">
                        <Button variant="default" href="/" class="px-5">
                            <span class="ph-fill ph-arrow-left mr-1.5"></span>
                            Back to Home
                        </Button>
                        <Button variant="outline" href="https://github.com/pimatis/mavetis" class="px-5">
                            <span class="ph-fill ph-github-logo mr-1.5"></span>
                            GitHub
                        </Button>
                    </div>
                </div>

                <div class="bg-card border border-border">
                    <div class="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/50">
                        <span class="w-2.5 h-2.5 border border-border"></span>
                        <span class="w-2.5 h-2.5 border border-border"></span>
                        <span class="w-2.5 h-2.5 border border-border"></span>
                        <span class="text-xs text-muted-foreground ml-2">~/mavetis — error</span>
                    </div>
                    <div class="p-4 text-xs leading-relaxed font-mono space-y-1">
                        <p class="text-muted-foreground">$ <span class="text-foreground">mavetis diagnose --url {$page.url?.pathname ?? "/"}</span></p>
                        <p class="mt-3"><span class="text-muted-foreground">Status:</span> {$page.status}</p>
                        <p><span class="text-muted-foreground">Type:</span> {$page.status === 404 ? "NOT_FOUND" : "INTERNAL_ERROR"}</p>
                        <p class="mt-4"></p>
                        <p class="text-destructive font-semibold">[ERROR] Request failed</p>
                        <p><span class="text-muted-foreground">Code:</span> {$page.status}</p>
                        <p><span class="text-muted-foreground">Path:</span> {$page.url?.pathname ?? "/"}</p>
                        <p class="text-muted-foreground mt-1">Message: <span class="text-foreground">{$page.error?.message ?? "Unknown error"}</span></p>
                        <p class="mt-4"></p>
                        <p class="text-muted-foreground">$ <span class="text-foreground">mavetis suggest</span></p>
                        <p class="mt-2 text-primary">→ Verify the URL path</p>
                        <p class="text-primary">→ Check for typos in the address</p>
                        <p class="text-primary">→ Return to the homepage</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>

<Footer />
