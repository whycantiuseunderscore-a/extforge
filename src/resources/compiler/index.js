import javascriptGenerator from '../javascriptGenerator';

const start = `
if (!Scratch.extensions.unsandboxed) {
    alert("This extension needs to be unsandboxed to run!")
    return
}

const ExtForge = {
    Broadcasts: new function() {
        this.raw_ = {};
        this.register = (name, blocks) => {
            this.raw_[name] = blocks;
        };
        this.execute = async (name) => {
            if (this.raw_[name]) {
                await this.raw_[name]();
            };
        };
    },

    Variables: new function() {
        this.raw_ = {};
        this.set = (name, value) => {
            this.raw_[name] = value;
        };
        this.get = (name) => {
            return this.raw_[name] ?? null;
        }
    },

    Utils: {
        setList: (list, index, value) => {
            list[index] = value;
            return list;
        },
        lists_foreach: {
            index: [],
            value: []
        },
        countString: (x, y) => {
            return y.length == 0 ? 0 : x.split(y).length - 1
        }
    }
}
`

class Compiler {
    /**
     * Generates JavaScript code from the provided workspace & info.
     * @param {import('blockly').Workspace} workspace 
     * @param {object} properties
     * @returns {string} Generated code.
     */
    compile(workspace, properties) {
        const code = javascriptGenerator.workspaceToCode(workspace);

        const headerCode = [
            `/*`,
            `   Created with ExtForge`,
            `   https://jwklong.github.io/extforge`,
            `*/`,
            `(async function (Scratch) {`,
            `const variables = {};`,
            ``,
            start
        ];
        const classRegistry = {
            top: [
                `class Extension {`
            ],
            extensionInfo: {},
            bottom: [
                `}`,
                ``,
                `//your code starts here yayayayaya`
            ]
        }
        const footerCode = [
            `Scratch.extensions.register(new Extension());`,
            `})(Scratch);`
        ];

        /** turbobuilder stuff need to port over
        if (imageStates) {
            if (imageStates.icon.image) {
                // add icon uri
                const url = imageStates.icon.image;
                classRegistry.extensionInfo.blockIconURI = url;
            }
            if (imageStates.menuicon.image) {
                // add icon uri
                const url = imageStates.menuicon.image;
                classRegistry.extensionInfo.menuIconURI = url;
            }
        }**/
        classRegistry.extensionInfo.id = properties.id;
        classRegistry.extensionInfo.name = properties.name;
        classRegistry.extensionInfo.color1 = properties.color;

        return [].concat(headerCode, classRegistry.top, [
            `getInfo() {`,
            `   return ${JSON.stringify(classRegistry.extensionInfo).substring(0, JSON.stringify(classRegistry.extensionInfo).length - 1)}}`,
            `}`,
        ], classRegistry.bottom, code, footerCode).join('\n');
    }
}

export default Compiler;