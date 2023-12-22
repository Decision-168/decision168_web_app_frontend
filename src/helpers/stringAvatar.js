// export function stringAvatar(name) {
//     return {
//         children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
//     };
// }

// export function stringAvatar(name) {
//     return `${name.split(" ")[0][0]}${name.split(" ")[1] ? name.split(" ")[1][0] : ""}`;
// }

export function stringAvatar(name) {
    if (typeof name === "string") {
      const nameParts = name.toUpperCase().split(" ");
      return `${nameParts[0][0]}${nameParts[1] ? nameParts[1][0] : ""}`;
    }
    // Handle the case where name is not a string (or undefined) as needed.
    return "";
  }