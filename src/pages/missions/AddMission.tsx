import { useState } from "react";
import IonIcon from "@reacticons/ionicons";
import { useNavigate } from "react-router";
import { metierService } from "../../api/services/metierService";
import { missionService } from "../../api/services/missionService";
import { useFetch } from "../../hooks/useFetch";
import { Header } from "../../components/headerPage/Header";

type Step = 1 | 2 | 3;

interface Profession {
    id_metier: number | string;
    nom: string;
}
export default function AddMission() {
    const navigate = useNavigate();
    const [step, setStep] = useState<Step>(1);
    const [knowProfession, setKnowProfession] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        profession: "",
        title: "",
        description: "",
        location: "",
        images: [] as string[],
    });

    const { data: professions } = useFetch(() => metierService.getAll(), []);

    const isStepValid = () => {
        if (step === 1) return knowProfession !== null;
        if (step === 2) {
            const isTextValid =
                formData.title.trim() !== "" && formData.description.trim() !== "";
            const isImageValid = formData.images.length > 0;
            return knowProfession
                ? isTextValid && isImageValid && formData.profession.trim() !== ""
                : isTextValid && isImageValid;
        }
        if (step === 3)
            return formData.location.trim() !== ""
        return false;
    };

    const nextStep = () => {
        if (isStepValid()) setStep((s) => (s + 1) as Step);
    };
    const prevStep = () => setStep((s) => (s - 1) as Step);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file),
            );
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...filesArray],
            }));
        }
    };

    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async () => {
        if (!isStepValid()) return;

        setIsLoading(true);
        try {
            const missionToSave = {
                titre: formData.title,
                description: formData.description,
                id_metier: formData.profession || undefined,
                localisation: formData.location,
                date_offre: new Date().toISOString(),
                statut: false,
            };

            await missionService.create(missionToSave);

            alert("Mission publiée avec succès !");
            navigate("/missions"); // Ou ta page d'accueil
        } catch (error) {
            console.error("Erreur lors de la publication:", error);
            alert("Une erreur est survenue lors de la publication.");
        } finally {
            setIsLoading(false);
        }
    };


    const inputStyle =
        "w-full bg-gray-50  border border-gray-200  h-14 px-5 rounded-2xl focus:ring-2 focus:ring-black  transition-all outline-none text-sm font-medium text-black placeholder:text-gray-400";

    const Label = ({ text, required = true }: { text: string; required?: boolean }) => (
        <label
            className="block text-[10px] font-black uppercase tracking-[0.15em] text-gray-400  mb-2 ml-1">
            {text} {required ? <span className="text-red-500">*</span> :
                <span className="lowercase font-medium opacity-60">(optionnel)</span>}
        </label>
    );

    return (
        <div
            className="fixed inset-0 flex flex-col font-sans transition-colors duration-300">
            <Header title="VOTRE PROJET" showButton={""} className="md:hidden" />
            <header className="px-8 pb-6 shrink-0 z-10">
                <div className="flex gap-2 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? "bg-orange-500" : "bg-gray-300 "}`}
                        />
                    ))}
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter text-black  leading-none">
                    {step === 1 && ""}
                    {step === 2 && "DÉCRIVEZ LE CHANTIER"}
                </h1>
            </header>

            <main className="flex-1 overflow-y-auto px-8 touch-pan-y">
                <div className="flex flex-col min-h-full">
                    <div className="flex-1 py-4">
                        {step === 1 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <button
                                    onClick={() => setKnowProfession(true)}
                                    className={`w-full p-8 shadow-sm text-left transition-all flex flex-col gap-6 ${knowProfession === true ? "bg-black text-white  shadow-2xl" : "bg-white text-black "}`}
                                >
                                    <IonIcon name="hammer" className="text-3xl" />
                                    <span className="block font-black uppercase text-xl leading-none">
                                        Je sais exactement
                                        <br />
                                        quel métier
                                    </span>
                                </button>
                                <button
                                    onClick={() => setKnowProfession(false)}
                                    className={`w-full p-8 shadow-sm text-left transition-all flex flex-col gap-6 ${knowProfession === false ? "bg-black text-white  shadow-2xl" : "bg-white  text-black "}`}
                                >
                                    <IonIcon name="help-circle" className="text-3xl" />
                                    <span className="block font-black uppercase text-xl leading-none">
                                        Je décris mon besoin
                                        <br />
                                        simplement
                                    </span>
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-32">

                                <div className="space-y-4">
                                    {knowProfession && (
                                        <div className="space-y-3">
                                            <Label text="Métier recherché" />
                                            <div className="flex flex-wrap gap-2 pt-1">
                                                {professions?.map((p: Profession) => {
                                                    const isSelected = formData.profession === String(p.id_metier);
                                                    return (
                                                        <button
                                                            key={p.id_metier}
                                                            type="button"
                                                            onClick={() => setFormData(prev => ({ ...prev, profession: String(p.id_metier) }))}
                                                            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${isSelected
                                                                    ? "bg-black text-white border-black shadow-lg"
                                                                    : "bg-white text-black border-gray-100 hover:border-gray-300"
                                                                }`}
                                                        >
                                                            {p.nom}
                                                        </button>
                                                    );
                                                })}

                                                {/* Bouton "Ajouter" stylisé comme sur le screen */}
                                                <button
                                                    type="button"
                                                    className="px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-dashed border-gray-300 text-gray-400 flex items-center gap-1"
                                                >
                                                    <IonIcon name="add" className="text-sm" />
                                                    Ajouter
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <Label text="Localisation" />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400">
                                                <IonIcon name="location-outline" className="text-xl" />
                                            </div>
                                            <input
                                                name="location"
                                                placeholder="Paris, Lyon..."
                                                className={`${inputStyle} pl-14`}
                                                value={formData.location}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label text="Titre de l'annonce" />
                                        <input
                                            name="title"
                                            placeholder="Ex: Réparer une fuite sous évier"
                                            className={inputStyle}
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label text="Description des travaux" />
                                    <textarea
                                        name="description"
                                        placeholder="Donnez le plus de détails possible..."
                                        className={`${inputStyle} h-40 py-5 resize-none`}
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <Label text="Photos du projet" />
                                    <div className="space-y-3 pt-2">
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                                            Photos ({formData.images.length})
                                        </p>
                                        <div className="grid grid-cols-3 gap-3">
                                            {formData.images.map((img, index) => (
                                                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group">
                                                    <img src={img} className="w-full h-full object-cover" alt={`Upload ${index}`} />
                                                    <button
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-2 right-2 size-7 bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/20"
                                                    >
                                                        <IonIcon name="close" />
                                                    </button>
                                                </div>
                                            ))}
                                            <label className="aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-gray-50/30 hover:bg-gray-100 transition-colors">
                                                <input
                                                    type="file"
                                                    hidden
                                                    multiple
                                                    onChange={handleImagesChange}
                                                    accept="image/*"
                                                />
                                                <IonIcon name="camera-outline" className="text-2xl text-gray-400" />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-10" />
                            </div>
                        )}

                        {(step > 1 || knowProfession !== null) && (
                            <div className="pt-8 pb-40 flex gap-3 mt-auto">
                                {step > 1 && (
                                    <button
                                        onClick={prevStep}
                                        className="size-16 bg-gray-100  rounded-2xl flex items-center justify-center text-black  border border-gray-200  active:scale-95 transition-all"
                                    >
                                        <IonIcon name="arrow-back" className="text-2xl" />
                                    </button>
                                )}
                                <button
                                    disabled={!isStepValid() || isLoading}
                                    onClick={step < 2 ? nextStep : handleSubmit}
                                    className={`flex-1 h-16 font-black uppercase text-xs tracking-widest transition-all 
        ${isStepValid() && !isLoading
                                            ? "bg-black text-white  shadow-xl active:scale-95"
                                            : "bg-gray-100  text-gray-300  cursor-not-allowed"
                                        }`}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Publication...
                                        </span>
                                    ) : (
                                        step === 2 ? "Publier la mission" : "Suivant"
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
