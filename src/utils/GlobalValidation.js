export const globalValidations = {
    first_name: {
        required: "Fisrt Name is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid first name",
        },
    },
    middle_name: {
        required: "Middle Name is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid middle name",
        },
    },
    last_name: {
        required: "Last Name is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid last name",
        },
    },
    about_me: {
        required: "About me description is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid description",
        },
    },
    email_address: {
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
    phone_number: {
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
        required: "Task is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid task",
        },
    },
    tname: {
        required: "Task Name is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid task Name",
        },
    },
    stname: {
        required: "Subtask Name is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid Subtask Name",
        },
    },
    taskNote: {
        required: "Task note is required",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Invalid task note",
        },
    },
    file: {
        required: "file is required",
    },
};
