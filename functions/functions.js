import * as configs from "../config.js";
import fs from "fs";

import {google} from "googleapis";

import youtubedl from "youtube-dl-exec";
import request from "request";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegPath.path);

function isRegistered(msgId){
    return configs.users[msgId] != null;
}

function saveChanges(){
    configs.fs.writeFile(configs.dbPath, JSON.stringify(configs.users), 'utf8', ()=>{});
}

function lytdybr(str){
    let letters = {64: "\"", 35: "№", 36: ";", 94: ":", 38: "?", 65: 'Ф', 66: 'И', 67: 'С', 68: 'В', 69: 'У', 70: 'А', 71: 'П', 72: 'Р', 73: 'Ш', 74: 'О', 75: 'Л', 76: 'Д', 77: 'Ь', 78: 'Т', 79: 'Щ', 80: 'З', 81: 'Й', 82: 'К', 83: 'Ы', 84: 'Е', 85: 'Г', 86: 'М', 87: 'Ц', 88: 'Ч', 89: 'Н', 90: 'Я', 97: 'ф', 98: 'и', 99: 'с', 100: 'в', 101: 'у', 102: 'а', 103: 'п', 104: 'р', 105: 'ш', 106: 'о', 107: 'л', 108: 'д', 109: 'ь', 110: 'т', 111: 'щ', 112: 'з', 113: 'й', 114: 'к', 115: 'ы', 116: 'е', 117: 'г', 118: 'м', 119: 'ц', 120: 'ч', 121: 'н', 122: 'я', 123: "Х", 91: "х", 93: "ъ", 125: "Ъ", 96: "ё", 126: "Ё", 44: "б", 60: "Б", 46: "ю", 62: "Ю", 47: ".", 63: ",", 59: "ж", 58: "Ж", 39: "э", 34: "Э"};
    
    let res = "";

    for(let i = 0; i < str.length; i++){
        let c = str.charCodeAt(i);
        if(letters[c])
            res += letters[str.charCodeAt(i)];
        else res += str[i];
    }

    return res;
}

function textPrettier(str){
    let pretty_letters = {65: '𝓐', 66: '𝓑', 67: '𝓒', 68: '𝓓', 69: '𝓔', 70: '𝓕', 71: '𝓖', 72: '𝓗', 73: '𝓘', 74: '𝓙', 75: '𝓚', 76: '𝓛', 77: '𝓜', 78: '𝓝', 79: '𝓞', 80: '𝓟', 81: '𝓠', 82: '𝓡', 83: '𝓢', 84: '𝓣', 85: '𝓤', 86: '𝓥', 87: '𝓦', 88: '𝓧', 89: '𝓨', 90: '𝓩', 97: '𝓪', 98: '𝓫', 99: '𝓬', 100: '𝓭', 101: '𝓮', 102: '𝓯', 103: '𝓰', 104: '𝓱', 105: '𝓲', 106: '𝓳', 107: '𝓴', 108: '𝓵', 109: '𝓶', 110: '𝓷', 111: '𝓸', 112: '𝓹', 113: '𝓺', 114: '𝓻', 115: '𝓼', 116: '𝓽', 117: '𝓾', 118: '𝓿', 119: '𝔀', 120: '𝔁', 121: '𝔂', 122: '𝔃'};
   
    let res = '';

    for(let i = 0; i < str.length; i++){
        let c = str.charCodeAt(i);
        if((c >= 65 && c <= 90) || (c >= 97 && c <= 122))
            res += pretty_letters[str.charCodeAt(i)];
        else res += str[i];
    }

    return res;
}

function findVideoYT(msg, song_info){
    const youtube = google.youtube({
		version: 'v3',
		auth: process.env["YOUTUBE_API_KEY"]
	});

    youtube.search.list({
    	part: 'snippet',
    	q: song_info
	},
    (err, data) => {
        if (err) {
            console.error('Error: ' + err);
        }
        if (data) {
            let videoId = data.data.items[0].id["videoId"];
            let videolink = "https://youtube.com/watch?v=" + videoId;
            configs.bot.sendMessage(msg.chat.id, videolink);
        }
    });
}

