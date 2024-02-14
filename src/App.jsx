import './components/styles/vg-general.css'
import './components/styles/vg-utility.css'

function TestApp() {


    document.addEventListener('keydown', (eve) => {
        if (eve.ctrlKey) {  // if ctrl is being pressed
            if (!eve.altKey) {
                switch (eve.code) {  // check what other key is being pressed
                    case 'KeyS':
                        console.log('Key S')
                        eve.preventDefault();
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

    async function TestFunction() {
        console.log('TEST FIRE');
        if (window.ipcRenderer == undefined) {
            console.log('no electron')
        } else {
            let resp = await window.ipcRenderer.invoke('TEST-CALL')
            console.log(resp)
        }
    }

    return (
        <>
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
