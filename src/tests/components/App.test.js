import React from "react";
import "../mockFile";
import App from "../../components/App";
import Chooser from "../../components/Chooser";
import Graph from "../../components/Graph";
import UserNotes from "../../components/UserNotes";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
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

  test("should render <Graph/> and <UserNotes/> if dataSet exists", () => {
    component.setState({
      dataSet: [1, 2, 3, 4]
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
      showModal: true
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
      csvFile: "test"
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
      csvFile: { name: "test.csv" }
    });
    expect(
      component.containsMatchingElement(<span>test.csv</span>)
    ).toBeTruthy();
  });

  test("should render json file name if json file is selected", () => {
    component.setState({
      jsonFile: { name: "test.json" }
    });
    expect(
      component.containsMatchingElement(<span>test.json</span>)
    ).toBeTruthy();
  });
});
