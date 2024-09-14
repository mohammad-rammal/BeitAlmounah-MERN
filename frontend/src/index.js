import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import BookStoreProvider from "./context/BookStoreProvider";
import { Provider } from "react-redux";
import store from "./redux/store";
import { LanguageProvider } from "./translate/LanguageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BookStoreProvider>
      <LanguageProvider>


        <Provider store={store}>
          
          <App />

        </Provider>
        </LanguageProvider>
    </BookStoreProvider>
  </React.StrictMode>
);
