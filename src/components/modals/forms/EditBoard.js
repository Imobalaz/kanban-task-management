import classes from "./AddNewBoard.module.css";
import Button from "../../ui/Button";
import { useState, useRef, useContext } from "react";
import AppContext from "../../../context/context-api";

const EditBoard = () => {
  const boardTitleRef = useRef();
  const ctx = useContext(AppContext);
  const [wholeBoard] = ctx.data.boards.filter(
    (board) => board.name === ctx.boardName
  );


  let initialColumnArray = [];
  let initialColumnInputs = [];
  if (wholeBoard.hasOwnProperty("columns")) {
    for (const column in wholeBoard.columns) {
      initialColumnArray.push(+column + 1);
      initialColumnInputs.push(wholeBoard.columns[column].name);
    }
  }


  const [columnArray, setColumnArray] = useState(initialColumnArray);
  const [columnInputs, setColumnInputs] = useState(initialColumnInputs);
  const [emptyInputs, setEmptyInputs] = useState([0]);
  const [inputIsEmpty, setInputIsEmpty] = useState([true]);
  const [inputIsTouched, setInputIsTouched] = useState([false]);
  const [inputHasErrorArray, setInputHasErrorArray] = useState([false]);
  const [boardName, setBoardName] = useState(ctx.boardName);

  const emptyInputsHandler = () => {
    for (const index in columnInputs) {
      if (columnInputs[index].trim().length === 0) {
        const isInArray = emptyInputs.includes(+index);
        if (!isInArray) {
          setEmptyInputs((prev) => [...prev, +index]);
        }
      }
    }

    for (const index in emptyInputs) {
      if (
        columnInputs[emptyInputs[index]] &&
        columnInputs[emptyInputs[index]].trim().length !== 0
      ) {
        const oldArray = emptyInputs;
        oldArray.splice(index);
        setEmptyInputs(oldArray);
      }
    }

    for (const index in emptyInputs) {
      if (emptyInputs[index] >= columnInputs.length) {
        const oldArray = emptyInputs;
        oldArray.splice(index, 1);
        setEmptyInputs(oldArray);
      }
    }
  };

  const inputIsEmptyHandler = () => {
    for (const column in columnInputs) {
      if (columnInputs[column] && columnInputs[column].trim().length !== 0) {
        const array = inputIsEmpty;
        array[column] = false;
        setInputIsEmpty(array);
      } else {
        const array = inputIsEmpty;
        array[column] = true;
        setInputIsEmpty(array);
      }
    }
  };

  let nextElement = columnArray[columnArray.length - 1] + 1;

  nextElement = !nextElement ? 1 : nextElement;

  const addBoardHandler = () => {
    setColumnArray((prev) => [...prev, nextElement]);
    setColumnInputs((prev) => [...prev, ""]);
    setEmptyInputs((prev) => [...prev, +columnArray.length]);
    setInputIsEmpty((prev) => [...prev, true]);
    setInputIsTouched((prev) => [...prev, false]);
    setInputHasErrorArray((prev) => [...prev, false]);
  };

  const removeColumnInputHandler = (columnIndex) => {
    const oldArray = columnInputs;
    oldArray.splice(columnIndex, 1);
    setColumnInputs(oldArray);

    const array = columnArray;
    array.splice(columnIndex, 1);
    setColumnArray(array);

    const oldInputsArray = inputIsEmpty;
    oldInputsArray.splice(columnIndex, 1);
    setInputIsEmpty(oldInputsArray);

    const oldInputsTouchedArray = inputIsTouched;
    oldInputsTouchedArray.splice(columnIndex, 1);
    setInputIsTouched(oldInputsTouchedArray);

    const oldInputHasError = inputHasErrorArray;
    oldInputHasError.splice(columnIndex, 1);
    setInputHasErrorArray(oldInputHasError);

    const columnIsEmpty = emptyInputs.includes(+columnIndex);
    if (columnIsEmpty) {
      const newEmptyArray = emptyInputs;
      newEmptyArray.splice(columnIndex, 1);
      setColumnArray(newEmptyArray);
    }
    const newColumnArray = columnArray.filter(
      (col) => col !== columnInputs[columnIndex]
    );
    setColumnArray(newColumnArray);
  };

  const inputChangeHandler = (value, columnIndex) => {
    const columnInputsCopy = columnInputs;
    const inputHasErrorArrayCopy = inputHasErrorArray;
    columnInputsCopy[columnIndex] = value;
    setColumnInputs(columnInputsCopy);
    emptyInputsHandler();
    inputIsEmptyHandler();
    inputHasErrorArrayCopy[columnIndex] =
      inputIsEmpty[columnIndex] && inputIsTouched[columnIndex];

    setInputHasErrorArray(inputHasErrorArrayCopy);
  };

  const boardNameInputHandler = (event) => {
    setBoardName(event.target.value);
  };

  const blurHandler = (columnIndex) => {
    const inputIsTouchedCopy = inputIsTouched;
    const inputHasErrorArrayCopy = inputHasErrorArray;
    inputIsTouchedCopy[columnIndex] = true;
    setInputIsTouched(inputIsTouchedCopy);

    inputHasErrorArrayCopy[columnIndex] =
      inputIsEmpty[columnIndex] && inputIsTouched[columnIndex];
    setInputHasErrorArray(inputHasErrorArrayCopy);
  };

  const updateColumnInputs = (e, index) => {
    const inputHasErrorArrayCopy = inputHasErrorArray;
    const inputs = [...columnInputs];
    inputs[index] = e.target.value;
    setColumnInputs(inputs);
    emptyInputsHandler();
    inputIsEmptyHandler();
    inputHasErrorArrayCopy[index] =
      inputIsEmpty[index] && inputIsTouched[index];

    setInputHasErrorArray(inputHasErrorArrayCopy);
  };

  const looper = columnInputs.map((column, index) => {
    return (
      <div key={`column${index}`} className={`${classes.columns} `}>
        <input
          type="text"
          value={column}
          onChange={(e) => updateColumnInputs(e, index)}
        />
        <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
          <g fill="#828FA3" fill-rule="evenodd">
            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
          </g>
        </svg>
      </div>
    );
  });

  const formSubmitHandler = () => {
    emptyInputsHandler();
    inputIsEmptyHandler();
    const isAllBlur = [];
    for (const input in inputIsTouched) {
      isAllBlur.push(true);
    }
    setInputIsTouched(isAllBlur);

    const inputErrorRevised = inputHasErrorArray;
    for (const input in inputHasErrorArray) {
      const value = inputIsEmpty[input] && isAllBlur[input];
      inputErrorRevised[input] = value;
    }
    setInputHasErrorArray(inputErrorRevised);

    let formIsValid = true;

    for (const input of inputHasErrorArray) {
      formIsValid *= !input;
    }

    if (
      formIsValid &&
      boardTitleRef.current.value &&
      boardTitleRef.current.value.trim()
    ) {
      const newBoard = {
        name: boardTitleRef.current.value,
        columns: columnInputs.map((column) => {
          return { name: column, tasks: [] };
        }),
      };

      ctx.data.boards.push(newBoard);
      ctx.deactivateOverlay();
    }
  };

  return (
    <div className={classes.container}>
      <p className={classes.title}>Edit Board</p>

      <div class={`${classes.board_form}`}>
        <label htmlFor="boardName">Name</label>
        <input
          type="text"
          className=""
          id="boardName"
          onChange={boardNameInputHandler}
          placeholder="e.g. Web Design"
          value={boardName}
        />
      </div>
      <div className={classes.all_columns}>
        <p>Columns</p>

        {/* {columnsInput} */}
        {looper}

        <Button isForm={true} color="grey" onClick={addBoardHandler}>
          + Add New Column
        </Button>
      </div>

      <Button isForm={true} onClick={formSubmitHandler}>
        Create New Board
      </Button>
    </div>
  );
};

export default EditBoard;
