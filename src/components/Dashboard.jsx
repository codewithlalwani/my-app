// // // src/components/Dashboard.jsx
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../App.css";
// // import backgroundImage from "../download.jpg";
// // import Button from '@mui/material/Button';
// // import TextField from '@mui/material/TextField';
// // import Box from '@mui/material/Box';
// // import Typography from '@mui/material/Typography';
// // import Paper from '@mui/material/Paper';

// // const Dashboard = () => {
// //   const navigate = useNavigate();
// //   const [users, setUsers] = useState([]);
// //   const [showData, setShowData] = useState(true);
// //   const [showForm, setShowForm] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     age: "",
// //     address: "",
// //     password: "",
// //   });

// //   useEffect(() => {
// //     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
// //     const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));

// //     if (!loggedInUser || loggedInUser.token !== 1) {
// //       alert("Access denied. Please log in.");
// //       navigate("/login");
// //       return;
// //     }

// //     setCurrentUser(loggedInUser);
// //     setUsers(storedUsers);
// //   }, [navigate]);

// //   const handleLogout = () => {
// //     localStorage.removeItem("currentUser");
// //     navigate("/login");
// //   };

// //   const handleChange = (e) => {
// //     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
// //   };

// //   const handleFormSubmit = (e) => {
// //     e.preventDefault();
// //     const { name, email, age, address, password } = formData;

// //     if (!name || !email || !age || !address || !password) {
// //       alert("All fields are required.");
// //       return;
// //     }

// //     const newUser = {
// //       id: users.length ? users[users.length - 1].id + 1 : 1,
// //       name,
// //       email,
// //       age,
// //       address,
// //       password,
// //       rollID: 2,
// //       token: 0,
// //     };

// //     const updatedUsers = [...users, newUser];
// //     setUsers(updatedUsers);
// //     localStorage.setItem("users", JSON.stringify(updatedUsers));
// //     alert("User created successfully.");
// //     setFormData({ name: "", email: "", age: "", address: "", password: "" });
// //     setShowForm(false);
// //   };

// //   return (
// //     <div
// //       className="dashboard-container"
// //       style={{
// //         backgroundImage: `url(${backgroundImage})`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         minHeight: "100vh",
// //         display: "flex",
// //         flexDirection: "row",
// //       }}
// //     >
// //       {/* Sidebar */}
// //       <div className="sidebar-glass">
// //         <h3 style={{ textAlign: "center" }}>Dashboard</h3>
// //         <ul style={{ listStyle: "none", padding: "0", marginTop: "30px" }}>
// //           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/home")}>
// //             Home
// //           </li>
// //           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => setShowData((prev) => !prev)}>
// //             Users
// //           </li>
// //           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/profile")}>
// //             Profile
// //           </li>
// //           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/settings")}>
// //             Settings
// //           </li>
// //           <li style={{ padding: "10px", color: "red", cursor: "pointer" }} onClick={handleLogout}>
// //             Logout
// //           </li>
// //         </ul>
// //       </div>

// //       {/* Main Content */}
// //       <div className="main-content" style={{ padding: "20px", width: "100%" }}>
// //         <div className="navbar-glass" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //           <h2>Welcome {currentUser?.name || "User"}!</h2>
// //           <Button
// //             variant="contained"
// //             sx={{
// //               height: "50px",
// //               backgroundColor: "#4CAF50",
// //               "&:hover": {
// //                 backgroundColor: "#45a049",
// //               },
// //             }}
// //             onClick={() => setShowForm((prev) => !prev)}
// //           >
// //             {showForm ? "Close Form" : "Create User"}
// //           </Button>
// //         </div>

// //         {/* Create User Form */}
// //         {showForm && currentUser?.rollID === 1 && (
// //           <Paper elevation={4} sx={{ p: 3, mt: 2, maxWidth: 500, mx: "auto", background: "#f9f9f9" }}>
// //             <Typography variant="h5" mb={2} align="center">New User Form</Typography>
// //             <Box component="form" onSubmit={handleFormSubmit} noValidate autoComplete="off">
// //               {["name", "email", "age", "address", "password"].map((field) => (
// //                 <TextField
// //                   key={field}
// //                   margin="normal"
// //                   fullWidth
// //                   type={field === "age" ? "number" : field === "password" ? "password" : "text"}
// //                   label={field.charAt(0).toUpperCase() + field.slice(1)}
// //                   name={field}
// //                   value={formData[field]}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               ))}
// //               <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
// //                 Add User
// //               </Button>
// //             </Box>
// //           </Paper>
// //         )}

