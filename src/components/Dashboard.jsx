import React, { useState } from "react";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, TextField, ThemeProvider, createTheme } from "@mui/material";
import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import PeopleOutline from "@mui/icons-material/PeopleOutline";
import PersonOutline from "@mui/icons-material/PersonOutline";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Add from "@mui/icons-material/Add";
import Search from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import ShieldOutlined from "@mui/icons-material/ShieldOutlined";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import Tune from "@mui/icons-material/Tune";
import { getCurrentUser, getUsers, readStoredValue } from "../utils/storage";
import { createAccount } from "../utils/accounts";
import "../Dashboard.css";

const theme = createTheme({
  palette: { primary: { main: "#4f5fe7" } },
  typography: { fontFamily: '-apple-system, BlinkMacSystemFont, Inter, "Segoe UI", sans-serif', button: { textTransform: "none", fontWeight: 600 } },
  shape: { borderRadius: 16 },
  components: {
    MuiDialog: { styleOverrides: { paper: { background: "rgba(245, 246, 255, 0.88)", backdropFilter: "blur(30px) saturate(150%)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 24px 80px rgba(57, 65, 119, 0.2)", borderRadius: 24 } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 12 } } },
  },
});
const emptyForm = { name: "", email: "", age: "", address: "", password: "" };
const sections = { dashboard: "Overview", users: "Users", profile: "My profile", settings: "Settings" };
const initials = (name = "User") => name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

function Avatar({ name, large = false }) {
  return <span className={`workspace-avatar${large ? " workspace-avatar-large" : ""}`} aria-hidden="true">{initials(name)}</span>;
}

