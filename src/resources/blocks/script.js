import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';
import util from '../util';

const categoryPrefix = 'script_';
const categoryColor = '#9d5';

function register() {
    registerBlock(`${categoryPrefix}evalb`, {
        message0: 'eval %1',
        args0: [
            {
                "type": "field_input",
                "name": "INPUT",
                "check": "String",
                "text": "alert(\"hi\")",
                "acceptsBlocks": true
            },
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = javascriptGenerator.valueToCode(block, 'INPUT');
        const code = `eval(${INPUT})`;
        return `${code}\n`;
    })
    registerBlock(`${categoryPrefix}evalv`, {
        message0: 'eval %1',
        args0: [
            {
                "type": "field_input",
                "name": "INPUT",
                "check": "String",
                "text": "Math.random()",
                "acceptsBlocks": true
            },
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = javascriptGenerator.valueToCode(block, 'INPUT');
        const code = `eval(${INPUT})`;
        return [code, 0];
    })
}

export default register;