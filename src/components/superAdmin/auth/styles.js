import AuthBackgroundImage from "../../../assets/images/auth-back-image.png";

export const AuthStyles = () => {
  const backGroundImage = {
    backgroundImage: `url(${AuthBackgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: (t) =>
      t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  };
  return { backGroundImage };
};
