import {bot} from "../config.js";

const commands = [
	{
    command: "echo",
    description: "Displays text and chat ID separated by a space",
  },
  {       
    command: "register_this_chat",
    description: "[name], saves chatId to database",
  },
  {       
    command: "rename_this_chat",
    description: "[new_name], renames the chat in database",
  },
  {       
    command: "remove_this_chat",
    description: "removes this chat from database",
  },
  {       
    command: "name_of_this_chat",
    description: "displays the name of the chat from database",
  },
	{
		command: "darts",
		description: "[0-9], rolls the dice darts",
	},
	{
		command: "cube",
		description: "[0-9], rolls the dice cube",
	},
	{
		command: "basketball",
		description: "[0-9], rolls the dice basketball",
	},
	{
		command: "football",
		description: "[0-9], rolls the dice football",
	},
	{
		command: "bowling",
		description: "[0-9], *a call from a Roman*",
	},
	{
		command: "slotmachine",
		description: "[0-9], rolls the dice slotmachine",
	},
	{
		command: "/anim",
		description: "[1-3], starts animation",
	},
	{
		command: "/break",
		description: "stops the animation",
	},
	{
		command: "/makeprettytext",
		description: "[text]",
	},
	{
		command: "/getrandomimage",
		description: "returns random image",
	},
	{
		command: "/getrandomvideo",
		description: "returns random video",
	},
	{
		command: "/getrandomaudio",
		description: "returns random audio",
	},
	{
		command: "/youtube_find_video",
		description: "[text], returns video link",
	},
	{
		command: "/youtube_extract_audio",
		description: "[youtube_link], returns audio, extracted from YouTube video",
	},
	{
		command: "/youtube_audio_by_name",
		description: "[text], returns audio, extracted from YouTube video that was found by text request",
	},
	{
		command: "/lytdybr",
		description: "[text]",
	},
	{
		command: "/jsoned/login",
		description: "[login] [docs_api_token], saves jsoned data to this chat in database",
	},
	{
		command: "/jsoned/api/",
		description: "type/id (method) ({data}), interaction with jsoned api",
	}
];

// ** Uncomment and launch the bot to save command tips
// 
// bot.setMyCommands(commands);
// console.log("New commands successfully loaded! :)");