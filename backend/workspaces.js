const fs = require('fs-extra');


function createWorkspace(dirName) {
	
	// creating watchlist.json if it doesn't exist
	// there is probably a better place for this but fuck if I care anymore
	if (!fs.existsSync("watchlist.json")) {
		fs.writeFile(`watchlist.json`, "{}", () => {});
	}
	
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


function moveFile(fSource, dirName, toServer) {
	// fSource is file directory, toServer = true to send to server,
	// toServer = false to delete from server, dirName is workspace name if sending to server
	//  sending file to server
	if (toServer) {
		const fName = fSource.replace(/.*\//, '');
		fs.move(fSource, `workspaces/${dirName}/files/${fName}`, { overwrite: true }, (err) => {
			if (err) {
				console.error("Source file or destination does not exist");
			}
			else{
				fs.readFile(`watchlist.json`, "UTF-8", (err, jsonString) => {
					if (err){
						console.error("No watchlist.json file exists");
					}
					else{
						
						let wData = JSON.parse(jsonString);
						
						if (!(dirName in wData)){
							wData[dirName] = {
									"clients": [],
									"files": []
								};
						}
						
						wData[dirName]["files"].push(`workspaces/${dirName}/files/${fName}`);

						fs.writeFileSync(`watchlist.json`, JSON.stringify(wData), () => {});
						console.log("Successfully moved file");
					}						
				});
			}
		});
	}
	
	// removing file from server
	else{
		fs.unlink(fSource, (err) => {
			if (err) {
				console.error("Source file does not exist");
			}
			else{
				fs.readFile(`watchlist.json`, "UTF-8", (err, jsonString) => {
					if (err){
						console.error("No watchlist.json file exists");
					}
					else{
						let wData = JSON.parse(jsonString);
						wData[dirName]["files"] = wData[dirName]["files"].filter(x => x !== fSource);
						
						fs.writeFile(`watchlist.json`, JSON.stringify(wData), () => {});
						console.log("Successfully removed file");
					}			
				});
			}
		});
	}
}


// return
module.exports = {
	createWorkspace,
	getWorkspace,
	moveFile
}