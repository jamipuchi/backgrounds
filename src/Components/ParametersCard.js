import React from "react";
import Card from "react-bootstrap/Card";
import "rc-slider/assets/index.css";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "./ParametersCard.sass";
import { useState } from "react";
import { ChromePicker } from "react-color";

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
      if (
        RegExp("^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$").test(
          props.bgParameters[props.id]
        )
      ) {
        return (
          <div
            style={{
              backgroundColor: props.bgParameters[props.id],
              textAlign: "center",
              borderRadius: "2px",
            }}
            className="colorPicker"
          >
            <label
              className="colorName"
              style={{ color: "white", mixBlendMode: "exclusion" }}
            >
              {props.bgParameters[props.id]}
            </label>
            <ChromePicker
              className="colorPickerComponent"
              color={props.bgParameters[props.id]}
              onChangeComplete={(color) => {
                onChange(color.hex);
              }}
            />
          </div>
        );
      }
      return (
        <input
          className="stringInput"
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
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
          }}
          key={id}
        >
          <div
            style={{
              textAlign: "right",
              marginRight: "10px",
              width: "30%",
              whiteSpace: "nowrap",
              alignSelf: "center",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {id}
          </div>
          <div style={{ width: "70%", alignSelf: "center" }}>
            <Input
              onChange={(value) => onChange(value)}
              bgParameters={props.bgParameters[props.id]}
              id={id}
            />
          </div>
        </div>
      ));

    default:
      return null;
  }
};

const ParametersCard = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <React.Fragment>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "10px",
          height: "10px",
        }}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      <Card
        style={
          isOpen
            ? {
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "#F5F5FA",
                margin: "20px",
                padding: "20px",
              }
            : { display: "none" }
        }
      >
        {Object.keys(props.bgParameters).map((id) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
            key={id}
          >
            <div
              style={{
                textAlign: "right",
                marginRight: "10px",
                width: "40%",
                whiteSpace: "nowrap",
                alignSelf: "center",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {id}
            </div>
            <div style={{ width: "60%", alignSelf: "center" }}>
              <Input
                setBgParameters={props.setBgParameters}
                bgParameters={props.bgParameters}
                id={id}
              />
            </div>
          </div>
        ))}
      </Card>
    </React.Fragment>
  );
};

export default ParametersCard;
