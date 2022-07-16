import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAhEVb-Qar1y1OS84t6O38FpUJD9ZdfOcM',
  authDomain: 'project-app-69ec7.firebaseapp.com',
  databaseURL: 'https://project-app-69ec7.firebaseio.com',
  projectId: 'project-app-69ec7',
  storageBucket: 'project-app-69ec7.appspot.com',
  messagingSenderId: '1006250235114',
  appId: '1:1006250235114:web:858dd0b07cb43453',
};



export default () => {
  initializeApp(firebaseConfig);
}
