import { Link } from "react-router-dom"
export function BottomWarning({ label, buttonText, to }: {
    label: string,
    buttonText: string,
    to: string
}) {
    return <>
        <p className="text-slate-600 text-sm mt-6 text-center">{label}</p>
            <Link to={to} className="text-blue-600 font-medium hover:underline ml-1">{buttonText}</Link>
    </>

}