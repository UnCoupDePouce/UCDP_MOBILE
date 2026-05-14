import { Link } from "react-router";
import IonIcon from "@reacticons/ionicons";
import { useLogin } from "./useLogin";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    handleSubmit,
  } = useLogin();

  return (
    <div className="fixed inset-0 flex flex-col px-8 pb-8 pt-12 overflow-y-auto transition-colors duration-300">
      <div className="mb-10">
        <h2 className="text-4xl font-black tracking-tighter uppercase leading-none text-black ">
          Bon retour <br /> parmi nous
        </h2>
        <div className="h-1.5 w-12 bg-black mt-4 rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <IonIcon name="mail-outline" className="text-xl text-gray-400" />
            </div>
            <input
              className="w-full bg-gray-100  border-none h-16 pl-14 pr-14 rounded-2xl focus:ring-2 focus:ring-black  text-black  transition-all outline-none"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <IonIcon
                name="lock-closed-outline"
                className="text-xl text-gray-400"
              />
            </div>
            <input
              className="w-full bg-gray-100 border-none h-16 pl-14 pr-14 rounded-2xl focus:ring-2 focus:ring-black text-black  transition-all outline-none"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Mot de passe"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-5 flex items-center text-gray-400 text-xl"
            >
              <IonIcon
                name={showPassword ? "eye-off-outline" : "eye-outline"}
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black  text-white  py-5 rounded-2xl font-black text-lg active:scale-95 transition-all uppercase shadow-lg shadow-black/10 flex justify-center items-center mt-4"
        >
          {isLoading ? (
            <span className="animate-pulse">Connexion...</span>
          ) : (
            "Se connecter"
          )}
        </button>
      </form>

      <div className="mt-auto pt-8 text-center">
        <p className="text-gray-400 text-sm">
          Pas de compte ?{" "}
          <Link
            to="/register"
            className="text-black  font-black uppercase ml-1"
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
