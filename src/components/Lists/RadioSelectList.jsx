import React, { Component } from 'react';

import { Checkbox } from '../Inputs/Checkbox';

/**
 * Mimics the radio select list HTML tag. Takes in a list of options and returns a string of the selected option or null.
 * @param {Array} options | an array of string options.
 * @param {Function} UpdateFunction | the external function called in the containing element when selecting an option.
 */
export class RadioSelectList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selected: ""
		}

		this.MapOptions = this.MapOptions.bind(this)
		this.SelectOption = this.SelectOption.bind(this)
	}

	componentDidMount() {
		for (let i = 0; i < this.props.list.length; i++) {
			let value = false
			if (this.props.selected != undefined) {
				if (this.props.selected == this.props.list[i]) {
					value = true
				}
			}
			this.setState({
				[this.props.list[i]]: value
			})
		}
	}

	SelectOption(value, key) {
		let newState = JSON.parse(JSON.stringify(this.state))
		for (let innerkey in newState) {
			if (innerkey != "selected") {
				newState[innerkey] = false
			}
		}
		newState[key] = value
		if (value == true) {
			newState.selected = key
		} else {
			newState.selected = null
		}
		this.setState({
			...newState
		}, () => {
			if (this.props.UpdateFunction) {
				this.props.UpdateFunction(this.state.selected, this.props.data)
			}
		})
	}

	MapOptions() {
		let options = []
		for (let i = 0; i < this.props.list.length; i++) {
			options.push(
				<div className={'radio-select-option ' + this.props.radioClass} key={this.props.list[i] + i}>
					<Checkbox
						value={this.state[this.props.list[i]]}
						data={this.props.list[i]}
						ClickFunction={this.SelectOption}
					/>
					<div className='radio-select-text'>
						{this.props.list[i]}
					</div>
				</div>
			)
		}
		return options
	}

	render() {
		return (
			<div className='radio-select-list'>
				{this.MapOptions()}
			</div>
		);
	}
}