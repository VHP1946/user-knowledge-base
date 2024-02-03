import React, { Component } from 'react';

import { SetProperty, Clone } from '../functions/vhp-tools';
import { TextButton } from '../Buttons/TextButton'
import { TextInput } from '../Inputs/TextInput'

function getDisplayValue(value) {
	if (value.text != undefined) {
		return value.text
	}
	return value
}

/**
 * A list component. Allows for the display of an array of strings in a list format
 * with an option to remove elements.
 * @param {Array} list | an array of strings to be displayed
 * @param {String} type | "numbered" or "bullet". defaults "numbered".
 * @param {Function} RemoveFunction | optional function which enables removing items from list.
 */
export class List extends Component {
	constructor(props) {
		super(props)

		this.state = {
			newItem: "",
			formClass: ""
		}

		this.RenderList = this.RenderList.bind(this)
		this.SetProperty = SetProperty.bind(this)
		this.AddFunction = this.AddFunction.bind(this)
		this.GetData = this.GetData.bind(this)
	}

	GetData(index) {
		if (this.props.data) {
			return this.props.data[index]
		}

		return this.props.list[index]
	}

	/**
	 * Change event handler
	 * Can optionally pass data using props.data
	 * 	- I don't understand why I did data and list separate
	 * @todo Rework list to support optionally displaying text,value pairs as only displaying the text
	 */
	RenderList() {
		let list = []
		for (let index in this.props.list) {
			if (this.props.RemoveFunction) {
				list.push(<div className='list-item' key={this.props.list[index] + index}>
					{Number(index) + 1}. {getDisplayValue(this.props.list[index])}
					{this.props.EditFunction && <TextButton
						text="Edit"
						buttonClass="list-item-edit"
						ClickFunction={this.props.EditFunction}
						data={this.GetData(index)}
					/>}
					<TextButton
						text="X"
						buttonClass="list-item-remove"
						ClickFunction={this.props.RemoveFunction}
						data={this.GetData(index)}
					/>
				</div>)
			} else if (this.props.EditFunction) {
				list.push(<div className='list-item' key={this.props.list[index] + index}>
					{Number(index) + 1}. {this.props.list[index]}
					<TextButton
						text="Edit"
						buttonClass="list-item-edit"
						ClickFunction={this.props.EditFunction}
						data={this.GetData(index)}
					/>
				</div>)
			} else {
				list.push(<div className='list-item' key={this.props.list[index] + index}>{Number(index) + 1}. {this.props.list[index]}</div>)
			}

		}

		return list
	}

	AddFunction() {
		if (this.state.newItem === "") {
			this.setState({
				formClass: "form-item-empty"
			})
		} else {
			let data = Clone(this.state.newItem)
			this.setState({
				formClass: "",
				newItem: ""
			}, () => {
				this.props.AddFunction(data)
			})
		}
	}

	render() {
		return (
			<div className='list-cont'>
				{this.props.AddFunction &&
					<label className='form-info-item button'>
						<TextInput
							value={this.state.newItem}
							ChangeFunction={this.SetProperty}
							data="newItem"
							inputClass={this.state.formClass}
						/>
						<TextButton
							ClickFunction={this.AddFunction}
							data={this.state.newItem}
							text="Add"
							buttonClass="Text-Only-Button"
						/>
					</label>
				}
				<div className='numbered-list'>
					{this.RenderList()}
				</div>
			</div>

		);
	}
}