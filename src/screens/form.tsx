import React, { useState } from "react";
import "./UserForm.css"; // Import the CSS file

const UserForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    vardasPavarde: "",
    kuopa: "104",
    kariuSkaicius: "",
    vegetaruPorcijos: "",
    pastabos: "",
  });

  // State to handle success message
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Function to handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch(`https://tonchi-backend-56d1c8d21716.herokuapp.com/api/pratybos/submit-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form successfully submitted");
        // Show success message and reset form data
        setFormSubmitted(true);
        setErrorMessage("");
        setFormData({
          vardasPavarde: "",
          kuopa: "104",
          kariuSkaicius: "",
          vegetaruPorcijos: "",
          pastabos: "",
        });
      } else {
        console.error("Error submitting form");
        setErrorMessage("An error occurred while submitting the form.");
        setFormSubmitted(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred.");
      setFormSubmitted(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Pratybų dalyvio registracija</h2>

      {/* Display success message */}
      {formSubmitted && (
        <p className="success-message">Ačiū už registraciją!</p>
      )}

      {/* Display error message if any */}
      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="user-form">
        {/* L. Vardas, pavardė */}
        <div className="form-group">
          <label htmlFor="vardasPavarde">L. Vardas, pavardė:</label>
          <input
            type="text"
            id="vardasPavarde"
            name="vardasPavarde"
            value={formData.vardasPavarde}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Kuopa */}
        <div className="form-group">
          <label htmlFor="kuopa">Kuopa:</label>
          <select id="kuopa" name="kuopa" value={formData.kuopa} onChange={handleChange} required className="form-select">
            <option value="104">104</option>
            <option value="105">105</option>
            <option value="106">106</option>
            <option value="108">108</option>
            <option value="110">110</option>
          </select>
        </div>

        {/* Karių skaičius */}
        <div className="form-group">
          <label htmlFor="kariuSkaicius">Karių skaičius:</label>
          <input
            type="number"
            id="kariuSkaicius"
            name="kariuSkaicius"
            value={formData.kariuSkaicius}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Vegetariškos porcijos */}
        <div className="form-group">
          <label htmlFor="vegetaruPorcijos">Vegetariškos porcijos (prašome įrašyti skaičių):</label>
          <input
            type="number"
            id="vegetaruPorcijos"
            name="vegetaruPorcijos"
            value={formData.vegetaruPorcijos}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Pastabos */}
        <div className="form-group">
          <label htmlFor="pastabos">Pastabos:</label>
          <textarea
            id="pastabos"
            name="pastabos"
            value={formData.pastabos}
            onChange={handleChange}
            className="form-textarea"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">Pateikti</button>
      </form>
    </div>
  );
};

export default UserForm;
