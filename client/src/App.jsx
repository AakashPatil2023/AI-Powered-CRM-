import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Navbar from "./Nav/Navbar";
import Home from "./Home/Home";
import TaskIndex from "./Tasks/Task.index";
import ProjectIndex from "./Projects/Project.index";
import ContactIndex from "./Contacts/Contact.index";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tasks" element={<TaskIndex />} />
                <Route path="/projects" element={<ProjectIndex />} />
                <Route path="/contacts" element={<ContactIndex />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;