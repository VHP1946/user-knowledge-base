import React, { Component } from 'react'

import { ActionRow } from '../Buttons/ActionRow'


export class ViewToggles extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<ActionRow
				data={[
					{
						type: "ImageButton",
						buttonClass: "sort-button " + this.props.selectedView[0],
						src: "https://www.vhpportal.com/repo/assets/icons/mediumcards.png",
						id: "medium-cards-view",
						data: this.props.data && { key: this.props.data, type: "medium-cards" } || "medium-cards",
						ClickFunction: this.props.ToggleViewType,
						keyName: "view-toggle-mediumcards"
					},
					{
						type: "ImageButton",
						buttonClass: "sort-button " + this.props.selectedView[1],
						src: "https://www.vhpportal.com/repo/assets/icons/list.png",
						id: "list-view",
						data: this.props.data && { key: this.props.data, type: "list" } || "list",
						ClickFunction: this.props.ToggleViewType,
						keyName: "view-toggle-list"
					}
				]}
				actionRowClass="sort-buttons left"
			/>
		);
	}
}