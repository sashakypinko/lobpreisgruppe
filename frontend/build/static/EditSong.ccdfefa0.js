import{n as E,j as e,a as L,u as q,bg as F,ad as I,r as u,d as M,h as C,A as b,e as p,a2 as j,T as O,bh as P,a9 as i,as as G,f as y,U as H}from"./index.bb8b3d71.js";import{C as U}from"./isTypedArray.b72bae26.js";import{u as D,c as W,C as J}from"./CustomCheckboxAutocomplete.db33e7ab.js";import{u as K}from"./useError.bae9a88e.js";import{a as Q}from"./SongEnums.a1949f60.js";const X=E(e("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add"),Y=E(e("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"}),"RemoveCircleOutlined"),Z={container:{margin:0},title:{marginBottom:"10px"},actionButton:{marginTop:"16px"},divider:{margin:"40px 0"},saveButton:{marginTop:"32px !important"}},ee=()=>{const{t:l}=L(),c=q(Z),{id:x}=F(),T=I(),h={name:"",tags:[],lang:""},[m,v]=u.exports.useState([]),[n,d]=u.exports.useState([{...h}]),{loading:k,Loading:R,setLoading:f}=M(),{createSuccessSnackbar:ae,createErrorSnackbar:z}=D(),[A,_]=u.exports.useMemo(()=>{const a={},t={};return n.forEach((o,s)=>{a[`name_${s}`]={type:"isEmpty",text:"songs.nameIsRequired"},a[`lang_${s}`]={type:"isEmpty",text:"songs.langIsRequired"},t[`name_${s}`]=o.name,t[`lang_${s}`]=o.lang}),[a,t]},[n]),{getActivateError:$,isError:S,deactivateError:se}=K({values:_,validations:A});u.exports.useEffect(()=>{(async()=>{const a=await C.postRequest(b.getAllTags);a.ok&&v(a.data.tags.map(({name:t})=>t))})()},[]);const g=({name:a,value:t,index:o})=>{const s={...n[o]};d([...n.slice(0,o),{...s,[a]:t},...n.slice(o+1)])},B=(a,t)=>{a.forEach(o=>{m.includes(o)||v([...m,o])}),g({name:"tags",value:a,index:t})},N=a=>{d([...n.slice(0,a),...n.slice(a+1)])},w=()=>{d([...n,{...h}])},V=async()=>{if(f(!0),!$()){const t=x==="new"?"create":"update";(await C.postRequest(b[`${t}Songs`],{songs:n})).ok?T(H.SONGS):z(l("supplierProfiles.cantSaveSupplierProfile"))}f(!1)};return k?e(R,{}):p(j,{children:[e(O,{className:c.title,variant:"h1",children:l("songs.editTitle")}),e(P,{className:c.divider}),p(i,{container:!0,spacing:2,children:[n.map(({name:a,tags:t,lang:o},s)=>p(i,{container:!0,spacing:2,className:c.container,children:[e(i,{item:!0,xs:6,md:3,children:e(U,{uiLibrary:"mui",label:l("name"),value:a,onChange:({value:r})=>g({name:"name",value:r,index:s}),fullWidth:!0,className:c.textField,error:S(`name_${s}`)})}),e(i,{item:!0,xs:6,md:4,children:e(W,{label:l("languages"),value:o,options:Q.map(r=>({text:r,value:r})),onChange:({value:r})=>g({name:"lang",value:r,index:s}),size:"small",error:S(`lang_${s}`)})}),e(i,{item:!0,xs:9,md:4,children:e(J,{options:m.map(r=>({key:r,name:r})),value:t,label:l("tags"),openOnFocus:!0,onChange:({value:r})=>B(r,s),size:"small",freeSolo:!0})}),e(i,{item:!0,xs:3,md:1,children:e(G,{"aria-label":"remove",className:c.actionButton,disabled:n.length<2,onClick:()=>N(s),children:e(Y,{fontSize:"large",color:n.length<2?"disabled":"error"})})})]},`song_row_${s}`)),e(i,{item:!0,xs:12,children:e(y,{variant:"outline",size:"small",onClick:w,children:e(X,{})})}),e(i,{item:!0,xs:12,children:e(y,{className:c.saveButton,variant:"outline",size:"small",intent:"primary",onClick:V,fullMobile:!0,children:l("songs.save")})})]})]})};ee.propTypes={};export{ee as default};
