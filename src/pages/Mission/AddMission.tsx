import { useEffect, useState } from "react";
import { ArrowLeft, Camera, Hammer, HelpCircle, MapPin, X } from "lucide-react";
import Header from "../../components/Header/Header.tsx";
import { MetierService } from "../../service/metier.service.ts";
import type { Metier } from "../../model/metier.ts";
import { MissionService } from "../../service/mission.service.ts";
import { useNavigate } from "react-router";

export default function AddMissionPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [knowProfession, setKnowProfession] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [professions, setProfessions] = useState<Metier[]>([]);
  const [formData, setFormData] = useState({
    profession: "",
    location: "",
    title: "",
    description: "",
    images: [] as string[],
  });

  useEffect(() => {
    MetierService.getAll()
      .then((data) => {
        setProfessions(data);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement de la mission :", err);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const urls = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const isStepValid = () => {
    if (step === 1) return knowProfession !== null;
    return formData.title.trim() !== "" && formData.location.trim() !== "";
  };

  const handleSubmit = () => {
    setIsLoading(true);
    MissionService.create(formData)
      .then((r) => {
        console.log("Yeepee, offre publiée avec succès !", r);
        navigate("/");
      })
      .catch((err) => {
        console.error("Erreur lors de la création de la mission :", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const labelStyle =
    "block text-[11px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 ml-1";
  const inputStyle =
    "w-full px-4 py-3.5 bg-slate-50 dark:bg-neutral-800/60 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700/50 rounded-2xl text-sm font-medium transition-all focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 placeholder:text-gray-400 dark:placeholder:text-gray-500";

  return (
    <>
      <Header name={"Ajout d'un projet"} />
      <div className="flex flex-col px-4 py-8 my-20">
        {step === 1 && (
          <div className="space-y-4 flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-6">
              <h1 className="text-xl font-black uppercase tracking-tight">
                Déposer une mission
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Sélectionnez la méthode qui vous convient le mieux
              </p>
            </div>

            <button
              onClick={() => setKnowProfession(true)}
              className={`w-full p-6 rounded-2xl border-2 text-left transition-all flex flex-col gap-4 ${
                knowProfession === true
                  ? "bg-base-300 border-orange-500 text-orange-600 dark:text-orange-400 shadow-md shadow-orange-500/5"
                  : "bg-base-200 border-gray-800/50 hover:border-gray-200 dark:hover:border-gray-700"
              }`}
            >
              <Hammer
                size={28}
                className={
                  knowProfession === true
                    ? "text-orange-500"
                    : "text-gray-400 dark:text-gray-500"
                }
              />
              <div>
                <span className="block font-black uppercase text-base tracking-tight leading-none mb-1">
                  Je sais exactement
                </span>
                <span className="text-xs opacity-80 font-medium">
                  Quel métier d'artisanat j'ai besoin de contacter.
                </span>
              </div>
            </button>

            <button
              onClick={() => setKnowProfession(false)}
              className={`w-full p-6 rounded-2xl border-2 text-left transition-all flex flex-col gap-4 ${
                knowProfession === false
                  ? "bg-base-300 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-md shadow-indigo-500/5"
                  : "bg-base-200 border-gray-800/50 hover:border-gray-200 dark:hover:border-gray-700"
              }`}
            >
              <HelpCircle
                size={28}
                className={
                  knowProfession === false
                    ? "text-indigo-500"
                    : "text-gray-400 dark:text-gray-500"
                }
              />
              <div>
                <span className="block font-black uppercase text-base tracking-tight leading-none mb-1">
                  Je décris mon besoin
                </span>
                <span className="text-xs opacity-80 font-medium">
                  L'application m'aidera à trouver le bon corps de métier.
                </span>
              </div>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-16">
            {knowProfession && (
              <div className="space-y-2">
                <label className={labelStyle}>Métier recherché</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {professions.map((p) => {
                    const isSelected =
                      formData.profession === String(p.id_metier);
                    return (
                      <button
                        key={p.id_metier}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            profession: String(p.id_metier),
                          }))
                        }
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                          isSelected
                            ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                            : "bg-slate-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {p.nom}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className={labelStyle}>Localisation</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                  <MapPin size={18} />
                </div>
                <input
                  name="location"
                  placeholder="Paris, Lyon..."
                  className={`${inputStyle} pl-11`}
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelStyle}>Titre de l'annonce</label>
              <input
                name="title"
                placeholder="Ex: Réparer une fuite sous évier"
                className={inputStyle}
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <label className={labelStyle}>Description des travaux</label>
              <textarea
                name="description"
                placeholder="Donnez le plus de détails possible..."
                className={`${inputStyle} h-36 py-4 resize-none`}
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className={labelStyle}>
                Photos du projet ({formData.images.length})
              </label>
              <div className="grid grid-cols-3 gap-3">
                {formData.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt={`Upload ${index}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 size-6 bg-black/60 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/10 active:scale-90 transition-transform"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                <label className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-700/60 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-slate-50 dark:bg-neutral-800/30 hover:bg-gray-100 dark:hover:bg-neutral-800/60 transition-colors">
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleImagesChange}
                    accept="image/*"
                  />
                  <Camera
                    size={22}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {(step > 1 || knowProfession !== null) && (
          <div className="pt-6 pb-6 flex gap-3 mt-auto">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="w-14 h-14 bg-slate-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center text-gray-700 dark:text-gray-300 border border-gray-200/40 dark:border-gray-700/50 active:scale-95 transition-all shrink-0"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <button
              type="button"
              disabled={!isStepValid() || isLoading}
              onClick={step < 2 ? nextStep : handleSubmit}
              className={`flex-1 h-14 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all ${
                isStepValid() && !isLoading
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/10 active:scale-95 cursor-pointer"
                  : "bg-slate-100 dark:bg-neutral-800 text-gray-300 dark:text-gray-600 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Publication...
                </span>
              ) : step === 2 ? (
                "Publier la mission"
              ) : (
                "Suivant"
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
