import React from 'react'
import ReactDOM from 'react-dom/client'

import { ipcRenderer, ipcMain } from 'electron'


import App from './App'

import './components/styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


ipcMain.handle('TEST-CALL', (eve, data) => {
    return new Promise((resolve) => {
        console.log('TEST CALL', 'index.js');
        return resolve('index.js')
    })
})