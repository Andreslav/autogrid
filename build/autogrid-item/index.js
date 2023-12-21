(()=>{"use strict";var e,t={98:()=>{const e=window.wp.element,t=window.wp.blocks,l=window.wp.blockEditor,n=window.wp.i18n,a=window.wp.components;function r({help:t,label:l,values:r,onChange:o,disableUnits:i,baseRule:s,unlockLastElement:u,valueProp:m={},minProp:c={},maxProp:d={}}){return(0,e.createElement)(a.BaseControl,{__nextHasNoMarginBottom:!0,help:(0,e.createElement)("span",{style:{fontSize:"12px"}},t)},(0,e.createElement)(a.Flex,null,(0,e.createElement)(a.FlexBlock,null,(0,e.createElement)(a.BaseControl.VisualLabel,null,l)),(0,e.createElement)(a.FlexItem,null,(0,e.createElement)(a.Button,{icon:(0,e.createElement)(a.Dashicon,{icon:"plus-alt2"}),label:(0,n.__)("Add a rule","autogrid-block"),onClick:()=>{o([...r,s||{value:0,min:"",max:"",dddd:1}])}}))),!!r.length&&(0,e.createElement)(a.Flex,null,(0,e.createElement)(a.FlexBlock,null,(0,e.createElement)(a.BaseControl.VisualLabel,null,(0,n.__)("Value","autogrid-block"))),(0,e.createElement)(a.FlexBlock,null,(0,e.createElement)(a.BaseControl.VisualLabel,null,(0,n.__)("Min","autogrid-block"))),(0,e.createElement)(a.FlexBlock,null,(0,e.createElement)(a.BaseControl.VisualLabel,null,(0,n.__)("Max","autogrid-block"))),(0,e.createElement)(a.FlexItem,null,(r.length>1||u)&&(0,e.createElement)(a.Button,{icon:(0,e.createElement)(a.Dashicon,{icon:""}),style:{height:0},label:"",disabled:!0}))),r.map(((t,l)=>(0,e.createElement)(a.Flex,{key:l},(0,e.createElement)(a.FlexBlock,null,(0,e.createElement)(a.__experimentalUnitControl,{label:m.label||(0,n.__)("Value","autogrid-block"),hideLabelFromVision:!0,onChange:e=>{t.value=parseInt(e),o([...r])},value:t.value,min:null==m.min?0:m.min,max:null==m.max?1/0:m.max,units:[],unit:"px",disableUnits:i,required:!0})),(0,e.createElement)(a.FlexBlock,null,(0,e.createElement)(a.__experimentalUnitControl,{label:c.label||(0,n.__)("Minimum container width","autogrid-block"),hideLabelFromVision:!0,onChange:e=>{t.min=parseInt(e),o([...r])},value:t.min,min:null==c.min?0:c.min,max:null==c.max?1/0:c.max,units:[],unit:"px",disableUnits:i})),(0,e.createElement)(a.FlexBlock,null,(0,e.createElement)(a.__experimentalUnitControl,{label:d.label||(0,n.__)("Maximum container width","autogrid-block"),hideLabelFromVision:!0,onChange:e=>{t.max=parseInt(e),o([...r])},value:t.max,min:null==d.min?0:d.min,max:null==d.max?1/0:d.max,units:[],unit:"px",disableUnits:i})),(0,e.createElement)(a.FlexItem,null,(r.length>1||u)&&(0,e.createElement)(a.Button,{icon:(0,e.createElement)(a.Dashicon,{icon:"minus"}),label:(0,n.__)("Delete a rule","autogrid-block"),onClick:()=>{o(r.filter(((e,t)=>t!=l)))}}))))))}function o({children:t,title:l}){const[r,o]=(0,e.useState)(!1),i=()=>o(!1);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)("span",null," ",(0,e.createElement)(a.Button,{variant:"link",onClick:()=>o(!0)},(0,n.__)("More","autogrid-block"))),r&&(0,e.createElement)(a.Modal,{title:l,onRequestClose:i},(0,e.createElement)("div",{style:{maxWidth:"350px"}},t),(0,e.createElement)(a.Flex,{direction:"row",justify:"flex-end"},(0,e.createElement)(a.Button,{variant:"secondary",onClick:i},(0,n.__)("Ok","autogrid-block")))))}class i{STYLE_CSS="";QUERY_AND_PROPS_CSS={};constructor({selector:e,otherData:t}){this.selector=e||"",this.otherData=t||{}}apply({sizes:e,propName:t}){e=Array.isArray(e)?e.map(this.format).filter(this.checkIsValidItem):[];let l=this.getLastBase(e);return(e=e.filter((e=>!this.checkIsBaseItem(e)))).forEach((e=>this.dataCollection(e,t))),this.queryAndProps_toStyleCSS(),l}format(e){return{value:parseInt(e.value),min:parseInt(e.min),max:parseInt(e.max)}}checkIsValidItem=e=>!isNaN(e.value);checkIsBaseItem(e){return isNaN(e.min)&&isNaN(e.max)}getLastBase(e){return e.filter(this.checkIsBaseItem).reduce(((e,t)=>t.value),NaN)}getQueryAndPropCSS(e,t,l,n,a){let r,o,i,s="";return isNaN(t)||(r=t+"px",o=`(min-width:${r})`,s=s?s+" and "+o:o),isNaN(l)||(r=l+"px",i=`(max-width:${r})`,s=s?s+" and "+i:i),{query:s?`@container autogrid ${s}`:"",value:`${n}:${e}px;`}}dataCollection(e,t){let{query:l,value:n}=this.getQueryAndPropCSS(e.value,e.min,e.max,t,this.otherData);this.QUERY_AND_PROPS_CSS[l]||(this.QUERY_AND_PROPS_CSS[l]=[]),this.QUERY_AND_PROPS_CSS[l].push(n)}queryAndProps_toStyleCSS(){for(let e in this.QUERY_AND_PROPS_CSS)this.STYLE_CSS+=e+`{${this.selector}{${this.QUERY_AND_PROPS_CSS[e].join("")}}}`;this.QUERY_AND_PROPS_CSS={}}getCSS(){return this.STYLE_CSS}}class s extends i{getQueryAndPropCSS(e,t,l,n,{minWidthBlock:a}){let r,o,i,s="";return isNaN(t)||(r=a*(t+1)+"px",o=`(min-width:${r})`,s=s?s+" and "+o:o),isNaN(l)||(r=a*(l+1)+"px",i=`(max-width:${r})`,s=s?s+" and "+i:i),{query:s?`@container autogrid ${s}`:"",value:`${n}:${e};`}}}const u=JSON.parse('{"u2":"andreslav/autogrid-item"}'),m={svg:(0,e.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",viewBox:"0 0 24 24"},(0,e.createElement)("path",{fill:"#000",fillRule:"evenodd",d:"M4 8.6l.1-1 .4-.5L5.6 7H8v4H4V8.6zM7 14H5v2h2v-2zm-2-1H4v2.4l.1 1 .4.5 1.1.1H8v-4H5zm6-5h2v2h-2V8zm-1-1h4v4h-4V7zm9 7h-8v2h8v-2zm-8-1h-1v4h8.4l1-.1.5-.4.1-1.1V13h-9zm6-5h2v2h-2V8zm-1-1h2.4l1 .1.5.4.1 1.1V11h-4V7z",clipRule:"evenodd"}))};(0,t.registerBlockType)(u.u2,{icon:m.svg,edit:function({attributes:t,setAttributes:i,context:u,clientId:m}){const c="block-"+m,d=parseInt(u["autogrid/minWidth"]),h=t.sizes,p=new s({selector:`#${c}`,otherData:{minWidthBlock:d}}),_=p.apply({sizes:h,propName:"--grid-item-column-span"}),b=p.getCSS(),g=parseInt(u["autogrid/columnCount"]),[E,x]=(0,e.useState)(1);return(0,e.useEffect)((()=>{if(E)x(0);else{let e=h.map(((e,t)=>{let l=e.value;return e.min,{value:l,min:1,max:e.max}}));i({sizes:e})}}),[g]),(0,e.createElement)(e.Fragment,null,(0,e.createElement)("div",{...(0,l.useBlockProps)({style:{"--grid-item-column-span":isNaN(_)?"":_}})},(0,e.createElement)(l.InnerBlocks,{template:[["core/paragraph",{}]],orientation:"horizontal"})),b&&(0,e.createElement)("style",{dangerouslySetInnerHTML:{__html:b}}),(0,e.createElement)(l.InspectorControls,null,(0,e.createElement)(a.PanelBody,{title:"Settings"},(0,e.createElement)(r,{help:(0,e.createElement)(e.Fragment,null,(0,n.__)("By default, a cell occupies one column. This option allows you to change this.","autogrid-block"),(0,e.createElement)(o,{title:(0,n.__)("Cell size","autogrid-block")},(0,e.createElement)("p",null,(0,n.__)("By default, a cell occupies one column. This option allows you to change this by defining rules that include the following parameters:","autogrid-block")),(0,e.createElement)("ul",null,(0,e.createElement)("li",{dangerouslySetInnerHTML:{__html:(0,n.__)("1. <b>The number of columns</b> that the cell should occupy.","autogrid-block")}}),(0,e.createElement)("li",{dangerouslySetInnerHTML:{__html:(0,n.__)("2. <b>The minimum number of columns to be displayed</b> when the rule should start to apply. Optional parameter.","autogrid-block")}}),(0,e.createElement)("li",{dangerouslySetInnerHTML:{__html:(0,n.__)("3. <b>The maximum number of displayed columns</b> after which the rule should stop applying. Optional parameter.","autogrid-block")}})),(0,e.createElement)("p",null,(0,n.__)("If more than one rule is created, the lower one has higher priority.","autogrid-block")))),label:(0,n.__)("Cell size","autogrid-block"),valueProp:{min:1,max:g,label:(0,n.__)("Number of columns","autogrid-block")},minProp:{max:g,label:(0,n.__)("Minimum number of columns displayed","autogrid-block")},maxProp:{max:g,label:(0,n.__)("Maximum number of columns displayed.","autogrid-block")},values:h,onChange:e=>{i({sizes:e})},baseRule:{value:g-1,min:1,max:"",dddd:1},unlockLastElement:!0,disableUnits:!0}))))},save:()=>(0,e.createElement)(l.InnerBlocks.Content,null)})}},l={};function n(e){var a=l[e];if(void 0!==a)return a.exports;var r=l[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.m=t,e=[],n.O=(t,l,a,r)=>{if(!l){var o=1/0;for(m=0;m<e.length;m++){l=e[m][0],a=e[m][1],r=e[m][2];for(var i=!0,s=0;s<l.length;s++)(!1&r||o>=r)&&Object.keys(n.O).every((e=>n.O[e](l[s])))?l.splice(s--,1):(i=!1,r<o&&(o=r));if(i){e.splice(m--,1);var u=a();void 0!==u&&(t=u)}}return t}r=r||0;for(var m=e.length;m>0&&e[m-1][2]>r;m--)e[m]=e[m-1];e[m]=[l,a,r]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={74:0,230:0};n.O.j=t=>0===e[t];var t=(t,l)=>{var a,r,o=l[0],i=l[1],s=l[2],u=0;if(o.some((t=>0!==e[t]))){for(a in i)n.o(i,a)&&(n.m[a]=i[a]);if(s)var m=s(n)}for(t&&t(l);u<o.length;u++)r=o[u],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(m)},l=self.webpackChunkautogrid_block=self.webpackChunkautogrid_block||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var a=n.O(void 0,[230],(()=>n(98)));a=n.O(a)})();