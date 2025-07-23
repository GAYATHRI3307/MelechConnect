import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    occupation: "mechanic",
    age: "",
    experience: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, occupation, age, experience, contactNumber } = formData;

    if (!email || !password || !contactNumber) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/sign_up/",
        {
          email,
          password,
          occupation,
          age,
          experience,
          contact_number: contactNumber, // API expects snake_case
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("Signup successful! 🎉");
    } catch (error) {
      console.error(error.response?.data || "Something went wrong");
      alert("Error saving details. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <div>
          <label>Occupation:</label>
          <label>
            <input
              type="radio"
              name="occupation"
              value="mechanic"
              checked={formData.occupation === "mechanic"}
              onChange={handleChange}
            />{" "}
            Mechanic
          </label>
          <label>
            <input
              type="radio"
              name="occupation"
              value="electrician"
              checked={formData.occupation === "electrician"}
              onChange={handleChange}
            />{" "}
            Electrician
          </label>
        </div>

        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            required
          />
        </label>

        <label>
          Years of Experience:
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            min="0"
            required
          />
        </label>

        <label>
          Contact Number:
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            placeholder="Enter 10-digit number"
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
