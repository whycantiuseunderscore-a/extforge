import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';
import Blockly from 'blockly/core';

const categoryPrefix = 'inputs_';
const categoryColor = '#69d';

let keys = [
    "any",
    "space",
    "shift",
    "up arrow",
    "down arrow",
    "left arrow",
    "right arrow",
    ["plus", "+"],
    ["minus", "-"],
    ["equals", "="],
    ["underscore", "_"],
    ["colon", ":"],
    ["semicolon", ";"],
    ["period", "."],
    ["comma", ","],
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
].map(v => typeof v == "string" ? [v, v] : v);

function register() {
    registerBlock(`${categoryPrefix}keypress`, {
        message0: 'is key %1 pressed?',
        args0: [
            {
                "type": "field_dropdown",
                "name": "KEY",
                "options": keys,
                "check": "String",
                "acceptsBlocks": true
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const KEY = javascriptGenerator.valueToCode(block, 'KEY');
        const code = `Scratch.vm.runtime.ioDevices.keyboard.getKeyIsDown(${KEY})`;
        return [`${code}`, 0];
    })
    
    registerBlock(`${categoryPrefix}keyspressed`, {
        message0: 'keys pressed',
        args0: [],
        output: "List",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = `Scratch.vm.runtime.ioDevices.keyboard.getAllKeysPressed()`;
        return [`${code}`, 0];
    })
    
    registerBlock(`${categoryPrefix}mousex`, {
        message0: 'mouse x',
        args0: [],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = `Scratch.vm.runtime.ioDevices.mouse.getScratchX()`;
        return [`${code}`, 0];
    })
    registerBlock(`${categoryPrefix}mousey`, {
        message0: 'mouse y',
        args0: [],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = `Scratch.vm.runtime.ioDevices.mouse.getScratchY()`;
        return [`${code}`, 0];
    })

    registerBlock(`${categoryPrefix}moused`, {
        message0: 'mouse down',
        args0: [],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = `Scratch.vm.runtime.ioDevices.mouse.getIsDown()`;
        return [`${code}`, 0];
    })
}

export default register;