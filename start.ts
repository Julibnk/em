import { BackendApp } from './src/apps/BackendApp';

console.log('Enviroment: ' + process.env.NODE_ENV);

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
