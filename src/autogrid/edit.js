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
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import BaseControlMedia from '../inc/BaseControlMedia';
import ModalMoreDetailed from '../inc/ModalMoreDetailed';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes, clientId}) {
	const ALLOWED_BLOCKS = [ 'andreslav/autogrid-item' ];

	const TEMPLATE = [
	    [ 'andreslav/autogrid-item', {} ],
	    [ 'andreslav/autogrid-item', {} ]
	];

	const selector = `#${'block-' + clientId}>*>*`;

	let STYLE_CSS = ''; // для <style>
	let QUERY_AND_PROPS_CSS = {}; // {query1: [prop, prop, ...], query2: [prop, ...], ...}

	let format = (item) => {
		return {
			value: parseInt(item['value']), 
			min: parseInt(item['min']), 
			max: parseInt(item['max'])
		}
	}
	let checkIsValidItem = (item) => {
		return !isNaN(item['value']);
	}
	let checkIsBaseItem = (item) => {
		return isNaN(item['min']) && isNaN(item['max']);
	}
	let getLastBase = (items) => {
		return items.filter(checkIsBaseItem).reduce((v, item) => item['value'], NaN);
	}
	let getQueryAndPropCSS = (value, min, max, propName) => {
		let querySize = '', width, minWidth, maxWidth;

		if(	!isNaN(min) ) {
			width = min + 'px';
			minWidth = `(min-width:${ width })`;
			querySize = querySize ? querySize + ' and ' + minWidth : minWidth;
		}

		if( !isNaN(max) ) {
			width = max + 'px';
			maxWidth = `(max-width:${ width })`;
			querySize = querySize ? querySize + ' and ' + maxWidth : maxWidth;
		}

		return {
			query: querySize ? `@container autogrid ${ querySize }` : '',
			value: `${propName}:${value}px;`
		};
	}
	let dataCollection = (item, propName) => {
		let { query, value } = getQueryAndPropCSS( item['value'], item['min'], item['max'], propName );

		// заполняем
		if( !QUERY_AND_PROPS_CSS[query] ) QUERY_AND_PROPS_CSS[query] = [];
		QUERY_AND_PROPS_CSS[query].push(value);
	}
	let queryAndProps_toStyleCSS = () => {
		for( let key in QUERY_AND_PROPS_CSS ) {
			STYLE_CSS += key + `{${ selector }{${ QUERY_AND_PROPS_CSS[key].join('') }}}`;
		}

		// очищаем
		QUERY_AND_PROPS_CSS = {};
	}

	// валидация и очистка
	let gaps = attributes.gaps.map(format).filter(checkIsValidItem)
	let childrenPaddings = attributes.childrenPaddings.map(format).filter(checkIsValidItem)

	// извлекаем правила, в которых не заданы значения min и max
	let gap = getLastBase(gaps);
	let childrenPadding = getLastBase(childrenPaddings);

	// оставляем правила, в которых задано хотябы одно из значений: min или max
	gaps = gaps.filter((item) => !checkIsBaseItem(item))
	childrenPaddings = childrenPaddings.filter((item) => !checkIsBaseItem(item))

	// приобразовываем правила в строки CSS, которые помещаются в QUERY_AND_PROPS_CSS и затем объединяем их в STYLE_CSS
	gaps.forEach(item => {dataCollection(item, '--grid-layout-gap')})
	queryAndProps_toStyleCSS()
	childrenPaddings.forEach(item => {dataCollection(item, '--grid-item-padding-child')})
	queryAndProps_toStyleCSS()

	return (
		<>
		<div { ...useBlockProps({ style: {
				'--grid-item-min-width': attributes.minWidth + 'px',
				'--grid-layout-gap': isNaN(gap) ? '' : gap + 'px',
				'--grid-item-padding-child': isNaN(childrenPadding) ? '' : childrenPadding + 'px',
				'--grid-column-count': attributes.columnCount
			} }) }>
			<div className='wp-block-andreslav-autogrid__container'>
				<div className='wp-block-andreslav-autogrid__content'>
					<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} orientation="horizontal" />
				</div>
			</div>
			{ STYLE_CSS && <style>{STYLE_CSS}</style> }
		</div>

		{/* Begin Sidebar Inspector Zone */}
		<InspectorControls>
			<PanelBody title={ __("Settings", "autogrid-block") }>

				<RangeControl
					label={ __("Maximum number of columns", "autogrid-block") }
					help={ __("When the blocks reach this width, they are rearranged.", "autogrid-block") }
					min={1}
					value={attributes.columnCount}
					onChange={(val) => { setAttributes({columnCount: val}) }}
					required
				/>
				<UnitControl
					label={ __("Minimum column width", "autogrid-block") }
					onChange={(val) => { setAttributes({minWidth: parseInt(val)}) }}
					value={attributes.minWidth}
					min={0}
					units={[]}
					unit="px"
					required
				/>
				<BaseControlMedia
					help={
						<>
							{ __("This parameter allows you to set the gap between elements.", "autogrid-block") }
							<ModalMoreDetailed title={ __("Gaps", "autogrid-block") }>
								{ __("This parameter allows you to set the gap between elements. The MIN and MAX values are optional and can be used to customize the adaptability of the parameter. For example, the rule [VALUE: 10, MAX: 500] means that if the width of the container is less than 500 px, the spacing between elements should be 10 px.", "autogrid-block") }
							</ModalMoreDetailed>
						</>
					}
					label={ __("Gaps", "autogrid-block") }
					values={ attributes.gaps }
					onChange={(val) => { setAttributes({gaps: val}) }}
				/>
				<BaseControlMedia
					help={
						<>
							{ __("This parameter allows you to set the internal indentation of elements.", "autogrid-block") }
							<ModalMoreDetailed title={ __("Children paddings", "autogrid-block") }>
								{ __("This parameter allows you to set the internal indentation of elements. The MIN and MAX values are optional and can be used to customize the adaptability of the parameter. For example, the rule [VALUE: 10, MIN: 500] means that if the width of the container is greater than 500 px, the internal indentation of elements should be 10 px.", "autogrid-block") }
							</ModalMoreDetailed>
						</>
					}
					label={ __("Children paddings", "autogrid-block") }
					values={ attributes.childrenPaddings }
					onChange={(val) => { setAttributes({childrenPaddings: val}) }}
				/>
			</PanelBody>
		</InspectorControls>
		{/* End Sidebar Inspector Zone */}
		</>
	);
}
