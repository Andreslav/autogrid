/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 * @see https://wordpress.github.io/gutenberg/?path=/docs/components-anglepickercontrol--default
 */
import { DropdownMenu, MenuGroup, MenuItem, Icon } from '@wordpress/components';

import { check } from '@wordpress/icons';

const checkIcon = <Icon icon={ check } size={ 24 } />;

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function DropdownMenuRadio( {
	label,
	controls,
	selected,
	icon,
	onChange,
} ) {
	if ( ! icon ) {
		const selectesControl = controls.find( ( item ) => {
			return item.slug === selected;
		} );
		if ( selectesControl ) {
			icon = selectesControl.icon;
		}
	}

	return (
		<DropdownMenu label={ label } icon={ icon }>
			{ ( { onClose } ) => (
				<>
					<MenuGroup>
						{ controls.map(
							( {
								label,
								slug,
								icon,
								onClick,
								isDestructive,
							} ) => {
								const isSelected = selected === slug;
								return (
									<MenuItem
										key={ slug }
										icon={ icon }
										iconPosition="left"
										isSelected={ isSelected }
										isDestructive={ isDestructive }
										role="menuitemradio"
										onClick={ ( e ) => {
											if ( onClick ) onClick();
											onChange( slug );
											onClose();
										} }
										suffix={
											isSelected ? checkIcon : undefined
										}
									>
										{ label }
									</MenuItem>
								);
							}
						) }
					</MenuGroup>
				</>
			) }
		</DropdownMenu>
	);
}
