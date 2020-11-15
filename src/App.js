import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BackgroundList from "./Backgrounds/BackgroundList";
import React, { useState, useEffect } from "react";
import ParametersCard from "./ParametersCard";
import ParallaxCard from "./Components/ParallaxCard";

const App = () => {
  const [selectedBg, setSelectedBg] = useState(0);
  const [bgParameters, setBgParameters] = useState(
    BackgroundList[selectedBg].parameters
  );

  const selectBg = (i) => {
    setSelectedBg(i);
    setBgParameters(BackgroundList[i].parameters);
    BackgroundList[i].func(...Object.values(BackgroundList[i].parameters));
  };

  useEffect(() => {
    BackgroundList[selectedBg].func(...Object.values(bgParameters));
  }, [bgParameters]);

  return (
    <div>
      <div
        id="backgroundContainer"
        style={{ width: "100%", height: "900px", backgroundColor: "black" }}
      />
      <ParametersCard
        bgParameters={bgParameters}
        setBgParameters={setBgParameters}
      />
      <Container>
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {BackgroundList.map((bg, i) => (
            <a
              key={bg.name}
              onClick={() => selectBg(i)}
              style={{ width: "32%" }}
            >
              <ParallaxCard text={bg.name} layers={[bg.image]} />
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default App;
