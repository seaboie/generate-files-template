#!/usr/bin/env node

import fs from "fs";
import path from "path";

const currentDir = process.cwd();
const projectFolder = path.basename(currentDir);

// Modern browser
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Read the package-template.json file
const templatePath = path.join(__dirname, "package-template.json");
const packageTemplate = fs.readFileSync(templatePath, "utf8");

// Placehoder project description
const projectName = projectFolder.toLowerCase().replace(/\s+/g, "-");
const projectDescription = `A sample ${projectName} project description`;

// Replace the placehoder {{projectName}} with the actual project name.
const packageContent = packageTemplate
  .replace(/{{projectName}}/g, projectName)
  .replace(/{{projectDescription}}/g, projectDescription);

// Define the files to be generated
const files = {
  "README.md": `# ${projectFolder}

## Description  
This is a ${projectFolder} project.
`,
  ".gitignore": "node_modules\n.env",
  "index.js": "// Entry point for the application",
  "package.json": packageContent,
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
