const express = require("express");
const app = express();

// Setting up fs
const fs = require('fs');
require('log-timestamp');

let activeWorkspaces = {};
fs.readFile('watchlist.json', 'utf8', function(err, data) {
    if (err) {
        throw err;
    }
    activeWorkspaces = JSON.parse(data);
});
let connectedClients = {}
let id = 0

// Initialising Multer and storage locations
const multer = require("multer");
var storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//https://stackoverflow.com/questions/57009371/access-to-xmlhttprequest-at-from-origin-localhost3000-has-been-blocked
const cors = require('cors');
app.use(cors());

// importing object 'workspace' with functions returned from workspaces.js
const workarea = require('./workspaces.js');

// Setting up WebSocket
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3677 })

// Setting up WebSocketServer to handle clients
wss.on('connection', (ws) => {
    ws.id = id++
    connectedClients[ws.id] = ws;
    console.log(`New user number ${ws.id} has connected`)
    ws.on('message', (message) => {
        const receivedData = JSON.parse(message);
        activeWorkspaces[receivedData].clients.push(ws.id);
        fs.writeFile("watchlist.json", JSON.stringify(activeWorkspaces), () => {})
    })
    ws.on('close', () => {
        connectedClients.delete(ws.id);
        for (let space in activeWorkspaces) {
            space.clients = space.clients.filter((id) => {
                return id != ws.id;
            });
        };
    });
    for (let space in activeWorkspaces) {
        for (let file in space.files) {
            fs.watchFile(file), (curr, prev) => {
                for (let client in space.clients) {
                    client.send(file);
                };
            }; 
        };
    };
    ws.on('error', console.error);
});

// Serving Webpage
app.get("/", function(req, resp) {
    resp.sendFile(`${__dirname}/static/index.html`);
});

app.use(express.static("static"));
app.use(express.json());


// POST and GET Functions

/*
GET /{workspace_name} => return details in a js object for the given workspace (for now this is just the workspace name), if doesnt exist return 404 or someshit
*/

app.get("/:workspace", function(req, resp){
    
    try{
        workarea.getWorkspace(req.params.workspace, (data) => {
            if (data === undefined){
                resp.send(JSON.stringify("Error: Workspace already exists or couldn't parse JSON string into object"))
            } else {
                resp.send(JSON.stringify(data))
            }
        })
    } catch(e) {
        console.log(e);
        
        resp.send(JSON.stringify("Error receiving workspace data. please try again later."));
    }
});

/*
POST /{workspace_name} => create a new workspace of the given name (if it already exists, return bad request error)
*/

app.post("/:workspace", function(req, resp){
    try{
        workarea.createWorkspace(req.params.workspace)
        console.log(activeWorkspaces)
        activeWorkspaces[req.params.workspace] = {
                "clients": [],
                "files": []
            };
        console.log(activeWorkspaces)
        fs.writeFile("watchlist.json", JSON.stringify(activeWorkspaces), () => {})
        resp.send(JSON.stringify("New Workspace created."));
    } catch(e) {
        console.log(e);
        
        resp.send(JSON.stringify("Error creating new Workspace, please try again later."));
    }
});

/*
POST /{workspace_name}/upload => Uploads file to a specified workspace
*/

app.post("/:workspace/upload", upload.single("files"), function(req, resp){
    console.log(req.file.originalname)
    console.log(req.params)
    
    console.log("Log File Recieved")
    try{
        // Move Log File to correct workspace (req.params.workspace)
        workarea.moveFile(`./uploads/${req.file.originalname}`, true, req.params.workspace)
        const file = `./workspaces/${req.params.workspace}/files/${req.file.originalname}`;
        if (!(req.params.workspace in activeWorkspaces)) {
            activeWorkspaces[req.params.workspace] = {
                clients: [],
                files: []
            };
        }
        if (!activeWorkspaces[req.params.workspace].files.some((f) => f == file)) {
            activeWorkspaces[req.params.workspace].files.push(file);
        }
        fs.writeFile("watchlist.json", JSON.stringify(activeWorkspaces), () => {})
        resp.send(JSON.stringify("Log File successfully uploaded."));
        
    } catch(e) {
        console.log(e)
        
        resp.send(JSON.stringify("Error submitting log file, please try again later."));
    }    
});


module.exports = app;