import { ToastContainer } from "react-toastify";
import "./App.css";
import FooterComponent from "./components/shared/FooterComponent";
import NavbarComponent from "./components/shared/NavbarComponent";
import Router from "./router";

function App() {
  return (
    <>
      <NavbarComponent />
      <Router />
      <ToastContainer theme="dark" />
      <FooterComponent />
    </>
  );
}

export default App;
