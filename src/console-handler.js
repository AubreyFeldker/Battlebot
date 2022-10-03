const chars = require('./console-logs-0.json');
const profile_names = ['redacted0', 'bin', 'ashley', 'thwomp', 'mc', 'unknown0', 'poochy', 'stu', 'redacted1', 'wendy', 'redacted2', 'jimmy', 'unknown1', 'spike', 'dry', 'redacted3', 'gooigi']

module.exports = (client) => {

	client.consoleHandler = (message) => {
		let channel = message.channel;
		let content = message.content;
		
		if (client.config.inUse) { //Only one input into console at a time
			message.delete();
			return;
		}
		
		client.config.inUse = true;
		channel.bulkDelete(client.consoleVars.get("state") == 2 ? 1 : 2);
		
  		switch(client.consoleVars.get('state')) {
  			case 0:
  				if (content.toUpperCase() == 'STARBEANS') {
  					channel.send("```LOGIN SUCCESSFUL```");
  					setTimeout(() => {
  						channel.bulkDelete(1);
  						channel.send("```WELCOME, ADMIN_SFM_009```");
  						setTimeout(() => { 
  							channel.bulkDelete(1);
  							
  							
  							channel.send('```LOADING INTO DIRECTORY /SYS_MAIN/PROFILES/R/ROLE_T/CASUALTIES```');
  							
  							
  							
  							setTimeout(() => { 
  								channel.bulkDelete(1);
  								
  								//Building file directory message
  								let msg = "```PLEASE SELECT A FILE TO READ";
  								for(const char of profile_names)
  									msg += "\n- " + chars[char].file;
  								msg+= "```";
  								channel.send(msg);
  								
  								client.config.inUse = false;
  							}, 5000);
  						}, 5000);
  					}, 5000);
  					client.consoleVars.inc('state');
  				}
  				else {
  					channel.send("```INVALID LOGIN```");
  					setTimeout(() => { 
  						channel.bulkDelete(1);
  						channel.send("```PLEASE LOG IN TO ACCESS CONSOLE```");
  						client.config.inUse = false;
  					}, 5000);
  				}
  				break;
  			case 1:
  				let prof;
  				for(const char of profile_names) {
  					console.log(chars[char]);
  					if (chars[char].file == content.toUpperCase()) {
  						prof = chars[char];
  						break;
  					}
  				}
  			
  				if (! prof) {
  					channel.send("```INVALID FILE```");
  						setTimeout(() => { 
  							channel.bulkDelete(1);
  						
  							//Building file directory message
  							let msg = "```PLEASE SELECT A FILE TO READ";
  							for(const char of profile_names)
  								msg += "\n- " + chars[char].file;
  							msg+= "```";
  							channel.send(msg);
  							client.config.inUse = false;
  						}, 5000);
  				}
  				else {
					 channel.send("```LOADING . . .```"); 		
					 
					 setTimeout(() => { 
  							channel.bulkDelete(1);
  						
  							//Building file directory message
  							channel.send(`\`\`\`READING: ${prof.file}\n\n--- CASE PORTFOLIO: ${prof.name} ---\nAGE: ${prof.age}\nNOTES: ${prof.desc}\nSTATUS: ${prof.status}\n\nENTER 'BACK' TO RETURN TO DIRECTORY WHEN YOU ARE FINISHED READING\`\`\``);
  							client.consoleVars.inc('state');
  							client.config.inUse = false;
  						}, 5000);
  								
  				}
  				
  				
  				break;
  			case 2:
  				if (content.toUpperCase() == "BACK") {
  					channel.bulkDelete(2);
  							
  					//Building file directory message
  					let msg = "```PLEASE SELECT A FILE TO READ";
  					for(const char of profile_names)
  						msg += "\n- " + chars[char].file;
  					msg+= "```";
  					channel.send(msg);
  							
  					client.consoleVars.set('state', 1);
  					
  				}
  				client.config.inUse = false;
  				break;
  		}
  		
  		return;
  }
  
};