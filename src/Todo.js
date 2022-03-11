//import React from "react";
import React, { useState, useEffect } from "react";
//LOCAL  STORAGE USES
const getLocal = () => {
  let li = localStorage.getItem("list");
  console.log(li);
  if (li) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [Item, setItem] = useState([]);
  const [ToggleSubmit, setTogleSubmit] = useState(true);
  const [Isedit, setIsedit] = useState(null);
  const addItem = () => {
    if (inputData === "") {
      alert("Please Enter Something");
    } else if (inputData && !ToggleSubmit) {
      setItem(
        Item.map((elem) => {
          if (elem.idx === Isedit) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      // setTogleSubmit = true;
    } else {
      // console.log(inputData);
      const allInputData = {
        idx: new Date().getTime().toString(),
        name: inputData,
      };
      setItem([...Item, allInputData]);
    }
    setTogleSubmit(true);
    setInputData("");
    setIsedit(null);
  };
  const deleteTask = (index) => {
    const updateItem = Item.filter((item) => {
      return item.idx !== index;
    });
    setItem(updateItem);
  };
  const RemoveAll = () => {
    setItem([]);
  };
  const Update = (id) => {
    console.log("update");
    const updateItem = Item.find((item) => {
      return item.idx === id;
    });
    setTogleSubmit(false);
    setInputData(updateItem.name);
    setIsedit(id);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(Item.idx));
  }, [Item]);
  return (
    <div className="App">
      <div className="heading">TODO</div>
      <div className="todo-list">
        <div className="todo">
          <textarea
            type="text"
            className="inp"
            rows={6}
            cols={80}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          ></textarea>
          {ToggleSubmit ? (
            <button className="sub-btn" onClick={addItem}>
              Submit
            </button>
          ) : (
            <button className="sub-btn" onClick={addItem}>
              Update
            </button>
          )}
        </div>
        <div className="container">
          <ul className="box">
            <p>Your TODO</p>
            {Item.map((item) => {
              return (
                <div className="tasks" key={item.idx}>
                  <li>{item.name}</li>

                  <button
                    className="changebtn"
                    onClick={() => deleteTask(item.idx)}
                  >
                    Delete
                  </button>
                  <button
                    className="changebtn"
                    onClick={() => {
                      Update(item.idx);
                    }}
                  >
                    Update
                  </button>
                </div>
              );
            })}
          </ul>
        </div>
      </div>

      <button className="finish" onClick={() => RemoveAll()}>
        Remove all
      </button>
    </div>
  );
};

export default Todo;
