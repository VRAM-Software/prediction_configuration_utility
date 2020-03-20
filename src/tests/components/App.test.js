import React from "react";
import "../mockFile";
import App from "../../components/App";
import Chooser from "../../components/Chooser";
import Graph from "../../components/Graph";
import UserNotes from "../../components/UserNotes";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow, mount } from "enzyme";
import Modal from "../../components/Modal";


configure({
  adapter: new Adapter()
});

describe("Tests for <App /> component", () => {
  let component;
  beforeEach(() => {
    component = shallow(<App />);
  });

  test("should render VRAM Software Applicativo Esterno - PoC 3", () => {
    expect(
      component.containsMatchingElement(
        <span>VRAM Software Applicativo Esterno - PoC 3</span>
      )
    ).toBeTruthy();
  });

  test("should render two Chooser components", () => {
    expect(
      component.containsAllMatchingElements([<Chooser />, <Chooser />])
    ).toBeTruthy();
  });

  test("should render <Graph/> and <UserNotes/> if userData exists", () => {
    component.setState({
      userData: [1, 2, 3, 4]
    });
    expect(
      component.containsAllMatchingElements([<Graph />, <UserNotes />])
    ).toBeTruthy();
  });

  test("should not render render <Graph/> and <UserNotes/> when component is rendered", () => {
    expect(
      component.containsAllMatchingElements([<Graph />, <UserNotes />])
    ).toBeFalsy();
  });

  test("component <Modal/> should be displayed if showModal state is true", () => {
    component.setState({
      isModalEnabled: true
    });
    expect(component.containsMatchingElement(<Modal />)).toBeTruthy();
  });

  test("should not render <Modal/> when component is rendered", () => {
    expect(component.containsMatchingElement(<Modal />)).toBeFalsy();
  });

  test("button 'Inizia addestramento' should be disabled when <App /> is rendered", () => {
    expect(
      component.find("button[children='Inizia addestramento']").is("[disabled]")
    ).toBeTruthy();
  });

  test("button 'Inizia addestramento' should be enabled when csvFile exists", () => {
    component.setState({
      csvFileInfo: "test"
    });
    expect(
      component.find("button[children='Inizia addestramento']").is("[disabled]")
    ).toBeFalsy();
  });

  test("button 'Salva' should be disabled when <App /> is rendered", () => {
    expect(
      component.find("button[children='Salva json']").is("[disabled]")
    ).toBeTruthy();
  });

  test("button 'Salva json' should be enabled after training is done", () => {
    component.setState({
      isTrainingDone: true
    });
    expect(
      component.find("button[children='Salva json']").is("[disabled]")
    ).toBeFalsy();
  });

  test("should not render file paths if csv and json file are not selected", () => {
    expect(
      component.find("span[children='Nessun file selezionato']").length
    ).toEqual(2);
  });

  test("should render csv file name if csv file is selected", () => {
    component.setState({
      csvFileInfo: { name: "test.csv" }
    });
    expect(
      component.containsMatchingElement(<span>test.csv</span>)
    ).toBeTruthy();
  });

  test("should render json file name if json file is selected", () => {
    component.setState({
      jsonFileInfo: { name: "test.json" }
    });
    expect(
      component.containsMatchingElement(<span>test.json</span>)
    ).toBeTruthy();
  });

  test("button 'Salva json' should open modal", () => {
    component.setState({
      isTrainingDone: true
    });
    component.find("button[children='Salva json']").simulate('click', {
      preventDefault: () => {}});
    expect(component.state('isModalEnabled')).toEqual(true);
  });

  test("button 'Chiudi' in modal should close modal", () => {
    let component = mount(<App />);
    component.setState({
      isModalEnabled: true
    });
    component.find("button[children='Chiudi']").simulate('click', {
      preventDefault: () => {}});
    expect(component.state('isModalEnabled')).toEqual(false);
  });

  test("when modal is open clicking the background should close modal", () => {
    let component = mount(<App />);
    component.setState({
      isModalEnabled: true
    });
    component.find(".modalBackground").simulate('click', { preventDefault: () => {} });
    expect(component.state('isModalEnabled')).toEqual(false);
  });

  // These tests are commented out because we do not have a way to mock ipcRenderer and Electron functions in react yet

  // test("when modal is open clicking 'Salva Json' should trigger state change", () => {
  //   let component = mount(<App />);
  //   component.setState({
  //     isModalEnabled: true
  //   });
  //   component.find("button[children='Salva Json']").simulate('click', { preventDefault: () => {} });
  //   expect(component.state('isModalEnabled')).toEqual(false);
  // });

  // test("when modal is open clicking 'Salva Json' should send signal to main process", () => {
  //   let component = mount(<App />);
  //   component.setState({
  //     isModalEnabled: true
  //   });
  //   const events = {};
   
  //   component.setState({
  //     fileName: 'test',
  //     trainedJson: {a:1,b:2},
  //     notes: 'notes'
  //   });

  //   let obj = {
  //     name: component.state('fileName'),
  //     json: component.state('trainedJson'),
  //     notes: component.state('userNotes')
  //   }
    
  //   component.find("button[children='Salva Json']").simulate('click', { preventDefault: () => {} });
  //   expect(ipcRenderer.send).toBeCalledWith('save-to-disk', obj);
  // });

  test("when modal is open changing input should trigger state change", () => {
    let component = mount(<App />);
    component.setState({
      isModalEnabled: true
    });
    component.find("#inputSaveName").simulate('change', {target: {value: 'test'}})
    expect(component.state('fileName')).toEqual('test');
  });

  test("changing text in textarea should trigger state change", () => {
    let component = mount(<App />);
    component.setState({
      userData: [1, 2, 3, 4]
    });
    component.find('textarea').simulate('change', {target: {value: 'test text'}});
    expect(component.state('userNotes')).toEqual('test text');
  })
});
