const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');

const replacements = {
  '1598531405105-9b2f3d640fa8': '1500648767791-00dcc994a43e', // Products
  '1609144828691-1fa64ceaaab8': '1544005313-94ddf0286df2', // Products
  '1599598425947-3300454316d2': '1600411833196-7c1f6b1a8b90', // Products
  '1597055909287-2521c78473e6': '1614594975525-e45190c55d0b', // Hero, Products
  '1416879598555-523e00dd2f97': '1518531933037-91b2f5f229cc', // Instagram
  '1459385311090-671c668b5ca6': '1512428559087-560fa5ceab42', // Instagram
  '1497250681554-fc1acffc19f8': '1485955900006-10f4d324d411', // Instagram
  '1487798452839-440eb76e1a47': '1438761681033-6461ffad8d80'  // CategoryCards, GrowPlant
};

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const [broken, working] of Object.entries(replacements)) {
      if (content.includes(broken)) {
        content = content.replace(new RegExp(broken, 'g'), working);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated images in ${file}`);
    }
  }
});
console.log('Done!');
