import classes from "./AddNewBoard.module.css";
import Button from "../../ui/Button";
import { useState, useContext } from "react";
import AppContext from "../../../context/context-api";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const EditBoard = () => {
    const history = useHistory();
  const ctx = useContext(AppContext);
  const [wholeBoard] = ctx.data.boards.filter(
    (board) => board.name === ctx.boardName
  );

  const boardIndex = ctx.data.boards.findIndex(
    (board) => board.name === ctx.boardName
  );

  let initialColumnArray = [];
  let initialColumnInputs = [];
  let initialColumnsIsTouched = [];
  let initialInputHasErrorArray = [];
  let initialInputIsEmpty = [];
  if (wholeBoard && wholeBoard.hasOwnProperty("columns")) {
    for (const column in wholeBoard.columns) {
      initialColumnArray.push(+column + 1);
      initialColumnInputs.push(wholeBoard.columns[column].name);
      initialColumnsIsTouched.push(false);
      initialInputHasErrorArray.push(false);
      initialInputIsEmpty.push(false);
    }
  }

  const [columnArray, setColumnArray] = useState(initialColumnArray);
  const [columnInputs, setColumnInputs] = useState(initialColumnInputs);
  const [inputIsEmpty, setInputIsEmpty] = useState(initialInputIsEmpty);
  const [inputIsTouched, setInputIsTouched] = useState(initialColumnsIsTouched);
  const [inputHasErrorArray, setInputHasErrorArray] = useState(
    initialInputHasErrorArray
  );
  const [boardName, setBoardName] = useState(ctx.boardName);

  //   const emptyInputsHandler = () => {
  //     for (const index in columnInputs) {
  //       if (columnInputs[index].trim().length === 0) {
  //         const isInArray = emptyInputs.includes(+index);
  //         if (!isInArray) {
  //           setEmptyInputs((prev) => [...prev, +index]);
  //         }
  //       }
  //     }

  //     for (const index in emptyInputs) {
  //       if (
  //         columnInputs[emptyInputs[index]] &&
  //         columnInputs[emptyInputs[index]].trim().length > 0
  //       ) {
  //         const oldArray = emptyInputs;
  //         oldArray.splice(index);
  //         setEmptyInputs(oldArray);
  //       }
  //     }

  //     for (const index in emptyInputs) {
  //       if (emptyInputs[index] >= columnInputs.length) {
  //         const oldArray = [...emptyInputs];
  //         oldArray.splice(index, 1);
  //         setEmptyInputs(oldArray);
  //       }
  //     }
  //   };

  useEffect(() => {
    const array = columnInputs.map((input, index) => {
      return columnInputs[index].trim().length > 0 ? false : true;
    });
    setInputIsEmpty(array);
  }, [columnInputs]);

  useEffect(() => {
    const array = columnInputs.map((input, index) => {
      return inputIsTouched[index] && inputIsEmpty[index];
    });

    setInputHasErrorArray(array);
  }, [columnInputs, inputIsTouched, inputIsEmpty]);

  let nextElement = columnArray[columnArray.length - 1] + 1;
  nextElement = !nextElement ? 1 : nextElement;

  const addBoardHandler = () => {
    setColumnArray((prev) => [...prev, nextElement]);
    setColumnInputs((prev) => [...prev, ""]);
    setInputIsEmpty((prev) => [...prev, true]);
    setInputIsTouched((prev) => [...prev, false]);
    setInputHasErrorArray((prev) => [...prev, false]);
  };

  const removeColumnInputHandler = (columnIndex) => {
    const oldArray = [...columnInputs];
    oldArray.splice(columnIndex, 1);
    setColumnInputs(oldArray);


    const array = [...columnArray];
    array.splice(columnIndex, 1);
    setColumnArray(array);

    const oldInputsArray = [...inputIsEmpty];
    oldInputsArray.splice(columnIndex, 1);
    setInputIsEmpty(oldInputsArray);

    const oldInputsTouchedArray = [...inputIsTouched];
    oldInputsTouchedArray.splice(columnIndex, 1);
    setInputIsTouched(oldInputsTouchedArray);

    const oldInputHasError = [...inputHasErrorArray];
    oldInputHasError.splice(columnIndex, 1);
    setInputHasErrorArray(oldInputHasError);

    // const columnIsEmpty = emptyInputs.includes(+columnIndex);
    // if (columnIsEmpty) {
    //   const newEmptyArray = [...emptyInputs];
    //   newEmptyArray.splice(columnIndex, 1);
    //   setColumnArray(newEmptyArray);
    // }
    // const newColumnArray = columnArray.filter(
    //   (col) => col !== columnInputs[columnIndex]
    // );
    // setColumnArray(newColumnArray);
  };

  const inputChangeHandler = (event, columnIndex) => {
    const columnInputsCopy = [...columnInputs];
    const inputHasErrorArrayCopy = [...inputHasErrorArray];
    columnInputsCopy[columnIndex] = event.target.value;
    setColumnInputs(columnInputsCopy);
    inputHasErrorArrayCopy[columnIndex] =
      inputIsEmpty[columnIndex] && inputIsTouched[columnIndex];

    setInputHasErrorArray(inputHasErrorArrayCopy);
  };

  const boardNameInputHandler = (event) => {
    setBoardName(event.target.value);
  };

  const blurHandler = (columnIndex) => {
    const inputIsTouchedCopy = [...inputIsTouched];
    inputIsTouchedCopy[columnIndex] = true;
    setInputIsTouched(inputIsTouchedCopy);
  };

  const columnsInput = columnInputs.map((column, index) => {
    
    return (
      <div
        key={`column${index}`}
        className={`${classes.columns} ${
          inputHasErrorArray[index] ? classes.empty : ""
        }`}
      >
        <input
          type="text"
          value={column}
          onChange={(e) => inputChangeHandler(e, index)}
          onBlur={() => blurHandler(index)}
        />
        <svg
          width="15"
          height="15"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => removeColumnInputHandler(index)}
        >
          <g fill="#828FA3" fill-rule="evenodd">
            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
          </g>
        </svg>
      </div>
    );
  });

  const formSubmitHandler = () => {
    const isAllBlur = [];
    let i = 0;
    for (i; i<inputIsTouched.length; i++) {
      isAllBlur.push(true);
    }
    setInputIsTouched(isAllBlur);

    let columnsAreValid = true;

    for (const input of inputHasErrorArray) {
      columnsAreValid *= !input;
    }

    const formIsValid = columnsAreValid && boardName.trim().length > 0;

    if (formIsValid) {
        const updatedColumns = columnInputs.map((input, index) => {
            let tasks = [];
            if (wholeBoard.columns[index] && wholeBoard.columns[index].hasOwnProperty('tasks')) {
                tasks = wholeBoard.columns[index].tasks;
            }

            return {name: input, tasks: tasks}
        })

        const updatedBoard = {name: boardName, columns: updatedColumns}
        ctx.data.boards[boardIndex] = updatedBoard;
        ctx.deactivateOverlay();
        history.push(`?board=${boardName.trim().replace(' ', '-').toLowerCase()}`)
      };
    }

  return (
    <div className={`${classes.container} ${ctx.isDark ? classes.dark : ''}`}>
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

        {columnsInput}

        <Button isForm={true} color={ctx.isDark ? 'light' : 'grey'} onClick={addBoardHandler}>
          + Add New Column
        </Button>
      </div>

      <Button isForm={true} onClick={formSubmitHandler}>
        Save Changes
      </Button>
    </div>
  );
};

export default EditBoard;
