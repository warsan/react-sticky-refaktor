import React from "react";
import ReactDOM from "react-dom";

import { StickyViewport, StickyBoundary, Sticky } from "./Sticky";

import "./styles.css";

const containerStyle = {
  height: "100vh",
  overflowY: "auto"
};

function App() {
  const handleStuck = (target) => {
    // console.log(`Stuck!`, target)
    // target.style.backgroundColor = '#4caf50'
    // target.style.boxShadow =
    //   '0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4)'
  };
  const handleUnstuck = (target) => {
    // console.log(`UNstuck!`, target)
    // target.style.backgroundColor = 'rebeccapurple'
    // target.style.boxShadow = ''
  };
  const handleChange = ({ target, type }) => {
    if (type === "stuck") {
      // console.log(`Changed!!`, type, target);
      target.style.backgroundColor = "#4caf50";
      target.style.boxShadow =
        "0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4)";
    } else {
      target.style.backgroundColor = "rebeccapurple";
      target.style.boxShadow = "";
    }
  };

  const stickySectionElements = Array.from({ length: 10 }, (_, i) => i + 1).map(
    (key) => (
      <StickyBoundary
        key={key}
        style={{ height: "55vh" }}
        onStuck={handleStuck}
        onUnstuck={handleUnstuck}
        onChange={handleChange}
      >
        <Sticky id={key} as="h1">
          Липкая шапка {key}
        </Sticky>
        <h3>{key} — Некий контент под липкой шапкой</h3>
        <article>
          Не следует, однако забывать, что дальнейшее развитие различных форм
          деятельности способствует подготовке и реализации форм развития.
          Равным образом консультация с широким активом требуют определения и
          уточнения модели развития. Таким образом реализация намеченных
          плановых заданий позволяет оценить значение новых предложений.
        </article>
      </StickyBoundary>
    )
  );

  return (
    <div className="App">
      <StickyViewport as="main" style={containerStyle}>
        {stickySectionElements}
      </StickyViewport>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
