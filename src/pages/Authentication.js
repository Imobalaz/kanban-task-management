import Button from "../components/ui/Button";
import classes from "./Authentication.module.css";
import { useState, useContext } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import AppContext from "../context/context-api";

const Authentication = (props) => {
  const ctx = useContext(AppContext);
  const history = useHistory();
  const [ isLoading, setIsLoading ] = useState(false);
  const [authType, setAuthType] = useState(props.type);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [invalidInput, setInvalidInput] = useState({
    username: { status: false, message: "" },
    email: { status: false, message: "" },
    password: { status: false, message: "" },
  });

  const usernameChangeHandler = (event) => {
    setInput((prev) => {
      return { ...prev, username: event.target.value };
    });
  };

  const emailChangeHandler = (event) => {
    setInput((prev) => {
      return { ...prev, email: event.target.value };
    });
  };
  const passwordChangeHandler = (event) => {
    setInput((prev) => {
      return { ...prev, password: event.target.value };
    });
  };
  const confirmPasswordChangeHandler = (event) => {
    setInput((prev) => {
      return { ...prev, confirmPassword: event.target.value };
    });
  };


  const pageChangeHandler = () => {
    let changedAuth;
    let route;
    if (authType === "signUp") {
      changedAuth = "login";
      route = 'login';
    } else {
      changedAuth = "signUp";
      route = 'sign-up'
    }
    setAuthType(changedAuth);
    history.push('/' + route);
  };

  const formSubmitHandler = async () => {
    const usernameIsValid = input.username.length !== 0;
    const emailIsValid = input.email.includes("@");
    const passwordIsValid = input.password.length >= 6;
    const passwordsMatch = input.password === input.confirmPassword;

    if (!usernameIsValid) {
      setInvalidInput((prev) => {
        return {
          ...prev,
          username: { status: true, message: "Username cannot be empty" },
        };
      });
    } else {
      setInvalidInput((prev) => {
        return {
          ...prev,
          username: { status: false, message: "" },
        };
      });
    }
    if (!emailIsValid) {
      setInvalidInput((prev) => {
        return {
          ...prev,
          email: {
            status: true,
            message: "Input must be a valid email address",
          },
        };
      });
    } else {
      setInvalidInput((prev) => {
        return {
          ...prev,
          email: { status: false, message: "" },
        };
      });
    }

    if (!passwordIsValid && authType === "signUp") {
      setInvalidInput((prev) => {
        return {
          ...prev,
          password: {
            status: true,
            message: "Password must be at least 6 characters",
          },
        };
      });
    } else {
      setInvalidInput((prev) => {
        return {
          ...prev,
          password: { status: false, message: "" },
        };
      });
    }

    if (!passwordsMatch && passwordIsValid && authType === "signUp") {
      setInvalidInput((prev) => {
        return {
          ...prev,
          password: {
            status: true,
            message: "Passwords do not match",
          },
        };
      });
    }

    if (passwordIsValid && passwordsMatch) {
      setInvalidInput((prev) => {
        return {
          ...prev,
          password: { status: false, message: "" },
        };
      });
    }

    let formIsValid;
    let payload;
    let api;

    if (authType === "signUp") {
      formIsValid =
        usernameIsValid && emailIsValid && passwordIsValid && passwordsMatch;

      payload = {
        name: input.username,
        email: input.email,
        password: input.password,
        password_confirmation: input.confirmPassword,
      };

      api = "users";
    } else {
      formIsValid = emailIsValid && passwordIsValid;

      payload = {
        email: input.email,
        password: input.password,
      };

      api = "login";
    }

    if (!formIsValid) {
      return;
    }

    const apiRequest = async () => {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8000/api/auth/${api}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      return data;

      
    };

    const data = await apiRequest();

    setIsLoading(false);

    if (data.email !== undefined && authType === "signUp") {
      setInvalidInput((prev) => {
        return { ...prev, email: { status: true, message: data.email } };
      });
    }

    if (data.message !== undefined && authType === "login") {
      if (data.message.includes("identificator")) {
        setInvalidInput((prev) => {
          return {
            ...prev,
            email: { status: true, message: "Email has not been registered" },
          };
        });
      } else if (data.message.includes("password")) {
        setInvalidInput((prev) => {
          return { ...prev, password: { status: true, message: data.message } };
        });
      }
    }



    const token = data ? data.authorisation.token : '';

    localStorage.setItem('userToken', token);

    const currentDate = new Date();
    const dateInMilliSeconds = currentDate.getTime();
    const expiryDateInMilliSeconds = dateInMilliSeconds + 604800000;

    localStorage.setItem('tokenExpirationDate', expiryDateInMilliSeconds)

    ctx.setUserToken(token)

    ctx.setUser(data.user.id);

    history.replace('/profile')

  };

  const buttonContent = isLoading ? (
    <LoadingSpinner />
  ) : authType === "signUp" ? (
    "Sign Up"
  ) : (
    "Login"
  );

  const pageChangeText =
    authType === "signUp" ? "Already have an account?" : "Create new account?";
  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <div className={classes.title}>
          {authType === "signUp" ? "Sign Up" : "Login"}
        </div>

        {authType === "signUp" && (
          <div className={classes.form_group}>
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              onChange={usernameChangeHandler}
              value={input.username}
            />
            {invalidInput.username.status && (
              <div className={classes.error_message}>
                {invalidInput.username.message}
              </div>
            )}
          </div>
        )}
        <div className={classes.form_group}>
          <label htmlFor="username">Email *</label>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            value={input.email}
          />
          {invalidInput.email.status && (
            <div className={classes.error_message}>
              {invalidInput.email.message}
            </div>
          )}
        </div>
        <div className={classes.form_group}>
          <label htmlFor="username">Password *</label>
          <input
            type="password"
            id="email"
            onChange={passwordChangeHandler}
            value={input.password}
          />
          {invalidInput.password.status && (
            <div className={classes.error_message}>
              {invalidInput.password.message}
            </div>
          )}
        </div>
        {authType === "signUp" && (
          <div className={classes.form_group}>
            <label htmlFor="username">Confirm Password</label>
            <input
              type="password"
              id="email"
              onChange={confirmPasswordChangeHandler}
              value={input.confirmPassword}
            />
          </div>
        )}

        {authType === "login" && (
          <p className={classes.link}>Forgot Password?</p>
        )}
        <p className={classes.link} onClick={pageChangeHandler}>
          {pageChangeText}
        </p>

        <Button onClick={formSubmitHandler}>{buttonContent}</Button>
      </div>
    </div>
  );
};

export default Authentication;
