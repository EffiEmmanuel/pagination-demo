import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Task1 from "./components/Task1";
import Task2 from "./components/Task2";
import Homepage from "./components/Homepage";
import NotFound from "./components/NotFound";
import AboutUs from "./components/About/AboutUs";
import AboutMe from "./components/About/AboutMe";
import RepoDetailPage from "./components/Github/RepoDetailPage";

function App() {
  return (
    <div className="App">
      <header className="">
        <Navbar />

        <Routes>
          <Route index path="/" element={<Homepage />} />
          {/* <Route path="about/*" element={<About />} /> */}
          <Route path="about" element={<About />}>
            <Route path="about-us" element={<AboutUs />} />
            <Route path="about-me" element={<AboutMe />} />
          </Route>
          <Route path="users" element={<Task1 />} />
          <Route path="github" element={<Task2 />} />
          <Route path="repositories/*" element={<RepoDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
