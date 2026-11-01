import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Logo } from '../components/common/Logo';
import { ShieldCheck, ArrowRight, User as UserIcon, Mail, Phone, Lock } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register, setCurrentPage, addToast } = useStore();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dialCode, setDialCode] = useState('+1');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      addToast('Please accept the REDROOM Terms of Service to register.', 'error');
      return;
    }

    if (password.length < 6) {
      addToast('Password must be at least 6 characters.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }

    register({
      firstname,
      lastname,
      username,
      email,
      dial_code: dialCode,
      mobile
    });
  };

  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center bg-[#050505] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Logo size="lg" onClick={() => setCurrentPage('home')} />
          </div>
          <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-white">
            Create Client Account
          </h2>
          <p className="text-xs text-[#858585]">
            Register to unlock instant digital card purchases, personal vault, and live crypto deposit
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#111111] border border-[#292929] space-y-5 shadow-2xl">
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                First Name *
              </label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="John"
                className="w-full bg-[#0A0A0A] border border-[#292929] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                Last Name *
              </label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Doe"
                className="w-full bg-[#0A0A0A] border border-[#292929] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                Username *
              </label>
              <div className="relative">
                <UserIcon className="w-3.5 h-3.5 text-[#858585] absolute left-3 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="johndoe"
                  className="w-full bg-[#0A0A0A] border border-[#292929] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-[#858585] absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-[#0A0A0A] border border-[#292929] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
              Mobile Contact *
            </label>
            <div className="flex gap-2">
              <select
                value={dialCode}
                onChange={(e) => setDialCode(e.target.value)}
                className="bg-[#0A0A0A] border border-[#292929] rounded-xl px-2.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C1121F]"
              >
                <option value="+1">+1 (US/CA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+49">+49 (DE)</option>
                <option value="+33">+33 (FR)</option>
                <option value="+61">+61 (AU)</option>
                <option value="+91">+91 (IN)</option>
              </select>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="555-012-3456"
                className="flex-1 bg-[#0A0A0A] border border-[#292929] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                Password *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0A0A0A] border border-[#292929] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                Confirm Password *
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0A0A0A] border border-[#292929] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                required
              />
            </div>
          </div>

          {/* Terms Acceptance */}
          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-[#C1121F] bg-[#0A0A0A] border-[#292929] rounded"
              required
            />
            <label htmlFor="terms" className="ml-2.5 text-xs text-[#858585] leading-relaxed">
              I agree to the <span className="text-white hover:underline cursor-pointer" onClick={() => setCurrentPage('policy')}>Terms of Service</span> and <span className="text-white hover:underline cursor-pointer" onClick={() => setCurrentPage('policy')}>Privacy Policy</span> of REDROOM marketplace.
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 text-xs font-bold uppercase tracking-widest text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            CREATE REDROOM ACCOUNT <ArrowRight className="w-4 h-4" />
          </button>

          {/* Login Link */}
          <div className="pt-1 text-center text-xs text-[#858585]">
            Already registered?{' '}
            <button
              type="button"
              onClick={() => setCurrentPage('login')}
              className="font-semibold text-white hover:text-[#C1121F] underline ml-1"
            >
              Sign In here
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
