import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';
import Blockly from 'blockly/core';

const categoryPrefix = 'math_';
const categoryColor = '#6d6';

function register() {
    registerBlock(`${categoryPrefix}number`, {
        message0: '%1 to number',
        args0: [
            {
                "type": "input_value",
                "name": "INPUT"
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = javascriptGenerator.valueToCode(block, 'INPUT') || "null";
        const code = `Scratch.Cast.toNumber(${INPUT})`;
        return [`${code}`, 0];
    })
    registerBlock(`${categoryPrefix}boolean`, {
        message0: '%1 to boolean',
        args0: [
            {
                "type": "input_value",
                "name": "INPUT"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = javascriptGenerator.valueToCode(block, 'INPUT') || "null";
        const code = `Scratch.Cast.toBoolean(${INPUT})`;
        return [`${code}`, 0];
    })

    registerBlock(`${categoryPrefix}add`, {
        message0: '%1 + %2',
        args0: [
            {
                "type": "field_number",
                "name": "X",
                "check": "Number",
                "value": 1,
                "acceptsBlocks": true
            },
            {
                "type": "field_number",
                "name": "Y",
                "check": "Number",
                "value": 1,
                "acceptsBlocks": true
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X');
        const Y = javascriptGenerator.valueToCode(block, 'Y');
        const code = `(${X} + ${Y})`;
        return [`${code}`, 0];
    })
    registerBlock(`${categoryPrefix}sub`, {
        message0: '%1 - %2',
        args0: [
            {
                "type": "field_number",
                "name": "X",
                "check": "Number",
                "value": 1,
                "acceptsBlocks": true
            },
            {
                "type": "field_number",
                "name": "Y",
                "check": "Number",
                "value": 1,
                "acceptsBlocks": true
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X');
        const Y = javascriptGenerator.valueToCode(block, 'Y');
        const code = `(${X} - ${Y})`;
        return [`${code}`, 0];
    })
    registerBlock(`${categoryPrefix}mul`, {
        message0: '%1 × %2',
        args0: [
            {
                "type": "field_number",
                "name": "X",
                "check": "Number",
                "value": 1,
                "acceptsBlocks": true
            },
            {
                "type": "field_number",
                "name": "Y",
                "check": "Number",
                "value": 1,
                "acceptsBlocks": true
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X');
        const Y = javascriptGenerator.valueToCode(block, 'Y');
        const code = `(${X} * ${Y})`;
        return [`${code}`, 0];
    })
    registerBlock(`${categoryPrefix}div`, {
        message0: '%1 ÷ %2',
        args0: [
            {
                "type": "field_number",
                "name": "X",
                "check": "Number",
                "value": 1,
                "acceptsBlocks": true
            },
            {
                "type": "field_number",
                "name": "Y",
                "check": "Number",
                "value": 1,
                "acceptsBlocks": true
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X');
        const Y = javascriptGenerator.valueToCode(block, 'Y');
        const code = `(${X} / ${Y})`;
        return [`${code}`, 0];
    })
    registerBlock(`${categoryPrefix}pow`, {
        message0: '%1 ^ %2',
        args0: [
            {
                "type": "field_number",
                "name": "X",
                "check": "Number",
                "value": 1,
                "acceptsBlocks": true
            },
            {
                "type": "field_number",
                "name": "Y",
                "check": "Number",
                "value": 1,
                "acceptsBlocks": true
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X');
        const Y = javascriptGenerator.valueToCode(block, 'Y');
        const code = `(${X} ** ${Y})`;
        return [`${code}`, 0];
    })
    registerBlock(`${categoryPrefix}log`, {
        message0: 'log %1 %2',
        args0: [
            {
                "type": "field_number",
                "name": "X",
                "check": "Number",
                "value": 10,
                "acceptsBlocks": true
            },
            {
                "type": "field_number",
                "name": "Y",
                "check": "Number",
                "value": 1,
                "acceptsBlocks": true
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X');
        const Y = javascriptGenerator.valueToCode(block, 'Y');
        const code = `(Math.log(${Y}) / Math.log(${X}))`;
        return [`${code}`, 0];
    })
    
    registerBlock(`${categoryPrefix}const`, {
        message0: '%1',
        args0: [
            {
                "type": "field_dropdown",
                "name": "CHOICE",
                "options": [
                    ["pi", "Math.PI"],
                    ["e", "Math.E"]
                ]
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const CHOICE = block.getFieldValue("CHOICE")
        const code = `${CHOICE}`;
        return [`${code}`, 0];
    })

    registerBlock(`${categoryPrefix}true`, {
        message0: 'true',
        args0: [],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = `true`;
        return [`${code}`, 0];
    })
    registerBlock(`${categoryPrefix}false`, {
        message0: 'false',
        args0: [],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = `true`;
        return [`${code}`, 0];
    })
    registerBlock(`${categoryPrefix}randombool`, {
        message0: 'random',
        args0: [],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = `(Math.random() > .5)`;
        return [`${code}`, 0];
    })
    
    registerBlock(`${categoryPrefix}and`, {
        message0: '%1 and %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Boolean"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Boolean"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X') || 'false';
        const Y = javascriptGenerator.valueToCode(block, 'Y') || 'false';
        const code = `(${X} && ${Y})`;
        return [`${code}`, 0];
    })
    registerBlock(`${categoryPrefix}xor`, {
        message0: '%1 xor %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Boolean"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Boolean"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X') || 'false';
        const Y = javascriptGenerator.valueToCode(block, 'Y') || 'false';
        const code = `(${X} != ${Y})`;
        return [`${code}`, 0];
    })
    registerBlock(`${categoryPrefix}or`, {
        message0: '%1 or %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Boolean"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Boolean"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X') || 'false';
        const Y = javascriptGenerator.valueToCode(block, 'Y') || 'false';
        const code = `(${X} || ${Y})`;
        return [`${code}`, 0];
    })
    registerBlock(`${categoryPrefix}not`, {
        message0: 'not %1',
        args0: [
            {
                "type": "input_value",
                "name": "BOOL",
                "check": "Boolean"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const BOOL = javascriptGenerator.valueToCode(block, 'BOOL') || 'false';
        const code = `(!${BOOL})`;
        return [`${code}`, 0];
    })
}

export default register;