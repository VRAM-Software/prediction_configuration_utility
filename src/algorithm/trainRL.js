const Regression = require('./regression.module')

class RLTrainer {
    constructor() {
        this.trainedJSON = null;
        this.data = [];
        this.options = null;
    }

    setOptions = option => {
        this.options = option;
    }

    //data: array di oggetti JSON
    train = data => {
        const rl = new Regression(this.options);
        this.insertData(data);
        this.trainedJson = JSON.stringify(rl.calculateCoefficients()); //FIXME: trasformare oggetto con nomi più significativi
        return this.trainedJson;
    };

    insertData = json => {
        let valX = [];
        let valY = [];
        let result = [];

        // {x1: 1, x2: 2, y: 2}
        for (let i = 0; i < json.length; i++) {
            valX = [];
            valY = [];
            for(let j = 0; j  < this.options.numX; j++) {
                let objToAdd = json[i];
                valX.push(objToAdd[Object.keys(objToAdd)[j]]);
            }
            valY.push(json[i].y);
            result.push({x: valX, y: valY});
        }
        this.data = result;
    }
}

module.exports = RLTrainer;