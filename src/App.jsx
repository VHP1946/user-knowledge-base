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

    let ref = {
        13: 'YEAR',
        12: 'CO',
        0: 'JAN',
        1: 'FEB',
        2: 'MAR',
        3: 'APR',
        4: 'MAY',
        5: 'JUN',
        6: 'JUL',
        7: 'AUG',
        8: 'SEP',
        9: 'OCT',
        10: 'NOV',
        11: 'DEC'
    }

    let tabs = {};
    for (let ea in ref) {
        tabs[ref[ea]] = { tracks: [] }
    }

    console.log("TABS", tabs);

    var ACTIVATEcleanbutton = () => {

    }

    var ACTIVATEsavebutton = () => {
        console.log('CLEANED!')
    }


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space - around'
        }}>
            <div
                className="clean-button flat-action-button"
                onClick={ACTIVATEsavebutton}
            >CLEAN</div>
            <div
                className="save-button flat-action-button"
                onClick={() => { console.log('SAVED!') }}
            >SAVE</div>
        </div>
    )
}

export default TestApp;
