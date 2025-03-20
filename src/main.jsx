import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App.jsx';
import "../node_modules/@fortawesome/fontawesome-free";

// Disable console in production
if (import.meta.env.PROD) {
  window.console.log = () => {};
  window.console.warn = () => {};
  window.console.error = () => {};
  window.console.info = () => {};
  window.console.debug = () => {};
}

// Prevent opening DevTools
document.addEventListener("keydown", function (event) {
  if (
    event.key === "F12" ||
    (event.ctrlKey && event.shiftKey && event.key === "I") ||
    (event.ctrlKey && event.shiftKey && event.key === "J") ||
    (event.ctrlKey && event.key === "U")
  ) {
    event.preventDefault();
  }
});

// Disable right-click
// document.addEventListener("contextmenu", (event) => event.preventDefault());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
