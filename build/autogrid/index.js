/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/autogrid/edit.js":
/*!******************************!*\
  !*** ./src/autogrid/edit.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/autogrid/editor.scss");
/* harmony import */ var _inc_BaseControlMedia__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../inc/BaseControlMedia */ "./src/inc/BaseControlMedia.jsx");
/* harmony import */ var _inc_ModalMoreDetailed__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../inc/ModalMoreDetailed */ "./src/inc/ModalMoreDetailed.jsx");

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 * @see https://wordpress.github.io/gutenberg/?path=/docs/components-anglepickercontrol--default
 */



/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */




/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
function Edit({
  attributes,
  setAttributes,
  clientId
}) {
  const ALLOWED_BLOCKS = ['andreslav/autogrid-item'];
  const TEMPLATE = [['andreslav/autogrid-item', {}], ['andreslav/autogrid-item', {}]];
  const selector = `#${'block-' + clientId}>*>*`;
  let STYLE_CSS = ''; // для <style>
  let QUERY_AND_PROPS_CSS = {}; // {query1: [prop, prop, ...], query2: [prop, ...], ...}

  let format = item => {
    return {
      value: parseInt(item['value']),
      min: parseInt(item['min']),
      max: parseInt(item['max'])
    };
  };
  let checkIsValidItem = item => {
    return !isNaN(item['value']);
  };
  let checkIsBaseItem = item => {
    return isNaN(item['min']) && isNaN(item['max']);
  };
  let getLastBase = items => {
    return items.filter(checkIsBaseItem).reduce((v, item) => item['value'], NaN);
  };
  let getQueryAndPropCSS = (value, min, max, propName) => {
    let querySize = '',
      width,
      minWidth,
      maxWidth;
    if (!isNaN(min)) {
      width = min + 'px';
      minWidth = `(min-width:${width})`;
      querySize = querySize ? querySize + ' and ' + minWidth : minWidth;
    }
    if (!isNaN(max)) {
      width = max + 'px';
      maxWidth = `(max-width:${width})`;
      querySize = querySize ? querySize + ' and ' + maxWidth : maxWidth;
    }
    return {
      query: querySize ? `@container autogrid ${querySize}` : '',
      value: `${propName}:${value}px;`
    };
  };
  let dataCollection = (item, propName) => {
    let {
      query,
      value
    } = getQueryAndPropCSS(item['value'], item['min'], item['max'], propName);

    // заполняем
    if (!QUERY_AND_PROPS_CSS[query]) QUERY_AND_PROPS_CSS[query] = [];
    QUERY_AND_PROPS_CSS[query].push(value);
  };
  let queryAndProps_toStyleCSS = () => {
    for (let key in QUERY_AND_PROPS_CSS) {
      STYLE_CSS += key + `{${selector}{${QUERY_AND_PROPS_CSS[key].join('')}}}`;
    }

    // очищаем
    QUERY_AND_PROPS_CSS = {};
  };

  // валидация и очистка
  let gaps = attributes.gaps.map(format).filter(checkIsValidItem);
  let childrenPaddings = attributes.childrenPaddings.map(format).filter(checkIsValidItem);

  // извлекаем правила, в которых не заданы значения min и max
  let gap = getLastBase(gaps);
  let childrenPadding = getLastBase(childrenPaddings);

  // оставляем правила, в которых задано хотябы одно из значений: min или max
  gaps = gaps.filter(item => !checkIsBaseItem(item));
  childrenPaddings = childrenPaddings.filter(item => !checkIsBaseItem(item));

  // приобразовываем правила в строки CSS, которые помещаются в QUERY_AND_PROPS_CSS и затем объединяем их в STYLE_CSS
  gaps.forEach(item => {
    dataCollection(item, '--grid-layout-gap');
  });
  queryAndProps_toStyleCSS();
  childrenPaddings.forEach(item => {
    dataCollection(item, '--grid-item-padding-child');
  });
  queryAndProps_toStyleCSS();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      style: {
        '--grid-item-min-width': attributes.minWidth + 'px',
        '--grid-layout-gap': isNaN(gap) ? '' : gap + 'px',
        '--grid-item-padding-child': isNaN(childrenPadding) ? '' : childrenPadding + 'px',
        '--grid-column-count': attributes.columnCount
      }
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-block-andreslav-autogrid__container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-block-andreslav-autogrid__content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
    allowedBlocks: ALLOWED_BLOCKS,
    template: TEMPLATE,
    orientation: "horizontal"
  }))), STYLE_CSS && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, STYLE_CSS)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Settings", "autogrid-block")
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Maximum number of columns", "autogrid-block"),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("When the blocks reach this width, they are rearranged.", "autogrid-block"),
    min: 1,
    value: attributes.columnCount,
    onChange: val => {
      setAttributes({
        columnCount: val
      });
    },
    required: true
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalUnitControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Minimum column width", "autogrid-block"),
    onChange: val => {
      setAttributes({
        minWidth: parseInt(val)
      });
    },
    value: attributes.minWidth,
    min: 0,
    units: [],
    unit: "px",
    required: true
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_inc_BaseControlMedia__WEBPACK_IMPORTED_MODULE_5__["default"], {
    help: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("This parameter allows you to set the gap between elements.", "autogrid-block"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_inc_ModalMoreDetailed__WEBPACK_IMPORTED_MODULE_6__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Gaps", "autogrid-block")
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("This parameter allows you to set the gap between elements. The MIN and MAX values are optional and can be used to customize the adaptability of the parameter. For example, the rule [VALUE: 10, MAX: 500] means that if the width of the container is less than 500 px, the spacing between elements should be 10 px.", "autogrid-block"))),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Gaps", "autogrid-block"),
    values: attributes.gaps,
    onChange: val => {
      setAttributes({
        gaps: val
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_inc_BaseControlMedia__WEBPACK_IMPORTED_MODULE_5__["default"], {
    help: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("This parameter allows you to set the internal indentation of elements.", "autogrid-block"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_inc_ModalMoreDetailed__WEBPACK_IMPORTED_MODULE_6__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Children paddings", "autogrid-block")
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("This parameter allows you to set the internal indentation of elements. The MIN and MAX values are optional and can be used to customize the adaptability of the parameter. For example, the rule [VALUE: 10, MIN: 500] means that if the width of the container is greater than 500 px, the internal indentation of elements should be 10 px.", "autogrid-block"))),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Children paddings", "autogrid-block"),
    values: attributes.childrenPaddings,
    onChange: val => {
      setAttributes({
        childrenPaddings: val
      });
    }
  }))));
}

