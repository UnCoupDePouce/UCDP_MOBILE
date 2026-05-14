import IonIcon from "@reacticons/ionicons";

export default function ChatIndex() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-10 border-l border-black/20">
      <div className="bg-white size-20 rounded-[30px] shadow-sm flex items-center justify-center mb-6">
        <IonIcon
          name="chatbubbles-outline"
          className="text-3xl text-gray-400"
        />
      </div>
      <h2 className="font-black uppercase text-sm tracking-widest text-black ">
        Tes messages
      </h2>
      <p className="text-[11px] text-gray-500 max-w-[200px] mt-2 font-medium uppercase leading-relaxed">
        Sélectionne une discussion pour commencer à échanger.
      </p>
    </div>
  );
}
