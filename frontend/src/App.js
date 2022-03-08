import "./App.css";
import { Routes, Route } from "react-router-dom";

/*=================Components======================= */
import NavBar from "./components/navbar/navbar";
import Login from "./components/login/login";

function App() {
  return (
    <div className="App">
      <h1>Start project 6</h1>
      <NavBar/>
      <Routes>
        <Route path="/login" element={<Login />} />7
      </Routes>
    </div>
  );
}

export default App;
