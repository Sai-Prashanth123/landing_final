"use client";

import { useAuth } from '@/lib/auth/AuthContext';

export default function LoginButton() {
  const { isAuthenticated, login, logout } = useAuth();

  const handleClick = (e) => {
    e.preventDefault();
    // Original auth functionality (optional)
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
    // Redirect to the specified URL
    window.location.href = "https://yellow-field-04c8fdc10.6.azurestaticapps.net";
  };

  return (
    <button onClick={handleClick}>
      {isAuthenticated ? 'Sign Out' : 'Sign In'}
    </button>
  );
} 