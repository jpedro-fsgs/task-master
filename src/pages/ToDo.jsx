import { useEffect, useRef, useState } from "react";
import { BsChevronUp, BsChevronDown, BsX, BsPlus } from "react-icons/bs"
import "./ToDo.scss";

function ToDo() {

  const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem("taskList")) || ["Inserir Tarefa"]);
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask === "") return;
    setTaskList(t => [newTask, ...t]);
    setNewTask("");
    inputRef.current.value = "";
  }

  function handleEnter(event) {
    if (event.keyCode === 13) {
      addTask();
    }
  }

  function deleteTask(index) {
    const updatedTasks = taskList.filter((_, i) => index !== i);
    setTaskList(updatedTasks);
  }

  function upTask(index) {
    if (index < 1) return;
    const updatedTasks = [...taskList];
    [updatedTasks[index], updatedTasks[index - 1]] = [
      updatedTasks[index - 1],
      updatedTasks[index],
    ];
    setTaskList(updatedTasks);
  }

  function downTask(index) {
    if (index >= taskList.length - 1) return;
    const updatedTasks = [...taskList];
    [updatedTasks[index], updatedTasks[index + 1]] = [
      updatedTasks[index + 1],
      updatedTasks[index],
    ];
    setTaskList(updatedTasks);
  }

  return (
    <>
      <div className="container">
        <h1>Lista de Tarefas</h1>
        <div className="taskCard">
          {/* <strong contentEditable="true">{newTask}</strong> */}
          <input
          className="todo-input"
          id="task-input"
          type="text"
          ref={inputRef}
          onChange={handleInputChange}
          onKeyDown={handleEnter}
          placeholder="Insira uma tarefa"
        />
          <button type="button" className="todo-btn" onClick={addTask}>{<BsPlus size={40}/>}</button>
        </div>
        <div className="tasks-div">
        {taskList.map((task, index) => (
          <div className="taskCard" key={index}>
            <strong>{task}</strong>
            <span>
              <button className="todo-btn" onClick={() => upTask(index)}>{<BsChevronUp size={30} />}</button>
              <button className="todo-btn" onClick={() => downTask(index)}>{<BsChevronDown size={30} />}</button>
              <button className="todo-btn" onClick={() => deleteTask(index)}>{<BsX size={40} />}</button>
            </span>
          </div>
        ))}</div>
      </div>
    </>
  );
}

export default ToDo;
