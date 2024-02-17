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
	Button,
	Icon,
	Flex,
	FlexBlock,
	FlexItem,
	__experimentalUnitControl as UnitControl,
	__experimentalHStack as HStack,
	Dropdown,
} from '@wordpress/components';

import {
	mobile,
	trash,
	chevronDown,
	chevronUp,
	moreVertical,
} from '@wordpress/icons';

import OneSpacingSizesControl from './OneSpacingSizesControl';
import DropdownMenuRadio from './DropdownMenuRadio';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function BaseControlMediaItem( {
	value,
	disableUnits,
	isAxis,
	isHideDelete,
	isHideMoveUp,
	isHideMoveDown,
	controlsAxis = [],
	onChange = () => {},
	onDelete = () => {},
	onMoveUp = () => {},
	onMoveDown = () => {},
	valueProp = {},
	minProp = {},
	maxProp = {},
} ) {
	const useMediaRule = value.min !== '' || value.max !== '';
	const axis = value.axis || 'all';

	const controlsRule = [
		{
			slug: 'moveUp',
			label: __( 'Move up', 'autogrid' ),
			icon: chevronUp,
			hide: isHideMoveUp,
		},
		{
			slug: 'moveDown',
			label: __( 'Move down', 'autogrid' ),
			icon: chevronDown,
			hide: isHideMoveDown,
		},
		{
			slug: 'delete',
			label: __( 'Delete a rule', 'autogrid' ),
			icon: trash,
			isDestructive: true,
			hide: isHideDelete,
		},
	].filter( ( item ) => ! item.hide );

	const onChangeMin = ( val ) => {
		val = parseInt( val );
		val = isNaN( val ) ? '' : val;
		onChange( { ...value, min: val } );
	};
	const onChangeMax = ( val ) => {
		val = parseInt( val );
		val = isNaN( val ) ? '' : val;
		onChange( { ...value, max: val } );
	};

	const MinMax = (
		<>
			<FlexBlock>
				<UnitControl
					label={
						minProp.label ||
						__( 'Minimum container width', 'autogrid' )
					}
					hideLabelFromVision
					help={ minProp.help }
					onChange={ onChangeMin }
					value={ value.min }
					min={ minProp.min == undefined ? 0 : minProp.min }
					max={ minProp.max == undefined ? Infinity : minProp.max }
					units={ [] }
					unit="px"
					disableUnits={ disableUnits }
				/>
			</FlexBlock>
			<FlexBlock>
				<UnitControl
					label={
						maxProp.label ||
						__( 'Maximum container width', 'autogrid' )
					}
					hideLabelFromVision
					help={ maxProp.help }
					onChange={ onChangeMax }
					value={ value.max }
					min={ maxProp.min == undefined ? 0 : maxProp.min }
					max={ maxProp.max == undefined ? Infinity : maxProp.max }
					units={ [] }
					unit="px"
					disableUnits={ disableUnits }
				/>
			</FlexBlock>
		</>
	);

	let InsideStack;
	if ( disableUnits ) {
		const onChangeValueDisableUnits = ( val ) => {
			onChange( { ...value, value: parseInt( val ) } );
		};
		InsideStack = (
			<>
				<FlexBlock>
					<UnitControl
						label={ valueProp.label || __( 'Value', 'autogrid' ) }
						hideLabelFromVision
						help={ valueProp.help }
						onChange={ onChangeValueDisableUnits }
						value={ value.value }
						min={ valueProp.min == undefined ? 0 : valueProp.min }
						max={
							valueProp.max == undefined
								? Infinity
								: valueProp.max
						}
						units={ [] }
						unit="px"
						disableUnits={ disableUnits }
						required
					/>
				</FlexBlock>
				{ MinMax }
			</>
		);
	} else {
		const onChangeValueUnits = ( val ) => {
			onChange( { ...value, value: val } );
		};
		const onClear = () => {
			onChange( { ...value, min: '', max: '' } );
		};
		InsideStack = (
			<>
				<FlexBlock>
					<OneSpacingSizesControl
						onChange={ onChangeValueUnits }
						value={ value.value }
					/>
				</FlexBlock>
				<Dropdown
					popoverProps={ { placement: 'bottom-end' } }
					renderToggle={ ( { isOpen, onToggle } ) => (
						<Button
							onClick={ onToggle }
							aria-expanded={ isOpen }
							label={ __( 'Min and max width', 'autogrid' ) }
							icon={ mobile }
							style={ {
								opacity: useMediaRule ? 1 : 0.5,
							} }
						/>
					) }
					renderContent={ () => (
						<>
							<Flex
								align="start"
								style={ { minWidth: '140px' } }
								className="autogrid-dropdown-flex"
							>
								{ MinMax }
							</Flex>
							<Flex
								direction="row"
								justify="flex-end"
								style={ {
									borderTop: '1px solid rgba(0,0,0,.1)',
									marginTop: '1em',
								} }
							>
								<Button
									variant="tertiary"
									onClick={ onClear }
									disabled={ useMediaRule ? false : true }
								>
									{ __( 'Clear', 'autogrid' ) }
								</Button>
							</Flex>
						</>
					) }
				/>
			</>
		);
	}

	const onChangeAxis = ( val ) => {
		onChange( { ...value, axis: val } );
	};
	const onQuickActions = ( val ) => {
		switch ( val ) {
			case 'delete':
				onDelete();
				break;

			case 'moveUp':
				onMoveUp();
				break;

			case 'moveDown':
				onMoveDown();
				break;
		}
	};

	return (
		<HStack
			className={ disableUnits ? 'autogrid-h-stack-disable-units' : '' }
		>
			{ isAxis && (
				<DropdownMenuRadio
					label={ __( 'Select an axis', 'autogrid' ) }
					controls={ controlsAxis }
					selected={ axis }
					onChange={ onChangeAxis }
				/>
			) }

			{ InsideStack }

			{ controlsRule.length && (
				<DropdownMenuRadio
					label={ __( 'Quick actions', 'autogrid' ) }
					controls={ controlsRule }
					icon={ moreVertical }
					onChange={ onQuickActions }
				/>
			) }
		</HStack>
	);
}
