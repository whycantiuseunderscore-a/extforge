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
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                </tr>
            </table>
        </div>
        <div class="bottom">
            <button>Save</button>
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

    .bottom {

    }
</style>
