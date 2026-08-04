const InputField = ({
    label,
    id,
    name,
    type,
    value,
    placeholder,
    autoComplete,
    disabled,
    error,
    onChange,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={id}
                className="text-sm font-medium text-muted"
            >
                {label}
            </label>

            <input
                id={id}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required
                spellCheck={false}
                disabled={disabled}
                onChange={onChange}
                className={`
                    w-full
                    rounded-xl
                    border
                    bg-input
                    px-4
                    py-3
                    text-foreground
                    placeholder:text-placeholder
                    outline-none
                    transition-all
                    duration-200
                    focus:border-primary
                    focus:ring-4
                    focus:ring-primary/15
                    ${error ? "border-error" : "border-border"}
                `}
            />

            {error && (
                <p className="text-sm text-error">
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputField;