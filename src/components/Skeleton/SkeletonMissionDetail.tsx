export default function SkeletonMissionDetail() {
    return (
        <>
            <div className="w-full h-[40vh] skeleton rounded-none shrink-0"/>

            <main className="relative px-8 pt-10 pb-32 flex flex-col gap-8">

                <section>
                    <div className="skeleton h-9 w-3/4 rounded-md"/>
                    <div className="skeleton h-3 w-1/2 rounded-md mt-3"/>
                </section>

                <hr className="border-black/10 dark:border-white/10"/>

                <section className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="skeleton h-3 w-4 rounded-sm"/>
                        <div className="skeleton h-3 w-24 rounded-sm"/>
                    </div>

                    <div className="space-y-3">
                        <div className="skeleton h-4 w-full rounded-sm"/>
                        <div className="skeleton h-4 w-5/6 rounded-sm"/>
                        <div className="skeleton h-4 w-full rounded-sm"/>
                        <div className="skeleton h-4 w-2/3 rounded-sm"/>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <div className="skeleton w-4 h-4 rounded-full"/>
                        <div className="skeleton h-3 w-32 rounded-sm"/>
                    </div>
                </section>

                <hr className="border-black/10 dark:border-white/10"/>

                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="skeleton h-3 w-4 rounded-sm"/>
                        <div className="skeleton h-3 w-36 rounded-sm"/>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <div className="skeleton aspect-square rounded-sm"/>

                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="skeleton aspect-square rounded-sm opacity-60"/>
                        ))}
                    </div>
                </section>

                <div
                    className="flex items-center gap-3 fixed bottom-0 left-0 w-full px-4 py-8 z-50 border-t bg-base-100 border-gray-200 dark:border-gray-700">
                    <div className="skeleton h-12 w-28"/>
                    <div className="skeleton h-12 flex-1"/>
                </div>
            </main>
        </>
    );
}