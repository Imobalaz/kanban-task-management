import TopNav from "./components/layout/TopNav";
import SideNav from "./components/layout/SideNav";
import classes from "./App.module.css";
import Container from "./components/todos/Container";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import Logo from "./components/layout/Logo";
import { useContext } from "react";
import AppContext from "./context/context-api";

function App() {
  const ctx = useContext(AppContext)
  const [width, setWidth] = useState();
  const [background, setBackground] = useState("green");




  useEffect(() => {
    const getWindowWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", getWindowWidth);
    getWindowWidth();
  }, []);

  let isPhone = false;

  isPhone = width <= 600;

  console.log(isPhone);

  useEffect(() => {
    if (isPhone) {
      setBackground("red");
    }
  }, [isPhone]);

  console.log(width);
  return (
    <Fragment>
      {!isPhone && (
        <>
          <Logo isPhone={isPhone} />
          <TopNav />
          <SideNav/>
          <div className={`${classes.page}`}>
            <Container />
            <div className={classes.display_sidebar}>
              <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z"
                  fill="#FFF"
                />
              </svg>
            </div>
          </div>
        </>
      )}
      {isPhone && (
        <div className={classes.mobile}>
          <div className={classes.mobile_nav}>
            <div className={classes.mobile_nav1}>
              <Logo isPhone={isPhone} />
              <div className={`${classes.platform_text} ${classes.active}`}>
                Platform Launch{" "}
                <span>
                  <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                    <path
                      stroke="#635FC7"
                      stroke-width="2"
                      fill="none"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className={classes.mobile_nav2}>
              <button>
                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="#FFF"
                    d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                  />
                </svg>
              </button>
              <div>
                <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#828FA3" fill-rule="evenodd">
                    <circle cx="2.308" cy="2.308" r="2.308" />
                    <circle cx="2.308" cy="10" r="2.308" />
                    <circle cx="2.308" cy="17.692" r="2.308" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <Container />
          <SideNav isPhone={isPhone}/>
        </div>
      )}
    </Fragment>
  );
}

export default App;
