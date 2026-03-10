import {useState} from "react";
import IonIcon from "@reacticons/ionicons";

type Step = 1 | 2 | 3;

export default function AddMission() {
    const [step, setStep] = useState<Step>(1);
    const [knowProfession, setKnowProfession] = useState<boolean | null>(null);

    const [formData, setFormData] = useState({
        profession: "",
        title: "",
        description: "",
        location: "",
        budget: "",
        urgent: false,
        images: [] as string[]
    });

    const isStepValid = () => {
        if (step === 1) return knowProfession !== null;
        if (step === 2) {
            const isTextValid = formData.title.trim() !== "" && formData.description.trim() !== "";
            const isImageValid = formData.images.length > 0;
            return knowProfession ? (isTextValid && isImageValid && formData.profession.trim() !== "") : (isTextValid && isImageValid);
        }
        if (step === 3) return formData.location.trim() !== "" && formData.budget.trim() !== "";
        return false;
    };

    const nextStep = () => { if (isStepValid()) setStep((s) => (s + 1) as Step); };
    const prevStep = () => setStep((s) => (s - 1) as Step);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
            setFormData(prev => ({...prev, images: [...prev.images, ...filesArray]}));
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({...prev, images: prev.images.filter((_, i) => i !== index)}));
    };

    const inputStyle = "w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 h-14 px-5 rounded-2xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none text-sm font-medium text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-neutral-500";

    return (
        /* fixed inset-0 empêche le body de scroller, on gère le scroll uniquement dans main */
        <div className="fixed inset-0 bg-white dark:bg-neutral-950 flex flex-col font-sans transition-colors duration-300">

            {/* HEADER FIXE (Ne scrolle pas) */}
            <header className="px-8 pt-12 pb-6 shrink-0 bg-white dark:bg-neutral-950 z-10">
                <div className="flex gap-2 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-black dark:bg-white' : 'bg-gray-100 dark:bg-neutral-900'}`}/>
                    ))}
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter text-black dark:text-white leading-none">
                    {step === 1 && "Le Métier"}
                    {step === 2 && "La Mission"}
                    {step === 3 && "Détails"}
                </h1>
            </header>

            {/* ZONE DE SCROLL (Tout ce qui est ici peut défiler) */}
            <main className="flex-1 overflow-y-auto px-8 touch-pan-y">

                <div className="flex flex-col min-h-full">
                    {/* CONTENU DES ÉTAPES */}
                    <div className="flex-1 py-4">
                        {step === 1 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <button onClick={() => setKnowProfession(true)} className={`w-full p-8 rounded-[32px] border-2 text-left transition-all flex flex-col gap-6 ${knowProfession === true ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-2xl' : 'border-gray-100 bg-gray-50 dark:border-neutral-900 dark:bg-neutral-900/50 text-black dark:text-white'}`}>
                                    <IonIcon name="hammer" className="text-3xl"/><span className="block font-black uppercase text-xl leading-none">Je sais exactement<br/>quel métier</span>
                                </button>
                                <button onClick={() => setKnowProfession(false)} className={`w-full p-8 rounded-[32px] border-2 text-left transition-all flex flex-col gap-6 ${knowProfession === false ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-2xl' : 'border-gray-100 bg-gray-50 dark:border-neutral-900 dark:bg-neutral-900/50 text-black dark:text-white'}`}>
                                    <IonIcon name="help-circle" className="text-3xl"/><span className="block font-black uppercase text-xl leading-none">Je décris mon besoin<br/>simplement</span>
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                {knowProfession && <input name="profession" placeholder="Métier recherché (ex: Plombier) *" className={inputStyle} value={formData.profession} onChange={handleChange}/>}
                                <input name="title" placeholder="Titre de votre annonce *" className={inputStyle} value={formData.title} onChange={handleChange}/>
                                <textarea name="description" placeholder="Détaillez votre besoin... *" className={`${inputStyle} h-40 py-5 resize-none`} value={formData.description} onChange={handleChange}/>
                                <div className="space-y-3 pt-2">
                                    <p className="text-[10px] font-black uppercase text-gray-400 dark:text-neutral-500 tracking-widest ml-1">Photos ({formData.images.length})</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        {formData.images.map((img, index) => (
                                            <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group"><img src={img} className="w-full h-full object-cover"/><button onClick={() => removeImage(index)} className="absolute top-2 right-2 size-7 bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/20"><IonIcon name="close"/></button></div>
                                        ))}
                                        <label className="aspect-square border-2 border-dashed border-gray-200 dark:border-neutral-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-gray-50 dark:bg-neutral-900/30 hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors">
                                            <input type="file" hidden multiple onChange={handleImagesChange} accept="image/*"/><IonIcon name="camera-outline" className="text-2xl text-gray-400 dark:text-neutral-600"/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400">
                                        <IonIcon name="location-outline" className="text-xl"/>
                                    </div>
                                    <input name="location" placeholder="Ville ou Code Postal *" className={`${inputStyle} pl-14`} value={formData.location} onChange={handleChange}/>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400">
                                            <span className="font-bold text-sm">€</span>
                                        </div>
                                        <input name="budget" placeholder="Budget *" className={`${inputStyle} pl-10`} type="number" value={formData.budget} onChange={handleChange}/>
                                    </div>

                                    <button
                                        onClick={() => setFormData({...formData, urgent: !formData.urgent})}
                                        className={`h-14 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all font-black uppercase text-[10px] 
                ${formData.urgent
                                            ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20'
                                            : 'bg-gray-50 dark:bg-neutral-900 border-gray-100 dark:border-neutral-800 text-gray-400 dark:text-neutral-500'}`}
                                    >
                                        <IonIcon name="flash" className={formData.urgent ? "animate-pulse" : ""}/> Urgent
                                    </button>
                                </div>

                                {formData.urgent && (
                                    <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 p-4 rounded-2xl flex items-start gap-3 animate-in zoom-in-95 duration-300">
                                        <div className="size-8 shrink-0 bg-orange-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                                            <IonIcon name="notifications" className="text-lg"/>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-0.5">Mission prioritaire</p>
                                            <p className="text-xs font-medium text-orange-800/70 dark:text-orange-200/60 leading-relaxed">
                                                En mode urgent, votre mission sera mise en avant et notifiée immédiatement aux prestataires disponibles autour de vous.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {(step > 1 || knowProfession !== null) && (
                        <div className="pt-8 pb-40 flex gap-3 mt-auto">
                            {step > 1 && (
                                <button onClick={prevStep} className="size-16 bg-gray-100 dark:bg-neutral-900 rounded-2xl flex items-center justify-center text-black dark:text-white border border-gray-200 dark:border-neutral-800 active:scale-95 transition-all">
                                    <IonIcon name="arrow-back" className="text-2xl"/>
                                </button>
                            )}
                            <button
                                disabled={!isStepValid()}
                                onClick={step < 3 ? nextStep : () => console.log("Final Data:", formData)}
                                className={`flex-1 h-16 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${isStepValid() ? 'bg-black dark:bg-white text-white dark:text-black shadow-xl active:scale-95' : 'bg-gray-100 dark:bg-neutral-900 text-gray-300 dark:text-neutral-700 cursor-not-allowed'}`}
                            >
                                {step === 3 ? "Publier la mission" : "Suivant"}
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}