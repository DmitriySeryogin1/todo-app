import { useEffect, useState } from "react";
import InputForm from "./InputForm";
import Todo from "./Todo";
import ProgressBar from "./ProgressBar";
import axios from "axios";

export default function App() {
  const [todos, setTodos] = useState(null);

  const totalAmount = todos?.length;

  useEffect(() => {
    axios.get('/').then(setTodos).catch(console.log)
  }, [])

  return (
    <div className="container bg-primary-subtle rounded p-2">
      <div className="h1 text-center w-100">Todo App</div>
      <InputForm setTodos={setTodos} todos={todos}/>
      {totalAmount > 0 && (
        <>
          <ProgressBar todos={todos} />
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} setTodos={setTodos} />
          ))}
        </>
      )}
    </div>
  );
}
