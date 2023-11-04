const express = require("express");
const app = express();

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


app.use(express.static("static"));
app.use(express.json());

// importing object 'workspace' with functions returned from workspaces.js
const workspace = require('./workspaces.js');

app.get("/", function(req, resp) {
    resp.sendFile(`${__dirname}/static/index.html`);
});

// app.use(express.static("client-page"));
// app.use(express.json());

/*
app.get("/client-page/", function(req, resp) {
    resp.sendFile(`${__dirname}/static/index.html`);
});
*/

app.post("/logs", upload.single("files"), function(req, resp){
    console.log("Log File Recieved")
    try{
        resp.send(JSON.stringify("Log File successfully uploaded."));
    } catch(e) {
        console.log(e)
        
        resp.send(JSON.stringify("Error submitting log file, please try again later."));
    }    
});

/*
app.get("/refresh", function(req, resp){
    
    try{
        resp.send(JSON.stringify(data));
        data = [];
    } catch(e) {
        console.log(e);
        resp.send(JSON.stringify("Error sending heatmap data. please try again later."));
    }
});
*/


module.exports = app;