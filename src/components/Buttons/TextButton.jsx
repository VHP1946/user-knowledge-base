import React, { Component } from 'react';

import { ButtonContainer } from './ButtonContainer';

/**
 * A button which has only text.
 * @param {Function} ClickFunction | the function called by clicking.
 * @param {String} text | the text associated with the button.
 * @param {String} buttonClass | the class associated with the button.
 * @param {String} title | the title of the button, shown on hover.
 * @param {String} role | the role of the button, used for testing.
 * @param {String} id | the ID of the button.
 * @returns the data passed into the component
 */
export class TextButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ButtonContainer {...this.props}>
                {this.props.text}
            </ButtonContainer>
        )
    }
}