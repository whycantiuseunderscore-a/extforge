import javascriptGenerator from '../javascriptGenerator';
import { registerBlock, registerMutator } from '../register';
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
    /** @type {Blockly.Block} */
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
                    case "string":
                        let input = this.appendValueInput(`INPUT${i}`)
                        let reporter = this.workspace.newBlock(`${categoryPrefix}input`)
                        reporter.blockId_ = this.blockId_
                        reporter.fieldId_ = field.id
                        reporter.setShadow(true)
                        reporter.initSvg()
                        reporter.render()
                        reporter.outputConnection.connect(input.connection)
                }

                this.moveInputBefore(`INPUT${i}`, `BLOCKS`)

                i++
            }
        }
    }
    registerMutator(
        `${categoryPrefix}define_mutator`,
        defineMutator
    );

    registerBlock(`${categoryPrefix}input`, {
        message0: '',
        output: null,
        inputsInline: true,
        canDragDuplicate: true,
        colour: categoryColor,
        mutator: `${categoryPrefix}input_mutator`
    }, (block) => {
        let root = block.getRootBlock()
        if (!(root.type == `${categoryPrefix}define` && root.blockId_ == block.blockId_)) {
            return `()`
        }

        return `args["${block.fieldId_}"]`
    })
    /** @type {Blockly.Block} */
    const inputMutator = {
        blockId_: "",
        fieldId_: "",

        mutationToDom: function () {
            var container = Blockly.utils.xml.createElement('mutation');
            container.setAttribute('blockId', this.blockId_);
            container.setAttribute('fieldId', this.fieldId_);
            return container;
        },

        domToMutation: function (xmlElement) {
            this.blockId_ = xmlElement.getAttribute('blockId') ?? "";
            this.fieldId_ = xmlElement.getAttribute('fieldId') ?? "";
            this.updateShape_();
        },

        updateShape_: function() {
            let text = ""
            let block
            let field
            try {
                block = window.blocks[this.blockId_]
                field = block.fields.find(v => v.id == this.fieldId_)
            } catch {}

            this.removeInput("TEXT", true)
            this.appendDummyInput("TEXT")
                .appendField(field.text)
        }
    }
    registerMutator(
        `${categoryPrefix}input_mutator`,
        inputMutator
    );
}

export default register