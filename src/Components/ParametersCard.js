import React from "react";
import Card from "react-bootstrap/Card";
import "rc-slider/assets/index.css";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import Slider, { createSliderWithTooltip } from "rc-slider";

const SliderWithTooltip = createSliderWithTooltip(Slider);

const Input = (props) => {
  const onChange = (value) => {
    if (props.onChange !== undefined) {
      props.onChange({
        ...props.bgParameters,
        ...{ [props.id]: value },
      });
    } else {
      props.setBgParameters((prevState) => {
        return {
          ...prevState,
          ...{ [props.id]: value },
        };
      });
    }
  };

  switch (typeof props.bgParameters[props.id]) {
    case "number":
      return (
        <SliderWithTooltip
          onChange={(value) => onChange(value)}
          tipFormatter={(value) => {
            return <div>{value}</div>;
          }}
          value={props.bgParameters[props.id]}
        />
      );
    case "string":
      return (
        <input
          style={{ borderRadius: "5px", border: "1px solid #eee" }}
          value={props.bgParameters[props.id]}
          type="text"
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "boolean":
      return (
        <Switch
          checked={props.bgParameters[props.id]}
          onChange={(value) => onChange(value)}
        />
      );
    //props.bgParameters[props.id]
    case "object":
      return Object.keys(props.bgParameters[props.id]).map((id) => (
        <div
          key={id}
          style={{
            marginLeft: "40px",
          }}
        >
          {id}
          <Input
            onChange={(value) => onChange(value)}
            bgParameters={props.bgParameters[props.id]}
            id={id}
          />
        </div>
      ));

    default:
      return null;
  }
};

const ParametersCard = (props) => {
  return (
    <Card
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        margin: "20px",
        padding: "20px",
      }}
    >
      {Object.keys(props.bgParameters).map((id) => (
        <div key={id}>
          {id}
          <Input
            setBgParameters={props.setBgParameters}
            bgParameters={props.bgParameters}
            id={id}
          />
        </div>
      ))}
    </Card>
  );
};

export default ParametersCard;