// //         {/* Admin Section */}
// //         {showData && currentUser?.rollID === 1 && (
// //           <div className="table-container" style={{ marginTop: "40px" }}>
// //             <h2 style={{ textAlign: "center", color: "#fff" }}>Registered Users</h2>
// //             <table>
// //               <thead>
// //                 <tr>
// //                   <th>ID</th>
// //                   <th>Name</th>
// //                   <th>Email</th>
// //                   <th>Age</th>
// //                   <th>Address</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {users.map((user, idx) => (
// //                   <tr key={idx}>
// //                     <td>{user.id}</td>
// //                     <td>{user.name}</td>
// //                     <td>{user.email}</td>
// //                     <td>{user.age}</td>
// //                     <td>{user.address}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* Non-Admin View */}
// //         {showData && currentUser?.rollID !== 1 && (
// //           <div style={{ textAlign: "center", marginTop: "50px" }}>
// //             <h3 style={{ color: "#fff" }}>
// //               You do not have permission to view user data.
// //             </h3>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;




// // src/components/Dashboard.jsx
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../App.css";
// // import backgroundImage from "../download.jpg";
// // import Button from '@mui/material/Button';
// // import TextField from '@mui/material/TextField';
// // import Box from '@mui/material/Box';
// // import Typography from '@mui/material/Typography';
// // import Paper from '@mui/material/Paper';

// // const Dashboard = () => {
// //   const navigate = useNavigate();
// //   const [users, setUsers] = useState([]);
// //   const [showData, setShowData] = useState(true);
// //   const [showForm, setShowForm] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     age: "",
// //     address: "",
// //     password: "",
// //   });

// //   useEffect(() => {
// //     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
// //     const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));

// //     if (!loggedInUser || loggedInUser.token !== 1) {
// //       alert("Access denied. Please log in.");
// //       navigate("/login");
// //       return;
// //     }

// //     setCurrentUser(loggedInUser);
// //     setUsers(storedUsers);
// //   }, [navigate]);

// //   const handleLogout = () => {
// //     localStorage.removeItem("currentUser");
// //     navigate("/login");
// //   };

// //   const handleChange = (e) => {
// //     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
// //   };

// //   const handleFormSubmit = (e) => {
// //     e.preventDefault();
// //     const { name, email, age, address, password } = formData;

// //     if (!name || !email || !age || !address || !password) {
// //       alert("All fields are required.");
// //       return;
// //     }

// //     const newUser = {
// //       id: users.length ? users[users.length - 1].id + 1 : 1,
// //       name,
// //       email,
// //       age,
// //       address,
// //       password,
// //       rollID: 2,
// //       token: 0,
// //     };

// //     const updatedUsers = [...users, newUser];
// //     setUsers(updatedUsers);
// //     localStorage.setItem("users", JSON.stringify(updatedUsers));
// //     alert("User created successfully.");
// //     setFormData({ name: "", email: "", age: "", address: "", password: "" });
// //     setShowForm(false);
// //   };

// //   const handleAccessChange = (userId, newRole) => {
// //     const updatedUsers = users.map(user =>
// //       user.id === userId ? { ...user, rollID: newRole } : user
// //     );
// //     setUsers(updatedUsers);
// //     localStorage.setItem("users", JSON.stringify(updatedUsers));

// //     if (currentUser.id === userId) {
// //       const updatedCurrentUser = { ...currentUser, rollID: newRole };
// //       setCurrentUser(updatedCurrentUser);
// //       localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
// //     }
// //   };

