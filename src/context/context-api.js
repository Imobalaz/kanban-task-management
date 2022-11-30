import React from "react";
import { useState, useEffect } from "react";
import dummyData from "../store/data";


const {boards} = dummyData;

let token = localStorage.getItem('userToken')


const tokenExpiryDate = localStorage.getItem('tokenExpirationDate');

const currentDate = new Date();
const currentDateInMilliSeconds = currentDate.getTime();
const remainingTimeBeforeExpiry = tokenExpiryDate - currentDateInMilliSeconds;


if (remainingTimeBeforeExpiry <= 0) {
  token = null;
  localStorage.removeItem('userToken');
  localStorage.removeItem('tokenExpirationDate')
}

const AppContext = React.createContext({
  data: {},
  setData: () => {},
  user: null,
  setUser: () => {},
  userToken: null,
  setUserToken: () => {},
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
  taskDropdownIsActive: false, 
  setTaskDropdownIsActive: () => {},
  neededBoard : {},
  setNeededBoard: () => {},
  otherRequest: () => {},
  getRequest: () => {},
  currentBoardId: null,
  setCurrentBoardId: () => {},

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

let initialBoardName = "";
if(boards[0] && boards[0].hasOwnProperty("name")) {
  initialBoardName = boards[0].name;
}



export const AppProvider = (props) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [currentBoardId, setCurrentBoardId] = useState(null)
  const [userToken, setUserToken] = useState(token)
  const [overlayIsActive, setOverlayIsActive] = useState(false)
  const [overlayType, setOverlayType] = useState('')
  const [boardName, setBoardName] = useState(initialBoardName)
  const [task, setTask] = useState({})
  const [isDark, setIsDark] = useState(false);
  const [sidenavIsActive, setSidenavIsActive] = useState(true)
  const [mobileDropdownIsActive, setMobileDrobdownIsActive] = useState(false)
  const [width, setWidth] = useState();
  const [boardDropdownIsActive, setBoardDropdownIsActive] = useState(false)
  const [taskDropdownIsActive, setTaskDropdownIsActive] = useState(false)
  const [neededBoard, setNeededBoard] = useState(data.length ? data[0] : null);


  

  const pickBackgroundColor = (palette) => {
    const backgroundColorIndex = Math.floor(Math.random() * palette.length);
    const backgroundColor =
      palette.length !== 0 ? palette[backgroundColorIndex] : "black"
    ;
    palette.splice(backgroundColorIndex, 1);
    palette.push(backgroundColor)
    return backgroundColor
  };

  const getRequest = async (api) => {
    const response = await fetch("http://localhost:8000/api/" + api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    const data = await response.json();

    return { data: data, status: response.status };
  };
  const otherRequest = async (api, type, payload = []) => {
    const response = await fetch("http://localhost:8000/api/" + api, {
      method: type,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return { data: data, status: response.status };
  };

  useEffect(() => {
    if (userToken) {
      const getUser = async () => {
        const response = await getRequest('user');
        setUser(response.data.data.id);
      }

      getUser();
    }
  }, [userToken])


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
    setTaskDropdownIsActive(false)
  }
  const appContext = {
    data,
    setData,
    user,
    setUser,
    userToken,
    setUserToken,
    pickBackgroundColor,
    colorArray,
    overlayIsActive,
    activateOverlay,
    deactivateOverlay,
    overlayType,
    setOverlayType,
    boardName,
    setBoardName,
    currentBoardId,
    setCurrentBoardId,
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
    taskDropdownIsActive,
    setTaskDropdownIsActive,
    neededBoard,
    setNeededBoard,
    otherRequest,
    getRequest,
  };
  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
