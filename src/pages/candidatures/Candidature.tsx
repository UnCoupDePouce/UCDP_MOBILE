import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import IonIcon from "@reacticons/ionicons";
import { candidatureService } from "../../api/services/candidatureService";
import { Header } from "../../components/headerPage/Header";

type Statut = "EN_ATTENTE" | "VALIDE" | "REFUSE";

type CandidaturePresta = {
    id_candidature: number;
    statut: Statut;
    date_postulation: string;
    id_offre: string;
    titre: string;
    prix: number;
    localisation: string;
    client_id: string;
    client_prenom: string;
    client_nom: string;
};

type CandidatureClient = {
    id_candidature: number;
    id_prestataire: string;
    statut: Statut;
    date_postulation: string;
    id_offre: string;
    titre: string;
    prix: number;
    localisation: string;
    presta_id: string;
    presta_prenom: string;
    presta_nom: string;
};

const FILTERS: { label: string; value: Statut | "TOUTES" }[] = [
    { label: "Toutes", value: "TOUTES" },
    { label: "En attente", value: "EN_ATTENTE" },
    { label: "Acceptées", value: "VALIDE" },
    { label: "Refusées", value: "REFUSE" },
];

const statusConfig: Record<Statut, { label: string; color: string; icon: string }> = {
    EN_ATTENTE: { label: "En attente", color: "bg-amber-100 text-amber-700", icon: "time-outline" },
    VALIDE:     { label: "Acceptée",   color: "bg-green-100 text-green-700", icon: "checkmark-circle-outline" },
    REFUSE:     { label: "Refusée",    color: "bg-red-100 text-red-700", icon: "close-circle-outline" },
};

export default function Candidatures() {
    const navigate = useNavigate();
    const role = localStorage.getItem("status");
    const isPrestataire = role === "PRESTATAIRE";

    if (isPrestataire) return <VuePrestataire navigate={navigate} />;
    return <VueClient navigate={navigate} />;
}

