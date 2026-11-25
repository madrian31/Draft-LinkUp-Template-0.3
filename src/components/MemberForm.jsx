import { useState } from 'react'
import { addMember, memberExist } from '../services/members'
import { computeAge } from '../utils/age'
import './MemberForm.css'


const initialForm = {
  firstName: "",
  lastName: "",
  middleName: "",
  suffix: "",
  civilStatus: "",
  email: "",
  address: "",
  gender: "",
  phone: "",
  birthday: "",
  age: "",
};

export default function MemberForm() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.firstName.trim() === "") {
      alert("Please enter your first name.");
      return;
    }

    if (form.lastName.trim() === "") {
      alert("Please enter your last name.");
      return;
    }

    if (form.address.trim() === "") {
      alert("Please enter your address.");
      return;
    }

    if (form.gender === "") {
      alert("Please select your gender.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const exist = await memberExist(form.firstName, form.lastName, form.birthday);

      if (exist) {
        alert("Member already exists.");
        return; 
      }

      await addMember(form);

      setForm(initialForm);
      alert("Member added successfully!");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="card-title">Add member</h1>
        <p className="card-subtitle">Fill in the details below to register a new member.</p>

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Dela Cruz"
            />
          </div>

          <div className="field">
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Juan"
            />
          </div>

          <div className="field">
            <label htmlFor="middleName">
              Middle name <span className="optional">(optional)</span>
            </label>
            <input
              id="middleName"
              type="text"
              name="middleName"
              value={form.middleName}
              onChange={handleChange}
              placeholder="Santos"
            />
          </div>

          <div className="field">
            <label htmlFor="suffix">
              Suffix <span className="optional">(optional)</span>
            </label>
            <input
              id="suffix"
              type="text"
              name="suffix"
              value={form.suffix}
              onChange={handleChange}
              placeholder="Jr., Sr., III, etc."
            />
          </div>

          
        <div className="field field-full">

        
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="juan@example.com"
            /> 

        </div>

        <div className="field field-full">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street, Barangay, City"
            />
        </div>

                  <div className="field">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="civilStatus">Civil Status</label>
            <select
              id="civilStatus"
              name="civilStatus"
              value={form.civilStatus}
              onChange={handleChange}
            >
              <option value="">Select civil status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="birthday">Birthday</label>
            <input
              id="birthday"
              type="date"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="text"
              name="age"
              value={computeAge(form.birthday)}
              readOnly
              placeholder="Your age is..."
            />
          </div>

          <div className="field field-full">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="09XXXXXXXXX"
            />
          </div>

          {error && <p className="error" role="alert">{error}</p>}

          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save member"}
          </button>
        </form>
      </div>
    </div>
  );
}
