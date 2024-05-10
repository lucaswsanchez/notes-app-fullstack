import axios from "axios";

const API_BASE_URL = "https://notes-app-fullstack-p9df.onrender.com";

const apiService = {
  getAllNotes: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notes`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all notes:", error);
      throw error;
    }
  },

  findNoteById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching note with ID ${id}:`, error);
      throw error;
    }
  },

  findNotesByCategory: async (categoryId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/notes/categories/${categoryId}`
      );
      return response.data;
    } catch (message) {
      return [];
    }
  },

  createNote: async (noteData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/notes`, noteData);
      return response.data;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  },

  updateNote: async (id, noteData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/notes/${id}`, noteData);
      return response.data;
    } catch (error) {
      console.error(`Error updating note with ID ${id}:`, error);
      throw error;
    }
  },

  deleteNote: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/notes/${id}`);
    } catch (error) {
      console.error(`Error deleting note with ID ${id}:`, error);
      throw error;
    }
  },

  getAllCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all categories:", error);
      throw error;
    }
  },

  findOneCategory: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
      throw error;
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/categories`,
        categoryData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/categories/${id}`);
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
      throw error;
    }
  },
};

export default apiService;
