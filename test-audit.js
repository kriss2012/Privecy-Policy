const fs = require('fs');

function checkFile(path) {
  if (!fs.existsSync(path)) {
    console.error('File missing:', path);
    process.exit(1);
  }
  const stats = fs.statSync(path);
  console.log('OK:', path, '(' + stats.size + ' bytes)');
}

checkFile('privacy-policy.html');
checkFile('index.html');
checkFile('assets/css/variables.css');
checkFile('assets/css/base.css');
checkFile('assets/css/components.css');
checkFile('assets/css/sidebar-content.css');
checkFile('assets/css/print.css');
checkFile('assets/js/privacy-center.js');

// Check that all anchor links in privacy-policy.html point to existing IDs
const html = fs.readFileSync('privacy-policy.html', 'utf8');
const idRegex = /id="([^"]+)"/g;
const hrefRegex = /href="#([^"]+)"/g;

const ids = new Set();
let match;
while ((match = idRegex.exec(html)) !== null) {
  ids.add(match[1]);
}

const missingIds = [];
while ((match = hrefRegex.exec(html)) !== null) {
  const targetId = match[1];
  if (!ids.has(targetId)) {
    missingIds.push(targetId);
  }
}

if (missingIds.length > 0) {
  console.error('Missing ID targets for internal anchors:', missingIds);
  process.exit(1);
} else {
  console.log('SUCCESS: All internal anchor links match existing IDs! Total IDs:', ids.size);
}
