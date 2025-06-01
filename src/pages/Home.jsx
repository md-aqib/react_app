import React, { useState, useEffect } from "react";

let userData = [
  { id: 1, firstname: "Alice", lastname: "Smith", age: 25, gender: "Female" },
  { id: 2, firstname: "Bob", lastname: "Johnson", age: 30, gender: "Male" },
  { id: 3, firstname: "Charlie", lastname: "Brown", age: 22, gender: "Male" },
];

const Home = () => {
  const [users, setUsers] = useState(userData);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
  });
  const [ searchTerm, setSearchTerm ] = useState("");

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    console.log({term})
    if (term === "") {
      setUsers(userData);
    } else {
      const filtered = userData.filter(
        (user) =>
          user.firstname.toLowerCase().includes(term) ||
          user.lastname.toLowerCase().includes(term) ||
          user.gender.toLowerCase().includes(term) ||
          user.age.toString().includes(term)
      );
      setUsers(filtered);
    }
  }, [searchTerm]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    let newUserData = [...users];
    const filteredData = newUserData.filter(e => e.id != id);
    userData = filteredData;
    setUsers(filteredData)
  };

  const handleEdit = (id) => {
    let newUserData = [...users];
    const filteredData = newUserData.filter(e => e.id != id);
    userData = filteredData;
    setUsers(filteredData)
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      ...formData,
      id: users.length + 1,
      age: Number(formData.age),
    };
    userData = [...users, newUser];
    setUsers([...users, newUser]);
    setFormData({ firstname: "", lastname: "", age: "", gender: "" });
    setShowForm(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <h2>User List</h2>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button onClick={() => setShowForm(true)} style={buttonStyle}>
            Add User
          </button>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={smallSearchInput}
          />
        </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
            <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>First Name</th>
                <th style={thStyle}>Last Name</th>
                <th style={thStyle}>Age</th>
                <th style={thStyle}>Gender</th>
                <th style={thStyle}>Action</th>
            </tr>
            </thead>
            <tbody>
            {users.map(user => (
                <tr key={user.id}>
                  <td style={tdStyle}>{user.id}</td>
                  <td style={tdStyle}>{user.firstname}</td>
                  <td style={tdStyle}>{user.lastname}</td>
                  <td style={tdStyle}>{user.age}</td>
                  <td style={tdStyle}>{user.gender}</td>
                  <td style={tdStyle}><button type="button" onClick={() => handleEdit(user.id)} style={{ ...buttonStyle, background: "#888" }}>
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(user.id)} style={{ color: "#FFFFFF", background: "#FF0000" }}>
                      Delete
                    </button>
                  </td>
                </tr>
            ))}
        </tbody>
      </table>
      {showForm && (
        <div style={modalStyle}>
          <div style={formBoxStyle}>
            <h3>Add New User</h3>
            <form onSubmit={handleSubmit}>
              <input name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required style={inputStyle} />
              <input name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required style={inputStyle} />
              <input name="age" placeholder="Age" type="number" value={formData.age} onChange={handleChange} required style={inputStyle} />
              <select name="gender" value={formData.gender} onChange={handleChange} required style={inputStyle}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <div>
                <button type="submit" style={buttonStyle}>Submit</button>
                <button type="button" onClick={() => setShowForm(false)} style={{ ...buttonStyle, background: "#888" }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const thStyle = { border: "1px solid #ccc", padding: "8px", backgroundColor: "#f4f4f4" };
const tdStyle = { border: "1px solid #ccc", padding: "8px" };
const buttonStyle = { margin: "10px 10px 10px 0", padding: "8px 16px", background: "#007bff", color: "white", border: "none", borderRadius: 4 };
const inputStyle = { margin: "10px 0", padding: "8px", width: "100%" };
const modalStyle = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" };
const formBoxStyle = { background: "white", padding: 20, borderRadius: 8, width: "300px" };
const smallSearchInput = {
  padding: "6px 10px",
  width: "160px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

export default Home;