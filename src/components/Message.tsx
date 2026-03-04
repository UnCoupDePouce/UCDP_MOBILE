export default function Message({ data }: { data?: any }) {
    if (!data || !data.status) return null;

    const isSuccess = data.status.toString().startsWith("20");

    return (
        <div
            role="alert"
            className={`
                my-6 flex items-center gap-4
                px-5 py-4 rounded-2xl
                border
                transition-all duration-300
                ${isSuccess
                ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300"
                : "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300"
            }
            `}
        >
            <div className="flex-shrink-0">
                {isSuccess ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}
            </div>

            <p className="text-sm font-medium">
                {data.message}
            </p>
        </div>
    );
}