function Dashboard({ section = "dashboard" }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [users, setUsers] = useState(getUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");
  const [compact, setCompact] = useState(() => readStoredValue("compactDirectory", false) === true);
  const isAdmin = currentUser?.rollID === 1;

  if (!currentUser) return <Navigate to="/login" replace />;
  if (section === "users" && !isAdmin) return <Navigate to="/dashboard" replace />;

  const admins = users.filter((user) => user.rollID === 1).length;
  const visibleUsers = users.filter((user) => {
    const matchesSearch = [user.name, user.email, user.address].some((value) => String(value || "").toLowerCase().includes(search.trim().toLowerCase()));
    return matchesSearch && (roleFilter === "all" || user.rollID === Number(roleFilter));
  });

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  };

  const openForm = () => {
    setFormData(emptyForm);
    setFormError("");
    setShowForm(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!isAdmin) return;
    try {
      const user = createAccount(formData);
      setUsers(getUsers());
      setShowForm(false);
      setSearch("");
      setRoleFilter("all");
      setNotice(`${user.name} can now sign in with their email and password.`);
    } catch (error) {
      setFormError(error.message);
    }
  };

  const handleAccessChange = (userId, role) => {
    if (!isAdmin) return;
    const updatedUsers = getUsers().map((user) => user.id === userId ? { ...user, rollID: role } : user);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    if (currentUser.id === userId) {
      const updatedCurrentUser = { ...currentUser, rollID: role };
      localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
      setCurrentUser(updatedCurrentUser);
      if (role !== 1) navigate("/dashboard", { replace: true });
    }
    setNotice("Account role updated.");
  };

  const renderTable = (rows, editable = false) => (
    <div className="directory-scroll" role="region" aria-label="Workspace members" tabIndex={0}>
      <table className={`directory-table${compact ? " directory-compact" : ""}`}>
        <thead><tr><th scope="col">Member</th><th scope="col">Role</th><th scope="col">Age</th><th scope="col">Address</th><th scope="col">Member ID</th></tr></thead>
        <tbody>{rows.map((user) => (
          <tr key={user.id}>
            <td><div className="directory-person"><Avatar name={user.name} /><div><span className="person-name">{user.name}{user.id === currentUser.id && <span className="you-label">You</span>}</span><span className="person-email">{user.email}</span></div></div></td>
            <td>{editable ? <select className={`role-select ${user.rollID === 1 ? "role-admin" : "role-user"}`} aria-label={`Role for ${user.name}`} value={user.rollID} onChange={(event) => handleAccessChange(user.id, Number(event.target.value))}><option value={1}>Admin</option><option value={2}>User</option></select> : <span className={`role-badge ${user.rollID === 1 ? "role-admin" : "role-user"}`}>{user.rollID === 1 ? "Admin" : "User"}</span>}</td>
            <td>{user.age || "—"}</td><td className="address-cell">{user.address || "—"}</td><td className="member-id">#{String(user.id).padStart(3, "0")}</td>
          </tr>
        ))}</tbody>
      </table>
      {rows.length === 0 && <div className="directory-empty"><PeopleOutline /><h3>{users.length ? "No matching members" : "Your team starts here"}</h3><p>{users.length ? "Try another name, email, or role filter." : "Add your first user to get your workspace going."}</p>{users.length ? <button className="text-button" onClick={() => { setSearch(""); setRoleFilter("all"); }}>Clear filters</button> : <button className="text-button" onClick={() => section === "users" ? openForm() : navigate("/users")}>Add a user <ArrowForward /></button>}</div>}
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="workspace">
        <a className="skip-link" href="#workspace-main">Skip to content</a>
        <aside className="workspace-sidebar">
          <Link className="workspace-brand" to="/dashboard" aria-label="LRIT workspace home"><span className="brand-symbol"><span /><span /><span /><span /></span><span>LRIT<span className="brand-caption">WORKSPACE</span></span></Link>
          <p className="nav-caption">WORKSPACE</p>
          <nav className="workspace-nav" aria-label="Main navigation">
            <NavLink to="/dashboard"><DashboardOutlined />Dashboard</NavLink>
            {isAdmin && <NavLink to="/users"><PeopleOutline />Users<span className="nav-count">{users.length}</span></NavLink>}
            <NavLink to="/profile"><PersonOutline />My profile</NavLink>
            <NavLink to="/settings"><SettingsOutlined />Settings</NavLink>
          </nav>
          <div className="sidebar-bottom">
            <div className="workspace-note"><span className="status-dot" /><span>Your workspace.<br /><strong>Everything in one place.</strong></span></div>
            <Link to="/profile" className="sidebar-account"><Avatar name={currentUser.name} /><span><strong>{currentUser.name}</strong><small>{isAdmin ? "Administrator" : "Workspace member"}</small></span></Link>
            <button className="signout-button" onClick={handleLogout}><LogoutOutlined />Sign out</button>
          </div>
        </aside>

        <div className="workspace-body">
          <header className="workspace-topbar"><div className="breadcrumb">Workspace<span>/</span><strong>{sections[section]}</strong></div><Link className="topbar-profile" to="/profile" aria-label="View your profile"><span>{currentUser.name}</span><Avatar name={currentUser.name} /></Link></header>
          <main id="workspace-main" className="workspace-main" tabIndex={-1}>
            <div className="page-heading"><div><p className="eyebrow">{section === "dashboard" ? "YOUR WORKSPACE, AT A GLANCE" : section === "users" ? "PEOPLE & ACCESS" : "YOUR ACCOUNT"}</p><h1>{section === "dashboard" ? `Welcome back, ${currentUser.name.split(" ")[0]}.` : section === "users" ? "People make it happen." : sections[section]}</h1><p className="page-description">{section === "dashboard" ? "A little overview to get your day started." : section === "users" ? "Manage your members and give everyone the right access." : section === "profile" ? "A home for your personal details and workspace access." : "Make this workspace feel a little more like you."}</p></div>{section === "users" ? <Button variant="contained" disableElevation startIcon={<Add />} onClick={openForm}>Create user</Button> : <span className="page-date">{new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date())}</span>}</div>

            {section === "dashboard" && <>
              <div className="overview-stats">
                {(isAdmin ? [
                  { label: "Total members", value: users.length, detail: "People in your workspace", icon: <PeopleOutline />, color: "sage" },
                  { label: "Administrators", value: admins, detail: "Managing people & access", icon: <ShieldOutlined />, color: "sand" },
                  { label: "Standard users", value: users.length - admins, detail: "Part of your workspace", icon: <PersonOutline />, color: "lavender" },
                ] : [
                  { label: "Your role", value: "Member", detail: "Standard workspace access", icon: <ShieldOutlined />, color: "sage" },
                  { label: "Account status", value: "Signed in", detail: "You're ready to get started", icon: <CheckCircleOutline />, color: "sand" },
                  { label: "Your member ID", value: `#${String(currentUser.id).padStart(3, "0")}`, detail: "Your workspace identity", icon: <PersonOutline />, color: "lavender" },
                ]).map((stat) => <article className="stat-card" key={stat.label}><div className="stat-top"><span>{stat.label}</span><span className={`stat-icon ${stat.color}`}>{stat.icon}</span></div><strong className="stat-value">{stat.value}</strong><p>{stat.detail}</p></article>)}
              </div>
              <div className="overview-grid">
                <section className="workspace-panel"><div className="panel-heading"><div><h2>{isAdmin ? "Your people" : "Your profile"}</h2><p>{isAdmin ? "A shared space for your whole team." : "The details that make you, you."}</p></div><Link className="text-button" to={isAdmin ? "/users" : "/profile"}>{isAdmin ? "View all" : "View profile"}<ArrowForward /></Link></div>{isAdmin ? renderTable(users.slice(0, 5)) : <div className="profile-preview"><Avatar name={currentUser.name} large /><h3>{currentUser.name}</h3><p>{currentUser.email}</p><span className="role-badge role-user">Workspace member</span></div>}</section>
                <aside className="workspace-welcome"><span className="welcome-kicker"><span className="status-dot" /> ROOM TO GROW</span><div className="welcome-art" aria-hidden="true"><div className="art-orbit" /><span className="art-square"><PeopleOutline /></span><span className="art-small"><Add /></span></div><h2>A good day starts<br />with good people.</h2><p>{isAdmin ? "Bring your team together. Add members and keep everyone connected." : "You're part of the team. Explore your profile and make yourself at home."}</p><Link to={isAdmin ? "/users" : "/profile"}>{isAdmin ? "Manage your team" : "Explore your profile"}<ArrowForward /></Link></aside>
              </div>
              <section className="quick-links" aria-label="Quick links"><Link to="/profile"><span className="quick-link-icon"><PersonOutline /></span><span><strong>Make yourself at home</strong><small>View your profile and account details</small></span><ArrowForward /></Link><Link to="/settings"><span className="quick-link-icon"><Tune /></span><span><strong>Your workspace, your way</strong><small>Adjust your display preferences</small></span><ArrowForward /></Link></section>
            </>}

            {section === "users" && <section className="workspace-panel"><div className="panel-heading"><div><h2>All members <span className="count-badge">{users.length}</span></h2><p>Your team directory and account roles.</p></div></div><div className="directory-toolbar"><label className="directory-search"><Search /><input type="search" placeholder="Search by name, email, or address…" aria-label="Search members" value={search} onChange={(event) => setSearch(event.target.value)} /></label><label className="directory-filter"><span>Role</span><select aria-label="Filter by role" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}><option value="all">All roles</option><option value="1">Admin</option><option value="2">User</option></select></label></div>{renderTable(visibleUsers, true)}<div className="directory-footer">Showing {visibleUsers.length} of {users.length} {users.length === 1 ? "member" : "members"}<span>Role changes are saved automatically</span></div></section>}

            {section === "profile" && <section className="workspace-panel profile-panel"><div className="profile-banner" /><div className="profile-intro"><Avatar name={currentUser.name} large /><div><h2>{currentUser.name}</h2><p>{currentUser.email}</p></div><span className={`role-badge ${isAdmin ? "role-admin" : "role-user"}`}>{isAdmin ? "Administrator" : "Member"}</span></div><div className="profile-details"><h3>Personal information</h3><p>Your registered account details.</p><dl>{[["Full name", currentUser.name], ["Email address", currentUser.email], ["Age", currentUser.age], ["Address", currentUser.address], ["Member ID", `#${String(currentUser.id).padStart(3, "0")}`], ["Workspace role", isAdmin ? "Administrator" : "User"]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || "Not provided"}</dd></div>)}</dl></div></section>}

            {section === "settings" && <div className="settings-stack"><section className="workspace-panel"><div className="panel-heading"><div><h2>Display preferences</h2><p>A comfortable space to get things done.</p></div><Tune /></div><div className="setting-row"><div><h3>Compact member directory</h3><p>Use smaller rows to see more members at once.</p></div><button type="button" role="switch" aria-checked={compact} aria-label="Compact member directory" className={`preference-switch${compact ? " enabled" : ""}`} onClick={() => { const next = !compact; setCompact(next); localStorage.setItem("compactDirectory", JSON.stringify(next)); setNotice("Display preference saved."); }}><span /></button></div></section><section className="workspace-panel"><div className="panel-heading"><div><h2>Account & access</h2><p>Your current workspace session.</p></div><ShieldOutlined /></div><div className="setting-row"><div><h3>Signed in as {currentUser.name}</h3><p>{currentUser.email} · {isAdmin ? "Administrator" : "Member"}</p></div><Button variant="outlined" onClick={handleLogout} startIcon={<LogoutOutlined />}>Sign out</Button></div></section></div>}
            <footer className="workspace-footer"><span>LRIT Workspace</span><span>A little more organized. A lot more together.</span></footer>
          </main>
        </div>
      </div>

      <Dialog open={showForm && isAdmin} onClose={() => setShowForm(false)} fullWidth maxWidth="sm" aria-labelledby="create-user-title">
        <form onSubmit={handleFormSubmit}>
          <DialogTitle id="create-user-title" sx={{ pr: 7 }}>Add someone to the team<IconButton aria-label="Close create user form" onClick={() => setShowForm(false)} sx={{ position: "absolute", right: 12, top: 12 }}><Close /></IconButton></DialogTitle>
          <DialogContent><p className="create-user-description">Create a member account. You can update their role in the directory.</p>{formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}<div className="create-user-fields">{[{ name: "name", label: "Full name", autoComplete: "name" }, { name: "email", label: "Email address", type: "email", autoComplete: "email" }, { name: "age", label: "Age", type: "number" }, { name: "address", label: "Address", autoComplete: "street-address" }, { name: "password", label: "Password", type: "password", autoComplete: "new-password" }].map((field, index) => <TextField key={field.name} {...field} autoFocus={index === 0} required fullWidth value={formData[field.name]} onChange={(event) => setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }))} inputProps={field.name === "age" ? { min: 1, max: 120, step: 1 } : undefined} helperText={field.name === "password" ? "At least 8 characters, an uppercase letter, and a special character (!@#$%^&*)." : undefined} />)}</div></DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}><Button onClick={() => setShowForm(false)}>Cancel</Button><Button type="submit" variant="contained" disableElevation startIcon={<Add />}>Create user</Button></DialogActions>
        </form>
      </Dialog>
      <Snackbar open={Boolean(notice)} autoHideDuration={4000} onClose={() => setNotice("")} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}><Alert severity="success" variant="filled" onClose={() => setNotice("")}>{notice}</Alert></Snackbar>
    </ThemeProvider>
  );
}

export default Dashboard;
