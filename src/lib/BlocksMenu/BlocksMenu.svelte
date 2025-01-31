<script>
    import CreateButton from "./CreateButton.svelte";
</script>

<div class="main">
    <CreateButton />
</div>

<style>
    .main {
        padding: 16px;
        display: flex;
        width: min(calc(100vw - 32px), 1024px);
        flex-direction: column;
        align-items: center;
        margin: auto;
    }
</style>