import classes from './WaitingAnimation.module.css';


const WaitingAnimation = () => {

    return (
      <div className={classes.lds_facebook}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
}

export default WaitingAnimation;