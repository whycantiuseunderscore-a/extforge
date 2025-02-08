import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';
import Blockly from 'blockly/core';
import util from '../util';

const categoryPrefix = 'blocks_';
const categoryColor = '#b6f';

function register() {
    registerBlock(`${categoryPrefix}define`, {
        message0: '%1 %2',
        args0: [
            {
                "type": "input_dummy",
                "name": "DUMMY"
            },
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
            if (this.getField("ID")) this.getInput("DUMMY").removeField("ID")
            this.getInput("DUMMY").appendField(this.blockId_, "ID")
        }
    }
    Blockly.Extensions.unregister(`${categoryPrefix}define_mutator`)
    Blockly.Extensions.registerMutator(
        `${categoryPrefix}define_mutator`,
        defineMutator
    );

}

export default register