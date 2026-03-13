import IonIcon from "@reacticons/ionicons";

type CardProps = {
    title: string,
    category: string,
    date: string,
    image: string,
    infoLeft: string,
    infoRight: string,
    iconLeft?: string,
    iconRight?: string,
    onClick?: () => void
}


export default function ProjectCard({
    title,
    category,
    date,
    image,
    infoLeft,
    infoRight,
    iconLeft = "location-outline",
    iconRight = "person-outline",
    onClick
}: CardProps) {
    return (
        <button
            onClick={onClick}
            className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-4 rounded-[28px] flex items-center gap-4 active:scale-[0.97] transition-all text-left shadow-sm"
        >
            {/* Bordure de l'image plus sombre en dark mode */}
            <div className="size-20 shrink-0 rounded-[20px] overflow-hidden bg-gray-200 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1 min-w-0 py-1">
                <div className="flex justify-between items-start">
                    <p className="text-[9px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-widest mb-1">
                        {category}
                    </p>
                    <span className="text-[9px] font-black text-black dark:text-white transition-colors">
                        {date}
                    </span>
                </div>

                <h3 className="font-black text-black dark:text-white text-sm uppercase tracking-tight truncate mb-3 transition-colors">
                    {title}
                </h3>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <IonIcon name={iconLeft as any} className="text-black dark:text-white text-xs transition-colors" />
                        <span className="text-[10px] font-bold text-gray-500 dark:text-neutral-500 uppercase transition-colors">
                            {infoLeft}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <IonIcon name={iconRight as any} className="text-black dark:text-white text-xs transition-colors" />
                        <span className="text-[10px] font-bold text-gray-500 dark:text-neutral-500 uppercase transition-colors">
                            {infoRight}
                        </span>
                    </div>
                </div>
            </div>
        </button>
    );
}