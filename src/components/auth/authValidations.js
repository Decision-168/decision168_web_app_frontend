export const authValidations = {
    fullName: {
        required: "Full Name is required",
        minLength: {
            value: 4,
            message: "Full Name must be at least 4 characters",
        },
        maxLength: {
            value: 20,
            message: "Full Name must not exceed 20 characters",
        },
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid full name format",
        },
    },
    email: {
        required: "Email is required",
        pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email format",
        },
    },
    password: {
        required: "Password is required",
        pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,32}$/gm,
            message: "Password must be at least 5 characters with at least one uppercase letter, one lowercase letter, one number, and can contain special characters.",
        },
        maxLength: {
            value: 32,
            message: "Password must not exceed 32 characters",
        },
    },
    confirmPassword: {
        required: "Confirm Password is required",
        validate: (value, values) => {
            if (value === values.password) {
                return true;
            }
            return "Passwords do not match";
        },
    },
};
