import {useState} from "react";
import {Link, useNavigate} from "react-router";
import Message from "../../components/Message.tsx";
import IonIcon from "@reacticons/ionicons";

export default function Register() {
    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState<"particulier" | "professionnel">("particulier");
    const [message, setMessage] = useState<{ status: number; message: string } | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const listeMetiers = ["Plombier", "Électricien", "Maçon", "Peintre", "Menuisier", "Jardinier"];

    const [formData, setFormData] = useState({
        nom: "", prenom: "", email: "", password: "", confirmMdp: "",
        telephone: "", adresse: "", code_postal: "", ville: "", raison_sociale: "",
        metiers: [] as string[]
    });

    const navigate = useNavigate();

    const inputStyleWithIcon = "w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 h-14 pl-14 pr-5 rounded-2xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none text-black dark:text-white";
    const inputStyle = "w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 h-14 px-5 rounded-2xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none text-black dark:text-white";

    const toggleMetier = (metier: string) => {
        setFormData(prev => ({
            ...prev,
            metiers: prev.metiers.includes(metier)
                ? prev.metiers.filter(m => m !== metier)
                : [...prev.metiers, metier]
        }));
    };

    const allowedChars = /^[A-Za-z0-9!@#$%^&*()\-_]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_]).{8,}$/;
    const nextStep = () => {
        if (!formData.email.trim() || !formData.password.trim() || !formData.confirmMdp.trim()) {
            setMessage({ status: 400, message: "Tous les champs sont obligatoires" });
            return;
        }

        if (!allowedChars.test(formData.password)) {
            setMessage({ status: 400, message: "Le mot de passe contient des caractères non autorisés" });
            return;
        }

        if (!passwordRegex.test(formData.password)) {
            setMessage({
                status: 400,
                message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un caractère spécial (!@#$%^&*()-_)"
            });
            return;
        }

        if (formData.password !== formData.confirmMdp) {
            setMessage({ status: 400, message: "Les mots de passe ne correspondent pas" });
            return;
        }

        setMessage(null);
        setStep(2);
    };

    const prevStep = () => setStep(1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/user/register", {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({...formData, userType}),
            });
            const data = await response.json();
            if (!response.ok) {
                setMessage({status: response.status, message: data.errors[0].message || "Erreur lors de l'inscription"});
                return;
            }
            setMessage({status: 200, message: data.message});
            localStorage.setItem("hasToken", data.token);
            navigate("/");
        } catch (error) {
            console.error(error);
            setMessage({status: 500, message: "Erreur serveur"});
        }
    };

    return (
        <div
            className="fixed inset-0 bg-white dark:bg-neutral-950 flex flex-col px-7 pb-8 pt-12 overflow-y-auto transition-colors duration-300">
            {message && <Message data={message}/>}

            <div className="flex gap-2 mb-8">
                <div
                    className={`h-1.5 flex-1 rounded-full transition-all ${step >= 1 ? 'bg-black dark:bg-white' : 'bg-gray-100 dark:bg-neutral-800'}`}/>
                <div
                    className={`h-1.5 flex-1 rounded-full transition-all ${step >= 2 ? 'bg-black dark:bg-white' : 'bg-gray-100 dark:bg-neutral-800'}`}/>
            </div>

            <div className="mb-8">
                <h2 className="text-4xl font-black tracking-tighter uppercase leading-none text-black dark:text-white">
                    {step === 1 ? "Tes accès" : "Tes infos"}
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-2 bg-gray-100 dark:bg-neutral-900 p-1 rounded-2xl mb-4">
                            <button type="button" onClick={() => setUserType("particulier")}
                                    className={`py-2 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 ${userType === "particulier" ? "bg-white dark:bg-neutral-800 text-black dark:text-white shadow-sm" : "text-gray-400"}`}>
                                <IonIcon name="person-outline"/> Particulier
                            </button>
                            <button type="button" onClick={() => setUserType("professionnel")}
                                    className={`py-2 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 ${userType === "professionnel" ? "bg-white dark:bg-neutral-800 text-black dark:text-white shadow-sm" : "text-gray-400"}`}>
                                <IonIcon name="briefcase-outline"/> Pro
                            </button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <IonIcon name="mail-outline" className="text-xl text-gray-400"/>
                            </div>
                            <input type="email" placeholder="Adresse email" className={inputStyleWithIcon}
                                   value={formData.email}
                                   onChange={(e) => setFormData({...formData, email: e.target.value})} required/>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <IonIcon name="lock-closed-outline" className="text-xl text-gray-400"/>
                            </div>
                            <input className={inputStyleWithIcon}
                                   type={showPassword ? "text" : "password"}
                                   value={formData.password}
                                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                                   placeholder="Mot de passe" required/>
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-5 flex items-center text-gray-400 text-xl">
                                <IonIcon name={showPassword ? "eye-off-outline" : "eye-outline"}/>
                            </button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <IonIcon name="shield-checkmark-outline" className="text-xl text-gray-400"/>
                            </div>
                            <input type={showConfirmPassword ? "text" : "password"}
                                   placeholder="Confirmer mot de passe"
                                   className={inputStyleWithIcon}
                                   value={formData.confirmMdp}
                                   onChange={(e) => setFormData({...formData, confirmMdp: e.target.value})}
                                   required/>
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-5 flex items-center text-gray-400 text-xl">
                                <IonIcon name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} />
                            </button>
                        </div>

                        <button type="button" onClick={nextStep}
                                className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black uppercase mt-4 flex items-center justify-center gap-2">
                            Continuer <IonIcon name="arrow-forward"/>
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        {userType === "professionnel" && (
                            <>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                        <IonIcon name="business-outline" className="text-xl text-gray-400"/>
                                    </div>
                                    <input placeholder="Raison Sociale" className={inputStyleWithIcon}
                                           value={formData.raison_sociale} onChange={(e) => setFormData({
                                        ...formData,
                                        raison_sociale: e.target.value
                                    })} required/>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-bold uppercase text-gray-400 ml-1">Sélectionnez vos
                                        métiers</p>
                                    <div className="flex flex-wrap gap-2">
                                        {listeMetiers.map((metier) => (
                                            <button
                                                key={metier}
                                                type="button"
                                                onClick={() => toggleMetier(metier)}
                                                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                                                    formData.metiers.includes(metier)
                                                        ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                                                        : "bg-transparent border-gray-200 text-gray-500 dark:border-neutral-800"
                                                }`}
                                            >
                                                {metier}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                        {userType != "professionnel" && (
                        <div className="grid grid-cols-2 gap-3">
                            <input placeholder="Prénom" className={inputStyle} value={formData.prenom}
                                   onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                                   required/>
                            <input placeholder="Nom" className={inputStyle} value={formData.nom}
                                   onChange={(e) => setFormData({...formData, nom: e.target.value})} required/>
                        </div>
                        )}

                        <div className="relative">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <IonIcon name="call-outline" className="text-xl text-gray-400"/>
                            </div>
                            <input type="tel" placeholder="07XXXXXXXX" className={inputStyleWithIcon}
                                   maxLength={10} value={formData.telephone}
                                   onChange={(e) => /* ... ta logique tel */ setFormData({
                                       ...formData,
                                       telephone: e.target.value
                                   })} required/>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <IonIcon name="location-outline" className="text-xl text-gray-400"/>
                            </div>
                            <input placeholder="Adresse" className={inputStyleWithIcon} value={formData.adresse}
                                   onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                                   required/>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <input placeholder="CP" className={inputStyle} value={formData.code_postal}
                                   onChange={(e) => setFormData({...formData, code_postal: e.target.value})}
                                   maxLength={5} required/>
                            <input placeholder="Ville" className={`${inputStyle} col-span-2`}
                                   value={formData.ville}
                                   onChange={(e) => setFormData({...formData, ville: e.target.value})}
                                   required/>
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button type="button" onClick={prevStep}
                                    className="flex-1 bg-gray-100 dark:bg-neutral-900 text-black dark:text-white py-5 rounded-2xl font-black uppercase">Retour
                            </button>
                            <button type="submit"
                                    className="flex-[2] bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2">
                                S'inscrire <IonIcon name="checkmark-circle-outline" className="text-xl"/>
                            </button>
                        </div>
                    </div>
                )}
            </form>

            <div className="mt-auto pt-6 text-center">
                <p className="text-gray-400 text-sm">Déjà inscrit ? <Link to="/login"
                                                                          className="text-black dark:text-white font-black uppercase">Connexion</Link>
                </p>
            </div>
        </div>
    );
}