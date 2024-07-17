import { useEffect, useState, useContext } from 'react';
import { login, logout } from '../controllers/auth';
import AuthContext from '../context/AuthProvider';

// The login view
function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { auth, setAuth } = useContext(AuthContext); // import the setAuth state from AuthContext provider.

  useEffect(() => {
    // If there's already a user object in auth context, we are already logged in.
    if (auth?.user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [auth]); // Monitor for changes in the auth state

  const logoutAction = async () => {
    try {
      await logout();
      // Clear the user and token from Auth context
      setAuth({ user: null, token: null }); // TODO: move this to the auth controller
      console.log('logged out');
      setIsLoggedIn(false);
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <div id="wrapper" className="grid h-screen place-items-center">
      <div className="relative -top-20">
        <h2 className="text-2xl text-center mb-8 relative">Login</h2>
        <h1 className="text-2xl text-red-600 my-6">
          {isLoggedIn ? (
            <span>You are logged in</span>
          ) : (
            <span>You are not logged in</span>
          )}
        </h1>
      </div>
      {isLoggedIn ? (
        <div className="my-20">
          <LogoutButton onClick={logoutAction} />
        </div>
      ) : (
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}
const LogoutButton = ({ onClick }) => (
  <button
    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="button"
    onClick={onClick}
  >
    Sign out
  </button>
);

// The login form
function LoginForm({ setIsLoggedIn }) {
  const { setAuth } = useContext(AuthContext); // import the setAuth state from AuthContext provider.
  const [hasError, setHasError] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [canSubmit, setCanSubmit] = useState(false);
  const forgotPasswordUrl = '#';

  // Login handler for the login form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ email, password });
      // Set user in AuthContext
      setAuth({ user });
      console.log('user: ', user);
      setIsLoggedIn(true);
      setHasError(false);
      console.log('logged in');
    } catch (err) {
      console.log('login failed: ' + err.message);
      setHasError(true);
    }
  };

  // Enable the submit button on all fields filled
  useEffect(() => {
    if (email?.length && password?.length) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [email, password]);

  return (
    <form
      id="login"
      method="POST"
      action="#"
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3 min-w-72"
      onSubmit={handleSubmit}
    >
      {hasError && (
        <div className="h-12 warn text-red-500 text-center text-xl">
          There was an error with your login.
        </div>
      )}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={`shadow appearance-none border ${
            hasError ? 'border-red-600' : ''
          } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
          id="password"
          type="password"
          placeholder="******************"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {hasError && (
          <p className="text-red-500 text-xs italic hidden">
            Please choose a password.
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className={`${
            canSubmit ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300'
          } text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          type="submit"
          disabled={!canSubmit}
        >
          Sign In
        </button>
        <a
          className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-600"
          href={forgotPasswordUrl}
        >
          Forgot Password?
        </a>
      </div>
    </form>
  );
}
export default LoginPage;