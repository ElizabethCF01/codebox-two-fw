import { ToastContainer } from "react-toastify";
import "./App.css";
import Router from "./router";
import NavbarComponent from "./components/shared/NavbarComponent";
import FooterComponent from "./components/shared/FooterComponent";

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
