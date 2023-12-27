// const stfile = [{"0": "file1"}, {"1": "file2"}]
// const data = stfile.map((fileObj) => Object.values(fileObj)[0])

// const filenames = "D168.docx, D168.docx"

// const filenameArray = filenames.split(',');
// const fileArray = [];

// for (const filename of filenameArray) {
//   const content = "Placeholder content for " + filename
//   const file = new File([content], filename, {
//     type: "text/plain", // You may need to adjust the type based on the actual file type
//   });
//   fileArray.push(file);
// }

const links = [
  { link: "link1", linkCommnet: "comment1" },
  { link: "link2", linkCommnet: "comment2" },
];

const result = links.map((link) => {
  return link.link;
});

const comment = links.map((link) => {
  return link.linkCommnet;
});
