import { useState, useEffect } from "react";
import { useAppContext } from "../utils/AppProvider";
//Components
import NoteCreator from "./NoteCreator";
import NoteEditor from "./NoteEditor";
import NotesFilter from "./NotesFilter";
import CategoryManager from "./CategoryManager";
//Styles
import "../styles/Notes.css";
//Icons
import { IoCloseSharp } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { TfiFaceSad } from "react-icons/tfi";
//Toast
import { toast } from "react-toastify";
import { toastConfig } from "../App";

function Notes() {
  const { notes, fetchNotes, deleteNote, findNotesByCategory } =
    useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loaded) {
      fetchNotes()
        .then(() => setLoaded(true))
        .catch((error) => {
          console.error("Error fetching notes:", error);
          toast.error("Error fetching notes", toastConfig);
        });
    }
  }, [fetchNotes, loaded]);

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
    } catch (error) {
      console.error("Error deleting note");
      toast.error("Error deleting note", toastConfig);
    }
  };

  const handleEditNote = (id) => {
    setSelectedNoteId(id);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchFilteredNotes = async () => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      let filteredByCategory;

      if (categoryFilter === "") {
        filteredByCategory = notes;
      } else {
        try {
          filteredByCategory = await findNotesByCategory(categoryFilter);
        } catch (error) {
          console.error("Error fetching notes by category:", error);
          setIsLoading(false);
          return;
        }
      }

      setFilteredNotes(filteredByCategory || []);
      setIsLoading(false);
    };

    fetchFilteredNotes();
  }, [notes, categoryFilter, findNotesByCategory]);

  return (
    <div className="notes-container">
      <header>
        <h1>My Notes</h1>
        <div className="notes-categories">
          <CategoryManager />
        </div>
      </header>
      <main>
        <NotesFilter setCategoryFilter={setCategoryFilter} />
        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div className="note" key={note.id}>
              <span className="note-title">{note.title}</span>
              <span className="note-content">{note.content}</span>
              <span className="note-category">
                Categoria: {note.category.name}
              </span>
              <button onClick={() => handleDeleteNote(note.id)}>
                <IoCloseSharp color="#fefffa" size={16} />
              </button>
              <button onClick={() => handleEditNote(note.id)}>
                <SlOptions
                  color="#fefffa"
                  size={16}
                  onClick={() => setShowModal(true)}
                />
              </button>
            </div>
          ))
        ) : (
          <h1>
            No notes found...
            <TfiFaceSad />
          </h1>
        )}
      </main>
      <footer>
        <NoteCreator />
      </footer>
      {showModal && (
        <NoteEditor noteId={selectedNoteId} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export default Notes;
