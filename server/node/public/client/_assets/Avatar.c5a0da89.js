import{g as t,o as e,c as r,a,w as n}from"./index.5b04b038.js";var s={name:"avatar",props:{src:String,online:{type:Boolean,default:!0},radius:{type:String,default:"50%"},width:{type:[Number,String],default:"4.4rem"},height:{type:[Number,String],default:"4.4rem"}},setup(e){const r=t=>{if((t=>null!=t)(t))return(t=>/^\d+(\.\d+)?$/.test(t))(t=String(t))?t+"px":t};return{style:t(()=>({width:r(e.width),height:r(e.height)}))}}};const i=n("data-v-08fd81bc")((function(t,n,s,i,d,l){return e(),r("div",{class:["avatar",s.online?"online":""],style:i.style},[a("div",{style:{"border-radius":s.radius,"background-image":`url(${s.src})`}},null,4)],6)}));s.render=i,s.__scopeId="data-v-08fd81bc";export{s};
