import { registerRootComponent } from 'expo';
import {typography} from './utils/typography';

import App from './App';

typography();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
