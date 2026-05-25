interface HeaderProps {
    name?: string
}

export default function Header({name}: HeaderProps) {
    return (
        <>
            <header
                className="fixed top-0 z-10 w-full p-4 bg-base-100 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-black uppercase tracking-tighter">{name}</h1>
                </div>
            </header>
        </>)
}