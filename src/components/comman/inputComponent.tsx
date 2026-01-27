interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    className?: string;
    name?:string;
    inputId?:string;
    inputType?:string;
    inputmode?:string;
}

export default function InputComponent({ value, onChange, placeholder, type = "text", className = "", name="text" }: InputProps) {
    return (
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            name={name}
            // Logic fixed: Combining default styles with the incoming className prop
            className={`
                w-full
                px-4 py-2.5
                rounded-xl
                border border-slate-200
                bg-slate-50/50
                text-sm text-slate-900
                placeholder:text-slate-400
                transition-all duration-200
                focus:outline-none
                focus:bg-white
                focus:border-indigo-500
              
                ${className}
            `}
        />
    );
}