/***/ }),

/***/ "./src/autogrid/icon.jsx":
/*!*******************************!*\
  !*** ./src/autogrid/icon.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  svg: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: "#000",
    d: "M4 8.61c0-.57 0-.85.11-1.07a1 1 0 01.43-.43C4.76 7 5.04 7 5.6 7H8v4H4V8.61zM4 13h4v4H5.61c-.57 0-.85 0-1.07-.11a1 1 0 01-.43-.43C4 16.24 4 15.96 4 15.4V13zm6-6h4v4h-4zm0 6h10v2.39c0 .57 0 .85-.11 1.07a1 1 0 01-.43.43c-.22.11-.5.11-1.07.11H10v-4zm6-6h2.39c.57 0 .85 0 1.07.11a1 1 0 01.43.43c.11.22.11.5.11 1.07V11h-4V7z"
  }))
});

/***/ }),

/***/ "./src/autogrid/index.js":
/*!*******************************!*\
  !*** ./src/autogrid/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/autogrid/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./edit */ "./src/autogrid/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/autogrid/block.json");
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./icon */ "./src/autogrid/icon.jsx");

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */



/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__.name, {
  /**
   * @see ./edit.js
   */
  icon: _icon__WEBPACK_IMPORTED_MODULE_6__["default"].svg,
  edit: _edit__WEBPACK_IMPORTED_MODULE_4__["default"],
  save: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null)
});

/***/ }),

