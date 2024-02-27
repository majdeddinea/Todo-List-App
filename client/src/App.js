import React, { useState, useEffect } from "react";
import axios from "axios";
import Addtask from "./components/Addtask";
import Todolist from "./components/Todolist";
import Updatetask from "./components/Updatetask";
import Header from "./components/Header";

function App() {
  const [todolist, setTodolist] = useState([]);
  const [tasktoUpdate, setTasktoUpdate] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((res) => {
        setTodolist(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addTask = (newTask) => {
    setTodolist([...todolist, newTask]);
  };

  const taskComplete = (task) => {
    const newList = [...todolist];
    newList.forEach((item) => {
      if (item._id === task._id) {
        item.isComplete = task.isComplete;
      }
    });
    setTodolist(newList);
  };

  const removeTask = (task) => {
    const newList = todolist.filter((item) => !(item._id === task._id));
    setTodolist(newList);
  };
  const updatetask = (task) => {
    const newList = [...todolist];
    newList.forEach((item) => {
      if (item._id === task._id) {
        item.todo = task.todo;
      }
    });
    setTodolist(newList);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="flex justify-center">
        <div className="w-full max-w-lg px-4">
          <div className="mt-8">
            <label
              htmlFor="taskInput"
              className="block text-lg font-semibold mb-2"
            >
              Enter a task
            </label>
            <Addtask addTask={addTask} />
          </div>
          <hr className="my-6 border-gray-300" />
          <h2 className="text-xl font-bold my-4">Todos</h2>
          <Todolist
            todolist={todolist}
            setTodolist={setTodolist}
            taskComplete={taskComplete}
            removeTask={removeTask}
            tasktoUpdate={(task) => setTasktoUpdate(task)}
            showPopup={() => setShowPopup(!showPopup)}
          />
        </div>
      </div>
      {showPopup && (
        <Updatetask
          task={tasktoUpdate}
          updatetask={updatetask}
          removePopup={() => setShowPopup(!showPopup)}
        />
      )}
    </div>
  );
}

export default App;
