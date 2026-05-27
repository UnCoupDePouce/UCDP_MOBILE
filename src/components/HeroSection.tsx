export default function HeroSection() {
  return (
    <>
      <div>
        <div className="flex items-center text-orange-500 gap-2 mb-4">
          <span className="w-4 h-0.5 bg-orange-500"></span>
          <p>UN COUP DE POUCE</p>
        </div>
        <h1 className="text-5xl font-black uppercase wrap-break-words">
          Trouvez le <br />
          <span className="text-orange-500">bon</span> <br />
          artisan <br />
          proche de chez vous.
        </h1>
      </div>
    </>
  );
}
