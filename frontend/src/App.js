import "./App.css";
import { Routes, Route } from "react-router-dom";

/*=================Components======================= */
import NavBar from "./components/navbar/navbar";
import Login from "./components/login/login";
import SignUp from "./components/singup/signup";

function App() {
  return (
    <div className="App">
      <h1>Start project 6</h1>
      <NavBar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/singUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
