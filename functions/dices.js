import {bot} from "../config.js";
import { createRegexCmd } from "./functions.js";

bot.onText(createRegexCmd("darts", "(\\d*)"), (msg, match) => {
    match[1] == '' ? match[1] = 1 : match[1];

    for(let i = 0; i < match[1]; i++){
        bot.sendDice(msg.chat.id, new Object({emoji: "🎯"}));
    }
});

bot.onText(createRegexCmd("cube", "(\\d*)"), (msg, match) => {
    match[1] == '' ? match[1] = 1 : match[1];

    for(let i = 0; i < match[1]; i++){
        bot.sendDice(msg.chat.id, new Object({emoji: "🎲"}));
    }
});

bot.onText(createRegexCmd("basketball", "(\\d*)"), (msg, match) => {
    match[1] == '' ? match[1] = 1 : match[1];

    for(let i = 0; i < match[1]; i++){
        bot.sendDice(msg.chat.id, new Object({emoji: "🏀"}));
    }
});

bot.onText(createRegexCmd("football", "(\\d*)"), (msg, match) => {
    match[1] == '' ? match[1] = 1 : match[1];

    for(let i = 0; i < match[1]; i++){
        bot.sendDice(msg.chat.id, new Object({emoji: "⚽️"}));
    }
});

bot.onText(createRegexCmd("bowling", "(\\d*)"), (msg, match) => {
    match[1] == '' ? match[1] = 1 : match[1];
    
    for(let i = 0; i < match[1]; i++){
        bot.sendDice(msg.chat.id, new Object({emoji: "🎳"}));
    }
});

bot.onText(createRegexCmd("slotmachine", "(\\d*)"), (msg, match) => {
    match[1] == '' ? match[1] = 1 : match[1];

    for(let i = 0; i < match[1]; i++){
        bot.sendDice(msg.chat.id, new Object({emoji: "🎰"}));
    }
});