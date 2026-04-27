import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, Check, X } from 'lucide-react';
import './index.css';

function App() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);

  const [reqs, setReqs] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    special: false
  });

  useEffect(() => {
    checkPassword(password);
  }, [password]);

  const checkPassword = (pwd) => {
    const hasLength = pwd.length >= 8;
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    setReqs({
      length: hasLength,
      lowercase: hasLower,
      uppercase: hasUpper,
      special: hasSpecial
    });

    let score = 0;

    if (hasLength) score++;
    if (hasLower) score++;
    if (hasUpper) score++;
    if (hasSpecial) score++;

    setStrength(score);
  };

  const getStrengthLabel = () => {
    if(password.length===0) return 'Enter a password';
    if(strength<=1) return 'Weak';
    if(strength===2) return 'Fair';
    if(strength===3) return 'Good';
    if(strength===4) return 'Strong';
    return '';
  };

  const getStrengthColor = (index) => {
    if(index >= strength || password.length===0)
      return 'rgba(255,255,255,0.1)';

    if(strength===1) return 'var(--strength-0)';
    if(strength===2) return 'var(--strength-1)';
    if(strength===3) return 'var(--strength-2)';
    if(strength===4) return 'var(--strength-4)';
  };

  return (
    <>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="glass-container">
        <h1>Check Your Password</h1>
        <p className="subtitle">strength</p>

        <div className="input-group">
          <Lock className="input-icon" size={20} />

          <input
            type={showPassword ? 'text' : 'password'}
            className="password-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            type="button"
            className="toggle-visibility"
            onClick={()=>setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
          </button>
        </div>

        <div className="strength-section">
          <div className="strength-header">
            <span>Strength:</span>
            <span>{getStrengthLabel()}</span>
          </div>

          <div className="strength-bars">
            {[0,1,2,3].map((index)=>(
              <div
                key={index}
                className="bar"
                style={{
                  backgroundColor:getStrengthColor(index)
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="requirements-list">

          <div className={`requirement-item ${reqs.length ? 'met' : ''}`}>
            <div className="req-icon">
              {reqs.length ? <Check size={12}/> : <X size={12}/>}
            </div>
            <span>At least 8 characters</span>
          </div>

          <div className={`requirement-item ${reqs.uppercase ? 'met' : ''}`}>
            <div className="req-icon">
              {reqs.uppercase ? <Check size={12}/> : <X size={12}/>}
            </div>
            <span>One uppercase letter</span>
          </div>

          <div className={`requirement-item ${reqs.lowercase ? 'met' : ''}`}>
            <div className="req-icon">
              {reqs.lowercase ? <Check size={12}/> : <X size={12}/>}
            </div>
            <span>One lowercase letter</span>
          </div>

          <div className={`requirement-item ${reqs.special ? 'met' : ''}`}>
            <div className="req-icon">
              {reqs.special ? <Check size={12}/> : <X size={12}/>}
            </div>
            <span>One special character</span>
          </div>

        </div>

      </div>
    </>
  );
}

export default App;
