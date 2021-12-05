const fs = require("fs/promises");

async function writeFile(path, content) {
  try {
    await fs.writeFile(path, content);
  } catch (err) {
    throw err;
  }
}

module.exports = writeFile;
