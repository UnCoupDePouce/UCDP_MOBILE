import IonIcon from "@reacticons/ionicons";

type CardProps = {
  title: string;
  category: string;
  date: string;
  image: string | null;
  infoLeft: string;
  infoRight: string;
  isAccepted?: boolean;
  iconLeft?: string;
  iconRight?: string;
  onClick?: () => void;
};

export default function ProjectCard({
  title,
  category,
  date,
  image,
  infoLeft,
  infoRight,
  isAccepted = false,
  iconLeft = "location",
  iconRight = "person",
  onClick,
}: CardProps) {

  const imageUrl = image || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800";

  return (
    <button
      onClick={onClick}
      className={`w-full bg-white border border-gray-100 p-4 flex gap-4 active:scale-[0.98] transition-all text-left shadow-sm ${isAccepted ? "opacity-60" : ""
        }`}
    >
      <div className="size-16 shrink-0 bg-[#5D5FEF] flex items-center justify-center relative">
        <img
          src={imageUrl}
          className="w-full h-full object-cover"
          alt={`Chantier : ${title}`}
        />
        {isAccepted && (
          <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
            <IonIcon name="lock-closed" className="text-white text-lg" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {category}
          </p>
          {isAccepted ? (
            <span className="bg-gray-100 text-gray-500 text-[8px] font-black uppercase px-2 py-1 rounded-md tracking-tighter">
              Pourvue
            </span>
          ) : (
            <span className="text-[10px] font-black text-black uppercase tracking-tighter">
              {date}
            </span>
          )}
        </div>

        <h3 className="font-black text-black text-[15px] uppercase tracking-tight truncate mb-3 leading-tight">
          {title}
        </h3>

        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <IonIcon
                name={iconLeft as never}
                className="text-black text-[10px]"
              />
              <span className="text-[10px] font-bold text-gray-500 uppercase">
                {infoLeft}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <IonIcon
                name={iconRight as never}
                className="text-black text-[10px]"
              />
              <span className="text-[10px] font-bold text-gray-500 uppercase">
                {infoRight}
              </span>
            </div>
          </div>

          {!isAccepted && (
            <div className="text-right">
              <span className="bg-orange-500 text-white text-[8px] font-black uppercase px-2 py-1 rounded-md tracking-tighter">
                Nouveau
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}