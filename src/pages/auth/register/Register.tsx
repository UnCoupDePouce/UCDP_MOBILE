import { Link, useSearchParams } from "react-router";
import IonIcon from "@reacticons/ionicons";
import Message from "../../../components/Message.tsx";
import { useRegister } from "./useRegister.tsx";
import { useEffect } from "react";

export default function Register() {
  const [searchParams] = useSearchParams();

  const {
    step,
    message,
    userType,
    setUserType,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    formData,
    setFormData,
    toggleMetier,
    nextStep,
    prevStep,
    handleSubmit,
  } = useRegister();

  useEffect(() => {
    if (searchParams.has("pro")) {
      setUserType("professionnel");
    } else {
      setUserType("particulier");
    }
  }, [searchParams, setUserType]);

  const listeMetiers = [
    "Plombier",
    "Électricien",
    "Maçon",
    "Peintre",
    "Menuisier",
    "Jardinier",
  ];
  const inputStyle =
    "w-full bg-gray-100 border-none h-16 pl-14 pr-14 rounded-2xl focus:ring-2 focus:ring-black text-black transition-all outline-none";

  return (
    <div className="fixed inset-0 flex flex-col px-8 pb-8 pt-12 overflow-y-auto transition-colors duration-300">
      {message && <Message data={message} />}

      <div className="flex gap-2 mb-10 max-w-xl md:mx-auto md:w-full">
        <div
          className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? "bg-black" : "bg-gray-100"}`}
        />
        <div
          className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? "bg-black" : "bg-gray-100"}`}
        />
      </div>

      <div className="mb-10 max-w-xl md:mx-auto md:w-full">
        <h2 className="text-4xl font-black tracking-tighter uppercase leading-none text-black">
          {step === 1 ? (
            <>
              Créer <br /> ton compte
            </>
          ) : (
            <>
              Tes <br /> informations
            </>
          )}
        </h2>
        <div className="h-1.5 w-12 bg-black mt-4 rounded-full"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-xl md:mx-auto md:w-full"
      >
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="relative">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <IonIcon
                  name="mail-outline"
                  className="text-xl text-gray-400"
                />
              </div>
              <input
                className={inputStyle}
                type="email"
                placeholder="Email"
                value={formData.mail}
                onChange={(e) =>
                  setFormData({ ...formData, mail: e.target.value })
                }
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
                className={inputStyle}
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                autoComplete="new-password"
                value={formData.mdp}
                onChange={(e) =>
                  setFormData({ ...formData, mdp: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-5 text-gray-400 text-xl"
              >
                <IonIcon
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                />
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <IonIcon
                  name="shield-checkmark-outline"
                  className="text-xl text-gray-400"
                />
              </div>
              <input
                className={inputStyle}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmer mot de passe"
                autoComplete="new-password"
                value={formData.confirmMdp}
                onChange={(e) =>
                  setFormData({ ...formData, confirmMdp: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-5 text-gray-400 text-xl"
              >
                <IonIcon
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg active:scale-95 transition-all uppercase flex justify-center items-center gap-2 mt-4 shadow-lg shadow-black/10"
            >
              Suivant <IonIcon name="arrow-forward-outline" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            {userType === "professionnel" ? (
              <>
                <div className="relative">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                    <IonIcon
                      name="business-outline"
                      className="text-xl text-gray-400"
                    />
                  </div>
                  <input
                    className={inputStyle}
                    placeholder="Raison Sociale"
                    value={formData.raison_sociale}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        raison_sociale: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-3 px-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Spécialités
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {listeMetiers.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => toggleMetier(m)}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${formData.metiers.includes(m) ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <input
                  className={inputStyle}
                  style={{ paddingLeft: "1.5rem" }}
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={(e) =>
                    setFormData({ ...formData, prenom: e.target.value })
                  }
                />
                <input
                  className={inputStyle}
                  style={{ paddingLeft: "1.5rem" }}
                  placeholder="Nom"
                  value={formData.nom}
                  onChange={(e) =>
                    setFormData({ ...formData, nom: e.target.value })
                  }
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <IonIcon
                  name="call-outline"
                  className="text-xl text-gray-400"
                />
              </div>
              <input
                className={inputStyle}
                type="tel"
                placeholder="Téléphone"
                maxLength={10}
                value={formData.telephone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, telephone: value });
                }}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <IonIcon
                  name="location-outline"
                  className="text-xl text-gray-400"
                />
              </div>
              <input
                className={inputStyle}
                placeholder="Adresse"
                value={formData.adresse}
                onChange={(e) =>
                  setFormData({ ...formData, adresse: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              <input
                className={`${inputStyle} col-span-1`}
                style={{
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  textAlign: "center",
                }}
                placeholder="CP"
                maxLength={5}
                value={formData.code_postal}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, code_postal: value });
                }}
              />
              <input
                className={`${inputStyle} col-span-3`}
                style={{ paddingLeft: "1.5rem" }}
                placeholder="Ville"
                value={formData.ville}
                onChange={(e) =>
                  setFormData({ ...formData, ville: e.target.value })
                }
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-gray-100 text-black py-5 rounded-2xl font-black uppercase text-sm active:scale-95 transition-all"
              >
                Retour
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-[2] bg-black text-white py-5 rounded-2xl font-black text-lg active:scale-95 transition-all uppercase flex justify-center items-center gap-2 shadow-lg shadow-black/10"
              >
                {isLoading ? "..." : "Terminer"}
              </button>
            </div>
          </div>
        )}
      </form>

      <div className="mt-auto pt-8 text-center max-w-xl md:mx-auto md:w-full">
        <p className="text-gray-400 text-sm">
          Déjà inscrit ?{" "}
          <Link to="/login" className="text-black font-black uppercase ml-1">
            Connexion
          </Link>
        </p>
      </div>
    </div>
  );
}
