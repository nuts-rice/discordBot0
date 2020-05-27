const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;

client.on('ready', () => {
  console.log("Kick the tires, light the fires");
  console.log(client.user.username);
  console.log(`Logged in as ${client.user.tag}!`);
  //gets channel id for general chat 
  var generalChat0 = client.channels.get("534497498073661462")
  //send message
  generalChat0.send("I am a living, thinking entity that was created in the sea of information.")
  client.user.setActivity("with JavaScript")
});


client.on('message', (receivedMessage) => {
  var primaryCommand = "";

  //prevent echo from bot
  if (receivedMessage.author == client.user) {
    return
  }
  //evaluates content of message for command flag ";"
  if (receivedMessage.content.startsWith(";")) {
    processCommand(receivedMessage)
  }


});


function processCommand(receivedMessage) {
  //removes exclamation mark at start
  let fullCommand = receivedMessage.content.substr(1)
  //seperates pieces of message for each space
  let splitCommand = fullCommand.split(" ")
  //first word after "!" is command
  let primaryCommand = splitCommand[0]
  //all other words after command are arguments/parameters
  let arguments = splitCommand.slice(1)
  console.log("Command received: " + primaryCommand)
  console.log("Arguments: " + arguments)

  //evaluates primaryCommand for different cases
  switch (primaryCommand) {

    //evaluates for help command
    case primaryCommand == "help":
      helpCommand(arguments, receivedMessage)
      break;
    case primaryCommand == "room":
      privateVCCommand(arguments, receivedMessage)
      break;
    case primaryCommand == "invite":
      inviteBoardCommand(arguments, receivedMessage)
      break;
    case primaryCommand == "role":
      roleCreateCommand(arguments, receivedMessage)
      break;
    case primaryCommand == "shitpost":
      shitPostCommand(arguments, receivedMessage)
      break;
    case primaryCommand == "add":
      addUsersRooms(arguments, receivedMessage)
      break;
  }



}

//spits out helpful information on bot 
function helpCommand(arguments, receivedMessage) {
  if (arguments.length > 0) {
    receivedMessage.channel.send("You've chosen the info for :" + arguments)
    //evaluates for arguments
    switch (arguments) {
      case arguments == "room":
        receivedMessage.channel.send("Displaying information for private VC functionality")
        receivedMessage.channel.send("This bot is able to create voice channels and private rooms")
        break;
      case arguments == "invite":
        receivedMessage.channel.send("Displaying information for invite tracking")
        receivedMessage.channel.send("This bot is able to track those who invited others to the server ")
        break;
      case arguments == "add":
        receivedMessage.channel.send("Displaying information for adding memebers to private VC rooms")
        receivedMessage.channel.send("This bot can add memebers to private VC rooms that you set up, simply mention the user you want to add in the arguments for the command")
        break;
      case arguments == "shitpost":
      receivedMessage.channel.send("Bot can display shitposts from a random file")

      

    }
  }


}

function privateVCCommand(arguments, receivedMessage, roomName) {
  var server = receivedMessage.guild;

  var permissionsName = roomName + "-" + receivedMessage.author.username;
  //roles and permissions are assigned to those accessing the private room
  receivedMessage.guild.createRole(
    {

      name: permissionsName
      //permissions go here 
      //permissions: []
    }
    //figure out "reason" here 
  )
    .then(role => {
      receivedMessage.member.addRole(role, permissionsName), console.log("Created new role with name" + role.name)
    })
    .catch(console.error)

  //voice channel is created 
  server.createChannel(roomName, "voice").then(
    (channel0) => {
      console.log, channel0.setParent("353999880673019649").then(
        (channel1) => {
          console.log;
          //creates permissions for voice channel 
          channel1.overwritePermissions(message.guild.roles.find('name', '@everyone'), { 'CREATE_INSTANT_INVITE': false });
          channel1.overwritePermissions(message.guild.roles.find('name', permissionsName), {
            'CREATE_INSTANT_INVITE': false, 'VIEW_CHANNEL': false,
            'CONNECT': false, 'SPEAK': false

          }
          );
          //gives roles to author of message with permissions 
          channel1.overwritePermissions(message.guild.roles.find('name', permissionsName), {
            'VIEW_CHANNEL': true, 'CONNECT': true, 'SPEAK': true,
            'PRIORITY_SPEAKER': true,
          })
            .then(updated => console.log(updated.permissionOverwrites.get(message.author.id)))
            .catch(console.error);


        }
      )
    }
  )
  //need to create a second voice channel that user can move users from lobby to main VC
  channel1.clone("Lobby for private room", false, false, "Lobby for private VC")
    .then(channel2 => console.log("Cloning" + channel1.name + "to make" + channel2.name))
    .catch(console.error);
  //need to figure out permissions for those who join lobby
  channel2.overwritePermissions(message.guild.roles.find('name', '@everyone')),
    {
      'VIEW_CHANNEL': false,
      'CONNECT': false, 'SPEAK': false

    }
      .catch(console.error);
  //permissions allow for @everyone to CONNECT and SPEAK in lobby
  channel2.overwritePermissions(message.guild.roles.find('name', '@everyone')),
    {
      'VIEW_CHANNEL': true, 'CONNECT': true, 'SPEAK': true,

    }
      .catch(console.error);
  //need to figure out permissions for adding users to main private VC


}


