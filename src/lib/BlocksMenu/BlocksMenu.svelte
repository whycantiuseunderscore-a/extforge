<script>
    import util from "../../resources/util";
    import CreateButton from "./CreateButton.svelte";
    import Blockly from "blockly/core";

    function updateBlocks() {
        blocks = window.blocks
        window.blocks = blocks
    }

    function createBlock() {
        let id = util.randomHex(16)
        let block = {
            fields: [
                "block"
            ]
        }

        window.blocks[id] = block
        updateBlocks()

        let workspace = Blockly.getMainWorkspace()
        /** @type {Blockly.BlockSvg} */
        let defineBlock = workspace.newBlock("blocks_define")
        defineBlock.blockId_ = id
        defineBlock.updateShape_()
        defineBlock.initSvg()
        defineBlock.render()
    }

    let blocks = {}
</script>

<div class="main">
    <CreateButton on:click={createBlock} />
    {#each Object.entries(blocks) as [id, block]}
        <p>{id}</p>
    {:else}
        <p>no blocks yet!</p>
    {/each}    
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