'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RegistrationForm = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const fname = formData.get('fname');
      const lname = formData.get('lname');
      const email = formData.get('email');
      const password = formData.get('password');

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          password,
        }),
      });

      if (res.status === 201) {
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data?.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  }

  return (
    <div className="w-full bg-[#0d1622] absolute p-6 shadow-lg rounded-2xl border border-[#2c3e57]">
      <h2 className="text-2xl font-serif font-bold text-[#93c5fd] text-center mb-4">Create an Account</h2>

      {error && (
        <p className="text-red-500 text-center font-semibold text-sm mb-4">{error}</p>
      )}

      <form onSubmit={onSubmit} className="space-y-4 text-[#dbeafe] font-serif">
        <div>
          <label htmlFor="fname" className="block mb-1 text-left text-[#93c5fd]">First Name</label>
          <input
            type="text"
            name="fname"
            id="fname"
            required
            placeholder="John"
            className="w-full px-4 py-2 border border-[#2c3e57] rounded-md bg-transparent text-[#e0f2fe] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2c3e57] font-serif"
          />
        </div>

        <div>
          <label htmlFor="lname" className="block mb-1 text-left text-[#93c5fd]">Last Name</label>
          <input
            type="text"
            name="lname"
            id="lname"
            required
            placeholder="Doe"
            className="w-full px-4 py-2 border border-[#2c3e57] rounded-md bg-transparent text-[#e0f2fe] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2c3e57] font-serif"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-left text-[#93c5fd]">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="john@example.com"
            className="w-full px-4 py-2 border border-[#2c3e57] rounded-md bg-transparent text-[#e0f2fe] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2c3e57] font-serif"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-left text-[#93c5fd]">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-[#2c3e57] rounded-md bg-transparent text-[#c9e7fc] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2c3e57] font-serif"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 cursor-pointer bg-[#2c3e57] text-white rounded-md font-bold hover:bg-[#1d2d45] transition-all duration-300"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
