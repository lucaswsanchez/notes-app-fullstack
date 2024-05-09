import { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppProvider";
import "../styles/CategoryManager.css";
import "../styles/Modal.css";
import { toast } from "react-toastify";
import { toastConfig } from "../App";

function CategoryManager() {
  const { categories, fetchCategories, createCategory, deleteCategory } =
    useAppContext();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      fetchCategories()
        .then(() => setLoaded(true))
        .catch((error) => {
          console.error("Error fetching categories:", error);
          toast.error("Error fetching categories", toastConfig);
        });
    }
  }, [fetchCategories, loaded]);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName) {
      toast.error("Please enter a category name...", toastConfig);
      console.error("Please enter a category name...");
      return;
    }

    setLoading(true);

    try {
      await createCategory({ name: newCategoryName });
      setNewCategoryName("");
    } catch (error) {
      toast.error("Error creating category...", toastConfig);
      console.error("Error creating category");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
    } catch (error) {
      toast.error("Error deleting category", toastConfig);
      console.error("Error deleting category");
    }
  };

  return (
    <div className="category-container">
      <button onClick={() => setShowModal(true)}>
        <span>Categories</span>
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <form onSubmit={handleCreateCategory}>
              <input
                type="text"
                id="categoryName"
                placeholder="New category"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create category"}
              </button>
            </form>
            <div>
              <h3>Available categories:</h3>
              <ul>
                {categories.map((category) => (
                  <li key={category.id}>
                    {category.name}
                    <button onClick={() => handleDeleteCategory(category.id)}>
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryManager;
