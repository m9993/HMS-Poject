import { ToastContainer } from "react-toastify";
import User from "./components/user/User";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <div className="container mt-5">
      <User />
    </div>
    <ToastContainer />
    </>
  );
}

export default App;