function extractAudioYT(msg, VIDEO_ID){
	const VIDEO_LINK = "http://www.youtube.com/watch?v=" + VIDEO_ID;

	configs.bot.sendMessage(msg.chat.id, "loading data...").then((msg) => {
		const CHAT_ID = msg.chat.id;
		const MESSAGE_ID = msg.message_id;

		youtubedl(VIDEO_LINK, {
			dumpSingleJson: true,
			noWarnings: true,
			noCallHome: true,
			noCheckCertificate: true,
			preferFreeFormats: true,
			youtubeSkipDashManifest: true,
			referer: VIDEO_LINK
		}).then(output => {
			configs.bot.editMessageText("converting data...", new Object({chat_id: CHAT_ID, message_id: MESSAGE_ID}));
			
			const url = output.formats[output.formats.length - 1].url;
			const FILENAME = output.title;
			const TMPFILENAME = "./temp/tmp";
			let file;
			
			request
			.get(url)
			.on('error', function (err) {
				console.log(err);
			}).pipe(file = fs.createWriteStream(TMPFILENAME + ".weba"));
			
			file.on('finish', () => {
				ffmpeg(TMPFILENAME + '.weba')
				.output('./temp/' + FILENAME + '.mp3')
				.on('end', () => {
					configs.bot.editMessageText("uploading the song...", new Object({chat_id: CHAT_ID, message_id: MESSAGE_ID}));
					configs.bot.sendAudio(msg.chat.id, './temp/' + FILENAME + '.mp3').then(() => {
						configs.bot.deleteMessage(CHAT_ID,  MESSAGE_ID);
					});
				})
				.run();
			})
		});
	});
}

function audioByName(msg, match){
	const youtube = google.youtube({
		version: 'v3',
		auth: process.env["YOUTUBE_API_KEY"]
	});

    youtube.search.list({
    	part: 'snippet',
    	q: match[1]
	},
    (err, data) => {
        if (err) {
            console.error('Error: ' + err);
        }
        if (data) {
            let videolink = "https://youtube.com/watch?v=" + data.data.items[0].id["videoId"];

            configs.bot.sendMessage(msg.chat.id, "loading data...").then((msg) => {
                
                const VIDEO_LINK = videolink;
                const CHAT_ID = msg.chat.id;
                const MESSAGE_ID = msg.message_id;
                youtubedl(VIDEO_LINK, {
                    dumpSingleJson: true,
                    noWarnings: true,
                    noCallHome: true,
                    noCheckCertificate: true,
                    preferFreeFormats: true,
                    youtubeSkipDashManifest: true,
                    referer: VIDEO_LINK
                }).then(output => {
                    configs.bot.editMessageText("converting data...", new Object({chat_id: CHAT_ID, message_id: MESSAGE_ID}));
                    
                    const url = output.formats[output.formats.length - 1].url;
                    const FILENAME = output.title;
                    const TMPFILENAME = "./temp/tmp";
                    let file;
                    
                    request
                    .get(url)
                    .on('error', function (err) {
                        console.log(err);
                    }).pipe(file = fs.createWriteStream(TMPFILENAME + ".weba"));
                    
                    file.on('finish', () => {
                        ffmpeg(TMPFILENAME + '.weba')
                        .output('./temp/' + FILENAME + '.mp3')
                        .on('end', () => {
                            configs.bot.editMessageText("uploading the song...", new Object({chat_id: CHAT_ID, message_id: MESSAGE_ID}));
                            configs.bot.sendAudio(msg.chat.id, './temp/' + FILENAME + '.mp3').then(() => {
                                configs.bot.deleteMessage(CHAT_ID,  MESSAGE_ID);
                            });
                        })
                        .run();
                    })
                });
            })
        }
    });
}

export {isRegistered, saveChanges, textPrettier, findVideoYT, extractAudioYT, audioByName, lytdybr};