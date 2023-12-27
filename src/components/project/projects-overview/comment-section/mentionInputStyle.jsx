// export default {
//   control: {
//     backgroundColor: "#fff",
//     fontSize: 13,
//     fontWeight: "normal",
//   },

//   "&multiLine": {
//     control: {
//       fontFamily: "monospace",
//     },
//     highlighter: {
//       padding: 9,
//       border: "1px solid transparent",
//     },
//     input: {
//       padding: 9,
//       border: "1px solid silver",
//       borderRadius: "5px",
//       fontSize: 13,
//       backgroundColor: "#eff2f7",
//     },
//   },

//   "&singleLine": {
//     display: "inline-block",
//     width: 180,
//     highlighter: {
//       padding: 1,
//       border: "2px inset transparent",
//     },
//     input: {
//       padding: 1,
//       border: "2px inset",
//     },
//   },

//   suggestions: {
//     list: {
//       backgroundColor: "white",
//       border: "1px solid rgba(0,0,0,0.15)",
//       fontSize: 14,
//     },
//     item: {
//       padding: "5px 15px",
//       borderBottom: "1px solid rgba(0,0,0,0.15)",
//       "&focused": {
//         backgroundColor: "#cee4e5",
//       },
//     },
//   },
// };

export default {
  control: {
    backgroundColor: "#fff",
    fontSize: 13,
    fontWeight: "normal",
  },

  "&multiLine": {
    control: {
      fontFamily: "monospace",
      borderRadius: "25px",
    },
    highlighter: {
      padding: 9,
      border: "1px solid transparent",
    },
    input: {
      padding: "10px",
      border: "0px",
      borderRadius: "25px",
      fontSize: 14,
      fontFamily: "Your Desired Font, sans-serif",
      backgroundColor: "#F5F5F5",
      outline: "none",
      "&:focus": {
        boxShadow: "none",
      },
      "&::placeholder": {
        color: "#666666",
        fontWeight: "100", 
      },
      color: "#383838",
    },
  },

  "&singleLine": {
    display: "inline-block",
    highlighter: {
      padding: 1,
      border: "2px inset transparent",
    },
    input: {
      borderRadius: "25px",
      padding: "10px",
      border: "2px inset",
      fontSize: 14,
      fontFamily: "Your Desired Font, sans-serif",
      "&:focus": {
        boxShadow: "none",
      },
      "&::placeholder": {
        color: "#666666",
        fontWeight: "100", // Make placeholder text lighter
      },
      color: "#383838",
    },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};


