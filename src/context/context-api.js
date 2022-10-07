import React from "react";
import { useState, useEffect } from "react";
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
  isDark: false,
  setIsDark: () => {},
  sidenavIsActive: true,
  setSidenavIsActive: () => {},
  isPhone: '',
  mobileDropdownIsActive: '',
  setMobileDrobdownIsActive: () => {},
  boardDropdownIsActive: false,
  setBoardDropdownIsActive: () => {},
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
  const [data, setData] = useState(dummyData)
  const [overlayIsActive, setOverlayIsActive] = useState(false)
  const [overlayType, setOverlayType] = useState('')
  const [boardName, setBoardName] = useState(boards[0].name)
  const [task, setTask] = useState({})
  const [isDark, setIsDark] = useState(false);
  const [sidenavIsActive, setSidenavIsActive] = useState(true)
  const [mobileDropdownIsActive, setMobileDrobdownIsActive] = useState(false)
  const [width, setWidth] = useState();
  const [boardDropdownIsActive, setBoardDropdownIsActive] = useState(false)
  const pickBackgroundColor = (palette) => {
    const backgroundColorIndex = Math.floor(Math.random() * palette.length);
    const backgroundColor =
      palette.length !== 0 ? palette[backgroundColorIndex] : "black"
    ;
    palette.splice(backgroundColorIndex, 1);
    palette.push(backgroundColor)
    return backgroundColor
  };

  useEffect(() => {
    const getWindowWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", getWindowWidth);
    getWindowWidth();
  }, []);

  let isPhone = false;

  isPhone = width <= 600;

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
    isDark,
    setIsDark,
    sidenavIsActive,
    setSidenavIsActive,
    isPhone,
    mobileDropdownIsActive,
    setMobileDrobdownIsActive,
    boardDropdownIsActive,
    setBoardDropdownIsActive,
  };
  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
