import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';
import Blockly from 'blockly/core';
import util from '../util';

const categoryPrefix = 'blocks_';
const categoryColor = '#b6f';

function register() {
    registerBlock(`${categoryPrefix}define`, {
        message0: '%1',
        args0: [
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        inputsInline: true,
        colour: categoryColor,
        mutator: `${categoryPrefix}define_mutator`
    }, (block) => {
        return ''
    })
    const defineMutator = {
        blockId_: "",

        mutationToDom: function () {
            var container = Blockly.utils.xml.createElement('mutation');
            container.setAttribute('blockId', this.blockId_);
            return container;
        },

        domToMutation: function (xmlElement) {
            this.blockId_ = xmlElement.getAttribute('blockId') ?? "";
            this.updateShape_();
        },

        updateShape_: function() {
            for (let i = 0; this.removeInput(`INPUT${i}`, true); i++) {}

            let block = window.blocks[this.blockId_]
            if (!block) return
            
            let i = 0
            for (let field of block.fields) {
                switch (field.type) {
                    case "label":
                        this.appendDummyInput(`INPUT${i}`)
                            .appendField(field.text)
                        break;
                }

                this.moveInputBefore(`INPUT${i}`, `BLOCKS`)

                i++
            }
        }
    }
    Blockly.Extensions.unregister(`${categoryPrefix}define_mutator`)
    Blockly.Extensions.registerMutator(
        `${categoryPrefix}define_mutator`,
        defineMutator
    );

}

export default register