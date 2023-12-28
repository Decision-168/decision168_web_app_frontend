import AuthBackgroundImage from "../../assets/images/auth-back-image.png";

export const AuthStyles = () => {
    const backGroundImage = {
        backgroundImage: `url(${AuthBackgroundImage})`,
        backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", 
        backgroundPosition: "center",
        width: "100%",
        height: "100%", // Set a fixed height to cover the entire viewport vertically
        overflow:"hidden",

    };
    return { backGroundImage };
};
