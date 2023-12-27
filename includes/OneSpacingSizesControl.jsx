/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 * @see https://wordpress.github.io/gutenberg/?path=/docs/components-anglepickercontrol--default
 */
import {
	__experimentalSpacingSizesControl as SpacingSizesControl,
	useSetting,
	isValueSpacingPreset,
} from '@wordpress/block-editor';
import {
	Button,
	Flex,
	Modal,
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue,
} from '@wordpress/components';

// https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/spacing-sizes-control/index.js#L18
// https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/spacer/controls.js

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './OneSpacingSizesControl.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function OneSpacingSizesControl( { label, value, onChange } ) {
	const spacingSizes = useSetting( 'spacing.spacingSizes' );
	const spacingUnits = useSetting( 'spacing.units' );

	console.log( { label, value, onChange } );

	// In most contexts the spacer size cannot meaningfully be set to a
	// percentage, since this is relative to the parent container. This
	// unit is disabled from the UI.
	const availableUnits = spacingUnits
		? spacingUnits.filter( ( unit ) => unit !== '%' )
		: [ 'px', 'em', 'rem', 'vw', 'vh' ];

	const units = useCustomUnits( {
		availableUnits: availableUnits,
	} );

	// const formatValues = ( value ) => {
	// Force the unit to update to `px` when the Spacer is being resized.
	const [ parsedQuantity, parsedUnit ] =
		parseQuantityAndUnitFromRawValue( value );
	const computedValue = isValueSpacingPreset( value )
		? value
		: [ parsedQuantity, parsedUnit ].join( '' );

	// return computedValue;
	// }

	console.log( { computedValue } );

	// const [ values, setValues ] = useState( { one: 0 } );
	// values.one = formatValues( values.one );

	const handleOnChange = ( unprocessedValue ) => {
		console.log( 4, [ unprocessedValue ] );
		onChange( unprocessedValue.one );
	};

	return (
		<SpacingSizesControl
			values={ { one: computedValue } }
			onChange={ handleOnChange }
			label={ label }
			sides={ [ 'one' ] }
			units={ units }
		/>
	);
}
