const ghpages = require('gh-pages');
const path = require('path');

// This task pushes to the `gh-pages-dev` branch of your `dev` remote
ghpages.publish(path.join(__dirname, 'build'), {
  repo: 'https://github.com/SwappyHub-lab/swappy-app-dev.git',
  branch: 'gh-pages-dev'
}, (err) => {
  if (err) {
    console.error('Deployment failed:', err);
  } else {
    console.log('Deployment successful!');
  }
});
