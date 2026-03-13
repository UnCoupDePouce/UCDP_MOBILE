import IonIcon from "@reacticons/ionicons";

interface CardProps {
    title: string;
    desc: string;
    time: string;
    icon: string;
}

export default function NotificationCard({ title, desc, time, icon }: CardProps) {
    return (
        <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 w-full rounded-[24px] p-5 flex gap-4 active:scale-[0.98] transition-all duration-300">
            {/* Cercle Icone - Inversion Blanc/Noir en Dark Mode */}
            <div className="size-12 shrink-0 rounded-2xl bg-black dark:bg-white flex items-center justify-center shadow-lg shadow-black/10 dark:shadow-white/5 transition-colors">
                <IonIcon name={icon as any} className="text-white dark:text-black text-xl" />
            </div>

            {/* Texte */}
            <div className="flex-1 flex flex-col gap-1 min-w-0">
                <div className="flex justify-between items-center">
                    <h3 className="font-black text-[13px] uppercase tracking-tight text-black dark:text-white transition-colors">
                        {title}
                    </h3>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-neutral-600">
                        {time}
                    </span>
                </div>

                <p className="text-[11px] font-medium text-gray-500 dark:text-neutral-400 leading-relaxed pr-2 transition-colors">
                    {desc}
                </p>
            </div>
        </div>
    );
}