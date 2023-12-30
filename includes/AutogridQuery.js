/**
 * Для генерации CSS
 */
import { getSpacingPresetCssVar } from '@wordpress/block-editor';

import { __experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue } from '@wordpress/components';

export default class AutogridQuery {
	STYLE_CSS = ''; // для <style>
	QUERY_AND_PROPS_CSS = {}; // {query1: [prop, prop, ...], query2: [prop, ...], ...}
	ALLOWED_AXES = [ 'all', 'horizontal', 'vertical' ];
	DEFAULT_VALUE_UNIT = 'px';

	constructor( { selector, otherData } ) {
		this.selector = selector || '';
		this.otherData = otherData || {};
	}

	/*
		sizes: { value: int | string, min: int, max: int, axis: string }
		propNames: { all, horizontal?, vertical? }; key as ALLOWED_AXES
		defaultValueUnit: string
	*/
	apply( { sizes, propNames, defaultValueUnit } ) {
		if ( defaultValueUnit !== undefined )
			this.DEFAULT_VALUE_UNIT = defaultValueUnit;

		// валидация и очистка
		sizes = Array.isArray( sizes )
			? sizes
					.map( ( item ) => this.format( item ) )
					.filter( this.checkIsValidItem )
			: [];

		// извлекаем правила, в которых не заданы значения min и max и берём 'value' последних из них
		let baseSize = this.getLastBase( sizes );

		// оставляем правила, в которых задано хотябы одно из значений: min или max
		sizes = sizes.filter( ( item ) => ! this.checkIsBaseItem( item ) );

		// приобразовываем правила в строки CSS, которые помещаются в QUERY_AND_PROPS_CSS и затем объединяем их в STYLE_CSS
		sizes.forEach( ( item ) => this.dataCollection( item, propNames ) );
		this.queryAndProps_toStyleCSS();

		// возврат базового значения
		return baseSize;
	}

	format( item ) {
		let value = String( item[ 'value' ] );
		let clearValue;

		if ( value.includes( 'var:preset|spacing|' ) ) {
			clearValue = getSpacingPresetCssVar( value );
		} else {
			let [ parsedQuantity, parsedUnit ] =
				parseQuantityAndUnitFromRawValue( value );
			if ( parsedQuantity !== undefined && ! parsedUnit )
				parsedUnit = this.DEFAULT_VALUE_UNIT;
			clearValue = [ parsedQuantity, parsedUnit ].join( '' );
		}

		let axis = String( item[ 'axis' ] );
		if ( ! axis || ! this.ALLOWED_AXES.includes( axis ) )
			axis = this.ALLOWED_AXES[ 0 ];

		return {
			value: clearValue,
			min: parseInt( item[ 'min' ] ),
			max: parseInt( item[ 'max' ] ),
			axis: axis,
		};
	}

	checkIsValidItem = ( item ) => {
		return item[ 'value' ] !== '';
	};

	checkIsBaseItem( item ) {
		return isNaN( item[ 'min' ] ) && isNaN( item[ 'max' ] );
	}

	getLastBase( items ) {
		let startBase = {};
		this.ALLOWED_AXES.forEach( ( item ) => {
			startBase[ item ] = '';
		} );

		return items.filter( this.checkIsBaseItem ).reduce( ( rez, item ) => {
			let value = item[ 'value' ];
			if ( item[ 'axis' ] === this.ALLOWED_AXES[ 0 ] ) {
				this.ALLOWED_AXES.forEach( ( item ) => {
					rez[ item ] = value;
				} );
			} else {
				rez[ item[ 'axis' ] ] = value;
			}
			return rez;
		}, startBase );
	}

	getQueryAndPropCSS( value, min, max, propName, otherData ) {
		let querySize = '',
			width,
			minWidth,
			maxWidth;

		if ( ! isNaN( min ) ) {
			width = min + 'px';
			minWidth = `(min-width:${ width })`;
			querySize = querySize ? querySize + ' and ' + minWidth : minWidth;
		}

		if ( ! isNaN( max ) ) {
			width = max + 'px';
			maxWidth = `(max-width:${ width })`;
			querySize = querySize ? querySize + ' and ' + maxWidth : maxWidth;
		}

		return {
			query: querySize ? `@container autogrid ${ querySize }` : '',
			value: `${ propName }:${ value };`,
		};
	}

	dataCollection( item, propNames ) {
		let { query, value } = this.getQueryAndPropCSS(
			item[ 'value' ],
			item[ 'min' ],
			item[ 'max' ],
			propNames[ item[ 'axis' ] ],
			this.otherData
		);

		// заполняем
		if ( ! this.QUERY_AND_PROPS_CSS[ query ] )
			this.QUERY_AND_PROPS_CSS[ query ] = [];
		this.QUERY_AND_PROPS_CSS[ query ].push( value );
	}

	queryAndProps_toStyleCSS() {
		for ( let key in this.QUERY_AND_PROPS_CSS ) {
			this.STYLE_CSS +=
				key +
				`{${ this.selector }{${ this.QUERY_AND_PROPS_CSS[ key ].join(
					''
				) }}}`;
		}

		// очищаем
		this.QUERY_AND_PROPS_CSS = {};
	}

	getCSS() {
		return this.STYLE_CSS;
	}
}