// //   return (
// //     <div
// //       className="dashboard-container"
// //       style={{
// //         backgroundImage: `url(${backgroundImage})`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         minHeight: "100vh",
// //         display: "flex",
// //         flexDirection: "row",
// //       }}
// //     >
// //       {/* Sidebar */}
// //       <div className="sidebar-glass">
// //         <h3 style={{ textAlign: "center" }}>Dashboard</h3>
// //         <ul style={{ listStyle: "none", padding: "0", marginTop: "30px" }}>
// //           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/home")}>
// //             Home
// //           </li>
// //           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => setShowData((prev) => !prev)}>
// //             Users
// //           </li>
// //           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/profile")}>
// //             Profile
// //           </li>
// //           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/settings")}>
// //             Settings
// //           </li>
// //           <li style={{ padding: "10px", color: "red", cursor: "pointer" }} onClick={handleLogout}>
// //             Logout
// //           </li>
// //         </ul>
// //       </div>

// //       {/* Main Content */}
// //       <div className="main-content" style={{ padding: "20px", width: "100%" }}>
// //         <div className="navbar-glass" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //           <h2>Welcome {currentUser?.name || "User"}!</h2>
// //           <Button
// //             variant="contained"
// //             sx={{
// //               height: "50px",
// //               backgroundColor: "#4CAF50",
// //               "&:hover": {
// //                 backgroundColor: "#45a049",
// //               },
// //             }}
// //             onClick={() => setShowForm((prev) => !prev)}
// //           >
// //             {showForm ? "Close Form" : "Create User"}
// //           </Button>
// //         </div>

// //         {/* Create User Form */}
// //         {showForm && currentUser?.rollID === 1 && (
// //           <Paper elevation={4} sx={{ p: 3, mt: 2, maxWidth: 500, mx: "auto", background: "#f9f9f9" }}>
// //             <Typography variant="h5" mb={2} align="center">New User Form</Typography>
// //             <Box component="form" onSubmit={handleFormSubmit} noValidate autoComplete="off">
// //               {["name", "email", "age", "address", "password"].map((field) => (
// //                 <TextField
// //                   key={field}
// //                   margin="normal"
// //                   fullWidth
// //                   type={field === "age" ? "number" : field === "password" ? "password" : "text"}
// //                   label={field.charAt(0).toUpperCase() + field.slice(1)}
// //                   name={field}
// //                   value={formData[field]}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               ))}
// //               <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
// //                 Add User
// //               </Button>
// //             </Box>
// //           </Paper>
// //         )}

// //         {/* Admin Section */}
// //         {showData && currentUser?.rollID === 1 && (
// //           <div className="table-container" style={{ marginTop: "40px" }}>
// //             <h2 style={{ textAlign: "center", color: "#fff" }}>Registered Users</h2>
// //             <table>
// //               <thead>
// //                 <tr>
// //                   <th>ID</th>
// //                   <th>Name</th>
// //                   <th>Email</th>
// //                   <th>Age</th>
// //                   <th>Address</th>
// //                   <th>Access Level</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {users.map((user, idx) => (
// //                   <tr key={idx}>
// //                     <td>{user.id}</td>
// //                     <td>{user.name}</td>
// //                     <td>{user.email}</td>
// //                     <td>{user.age}</td>
// //                     <td>{user.address}</td>
// //                     <td>
// //                       <label>
// //                         <input
// //                           type="radio"
// //                           value="1"
// //                           checked={user.rollID === 1}
// //                           onChange={() => handleAccessChange(user.id, 1)}
// //                         />
// //                         Admin
// //                       </label>
// //                       <label style={{ marginLeft: "10px" }}>
// //                         <input
// //                           type="radio"
// //                           value="2"
// //                           checked={user.rollID === 2}
// //                           onChange={() => handleAccessChange(user.id, 2)}
// //                         />
// //                         User
// //                       </label>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* Non-Admin View */}
// //         {showData && currentUser?.rollID !== 1 && (
// //           <div style={{ textAlign: "center", marginTop: "50px" }}>
// //             <h3 style={{ color: "#fff" }}>
// //               You do not have permission to view user data.
// //             </h3>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// // src/components/Dashboard.jsx
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../App.css";
// // import backgroundImage from "../download.jpg";
// // import Button from '@mui/material/Button';
// // import TextField from '@mui/material/TextField';
// // import Box from '@mui/material/Box';
// // import Typography from '@mui/material/Typography';
// // import Paper from '@mui/material/Paper';
// // import Select from '@mui/material/Select';
// // import MenuItem from '@mui/material/MenuItem';

