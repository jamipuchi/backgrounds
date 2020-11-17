import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BackgroundList from "./Backgrounds/BackgroundList";
import React, { useState, useEffect } from "react";
import ParametersCard from "./Components/ParametersCard";
import ParallaxCard from "./Components/ParallaxCard";

const App = () => {
  const [selectedBg, setSelectedBg] = useState(0);
  const [bgParameters, setBgParameters] = useState(
    BackgroundList[selectedBg].parameters
  );
  const [bgUpdateAndEnd, setBgUpdateAndEnd] = useState([() => {}, () => {}]);

  const selectBg = (i) => {
    bgUpdateAndEnd[1]();
    setSelectedBg(i);
    setBgParameters(BackgroundList[i].parameters);
    setBgUpdateAndEnd(
      BackgroundList[i].func(...Object.values(BackgroundList[i].parameters))
    );
  };

  useEffect(() => {
    if (bgUpdateAndEnd[0] != null) {
      bgUpdateAndEnd[0](...Object.values(bgParameters));
    } else {
      BackgroundList[selectedBg].func(...Object.values(bgParameters));
    }
  }, [bgParameters]);

  useEffect(() => {
    selectBg(selectedBg);
  }, []);

  return (
    <div
      style={{ padding: "20px"}}
    >
      <div
        id="backgroundContainer"
        style={{
          width: "100%",
          height: "900px",

          boxShadow:
            "0 45px 100px rgba(14, 21, 47, 0.4), 0 16px 40px rgba(14, 21, 47, 0.4)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      />
      <ParametersCard
        bgParameters={bgParameters}
        setBgParameters={setBgParameters}
      />
      <div
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {BackgroundList.map((bg, i) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a key={bg.name} onClick={() => selectBg(i)}>
            <ParallaxCard text={bg.name} layers={[bg.image]} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default App;
