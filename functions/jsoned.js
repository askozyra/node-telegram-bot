import { bot, users } from "../config.js";
import { saveChanges } from "./functions.js";
import { default as request } from "request";

bot.onText(/^\/jsoned\/login (.*?) (.*?)$/, (msg, match) => {
  try {
    let id = msg.chat.id;
    const LOGIN = match[1];
    const TOKEN = match[2];
  
    users[id]["jsoned_login"] = LOGIN;
    users[id]["jsoned_token"] = TOKEN;
    
    saveChanges();
  } catch(error) {
    console.log(error);
  }
});

// jsoned/api/$type/$id ($method) ({$data})
bot.onText(/^\/jsoned\/api\/(.*?)\/(.*?) \((.+?)\) \(({\s*?.*?\s*?})\)$/, (msg, match) => {
  try{
    const chatId = msg.chat.id;
    const type   = match[1];
    const id     = match[2];
    const method = match[3];
    const data   = JSON.parse(match[4]);
  
    const options = {
      uri: "http://localhost/jsoned/api/" + type + "/" + id,
      method: method,
      headers: {
        "X-USER-Login": users[chatId]["jsoned_login"],
        "X-USER-Token": users[chatId]["jsoned_token"]
      }
    }
  
    switch(method) {
      case "GET":        
        request.get(options, function(err, httpResponse, body) {
          if(httpResponse.statusCode < 200 || httpResponse.statusCode > 299) {
            bot.sendMessage(chatId, body);
            return;
          }

          const dataObj = JSON.parse(body);
          
          if(!id.length) {  
            let res = "";
    
            Object.values(dataObj).forEach(el => {
              res += "[ID]: " + el["id"] + "\n"
                  +  "[TITLE]: " + el["title"] + "\n"
                  +  "[VISIBILITY]: " + el["visibility"] + "\n"
                  +  "[PAYLOAD]: " + el["payload"] + "\n"
                  +  "[CREATED]: " + el["createAt"] + "\n"
                  +  "[MODIFIED]: " + el["modifyAt"] + "\n\n";
                });
                
            bot.sendMessage(chatId, res);
          } else {
            const res = "[ID]: " + dataObj["id"] + "\n"
                      + "[TITLE]: " + dataObj["title"] + "\n"
                      + "[VISIBILITY]: " + dataObj["visibility"] + "\n"
                      + "[PAYLOAD]: " + dataObj["payload"] + "\n"
                      + "[CREATED]: " + dataObj["createAt"] + "\n"
                      + "[MODIFIED]: " + dataObj["modifyAt"];
            bot.sendMessage(chatId, res);
          }
        });
        break;
      
      case "POST":
        request.post(options, function(err, httpResponse, body) {
          bot.sendMessage(chatId, body);
        }).form({
          "title": data["title"],
          "visibility": data["visibility"],
          "payload": JSON.stringify(data["payload"])
        });
        break;
  
      case "PATCH":
        options.body = JSON.stringify(data);
        request.patch(options, function(err, httpResponse, body) {
          bot.sendMessage(chatId, body);
        });
        break;
      
      case "DELETE":
        request.delete(options, function(err, httpResponse, body) {
          bot.sendMessage(chatId, body);
        });
        break;
    }
  } catch(err) {
    console.log(err);
  }
});

