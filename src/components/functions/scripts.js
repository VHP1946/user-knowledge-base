import {$} from 'jquery';

$(document.getElementsByClassName('clean-button')[0]).css('background-color', 'red');
$(document.getElementsByClassName('save-button')[0]).css('background-color', 'red');

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
    $(document.getElementsByClassName('clean-button')[0]).css('background-color', 'green');
    document.getElementsByClassName('clean-button')[0].addEventListener('click', async (eve) => {
        
        ACTIVATEsavebutton();
    })
}

var ACTIVATEsavebutton = () => {
    $(document.getElementsByClassName('save-button')[0]).css('background-color', 'green');
    document.getElementsByClassName('save-button')[0].addEventListener('click', async (eve) => {
       
    })
}

ACTIVATEcleanbutton();