var bot = new RiveScript();

bot.loadFile([
  "brain/begin.rive",
  "brain/contacts.rive",
  "brain/general.rive",
  "brain/mess.rive",
  "brain/myself.rive",
  "brain/user.rive"
], loaded, not_loaded);




function loaded () {
	console.log("Chatbot has finished loading!");
}



var but = document.getElementById("submit");
var user_input = document.getElementById("user_input");
var chatBox = document.getElementById("chat-box");

but.addEventListener("click", chat);

function check(event){
  if(event.key == "Enter")
    chat();
}
function chat(){
  var input = user_input.value;

  chatBox.innerHTML += "you<span id=\"you\"></br>" + input  + "</span></br></br>";
  bot.sortReplies();
  var reply = bot.reply("local-user", input);
	console.log("The bot says: " + reply);
  chatBox.innerHTML += "bot<span id=\"bot\"></br>" + reply + "</span></br></br>";
  user_input.value = "";
}

function not_loaded (error) {
	console.log("Error when loading files: " + error);
}
