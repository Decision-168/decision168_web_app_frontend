// export function stringAvatar(name) {
//     return {
//         children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
//     };
// }

export function stringAvatar(name) {
    return `${name.split(" ")[0][0]}${name.split(" ")[1] ? name.split(" ")[1][0] : ""}`;
}