import classes from "./AddNewBoard.module.css";
import Button from "../../ui/Button";
import { useState, useContext } from "react";
import AppContext from "../../../context/context-api";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const EditBoard = () => {
  const history = useHistory();
  const ctx = useContext(AppContext);
  const boards = ctx.data;
  const [wholeBoard] = boards.filter(
    (board) => board.id === ctx.currentBoardId
  );

  const boardIndex = boards.findIndex(
    (board) => board.id === ctx.currentBoardId
  );

  let initialColumnArray = [];
  let initialColumnInputs = [];
  let initialColumnsIsTouched = [];
  let initialInputHasErrorArray = [];
  let initialInputIsEmpty = [];
  if (wholeBoard && wholeBoard.hasOwnProperty("columns")) {
    for (const column in wholeBoard.columns) {
      initialColumnArray.push(+column + 1);
      initialColumnInputs.push({
        id: wholeBoard.columns[column].id,
        name: wholeBoard.columns[column].name,
      });
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
  const [requestSuccessful, setrequestSuccessful] = useState(true);

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
    const array = columnInputs.map((column, index) => {
      return column.name.trim().length > 0 ? false : true;
    });
    setInputIsEmpty(array);
  }, [columnInputs]);

  useEffect(() => {
    const array = columnInputs.map((column, index) => {
      return inputIsTouched[index] && inputIsEmpty[index];
    });

    setInputHasErrorArray(array);
  }, [columnInputs, inputIsTouched, inputIsEmpty]);

  let nextElement = columnArray[columnArray.length - 1] + 1;
  nextElement = !nextElement ? 1 : nextElement;

  const addBoardHandler = () => {
    setColumnArray((prev) => [...prev, nextElement]);
    setColumnInputs((prev) => [...prev, { id: null, name: "" }]);
    setInputIsEmpty((prev) => [...prev, true]);
    setInputIsTouched((prev) => [...prev, false]);
    setInputHasErrorArray((prev) => [...prev, false]);
  };

  const removeColumnInputHandler = async (columnIndex) => {
    const columnId = columnInputs[columnIndex].id;

    const removeColumn = () => {
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
    };

    if (columnId) {
      const deleteColumnRequest = await ctx.otherRequest(
        `columns/${columnId}`,
        "DELETE"
      );

      if (deleteColumnRequest.status === 202) {
        removeColumn();
      }
    } else {
      removeColumn();
    }

    // // const columnIsEmpty = emptyInputs.includes(+columnIndex);
    // // if (columnIsEmpty) {
    // //   const newEmptyArray = [...emptyInputs];
    // //   newEmptyArray.splice(columnIndex, 1);
    // //   setColumnArray(newEmptyArray);
    // // }
    // // const newColumnArray = columnArray.filter(
    // //   (col) => col !== columnInputs[columnIndex]
    // // );
    // // setColumnArray(newColumnArray);
  };

  const inputChangeHandler = (event, columnIndex) => {
    const columnInputsCopy = [...columnInputs];
    const inputHasErrorArrayCopy = [...inputHasErrorArray];
    const changedColumnElement = columnInputsCopy[columnIndex];
    changedColumnElement.name = event.target.value;
    columnInputsCopy[columnIndex] = changedColumnElement;
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
          value={column.name}
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

  const formSubmitHandler = async () => {
    const isAllBlur = [];
    let i = 0;
    for (i; i < inputIsTouched.length; i++) {
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
        if (
          wholeBoard.columns[index] &&
          wholeBoard.columns[index].hasOwnProperty("tasks")
        ) {
          tasks = wholeBoard.columns[index].tasks;
        }

        return { ...input, tasks: tasks };
      });

      if (boardName !== wholeBoard.name) {
        const updateBoardRequest = await ctx.otherRequest(
          `board/${wholeBoard.id}`,
          "PUT",
          { name: boardName }
        );

        if (updateBoardRequest !== 200) {
          setrequestSuccessful(false);
        }
      }

      for (const [index, column] of columnInputs.entries()) {
        if (column.id) {
          const originalColumn = wholeBoard.columns.find(
            (prev) => prev.id === column.id
          );
          if (column.name !== originalColumn.name) {
            const updateColumnRequest = await ctx.otherRequest(
              `columns/${column.id}`,
              "PUT",
              { name: column.name }
            );

            if (updateColumnRequest !== 200) {
              setrequestSuccessful(false);
            }
          }
        } else {
          const storeColumnRequest = await ctx.otherRequest(
            `boards/${wholeBoard.id}/columns`,
            "POST",
            { name: column.name }
          );
          if (storeColumnRequest.status === 201) {
            const columnId = storeColumnRequest.data.data.id;
            const newColumn = { id: columnId, name: column.name, tasks: [] };
            updatedColumns[index] = newColumn;
          } else {
            setrequestSuccessful(false);
          }
        }
      }

      if (requestSuccessful) {
        const updatedBoard = {
          id: wholeBoard.id,
          name: boardName,
          columns: updatedColumns,
        };
        boards[boardIndex] = updatedBoard;
        ctx.setData(boards);
        ctx.deactivateOverlay();
        history.push(`?board=${ctx.currentBoardId}`);
      }
    }
  };

  return (
    <div className={`${classes.container} ${ctx.isDark ? classes.dark : ""}`}>
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

        <Button
          isForm={true}
          color={ctx.isDark ? "light" : "grey"}
          onClick={addBoardHandler}
        >
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
