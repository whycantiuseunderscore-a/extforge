<script>
    import Modal from "./Modal.svelte";

    let id = "editblock";

    import Blockly from "blockly/core";

    import En from "blockly/msg/en";
    import "blockly/blocks";
    import "blockly/javascript";

    import BlocklyComponent from "$lib/svelte-blockly";
    import { onMount } from "svelte";
    /** @type {Blockly.WorkspaceSvg} */
    let workspace;

    const en = {
        rtl: false,
        msg: {
            ...En,
        },
    };

    const config = {
        scrollbars: false,
        readOnly: true,
        renderer: "custom_renderer",
        zoom: {
            controls: false,
            wheel: true,
            startScale: 0.8,
            maxScale: 2,
            minScale: 0.5,
            scaleSpeed: 1.1,
        },
    };

    function updateBlocks() {
        //refresh workspace
        try {
            let workspace = window.workspace
            let xml = Blockly.Xml.workspaceToDom(workspace);
            workspace.clear();
            Blockly.Xml.domToWorkspace(xml, workspace);
            this.refreshToolboxSelection();
        } catch {}
    }

    function saveBlock(data) {
        data.toggle()
        window.blocks[data.blockId] = data.tempBlock
        updateBlocks()
    }

    onMount(() => {
        /** @type {Blockly.BlockSvg} */
        let previewBlock = workspace.newBlock("blocks_execute");
        //previewBlock.blockId_ = id
        //previewBlock.updateShape_()
        previewBlock.initSvg();
        previewBlock.render();
    });
</script>

<Modal {id} title="Edit Block" let:data>
    <div class="main">
        <div class="preview">
            <BlocklyComponent {config} locale={en} bind:workspace />
        </div>
        <div class="fields">
            <table class="fields">
                <tr>
                    <th>Type</th>
                    <th>Text</th>
                    <th><!-- options --></th>
                </tr>
                {#each Object.keys(data.tempBlock ? data.tempBlock.fields : {}) as i}
                    <tr>
                        <td>
                            <select value={data.tempBlock.fields[i].type} on:change={(e) => {
                                data.tempBlock.fields[i].type = e.target.value
                                updateBlocks()
                            }}>
                                <option value="label">Label</option>
                                <option value="string">String</option>
                                <option value="number">Number</option>
                                <option value="boolean">Boolean</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" value={data.tempBlock.fields[i].text} on:change={(e) => {
                                data.tempBlock.fields[i].text = e.target.value
                                updateBlocks()
                            }} />
                        </td>
                        <td></td>
                    </tr>
                {/each}
            </table>
        </div>
        <div class="bottom">
            <!--<button on:click={() => saveBlock(data)}>Save</button>-->
        </div>
    </div>
</Modal>

<style>
    .main {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 8px;
    }

    .preview {
        flex: 1;
    }

    .fields {
        flex: 2;
        overflow-y: scroll
    }

    .fields table {
        width: 100%;
    }

    .fields th:nth-child(1) {
        width: 20%;
    }
    .fields th:nth-child(2) {
        width: 30%;
    }
    .fields th:nth-child(3) {
        width: 50%;
    }

    .bottom {

    }
</style>
