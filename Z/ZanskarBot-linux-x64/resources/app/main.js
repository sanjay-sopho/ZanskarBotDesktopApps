// Load a new rivescript object
var bot = new RiveScript();

//load rivescript files
bot.loadFile([
  "brain/begin.rive",
  "brain/contacts.rive",
  "brain/general.rive",
  "brain/mess.rive",
  "brain/myself.rive",
  "brain/user.rive"
], loaded, not_loaded);

//success function
function loaded() {
  console.log("Chatbot has finished loading!");
}
//failure function
function not_loaded(error) {
  console.log("Error when loading files: " + error);
}

//get elements
var user_input = document.getElementById("user_input");

//After sending the message
function chat() {
  var input = user_input.value;
  //show users message
  bot.sortReplies();
  setTimeout(function() {
    var reply = bot.reply("local-user", input);
    console.log("The bot says: " + reply);

    //show bot's message
    insertChat("bot", reply);

  }, 800);

}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time = 0) {
  var control = "";
  var date = formatAMPM(new Date());

  if (who == "me") {

    control = '<li style="width:100%">' +
      '<div class="msj macro">' +
      '<div class="text text-l">' +
      '<p>' + text + '</p>' +
      '<p><small>' + date + '</small></p>' +
      '</div>' +
      '</div>' +
      '</li>';
  } else {
    control = '<li style="width:100%;">' +
      '<div class="msj-rta macro">' +
      '<div class="text text-r">' +
      '<p>' + text + '</p>' +
      '<p><small>' + date + '</small></p>' +
      '</div>' +
      '</div>' +
      '</li>';
  }
  setTimeout(
    function() {
      $("ul").append(control);

    }, time);

}

function resetChat() {
  $("ul").empty();
}

$(".mytext").on("keyup", function(e) {
  if (e.which == 13) {
    var text = $(this).val();
    if (text !== "") {
      insertChat("me", text);
      chat()
      $(this).val('');
    }
  }
});

//-- Clear Chat
resetChat();
