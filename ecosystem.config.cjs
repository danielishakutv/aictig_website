module.exports = {
  apps: [{
    name: 'aictig-website',
    script: 'node',
    args: 'server.cjs',
    cwd: '/home/aictig/public_html',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/home/aictig/logs/err.log',
    out_file: '/home/aictig/logs/out.log',
    log_file: '/home/aictig/logs/combined.log',
    time: true
  }]
};
