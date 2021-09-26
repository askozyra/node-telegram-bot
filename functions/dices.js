import {bot} from "../config.js";

bot.onText(/^\/darts(?:[^\d]*)?(\d*)(?:[^\d]*)?/, (msg, match) => {
    match[1] == '' ? match[1] = 1 : match[1];

    for(let i = 0; i < match[1]; i++){
        bot.sendDice(msg.chat.id, new Object({emoji: "🎯"}));
    }
});

bot.onText(/^\/cube(?:[^\d]*)?(\d*)(?:[^\d]*)?/, (msg, match) => {
    match[1] == '' ? match[1] = 1 : match[1];

    for(let i = 0; i < match[1]; i++){
        bot.sendDice(msg.chat.id, new Object({emoji: "🎲"}));
    }
});

bot.onText(/^\/basketball(?:[^\d]*)?(\d*)(?:[^\d]*)?/, (msg, match) => {
    match[1] == '' ? match[1] = 1 : match[1];

    for(let i = 0; i < match[1]; i++){
        bot.sendDice(msg.chat.id, new Object({emoji: "🏀"}));
    }
});

bot.onText(/^\/football(?:[^\d]*)?(\d*)(?:[^\d]*)?/, (msg, match) => {
    match[1] == '' ? match[1] = 1 : match[1];

    for(let i = 0; i < match[1]; i++){
        bot.sendDice(msg.chat.id, new Object({emoji: "⚽️"}));
    }
});

bot.onText(/^\/bowling(?:[^\d]*)?(\d*)(?:[^\d]*)?/, (msg, match) => {
    match[1] == '' ? match[1] = 1 : match[1];
    
    for(let i = 0; i < match[1]; i++){
        bot.sendDice(msg.chat.id, new Object({emoji: "🎳"}));
    }
});

bot.onText(/^\/slotmachine(?:[^\d]*)?(\d*)(?:[^\d]*)?/, (msg, match) => {
    match[1] == '' ? match[1] = 1 : match[1];

    for(let i = 0; i < match[1]; i++){
        bot.sendDice(msg.chat.id, new Object({emoji: "🎰"}));
    }
});