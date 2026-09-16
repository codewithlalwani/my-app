import { getUsers } from "./storage";

export const normalizeEmail = (email = "") => email.trim().toLowerCase();
export const passwordHint = "Use at least 8 characters, one uppercase letter, and a special character (!@#$%^&*).";

// Registration and the admin directory create accounts in the same store.
export function createAccount(formData, { registration = false } = {}) {
  const users = getUsers();
  const data = {
    name: formData.name.trim(),
    email: normalizeEmail(formData.email),
    age: String(formData.age).trim(),
    address: formData.address.trim(),
    password: formData.password,
  };
  if (Object.values(data).some((value) => !value.trim())) {
    throw new Error("Please complete every field.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new Error("Please enter a valid email address.");
  }
  if (!Number.isInteger(Number(data.age)) || Number(data.age) < 1 || Number(data.age) > 120) {
    throw new Error("Please enter an age between 1 and 120.");
  }
  if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(data.password)) {
    throw new Error(passwordHint);
  }
  if (users.some((user) => normalizeEmail(user.email) === data.email)) {
    throw new Error("An account with this email already exists.");
  }
  const user = {
    ...data,
    id: Math.max(0, ...users.map((account) => Number(account.id) || 0)) + 1,
    // The first registration sets up the workspace; further accounts are members.
    rollID: registration && users.length === 0 ? 1 : 2,
    token: 0,
  };
  localStorage.setItem("users", JSON.stringify([...users, user]));
  return user;
}

export function signIn(email, password) {
  const user = getUsers().find((account) => normalizeEmail(account.email) === normalizeEmail(email) && account.password === password);
  if (!user) throw new Error("The email or password is incorrect. Please try again.");
  const currentUser = { ...user, token: 1 };
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  return currentUser;
}
