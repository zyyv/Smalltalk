let e=document.createElement("style");e.innerHTML='.update[data-v-022e7ff0]{width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;user-select:none}.update>.content>.title[data-v-022e7ff0]{text-align:center;font-weight:700;margin-bottom:2rem}.avatar-uploader[data-v-022e7ff0]{display:inline-flex;justify-content:center}.avatar-uploader .ant-upload[data-v-022e7ff0]{border-radius:50%}.avatar-bg[data-v-022e7ff0]{height:100%;width:100%;border-radius:50%;background-repeat:no-repeat;background-position:center center;background-size:100% 100%}.info-input[data-v-022e7ff0]{height:calc(1.6em + 2.5rem + 2px);padding:.9375rem 1.25rem;font-size:1.4rem;font-weight:400;line-height:1.6;color:#7f808c;background-clip:padding-box;border:0;border-radius:0;border-bottom:1px solid #edeef6;transition:border-color .35s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;outline:0}.info-input[data-v-022e7ff0]:focus{border-color:#ccc;outline:0;box-shadow:none}.info-button[data-v-022e7ff0]{margin-top:1rem;padding:1.2rem;height:auto;position:relative;z-index:1;display:inline-flex;align-items:center;justify-content:center;text-transform:none;font-weight:600;font-size:14px;border:none;overflow:hidden;background:0 0;color:var(--white);transition:background .4s ease-in-out,border-color .4s ease-in-out,color .4s ease-in-out}.info-button[data-v-022e7ff0]::before{content:"";display:block;opacity:0;position:absolute;width:calc(100% - 4px);height:calc(100% - 4px);top:2px;left:2px;z-index:-1;transform:translate3d(0,0,0);transition:background .4s ease-in-out}.info-button[data-v-022e7ff0]::after{content:"";width:100%;height:100%;display:block;position:absolute;top:0;left:0;opacity:1;transform:translate3d(0,0,0);backface-visibility:hidden;z-index:-3;background:0 0;background:linear-gradient(264.51deg,#ffe580 4.38%,#ff7571 11.51%,#ff7270 25.06%,#ea5dad 36.04%,#c2a0fd 47.63%,#9867f0 59.03%,#42ba96 69.96%,#20c997 83.74%,#b2f4b6 95.62%);background-position:58% 50%;background-size:500%;animation:30s infinite gradient-shift}.info-button[data-v-022e7ff0]:hover::before{background:0 0}@media (max-width:1199px){.content[data-v-022e7ff0]{width:85vw}}@media (min-width:1200px){.content[data-v-022e7ff0]{width:320px}}',document.head.appendChild(e);import{d as a,R as t,f as n,U as o,s as i,a0 as r,u as d,j as s,r as l,o as f,c as u,a as c,v as m,a1 as p,w as g,p as b,x as v,e as h}from"./index.a91396de.js";import{u as x}from"./index.abce9195.js";import"./AntdIcon.b0161574.js";import"./InboxOutlined.5942a56d.js";import{P as w,L as k,s as y}from"./SingleImg.215b7414.js";function _(){const e=n({fileList:[],loading:!1});return{...t(e),handleChange:a=>{"uploading"!==a.file.status?(a.file.status,"error"===a.file.status&&(e.loading=!1)):e.loading=!0},beforeUpload:e=>{const a="image/jpeg"===e.type||"image/png"===e.type;a||o.error("You can only upload JPG file!");const t=e.size/1024/1024<2;return t||o.error("Image must smaller than 2MB!"),a&&t}}}var j=a({name:"update",components:{PlusOutlined:w,LoadingOutlined:k,Avatar:y},setup(){const e=d(),a=s(),{handleSubmit:l,...f}=function(){const e=n({form:{avatar:"",name:"",sign:"",gender:"unknow"},rules:{name:[{required:!0,message:"Please input name"}]}}),{validate:a,validateInfos:r}=x(e.form,e.rules);return{...t(e),validate:a,validateInfos:r,handleSubmit:t=>{e.form.avatar?a().then(()=>{t(i(e.form))}):o.error("请上传头像")}}}();return{Update:()=>{l(t=>{r.update(t).then(t=>{e.commit("user/setUserInfo",t.data),o.success("更新成功"),setTimeout(()=>{a.replace("/")},1500)})})},..._(),...f}}});const I=g("data-v-022e7ff0");b("data-v-022e7ff0");const U={class:"update"},z={class:"content"},P=c("h2",{class:"title gradient-text"},"您需要完成以下几步设置，开始使用",-1),S=v("男"),A=v("女"),C=v("保密"),L=v("完成设置 ");h();const E=I((function(e,a,t,n,o,i){const r=l("Avatar"),d=l("a-form-item"),s=l("a-input"),g=l("a-radio"),b=l("a-radio-group"),v=l("a-button"),h=l("a-form");return f(),u("div",U,[c("div",z,[P,c(h,{layout:"vertical"},{default:I(()=>[c(d,null,{default:I(()=>[c(r,{src:e.form.avatar,"onUpdate:src":a[1]||(a[1]=a=>e.form.avatar=a),tips:"Avatar"},null,8,["src"])]),_:1}),c(d,m({label:"Name"},e.validateInfos.name),{default:I(()=>[c(s,{class:"info-input",onBlur:a[2]||(a[2]=a=>e.validate("name")),value:e.form.name,"onUpdate:value":a[3]||(a[3]=a=>e.form.name=a),placeholder:"Please Enter your Name"},null,8,["value"])]),_:1},16),c(d,{label:"Sign"},{default:I(()=>[c(s,{class:"info-input",value:e.form.sign,"onUpdate:value":a[4]||(a[4]=a=>e.form.sign=a),placeholder:"Please Enter your Sign"},null,8,["value"])]),_:1}),c(d,{label:"Gender"},{default:I(()=>[c(b,{style:{padding:"1rem 1.25rem"},value:e.form.gender,"onUpdate:value":a[5]||(a[5]=a=>e.form.gender=a)},{default:I(()=>[c(g,{value:"male"},{default:I(()=>[S]),_:1}),c(g,{value:"female"},{default:I(()=>[A]),_:1}),c(g,{value:"unknow"},{default:I(()=>[C]),_:1})]),_:1},8,["value"])]),_:1}),c(d,{style:{"margin-bottom":"0"}},{default:I(()=>[c(v,{onClick:p(e.Update,["prevent"]),class:"info-button",block:""},{default:I(()=>[L]),_:1},8,["onClick"])]),_:1})]),_:1})])])}));j.render=E,j.__scopeId="data-v-022e7ff0";export default j;
