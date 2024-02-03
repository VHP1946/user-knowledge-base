import React, { Component } from 'react';


/**
 * TextInput component
 * @param {Function} ChangeFunction | the function called on change.
 * @param {String} inputClass | the class of the input.
 * @param {String} id | id of the input.
 * @param {String} type | the HTML input type.
 * @param {String} value | the object in state.
 * @param {Boolean} autoFocus | determines whether to automatically focus the item
 */
export class TextInput extends Component {
	constructor(props) {
		super(props)

		let input_Class = 'text-input'
		if (props.inputClass != undefined) {
			input_Class = "text-input" + ' ' + this.props.inputClass
		}

		this.state = {
			inputClass: input_Class
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleKeyDown = this.handleKeyDown.bind(this)
	}

	componentDidUpdate() {
		if (!this.state.inputClass.includes(this.props.inputClass) && this.props.inputClass != undefined && this.props.value == "") {
			this.setState({
				inputClass: "text-input " + this.props.inputClass
			})
		}

		if (this.state.inputClass.includes("form-item-empty") && this.props.value != "") {
			this.setState({
				inputClass: "text-input"
			})
		}
	}

	/**
	 * Click event handler
	 * Can optionally pass data using props.data
	 */
	handleChange(e) {
		if (this.state.inputClass.includes("form-item-empty") && e.target.value != "") {
			this.setState({
				inputClass: "text-input"
			})
		}
		this.props.ChangeFunction(e.target.value, this.props.data)
	}

	/**
	 * Event handler for submitting a form.
	 * @param {*} e 
	 */
	handleKeyDown(e) {
		if (e.key == "Enter" && this.props.SubmitFunction != undefined) {
			this.props.SubmitFunction(this.props.submitData)
		}
	}

	render() {
		return <input
			onChange={this.handleChange}
			onKeyDown={this.handleKeyDown}
			className={this.state.inputClass}
			id={this.props.id}
			value={this.props.value}
			type={this.props.type}
			data={this.props.data}
			accept={this.props.accept}
			placeholder={this.props.placeholder}
			autoFocus={this.props.autoFocus}
			disabled={this.props.disabled || false}
			maxLength={this.props.maxLength}
			minLength={this.props.minLength}
		/>
	}
}