/***/ "./src/inc/BaseControlMedia.jsx":
/*!**************************************!*\
  !*** ./src/inc/BaseControlMedia.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BaseControlMedia)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 * @see https://wordpress.github.io/gutenberg/?path=/docs/components-anglepickercontrol--default
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
function BaseControlMedia({
  help,
  label,
  values,
  onChange
}) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
    __nextHasNoMarginBottom: true,
    help: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      style: {
        fontSize: '12px'
      }
    }, help)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Flex, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexBlock, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl.VisualLabel, null, label)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dashicon, {
      icon: "plus-alt2"
    }),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Add a rule", "autogrid-block"),
    onClick: () => {
      onChange([{
        value: 0,
        min: '',
        max: ''
      }, ...values]);
    }
  }))), !!values.length && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Flex, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexBlock, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl.VisualLabel, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Value", "autogrid-block"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexBlock, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl.VisualLabel, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Min", "autogrid-block"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexBlock, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl.VisualLabel, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Max", "autogrid-block"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, null, values.length > 1 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dashicon, {
      icon: ""
    }),
    style: {
      height: 0
    },
    label: "",
    disabled: true
  }))), values.map((value, index) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Flex, {
      key: index
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexBlock, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUnitControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Value", "autogrid-block"),
      hideLabelFromVision: true,
      onChange: val => {
        value.value = parseInt(val);
        onChange([...values]);
      },
      value: value.value,
      min: 0,
      units: [],
      unit: "px",
      required: true
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexBlock, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUnitControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Minimum container width", "autogrid-block"),
      hideLabelFromVision: true,
      onChange: val => {
        value.min = parseInt(val);
        onChange([...values]);
      },
      value: value.min,
      min: 0,
      units: [],
      unit: "px"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexBlock, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUnitControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Maximum container width", "autogrid-block"),
      hideLabelFromVision: true,
      onChange: val => {
        value.max = parseInt(val);
        onChange([...values]);
      },
      value: value.max,
      min: 0,
      units: [],
      unit: "px"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, null, values.length > 1 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dashicon, {
        icon: "minus"
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Delete a rule", "autogrid-block"),
      onClick: () => {
        onChange(values.filter((value, i) => i != index));
      }
    })));
  }));
}

/***/ }),

/***/ "./src/inc/ModalMoreDetailed.jsx":
/*!***************************************!*\
  !*** ./src/inc/ModalMoreDetailed.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModalMoreDetailed)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */



/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 * @see https://wordpress.github.io/gutenberg/?path=/docs/components-anglepickercontrol--default
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
function ModalMoreDetailed({
  children,
  title
}) {
  const [isOpen, setOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "link",
    onClick: openModal
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("More", "autogrid-block"))), isOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    title: title,
    onRequestClose: closeModal
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      maxWidth: "350px"
    }
  }, children), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    direction: "row",
    justify: "flex-end"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    onClick: closeModal
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Ok", "autogrid-block")))));
}

/***/ }),

/***/ "./src/autogrid/editor.scss":
/*!**********************************!*\
  !*** ./src/autogrid/editor.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/autogrid/style.scss":
/*!*********************************!*\
  !*** ./src/autogrid/style.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/autogrid/block.json":
/*!*********************************!*\
  !*** ./src/autogrid/block.json ***!
  \*********************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"andreslav/autogrid","version":"0.1.0","title":"Autogrid","category":"design","icon":"smiley","description":"CSS Autogrid Block.","example":{"attributes":{"columnCount":2,"minWidth":200}},"supports":{"html":false,"color":{"text":true,"background":true},"spacing":{"padding":true,"margin":["top","bottom"]},"anchor":true,"align":["wide","full"]},"attributes":{"columnCount":{"type":"number","default":4},"minWidth":{"type":"number","default":300},"gaps":{"type":"array","default":[{"value":30,"min":"","max":""}]},"childrenPaddings":{"type":"array","default":[{"value":30,"min":"","max":""}]}},"providesContext":{"autogrid/columnCount":"columnCount","autogrid/minWidth":"minWidth","autogrid/gap":"gap"},"textdomain":"autogrid","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"autogrid/index": 0,
/******/ 			"autogrid/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkautogrid_block"] = self["webpackChunkautogrid_block"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["autogrid/style-index"], () => (__webpack_require__("./src/autogrid/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map