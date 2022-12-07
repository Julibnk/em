import { BackendApp } from './src/apps/BackendApp';

try {
  new BackendApp().start();
} catch (e) {
  console.log(e);
  process.exit(1);
}

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  process.exit(1);
});
