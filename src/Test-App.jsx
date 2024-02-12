import { utils, writeFile } from 'xlsx'

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

    let tabs = [];
    for (let ea in ref) {
        tabs.push({
            idnum: Number(ea),
            abbrev: ref[ea]
        })
    }

    console.log("TABS", tabs);

    function ACTIVATEdlButton() {
        const button = document.querySelector('.dl-button');
        button.style.backgroundColor = 'green';
        button.disabled = undefined;
    }

    async function CREATEexcel(list) {
        console.log('ListVal', list)
        let resp = await SAVEexcel({ name: 'TEST', list: list })
        console.log(resp);
        ACTIVATEdlButton();
    }

    function SAVEexcel(data) {
        return new Promise((resolve) => {
            //let savefolder = './.temp/';
            let filename = data.name;
            console.log(data)
            let newsheet = utils.json_to_sheet(data.list);
            let newbook = utils.book_new();
    
    
            utils.book_append_sheet(newbook, newsheet);
            writeFile(newbook, filename + '.xlsx');
    
            console.log('Saved!')
            return resolve('Saved');
        })
    }


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around'
        }}>
            <button
                className="create-button flat-action-button"
                onClick={(eve) => CREATEexcel(tabs)}
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