function inviteBoardCommand(arguments, receivedMessage) {


  var invites = {};
  var server = receivedMessage.guild;
  var serverClient = server.member.Client
  //fetchInvites
  //create collection for Invites

  server.fetchInvites().then(guildInvites => {
    //updates cache for invites
    invites = guildInvites;
    //tap() functions as ForEach 
    invites.tap(invite => console.log(invites.inviter))
      //filters invites by more than one use
      .filter(invite => invite.uses > 1)
      //sorts into ascending order by uses
      .sort((a, b) => Int(a.uses) - Int(b.uses));
    receivedMessage.channel.send(
      "User who invited" + " " + invites.inviter + "Invite uses:" + " " +  invites.uses
    )
  }    
  )
  .catch (console.error);
}
//!add $User, when user is arguments 
function addUsersRooms(arguments, receivedMessage) {


  //if arguments don't include username return
  if (arguments.toString() != guild.roles.find('name', '@everyone')) {
    receivedMessage.channel.send("No usernames in argument")
    return
  }

  //add user specified in arguments to VC that user that messaged is in
  var userToAdd = arguments;

  var privateVC = receivedMessage.member.voicechannel;
  var permissionsName = privateVC.name + "-" + receivedMessage.author.name
  userToAdd.guild.addRole(permissionsName)
  privateVC.overwritePermissions(userToAdd),
    {
      'CONNECT': true,
      'SPEAK': true,

    }
      .then(updated => console.log(updated.permissionOverwrites.get(message.author.id)))
      .catch(console.error);





}
function deleteRoom(arguments, receivedMessage) {
  var server = receivedMessage.guild;
  //listiner for the privateVCcommand
  server.on(privateVCCommand, (vc) => {
    //captures variables from privateVCCommand
    var lobbyRoom = channel1;
    var mainRoom = channel2;
    var vcCreator = vc.message.author;


  }
  )
    .then(updatedDelete => console.log("recieved info about private VC for future deletion"))
    .catch(console.error);

  lobbyRoom.delete("user requested deletion of lobby room")
    .then(deleted0 => console.log(vcCreator.name + "deleted the room" + lobbyRoom.name))
    .catch(console.error)
  mainRoom.delete("requested deletion of main VC room")
    .then(deleted1 => console.log(vcCreator.name + "deleted the room " + mainRoom.name))
    .catch(console.error)


}

function roleCount(arguments, receivedMessage)
{
  var server = receivedMessage.guild;
  //need to find role for nobody
  if (receivedMessage.toString() != server.roles.find ('role', '@everyone'))
  {
    receivedMessage.channel.send("role not found")
  }
  var matchingRoles = server.roles.findAll(receivedMessage.toString())
  .then (roleUpdate => {
  for (i = 0; i <= matchingRoles.count;  i++) {
    message.channel.send(
      
        ("blank")
    )
    }
  

  });
}




function shitPostCommand(arguments, receivedMessage) {
  var path = require('path');
  var fs = require('fs');
  var shitPostArray = [];
  var directory = './shitposts'
  shitPostArray = directory.forEach(function (files) {
    shitPostArray.push(File)
  })
    .then(arrayUpdate => console.log("wrote shitpost directory to array"))
    .catch(console.error)
  let counter = shitPostArray.length
  //pick random index in array 
  let index = Math.floor(Math.random() * counter);
  let shitPostFile = shitPostArray[index];
  message.channel.send({
    files: shitPostFile
  })
    .then(fileUpdate => console.log("posted shitpost file to channel"))
    .catch(console.error)
}

client.login("")
