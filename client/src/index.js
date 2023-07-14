// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { AuthContextProvider } from "./context/AuthContext";

// ReactDOM.render(
//   <React.StrictMode>
//     <AuthContextProvider>
//       <App />
//     </AuthContextProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from "react";
import { createRoot } from "react-dom/client";
// import { createRoot } from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

const root = document.getElementById("root");
createRoot(root).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
