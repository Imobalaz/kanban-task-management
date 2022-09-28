import classes from "./TopNav.module.css";
import Button from "../ui/Button";
const TopNav = () => {
  return (
    <div className={`${classes.container} ${classes.no_side_nav}`}>
      <div className={classes.subcontainer}>
        <p>Platform Launch</p>
        <div className={classes.subcontainer_action}>
          <Button>+ Add New Task</Button>
          <span>
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fill-rule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
              </g>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
