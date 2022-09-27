import classes from './Logo.module.css'

const Logo = () => {
    return (
      <div className={classes.logo}>
        <img src="logo-dark.svg" alt="logo" />
      </div>
    );
}

export default Logo;