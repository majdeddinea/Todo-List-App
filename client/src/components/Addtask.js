import React, { useState } from "react";
import axios from "axios";

function Addtask(props) {
  const [task, Settask] = useState("");
  const addtask = () => {
    if (task.trim() === "") {
      return;
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/tasks`, {
          todo: task,
          isComplete: false,
        })
        .then((res) => {
          Settask("");
          props.addTask(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim() === "") {
      return;
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/tasks`, {
          todo: task,
          isComplete: false,
        })
        .then((res) => {
          Settask("");
          props.addTask(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-md">
        <form
          data-testid="task-form"
          className="flex space-x-3"
          onSubmit={handleSubmit}
        >
          <input
            className="flex-1 appearance-none border border-gray-200 rounded py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text"
            placeholder="Enter a task . . ."
            value={task}
            onChange={(event) => Settask(event.target.value)}
          />
          <button
            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addtask;
