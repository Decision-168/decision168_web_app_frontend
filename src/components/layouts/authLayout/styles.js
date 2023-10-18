import loginBackgroundImage from "../../../assets/images/login-back-image.png";

export const AuthLayoutStyles = () => {
    const backGroundImage = {
        backgroundImage: `url(${loginBackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
        backgroundSize: "cover",
        backgroundPosition: "center",
    }
    return { backGroundImage }
}