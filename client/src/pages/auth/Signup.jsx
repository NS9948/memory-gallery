import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authService";
import InputField from "../../components/form/InputField";
import AuthButton from "../../components/form/AuthButton";

const initialForm = {
    name: "",
    email: "",
    password: "",
};

const Signup = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

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
        e.preventDefault();

        setLoading(true);
        setErrors({});
        setServerError("");

        try {
            await registerUser(form);

            setForm(initialForm);

            navigate("/login", { replace: true });
        } catch (error) {
            const data = error.response?.data;

            if (data?.errors) {
                setErrors(data.errors);
            } else {
                setServerError(data?.message || "Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md flex flex-col gap-12 justify-center">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-display font-semibold">
                    Create your shared space
                </h1>

                <p className="max-w-sm text-sm leading-relaxed text-muted">
                    A private place for every memory you'll cherish together.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <InputField
                    label="Name"
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    placeholder="John Doe"
                    autoComplete="name"
                    disabled={loading}
                    error={errors.name}
                    onChange={handleChange}
                />

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
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    disabled={loading}
                    error={errors.password}
                    onChange={handleChange}
                />

                <AuthButton
                    loading={loading}
                    text="Create Account"
                    loadingText="Creating Account..."
                />

                {serverError && (
                    <p className="text-sm text-error">
                        {serverError}
                    </p>
                )}
            </form>

            <p className="text-sm text-muted">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="font-medium text-primary transition-colors hover:text-primary-hover"
                >
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default Signup;