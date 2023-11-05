(() => {
    const Jobs = window.Jobs = {};
    var taskAssigned = null;
    let workerCount = 0;
    let workerFree = [];
    let running = 0;
    let workerID = 0;
    const callbacks = new Map();
    Jobs.initialiseWorkers = function initialiseWorkers(workerNum) {
        workerCount = workerNum;
        console.log("Initialising Workers...");
        for (let i = 0; i < workerCount; i++) {
            worker = new Worker("workerDuty.js");
            workerFree.push(worker);
            worker.addEventListener("message", function(e) {
                if (callbacks.has(e.data.workerID)){
                    callbacks.get(e.data.workerID)(e.data.ret);
                } 
                taskAssigned = null;
                workerFree.push(worker);
                Jobs.workerComplete();
                Jobs.runNewtask(worker);   
            });
        }
        console.log("All Workers Initialised!")
    }

    Jobs.runNewtask = function runNewtask(worker) {
        if((jobQueue.length > 0) ) {
            taskAssigned = jobQueue.shift();
            ++running;
            worker.postMessage(taskAssigned);
        }
    }

    Jobs.workerComplete = function workerComplete(e) {
        console.log("task finished")
        --running;
    }

    //let jobNumber = 0;
    let jobQueue = [];
    Jobs.enqueue = function enqueue(...jobList) {
        for (let i = 0; i < jobList.length; i++) {
            const id = workerID++;
            const parameters = jobList[i];
            if (parameters.callback) callbacks.set(id, parameters.callback);
            jobQueue.push({
                //name: parameters.name ? parameters.name : "Unnamed Job" + (++jobNumber),
                workerID: id,
                job: parameters.job.toString(),
                params: parameters.params ? parameters.params : [],
            });
            if (running < workerCount) {
                let chosenWorker = workerFree.shift();
                Jobs.runNewtask(chosenWorker); 
            } 
        }
    };
})();

