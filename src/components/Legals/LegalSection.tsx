interface LegalsProps {
    title: string;
    content: string
}

export default function LegalSection({title, content}: LegalsProps) {
    return (
        <>
            <section>
                <h2 className="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-2">
                    {title}
                </h2>
                <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400 font-medium text-justify">
                    {content}
                </p>
            </section>
        </>
    )
}