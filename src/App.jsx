import './components/styles/vg-general.css'
import './components/styles/vg-utility.css'

import { ipcRenderer, ipcMain } from 'electron'


function TestApp() {

    function TestFunction(){
        console.log('TEST FIRE');
        ipcRenderer.invoke('TEST-CALL').then(resp=>{
            console.log(resp)
        })
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around'
        }}>
            <button
                className="create-button flat-action-button"
                onClick={(eve) => TestFunction(tabs)}
            >CREATE</button>
            <button
                className="dl-button flat-action-button"
                onClick={() => console.log('TEST')}
                disabled={true}
            >DOWNLOAD</button>
        </div>
    )
}

export default TestApp;

ipcMain.handle('TEST-CALL', (eve, data) => {
    return new Promise((resolve) => {
        console.log('TEST CALL', 'App.jsx');
        return resolve('App.jsx')
    })
})

