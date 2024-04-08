import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginInToken } from '../Redux/LoginSlice';

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    debugger
    // e.preventDefault();
    dispatch(loginInToken({ email, password }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={()=>handleSubmit()}>Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
