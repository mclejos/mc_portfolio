const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'images', 'tech');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks);
        fs.writeFileSync(dest, body);
        console.log(`Saved: ${dest} (${body.length} bytes)`);
        resolve(body.toString());
      });
    }).on('error', reject);
  });
}

async function run() {
  const icons = [
    { name: 'javascript', url: 'https://cdn.simpleicons.org/javascript/FFFFFF' },
    { name: 'python', url: 'https://cdn.simpleicons.org/python/FFFFFF' },
    { name: 'openjdk', url: 'https://cdn.simpleicons.org/openjdk/FFFFFF' },
    { name: 'c', url: 'https://cdn.simpleicons.org/c/FFFFFF' },
    { name: 'cplusplus', url: 'https://cdn.simpleicons.org/cplusplus/FFFFFF' },
    { name: 'react', url: 'https://cdn.simpleicons.org/react/FFFFFF' },
    { name: 'nextdotjs', url: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF' },
    { name: 'nodedotjs', url: 'https://cdn.simpleicons.org/nodedotjs/FFFFFF' },
    { name: 'mysql', url: 'https://cdn.simpleicons.org/mysql/FFFFFF' },
    { name: 'postgresql', url: 'https://cdn.simpleicons.org/postgresql/FFFFFF' },
    { name: 'supabase', url: 'https://cdn.simpleicons.org/supabase/FFFFFF' },
    { name: 'git', url: 'https://cdn.simpleicons.org/git/FFFFFF' },
    { name: 'html5', url: 'https://cdn.simpleicons.org/html5/FFFFFF' },
    { name: 'css3', url: 'https://cdn.simpleicons.org/css3/FFFFFF' },
    { name: 'figma', url: 'https://cdn.simpleicons.org/figma/FFFFFF' },
    { name: 'cisco', url: 'https://cdn.simpleicons.org/cisco/FFFFFF' },
  ];

  for (const icon of icons) {
    const dest = path.join(targetDir, `${icon.name}.svg`);
    try {
      await download(icon.url, dest);
    } catch (e) {
      console.error(`Failed ${icon.name}:`, e.message);
    }
  }

  // Check AWS
  try {
    console.log("Checking Simple Icons for amazonwebservices / amazonaws...");
    await download('https://cdn.simpleicons.org/amazonwebservices/FFFFFF', path.join(targetDir, 'aws.svg'));
    console.log("Simple Icons amazonwebservices worked!");
  } catch (e1) {
    try {
      await download('https://cdn.simpleicons.org/amazonaws/FFFFFF', path.join(targetDir, 'aws.svg'));
      console.log("Simple Icons amazonaws worked!");
    } catch (e2) {
      console.log("Simple Icons has no AWS icon. Using Devicon fallback...");
      await download(
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
        path.join(targetDir, 'aws.svg')
      );
      console.log("Devicon AWS downloaded!");
    }
  }
}

run();
