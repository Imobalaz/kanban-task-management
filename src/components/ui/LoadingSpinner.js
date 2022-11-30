import classes from './LoadingSpinner.module.css'

const LoadingSpinner = () => {
return (
  <div className={classes.lds_ring}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
}


export default LoadingSpinner;