import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Logo } from '../components/common/Logo';
import { Lock, User as UserIcon, ArrowRight, ShieldCheck, ShieldAlert } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, adminLogin, setCurrentPage, addToast } = useStore();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      addToast('Please enter both your identifier and password.', 'error');
      return;
    }

    if (isAdminMode) {
      const ok = adminLogin(identifier, password);
      if (ok) {
        setCurrentPage('dashboard');
      }
    } else {
      const ok = login(identifier, password);
      if (ok) {
        setCurrentPage('dashboard');
      }
    }
  };

  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center bg-[#050505] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Logo size="lg" onClick={() => setCurrentPage('home')} />
          </div>
          <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-white">
            {isAdminMode ? 'Administrator Sign In' : 'Customer Account Login'}
          </h2>
          <p className="text-xs text-[#858585]">
            {isAdminMode
              ? 'Authorized staff access for deposit verification and queue auditing'
              : 'Enter your credentials to access your private digital vault and orders'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center justify-center gap-2 p-1 bg-[#111111] border border-[#292929] rounded-xl text-xs">
          <button
            type="button"
            onClick={() => {
              setIsAdminMode(false);
              setIdentifier('');
              setPassword('');
            }}
            className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors ${
              !isAdminMode
                ? 'bg-[#C1121F] text-white font-semibold shadow-sm'
                : 'text-[#858585] hover:text-white'
            }`}
          >
            Customer Login
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAdminMode(true);
              setIdentifier('Web');
              setPassword('adminpassword');
            }}
            className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 ${
              isAdminMode
                ? 'bg-amber-500 text-black font-bold shadow-sm'
                : 'text-[#858585] hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" /> Admin Desk
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#111111] border border-[#292929] space-y-5 shadow-2xl">
          <div className="space-y-4">
            
            {/* Username or Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                {isAdminMode ? 'Admin Username / Email' : 'Username or Email'}
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#858585] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={isAdminMode ? 'Web or supportteam@germanmarket' : 'Enter your registered username or email'}
                  className="w-full bg-[#0A0A0A] border border-[#292929] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                {!isAdminMode && (
                  <button
                    type="button"
                    onClick={() => addToast('Please contact REDROOM Support to initiate an account credential reset.', 'info')}
                    className="text-[11px] text-[#C1121F] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-[#858585] absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0A0A0A] border border-[#292929] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-[#C1121F] bg-[#0A0A0A] border-[#292929] rounded"
              />
              <label htmlFor="remember-me" className="ml-2 text-xs text-[#858585]">
                Remember this device
              </label>
            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-3 px-4 text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
              isAdminMode
                ? 'bg-amber-400 hover:bg-amber-300 text-black'
                : 'bg-[#C1121F] hover:bg-[#E01B24] text-white'
            }`}
          >
            {isAdminMode ? 'AUTHENTICATE AS ADMIN' : 'SIGN IN TO REDROOM'} <ArrowRight className="w-4 h-4" />
          </button>

          {/* Register Link (if customer mode) */}
          {!isAdminMode && (
            <div className="pt-2 text-center text-xs text-[#858585]">
              New customer?{' '}
              <button
                type="button"
                onClick={() => setCurrentPage('register')}
                className="font-semibold text-white hover:text-[#C1121F] underline ml-1"
              >
                Register an account here
              </button>
            </div>
          )}

          {/* Security Marker */}
          <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#858585]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted Session Authentication</span>
          </div>

        </form>

      </div>
    </div>
  );
};
