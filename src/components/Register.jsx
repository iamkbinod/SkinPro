import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div 
      className="relative flex items-center justify-center h-screen w-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('/src/assets/images/logo.jpg')" }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Styled SkinPro logo with underline */}
      <h1 className="absolute top-6 left-6 text-white text-7xl font-extrabold tracking-wide 
        bg-gradient-to-r from-blue-300 via-purple-400 to-pink-500 text-transparent bg-clip-text 
        drop-shadow-lg underline decoration-transparent underline-offset-4">
        SkinPro
      </h1>

      {/* Slogan below the SkinPro logo */}
      <h2 className="absolute top-24 left-8 text-white text-2xl font-semibold tracking-wide 
        bg-gradient-to-r from-blue-300 via-purple-400 to-pink-500 text-transparent bg-clip-text 
        drop-shadow-lg">
        Glow with Confidence
      </h2>

      {/* Register Box with Glassmorphism */}
      <div className="relative z-10 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-xl max-w-sm w-full border border-white/30">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Register to SkinPro</h2>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-white">Email address</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none transition duration-200"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-sm text-center text-white">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/')}
            className="text-blue-300 font-semibold hover:underline focus:outline-none transition duration-200"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}
