interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "ghost";
    className?: string;
    type?: "button" | "submit" | "reset";
}

export default function Button({
    children,
    onClick,
    type ,
    variant = "primary",
    className = "",
}: ButtonProps) {
    const base =
        "px-5 py-1.5 rounded-md text-sm font-medium transition";

    const variants = {
        primary: "bg-[#026aa7] text-white hover:bg-[#055a8c]",
        ghost: "text-[#5e6c84] hover:bg-[#091e4214]",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${base} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}
