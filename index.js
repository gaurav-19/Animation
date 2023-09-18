
import {AppRegistry, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// avoid app text change on device text change
if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
}

AppRegistry.registerComponent(appName, () => App);
