import { Routes, Route } from "react-router";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import EditorView from "../views/EditorView";

const Router: React.FC = () =>{return (

    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<LoginView />} />
      <Route path="/editor" element={<EditorView />} />
      <Route path="/preview/:id" element={<EditorView />} />
    </Routes>
)}
export default Router;