function VuePrestataire({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
    const [candidatures, setCandidatures] = useState<CandidaturePresta[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<Statut | "TOUTES">("TOUTES");

    useEffect(() => {
        candidatureService.getMine()
            .then(setCandidatures)
            .finally(() => setLoading(false));
    }, []);

    const filtered = filter === "TOUTES"
        ? candidatures
        : candidatures.filter((c) => c.statut === filter);

    return (
        <div className="min-h-screen bg-white pb-24 transition-colors duration-300">
            <Header title="Mes candidatures" showButton={""} className="md:hidden" />

            {/* Filtres */}
            <div className="px-6 mb-6">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {FILTERS.map((f) => {
                        const count = f.value === "TOUTES"
                            ? candidatures.length
                            : candidatures.filter((c) => c.statut === f.value).length;
                        return (
                            <button
                                key={f.value}
                                onClick={() => setFilter(f.value)}
                                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                                    filter === f.value
                                        ? "bg-black  text-white  shadow-lg"
                                        : "bg-gray-100  text-gray-500 "
                                }`}
                            >
                                {f.label}
                                <span className={`text-[9px] px-1.5 py-0.5 rounded-lg font-black ${
                                    filter === f.value
                                        ? "bg-white/20  text-white "
                                        : "bg-black/10 /10 text-black "
                                }`}>{count}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <main className="px-6 space-y-4">
                {loading ? (
                    <Skeleton />
                ) : filtered.length === 0 ? (
                    <Empty text="Aucune candidature" />
                ) : (
                    filtered.map((item) => (
                        <div
                            key={item.id_candidature}
                            onClick={() => navigate(`/message/${item.client_id}`)}
                            className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-xl shadow-black/5 active:scale-[0.97] transition-all cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2.5 py-1 rounded-xl uppercase tracking-wider ${statusConfig[item.statut].color}`}>
                                    <IonIcon name={statusConfig[item.statut].icon as never} className="text-[11px]" />
                                    {statusConfig[item.statut].label}
                                </span>
                                <span className="text-[9px] font-black text-gray-400  uppercase tracking-widest">
                                    {new Date(item.date_postulation).toLocaleDateString("fr-FR")}
                                </span>
                            </div>

                            <h2 className="text-base font-black text-black  uppercase tracking-tight leading-tight mb-3">
                                {item.titre}
                            </h2>

                            <div className="flex items-center justify-between pt-3 border-t border-gray-50 ">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={`https://api.dicebear.com/8.x/initials/svg?seed=${item.client_prenom}`}
                                        className="size-7 rounded-full bg-gray-100 "
                                        alt=""
                                    />
                                    <p className="text-[10px] font-black  uppercase">
                                        {item.client_prenom} {item.client_nom}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 text-gray-400">
                                    <IonIcon name="location" className="text-[10px]" />
                                    <span className="text-[9px] font-bold uppercase tracking-tighter">{item.localisation}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
}

function VueClient({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
    const [candidatures, setCandidatures] = useState<CandidatureClient[]>([]);
    const [loading, setLoading] = useState(true);
    const [acting, setActing] = useState<number | null>(null);

    useEffect(() => {
        candidatureService.getByClient()
            .then(setCandidatures)
            .finally(() => setLoading(false));
    }, []);

    const updateStatut = (id: number, statut: Statut) => {
        setCandidatures((prev) =>
            prev.map((c) => c.id_candidature === id ? { ...c, statut } : c)
        );
    };

    const handleValider = async (id: number) => {
        setActing(id);
        try {
            await candidatureService.valider(id);
            updateStatut(id, "VALIDE");
        } finally {
            setActing(null);
        }
    };

    const handleRefuser = async (id: number) => {
        setActing(id);
        try {
            await candidatureService.refuser(id);
            updateStatut(id, "REFUSE");
        } finally {
            setActing(null);
        }
    };

    const enAttente = candidatures.filter((c) => c.statut === "EN_ATTENTE");
    const traitees = candidatures.filter((c) => c.statut !== "EN_ATTENTE");

    return (
        <div className="min-h-screen bg-white  pb-24 transition-colors duration-300">
            <Header title="Candidatures reçues" showButton={""} className="md:hidden" />

            <main className="px-6 space-y-8">
                {loading ? (
                    <Skeleton />
                ) : candidatures.length === 0 ? (
                    <Empty text="Aucune candidature reçue" />
                ) : (
                    <>
                        {/* En attente */}
                        {enAttente.length > 0 && (
                            <section>
                                <SectionTitle
                                    label="En attente"
                                    count={enAttente.length}
                                    color="text-amber-500"
                                />
                                <div className="space-y-4">
                                    {enAttente.map((item) => (
                                        <ClientCard
                                            key={item.id_candidature}
                                            item={item}
                                            acting={acting}
                                            onValider={handleValider}
                                            onRefuser={handleRefuser}
                                            onChat={() => navigate(`/chat/${item.presta_id}`)}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Traitées */}
                        {traitees.length > 0 && (
                            <section>
                                <SectionTitle label="Traitées" count={traitees.length} color="text-gray-400" />
                                <div className="space-y-3">
                                    {traitees.map((item) => (
                                        <div
                                            key={item.id_candidature}
                                            className="bg-gray-50  p-4 rounded-[24px] border border-gray-100 "
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={`https://api.dicebear.com/8.x/initials/svg?seed=${item.presta_prenom}`}
                                                        className="size-9 rounded-full bg-gray-200 "
                                                        alt=""
                                                    />
                                                    <div>
                                                        <p className="text-[11px] font-black  uppercase tracking-tight text-black">
                                                            {item.presta_prenom} {item.presta_nom}
                                                        </p>
                                                        <p className="text-[9px] text-gray-400  font-bold uppercase tracking-widest mt-0.5 truncate max-w-[160px]">
                                                            {item.titre}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2.5 py-1 rounded-xl uppercase tracking-wider ${statusConfig[item.statut].color}`}>
                                                    <IonIcon name={statusConfig[item.statut].icon as never} className="text-[11px]" />
                                                    {statusConfig[item.statut].label}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

/* ─── CARD CLIENT ─── */
function ClientCard({ item, acting, onValider, onRefuser, onChat }: {
    item: CandidatureClient;
    acting: number | null;
    onValider: (id: number) => void;
    onRefuser: (id: number) => void;
    onChat: () => void;
}) {
    const isActing = acting === item.id_candidature;

    return (
        <div className="bg-white p-5 rounded-[28px] border border-gray-100  shadow-xl shadow-black/5">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <img
                    src={`https://api.dicebear.com/8.x/initials/svg?seed=${item.presta_prenom}`}
                    className="size-12 rounded-[16px] bg-gray-100 "
                    alt=""
                />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-black  uppercase tracking-tight truncate">
                        {item.presta_prenom} {item.presta_nom}
                    </p>
                    <p className="text-[9px] font-black text-gray-400  uppercase tracking-widest mt-0.5">
                        {new Date(item.date_postulation).toLocaleDateString("fr-FR")}
                    </p>
                </div>
                <button
                    onClick={onChat}
                    className="size-10 bg-gray-100  rounded-2xl flex items-center justify-center active:scale-90 transition-all"
                >
                    <IonIcon name="chatbubble-ellipses" className="text-lg " />
                </button>
            </div>

            {/* Mission */}
            <div className="bg-gray-50 rounded-2xl px-4 py-3 mb-4">
                <p className="text-[9px] font-black text-gray-400  uppercase tracking-widest mb-1">Mission</p>
                <p className="text-sm font-black text-black  uppercase tracking-tight leading-tight">{item.titre}</p>
                <div className="flex items-center gap-1 mt-1 text-gray-400">
                    <IonIcon name="location" className="text-[10px]" />
                    <span className="text-[9px] font-bold uppercase tracking-tighter">{item.localisation}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    onClick={() => onValider(item.id_candidature)}
                    disabled={isActing}
                    className="flex-1 h-12 bg-black  text-white  rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all shadow-lg disabled:opacity-40"
                >
                    {isActing ? "..." : "Accepter"}
                </button>
                <button
                    onClick={() => onRefuser(item.id_candidature)}
                    disabled={isActing}
                    className="flex-1 h-12 bg-red-50  text-red-600  border border-red-100  rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all disabled:opacity-40"
                >
                    {isActing ? "..." : "Refuser"}
                </button>
            </div>
        </div>
    );
}

/* ─── HELPERS ─── */
function SectionTitle({ label, count, color }: { label: string; count: number; color: string }) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <p className={`text-[10px] font-black uppercase tracking-widest ${color}`}>{label}</p>
            <span className="text-[9px] font-black bg-gray-100  text-gray-500  px-2 py-0.5 rounded-lg">{count}</span>
        </div>
    );
}

function Empty({ text }: { text: string }) {
    return (
        <div className="py-20 text-center opacity-50">
            <IonIcon name="document-text-outline" className="text-5xl mb-4 text-black " />
            <p className="font-black uppercase text-[10px] tracking-widest text-black ">{text}</p>
        </div>
    );
}

function Skeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 rounded-[28px] bg-gray-100  animate-pulse" />
            ))}
        </div>
    );
}
