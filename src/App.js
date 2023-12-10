import React, { useState } from "react";
import Home from "./pages/Home";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;

      // Add additional cases for different pages
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <h1>Local Library</h1>
      <nav>
        <button onClick={() => setCurrentPage("home")}>Home</button>
        {/* Add additional buttons for different pages */}
      </nav>
      {renderPage()}
    </div>
  );
}

export default App;
