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
import {
	__experimentalSpacingSizesControl as SpacingSizesControl,
	isValueSpacingPreset,
} from '@wordpress/block-editor';
import { __experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function OneSpacingSizesControl( { label, value, onChange } ) {
	// Вдохновлён
	// https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/spacer/controls.js
	// https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/spacing-sizes-control/index.js#L18

	const [ parsedQuantity, parsedUnit ] =
		parseQuantityAndUnitFromRawValue( value );
	const computedValue = isValueSpacingPreset( value )
		? value
		: [ parsedQuantity, parsedUnit ].join( '' );

	const handleOnChange = ( unprocessedValue ) => {
		onChange( unprocessedValue.one );
	};

	return (
		<SpacingSizesControl
			values={ { one: computedValue } }
			onChange={ handleOnChange }
			label={ label }
			sides={ [ 'one' ] }
		/>
	);
}
