import { useState } from 'react'

import { ImageButton } from '../Buttons/ImageButton'
import { TextButton } from '../Buttons/TextButton'

/**
 * Creates a "tab viewer" style row of buttons for a menu bar
 * @param {Function} SetTab | the function called in the parent component when changing tabs.
 * @param {Array} tabs | an array of strings for each tab.
 * @param {Array} images | an optional array of images when giving the tabs images
 */
export default function MenuTabBar(
    tabs
) {
    const tabItems = RenderButtons(tabs);

    return (
        { tabItems }
    );
}

function RenderButtons(tabs) {
    return (tabs.map(tab => {
        if (tab.image != undefined && tab.image != "") {
            return (
                <ImageButton
                    src={tab.image}
                    key={key + val}
                    data={key}
                    text={this.props.tabs[key]}
                    ButtonType="menu-button"
                    ClickFunction={this.SetTab}
                    buttonClass={this.state.selected[key]}
                    role="tab"
                    aria-level={val}
                />
            )
        } else {
            return (
                <TextButton
                    key={key + val}
                    data={key}
                    text={this.props.tabs[key]}
                    ButtonType="menu-button"
                    ClickFunction={this.SetTab}
                    buttonClass={this.state.selected[key]}
                    role="tab"
                    aria-level={val}
                />
            )
        }
    }))
}