import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

// Helper function to get the appropriate MUI icon component based on the social media icon name
export const getIconComponent = (icon) => {
    switch (icon) {
        case 'YouTube':
            return YouTubeIcon;
        case 'Pinterest':
            return PinterestIcon;
        case 'LinkedIn':
            return LinkedInIcon;
        case 'Instagram':
            return InstagramIcon;
        case 'Twitter':
            return TwitterIcon;
        case 'Facebook':
            return FacebookIcon;
        default:
            return null;
    }
};