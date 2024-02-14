import './components/styles/vg-general.css'
import './components/styles/vg-utility.css'

function TestApp() {
    document.addEventListener('keydown', (eve) => {
        if (eve.ctrlKey) {  // if ctrl is being pressed
            if (!eve.altKey) {
                switch (eve.code) {  // check what other key is being pressed
                    case 'KeyS':
                        console.log('Key S')
                        break;
                    case 'KeyX':
                    case 'KeyQ':
                        break;
                    default:
                        break;
                }
            }
        }
    })

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
