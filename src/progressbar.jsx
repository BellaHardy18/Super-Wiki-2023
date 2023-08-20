import React from "react";

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 28,
    width: "80%",

    borderRadius: 90
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    background: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
    transition: "width 1s ease-in-out"
  };

  const labelStyles = {
    padding: 15,
    color: "white",
    fontWeight: "bold"
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
