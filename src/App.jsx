/* import { AppBox } from './components';

import config from './config/config.json'
import appinfo from '../package.json'
import AppController from './controllers/TestController'

function App() {
    return (
        <AppBox
            config={config}
            appinfo={appinfo}
            controller={AppController}
        />
    );
} */

import './components/styles/vg-general.css'
import './components/styles/vg-utility.css'

function TestApp() {
    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'space - around'
            }}>
                <div className="clean-button flat-action-button">CLEAN</div>
                <div className="save-button flat-action-button">SAVE</div>
            </div>
            <script src='./components/functions/scripts.js'></script>
        </>
    )
}

export default TestApp;
