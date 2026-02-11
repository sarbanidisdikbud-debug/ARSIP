
import React, { useState } from 'react';
import { FileText, Lock, User as UserIcon, AlertCircle, Loader2 } from 'lucide-react';
import { User } from '../types.ts';

interface Props {
  onLogin: (user: User) => void;
  users: User[];
}

export default function Login({ onLogin, users }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Dynamic Authentication Logic
    setTimeout(() => {
      const foundUser = users.find(u => u.username === username && u.password === password);
      
      if (foundUser) {
        onLogin(foundUser);
      } else {
        setError('Username atau password salah.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 mb-4">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 leading-tight">ArsipSurat <br />BP PAUD & PNF</h1>
          <p className="text-slate-500 mt-2">Silakan login untuk mengakses sistem</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 animate-in fade-in zoom-in duration-500">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 p-3 rounded-xl flex items-center gap-3 text-sm animate-bounce">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="admin / user"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="admin123 / user123"
                  required
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Masuk ke Sistem'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-center text-xs text-slate-400 uppercase font-bold tracking-widest">Demo Akun</p>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="text-[10px] bg-slate-50 p-2 rounded-lg border border-slate-100">
                <p className="text-slate-600 font-bold">ADMIN</p>
                <p className="text-slate-400">admin / admin123</p>
              </div>
              <div className="text-[10px] bg-slate-50 p-2 rounded-lg border border-slate-100">
                <p className="text-slate-600 font-bold">USER</p>
                <p className="text-slate-400">user / user123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
