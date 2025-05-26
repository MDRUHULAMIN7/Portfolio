'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { ImSpinner2 } from 'react-icons/im';

const RegistrationForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function onSubmit(event) {
  event.preventDefault();
  setLoading(true);
  setError('');

  try {
    const formData = new FormData(event.currentTarget);
    const fname = formData.get('fname');
    const lname = formData.get('lname');
    const email = formData.get('email');
    const password = formData.get('password');

    // Password length validation
    if (password.length < 8 || password.length > 12) {
      setError('Password must be between 8 and 12 characters.');
      setLoading(false);
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fname, lname, email, password }),
    });

    if (res.status === 201) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data?.message || 'Registration failed');
    }
  } catch (err) {
    setError(err.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="w-full bg-[#0d1622] absolute p-6 shadow-lg rounded-2xl border border-[#2c3e57] pointer-events-none select-none">
      <h2 className="text-2xl font-serif font-bold text-[#93c5fd] text-center mb-4">Create an Account</h2>
      {error && <p className="text-red-500 text-center font-semibold text-sm mb-4">{error}</p>}

      <form onSubmit={onSubmit} className="space-y-4 text-[#dbeafe] font-serif">
        <div>
          <label htmlFor="fname" className="block mb-1 text-left text-[#93c5fd]">First Name</label>
          <input
            type="text"
            name="fname"
            id="fname"
            required
            placeholder="John"
            className="w-full px-4 py-2 border border-[#2c3e57] rounded-md bg-transparent text-[#e0f2fe] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2c3e57]"
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
            className="w-full px-4 py-2 border border-[#2c3e57] rounded-md bg-transparent text-[#e0f2fe] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2c3e57]"
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
            className="w-full px-4 py-2 border border-[#2c3e57] rounded-md bg-transparent text-[#e0f2fe] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2c3e57]"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-left text-[#93c5fd]">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-[#2c3e57] rounded-md bg-transparent text-[#c9e7fc] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2c3e57]"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-xl text-[#94a3b8] cursor-pointer"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 py-2 cursor-pointer bg-[#2c3e57] text-white rounded-md font-bold hover:bg-[#1d2d45] transition-all duration-300 disabled:opacity-70"
        >
          {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
