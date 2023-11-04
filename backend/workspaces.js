const fs = require('fs');


function createWorkspace(dirName) {
	
	// create root directory
	if (!fs.existsSync(`workspaces/${dirName}`)){
		fs.mkdir(`workspaces/${dirName}`, () => {
			
			// creating first set of sub-directories
			fs.mkdir(`workspaces/${dirName}/files`, () => {});
		
			const wsData = { name:dirName }
			
			fs.writeFile(`workspaces/${dirName}/workspace.json`, JSON.stringify(wsData), () => {});
			fs.mkdir(`workspaces/${dirName}/plugins`, () => {
				
				// creating second set of sub-directories
				fs.mkdir(`workspaces/${dirName}/plugins/scripts`, () => {});
				fs.mkdir(`workspaces/${dirName}/plugins/visualisations`, () => {});
				
			});
		});
	}
	else{
		console.warn("File directory already exists");
	}
		
}


function getWorkspace(dirName, callback) {
	
	// attempting to read JSON file under specified directory in the workspaces folder
	fs.readFile(`workspaces/${dirName}/workspace.json`, "UTF-8", (err, jsonString) => {
		if (err){
			console.error("Couldn't read file or file doesn't exist");
			callback(undefined);	
		}
		
		// attempting to parse string into object
		else{
			try {
				const wsData = JSON.parse(jsonString);
				console.log("Successfully retrieved workspace info");
				callback(wsData);
			}
			catch (err) {
				console.error("Couldn't parse JSON string into object");
				callback(undefined);
			}
		}
	});
}


// return
module.exports = {
	createWorkspace,
	getWorkspace
}