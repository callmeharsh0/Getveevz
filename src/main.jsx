import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught React Error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px 24px", color: "#F1F5F9", background: "#050508", minHeight: "100vh", fontFamily: "sans-serif" }}>
          <h1 style={{ color: "#EF4444", fontSize: "24px", marginBottom: "16px" }}>⚠️ Rendering Error Detected</h1>
          <p style={{ color: "#F87171", fontSize: "16px", marginBottom: "20px" }}>{this.state.error?.toString()}</p>
          <pre style={{ background: "#111827", padding: "16px", borderRadius: "8px", overflowX: "auto", color: "#94A3B8", fontSize: "13px" }}>
            {this.state.errorInfo?.componentStack || this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: "20px", padding: "10px 20px", background: "#2563EB", color: "#FFFFFF", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);