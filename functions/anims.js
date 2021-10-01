import {bot} from "../config.js";
import * as frames from './materials/animation/frames.js';
import { createRegexCmd } from "./functions.js";

bot.onText(createRegexCmd("anim", "\\d+?"), (msg, match) => {
    bot.sendMessage(msg.chat.id, "anim" + match[1]).then((msg) => {
        const chatId = msg.chat.id;
        const messageId = msg.message_id;
    
        const number = match[1];
        const anim = frames["anim" + number];
        const ms = 61000 / 20;
        const length = Object.keys(anim).length;

        let iter = 1;
        let mainLoop = setInterval(() => {
            bot.editMessageText(anim["frame" + iter++], new Object({chat_id: chatId, message_id: messageId}));
            if(iter == length + 1) iter = 1;
        }, ms);
    
        bot.onText(/\/break/, (msg) => {
            clearInterval(mainLoop); 
        });
    })
});