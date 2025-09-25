import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Registration.css';

function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    password: "",
    state: "",
    district: "",
    address: "",
    pinCode: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ageError, setAgeError] = useState("");
  const [districts, setDistricts] = useState([]);

  const districtData = {
    AP: ["Anantapur", "Chittoor", "Guntur", "Kadapa", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "East Godavari"],
    TG: ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar", "Jogulamba", "Kamareddy", "Karimnagar", "Khammam", "Mahabubabad", "Mahbubnagar", "Medak", "Medchal", "Mulugu", "Nalgonda", "Nizamabad", "Peddapalli", "Rajanna", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Warangal"],
  };

  useEffect(() => {
    setDistricts(districtData[formData.state] || []);
    setFormData((prev) => ({ ...prev, district: "" }));
  }, [formData.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "dob") {
      validateAge(e.target.value);
    }
  };

  const validateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    setAgeError(age < 18 ? "You are not eligible to donate blood." : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ageError) {
      setMessage("You are not eligible to donate blood.");
      return;
    }
    for (let key in formData) {
      if (!formData[key]) {
        setMessage("Please fill in all fields");
        return;
      }
    }
    if (formData.password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8081/donors/register", formData);
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response?.status === 409 ? "User with this phone or email already exists" : "An error occurred during registration");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register as a Donor</h2>
        {message && <p className="text-center mb-4 text-red-500">{message}</p>}
        {ageError && <p className="text-center mb-4 text-red-500">{ageError}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Name" type="text" name="name" value={formData.name} onChange={handleChange} />
          <InputField label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange} />
          <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
          <Dropdown label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
          <Dropdown label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} options={["A+", "A-", "BPOS", "B-", "O+", "O-", "AB+", "AB-"]} />
          <InputField label="Phone" type="text" name="phone" value={formData.phone} onChange={handleChange} maxLength="10" />
          <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
          <InputField label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <Dropdown label="State" name="state" value={formData.state} onChange={handleChange} options={["AP", "TG"]} />
          <Dropdown label="District" name="district" value={formData.district} onChange={handleChange} options={districts} disabled={!districts.length} />
          <InputField label="Address" type="text" name="address" value={formData.address} onChange={handleChange} />
          <InputField label="Pin Code" type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition" disabled={!!ageError}>Register</button>
        </form>
        <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
      </div>
    </div>
  );
}

const InputField = ({ label, type, name, value, onChange, maxLength }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} maxLength={maxLength} required className="w-full px-3 py-2 border rounded-lg" />
  </div>
);

const Dropdown = ({ label, name, value, onChange, options, disabled }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <select name={name} value={value} onChange={onChange} required className="w-full px-3 py-2 border rounded-lg" disabled={disabled}>
      <option value="">{disabled ? "Select State First" : `Select ${label}`}</option>
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default RegisterUser;
