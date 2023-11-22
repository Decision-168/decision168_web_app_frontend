import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import GlobalThemeProvider from "./theme/GlobalThemeProvider";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <GlobalThemeProvider>
    <Provider store={store}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <App />
    </Provider>
  </GlobalThemeProvider>
  // </React.StrictMode>
);
