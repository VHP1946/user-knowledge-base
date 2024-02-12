import './components/styles/vg-general.css'
import './components/styles/vg-utility.css'

function TestApp() {

    function TestFunction() {
        console.log('TEST FIRE');
        window.ipcRenderer.invoke('TEST-CALL').then(resp => {
            console.log(resp)
        })
    }

    return (
        <>
            <script src='./inject.js'></script>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around'
            }}>
                <button
                    className="create-button flat-action-button"
                    onClick={(eve) => TestFunction()}
                >CREATE</button>
                <button
                    className="dl-button flat-action-button"
                    onClick={() => console.log('TEST')}
                    disabled={true}
                >DOWNLOAD</button>
            </div>
        </>
    )
}

export default TestApp;
