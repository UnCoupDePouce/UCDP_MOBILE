import * as React from "react";
import { useState } from "react";
import HeroSection from "../../components/HeroSection.tsx";
import { Link, useNavigate } from "react-router"; // Ajout de useNavigate
import { AuthService } from "../../service/auth.service.ts";

export default function RegisterPage() {
  const navigate = useNavigate(); // Initialisation du hook de navigation
  const [step, setStep] = useState(1);
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Remplacement de loading par un state local

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
    telephone: "",
    adresse: "",
    codePostal: "",
    ville: "",
    raisonSociale: "",
    metiers: [] as string[],
  });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (type) setStep(2);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);

    const roleBDD = type === "PRESTATAIRE" ? "PRESTATAIRE" : "CLIENT";

    AuthService.register({
      ...formData,
      raisonSociale: type === "PRESTATAIRE" ? formData.raisonSociale : "",
      metiers: type === "PRESTATAIRE" ? formData.metiers : [],
      role: roleBDD,
    })
      .then((data) => {
        localStorage.setItem("hasToken", data.token);
        localStorage.setItem("user_id", data.user.id_utilisateur);
        localStorage.setItem("name", data.user.prenom);
        localStorage.setItem("role", data.user.role);
        navigate("/");
      })
      .catch((err) => {
        console.error("Erreur lors de l'inscription :", err);
        alert("Une erreur est survenue pendant l'inscription.");
      })
      .finally(() => {
        setIsLoading(false);
      });
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

        {step === 2 && (
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
                  fillOpacity="0.51"
                />
                <rect
                  x="72.5333"
                  y="44.2"
                  width="12.4667"
                  height="12.4667"
                  fill="#8640FF"
                  fillOpacity="0.37"
                />
              </svg>
            </div>
          </div>
        )}

        {step === 1 && (
          <>
            <HeroSection />
            <div className="flex flex-col gap-4">
              <div
                onClick={() => setType("CLIENT")}
                className={`cursor-pointer border rounded-md p-5 flex justify-between items-center transition-all duration-300 ${
                  type === "CLIENT"
                    ? "bg-black text-white border-black"
                    : "bg-transparent border-black/20 hover:border-black hover:bg-black hover:text-white"
                }`}
              >
                <div>
                  <h3 className="uppercase font-black text-xl md:text-2xl leading-none">
                    Je cherche un artisan
                  </h3>
                  <p className="text-sm font-medium opacity-80 mt-1">
                    Particulier · Gratuit
                  </p>
                </div>
              </div>

              <div
                onClick={() => setType("PRESTATAIRE")}
                className={`cursor-pointer border rounded-md p-5 flex justify-between items-center transition-all duration-300 ${
                  type === "PRESTATAIRE"
                    ? "bg-black text-white border-black"
                    : "bg-transparent border-black/20 hover:border-black hover:bg-black hover:text-white"
                }`}
              >
                <div>
                  <h3 className="uppercase font-black text-xl md:text-2xl leading-none">
                    Je suis artisan
                  </h3>
                  <p className="text-sm font-medium opacity-80 mt-1">
                    Pro · Commission 4%
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="w-full flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-6 md:w-96 w-80"
          >
            {step === 2 && (
              <>
                <div className="flex flex-col items-center gap-3 w-full mt-2">
                  <h2 className="text-4xl font-medium">Créer un compte</h2>
                  <p className="text-sm text-center text-gray-500/90 leading-snug">
                    Nouveau ici ? Complétez vos informations pour commencer
                  </p>
                </div>

                <div className="divider">Informations du compte</div>

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
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
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
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                      placeholder="Mot de passe"
                      minLength={8}
                    />
                  </label>
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
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                      placeholder="Confirmer le mot de passe"
                      minLength={8}
                    />
                  </label>
                </div>

                <div className="divider">Informations personnelles</div>

                <div>
                  <label className="input validator w-full h-12">
                    <input
                      type="text"
                      placeholder="Nom"
                      value={formData.nom}
                      onChange={(e) =>
                        setFormData({ ...formData, nom: e.target.value })
                      }
                      required
                    />
                  </label>
                </div>

                <div>
                  <label className="input validator w-full h-12">
                    <input
                      type="text"
                      placeholder="Prénom"
                      value={formData.prenom}
                      onChange={(e) =>
                        setFormData({ ...formData, prenom: e.target.value })
                      }
                      required
                    />
                  </label>
                </div>

                <div>
                  <label className="input validator w-full h-12">
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      value={formData.telephone}
                      onChange={(e) =>
                        setFormData({ ...formData, telephone: e.target.value })
                      }
                      required
                      maxLength={10}
                    />
                  </label>
                </div>

                <div>
                  <fieldset className="fieldset">
                    <label className="input w-full h-12">
                      <input
                        type="text"
                        placeholder="Adresse"
                        value={formData.adresse}
                        onChange={(e) =>
                          setFormData({ ...formData, adresse: e.target.value })
                        }
                      />
                    </label>
                    <p className="label text-xs text-gray-400 mt-1">
                      Optionnel
                    </p>
                  </fieldset>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="input validator w-full h-12">
                      <input
                        type="text"
                        placeholder="Code postal"
                        value={formData.codePostal}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            codePostal: e.target.value,
                          })
                        }
                        required
                        maxLength={5}
                      />
                    </label>
                  </div>

                  <div className="flex-1">
                    <label className="input validator w-full h-12">
                      <input
                        type="text"
                        placeholder="Ville"
                        value={formData.ville}
                        onChange={(e) =>
                          setFormData({ ...formData, ville: e.target.value })
                        }
                        required
                      />
                    </label>
                  </div>
                </div>

                {type === "artisan" && (
                  <>
                    <div className="divider">Informations d'entreprise</div>
                    <div>
                      <label className="input validator w-full h-12">
                        <input
                          type="text"
                          placeholder="Raison sociale"
                          value={formData.raisonSociale}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              raisonSociale: e.target.value,
                            })
                          }
                          required
                        />
                      </label>
                    </div>

                    <div>
                      <label className="input validator w-full h-12">
                        <input
                          type="text"
                          placeholder="Métiers (ex: Plombier, Électricien)"
                          value={formData.metiers.join(", ")}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              metiers: e.target.value
                                .split(",")
                                .map((m) => m.trim()),
                            })
                          }
                          required
                        />
                      </label>
                    </div>
                  </>
                )}
              </>
            )}

            <div className="flex w-full gap-3">
              {step > 1 && (
                <button
                  type="button"
                  className="btn btn-soft btn-info flex-1 mt-2"
                  onClick={() => setStep(step - 1)}
                  disabled={isLoading}
                >
                  Retour
                </button>
              )}

              <button
                type="submit"
                disabled={!type || isLoading}
                className="btn btn-soft btn-info flex-1 mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : step === 1 ? (
                  "Continuer"
                ) : (
                  "S'enregistrer"
                )}
              </button>
            </div>

            <div className="flex w-full flex-col">
              <div className="divider">Ou se connecter</div>
            </div>

            <p className="text-gray-500/90 text-sm text-center">
              Vous avez déjà un compte ?{" "}
              <Link className="text-indigo-400 underline" to="/login">
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
