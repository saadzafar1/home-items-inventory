import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/divider';
import Menubar from 'primevue/menubar';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';

export default function (app) {
  app.component('Button', Button);
  app.component('InputText', InputText);
  app.component('Checkbox', Checkbox);
  app.component('Divider', Divider);
  app.component('Menubar', Menubar);
  app.component('ProgressSpinner', ProgressSpinner);
  app.component('Message', Message);
}
