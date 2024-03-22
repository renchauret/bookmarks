'use client'

export const ClientButton = ({
    id,
    text,
    serverAction
}: {
    id?: string,
    text: string,
    serverAction: Function
}) => {
    return (
        <button
            id={id}
            onClick={async () => {
                serverAction(id)
            }}
        >
            {text}
        </button>
    )
}