function setup() {
  let bot = new RiveScript();
  bot.loadFile([
    "brain/begin.rive",
    "brain/contacts.rive",
    "brain/general.rive",
    "brain/mess.rive",
    "brain/myself.rive",
    "brain/user.rive"
  ], loading_done, loading_error);

  function loading_done() {
    console.log("loaded");
    bot.sortReplies();
  }

  function loading_error() {
    console.log("error");
  }

  noCanvas();
  let button = select('#submit');
  let user_input = select("#user_input");
  let output = select("#reply");
  button.mousePressed(chat);
  button.onkeydown = function(event) {
    if (event.keyCode == 13) {
      chat();
    }
  }

  function chat() {
    let input = user_input.value();
    let reply = bot.reply("local-user", input);
    console.log(reply);
    output.html(reply);
  }
}
