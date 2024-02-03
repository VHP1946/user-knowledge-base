import React, { Component } from 'react';

/**
 * TextArea component
 * @param {Function} ChangeFunction | the function called on change.
 * @param {String} inputClass | the class of the input.
 * @param {String} id | id of the input.
 * @param {String} value | the object in state.
 */
export class TextArea extends Component {
    constructor(props) {
        super(props)

        if (props.inputClass) {
            this.inputClass = "text-area" + ' ' + this.props.inputClass
        } else {
            this.inputClass = 'text-area'
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidUpdate() {
        if (this.inputClass == 'text-input' && this.props.inputClass != undefined) {
            this.inputClass = "text-input" + ' ' + this.props.inputClass
        }
    }

    /**
     * Click event handler
     * Can optionally pass data using props.data
     */
    handleChange(e) {
        if (this.inputClass.includes("form-item-empty") && e.target.value != "") {
            this.inputClass = "text-input"
        }
        this.props.ChangeFunction(e.target.value, this.props.data)
    }

    render() {
        return (
            <textarea
                onChange={this.handleChange}
                className={this.inputClass}
                id={this.props.id}
                value={this.props.value}
                type={this.props.type}
                data={this.props.data}
            />
        );
    }
}