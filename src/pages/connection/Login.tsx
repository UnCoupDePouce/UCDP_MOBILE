import { useState } from "react";
import { Link, useNavigate } from "react-router";
import IonIcon from "@reacticons/ionicons";
import Message from "../../components/Message.tsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    status: number;
    message: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/local/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();
      console.log("Réponse API :", data);

      if (!response.ok) {
        setMessage({
          status: response.status,
          message: data.message || "Erreur lors de la connexion",
        });
      } else {
        setMessage({ status: 200, message: "Connexion réussie 🎉" });
        localStorage.setItem("hasToken", data.token);
        localStorage.setItem("user_id", data.user.id_utilisateur);
        localStorage.setItem("status", data.user.role);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setMessage({ status: 500, message: "Erreur serveur" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-neutral-950 flex flex-col px-8 pb-8 pt-12 overflow-y-auto transition-colors duration-300">
      {message && <Message data={message} />}

      <div className="mb-10">
        <h2 className="text-4xl font-black tracking-tighter uppercase leading-none text-black dark:text-white">
          Bon retour <br /> parmi nous
        </h2>
        <div className="h-1.5 w-12 bg-black dark:bg-white mt-4 rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <IonIcon name="mail-outline" className="text-xl text-gray-400" />
            </div>
            <input
              className="w-full bg-gray-100 dark:bg-neutral-900 border-none h-16 pl-14 pr-14 rounded-2xl focus:ring-2 focus:ring-black dark:focus:ring-white text-black dark:text-white transition-all outline-none"
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
              className="w-full bg-gray-100 dark:bg-neutral-900 border-none h-16 pl-14 pr-14 rounded-2xl focus:ring-2 focus:ring-black dark:focus:ring-white text-black dark:text-white transition-all outline-none"
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

        <div className="text-right">
          <button
            type="button"
            className="text-xs font-bold uppercase tracking-widest text-gray-400 active:text-black transition-colors"
          >
            Oublié ?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black text-lg active:scale-95 transition-all uppercase shadow-lg shadow-black/10 dark:shadow-white/5 flex justify-center items-center mt-4"
        >
          {isLoading ? (
            <span className="animate-pulse">Connexion...</span>
          ) : (
            "Se connecter"
          )}
        </button>
      </form>

      <div className="mt-auto pt-8 text-center">
        <p className="text-gray-400 dark:text-neutral-600 text-sm">
          Pas de compte ?{" "}
          <Link
            to="/register"
            className="text-black dark:text-white font-black uppercase ml-1"
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
