(() => {
    const Jobs = window.Jobs = {};
    var taskAssigned = null;
    let workerCount = 0;
    let workerFree = [];
    let running = 0;
    let workerID = 0;
    const callbacks = new Map();
    Jobs.initialiseWorkers = function(workerNum) {
        workerCount = workerNum;
        for (let i = 0; i < workerCount; i++) {
            worker = new Worker("../js3party/Jobs/workerDuty.js");
            workerFree.push(worker);
            worker.addEventListener("message", function(e) {
                if (callbacks.has(e.data.workerID)){
                    callbacks.get(e.data.workerID)(e.data.ret);
                } 
                taskAssigned = null;
                workerFree.push(worker);
                workerComplete();
                runNewtask(worker);   
            });
        }
    }

    const runNewtask = function(worker) {
        if((jobQueue.length > 0) ) {
            taskAssigned = jobQueue.shift();
            ++running;
            worker.postMessage(taskAssigned);
        }
    }

    const workerComplete = function(e) {
        --running;
    }

    //let jobNumber = 0;
    let jobQueue = [];
    Jobs.enqueue = function(...jobList) {
        for (let i = 0; i < jobList.length; i++) {
            const id = workerID++;
            const parameters = jobList[i];
            if (parameters.callback) callbacks.set(id, parameters.callback);
            jobQueue.push({
                workerID: id,
                job: parameters.job.toString(),
                params: parameters.params ? parameters.params : [],
            });
            if (running < workerCount) {
                let chosenWorker = workerFree.shift();
                runNewtask(chosenWorker); 
            } 
        }
    };
})();

