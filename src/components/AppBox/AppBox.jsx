import { useState } from 'react'

import { DropNote } from '../DropNote/DropNote'
import { ImageButton } from '../Buttons/ImageButton'

import { MenuBar } from './MenuBar'


export default function AppBox({
    appinfo,
    settings,
    config,
    controller
}){
    let state = {
        dev: config.dev.active || false,
        verbose: config.dev.verbose || true,
        currApp: 0,
        menubar: {
            active:  true,
            moreOpen: false
        }
    }

    let QuickActions = [];
    let MoreActions = [];

    return (
        <>
            <MenuBar
                tabs = {["Leads","Analytics"]}
                images = {[
                    "https://www.vhpportal.com/repo/assets/icons/calendar.png",
                    "https://www.vhpportal.com/repo/assets/icons/data-analytics.png",
                ]}
                bottomActions = {[
                    {
                        text:"Home",
                        src:"https://www.vhpportal.com/repo/assets/icons/home2.png",
                        type:"ImageButton",
                        keyName:"home",
                        ClickFunction:GoHome
                    },
                    {
                        text:"Filters",
                        src:"https://www.vhpportal.com/repo/assets/icons/filter.png",
                        type:"ImageButton",
                        keyName:"home",
                        ClickFunction:this.props.ToggleBoolean,
                        data:"filterActive"
                    }
                ]}
                moreActions = {[
                    {
                        src:"https://www.vhpportal.com/repo/assets/icons/logout.png",
                        type:"ImageButton",
                        keyName:"home",
                        ClickFunction:this.props.LogUserOut
                    },
                    {
                        src:"https://www.vhpportal.com/repo/assets/icons/helpme.png",
                        type:"ImageButton",
                        keyName:"home",
                        ClickFunction:this.RequestHelp
                    }
                ]}
            />
            {controller}
            <DropNote
                {...this.state.DropNoteProps}
                CloseNote={this.CloseNote}
            />
        </>
    )
}