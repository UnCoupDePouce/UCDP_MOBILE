import IonIcon from "@reacticons/ionicons";

interface InfoRowProps {
  icon: string;
  label: string;
  value?: string;
  onClick?: () => void;
}

export default function InfoRow({ icon, label, value, onClick }: InfoRowProps) {
  const isClickable = !!onClick;

  return (
    <button
      onClick={onClick}
      disabled={!isClickable}
      className={`group w-full flex items-center gap-4 p-2 -ml-2 rounded-[24px] transition-all duration-200 ${isClickable
          ? "active:scale-[0.98] cursor-pointer"
          : "cursor-default"
        }`}
    >
      <div 
        className="size-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-200 bg-white border border-gray-100 shadow-sm">
        <IonIcon
          name={icon as never}
          className={`text-lg transition-colors ${isClickable ? "text-black" : "text-gray-400"}`}
        />
      </div>

      <div className="flex flex-col flex-1 text-left min-w-0">
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
          {label}
        </span>
        <span className="text-[14px] font-bold text-black truncate">
          {value || "Non renseigné"}
        </span>
      </div>

      {isClickable && (
        <div className="mr-2 transition-all duration-300 hover:pl-4">
          <IonIcon name="chevron-forward" className="text-gray-300 text-lg" />
        </div>
      )}
    </button>
  );
}
