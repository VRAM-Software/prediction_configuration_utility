class Regression {
    //METODI DI INTERFACCIA PER L'UTILIZZO DI RL

    //permette di fare la push solo che al posto di passare un option, passo i parametri e si costruisce da sola la option
    add(xs,ys){
        this.addObservation({
            x:[1].concat(xs),y:[ys]
        })
    }

    calculate(){
        return this.calculateCoefficients()
    }

    predict(xs){
        return this.hypothesize({
            x:[1].concat(xs)
        })
    }

    push(options){
        this.addObservation(options)
    }

    constructor(options){
        if(!options)
            throw new Error('missing options')
        if(!('numX' in options))
            throw new Error('you must give the width of the X dimension as the property numX')
        if(!('numY' in options))
            throw new Error('you must give the width of the X dimension as the property numY')
        //Costruisco una matrice con prendendo numX e numY presi in input
        this.transposeOfXTimesX = this.rectMatrix({numRows: options.numX,numColumns: options.numX}) //matrice
        this.transposeOfXTimesY = this.rectMatrix({numRows: options.numX,numColumns: options.numY}) //matrice
        //Ritorna una matrice identità di dimensioni numX
        this.identity = this.identityMatrix(options.numX)  //matrice identità
    }

    //Aggiungo dei dati che ho osservato per addestrare l'algoritmo
    addObservation(options){
        if(!options)
            throw new Error('missing options')
        if(!(options.x instanceof Array) || !(options.y instanceof Array))
            throw new Error('x and y must be given as arrays')
        this.addRowAndColumn(this.transposeOfXTimesX,{lhsColumn: options.x,rhsRow: options.x})
        this.addRowAndColumn(this.transposeOfXTimesY,{lhsColumn: options.x,rhsRow: options.y})
        // Adding an observation invalidates our coefficients.
        delete this.coefficients
    }

    //Calcola il coefficiente di correlazione (regressore) da utilizzare per l'algoritmo
    calculateCoefficients(){
        var xTx = this.transposeOfXTimesX
        var xTy = this.transposeOfXTimesY
        var inv = this.inverse(xTx, this.identity)
        this.coefficients = this.multiply(inv, xTy)
        return this.coefficients
    }

    //Calcolo l'array dei valori ipotetici
    hypothesize(options) {
        if(!options)
            throw new Error('missing options')
        if(!(options.x instanceof Array))
            throw new Error('x property must be given as an array')
        if(!this.coefficients)
            this.calculateCoefficients()
        var hypothesis = []
        console.log("coefficients lenght")
        console.log(this.coefficients.length)
        for(var x = 0; x < this.coefficients.length; x++) {
            var coefficientRow = this.coefficients[x]
            for(var y = 0; y < coefficientRow.length; y++) {
                console.log("option")
                console.log(options.x[x])
                hypothesis[y] = (hypothesis[y] || 0) + coefficientRow[y] * options.x[x]
            }
        }
        return hypothesis
    }

    //Calcola la matrice inversa
    inverse(matrix, identity) {
        var size = matrix.length
        var result = new Array(size)
        for(var i = 0; i < size; i++)
            result[i] = matrix[i].concat(identity[i])
        result = this.rref(result)
        for(var i = 0; i < size; i++) result[i].splice(0, size)
        return result
    }

    //Algoritmo ausiliario per il calcolo della matrice inversa
    rref(A) {
        var rows = A.length;
        var columns = A[0].length;

        var lead = 0;
        for (var k = 0; k < rows; k++) {
            if (columns <= lead) return;

            var i = k;
            while (A[i][lead] === 0) {
                i++;
                if (rows === i) {
                    i = k;
                    lead++;
                    if (columns === lead) return;
                }
            }
            var irow = A[i], krow = A[k];
            A[i] = krow;
            A[k] = irow;

            var val = A[k][lead];
            for (var j = 0; j < columns; j++) {
                A[k][j] /= val;
            }

            for (var i = 0; i < rows; i++) {
                if (i === k) continue;
                val = A[i][lead];
                for (var j = 0; j < columns; j++) {
                    A[i][j] -= val * A[k][j];
                }
            }
            lead++;
        }
        return A;
    }

    //Esegue la molitplicazione tra matrici
    multiply(lhs, rhs) {
        var options = { numRows: lhs.length, numColumns: rhs[0].length }
        var streamingProduct = this.rectMatrix(options)
        for(var x = 0; x < rhs.length; x++) {
            var lhsColumn = []
            // Get the xth column of lhs.
            for(var r = 0; r < lhs.length; r++)
                lhsColumn.push(lhs[r][x])
            // Get the xth row of rhs.
            var rhsRow = rhs[x]
            this.addRowAndColumn(streamingProduct,{
                lhsColumn: lhsColumn,
                rhsRow: rhsRow
            })
        }
        return streamingProduct
    }

    //Ritorna una matrice identità con tutte le celle a 1
    identityMatrix(size){
        var matrix = this.rectMatrix({ numRows: size, numColumns: size })
        for(var i = 0; i < size; i++)
            matrix[i][i] = 1
        return matrix
    }

    //Ritorna una matrice numRows x numColumns con tutti gli elementi a 0
    rectMatrix(options){
        var matrix = new Array(options.numRows) //creo un array lungo numRows
        for(var r = 0; r < options.numRows; r++) { //creo tanti array quanto vale numRows e tutti lunghi numColumns
            var row = new Array(options.numColumns)
            matrix[r] = row //creo la matrice con row come vettore riga, per ogni irga
            for(var c = 0; c < options.numColumns; c++) {
                row[c] = 0
            }
        }
        return matrix
    }

    //percorro la matrice product e sommo ai valori che già ha
    addRowAndColumn(product,options){ //option contiene i valori da aggiungere etichettati nella funzione chiamante
        for(var c = 0; c < options.lhsColumn.length; c++)
            for(var r = 0; r < options.rhsRow.length; r++)
                product[c][r] += options.lhsColumn[c] * options.rhsRow[r]
    }

}
module.exports = Regression;
