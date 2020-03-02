//import the modules
const modules = require("ml-modules");
const fs = require('fs');
//select the machine learning module you want, for example
const SVM = modules.SVM; // support vector machine

let data = [
  [69, 4.39],
  [69, 4.21],
  [65, 4.09],
  [72, 5.85],
  [67, 4.7],
  [73, 5.78],
  [70, 5.56],
  [75, 5.11],
  [74, 5.36],
  [65, 4.27],
  [73, 5.79],
  [70, 5.47],
  [74, 5.53],
  [68, 4.47],
  [74, 5.22]
];

let labels = [1, 1, 1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1, 1, -1];

let options = {
  kernel: "linear",
  karpathy: true //piu efficiente!!
};

let svm = new SVM();
console.log("svm creata");

//parametri di input? Formato file Json
//fromJSON(data);

svm.train(data, labels, options);
console.log("svm train");



//predittore? dati in toJson
let jsonAddestrato = svm.toJSON();

let filejson = {};
filejson.author = "VRAMSoftware";
filejson.version = "1.0.0";
filejson.N = jsonAddestrato["N"];
filejson.D = jsonAddestrato["D"];
filejson.b = jsonAddestrato["b"];
filejson.kernelType = jsonAddestrato["kernelType"];
filejson.w = jsonAddestrato["w"];

let stringjson = JSON.stringify(filejson);

// fs.existsSync('output/prova.json');
fs.writeFile('algorithm/output/prova.json', stringjson, function (err) {
  if (err) return console.error(err);
  console.log("wrote file");
});


let svm2 = new SVM();
svm2.fromJSON(jsonAddestrato);

data.forEach((point) => {
  let predict1 = svm.predict(point);
  let predict2 = svm2.predictClass(point);
  console.log("predict1: " + predict1);
  console.log("predict2: " + predict2);

});


/*
//predict
new svm(); //creo svm
svm.fromJSON(jsonAddestrato) //passo il modello
*/

//point?
/*let point = [2, 4];
svm.predict(point); // 0 <= value <= 1
svm.predictClass(point); // value = 1 || value = -1*/
