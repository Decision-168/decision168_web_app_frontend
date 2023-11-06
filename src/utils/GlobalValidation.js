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
    otherGender: {
        required: "Other gender is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid gender",
        },
    },
    country: {
        required: "Country is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid country",
        },
    },
    phoneNo: {
        required: "Phone no is required",
        pattern: {
            value: /^[0-9]+$/,
            message: "Invalid phone no",
        },
    },
    authorName: {
        required: "Author name is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid author name",
        },
    },
    quote: {
        required: "Quote is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid quote",
        },
    },
    link: {
        required: "link is required",
    },
    task: {
        required: "Task description is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid description",
        },
    },
};
