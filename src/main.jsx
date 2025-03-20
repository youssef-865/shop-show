import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App.jsx';
import "@fortawesome/fontawesome-free/css/all.min.css"; // ✅ المسار الصحيح

if (import.meta.env.PROD) {
  window.console.log = () => {};
  window.console.warn = () => {};
  window.console.error = () => {};
  window.console.info = () => {};
  window.console.debug = () => {};
}

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

// document.addEventListener("contextmenu", (event) => event.preventDefault());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
