import { useState } from 'react';

import { ImageButton } from './ImageButton';
import { TextButton } from './TextButton';
import { SearchBar } from '../Inputs/SearchBar';


/**
 * Takes an array of actions and creates a set of Action Buttons.
 * @param {Object} buttonList | the data used to create each button, of the format:
 * [
 * 		{
 * 			text 			: string
 * 			id   			: string
 * 			ClickFunction 	: function()
 * 			type			: type of object to create
 * 			className		: the class name to be added to the button [not implemented yet]
 * 			data			: the data passed in to the ClickFunction
 * 		}
 * 	]
 */
export default function ActionRow(
	objList,
	addClass = undefined,
	id = undefined
) {
	const row = MapActionRow(objList);

	return (
		<div className={"action-row" + (addClass ? ` ${addClass}` : '')} id={id}>
			{row}
		</div>
	)
}

function MapActionRow(objList) {
	return (objList.map(obj => {
		if (obj.type == "TextButton") {
			return (<TextButton
				text={obj.text}
				id={obj.id}
				ClickFunction={obj.ClickFunction}
				buttonClass={obj.buttonClass}
				data={obj.data}
				key={obj.keyName + obj.text}
			/>)
		} else if (obj.type == "SearchBar") {
			return (<SearchBar
				FilterByText={obj.FilterByText}
				placeholder={obj.placeholder}
				searchKey={obj.searchKey}
			/>)
		} else {
			return (<ImageButton
				ClickFunction={obj.ClickFunction}
				src={obj.src}
				text={obj.text}
				id={obj.id}
				title={obj.title}
			/>)
		}
	}))
}