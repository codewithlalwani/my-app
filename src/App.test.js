import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

const admin = { id: 1, name: 'Alex Morgan', email: 'alex@example.test', age: '30', address: 'Test workspace', rollID: 1, token: 1 };

beforeEach(() => {
  localStorage.clear();
});

afterEach(cleanup);

function visit(path, user) {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('users', JSON.stringify([user]));
  }
  window.history.replaceState({}, '', path);
  return render(<App />);
}

test('redirects the root to login when signed out', () => {
  visit('/');
  expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  expect(window.location.pathname).toBe('/login');
});

test('redirects the root to the dashboard when signed in', () => {
  visit('/', admin);
  expect(screen.getByRole('heading', { name: /Welcome back, Alex/ })).toBeInTheDocument();
  expect(window.location.pathname).toBe('/dashboard');
});

test('handles an invalid stored session without leaving a blank page', () => {
  localStorage.setItem('currentUser', '{broken');
  visit('/');
  expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
});

test('redirects unknown URLs to an existing page', () => {
  visit('/missing-page', admin);
  expect(window.location.pathname).toBe('/dashboard');
  expect(screen.getByRole('heading', { name: /Welcome back/ })).toBeInTheDocument();
});

test.each(['/dashboard', '/users', '/profile', '/settings'])('requires login for %s', (path) => {
  visit(path);
  expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  expect(window.location.pathname).toBe('/login');
});

test('keeps the user directory and creation controls hidden from members', () => {
  visit('/users', { ...admin, rollID: 2 });
  expect(window.location.pathname).toBe('/dashboard');
  expect(screen.queryByRole('link', { name: /^Users/ })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Create user/i })).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Welcome back/ })).toBeInTheDocument();
});
