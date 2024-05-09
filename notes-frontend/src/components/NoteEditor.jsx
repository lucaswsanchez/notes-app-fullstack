import { useState, useEffect } from "react";
import { useAppContext } from "../utils/AppProvider";
import "../styles/NoteCreator.css";
import "../styles/Modal.css";
import { toast } from "react-toastify";
import { toastConfig } from "../App";

function NoteEditor({ setShowModal, noteId }) {
  const { categories, findNoteById, updateNote } = useAppContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const note = await findNoteById(noteId);
        setTitle(note.title);
        setContent(note.content);
        setSelectedCategory(note.category.id);
      } catch (error) {
        console.error("Error fetching note details:", error);
      }
    };

    fetchData();
  }, [noteId]);

  const handleEditNote = async (e) => {
    e.preventDefault();
    if (!title || !content || selectedCategory === "") {
      toast.error("Please fill all fields...", toastConfig);
      console.error("Please fill all fields...");
      return;
    } else {
      setLoading(true);

      try {
        await updateNote(noteId, {
          title,
          content,
          categoryId: selectedCategory,
        });
        toast.success("Note succesfully edited...", toastConfig);
        setShowModal(false);
      } catch (error) {
        toast.error("Error updating note...", toastConfig);
        console.error("Error updating note...");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="note-manager-container">
      <div className="modal">
        <div className="modal-content">
          <h2>Edit note</h2>
          <span className="close" onClick={() => setShowModal(false)}>
            &times;
          </span>
          <form onSubmit={handleEditNote}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select new category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button type="submit">
              {loading ? "Saving..." : "Save changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NoteEditor;
