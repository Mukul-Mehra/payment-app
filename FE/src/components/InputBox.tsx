interface InputBoxProps {
  label: string;
  placeholder: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputBox({ label, placeholder,type, onChange } : InputBoxProps ) {
    return <div>
        <label className="text-slate-900 text-sm font-medium mb-2 block">{label}</label>
        <input onChange={onChange} type={type} className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder={placeholder} />
    </div>
}