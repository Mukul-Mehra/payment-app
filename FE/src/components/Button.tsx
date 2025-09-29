export function Button({ label, onClick }: {
    label: string,
    onClick: () => void
}) {
    return <button onClick={onClick} type="button" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
        {label}
    </button>

}