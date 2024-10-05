import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = ({ createUser, updateUser, editingUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    address: { street: "", city: "" },
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    }
  }, [editingUser]);

  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Name is required and must be at least 3 characters.";
    }

    // Validate Email (simple regex pattern)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "A valid email is required.";
    }

    // Validate Phone (simple regex for digits)
    const phonePattern = /^\d{10}$/;
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      newErrors.phone = "Phone number is required and must be 10 digits.";
    }

    // Validate Username (must be non-editable and auto-filled)
    if (!formData.username || formData.username.length < 3) {
      newErrors.username = "Username is required and must be at least 3 characters.";
    }

    // Validate Address (street and city required)
    if (!formData.address.street) {
      newErrors.street = "Street address is required.";
    }

    if (!formData.address.city) {
      newErrors.city = "City is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop form submission if validation fails

    if (editingUser) {
      updateUser(formData);
    } else {
      createUser(formData);
    }

    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Auto-generate a non-editable username for new users
  useEffect(() => {
    if (!editingUser) {
      setFormData({
        ...formData,
        username: `USER-${formData.name}`.toLowerCase(),
      });
    }
  }, [formData.name, editingUser]);

  return (
    <div>
      <h2>{editingUser ? "Edit User" : "Create New User"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
          className="input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            disabled
            className="input"
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div>
          <label>Street Address</label>
          <input
          className="input"
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
          />
          {errors.street && <span className="error">{errors.street}</span>}
        </div>

        <div>
          <label>City</label>
          <input
          className="input"
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        <button type="submit" className="button">
          {editingUser ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;

