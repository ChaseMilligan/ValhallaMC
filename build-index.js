const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, 'content');

/**
 * Recursively scans directories to create index.json files.
 */
function buildIndex(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  // Filter for only .md files in the CURRENT directory
  const mdFiles = files
    .filter(file => file.isFile() && file.name.endsWith('.md'))
    .map(file => file.name);

  // If there are markdown files, write an index.json in this folder
  if (mdFiles.length > 0) {
    // Find markdown files that contain a key like "order=1" or "order: 1"
    // const matchedFiles = mdFiles.filter(name => {
    //   const content = fs.readFileSync(path.join(dir, name), 'utf8');
    //   return /\border\s*(?:=|:)\s*-?\d+\b/.test(content);
    // });

    // console.log(matchedFiles);

    const indexPath = path.join(dir, 'index.json');

    const orderRegex = /\border\s*(?:=|:)\s*(-?\d+)\b/;
    const fileInfos = mdFiles.map(name => {
      const content = fs.readFileSync(path.join(dir, name), 'utf8');
      const m = content.match(orderRegex);
      return { name, order: m ? parseInt(m[1], 10) : null };
    });

    // Sort files with an order value by that value (stable); append files without order afterwards
    const withOrder = fileInfos
      .filter(f => f.order !== null)
      .sort((a, b) => {
      if (a.order === b.order) return a.name.localeCompare(b.name);
      return a.order - b.order;
      })
      .map(f => f.name);

    const withoutOrder = fileInfos
      .filter(f => f.order === null)
      .map(f => f.name);

    const orderedList = [...withOrder, ...withoutOrder];

    fs.writeFileSync(indexPath, JSON.stringify(orderedList, null, 2));
    console.log(`✅ Created index for: ${path.relative(CONTENT_DIR, dir) || 'root'} (${orderedList.length} entries)`);
  }

  // Recurse into subdirectories
  files.filter(file => file.isDirectory()).forEach(subDir => {
    buildIndex(path.join(dir, subDir.name));
  });
}

// Start the process
console.log('Building content indexes...');
buildIndex(CONTENT_DIR);
console.log('Build complete!');
