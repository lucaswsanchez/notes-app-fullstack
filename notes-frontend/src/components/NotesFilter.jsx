import { useAppContext } from "../utils/AppProvider";
import "../styles/NotesFilter.css";

function NotesFilter({ setCategoryFilter }) {
  const { categories } = useAppContext();

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    console.log(categoryId);
    setCategoryFilter(categoryId);
  };

  return (
    <div className="notes-filter-container">
      <div className="category-filter">
        <span>Filter notes by category:</span>
        <select onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default NotesFilter;
