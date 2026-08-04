const AuthButton = ({
    loading,
    text,
    loadingText,
}) => {
    return (
        <button
            type="submit"
            disabled={loading}
            className={`
                mt-2
                w-full
                rounded-xl
                bg-primary
                px-4
                py-3
                text-surface
                font-semibold
                outline-none
                transition-colors
                duration-200
                focus:ring-4
                focus:ring-primary/15
                ${loading ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-primary-hover"}
            `}
        >
            {loading ? loadingText : text}
        </button>
    );
};

export default AuthButton;