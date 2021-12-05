const fs = require("fs/promises");

async function isSamePageContent(path, contentToCompare) {
  try {
    const file = await fs.readFile(path, { encoding: "utf-8" });
    return file === contentToCompare;
  } catch (err) {
    throw err;
  }
}

module.exports = isSamePageContent;
