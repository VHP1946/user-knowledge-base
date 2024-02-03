import React, { Component } from 'react';

/**
 * A checkbox component.
 * @param {String} inputClass | the class of the checkbox.
 * @param {Boolean} value | boolean from the parent component which determines whether to show the checkmark.
 * @param {Function} ClickFunction | the function called when clicking the component
 * @param {*} data | the data passed into the ClickFunction
 * @returns !*value* and data.
 */
export class Checkbox extends Component {
    constructor(props) {
        super(props)

        if (props.inputClass) {
            this.inputClass = "checkbox-cont" + ' ' + this.props.inputClass
        } else {
            this.inputClass = 'checkbox-cont'
        }

        this.handleClick = this.handleClick.bind(this)
    }

    /**
     * Click event handler
     */
    handleClick() {
        this.props.ClickFunction(!this.props.value, this.props.data)
    }

    render() {
        return (
            <div
                onClick={this.handleClick}
                className={this.inputClass}
                id={this.props.id}
            >
                {this.props.value && <div className="checkbox-check" data-testid={this.props.id + "checkbox-check"}></div>}
            </div>
        );
    }
}