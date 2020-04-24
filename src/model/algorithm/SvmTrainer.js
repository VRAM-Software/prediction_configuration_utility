const precisionRecallModule = require("precision-recall");
const modules = require("ml-modules");
const SVM = modules.SVM;
const Utils = require("../Utils");

class SvmTrainer {
    svm = null;
    trainedJson = null;
    data = null;
    dataForTrain = [];
    dataForQuality = [];
    params = [];
    options = null;
    qualityIndex = null;

    constructor() {
        this.options = {
            kernel: {
                linear: true,
            },
            karpathy: true,
        };

        this.train = this.train.bind(this);
        this.splitData = this.splitData.bind(this);
        this.translateData = this.translateData.bind(this);
        this.translateLabels = this.translateLabels.bind(this);
        this.setParams = this.setParams.bind(this);
        this.buildTrainedObject = this.buildTrainedObject.bind(this);
        this.getDataForQualityMeasure = this.getDataForQualityMeasure.bind(
            this
        );
        this.setQualityIndex = this.setQualityIndex.bind(this);
        this.buildQualityArray = this.buildQualityArray.bind(this);
        this.getQualityIndex = this.getQualityIndex.bind(this);
    }

    train(data) {
        let dataTrain = [];
        let labelsTrain = [];

        this.svm = new SVM();
        this.svm.setOptions(this.options);

        this.splitData(data);
        dataTrain = this.translateData(this.dataForTrain);
        labelsTrain = this.translateLabels(this.dataForTrain);

        this.svm.train(dataTrain, labelsTrain);
        this.setQualityIndex();
        this.trainedJson = this.svm.toJSON();
        return this.buildTrainedObject(this.trainedJson);
    }

    splitData(data) {
        let len = Math.floor((data.length * 2) / 3);
        let dataSplitted = [];
        for (let i = 0; i < len; i++) {
            dataSplitted.push(data[i]);
        }
        this.dataForTrain = dataSplitted;
        dataSplitted = [];
        for (let i = len; i < data.length; i++) {
            dataSplitted.push(data[i]);
        }
        this.dataForQuality = dataSplitted;
    }

    translateData(data) {
        const dataTranslatedMatrix = [];
        let dataTranslatedArray = [];
        for (let i = 0; i < data.length; i++) {
            dataTranslatedArray = [];
            for (let j = 0; j < this.params.length - 1; j++) {
                dataTranslatedArray.push(parseFloat(data[i][this.params[j]]));
            }
            dataTranslatedMatrix.push(dataTranslatedArray);
        }
        return dataTranslatedMatrix;
    }

    translateLabels(labels) {
        let translatedLabel = [];
        for (let i = 0; i < labels.length; i++) {
            translatedLabel.push(
                parseFloat(labels[i][this.params[this.params.length - 1]])
            );
        }
        return translatedLabel;
    }

    setParams(params) {
        this.params = params;
    }

    buildTrainedObject(result) {
        let file = Utils.getTemplateTrainedFile();
        file.pluginAim = "svm";
        let array = this.params;
        array.length = Math.min(array.length, array.length - 1);
        file.predictors = array;
        file.result = result;
        return file;
    }

    setQualityIndex() {
        let qualityData = this.translateData(this.dataForQuality);
        let qualityLabels = this.translateLabels(this.dataForQuality);
        let qualityDataNew = this.getDataForQualityMeasure(qualityData);
        let csvIndexArray = this.buildQualityArray(qualityLabels);
        let predictedIndexArray = this.buildQualityArray(qualityDataNew);
        this.qualityIndex = precisionRecallModule.default(
            csvIndexArray,
            predictedIndexArray
        );
    }

    buildQualityArray(dataQualityNew) {
        let indexArray = [];
        for (let i = 0; i < dataQualityNew.length; i++) {
            if (dataQualityNew[i] === 1) {
                indexArray.push(i);
            }
        }
        return indexArray;
    }

    getDataForQualityMeasure(qualityData) {
        let qualityDataNew = [];
        for (let i = 0; i < qualityData.length; i++) {
            qualityDataNew.push(this.svm.predictClass(qualityData[i]));
        }
        return qualityDataNew;
    }

    getQualityIndex() {
        return this.qualityIndex;
    }
}

module.exports = SvmTrainer;
