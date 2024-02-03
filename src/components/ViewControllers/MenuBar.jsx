import { useState } from 'react'

import { ActionRow } from '../Buttons/ActionRow'
import { ImageButton } from '../Buttons/ImageButton'
import { MenuTabBar } from './MenuTabBar'

/**
 * Creates a row of buttons for a menu bar
 * @param {Array} tabs | an array of strings for each tab.
 * @param {Array} images | an optional array of images when giving the tabs images
 * @param {Object} moreActions | the object giving to the moreActions ActionRow component, aligned with the menubar.
 * @param {Object} bottomActions | the object giving to the bottomActions ActionRow component.
 */
export default function MenuBar({
	tabs,
	images,
	bottomActions,
	moreActions
}) {
	// State declarations
	const [collapsed, setCollapse] = useState(false);

	return (
		<div className={'side-bar-menu-cont ' + (collapsed ? 'collapsed' : null)}>
			<div className='side-bar-menu-controls'>
				<ImageButton
					src={"https://www.vhpportal.com/repo/assets/icons/menu.png"}
					ClickFunction={setCollapse}
					buttonClass="side-bar-menu"
				/>
				{!collapsed &&
					<div className='side-bar-menu-more-actions'>
						{moreActions && <ActionRow
							objList={moreActions}
						/>}
					</div>
				}
			</div>
			<MenuTabBar
				SetTab={SetTab}
				MenuStyle={"side-bar " + (collapsed ? 'collapsed' : null)}
				tabs={tabs}
				images={images}
			/>
			<ActionRow
				objList={bottomActions}
				addClass="side-bar-bottom-buttons"
				id="side-bar-bottom-buttons"
			/>
		</div>
	);
}