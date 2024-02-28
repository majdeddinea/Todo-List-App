import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

function Todolist(props) {
  const [sortedTasks, setSortedTasks] = useState([]);

  useEffect(() => {
    setSortedTasks([...props.todolist].sort((a, b) => a.order - b.order));
  }, [props.todolist]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sortedTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSortedTasks(items);

    const updates = items.map((item, index) => ({
      _id: item._id,
      order: index,
    }));

    axios
      .post(`${process.env.REACT_APP_API_URL}/tasks/reorder`, updates)
      .then((res) => {
        fetchTasks();
      })
      .catch((err) => console.log(err));
  };

  const fetchTasks = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((res) => {
        const sortedTasks = res.data.sort((a, b) => a.order - b.order);
        props.setTodolist(sortedTasks);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskComplete = (task) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/tasks/${task._id}`, {
        _id: task._id,
        todo: task.todo,
        isComplete: !task.isComplete,
      })
      .then((res) => props.taskComplete(res.data))
      .catch((err) => console.log(err));
  };
  const removeTask = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`)
      .then((res) => props.removeTask(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="my-4"
          >
            {sortedTasks.length > 0 ? (
              sortedTasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex flex-row items-center justify-between bg-white shadow rounded-lg p-4 mb-2"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={task.isComplete}
                          onChange={() => taskComplete(task)}
                          className="form-checkbox h-5 w-5 text-green-500 rounded border-gray-300 mr-2"
                        />
                        <span
                          className={`flex-1 text-gray-700 ${
                            task.isComplete ? "line-through" : ""
                          }`}
                        >
                          {task.todo}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            props.tasktoUpdate(task);
                            props.showPopup();
                          }}
                          className="p-2 rounded hover:bg-blue-100 mr-2"
                        >
                          <svg
                            className="h-6 w-6 text-blue-500"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M15.232 5.232l3.535 3.535-12.5 12.5H2.5v-3.535l12.5-12.5zM2.5 20.5h19.5v2H2.5v-2z"></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => removeTask(task._id)}
                          className="p-2 rounded hover:bg-red-100"
                        >
                          <svg
                            className="h-6 w-6 text-red-500"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div class="text-center p-6">
                <div class="p-4 md:p-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 class="text-lg font-semibold text-gray-900 mt-2">
                    Looks like you're all caught up!
                  </h3>
                  <p class="text-gray-600">Ready to plan your next task?</p>
                </div>
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Todolist;
