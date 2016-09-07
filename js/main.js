$(document).ready(function(){
  function gatherChannels(){
    var picNotFound = "http://rs1236.pbsrc.com/albums/ff447/reyty1/questionmark.png~c200"
    var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"],
   
    getChannel = function getChannel(channel){
      $.getJSON("https://api.twitch.tv/kraken/streams/" + channel + "?callback=?", function(data){
        
        if(data.stream === null){ 
        $.getJSON("https://api.twitch.tv/kraken/channels/" + channel + "?callback=?", function(info){
              
          $(".main-area").append("<div class ='channels row offline' id='channel'><a target='_blank' href='" + info.url + "'><div class=col-xs-4><img src='" + info.logo + "' height=60 width=60/></div><div class=col-xs-4><h4>" + info.display_name +"</h4></div><div class=col-xs-4><p>Offline</p></div></a></div>");  
          
        });
        }
        
        else if(data.stream === undefined){
          $(".main-area").append("<div class ='channels row closed' id='channel'><div class=col-xs-4><img src='" + picNotFound + "' height=60 width=60/></div><div class=col-xs-4><h4>" + channel +"</h4></div><div class=col-xs-4><p>Account Closed</p></div></div>");
        }
        
        else{   
          $(".main-area").append("<div class ='channels row online' id='channel'><a target='_blank' href='" + data.stream.channel.url + "'><div class=col-xs-4><img src='" + data.stream.channel.logo + "' height=60 width=60/></div><div class=col-xs-4><h4>" + data.stream.channel.display_name +"</h4></div><div class=col-xs-4><p>" + data.stream.channel.status + "</p></div></a></div>");
        }
      });
    }
    
    for(var i=0;i<channels.length;i++){
      getChannel(channels[i]);
    }  
  }
   
  function btnClick(){
    
    $(".btn-all").on("click",function(){
      $(".online").show();
      $(".closed").show();
      $(".offline").show();
    });
    
    $(".btn-online").on("click",function(){
      $(".offline").hide();
      $(".closed").hide();
      $(".online").show();
    });
    
    $(".btn-offline").on("click",function(){
      $(".online").hide();
      $(".closed").show();
      $(".offline").show();
    });
  }
  
  gatherChannels();
  btnClick();
});