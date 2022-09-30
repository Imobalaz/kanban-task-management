import React from "react";
import data from "../store/data";

const AppContext = React.createContext({
  data: {},
  pickBackgroundColor: () => {},
  colorArray: []
});

export const colorArray = [
  "red",
  "blue",
  "green",
  "brown",
  "yellow",
  "orange",
  "grey",
];

export const AppProvider = (props) => {
  const pickBackgroundColor = (palette) => {
    const backgroundColorIndex = Math.floor(Math.random() * palette.length);
    const backgroundColor =
      palette.length !== 0 ? palette[backgroundColorIndex] : "black"
    ;
    palette.splice(backgroundColorIndex, 1);
    palette.push(backgroundColor)
    return backgroundColor
  };
  const appContext = {
    data: data,
    pickBackgroundColor: pickBackgroundColor,
    colorArray: colorArray,
  };
  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
