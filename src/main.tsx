import React from "react";
import ReactDOM from "react-dom/client";
import Portfolio from "./portfolio";
import "./index.css";

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return <div style={{ color: "white", padding: "2rem", fontFamily: "sans-serif" }}>Ошибка загрузки. Обновите страницу.</div>;
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Portfolio />
    </ErrorBoundary>
  </React.StrictMode>
);   
