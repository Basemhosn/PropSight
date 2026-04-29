import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import "./styles/theme.css";
import App from "./App";

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{padding:40,fontFamily:"monospace",color:"#A32D2D",background:"#fff",minHeight:"100vh"}}>
          <h2>App crashed</h2>
          <pre style={{whiteSpace:"pre-wrap",fontSize:13}}>{this.state.error.toString()}</pre>
          <pre style={{whiteSpace:"pre-wrap",fontSize:11,color:"#666"}}>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// Initialize theme from localStorage before render
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ErrorBoundary>
);
