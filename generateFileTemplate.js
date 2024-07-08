#!/usr/bin/env node

import fs from "fs";
import path from "path";

const currentDir = process.cwd();
const projectFolder = path.basename(currentDir);

// Define the files to be generated
const files = {
  "README.md": `# ${projectFolder}

## Description  
This is a ${projectFolder} project.
`,
  ".gitignore": "node_modules\n.env",
  "index.js": "// Entry point for the application",
  "package.json": "",
};

// Functions to create Files.
Object.keys(files).forEach((fileName) => {
  const filePath = path.join(currentDir, fileName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, files[fileName], "utf8");
    console.log(`Success : creating ${fileName}`);
  } else {
    console.log(`${fileName} already exists`);
  }
});
