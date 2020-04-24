import React from "react";
import config from "../../config/config.json";

class CheckBox extends React.Component {
  render() {
    const list = this.props.algorithms.map((item, index) => (
      <div key={index} className='checkBoxContainer'>
        <div
          className={item.name === this.props.algorithm ? "checkSelected" : "checkNotSelected"}
          id='checkBox'
          onClick={() => this.props.handleCheckBox(item.name)}
        ></div>
        <span onClick={() => this.props.handleCheckBox(item.name)}>{item.desc}</span>
      </div>
    ));
    return (
      <div id='checkContainer'>
        <h3 id='checkBoxInfo'>
          Seleziona l'algoritmo di predizione da utilizzare per l'addestramento
        </h3>
        <div>{list}</div>
      </div>
    );
  }
}

class FileInput extends React.Component {
  render() {
    return (
      <div>
        <input
          className='fileChooserInput'
          id={"fileChooser" + this.props.type}
          type='file'
          name='file'
          onChange={this.props.onChange}
        />
        <label htmlFor={"fileChooser" + this.props.type} className='fileChooserLabel'>
          <div id='fake-button' className={this.props.isFileChosen ? "file-chosen" : "no-file"}>
            Seleziona un file {this.props.type}
          </div>
        </label>
      </div>
    );
  }
}

class TextArea extends React.Component {
  render() {
    return (
      <textarea
        placeholder='Scrivi alcune note...'
        onChange={this.props.onChange}
        value={this.props.value}
      />
    );
  }
}

class Input extends React.Component {
  render() {
    return (
      <input
        id='inputSaveName'
        placeholder='Scrivi nome file .json'
        onChange={this.props.handleChange}
        value={this.props.value}
      />
    );
  }
}

class SaveFileModal extends React.Component {
  render() {
    return (
      <div className='modalContainer'>
        <div className='saveJsonModal'>
          <h3>Salva con nome:</h3>
          <Input handleChange={this.props.change} />
          <div>
            <button className='customButton buttonSmaller' onClick={this.props.close}>
              Chiudi
            </button>
            <button className='customButton buttonSmaller' onClick={this.props.save}>
              Salva Json
            </button>
          </div>
        </div>
        <div className='modalBackground' onClick={this.props.close} />
      </div>
    );
  }
}

class ChangeParamModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      selectedIndex: null,
      algorithm: null,
    };
    this.addValue = this.addValue.bind(this);
    this.changeAlg = this.changeAlg.bind(this);
    this.sendInfo = this.sendInfo.bind(this);
  }

  componentDidMount() {
    let array = new Array(this.props.data.length);
    this.setState({
      selected: array,
    });
  }

  addValue(e, index) {
    let array = this.state.selected;
    if (e.target.value !== "null") {
      array[index] = e.target.value;
      this.setState({
        selected: array,
      });
    } else {
      array[index] = null;
    }
  }

  changeAlg(e) {
    this.setState({
      algorithm: e.target.value,
    });
  }

  sendInfo(e) {
    e.preventDefault();
    this.props.changeAlgorithm(this.state.algorithm);
    this.props.setParams(this.state.selected);
    this.props.trainReset();
  }

  render() {
    const obj = this.props.data.map((item, index) => (
      <option key={index} disabled={this.state.selected.includes(item) ? true : false}>
        {item}
      </option>
    ));

    const selects = this.props.data.map((item, index) => (
      <select key={index} onChange={(e) => this.addValue(e, index)}>
        <option value='null' selected>
          Seleziona valore
        </option>
        {obj}
      </select>
    ));

    return (
      <div className='modalContainer'>
        <div className='setParamModal'>
          <div id='frame'>
            <div onClick={this.props.close}>🗙</div>
          </div>
          <h4>Seleziona l'algoritmo da utilizzare</h4>
          <div>
            <select onChange={this.changeAlg}>
              <option value={null} selected disabled>
                Seleziona un algoritmo
              </option>
              <option value='svm'>SVM</option>
              <option value='rl'>RL</option>
            </select>
          </div>

          <h4>Seleziona i parametri da utilizzare</h4>
          {this.state.algorithm === "svm" ? (
            <span>
              Il primi due valori verrano usati rispettivamente come X e Y mentre l'ultimo
              rappresenterà la classificazione dei dati
            </span>
          ) : null}
          <div className='selectContainerParamModal'>{selects}</div>
          <div id='paramModalButtonContainer'>
            {this.state.selected.includes(undefined) ||
            this.state.selected.includes(null) ||
            this.state.algorithm === null ? (
              <button className='customButtonDisabled buttonSmaller' disabled>
                Disabled
              </button>
            ) : (
              <button className='customButton buttonSmaller' onClick={this.sendInfo}>
                Select
              </button>
            )}
          </div>
        </div>
        <div className='modalBackground' onClick={this.props.close} />
      </div>
    );
  }
}

