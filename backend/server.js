const app = require("./app");
const port = 7676;

app.listen(port, function() {
    console.log(`Epic Poggers Analysis Tool listening on Port ${port}!`);
});

process.on('SIGINT', function() {
    process.exit();
});