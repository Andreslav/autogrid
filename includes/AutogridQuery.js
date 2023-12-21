/**
 * Для генерации CSS
 */

export default class AutogridQuery {
	STYLE_CSS = ''; // для <style>
	QUERY_AND_PROPS_CSS = {}; // {query1: [prop, prop, ...], query2: [prop, ...], ...}

	constructor( { selector, otherData } ) {
		this.selector = selector || '';
		this.otherData = otherData || {};
	}

	apply( { sizes, propName } ) {
		// валидация и очистка
		sizes = Array.isArray( sizes )
			? sizes.map( this.format ).filter( this.checkIsValidItem )
			: [];

		// извлекаем правила, в которых не заданы значения min и max и берём 'value' последнего из них
		let baseSize = this.getLastBase( sizes );

		// оставляем правила, в которых задано хотябы одно из значений: min или max
		sizes = sizes.filter( ( item ) => ! this.checkIsBaseItem( item ) );

		// приобразовываем правила в строки CSS, которые помещаются в QUERY_AND_PROPS_CSS и затем объединяем их в STYLE_CSS
		sizes.forEach( ( item ) => this.dataCollection( item, propName ) );
		this.queryAndProps_toStyleCSS();

		// возврат базового значения
		return baseSize;
	}

	format( item ) {
		return {
			value: parseInt( item[ 'value' ] ),
			min: parseInt( item[ 'min' ] ),
			max: parseInt( item[ 'max' ] ),
		};
	}

	checkIsValidItem = ( item ) => {
		return ! isNaN( item[ 'value' ] );
	};

	checkIsBaseItem( item ) {
		return isNaN( item[ 'min' ] ) && isNaN( item[ 'max' ] );
	}

	getLastBase( items ) {
		return items
			.filter( this.checkIsBaseItem )
			.reduce( ( v, item ) => item[ 'value' ], NaN );
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
			value: `${ propName }:${ value }px;`,
		};
	}

	dataCollection( item, propName ) {
		let { query, value } = this.getQueryAndPropCSS(
			item[ 'value' ],
			item[ 'min' ],
			item[ 'max' ],
			propName,
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
