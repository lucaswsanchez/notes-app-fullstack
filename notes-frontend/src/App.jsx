import Notes from "./components/Notes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";

export const toastConfig = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "colored",
};

function App() {
  return (
    <div className="app-container">
      <Notes />
      <ToastContainer />
    </div>
  );
}

export default App;
