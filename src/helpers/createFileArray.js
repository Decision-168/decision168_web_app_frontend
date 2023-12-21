export async function createFileArray(filenames) {
    const filenameArray = filenames.split(',');
    const fileArray = [];
  
    for (const filename of filenameArray) {
      const content = "Placeholder content for" + filename
      const file = new File([content], filename, {
        type: "text/plain", // You may need to adjust the type based on the actual file type
      });
      fileArray.push(file);
    }
  
    return fileArray;
  }