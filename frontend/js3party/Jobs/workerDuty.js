onmessage = function(e) {
    console.log("Job Received: " + e.data.workerID);
    let ret = new Function("...params", `let f = ${e.data.job}; 
    return f(...params);`)(...e.data.params);
    this.postMessage({ workerID: e.data.workerID, ret: ret});
}