import { memo, useState } from "react";
import { uid } from "uid";
import axios from "axios";

export default memo(function InputForm({ setTodos, todos }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  return (
    <>
      <div className={`input-group${uploading || !todos ? " disabled" : ""}`}>
        <input
          onChange={(e) => {
            setError(null);
            setTitle(e.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Todo title"
          value={title}
        />
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={async () => {
            const newTitle = title.trim();

            if (!newTitle) {
              setError("Title can't be empty");
            } else {
              const newTodo = {
                id: uid(),
                title: newTitle,
                completed: false,
                createdAt: new Date(),
              };

              try {
                setUploading(true);
                const response = await axios.post("/", newTodo);

                setTodos((prev) => [response, ...prev]);
                setTitle("");
              } catch (err) {
                console.log(err);
              } finally {
                setUploading(false);
              }
            }
          }}
        >
          + Add
        </button>
      </div>
      {error && <span className="text-danger">{error}</span>}
    </>
  );
});
