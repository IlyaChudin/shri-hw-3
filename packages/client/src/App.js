import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [settings, setSettings] = useState("");
  useEffect(() => {
    axios
      .get("/api/settings")
      .then(res => setSettings(JSON.stringify(res.data, null, 2)))
      .catch(err => setSettings(err.message));
  });
  return (
    <div>
      <h1>Settings!</h1>
      <pre>{settings}</pre>
    </div>
  );
}

export default App;