// // const Dashboard = () => {
// //   const navigate = useNavigate();
// //   const [users, setUsers] = useState([]);
// //   const [showData, setShowData] = useState(true);
// //   const [showForm, setShowForm] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     age: "",
// //     address: "",
// //     password: "",
// //   });

// //   useEffect(() => {
// //     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
// //     const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));

// //     if (!loggedInUser || loggedInUser.token !== 1) {
// //       alert("Access denied. Please log in.");
// //       navigate("/login");
// //       return;
// //     }

// //     setCurrentUser(loggedInUser);
// //     setUsers(storedUsers);
// //   }, [navigate]);

// //   const handleLogout = () => {
// //     localStorage.removeItem("currentUser");
// //     navigate("/login");
// //   };

// //   const handleChange = (e) => {
// //     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
// //   };

// //   const handleFormSubmit = (e) => {
// //     e.preventDefault();
// //     const { name, email, age, address, password } = formData;

// //     if (!name || !email || !age || !address || !password) {
// //       alert("All fields are required.");
// //       return;
// //     }

// //     const newUser = {
// //       id: users.length ? users[users.length - 1].id + 1 : 1,
// //       name,
// //       email,
// //       age,
// //       address,
// //       password,
// //       rollID: 2,
// //       token: 0,
// //     };

// //     const updatedUsers = [...users, newUser];
// //     setUsers(updatedUsers);
// //     localStorage.setItem("users", JSON.stringify(updatedUsers));
// //     alert("User created successfully.");
// //     setFormData({ name: "", email: "", age: "", address: "", password: "" });
// //     setShowForm(false);
// //   };

// //   const handleAccessChange = (userId, newRole) => {
// //     const updatedUsers = users.map(user =>
// //       user.id === userId ? { ...user, rollID: newRole } : user
// //     );
// //     setUsers(updatedUsers);
// //     localStorage.setItem("users", JSON.stringify(updatedUsers));

// //     if (currentUser.id === userId) {
// //       const updatedCurrentUser = { ...currentUser, rollID: newRole };
// //       setCurrentUser(updatedCurrentUser);
// //       localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
// //     }
// //   };

// //   return (
// //     <div
// //       className="dashboard-container"
// //       style={{
// //         backgroundImage: `url(${backgroundImage})`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         minHeight: "100vh",
// //         display: "flex",
// //         flexDirection: "row",
// //       }}
// //     >
// //       {/* Sidebar */}
// //       <div className="sidebar-glass">
// //         <h3 style={{ textAlign: "center" }}>Dashboard</h3>
// //         <ul style={{ listStyle: "none", padding: "0", marginTop: "30px" }}>
// //           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/home")}>
// //             Home
// //           </li>
// //           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => setShowData((prev) => !prev)}>
// //             Users
// //           </li>
// //           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/profile")}>
// //             Profile
// //           </li>
// //           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/settings")}>
// //             Settings
// //           </li>
// //           <li style={{ padding: "10px", color: "red", cursor: "pointer" }} onClick={handleLogout}>
// //             Logout
// //           </li>
// //         </ul>
// //       </div>

// //       {/* Main Content */}
// //       <div className="main-content" style={{ padding: "20px", width: "100%" }}>
// //         <div className="navbar-glass" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //           <h2>Welcome {currentUser?.name || "User"}!</h2>
// //           <Button
// //             variant="contained"
// //             sx={{
// //               height: "50px",
// //               backgroundColor: "#4CAF50",
// //               "&:hover": {
// //                 backgroundColor: "#45a049",
// //               },
// //             }}
// //             onClick={() => setShowForm((prev) => !prev)}
// //           >
// //             {showForm ? "Close Form" : "Create User"}
// //           </Button>
// //         </div>

