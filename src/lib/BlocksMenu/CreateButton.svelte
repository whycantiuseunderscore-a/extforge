<script>
    import Plus from '$lib/images/nav/plus.svg'
</script>

<button on:click>
    <img src={Plus} />
</button>

<style>
    button {
        appearance: none;
        border: none;
        background: linear-gradient(#2bf, #49f);
        width: 100%;
        font-size: 4em;
        padding: 0;
        border-radius: 0.2em;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
    }

    img {
        opacity: 0.8;
        width: 0.7em;
        padding: 0.1em;
    }
</style>