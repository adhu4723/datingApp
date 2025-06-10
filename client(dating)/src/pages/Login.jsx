import axios from 'axios';
import React, { useContext, useState } from 'react';
import InputField from '../components/common/InputField'; // Make sure the path is correct
import Button from '../components/common/Button';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  
  const [email, setemail] = useState('');
  const [password, setpass] = useState('');
  const [error, setError] = useState('');
   const { login } = useContext(AuthContext);
   const navigate=useNavigate()

   const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(email,password);
            alert(res.message||'login success');
            navigate('/')
        } catch (err) {
            alert(err.message || 'login failed');
        }
    };

 

  return (
    <div className="  flex items-center justify-center  h-[80vh] ">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full  max-w-md space-y-2"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Log in to your account
        </h2>

        <div className="space-y-4">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="you@example.com"
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setpass(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 mt-3 text-center">{error}</p>
        )}

        <div className="flex justify-end mt-2 text-sm">
          <a href="#" className="text-red-500 hover:underline">
            Forgot password?
          </a>
        </div>

        <Button label={'Log in'} />

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-red-500 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
