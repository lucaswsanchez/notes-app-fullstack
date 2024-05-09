import { createContext, useState, useContext } from "react";
import apiService from "./apiService";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await apiService.getAllNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await apiService.getAllCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const addNote = async (newNote) => {
    try {
      const createdNote = await apiService.createNote(newNote);
      setNotes([...notes, createdNote]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const findNoteById = async (id) => {
    try {
      return await apiService.findNoteById(id);
    } catch (error) {
      console.error(`Error fetching note with ID ${id}:`, error);
    }
  };

  const findNotesByCategory = async (categoryId) => {
    return await apiService.findNotesByCategory(categoryId);
  };

  const updateNote = async (id, updatedNote) => {
    try {
      const updated = await apiService.updateNote(id, updatedNote);
      setNotes(notes.map((note) => (note.id === id ? updated : note)));
      return updated;
    } catch (error) {
      console.error(`Error updating note with ID ${id}:`, error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await apiService.deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error(`Error deleting note with ID ${id}:`, error);
    }
  };

  const findOneCategory = async (id) => {
    try {
      return await apiService.findOneCategory(id);
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
    }
  };

  const createCategory = async (newCategory) => {
    try {
      const createdCategory = await apiService.createCategory(newCategory);
      setCategories([...categories, createdCategory]);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await apiService.deleteCategory(id);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        notes,
        categories,
        fetchNotes,
        fetchCategories,
        addNote,
        findNoteById,
        findNotesByCategory,
        updateNote,
        deleteNote,
        findOneCategory,
        createCategory,
        deleteCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
