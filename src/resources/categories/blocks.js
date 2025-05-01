export default (workspace) => {
    workspace.registerToolboxCategoryCallback("blocks", () => {
        let blockList = []

        if (window.blocks) {
            for (let blockId of Object.keys(window.blocks)) {
                let node = document.createElement('block')
                node.setAttribute('type', 'blocks_execute')
                let mutation = document.createElement('mutation')
                mutation.setAttribute('blockId', blockId)
                node.appendChild(mutation)

                blockList.push(node)
            }
        }

        return blockList;
    });
};