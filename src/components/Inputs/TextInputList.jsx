import React, { Component } from 'react';

import { SetProperty } from '../functions/vhp-tools';
import { TextButton } from '../Buttons/TextButton'
import { List } from '../Lists/List'
import { TextInput } from './TextInput'

/**
 * A component for displaying a dynamic, user generated list of strings.
 * @param {String} data | the key associated with the list object in the containers state.
 * @param {Function} UpdateFunction | the external function called each time an item is removed or added to the list.
 * @param {Boolean} hideEmptyList | determines whether or not to show or hide the text when the list is empty. defaults to false.
 * @param {String} emptyListText | determines the text displayed when the list is empty and hideEmptyList is false. Defaults to *No items added to list.*
 */
export class TextInputList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			list: this.props.list || [],
			text: "",
			emptyListText: this.props.emptyListText || "No items added to list."
		}

		this.SetProperty = SetProperty.bind(this)
		this.AddListItem = this.AddListItem.bind(this)
		this.RemoveListItem = this.RemoveListItem.bind(this)
		this.DisplayList = this.DisplayList.bind(this)
	}

	AddListItem() {
		let newList = JSON.parse(JSON.stringify(this.state.list))
		newList.push(this.state.text)
		this.setState({
			list: newList,
			text: ""
		}, () => {
			if (this.props.UpdateFunction) {
				this.props.UpdateFunction(JSON.parse(JSON.stringify(this.state.list)), this.props.data)
			}
		})
	}

	/**
	 * Removes an item from the list in state.
	 * @param {String} text | the item being removed
	 */
	RemoveListItem(text) {
		let newList = JSON.parse(JSON.stringify(this.state.list))
		const index = newList.indexOf(text)
		if (index > -1) {
			newList.splice(index, 1)
		}
		this.setState({
			list: newList
		}, () => {
			if (this.props.UpdateFunction) {
				this.props.UpdateFunction(JSON.parse(JSON.stringify(this.state.list)), this.props.data)
			}
		})
	}
	/**
	 * Displays the list in state. If the list is empty, uses hideEmptyList to determine visibility of text
	 * which states no items are added to list.
	 */
	DisplayList() {
		if (this.state.list.length > 0) {
			return <List
				list={this.state.list}
				RemoveFunction={this.RemoveListItem}
			/>
		} else {
			if (this.props.hideEmptyList) {
				return null
			} else {
				return <div className='list-input-empty-text'>{this.state.emptyListText}</div>
			}
		}
	}

	render() {
		return (
			<div className='list-input-cont'>
				<div className='list-input-actions'>
					<TextInput
						value={this.state.text}
						data="text"
						ChangeFunction={this.SetProperty}
						placeholder={this.props.placeholder}
					/>
					<TextButton
						text="+"
						buttonClass="list-input-button"
						ClickFunction={this.AddListItem}
					/>
				</div>
				{this.DisplayList()}
			</div>
		);
	}
}