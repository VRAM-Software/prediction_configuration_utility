const PerformTrainingRl = require("./perform/training/PerformTrainingRl")
const PerformTrainingSvm = require("./perform/training/PerformTrainingSvm")

class ProcessTraining {
    strategy
    params
    data

    constructor() {
        this.strategy = null
        this.params = null
        this.data = null

        this.setStrategy = this.setStrategy.bind(this)
        this.getStrategy = this.getStrategy.bind(this)
        this.getParams = this.getParams.bind(this)
        this.getData = this.getData.bind(this)
        this.setParams = this.setParams.bind(this)
        this.setData = this.setData.bind(this)
        this.startTraining = this.startTraining.bind(this)
    }

    setStrategy(algorithm) {
        if (algorithm === "svm") {
            this.strategy = new PerformTrainingSvm()
        }
        if (algorithm === "rl") {
            this.strategy = new PerformTrainingRl()
        }
    }

    getStrategy() {
        return this.strategy
    }

    getParams() {
        return this.params
    }

    getData() {
        return this.data
    }

    setParams(params) {
        this.params = params
    }

    setData(data) {
        this.data = data
    }

    startTraining(callback) {
        this.strategy.callTrain(this.params, this.data, callback)
    }
}

module.exports = ProcessTraining
