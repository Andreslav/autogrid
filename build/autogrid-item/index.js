(()=>{"use strict";var e,t={508:()=>{const e=window.React,t=window.wp.blocks,l=window.wp.blockEditor,n=window.wp.i18n,a=window.wp.element,i=window.wp.components,o=window.wp.primitives,r=(0,e.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(o.Path,{d:"m7.5 6h9v-1.5h-9zm0 13.5h9v-1.5h-9zm-3-3h1.5v-9h-1.5zm13.5-9v9h1.5v-9z"})),s=(0,e.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(o.Path,{d:"m7.5 6h9v-1.5h-9zm0 13.5h9v-1.5h-9zm-3-3h1.5v-9h-1.5zm13.5-9v9h1.5v-9z",style:{opacity:.25}}),(0,e.createElement)(o.Path,{d:"m4.5 7.5v9h1.5v-9z"}),(0,e.createElement)(o.Path,{d:"m18 7.5v9h1.5v-9z"})),m=(0,e.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(o.Path,{d:"m7.5 6h9v-1.5h-9zm0 13.5h9v-1.5h-9zm-3-3h1.5v-9h-1.5zm13.5-9v9h1.5v-9z",style:{opacity:.25}}),(0,e.createElement)(o.Path,{d:"m7.5 6h9v-1.5h-9z"}),(0,e.createElement)(o.Path,{d:"m7.5 19.5h9v-1.5h-9z"})),c=(0,e.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(o.Path,{d:"M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z"}));function u({label:t,value:n,onChange:a}){(0,l.useSetting)("spacing.spacingSizes");const o=(0,l.useSetting)("spacing.units"),r=o?o.filter((e=>"%"!==e)):["px","em","rem","vw","vh"],s=(0,i.__experimentalUseCustomUnits)({availableUnits:r}),[m,c]=(0,i.__experimentalParseQuantityAndUnitFromRawValue)(n),u=(0,l.isValueSpacingPreset)(n)?n:[m,c].join("");return(0,e.createElement)(l.__experimentalSpacingSizesControl,{values:{one:u},onChange:e=>{a(e.one)},label:t,sides:["one"],units:s})}const h=(0,e.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(o.Path,{d:"M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"})),d=(0,e.createElement)(i.Icon,{icon:h,size:24});function p({label:t,controls:l,selected:n,icon:a,onChange:o}){if(!a){const e=l.find((e=>e.slug===n));e&&(a=e.icon)}return(0,e.createElement)(i.DropdownMenu,{label:t,icon:a},(({onClose:t})=>(0,e.createElement)(e.Fragment,null,(0,e.createElement)(i.MenuGroup,null,l.map((({label:l,slug:a,icon:r,onClick:s,isDestructive:m})=>{const c=n===a;return(0,e.createElement)(i.MenuItem,{key:a,icon:r,iconPosition:"left",isSelected:c,isDestructive:m,role:"menuitemradio",onClick:e=>{s&&s(),o(a),t()},suffix:c?d:void 0},l)}))))))}const v=(0,e.createElement)(o.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(o.Path,{d:"M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"})),g=(0,e.createElement)(o.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(o.Path,{d:"M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"})),E=(0,e.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(o.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M12 5.5A2.25 2.25 0 0 0 9.878 7h4.244A2.251 2.251 0 0 0 12 5.5ZM12 4a3.751 3.751 0 0 0-3.675 3H5v1.5h1.27l.818 8.997a2.75 2.75 0 0 0 2.739 2.501h4.347a2.75 2.75 0 0 0 2.738-2.5L17.73 8.5H19V7h-3.325A3.751 3.751 0 0 0 12 4Zm4.224 4.5H7.776l.806 8.861a1.25 1.25 0 0 0 1.245 1.137h4.347a1.25 1.25 0 0 0 1.245-1.137l.805-8.861Z"})),_=(0,e.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(o.Path,{d:"M15 4H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5v12zm-4.5-.5h2V16h-2v1.5z"})),x=(0,e.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(o.Path,{d:"M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z"}));function w({value:t,disableUnits:l,isAxis:a,isHideDelete:o,isHideMoveUp:r,isHideMoveDown:s,controlsAxis:m=[],onChange:c=(()=>{}),onDelete:h=(()=>{}),onMoveUp:d=(()=>{}),onMoveDown:w=(()=>{}),valueProp:S={},minProp:b={},maxProp:f={}}){const C=""!==t.min||""!==t.max,y=t.axis||"all",P=[{slug:"moveUp",label:(0,n.__)("Move up","autogrid"),icon:v,hide:r},{slug:"moveDown",label:(0,n.__)("Move down","autogrid"),icon:g,hide:s},{slug:"delete",label:(0,n.__)("Delete a rule","autogrid"),icon:E,isDestructive:!0,hide:o}].filter((e=>!e.hide)),z=(0,e.createElement)(e.Fragment,null,(0,e.createElement)(i.FlexBlock,null,(0,e.createElement)(i.__experimentalUnitControl,{label:b.label||(0,n.__)("Minimum container width","autogrid"),hideLabelFromVision:!0,help:b.help,onChange:e=>{e=parseInt(e),e=isNaN(e)?"":e,c({...t,min:e})},value:t.min,min:null==b.min?0:b.min,max:null==b.max?1/0:b.max,units:[],unit:"px",disableUnits:l})),(0,e.createElement)(i.FlexBlock,null,(0,e.createElement)(i.__experimentalUnitControl,{label:f.label||(0,n.__)("Maximum container width","autogrid"),hideLabelFromVision:!0,help:f.help,onChange:e=>{e=parseInt(e),e=isNaN(e)?"":e,c({...t,max:e})},value:t.max,min:null==f.min?0:f.min,max:null==f.max?1/0:f.max,units:[],unit:"px",disableUnits:l})));let V;return V=l?(0,e.createElement)(e.Fragment,null,(0,e.createElement)(i.FlexBlock,null,(0,e.createElement)(i.__experimentalUnitControl,{label:S.label||(0,n.__)("Value","autogrid"),hideLabelFromVision:!0,help:S.help,onChange:e=>{c({...t,value:parseInt(e)})},value:t.value,min:null==S.min?0:S.min,max:null==S.max?1/0:S.max,units:[],unit:"px",disableUnits:l,required:!0})),z):(0,e.createElement)(e.Fragment,null,(0,e.createElement)(i.FlexBlock,null,(0,e.createElement)(u,{onChange:e=>{c({...t,value:e})},value:t.value})),(0,e.createElement)(i.Dropdown,{popoverProps:{placement:"bottom-end"},renderToggle:({isOpen:t,onToggle:l})=>(0,e.createElement)(i.Button,{onClick:l,"aria-expanded":t,label:(0,n.__)("Min and max width"),icon:_,style:{opacity:C?1:.5}}),renderContent:()=>(0,e.createElement)(i.Flex,{align:"start",style:{minWidth:"140px"},className:"autogrid-dropdown-flex"},z)})),(0,e.createElement)(i.__experimentalHStack,{className:l?"autogrid-h-stack-disable-units":""},a&&(0,e.createElement)(p,{label:(0,n.__)("Select an axis"),controls:m,selected:y,onChange:e=>{c({...t,axis:e})}}),V,P.length&&(0,e.createElement)(p,{label:(0,n.__)("Quick actions","autogrid"),controls:P,icon:x,onChange:e=>{switch(e){case"delete":h();break;case"moveUp":d();break;case"moveDown":w()}}}))}function S({help:t,label:l,values:a,onChange:o,disableUnits:u,baseRule:h,isAxis:d,lockLastElement:p,valueProp:v={},minProp:g={},maxProp:E={}}){const _=[{slug:"all",label:"All",icon:r},{slug:"horizontal",label:"Horizontal",icon:s},{slug:"vertical",label:"Vertical",icon:m}];return(0,e.createElement)(i.BaseControl,{__nextHasNoMarginBottom:!0,help:(0,e.createElement)("span",{style:{fontSize:"12px"}},t),className:"autogrid-base-control-media"},(0,e.createElement)(i.Flex,null,(0,e.createElement)(i.BaseControl.VisualLabel,{as:"legend",style:{marginBottom:0}},l),(0,e.createElement)(i.Button,{icon:c,label:(0,n.__)("Add a rule","autogrid"),iconSize:24,onClick:()=>{o([...a,h||{value:0,min:"",max:"",...d?{axis:_[0].slug}:{}}])}})),u&&!!a.length&&(0,e.createElement)(i.Flex,{className:"autogrid-help-visual-label"},(0,e.createElement)(i.FlexBlock,null,(0,e.createElement)(i.BaseControl.VisualLabel,null,(0,n.__)("Value","autogrid"))),(0,e.createElement)(i.FlexBlock,null,(0,e.createElement)(i.BaseControl.VisualLabel,null,(0,n.__)("Min","autogrid"))),(0,e.createElement)(i.FlexBlock,null,(0,e.createElement)(i.BaseControl.VisualLabel,null,(0,n.__)("Max","autogrid"))),(0,e.createElement)(i.FlexItem,null,(0,e.createElement)(i.Button,{icon:(0,e.createElement)(i.Dashicon,{icon:""}),style:{height:0},label:"",disabled:!0}))),a.map(((t,l)=>(0,e.createElement)(w,{key:l,value:t,onChange:e=>{(a=[...a]).splice(l,1,e),o(a)},onDelete:()=>{o(a.filter(((e,t)=>t!=l)))},onMoveUp:()=>{a=[...a],[a[l-1],a[l]]=[a[l],a[l-1]],o(a)},onMoveDown:()=>{a=[...a],[a[l+1],a[l]]=[a[l],a[l+1]],o(a)},controlsAxis:_,disableUnits:u,isAxis:d,isHideDelete:1===a.length&&p,isHideMoveUp:0===l,isHideMoveDown:l===a.length-1,valueProp:v,minProp:g,maxProp:E}))))}function b({children:t,title:l}){const[o,r]=(0,a.useState)(!1),s=()=>r(!1);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)("span",null," ",(0,e.createElement)(i.Button,{variant:"link",onClick:()=>r(!0)},(0,n.__)("More","autogrid"))),o&&(0,e.createElement)(i.Modal,{title:l,onRequestClose:s},(0,e.createElement)("div",{style:{maxWidth:"350px"}},t),(0,e.createElement)(i.Flex,{direction:"row",justify:"flex-end"},(0,e.createElement)(i.Button,{variant:"secondary",onClick:s},(0,n.__)("Ok","autogrid")))))}class f{STYLE_CSS="";QUERY_AND_PROPS_CSS={};ALLOWED_AXES=["all","horizontal","vertical"];DEFAULT_VALUE_UNIT="px";constructor({selector:e,otherData:t}){this.selector=e||"",this.otherData=t||{}}apply({sizes:e,propNames:t,defaultValueUnit:l}){void 0!==l&&(this.DEFAULT_VALUE_UNIT=l),e=Array.isArray(e)?e.map((e=>this.format(e))).filter(this.checkIsValidItem):[];let n=this.getLastBase(e);return(e=e.filter((e=>!this.checkIsBaseItem(e)))).forEach((e=>this.dataCollection(e,t))),this.queryAndProps_toStyleCSS(),n}format(e){let t,n=String(e.value);if(n.includes("var:preset|spacing|"))t=(0,l.getSpacingPresetCssVar)(n);else{let[e,l]=(0,i.__experimentalParseQuantityAndUnitFromRawValue)(n);void 0===e||l||(l=this.DEFAULT_VALUE_UNIT),t=[e,l].join("")}let a=String(e.axis);return a&&this.ALLOWED_AXES.includes(a)||(a=this.ALLOWED_AXES[0]),{value:t,min:parseInt(e.min),max:parseInt(e.max),axis:a}}checkIsValidItem=e=>""!==e.value;checkIsBaseItem(e){return isNaN(e.min)&&isNaN(e.max)}getLastBase(e){let t={};return this.ALLOWED_AXES.forEach((e=>{t[e]=""})),e.filter(this.checkIsBaseItem).reduce(((e,t)=>{let l=t.value;return t.axis===this.ALLOWED_AXES[0]?this.ALLOWED_AXES.forEach((t=>{e[t]=l})):e[t.axis]=l,e}),t)}getQueryAndPropCSS(e,t,l,n,a){let i,o,r,s="";return isNaN(t)||(i=t+"px",o=`(min-width:${i})`,s=s?s+" and "+o:o),isNaN(l)||(i=l+"px",r=`(max-width:${i})`,s=s?s+" and "+r:r),{query:s?`@container autogrid ${s}`:"",value:`${n}:${e};`}}dataCollection(e,t){let{query:l,value:n}=this.getQueryAndPropCSS(e.value,e.min,e.max,t[e.axis],this.otherData);this.QUERY_AND_PROPS_CSS[l]||(this.QUERY_AND_PROPS_CSS[l]=[]),this.QUERY_AND_PROPS_CSS[l].push(n)}queryAndProps_toStyleCSS(){for(let e in this.QUERY_AND_PROPS_CSS)this.STYLE_CSS+=e+`{${this.selector}{${this.QUERY_AND_PROPS_CSS[e].join("")}}}`;this.QUERY_AND_PROPS_CSS={}}getCSS(){return this.STYLE_CSS}}class C extends f{getQueryAndPropCSS(e,t,l,n,{minWidthBlock:a}){let i,o,r,s="";return isNaN(t)||(i=a*(t+1)+"px",o=`(min-width:${i})`,s=s?s+" and "+o:o),isNaN(l)||(i=a*(l+1)+"px",r=`(max-width:${i})`,s=s?s+" and "+r:r),{query:s?`@container autogrid ${s}`:"",value:`${n}:${e};`}}}const y=JSON.parse('{"u2":"andreslav/autogrid-item"}'),P={svg:(0,e.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",viewBox:"0 0 24 24"},(0,e.createElement)("path",{fill:"#000",fillRule:"evenodd",d:"M4 8.6l.1-1 .4-.5L5.6 7H8v4H4V8.6zM7 14H5v2h2v-2zm-2-1H4v2.4l.1 1 .4.5 1.1.1H8v-4H5zm6-5h2v2h-2V8zm-1-1h4v4h-4V7zm9 7h-8v2h8v-2zm-8-1h-1v4h8.4l1-.1.5-.4.1-1.1V13h-9zm6-5h2v2h-2V8zm-1-1h2.4l1 .1.5.4.1 1.1V11h-4V7z",clipRule:"evenodd"}))};(0,t.registerBlockType)(y.u2,{icon:P.svg,edit:function({attributes:t,setAttributes:o,context:r,clientId:s}){const m="block-"+s,c=parseInt(r["autogrid/minWidth"]),u=t.sizes,h=new C({selector:`#${m}`,otherData:{minWidthBlock:c}}),d=h.apply({sizes:u,defaultValueUnit:"",propNames:{all:"--grid-item-column-span"}}),p=h.getCSS(),v=parseInt(r["autogrid/columnCount"]),[g,E]=(0,a.useState)(1);return(0,a.useEffect)((()=>{if(g)E(0);else{let e=u.map(((e,t)=>{let l=e.value;return e.min,{value:l,min:1,max:e.max}}));o({sizes:e})}}),[v]),(0,e.createElement)(e.Fragment,null,(0,e.createElement)("div",{...(0,l.useBlockProps)({style:{"--grid-item-column-span":d.all}})},(0,e.createElement)(l.InnerBlocks,{template:[["core/paragraph",{}]],orientation:"horizontal"})),p&&(0,e.createElement)("style",{dangerouslySetInnerHTML:{__html:p}}),(0,e.createElement)(l.InspectorControls,null,(0,e.createElement)(i.PanelBody,{title:"Settings"},(0,e.createElement)(S,{help:(0,e.createElement)(e.Fragment,null,(0,n.__)("By default, a cell occupies one column. This option allows you to change this.","autogrid"),(0,e.createElement)(b,{title:(0,n.__)("Cell size","autogrid")},(0,e.createElement)("p",null,(0,n.__)("By default, a cell occupies one column. This option allows you to change this by defining rules that include the following parameters:","autogrid")),(0,e.createElement)("ul",null,(0,e.createElement)("li",{dangerouslySetInnerHTML:{__html:(0,n.__)("1. <b>The number of columns</b> that the cell should occupy.","autogrid")}}),(0,e.createElement)("li",{dangerouslySetInnerHTML:{__html:(0,n.__)("2. <b>The minimum number of columns to be displayed</b> when the rule should start to apply. Optional parameter.","autogrid")}}),(0,e.createElement)("li",{dangerouslySetInnerHTML:{__html:(0,n.__)("3. <b>The maximum number of displayed columns</b> after which the rule should stop applying. Optional parameter.","autogrid")}})),(0,e.createElement)("p",null,(0,n.__)("If more than one rule is created, the lower one has higher priority.","autogrid")))),label:(0,n.__)("Cell size","autogrid"),valueProp:{min:1,max:v,label:(0,n.__)("Number of columns","autogrid")},minProp:{max:v,label:(0,n.__)("Minimum number of columns displayed","autogrid")},maxProp:{max:v,label:(0,n.__)("Maximum number of columns displayed.","autogrid")},values:u,onChange:e=>{o({sizes:e})},baseRule:{value:v-1,min:1,max:"",axis:"all"},disableUnits:!0}))))},save:()=>(0,e.createElement)(l.InnerBlocks.Content,null)})}},l={};function n(e){var a=l[e];if(void 0!==a)return a.exports;var i=l[e]={exports:{}};return t[e](i,i.exports,n),i.exports}n.m=t,e=[],n.O=(t,l,a,i)=>{if(!l){var o=1/0;for(c=0;c<e.length;c++){for(var[l,a,i]=e[c],r=!0,s=0;s<l.length;s++)(!1&i||o>=i)&&Object.keys(n.O).every((e=>n.O[e](l[s])))?l.splice(s--,1):(r=!1,i<o&&(o=i));if(r){e.splice(c--,1);var m=a();void 0!==m&&(t=m)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[l,a,i]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={74:0,230:0};n.O.j=t=>0===e[t];var t=(t,l)=>{var a,i,[o,r,s]=l,m=0;if(o.some((t=>0!==e[t]))){for(a in r)n.o(r,a)&&(n.m[a]=r[a]);if(s)var c=s(n)}for(t&&t(l);m<o.length;m++)i=o[m],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(c)},l=globalThis.webpackChunkautogrid=globalThis.webpackChunkautogrid||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var a=n.O(void 0,[230],(()=>n(508)));a=n.O(a)})();