import { isRegistered, saveChanges, createRegexCmd } from "./functions.js";
import { users, bot } from "../config.js";

bot.onText(createRegexCmd("register_this_chat", "(.+?)$"), (msg, match) => {
    match[1] == "Administrator" ? match[1] = "someUser" : match[1];
    
    let id = msg.chat.id;
    let name = match[1];
    
    if(isRegistered(id)){
        bot.sendMessage(id, "Chat already exists!");
    } else {
        users[id] = { "name":name };
        saveChanges();

        
        bot.sendMessage(id, "Chat saved successfully!");
    }
});

bot.onText(createRegexCmd("rename_this_chat", "(.+?)"), (msg, match) => {
    let id = msg.chat.id;
    let newName = match[1];

    if(isRegistered(id)){
        users[id]["name"] = newName;
        saveChanges();

        bot.sendMessage(id, "Chat renamed successfully!");
    } else {
        bot.sendMessage(id, "This chat is not registered! Use /register_this_chat [name]");
    }
});

bot.onText(createRegexCmd("remove_this_chat"), (msg) => {
    let id = msg.chat.id;

    if(isRegistered(id)){
        delete users[id];
        saveChanges();

        bot.sendMessage(id, "Chat removed successfully!");
    } else {
        bot.sendMessage(id, "This chat is not registered!");
    }
});

bot.onText(createRegexCmd("name_of_this_chat"), (msg) => {
    let id = msg.chat.id;
    
    if(isRegistered(id)){
        bot.sendMessage(id, "The name of this chat: " + users[id]["name"]);
    } else {
        bot.sendMessage(id, "This chat is not registered!");
    }
});