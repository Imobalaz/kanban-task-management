import React from "react";
import { useState } from "react";
import dummyData from "../store/data";


const {boards} = dummyData;


const AppContext = React.createContext({
  data: {},
  setData: () => {},
  pickBackgroundColor: () => {},
  colorArray: [],
  overlayIsActive: true,
  activateOverlay: () => {},
  deactivateOverlay: () => {},
  overlayType: '',
  setOverlayType: () => {},
  boardName: '',
  setBoardName: () => {},
  task: {
    columnName: '',
    taskTitle: '',
  },
  setTask: () => {},
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

let overlayIsActive;


export const AppProvider = (props) => {
  const [data, setData] = useState(dummyData)
  const [overlayIsActive, setOverlayIsActive] = useState(false)
  const [overlayType, setOverlayType] = useState('')
  const [boardName, setBoardName] = useState(boards[0].name)
  const [task, setTask] = useState({})
  const pickBackgroundColor = (palette) => {
    const backgroundColorIndex = Math.floor(Math.random() * palette.length);
    const backgroundColor =
      palette.length !== 0 ? palette[backgroundColorIndex] : "black"
    ;
    palette.splice(backgroundColorIndex, 1);
    palette.push(backgroundColor)
    return backgroundColor
  };

  const activateOverlay = () => {
    setOverlayIsActive(true)
  }


  const deactivateOverlay = () => {
    setOverlayIsActive(false)
  }
  const appContext = {
    data,
    setData,
    pickBackgroundColor,
    colorArray,
    overlayIsActive,
    activateOverlay,
    deactivateOverlay,
    overlayType,
    setOverlayType,
    boardName,
    setBoardName,
    task,
    setTask,
  };
  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
