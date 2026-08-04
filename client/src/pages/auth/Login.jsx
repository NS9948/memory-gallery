import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputField from "../../components/form/InputField"
import AuthButton from "../../components/form/AuthButton"
import { loginUser } from "../../../../server/src/services/authService"

const initialForm = {
    email: "",
    password: ""
}

const Login = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState(initialForm)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    
        if (serverError) {
            setServerError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors({})
        setServerError("");

        try {
            await loginUser();
            setForm(initialForm)
            navigate("/", { replace: true });
        } catch (error) {
            const data = error.response?.data;
        
            if (data?.errors) {
                setErrors(data.errors);
            } else {
                setServerError(data?.message || "Something went wrong.");
            }
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className="w-full max-w-md flex flex-col gap-12 justify-center">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-display font-semibold">
                    Welcome back
                </h1>

                <p className="max-w-sm text-sm leading-relaxed text-muted">
                    Sign in to continue your journey together.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <InputField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    placeholder="john@example.com"
                    autoComplete="email"
                    disabled={loading}
                    error={errors.email}
                    onChange={handleChange}
                />

                <InputField
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    error={errors.password}
                    onChange={handleChange}
                />

                <AuthButton
                    loading={loading}
                    text="Sign In"
                    loadingText="Signing In..."
                />

                {serverError && (
                    <p className="text-sm text-error">
                        {serverError}
                    </p>
                )}
            </form>

            <p className="text-sm text-muted">
                Don't have an account?{" "}
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-colors hover:text-primary-hover"
                >
                    Create Account
                </Link>
            </p>
        </div>
  )
}

export default Login
