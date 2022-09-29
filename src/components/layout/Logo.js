import classes from './Logo.module.css'

const Logo = (props) => {

  const image = props.isPhone ? "logo-mobile.svg" : "logo-dark.svg";
    return (
      <div className={`${classes.logo}`}>
        <img src={image} alt="logo" />
      </div>
    );
}

export default Logo;