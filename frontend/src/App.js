import "./App.css";
import { Routes, Route } from "react-router-dom";

/*=================Components======================= */
import NavBar from "./components/navbar/navbar";
import Login from "./components/login/login";
import SignUp from "./components/singup/signup";
import MainPage from "./components/mainpage/mainPage";
import VideoDetails from "./components/videoDetails/videoDetails";
import AddVideo from "./components/addVideo/addVideo";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singUp" element={<SignUp />} />
        <Route path="/watch/:id" element={<VideoDetails />} />
        <Route path="/add" element={<AddVideo />} />
      </Routes>
    </div>
  );
}

export default App;