// //         {/* Create User Form */}
// //         {showForm && currentUser?.rollID === 1 && (
// //           <Paper elevation={4} sx={{ p: 3, mt: 2, maxWidth: 500, mx: "auto", background: "#f9f9f9" }}>
// //             <Typography variant="h5" mb={2} align="center">New User Form</Typography>
// //             <Box component="form" onSubmit={handleFormSubmit} noValidate autoComplete="off">
// //               {["name", "email", "age", "address", "password"].map((field) => (
// //                 <TextField
// //                   key={field}
// //                   margin="normal"
// //                   fullWidth
// //                   type={field === "age" ? "number" : field === "password" ? "password" : "text"}
// //                   label={field.charAt(0).toUpperCase() + field.slice(1)}
// //                   name={field}
// //                   value={formData[field]}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               ))}
// //               <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
// //                 Add User
// //               </Button>
// //             </Box>
// //           </Paper>
// //         )}

// //         {/* Admin Section */}
// //         {showData && currentUser?.rollID === 1 && (
// //           <div className="table-container" style={{ marginTop: "40px" }}>
// //             <h2 style={{ textAlign: "center", color: "#fff" }}>Registered Users</h2>
// //             <table>
// //               <thead>
// //                 <tr>
// //                   <th>ID</th>
// //                   <th>Name</th>
// //                   <th>Email</th>
// //                   <th>Age</th>
// //                   <th>Address</th>
// //                   <th>Role</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {users.map((user, idx) => (
// //                   <tr key={idx}>
// //                     <td>{user.id}</td>
// //                     <td>{user.name}</td>
// //                     <td>{user.email}</td>
// //                     <td>{user.age}</td>
// //                     <td>{user.address}</td>
// //                     <td>
// //                       <Select
// //                         value={user.rollID}
// //                         onChange={(e) => handleAccessChange(user.id, parseInt(e.target.value))}
// //                         size="small"
// //                         sx={{ backgroundColor: "#fff", minWidth: 120 }}
// //                       >
// //                         <MenuItem value={1}>Admin</MenuItem>
// //                         <MenuItem value={2}>User</MenuItem>
// //                       </Select>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* Non-Admin View */}
// //         {showData && currentUser?.rollID !== 1 && (
// //           <div style={{ textAlign: "center", marginTop: "50px" }}>
// //             <h3 style={{ color: "#fff" }}>
// //               You do not have permission to view user data.
// //             </h3>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";
// import backgroundImage from "../download.jpg";
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [showData, setShowData] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     age: "",
//     address: "",
//     password: "",
//   });

//   useEffect(() => {
//     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
//     const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));

//     if (!loggedInUser || loggedInUser.token !== 1) {
//       alert("Access denied. Please log in.");
//       navigate("/login");
//       return;
//     }

//     setCurrentUser(loggedInUser);
//     setUsers(storedUsers);
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     navigate("/login");
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const { name, email, age, address, password } = formData;

//     if (!name || !email || !age || !address || !password) {
//       alert("All fields are required.");
//       return;
//     }

//     const newUser = {
//       id: users.length ? users[users.length - 1].id + 1 : 1,
//       name,
//       email,
//       age,
//       address,
//       password,
//       rollID: 2,
//       token: 0,
//     };

//     const updatedUsers = [...users, newUser];
//     setUsers(updatedUsers);
//     localStorage.setItem("users", JSON.stringify(updatedUsers));
//     alert("User created successfully.");
//     setFormData({ name: "", email: "", age: "", address: "", password: "" });
//     setShowForm(false);
//   };

//   const handleAccessChange = (userId, newRole) => {
//     const updatedUsers = users.map(user =>
//       user.id === userId ? { ...user, rollID: newRole } : user
//     );
//     setUsers(updatedUsers);
//     localStorage.setItem("users", JSON.stringify(updatedUsers));

//     if (currentUser.id === userId) {
//       const updatedCurrentUser = { ...currentUser, rollID: newRole };
//       setCurrentUser(updatedCurrentUser);
//       localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
//     }
//   };

//   const CurrentUserCard = () => (
//     <Paper elevation={3} sx={{ p: 3, mt: 4, maxWidth: 400, background: "#e3f2fd" }}>
//       <Typography variant="h6" gutterBottom>
//         Your Profile Details
//       </Typography>
//       <Typography><strong>Name:</strong> {currentUser.name}</Typography>
//       <Typography><strong>Email:</strong> {currentUser.email}</Typography>
//       <Typography><strong>Age:</strong> {currentUser.age}</Typography>
//       <Typography><strong>Address:</strong> {currentUser.address}</Typography>
//       <Typography><strong>Role:</strong> {currentUser.rollID === 1 ? "Admin" : "User"}</Typography>
//     </Paper>
//   );

