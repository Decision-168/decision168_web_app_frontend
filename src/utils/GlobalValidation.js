export const globalValidations = {
    firstName: {
        required: "Fisrt Name is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid first name",
        },
    },
    middleName: {
        required: "Middle Name is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid middle name",
        },
    },
    lastName: {
        required: "Last Name is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid last name",
        },
    },
    aboutMe: {
        required: "About me description is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid description",
        },
    },
    email: {
        required: "Email is required",
        pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email format",
        },
    },
    designation: {
        required: "Designation is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid designation",
        },
    },
    company: {
        required: "Company is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid company",
        },
    },
    country: {
        required: "Country is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid country",
        },
    },
};
