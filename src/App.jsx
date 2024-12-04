
import './App.css'
import React, { useState } from "react";
import axios from "axios";

const App = () => {
    const [formData, setFormData] = useState({field1: "",field2: ""});
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:5000/add-to-sheet", formData);
        alert("Data added to Google Sheets successfully!");
        console.log(res.data);
      } catch (error) {
        console.error("Error adding data to Google Sheets:", error);
        alert("Failed to add data to Google Sheets.");
      }
    };

  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label>Field 1:</label>
        <input type="text" name="field1" value={formData.field1} onChange={handleChange} required />
        <label>Field 2:</label>
        <input type="text" name="field2" value={formData.field2} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
    )
  
}

export default App