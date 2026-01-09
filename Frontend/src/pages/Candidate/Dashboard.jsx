import React, { useState } from "react";

const CandidateForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    position: "",
    resume: null,
    coverLetter: null,
    linkedin: "",
    portfolio: "",
    education: "",
    experience: "",
    skills: "",
    certifications: "",
    expectedSalary: "",
    noticePeriod: "",
    relocate: "",
    referral: "",
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement your submit logic here
    alert("Form submitted!");
  };

  return (
    <form
      className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">Candidate Application Form</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={form.dob}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP/Postal Code"
          value={form.zip}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="position"
          placeholder="Position Applying For"
          value={form.position}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="file"
          name="coverLetter"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn Profile"
          value={form.linkedin}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="url"
          name="portfolio"
          placeholder="Portfolio/Website"
          value={form.portfolio}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="education"
          placeholder="Education Details"
          value={form.education}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="experience"
          placeholder="Work Experience"
          value={form.experience}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={form.skills}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="certifications"
          placeholder="Certifications"
          value={form.certifications}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="expectedSalary"
          placeholder="Expected Salary"
          value={form.expectedSalary}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="noticePeriod"
          placeholder="Notice Period"
          value={form.noticePeriod}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="relocate"
          value={form.relocate}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Willing to Relocate?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <input
          type="text"
          name="referral"
          placeholder="How did you hear about us?"
          value={form.referral}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Submit Application
      </button>
    </form>
  );
};

export default CandidateForm;
