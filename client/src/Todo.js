import { useRef, useState } from "react";
import axios from "axios";

export default function Todo({ todo, setTodos }) {
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const title = useRef(todo.title || "");

  return (
    <>
      <div
        className={`d-flex align-items-center justify-content-between mb-2 gap-2 border rounded bg-white py-2 px-3 my-2${
          updating ? " disabled" : ""
        }`}
      >
        <div className="d-flex align-items-center w-100">
          <input
            type="checkbox"
            className="form-check-input me-4 mt-0"
            defaultChecked={todo.completed}
            onChange={async () => {
              try {
                setUpdating(true);

                await axios.put("/", { ...todo, completed: !todo.completed });

                todo.completed = !todo.completed;
                setTodos((prev) => [...prev]);
              } catch (err) {
                console.log(err);
              } finally {
                setUpdating(false);
              }
            }}
          />
          {edit ? (
            <input
              className="form-control"
              onChange={(e) => {
                setError(null);
                title.current = e.target.value;
              }}
              defaultValue={todo.title}
            />
          ) : (
            <span
              className={`fw-medium${
                todo.completed ? " text-decoration-line-through" : ""
              }`}
            >
              {todo.title}
            </span>
          )}
        </div>
        <div className="d-flex">
          <button
            onClick={async () => {
              if (edit) {
                const newTitle = title.current.trim();

                if (!newTitle) {
                  return setError("Title can't be empty");
                }

                try {
                  setUpdating(true);

                  await axios.put("/", { ...todo, title: newTitle });

                  todo.title = newTitle;
                } catch (err) {
                  console.log(err);
                } finally {
                  setUpdating(false);
                }
              }

              setEdit((prev) => !prev);
            }}
            className={`btn btn-${edit ? "success" : "warning"} me-2`}
          >
            {edit ? "Accept" : "Edit"}
          </button>
          <button
            className="btn btn-danger"
            onClick={async () => {
              try {
                setUpdating(true);

                await axios.delete(`/${todo.id}`);

                setTodos((prev) => prev.filter(({ id }) => id !== todo.id));
              } catch (err) {
                console.log(err);
              } finally {
                setUpdating(false);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {error && <div className="text-danger my-1">{error}</div>}
    </>
  );
}
