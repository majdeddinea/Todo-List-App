import React, { useState } from "react";
import axios from "axios";

function Updatetask(props) {
  const [task, setTask] = useState(props.task.todo);
  const updateTask = () => {
    if (task.trim() === "" || props.task.todo === task) {
      props.removePopup();
    } else {
      axios
        .put(`${process.env.REACT_APP_API_URL}/tasks/${props.task._id}`, {
          _id: props.task._id,
          todo: task,
          isComplete: props.task.isComplete,
        })
        .then((res) => {
          props.removePopup();
          props.updatetask(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim() === "" || props.task.todo === task) {
      props.removePopup();
    } else {
      axios
        .put(`${process.env.REACT_APP_API_URL}/tasks/${props.task._id}`, {
          _id: props.task._id,
          todo: task,
          isComplete: props.task.isComplete,
        })
        .then((res) => {
          props.removePopup();
          props.updatetask(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Update Task
          </h3>
          <form className="mt-2 px-6 py-4">
            <input
              type="text"
              className="mt-2 mb-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Update Task . . ."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={handleSubmit}
              >
                Update Task
              </button>
            </div>
          </form>
          <div className="items-center px-4 py-3">
            <button
              onClick={props.removePopup}
              className="px-4 py-2 bg-white text-blue-500 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Updatetask;
