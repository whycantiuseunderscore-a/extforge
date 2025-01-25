/** @param {import('blockly').Workspace} workspace */
function register(workspace) {
    workspace.registerButtonCallback("variables_register", () => {
        window.modals['createVariable'].toggle()
    });
}

export default register;