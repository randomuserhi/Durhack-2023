const express = require("express");
const app = express();

// Setting up fs
const fs = require('fs');
require('log-timestamp');

let activeWorkspaces = {};
activeWorkspaces = JSON.parse(fs.readFileSync('watchlist.json'));
const cleanAW = (aws) => {
    let res = {};
    for (const [k, v] of Object.entries(aws)) {
        res[k] = {
            ...v,
            clients: []
        }
    } return res;
}
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
        
        if (receivedData.type === "join") {
            activeWorkspaces[receivedData.content].clients.push(ws.id);
            console.log(cleanAW(activeWorkspaces));
            fs.writeFile("watchlist.json", JSON.stringify(cleanAW(activeWorkspaces)), () => {})
        
            ws.send(JSON.stringify({
                workspace: receivedData.content,
                type: "data",
                content: activeWorkspaces[receivedData.content].files.map(f => ({
                    name: f.replace(/.*\//, ''),
                    content: fs.readFileSync(f).toString()
                }))
                }));
        };
        
       
    })
    ws.on('close', () => {
        delete connectedClients[ws.id];
        for (let space of Object.values(activeWorkspaces)) {
            space.clients = space.clients.filter((id) => {
                return id != ws.id;
            });
        };
    });
    ws.on('error', console.error);
});
console.log(activeWorkspaces);
for (let [workspace, space] of Object.entries(activeWorkspaces)) {
    for (let file of space.files) {
        console.log("watch events");
        fs.watchFile(file, (curr, prev) => {
            console.log(`${file} changed`);
            for (let client of space.clients) {
                connectedClients[client].send(JSON.stringify({
                    workspace,
                    type: "data",
                    content: [{
                        name: file.replace(/.*\//, ''),
                        content: fs.readFileSync(file).toString()
                    }]
                }));
            };
        }); 
    };
};

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
        fs.writeFile("watchlist.json", JSON.stringify(cleanAW(activeWorkspaces)), () => {})
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
        fs.writeFile("watchlist.json", JSON.stringify(cleanAW(activeWorkspaces)), () => {})
        fs.watchFile(file, (curr, prev) => {
            for (let client of activeWorkspaces[req.params.workspace].clients) {
                connectedClients[client].send(JSON.stringify({
                    workspace: req.params.workspace,
                    type: "data",
                    content: [{
                        name: file.replace(/.*\//, ''),
                        content: fs.readFileSync(file).toString()
                    }]
                }));
            }
        })
        resp.send(JSON.stringify("Log File successfully uploaded."));
        
    } catch(e) {
        console.log(e)
        
        resp.send(JSON.stringify("Error submitting log file, please try again later."));
    }    
});


module.exports = app;