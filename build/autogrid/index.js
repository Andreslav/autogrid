(()=>{"use strict";var e,t={362:()=>{const e=window.React,t=window.wp.blocks,l=window.wp.blockEditor,n=window.wp.i18n,a=window.wp.components,i=window.wp.element,r=window.wp.primitives,o=(0,e.createElement)(r.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(r.Path,{d:"m7.5 6h9v-1.5h-9zm0 13.5h9v-1.5h-9zm-3-3h1.5v-9h-1.5zm13.5-9v9h1.5v-9z"})),s=(0,e.createElement)(r.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(r.Path,{d:"m7.5 6h9v-1.5h-9zm0 13.5h9v-1.5h-9zm-3-3h1.5v-9h-1.5zm13.5-9v9h1.5v-9z",style:{opacity:.25}}),(0,e.createElement)(r.Path,{d:"m4.5 7.5v9h1.5v-9z"}),(0,e.createElement)(r.Path,{d:"m18 7.5v9h1.5v-9z"})),c=(0,e.createElement)(r.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(r.Path,{d:"m7.5 6h9v-1.5h-9zm0 13.5h9v-1.5h-9zm-3-3h1.5v-9h-1.5zm13.5-9v9h1.5v-9z",style:{opacity:.25}}),(0,e.createElement)(r.Path,{d:"m7.5 6h9v-1.5h-9z"}),(0,e.createElement)(r.Path,{d:"m7.5 19.5h9v-1.5h-9z"})),m=(0,e.createElement)(r.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(r.Path,{d:"M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z"}));function u({label:t,value:n,onChange:i}){const[r,o]=(0,a.__experimentalParseQuantityAndUnitFromRawValue)(n),s=(0,l.isValueSpacingPreset)(n)?n:[r,o].join("");return(0,e.createElement)(l.__experimentalSpacingSizesControl,{values:{one:s},onChange:e=>{i(e.one)},label:t,sides:["one"]})}const h=(0,e.createElement)(r.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(r.Path,{d:"M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"})),d=(0,e.createElement)(a.Icon,{icon:h,size:24});function p({label:t,controls:l,selected:n,icon:i,onChange:r}){if(!i){const e=l.find((e=>e.slug===n));e&&(i=e.icon)}return(0,e.createElement)(a.DropdownMenu,{label:t,icon:i},(({onClose:t})=>(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.MenuGroup,null,l.map((({label:l,slug:i,icon:o,onClick:s,isDestructive:c})=>{const m=n===i;return(0,e.createElement)(a.MenuItem,{key:i,icon:o,iconPosition:"left",isSelected:m,isDestructive:c,role:"menuitemradio",onClick:e=>{s&&s(),r(i),t()},suffix:m?d:void 0},l)}))))))}const g=(0,e.createElement)(r.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(r.Path,{d:"M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"})),v=(0,e.createElement)(r.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(r.Path,{d:"M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"})),E=(0,e.createElement)(r.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(r.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M12 5.5A2.25 2.25 0 0 0 9.878 7h4.244A2.251 2.251 0 0 0 12 5.5ZM12 4a3.751 3.751 0 0 0-3.675 3H5v1.5h1.27l.818 8.997a2.75 2.75 0 0 0 2.739 2.501h4.347a2.75 2.75 0 0 0 2.738-2.5L17.73 8.5H19V7h-3.325A3.751 3.751 0 0 0 12 4Zm4.224 4.5H7.776l.806 8.861a1.25 1.25 0 0 0 1.245 1.137h4.347a1.25 1.25 0 0 0 1.245-1.137l.805-8.861Z"})),_=(0,e.createElement)(r.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(r.Path,{d:"M15 4H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5v12zm-4.5-.5h2V16h-2v1.5z"})),x=(0,e.createElement)(r.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(r.Path,{d:"M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z"}));function w({value:t,disableUnits:l,isAxis:i,isHideDelete:r,isHideMoveUp:o,isHideMoveDown:s,controlsAxis:c=[],onChange:m=(()=>{}),onDelete:h=(()=>{}),onMoveUp:d=(()=>{}),onMoveDown:w=(()=>{}),valueProp:S={},minProp:b={},maxProp:C={}}){const f=""!==t.min||""!==t.max,y=t.axis||"all",P=[{slug:"moveUp",label:(0,n.__)("Move up","autogrid"),icon:g,hide:o},{slug:"moveDown",label:(0,n.__)("Move down","autogrid"),icon:v,hide:s},{slug:"delete",label:(0,n.__)("Delete a rule","autogrid"),icon:E,isDestructive:!0,hide:r}].filter((e=>!e.hide)),A=(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.FlexBlock,null,(0,e.createElement)(a.__experimentalUnitControl,{label:b.label||(0,n.__)("Minimum container width","autogrid"),hideLabelFromVision:!0,help:b.help,onChange:e=>{e=parseInt(e),e=isNaN(e)?"":e,m({...t,min:e})},value:t.min,min:null==b.min?0:b.min,max:null==b.max?1/0:b.max,units:[],unit:"px",disableUnits:l})),(0,e.createElement)(a.FlexBlock,null,(0,e.createElement)(a.__experimentalUnitControl,{label:C.label||(0,n.__)("Maximum container width","autogrid"),hideLabelFromVision:!0,help:C.help,onChange:e=>{e=parseInt(e),e=isNaN(e)?"":e,m({...t,max:e})},value:t.max,min:null==C.min?0:C.min,max:null==C.max?1/0:C.max,units:[],unit:"px",disableUnits:l})));let z;if(l){const i=e=>{m({...t,value:parseInt(e)})};z=(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.FlexBlock,null,(0,e.createElement)(a.__experimentalUnitControl,{label:S.label||(0,n.__)("Value","autogrid"),hideLabelFromVision:!0,help:S.help,onChange:i,value:t.value,min:null==S.min?0:S.min,max:null==S.max?1/0:S.max,units:[],unit:"px",disableUnits:l,required:!0})),A)}else{const l=e=>{m({...t,value:e})},i=()=>{m({...t,min:"",max:""})};z=(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.FlexBlock,null,(0,e.createElement)(u,{onChange:l,value:t.value})),(0,e.createElement)(a.Dropdown,{popoverProps:{placement:"bottom-end"},renderToggle:({isOpen:t,onToggle:l})=>(0,e.createElement)(a.Button,{onClick:l,"aria-expanded":t,label:(0,n.__)("Min and max width","autogrid"),icon:_,style:{opacity:f?1:.5}}),renderContent:()=>(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.Flex,{align:"start",style:{minWidth:"140px"},className:"autogrid-dropdown-flex"},A),(0,e.createElement)(a.Flex,{direction:"row",justify:"flex-end",style:{borderTop:"1px solid rgba(0,0,0,.1)",marginTop:"1em"}},(0,e.createElement)(a.Button,{variant:"tertiary",onClick:i,disabled:!f},(0,n.__)("Clear","autogrid"))))}))}return(0,e.createElement)(a.__experimentalHStack,{className:l?"autogrid-h-stack-disable-units":""},i&&(0,e.createElement)(p,{label:(0,n.__)("Select an axis","autogrid"),controls:c,selected:y,onChange:e=>{m({...t,axis:e})}}),z,P.length&&(0,e.createElement)(p,{label:(0,n.__)("Quick actions","autogrid"),controls:P,icon:x,onChange:e=>{switch(e){case"delete":h();break;case"moveUp":d();break;case"moveDown":w()}}}))}function S({help:t,label:l,values:r,onChange:u,disableUnits:h,baseRule:d,isAxis:p,lockLastElement:g,valueProp:v={},minProp:E={},maxProp:_={}}){const x=[{slug:"all",label:"All",icon:o},{slug:"horizontal",label:"Horizontal",icon:s},{slug:"vertical",label:"Vertical",icon:c}],[S,b]=(0,i.useState)(0),C=()=>b((e=>++e)),f=(e,t)=>{(r=[...r]).splice(e,1,t),u(r)},y=e=>{u(r.filter(((t,l)=>l!=e)))},P=e=>{r=[...r],[r[e-1],r[e]]=[r[e],r[e-1]],u(r),C()},A=e=>{r=[...r],[r[e+1],r[e]]=[r[e],r[e+1]],u(r),C()};return(0,e.createElement)(a.BaseControl,{__nextHasNoMarginBottom:!0,help:(0,e.createElement)("span",{style:{fontSize:"12px"}},t),className:"autogrid-base-control-media"},(0,e.createElement)(a.Flex,null,(0,e.createElement)(a.BaseControl.VisualLabel,{as:"legend",style:{marginBottom:0}},l),(0,e.createElement)(a.Button,{icon:m,label:(0,n.__)("Add a rule","autogrid"),iconSize:24,onClick:()=>{u([...r,d||{value:0,min:"",max:"",...p?{axis:x[0].slug}:{}}])}})),h&&!!r.length&&(0,e.createElement)(a.Flex,{className:"autogrid-help-visual-label"},(0,e.createElement)(a.FlexBlock,null,(0,e.createElement)(a.BaseControl.VisualLabel,null,(0,n.__)("Value","autogrid"))),(0,e.createElement)(a.FlexBlock,null,(0,e.createElement)(a.BaseControl.VisualLabel,null,(0,n.__)("Min","autogrid"))),(0,e.createElement)(a.FlexBlock,null,(0,e.createElement)(a.BaseControl.VisualLabel,null,(0,n.__)("Max","autogrid"))),(0,e.createElement)(a.FlexItem,null,(0,e.createElement)(a.Button,{icon:(0,e.createElement)(a.Dashicon,{icon:""}),style:{height:0},label:"",disabled:!0}))),r.map(((t,l)=>(0,e.createElement)(w,{key:S+"-"+l,value:t,onChange:f.bind(null,l),onDelete:y.bind(null,l),onMoveUp:P.bind(null,l),onMoveDown:A.bind(null,l),controlsAxis:x,disableUnits:h,isAxis:p,isHideDelete:1===r.length&&g,isHideMoveUp:0===l,isHideMoveDown:l===r.length-1,valueProp:v,minProp:E,maxProp:_}))))}function b({children:t,title:l}){const[r,o]=(0,i.useState)(!1),s=()=>o(!1);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)("span",null," ",(0,e.createElement)(a.Button,{variant:"link",onClick:()=>o(!0)},(0,n.__)("More","autogrid"))),r&&(0,e.createElement)(a.Modal,{title:l,onRequestClose:s},(0,e.createElement)("div",{style:{maxWidth:"350px"}},t),(0,e.createElement)(a.Flex,{direction:"row",justify:"flex-end"},(0,e.createElement)(a.Button,{variant:"secondary",onClick:s},(0,n.__)("Ok","autogrid")))))}class C{STYLE_CSS="";QUERY_AND_PROPS_CSS={};ALLOWED_AXES=["all","horizontal","vertical"];DEFAULT_VALUE_UNIT="px";constructor({selector:e,containerName:t,otherData:n}){this.selector=e||"",this.otherData=n||{},this.spacingSizes=(0,l.useSetting)("spacing.spacingSizes")||[],this.containerName=t||""}apply({sizes:e,propNames:t,defaultValueUnit:l,containerName:n}){void 0!==l&&(this.DEFAULT_VALUE_UNIT=l),void 0!==n&&(this.containerName=n),e=Array.isArray(e)?e.map((e=>this.format(e))).filter(this.checkIsValidItem):[];let a=this.getLastBase(e);return(e=e.filter((e=>!this.checkIsBaseItem(e)))).forEach((e=>{let l=e.axis;l===this.ALLOWED_AXES[0]?this.ALLOWED_AXES.forEach((l=>{this.dataCollection(e,t[l])})):this.dataCollection(e,t[l])})),this.queryAndProps_toStyleCSS(),a}format(e){let t,n=String(e.value);if(n.includes("var:preset|spacing|")){let e=n.match(/var:preset\|spacing\|(.+)/);if(e&&e[1]){let t=this.spacingSizes.find((t=>t.slug==e[1]));t||(n="0px")}t=(0,l.getSpacingPresetCssVar)(n)}else{let[e,l]=(0,a.__experimentalParseQuantityAndUnitFromRawValue)(n);void 0===e||l||(l=this.DEFAULT_VALUE_UNIT),t=[e,l].join("")}let i=String(e.axis);return i&&this.ALLOWED_AXES.includes(i)||(i=this.ALLOWED_AXES[0]),{value:t,min:parseInt(e.min),max:parseInt(e.max),axis:i}}checkIsValidItem=e=>""!==e.value;checkIsBaseItem(e){return isNaN(e.min)&&isNaN(e.max)}getLastBase(e){let t={};return this.ALLOWED_AXES.forEach((e=>{t[e]=""})),e.filter(this.checkIsBaseItem).reduce(((e,t)=>{let l=t.value;return t.axis===this.ALLOWED_AXES[0]?this.ALLOWED_AXES.forEach((t=>{e[t]=l})):e[t.axis]=l,e}),t)}getQueryAndPropCSS(e,t,l,n,a,i){let r,o,s,c="";return isNaN(t)||(r=t+"px",o=`(min-width:${r})`,c=c?c+" and "+o:o),isNaN(l)||(r=l+"px",s=`(max-width:${r})`,c=c?c+" and "+s:s),{query:c?`@container ${a} ${c}`:"",value:`${n}:${e};`}}dataCollection(e,t){if(!t)return;let{query:l,value:n}=this.getQueryAndPropCSS(e.value,e.min,e.max,t,this.containerName,this.otherData);this.QUERY_AND_PROPS_CSS[l]||(this.QUERY_AND_PROPS_CSS[l]=[]),this.QUERY_AND_PROPS_CSS[l].push(n)}queryAndProps_toStyleCSS(){for(let e in this.QUERY_AND_PROPS_CSS)this.STYLE_CSS+=e+`{${this.selector}{${this.QUERY_AND_PROPS_CSS[e].join("")}}}`;this.QUERY_AND_PROPS_CSS={}}getCSS(){return this.STYLE_CSS}}const f=JSON.parse('{"UU":"andreslav/autogrid"}'),y={svg:(0,e.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",viewBox:"0 0 24 24"},(0,e.createElement)("path",{fill:"#000",d:"M4 8.61c0-.57 0-.85.11-1.07a1 1 0 01.43-.43C4.76 7 5.04 7 5.6 7H8v4H4V8.61zM4 13h4v4H5.61c-.57 0-.85 0-1.07-.11a1 1 0 01-.43-.43C4 16.24 4 15.96 4 15.4V13zm6-6h4v4h-4zm0 6h10v2.39c0 .57 0 .85-.11 1.07a1 1 0 01-.43.43c-.22.11-.5.11-1.07.11H10v-4zm6-6h2.39c.57 0 .85 0 1.07.11a1 1 0 01.43.43c.11.22.11.5.11 1.07V11h-4V7z"}))};(0,t.registerBlockType)(f.UU,{icon:y.svg,edit:function({attributes:t,setAttributes:i,clientId:r}){const o=new C({selector:`#${"block-"+r}>*`,containerName:"autogrid-root"}),s=o.apply({sizes:t.gaps,propNames:{horizontal:"--grid-layout-gap-x",vertical:"--grid-layout-gap-y"}}),c=o.apply({sizes:t.childrenPaddings,propNames:{horizontal:"--grid-item-padding-child-x",vertical:"--grid-item-padding-child-y"}}),m=o.getCSS();return(0,e.createElement)(e.Fragment,null,(0,e.createElement)("div",{...(0,l.useBlockProps)({style:{"--grid-item-min-width":parseInt(t.minWidth)+"px","--grid-layout-gap-x":s.horizontal,"--grid-layout-gap-y":s.vertical,"--grid-item-padding-child-x":c.horizontal,"--grid-item-padding-child-y":c.vertical,"--grid-column-count":parseInt(t.columnCount)}})},(0,e.createElement)("div",{className:"wp-block-andreslav-autogrid__content"},(0,e.createElement)(l.InnerBlocks,{allowedBlocks:["andreslav/autogrid-item"],template:[["andreslav/autogrid-item",{}],["andreslav/autogrid-item",{}]],orientation:"horizontal"})),m&&(0,e.createElement)("style",{dangerouslySetInnerHTML:{__html:m}})),(0,e.createElement)(l.InspectorControls,null,(0,e.createElement)(a.PanelBody,{title:(0,n.__)("Settings","autogrid")},(0,e.createElement)(a.RangeControl,{label:(0,n.__)("Maximum number of columns","autogrid"),min:1,value:t.columnCount,onChange:e=>{i({columnCount:e})},required:!0}),(0,e.createElement)(a.__experimentalUnitControl,{label:(0,n.__)("Minimum column width","autogrid"),help:(0,e.createElement)(e.Fragment,null,(0,n.__)("When the cells reach this width, they are rearranged.","autogrid"),(0,e.createElement)(b,{title:(0,n.__)("Minimum column width","autogrid")},(0,e.createElement)("p",null,(0,n.__)("The minimum column width also includes cell spacing.","autogrid")))),onChange:e=>{i({minWidth:parseInt(e)})},value:t.minWidth,min:0,units:[],unit:"px",required:!0}),(0,e.createElement)(S,{help:(0,e.createElement)(e.Fragment,null,(0,n.__)("This parameter allows you to set the spacing between cells.","autogrid"),(0,e.createElement)(b,{title:(0,n.__)("Spacing between cells","autogrid")},(0,e.createElement)("p",{dangerouslySetInnerHTML:{__html:(0,n.__)("This parameter allows you to set the spacing between cells. The MIN and MAX values are optional and can be used to customize the adaptability of the parameter. For example, the rule [VALUE: 10, MAX: 500] means that if the width of the container is less than 500 px, the spacing between cells should be 10 px.","autogrid")}}),(0,e.createElement)("p",null,(0,n.__)("If more than one rule is created, the lower one has higher priority.","autogrid")))),label:(0,n.__)("Spacing between cells","autogrid"),values:t.gaps,isAxis:!0,lockLastElement:!0,onChange:e=>{i({gaps:e})},minProp:{help:(0,n.__)("Min","autogrid")},maxProp:{help:(0,n.__)("Max","autogrid")}}),(0,e.createElement)(S,{help:(0,e.createElement)(e.Fragment,null,(0,n.__)("This option allows you to set the padding of cells.","autogrid"),(0,e.createElement)(b,{title:(0,n.__)("Padding of cells","autogrid")},(0,e.createElement)("p",{dangerouslySetInnerHTML:{__html:(0,n.__)("This option allows you to set the padding of cells. The MIN and MAX values are optional and can be used to customize the adaptability of the parameter. For example, the [VALUE: 10, MIN: 500] rule means that when <u>the container width</u> is greater than 500 px, the padding of cells should be 10 px.","autogrid")}}),(0,e.createElement)("p",null,(0,n.__)("If more than one rule is created, the lower one has higher priority.","autogrid")))),label:(0,n.__)("Padding of cells","autogrid"),values:t.childrenPaddings,isAxis:!0,lockLastElement:!0,onChange:e=>{i({childrenPaddings:e})},minProp:{help:(0,n.__)("Min","autogrid")},maxProp:{help:(0,n.__)("Max","autogrid")}}))))},save:()=>(0,e.createElement)(l.InnerBlocks.Content,null)})}},l={};function n(e){var a=l[e];if(void 0!==a)return a.exports;var i=l[e]={exports:{}};return t[e](i,i.exports,n),i.exports}n.m=t,e=[],n.O=(t,l,a,i)=>{if(!l){var r=1/0;for(m=0;m<e.length;m++){for(var[l,a,i]=e[m],o=!0,s=0;s<l.length;s++)(!1&i||r>=i)&&Object.keys(n.O).every((e=>n.O[e](l[s])))?l.splice(s--,1):(o=!1,i<r&&(r=i));if(o){e.splice(m--,1);var c=a();void 0!==c&&(t=c)}}return t}i=i||0;for(var m=e.length;m>0&&e[m-1][2]>i;m--)e[m]=e[m-1];e[m]=[l,a,i]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={643:0,195:0};n.O.j=t=>0===e[t];var t=(t,l)=>{var a,i,[r,o,s]=l,c=0;if(r.some((t=>0!==e[t]))){for(a in o)n.o(o,a)&&(n.m[a]=o[a]);if(s)var m=s(n)}for(t&&t(l);c<r.length;c++)i=r[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(m)},l=globalThis.webpackChunkautogrid=globalThis.webpackChunkautogrid||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var a=n.O(void 0,[195],(()=>n(362)));a=n.O(a)})();