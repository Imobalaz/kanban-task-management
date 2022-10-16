import TopNav from "./components/layout/TopNav";
import SideNav from "./components/layout/SideNav";
import classes from "./App.module.css";
import Container from "./components/todos/Container";
import { Fragment } from "react";
import Logo from "./components/layout/Logo";
import { useContext } from "react";
import AppContext from "./context/context-api";
import Overlay from "./components/layout/Overlay";

function App() {
  const ctx = useContext(AppContext);
  const overlayState = ctx.overlayIsActive;

  const dark = ctx.isDark ? classes.dark : "";
  const noSidenav = !ctx.sidenavIsActive ? classes.no_sidenav : "";

  const containerStyle = `${classes.container} ${
    overlayState ? classes.overlayIsActive : ""
  }`;

   const editBoardHandler = () => {
     ctx.setBoardDropdownIsActive(false);
     ctx.activateOverlay();
     ctx.setOverlayType("edit board");
   };

     const deleteBoardHandler = () => {
       ctx.setBoardDropdownIsActive(false);
       ctx.activateOverlay();
       ctx.setOverlayType("delete board");
     }; 

  const showSidenavHandler = () => {
    ctx.setSidenavIsActive(true);
  }

  const toggleDropdownHandle = () => {
    ctx.setMobileDrobdownIsActive(prev => !prev)
  }

  const spanClickHandler = () => {
    ctx.setBoardDropdownIsActive(prev => !prev)
  }

  const addTaskHandler = () => {
    ctx.activateOverlay();
    ctx.setOverlayType('add task')
  }
 
  const isPhone = ctx.isPhone;
  return (
    <Fragment>
      {!isPhone && (
        <div className={containerStyle}>
          <Logo isPhone={isPhone} />
          <TopNav />
          <SideNav />
          <div className={`${classes.page} ${noSidenav}`}>
            <Container />
            {!ctx.sidenavIsActive && (
              <div
                className={classes.display_sidenav}
                onClick={showSidenavHandler}
              >
                <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z"
                    fill="#FFF"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      )}
      {isPhone && (
        <div
          className={`${classes.mobile} ${
            ctx.mobileDropdownIsActive || ctx.overlayIsActive ? classes.dropdownActive : ""
          }`}
        >
          <div className={`${classes.mobile_nav} ${dark}`}>
            <div className={classes.mobile_nav1}>
              <Logo isPhone={isPhone} />
              <div
                className={`${classes.platform_text} ${dark} ${
                  ctx.mobileDropdownIsActive ? classes.active : ""
                }`}
                onClick={toggleDropdownHandle}
              >
                {ctx.boardName}
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
              <button onClick={addTaskHandler}>
                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="#FFF"
                    d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                  />
                </svg>
              </button>
              <div onClick={spanClickHandler}>
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
          {ctx.boardDropdownIsActive && (
            <div className={`${classes.dropdown} ${ctx.isDark ? classes.dark : ''}`}>
              <p onClick={editBoardHandler}>Edit Board</p>
              <p className={classes.delete_board} onClick={deleteBoardHandler}>Delete Board</p>
            </div>
          )}
          <Container />
          {ctx.mobileDropdownIsActive && <Overlay />}
          {ctx.mobileDropdownIsActive && <SideNav isPhone={isPhone} />}
        </div>
      )}
    </Fragment>
  );
}

export default App;