//   return (
//     <div
//       className="dashboard-container"
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "row",
//       }}
//     >
//       {/* Sidebar */}
//       <div className="sidebar-glass">
//         <h3 style={{ textAlign: "center" }}>Dashboard</h3>
//         <ul style={{ listStyle: "none", padding: "0", marginTop: "30px" }}>
//           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/home")}>
//             Home
//           </li>
//           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => setShowData((prev) => !prev)}>
//             Users
//           </li>
//           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/profile")}>
//             Profile
//           </li>
//           <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/settings")}>
//             Settings
//           </li>
//           <li style={{ padding: "10px", color: "red", cursor: "pointer" }} onClick={handleLogout}>
//             Logout
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="main-content" style={{ padding: "20px", width: "100%" }}>
//         <div className="navbar-glass" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <h2>Welcome {currentUser?.name || "User"}!</h2>
//           <Button
//             variant="contained"
//             sx={{
//               height: "50px",
//               backgroundColor: "#4CAF50",
//               "&:hover": {
//                 backgroundColor: "#45a049",
//               },
//             }}
//             onClick={() => setShowForm((prev) => !prev)}
//           >
//             {showForm ? "Close Form" : "Create User"}
//           </Button>
//         </div>

//         {/* Current User Info Card */}
//         {currentUser && <CurrentUserCard />}

//         {/* Create User Form */}
//         {showForm && currentUser?.rollID === 1 && (
//           <Paper elevation={4} sx={{ p: 3, mt: 2, maxWidth: 500, mx: "auto", background: "#f9f9f9" }}>
//             <Typography variant="h5" mb={2} align="center">New User Form</Typography>
//             <Box component="form" onSubmit={handleFormSubmit} noValidate autoComplete="off">
//               {["name", "email", "age", "address", "password"].map((field) => (
//                 <TextField
//                   key={field}
//                   margin="normal"
//                   fullWidth
//                   type={field === "age" ? "number" : field === "password" ? "password" : "text"}
//                   label={field.charAt(0).toUpperCase() + field.slice(1)}
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleChange}
//                   required
//                 />
//               ))}
//               <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
//                 Add User
//               </Button>
//             </Box>
//           </Paper>
//         )}