class ResultPanel extends React.Component {
  render() {
    return (
      <div>
        {this.props.isTrainingFinished ? <h3 className='done'>Addestramento avvenuto</h3> : null}

        {this.props.qualityIndex && this.props.algorithmChosen === "svm" ? (
          <div className='quality-index'>
            <h3 className='quality-index-h3'>Indici di qualità</h3>
            <div className='quality-index-text'>
              {this.props.qualityIndex.precision > 0.6 ? (
                <div className='good-index index'>
                  <p className='quality-index-val'>
                    {Math.trunc(this.props.qualityIndex.precision * 100)}%
                  </p>
                  <p>Precision</p>
                </div>
              ) : null}
              {this.props.qualityIndex.precision > 0.4 &&
              this.props.qualityIndex.precision <= 0.6 ? (
                <div className='middle-index index'>
                  <p className='quality-index-val'>
                    {Math.trunc(this.props.qualityIndex.precision * 100)} %{" "}
                  </p>
                  <p>Precision</p>
                </div>
              ) : null}
              {this.props.qualityIndex.precision <= 0.4 ? (
                <div className='bad-index index'>
                  <p className='quality-index-val'>
                    {Math.trunc(this.props.qualityIndex.precision * 100)}%
                  </p>
                  <p>Precision</p>
                </div>
              ) : null}

              {this.props.qualityIndex.recall > 0.6 ? (
                <div className='good-index index'>
                  <p className='quality-index-val'>
                    {Math.trunc(this.props.qualityIndex.recall * 100)}%
                  </p>
                  <p>Recall</p>
                </div>
              ) : null}
              {this.props.qualityIndex.recall > 0.4 && this.props.qualityIndex.recall <= 0.6 ? (
                <div className='middle-index index'>
                  <p className='quality-index-val'>
                    {Math.trunc(this.props.qualityIndex.recall * 100)}%
                  </p>
                  <p>Recall</p>
                </div>
              ) : null}
              {this.props.qualityIndex.recall < 0.4 ? (
                <div className='bad-index index'>
                  <p className='quality-index-val'>
                    {Math.trunc(this.props.qualityIndex.recall * 100)}%
                  </p>
                  <p>Recall</p>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

class ControlPanel extends React.Component {
  render() {
    return (
      <div className='infoContainer'>
        <CheckBox
          algorithms={config.algorithms}
          handleCheckBox={this.props.handleChangeAlgorithm}
          algorithm={this.props.algorithm}
        />
        <Button
          text='Scegli nuovi parametri'
          onClick={() => this.props.selectParams(this.state.params)}
        />
        <h3 className='margin-top-medium'>Inserisci note al file di configurazione</h3>
        <TextArea onChange={this.props.onChange} value={this.props.notes} />

        <ResultPanel
          isTrainingFinished={this.props.isTrainingFinished}
          qualityIndex={this.props.qualityIndex}
          algorithmChosen={this.props.algorithm}
        />
      </div>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <button
        className='customButton buttonNormal'
        onClick={() => this.selectParams(this.state.params)}
      >
        Scegli nuovi parametri
      </button>
    );
  }
}

export {
  CheckBox,
  FileInput,
  TextArea,
  Input,
  SaveFileModal,
  ChangeParamModal,
  ControlPanel,
  Button,
};
