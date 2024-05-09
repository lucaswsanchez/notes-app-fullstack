import { useState } from "react";
import { useAppContext } from "../utils/AppProvider";
import "../styles/NoteCreator.css";
import "../styles/Modal.css";
import { MdAddBox } from "react-icons/md";
import { toast } from "react-toastify";
import { toastConfig } from "../App";

function NoteCreator() {
  const { categories, addNote } = useAppContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!title || !content || !selectedCategory) {
      toast.error("Please fill all fields...", toastConfig);
      console.error("Please fill all fields...");
      return;
    }

    setLoading(true);

    try {
      await addNote({
        title,
        content,
        categoryId: selectedCategory,
      });
      setTitle("");
      setContent("");
      setSelectedCategory("");
      setShowModal(false);
    } catch (error) {
      toast.error("Error creating note...", toastConfig);
      console.error("Error creating note...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="note-manager-container">
      <MdAddBox
        size={38}
        color="#324f54"
        cursor="pointer"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create note</h2>
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <form onSubmit={handleCreateNote}>
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
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button type="submit">
                {loading ? "Creating..." : "Create note"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteCreator;
