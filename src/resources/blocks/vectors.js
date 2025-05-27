import javascriptGenerator from '../javascriptGenerator';
import { registerBlock } from '../register';
import util from '../util';

const categoryPrefix = 'vector_';
const categoryColor = '#6cd';

function register() {
    registerBlock(`${categoryPrefix}create`, {
        message0: 'vector x: %1 y: %2',
        args0: [
            {
                "type": "field_number",
                "name": "X",
                "check": "Number",
                "value": 0,
                "acceptsBlocks": true
            },
            {
                "type": "field_number",
                "name": "Y",
                "check": "Number",
                "value": 0,
                "acceptsBlocks": true
            }
        ],
        output: "Vector",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X');
        const Y = javascriptGenerator.valueToCode(block, 'Y');
        const code = `new ExtForge.Vector(${X}, ${Y})`;
        return code;
    })
}

export default register;