//         {/* Admin Section */}
//         {showData && currentUser?.rollID === 1 && (
//           <div className="table-container" style={{ marginTop: "40px" }}>
//             <h2 style={{ textAlign: "center", color: "#fff" }}>Registered Users</h2>
//             <table>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Age</th>
//                   <th>Address</th>
//                   <th>Role</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user, idx) => (
//                   <tr key={idx}>
//                     <td>{user.id}</td>
//                     <td>{user.name}</td>
//                     <td>{user.email}</td>
//                     <td>{user.age}</td>
//                     <td>{user.address}</td>
//                     <td>
//                       <Select
//                         value={user.rollID}
//                         onChange={(e) => handleAccessChange(user.id, parseInt(e.target.value))}
//                         size="small"
//                         sx={{ backgroundColor: "#fff", minWidth: 120 }}
//                       >
//                         <MenuItem value={1}>Admin</MenuItem>
//                         <MenuItem value={2}>User</MenuItem>
//                       </Select>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Non-Admin View */}
//         {showData && currentUser?.rollID !== 1 && (
//           <div style={{ textAlign: "center", marginTop: "50px" }}>
//             <h3 style={{ color: "#fff" }}>
//               You do not have permission to view user data.
//             </h3>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import backgroundImage from "../download.jpg";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showData, setShowData] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
    password: "",
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!loggedInUser || loggedInUser.token !== 1) {
      alert("Access denied. Please log in.");
      navigate("/login");
      return;
    }

    setCurrentUser(loggedInUser);
    setUsers(storedUsers);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, age, address, password } = formData;

    if (!name || !email || !age || !address || !password) {
      alert("All fields are required.");
      return;
    }

    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name,
      email,
      age,
      address,
      password,
      rollID: 2,
      token: 0,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("User created successfully.");
    setFormData({ name: "", email: "", age: "", address: "", password: "" });
    setShowForm(false);
  };

  const handleAccessChange = (userId, newRole) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, rollID: newRole } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    if (currentUser.id === userId) {
      const updatedCurrentUser = { ...currentUser, rollID: newRole };
      setCurrentUser(updatedCurrentUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
    }
  };

  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* Sidebar */}
      <div className="sidebar-glass">
        <h3 style={{ textAlign: "center" }}>Dashboard</h3>
        <ul style={{ listStyle: "none", padding: "0", marginTop: "30px" }}>
          <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/home")}>
            Home
          </li>
          <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => setShowData((prev) => !prev)}>
            Users
          </li>
          <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/profile")}>
            Profile
          </li>
          <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/settings")}>
            Settings
          </li>
          <li style={{ padding: "10px", color: "red", cursor: "pointer" }} onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content" style={{ padding: "20px", width: "100%" }}>
        {/* Navbar */}
        <div className="navbar-glass" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          {/* Profile Dropdown */}
          <div style={{ position: "relative" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#1976d2", mr: 2 }}
              onClick={() => setShowProfile((prev) => !prev)}
            >
              Your Profile
            </Button>
            {showProfile && currentUser && (
              <Paper
                elevation={3}
                sx={{
                  position: "absolute",
                  top: "60px",
                  left: 0,
                  zIndex: 100,
                  width: 300,
                  p: 2,
                  background: "#e3f2fd",
                }}
              >
                <Typography variant="h6" gutterBottom>Profile Details</Typography>
                <Typography><strong>Name:</strong> {currentUser.name}</Typography>
                <Typography><strong>Email:</strong> {currentUser.email}</Typography>
                <Typography><strong>Age:</strong> {currentUser.age}</Typography>
                <Typography><strong>Address:</strong> {currentUser.address}</Typography>
                <Typography><strong>Role:</strong> {currentUser.rollID === 1 ? "Admin" : "User"}</Typography>
              </Paper>
            )}
          </div>

          {/* Welcome + Create Button Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <h2 style={{ margin: 0 }}>Welcome {currentUser?.name || "User"}!</h2>
            <Button
              variant="contained"
              sx={{
                height: "50px",
                backgroundColor: "#4CAF50",
                "&:hover": {
                  backgroundColor: "#45a049",
                },
              }}
              onClick={() => setShowForm((prev) => !prev)}
            >
              {showForm ? "Close Form" : "Create User"}
            </Button>
          </div>
        </div>

        {/* Create User Form */}
        {showForm && currentUser?.rollID === 1 && (
          <Paper elevation={4} sx={{ p: 3, mt: 2, maxWidth: 500, mx: "auto", background: "#f9f9f9" }}>
            <Typography variant="h5" mb={2} align="center">New User Form</Typography>
            <Box component="form" onSubmit={handleFormSubmit} noValidate autoComplete="off">
              {["name", "email", "age", "address", "password"].map((field) => (
                <TextField
                  key={field}
                  margin="normal"
                  fullWidth
                  type={field === "age" ? "number" : field === "password" ? "password" : "text"}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              ))}
              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                Add User
              </Button>
            </Box>
          </Paper>
        )}

        {/* Admin Section */}
        {showData && currentUser?.rollID === 1 && (
          <div className="table-container" style={{ marginTop: "40px" }}>
            <h2 style={{ textAlign: "center", color: "#fff" }}>Registered Users</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>{user.address}</td>
                    <td>
                      <Select
                        value={user.rollID}
                        onChange={(e) => handleAccessChange(user.id, parseInt(e.target.value))}
                        size="small"
                        sx={{ backgroundColor: "#fff", minWidth: 120 }}
                      >
                        <MenuItem value={1}>Admin</MenuItem>
                        <MenuItem value={2}>User</MenuItem>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Non-Admin View */}
        {showData && currentUser?.rollID !== 1 && (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h3 style={{ color: "#fff" }}>
              You do not have permission to view user data.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
