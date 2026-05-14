import { Link } from "react-router";

export default function LandingAuth() {
    return (
        <main className="flex flex-col min-h-screen w-full py-6 px-6 text-black max-w-4xl mx-auto overflow-hidden">
            <header className="flex justify-between items-center mb-12">
                <p className="font-black text-xl tracking-tighter italic">
                    UCP.
                </p>
                <span className="text-[10px] opacity-50 uppercase tracking-widest">FR - v1.1</span>
            </header>

            <section className="grow flex flex-col justify-center mb-6">
                <div className="flex items-center text-orange-500 text-[12px] font-bold gap-2 mb-4">
                    <span className="w-4 h-0.5 bg-orange-500"></span>
                    <p className="tracking-[0.2em]">UN COUP DE POUCE</p>
                </div>

                <h1 className="text-5xl md:text-5xl lg:text-5xl font-black leading-[0.9] uppercase wrap-break-words">
                    Trouvez le <br />
                    <span className="text-orange-500">bon</span> <br />
                    artisan <br />
                    proche de chez vous.
                </h1>
            </section>

            <section className="flex flex-col gap-4 w-full mt-auto">
                <Link to="/register?other" className="group">
                    <div className="bg-transparent border border-black/20 hover:border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-md p-5 flex justify-between items-center">
                        <div>
                            <h3 className="uppercase font-black text-xl md:text-2xl leading-none">
                                Je cherche un artisan
                            </h3>
                            <p className="text-sm font-medium opacity-80 mt-1">Particulier · Gratuit</p>
                        </div>
                        <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </Link>

                <Link to="/register?pro" className="group">
                    <div className="bg-transparent border border-black/20 hover:border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-md p-5 flex justify-between items-center">
                        <div>
                            <h3 className="uppercase font-black text-xl md:text-2xl leading-none">
                                Je suis artisan
                            </h3>
                            <p className="text-sm font-medium opacity-60 mt-1">Pro · Commission 4%</p>
                        </div>
                        <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </Link>

                <div className="mt-6 pb-4 text-center">
                    <p className="text-gray-500 text-sm">
                        Déjà membre ?
                        <Link to="/login" className="text-black underline font-bold uppercase ml-2 hover:text-orange-500 underline-offset-4">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}