import { AuthService } from "../../service/auth.service.ts";
import { Link, useNavigate } from "react-router";
import * as React from "react";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const fetchPromise = AuthService.login(email, password);

    const timer = setTimeout(() => {
      fetchPromise
        .then((data) => {
          console.log("Connexion :", data);
          localStorage.setItem("hasToken", data.token);
          localStorage.setItem("user_id", data.user.id_utilisateur);
          localStorage.setItem("name", data.user.prenom);
          localStorage.setItem("role", data.user.role);
          setLoading(false);
          navigate("/");
        })
        .catch((err) => {
          console.error("Erreur lors de la connexion de l'utilisateur :", err);
          setLoading(false);
        });
    }, 1000);

    return () => clearTimeout(timer);
  };

  return (
    <>
      <div className="flex flex-col gap-10 px-4 py-8">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-1 font-medium">
            UCP <span className="text-orange-500 animate-pulse">•</span>
          </div>
          <span className="text-[10px] text-gray-500">FR • V1.1</span>
        </div>

        <div className="flex justify-center items-center w-full">
          <div className="w-16 h-16 flex items-center justify-center">
            <svg
              className="w-full h-full"
              viewBox="0 0 98 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="28.3333"
                width="56.6667"
                height="56.6667"
                fill="#FF6A00"
              />
              <rect
                x="72.5333"
                y="44.2"
                width="24.9333"
                height="24.9333"
                fill="#8640FF"
              />
              <rect
                x="28.3334"
                width="56.6667"
                height="56.6667"
                fill="#FF8F40"
              />
              <rect
                x="28.3334"
                y="28.3333"
                width="28.3333"
                height="28.3333"
                fill="#FFCEAC"
                fill-opacity="0.51"
              />
              <rect
                x="72.5333"
                y="44.2"
                width="12.4667"
                height="12.4667"
                fill="#8640FF"
                fill-opacity="0.37"
              />
            </svg>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <form
            onSubmit={handleLoginSubmit}
            className="md:w-96 w-80 flex flex-col justify-center gap-6"
          >
            <div className="flex flex-col items-center gap-3 w-full mt-2">
              <h2 className="text-4xl font-medium">Connexion</h2>
              <p className="text-sm text-center text-gray-500/90 leading-snug">
                Bon retour parmi nous ! Connectez-vous pour continuer
              </p>
            </div>

            <div>
              <label className="input validator w-full h-12">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <div className="validator-hint hidden text-xs text-gray-400">
                Entrer une adresse email valide
              </div>
            </div>
            <div>
              <label className="input validator w-full h-12">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  minLength={8}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-soft btn-info w-full mt-2 active:scale-95 transition-transform"
            >
              {loading ? "Connexion en cours..." : "Accéder à mon espace"}
            </button>

            <div className="flex w-full flex-col">
              <div className="divider">Ou créer un compte</div>
            </div>

            <p className="text-gray-500/90 text-sm text-center">
              Vous n'avez pas encore de compte ?{" "}
              <Link className="text-indigo-400 underline" to="/register">
                S'inscrire
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
