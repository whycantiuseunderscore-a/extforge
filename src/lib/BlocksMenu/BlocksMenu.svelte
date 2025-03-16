<script>
    import util from "../../resources/util";
    import CreateButton from "./CreateButton.svelte";
    import Blockly from "blockly/core";

    function updateBlocks() {
        blocks = window.blocks
        window.blocks = blocks

        //refresh workspace
        let workspace = Blockly.getMainWorkspace()
        let xml = Blockly.Xml.workspaceToDom(workspace);
        workspace.clear();
        Blockly.Xml.domToWorkspace(xml, workspace);
        this.refreshToolboxSelection();
    }

    function createBlock() {
        if (!confirm("Are you sure you want to make a block?")) return

        let id = util.randomHex(16)
        let block = {
            fields: [
                "block"
            ]
        }
        window.blocks[id] = block

        let workspace = Blockly.getMainWorkspace()
        /** @type {Blockly.BlockSvg} */
        let defineBlock = workspace.newBlock("blocks_define")
        defineBlock.setDeletable(false)
        defineBlock.blockId_ = id
        defineBlock.updateShape_()
        defineBlock.initSvg()
        defineBlock.render()

        updateBlocks()
    }

    function editBlock(id) {
        window.modals["editblock"].blockId = id
        window.modals["editblock"].toggle()
    }

    let blocks = {}
</script>

<div class="main">
    <CreateButton on:click={createBlock} />
    {#each Object.entries(blocks) as [id, block]}
        <div class="block">
            <span class="name">{block.fields[0]}</span>
            <div>
                <button class="edit" on:click={() => editBlock(id)}>Edit</button>
            </div>
        </div>
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
        gap: 0.5em;
    }

    .block {
        background: #8884;
        width: 100%;
        height: 4em;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 0.8em;
        box-sizing: border-box;
        padding: 8px;
    }

    .block button {
        appearance: none;
        border: none;
        background: #4bf;
        width: 100%;
        font-size: 1rem;
        padding: 0.4rem 1rem;
        border-radius: 0.2em;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
        font-weight: bold;
    }
</style>