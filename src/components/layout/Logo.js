import classes from './Logo.module.css'

const Logo = () => {
    return (
      <div className={`${classes.logo} ${classes.no_side_nav}`}>
        <img src="logo-dark.svg" alt="logo" />
      </div>
    );
}

export default Logo;