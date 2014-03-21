function get_current_date_string(){
    var myDate = new Date();  

    return myDate.getFullYear()+'年' +
   	 	myDate.getMonth()+'月'+
   	 	myDate.getDate()+'日 '+
		myDate.getHours()+':'+
		myDate.getMinutes()+'    ';
}

var client;

var LOG_LEVEL_INFO = 0;
var LOG_LEVEL_DEBUG = 1;
var LOG_LEVEL_ERROR = 2;
var LOG_LEVEL_FATAL = 3;
var LOG_LEVEL_WARNING = 4;

function FayeHelper(url,channel){
	client = new Faye.Client(url);
	
	client.addExtension( {
	    incoming: function(message, callback) {
	        console.log('incoming ', message);
	
		    for(var key in message){
			    if(key == 'data'){		  
			    	var str = get_current_date_string() + 
							':' + message['data']['text'] +
							'<br>' +
							$('#income_msg').html();
		  
				     $('#income_msg').html('').append(str);
			    }else{
			  	  //TODO:
			    }
		  	}
	
	        callback(message);
	    },
	    outgoing: function(message, callback) {
		    console.log('outgoing ', message);
	  
		    for(var key in message){
			    if(key == 'data'){
			     	 $('#outgo_msg').append('outgoing '+
				  	 	message['data']['text'] +'<br>');
				     $('#outgo_msg').append('<br><hr>'); 
			    }else{
			  	    //TODO:
			    }		  	 
		     }
	         callback(message);
	     }
	});
	
	client.subscribe('/'+channel, function(message) {
		// handle message
		    for(var key in message){
			    if(key == 'data'){		  
			    	var str = get_current_date_string() + 
							':' + message['data']['text'] +
							'<br>' +
							$('#income_msg').html();
  
				     $('#income_msg').html('').append(str);
			    }else{
			  	  //TODO:
			    }
		  	}
	});	
	
	client.channel = channel;
	client.url = url;
	client.log_level = LOG_LEVEL_INFO;
	
	return client;
};

r_log = function(text){
	if(client.channel){
			client.publish('/'+client.channel, {'text': text});
	}else{
			alert('send with no channel');
	}
}

// ----------------------------PRIVATE----------------------------
_r_get_text_with_log_level=function(log_level,text){
	var log_text = 'NO LOG';

	switch(log_level)
	{
		case LOG_LEVEL_INFO:
		  log_text = '[INFO] '+text
		  break;
		case LOG_LEVEL_DEBUG:
		  log_text = '[DEBUG] '+text
		  break;
		case LOG_LEVEL_ERROR:
		  log_text = '[ERROR] '+text
		  break;
		case LOG_LEVEL_FATAL:
		  log_text = '[FATAL] '+text
		  break;
		case LOG_LEVEL_WARNING:
		  log_text = '[WARNING] '+text
		  break;
			
		default:
		  log_text = '[INFO] '+text;
	}
	return log_text;
}
// // 
_r_log = function(log_level,text){
	var log_text = _r_get_text_with_log_level(log_level,text);
	
	r_log(log_text);
}

// ----------------------------PUBLIC----------------------------
r_log_with_channel = function(channel,text){
	if(client.channel){
			var rtext = _r_get_text_with_log_level(LOG_LEVEL_INFO,text);
			client.publish('/'+channel, {'text': rtext});
	}else{
			alert('send with no channel');
	}
}

// var LOG_LEVEL_INFO = 0;
// var LOG_LEVEL_DEBUG = 1;
// var LOG_LEVEL_ERROR = 2;
// var LOG_LEVEL_FATAL = 3;
// var LOG_LEVEL_WARNING = 4;
r_log_info = function(text){
	_r_log(LOG_LEVEL_INFO,text);
}

r_log_debug = function(text){
	_r_log(LOG_LEVEL_DEBUG,text);
}

r_log_error = function(text){
	_r_log(LOG_LEVEL_ERROR,text);
}

r_log_fatal = function(text){
	_r_log(LOG_LEVEL_FATAL,text);
}

r_log_warning = function(text){
	_r_log(LOG_LEVEL_WARNING,text);
}
