import classes from "./Logo.module.css";
import { useContext } from "react";
import AppContext from "../../context/context-api";

const Logo = (props) => {
  const ctx = useContext(AppContext);
  const fullLogo = ctx.isDark ? "logo-light.svg" : "logo-dark.svg";
  const image = props.isPhone ? "logo-mobile.svg" : fullLogo;
  const dark = ctx.isDark ? classes.dark : "";
  const noSidenav = !ctx.sidenavIsActive ? classes.no_sidenav : '';

  const clickHandler = () => {
    ctx.setBoardDropdownIsActive(false)
  }

  return (
    <div className={`${classes.logo} ${dark} ${noSidenav}`} onClick={clickHandler}>
      <img src={image} alt="logo" />
    </div>
  );
};

export default Logo;
