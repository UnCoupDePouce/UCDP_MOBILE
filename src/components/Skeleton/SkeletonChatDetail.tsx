export default function SkeletonChatDetail() {
    return (
        <>
            <div className="flex flex-col gap-6">
                <div className="chat chat-start w-full">
                    <div className="chat-bubble skeleton h-16 w-3/4 max-w-xs "/>
                </div>
                <div className="chat chat-end w-full">
                    <div className="chat-bubble skeleton h-10 w-1/3 max-w-xs"/>
                </div>
            </div>
        </>
    )
}