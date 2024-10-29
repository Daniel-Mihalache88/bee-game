const fs = require('fs');
const path = require('path');

function addJsExtension(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      addJsExtension(fullPath); // Recurse for directories
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/(from\s+['"])([^'"]+)(['"];?)/g, (match, p1, p2, p3) => {
        return p2.endsWith('.js') || p2.startsWith('.') === false ? match : `${p1}${p2}.js${p3}`;
      });
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  });
}

addJsExtension(path.resolve(__dirname, 'dist'));
