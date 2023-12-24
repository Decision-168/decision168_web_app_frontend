import React, { memo } from "react";
import { IconButton } from "@mui/material";
import { getIconComponent } from "../../utils/GetIconComponent";

const SocialMedia = ({ links, icons }) => {
  // Parse the data into an array of objects
  const socialMediaArray = links && links.split(",");
  const socialMediaIconArray = icons && icons.split(",");

  // Check if both arrays are valid before further processing
  if (!socialMediaArray || !socialMediaIconArray) {
    return null;
  }

  // Create a map to associate each social media link with its corresponding icon
  const socialMediaMap = socialMediaArray.reduce((map, link, index) => {
    const key = socialMediaIconArray[index];
    map[key] = link.trim();
    return map;
  }, {});

  return (
    <div>
      {socialMediaMap &&
        Object.keys(socialMediaMap).map((icon, index) => {
          const IconComponent = getIconComponent(icon);

          return (
            <IconButton key={index} href={socialMediaMap[icon]} target="_blank">
              <span style={{ heigh: "30px", width: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {/* Wrap IconComponent in a span to make it a valid React element */}
                {<IconComponent sx={{ color: "black" }} />}
              </span>
            </IconButton>
          );
        })}
    </div>
  );
};

export default memo(SocialMedia);
