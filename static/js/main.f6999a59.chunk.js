(this.webpackJsonptxdot=this.webpackJsonptxdot||[]).push([[0],{226:function(e,t,s){},227:function(e,t,s){},228:function(e,t,s){},238:function(e,t,s){"use strict";s.r(t);var a=s(2),i=s(0),n=s.n(i),r=s(11),c=s.n(r),l=(s(226),s(110)),o=(s(227),s(285)),j=s(286),h=s(287),d=s(283),x=s(288),u=s(276),b=s(280),p=s.p+"static/media/cover.43610a00.jpg",m=s(22),f=s(44),O=s(45),g=s(50),S=s(49),y=s(5),v=s(281),C=s(239),w=s(292),H=s(282),F=s(291),M=s(293),k=s(289),N=s(294),I=s(290),T=(s(228),s(17)),A=function(e){Object(g.a)(s,e);var t=Object(S.a)(s);function s(e){var a;return Object(f.a)(this,s),(a=t.call(this,e)).titles=["Age (Month)","Age (Year)","Modulus of Rupture (psi)","Modulus of Elasticity (ksi)","Concrete Stress (T) (psi)","Concrete Stress (E) (psi)","Total Concrete Stress (psi)","Stress to Strength Ratio (psi/psi)","Number of Load Repetitions to Failure","Number of Load Repetitions","Pavement Damage","Cumulative Damage","Number of Punchouts per Mile"],a.state={visible:!1},a}return Object(O.a)(s,[{key:"componentDidUpdate",value:function(e){if(this.props.rows!==e.rows){for(var t=this.props.rows,s=[],a=[],i=0;i<t[0].length;i++)s.push(1e9),a.push(0);for(var n=0;n<t.length;n++)for(i=0;i<t[n].length;i++)t[n][i]>a[i]&&(a[i]=t[n][i]),t[n][i]<s[i]&&(s[i]=t[n][i]);this.colorRedBlues=[];for(i=0;i<t[0].length;i++){var r=T.e().domain([s[i],(s[i]+a[i])/2,a[i]]).range(["#55f","white","#f55"]);this.colorRedBlues.push(r)}}}},{key:"render",value:function(){var e=this,t=12*this.props.parameter.C18-1,s=this.props.colorgreenred(this.props.rows[t][12]);return this.colorRedBlues?Object(a.jsxs)("div",{children:[Object(a.jsxs)("div",{id:"div_CRCP_PERFORMANCE",children:[Object(a.jsx)("b",{children:"CRCP PERFORMANCE"}),Object(a.jsx)("br",{}),"Number of Punchouts per Mile:",Object(a.jsx)("input",{type:"TEXT",disabled:!0,style:{"background-color":s,textAlign:"center",fontSize:17,fontWeight:"bold"},value:parseFloat(this.props.rows[t][12]).toFixed(2),size:"7"}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{})]}),Object(a.jsxs)("div",{id:"divCheckbox1",children:[Object(a.jsx)("input",{type:"checkbox",id:"checkbox1",onChange:function(t){return e.setState({visible:t.target.checked})}}),Object(a.jsx)("label",{for:"checkbox1",children:" Analysis Result "})," "]}),Object(a.jsxs)("table",{style:{width:"99%",fontSize:"12px",display:this.state.visible?"table":"none"},border:"1",id:"analysisTable",children:[Object(a.jsx)("tr",{style:{backgroundColor:"#888"},children:this.titles.map((function(e){return Object(a.jsx)("td",{children:e})}))}),this.props.rows.map((function(t){return Object(a.jsx)("tr",{children:t.map((function(t,s){return Object(a.jsx)("td",{style:{textAlign:"right",backgroundColor:12===s?e.props.colorgreenred(t):e.colorRedBlues[s](t),paddingRight:"10px",paddingTop:"0px",paddingBottom:"0px"},children:-1!==[1,2,3,12,8,9,5,6,7,10,11].indexOf(s)?parseFloat(t).toFixed(1==s||12==s?2:2==s||3==s||8==s||9==s?0:5==s||6==s?1:7==s?3:4):t})}))})}))]})]}):""}}]),s}(i.Component),R=s(103),L=s.p+"static/media/stress.d2ebc577.csv",P=function(e){Object(g.a)(s,e);var t=Object(S.a)(s);function s(e){var a;Object(f.a)(this,s),(a=t.call(this,e)).colorGreenRed=T.e().domain([0,25]).range(["#0f0","#f00"]),a.tip=Object(R.tip)().attr("class","d3-tip").offset([-10,0]).html((function(e){var t="#Punchouts per Mile: <span style='color:"+a.colorGreenRed(e.y)+"; font-weight: bold'>"+parseFloat(e.y).toFixed(2)+"</span><br>";return t+="&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; Age (months):  <span style='color:white; font-weight: bold'>"+e.x+"</span>"})),a.init=!0,a.recompute=function(){var e,t=a.state.data,s=9,i=[],n=[];i.push(1),i.push(i[0]/12),i.push(a.props.parameter.F8),i.push(7600*i[2]/1e3),i.push(+t[s-2]["STR (T)"]),i.push(t[s-2]["STR (E)"]*i[3]/5e3),i.push(i[4]+i[5]),i.push(i[6]/i[2]),i.push(11800*Math.pow(i[7],o(a.props.parameter.F19))),i.push(1e6*(((e=a.props.parameter.C24)<=2?1:e>=4?.6:.7)*a.props.parameter.C25)/12/a.props.parameter.C18),i.push(i[9]/i[8]),i.push(i[10]),i.push(18.985/(1+5*Math.pow(i[11],-1.1))),n.push(i);for(var r=0;r<a.props.parameter.C18;r++){0!=r&&(s=8);for(var c=0;c<12;c++)if(0==r&&0==c);else{s+=1;var l=[];l.push(i[0]+1),l.push(l[0]/12),l.push(a.props.parameter.F8*Math.pow(30*l[0]/(4+25.5*l[0]),.5)),l.push(7600*l[2]/1e3),l.push(+t[s-2]["STR (T)"]),l.push(t[s-2]["STR (E)"]*l[3]/5e3),l.push(l[4]+l[5]),l.push(l[6]/l[2]),l.push(11800*Math.pow(l[7],o(a.props.parameter.F19))),l.push(i[9]),l.push(l[9]/l[8]),l.push(i[11]+l[10]),l.push(18.985/(1+5*Math.pow(l[11],-1.1))),13==s&&(s=1),n.push(l),i=l}}function o(e){return e<200?.0221*e-15.97:e<300?.0164*e-14.83:e<500?.0038*e-11.05:e<1e3?33e-5*e-9.31:71e-5*e-9.69}a.setState({row1:i,rows:n,rowIndexStress:s})},a.parameterGraph=function(){for(var e=a.state.width,t=a.state.height,s=a.state.rows,i=[],n=0;n<s.length;n++){var r={};r.x=s[n][0],r.y=s[n][12],i.push(r)}var c=T.e().domain([0,T.d(i,(function(e){return e.x}))]).range([0,e]),l=T.e().domain([0,T.d(i,(function(e){return e.y}))]).range([t,0]),o=T.a(c).tickSizeInner(-t).tickSizeOuter(0).tickPadding(10),j=T.b(l).tickSizeInner(-e).tickSizeOuter(0).tickPadding(10),h=T.c().x((function(e){return c(e.x)})).y((function(e){return l(e.y)}));a.setState({xScale:c,yScale:l,xAxis:o,yAxis:j,line:h,dataset:i})},a.tableCreate=function(){};var i={top:20,right:80,bottom:60,left:120},n=900-i.left-i.right,r=400-i.top-i.bottom;return a.state={margin:i,width:n,height:r,row1:[],rows:[],init:!0},a}return Object(O.a)(s,[{key:"componentDidMount",value:function(){var e=this;T.g(L).then((function(t){e.setState({data:t}),e.recompute(),e.tableCreate(),e.parameterGraph()}))}},{key:"componentDidUpdate",value:function(e){var t=this.props.init!==e.init&&this.props.init;if(this.init=t||this.init,(this.props.parameter!==e.parameter||this.init)&&(this.recompute(),this.parameterGraph(),this.state.data&&this.refs.svg&&this.state.xAxis&&this.state.yAxis)){var s=T.f(this.refs.svg).select("g.content");s.selectAll(".xaxis").attr("transform","translate(0,"+this.state.height+")").call(this.state.xAxis),s.selectAll(".yaxis").call(this.state.yAxis),this.init&&this.state.dataset.length&&(this.init=!1)}}},{key:"render",value:function(){var e=this;this.props.classes;return this.state.rows.length&&this.state.dataset?Object(a.jsxs)(u.a,{container:!0,alignItems:"center",direction:"column",spacing:1,children:[Object(a.jsx)(u.a,{item:!0,xs:11,children:Object(a.jsx)("svg",{ref:"svg",width:this.state.width+this.state.margin.left+this.state.margin.right,height:this.state.height+this.state.margin.top+this.state.margin.bottom,children:Object(a.jsxs)("g",{className:"content",transform:"translate("+this.state.margin.left+","+this.state.margin.top+")",children:[Object(a.jsx)("text",{className:"xAxisText",style:{textAnchor:"middle",textShadow:"1px 1px 0 rgba(200, 200, 200, 0.7"},fontFamily:"sans-serif",fontSize:"16px",x:this.state.width/2,y:this.state.height+40,children:"Age (months)"}),Object(a.jsx)("text",{className:"YAxisText",transform:"translate(-50,"+this.state.height/2+") rotate(-90)",style:{textAnchor:"middle",textShadow:"1px 1px 0 rgba(200, 200, 200, 0.7"},fontFamily:"sans-serif",fontSize:"16px",children:"Number of Punchouts per Mile"}),Object(a.jsx)("g",{className:"xaxis",transform:"translate(0,"+this.state.height+")"}),Object(a.jsx)("g",{className:"yaxis"}),Object(a.jsx)("path",{className:"line",d:this.state.line(this.state.dataset)}),this.state.dataset.map((function(t){return Object(a.jsx)("circle",{className:"point",r:4,cx:e.state.xScale(t.x),cy:e.state.yScale(t.y),fill:e.colorGreenRed(t.y),strokeWidth:.5,stroke:"#000"})}))]})})}),Object(a.jsx)(u.a,{item:!0,xs:11,children:Object(a.jsx)(A,{parameter:this.props.parameter,colorgreenred:this.colorGreenRed,rows:this.state.rows})})]}):""}}]),s}(i.Component),U=Object(y.a)((function(e){return{root:{width:"100%","& .MuiTextField-root":{width:"100%"},"& input":{width:"100%"}}}}))(P),B=s(108),D=s.n(B),G=["montgomery","waller","dallas","bowie","cass","tarrant","orange","el paso","hudspeth","wheeler","cooke","wichita","montague","oldham","hopkins","gonzales","hale","lubbock","hill","mclennan","gray-carson","randall","harrison","panola","travis","chambers","jefferson","liberty","hardin","newton","hardin,jefferson","brazos","freestone","walker","denton","ellis","navarro","rockwall","kaufman","collin","dallas,navarro","dallas,tarrant","dallas,rockwall","collin,grayson","erath","tarrant,johnson","harris","galveston","brazoria","fort bend","shelby","houston","angelina","webb","grayson","lamar","bexar","bandera","tom green","edwards","henderson","gregg","smith","van zandt","rusk","bell","wilbarger","clay","fayette"],E=["Houston","Dallas","Atlanta","Ft Worth","Beaumont","El Paso","Childress","Wichita Falls","Amarillo","Paris","Yoakum","Lubbock","Waco","Abilene","Austin","Bryan","Ft. Worth","Laredo","Lufkin","Odessa","San Antonio","San Angelo","Tayler","Tyler","Waco "],z=["IH 45","US 290","IH 30","US 59","IH 35W","IH 820","IH 10","IH 40","IH 35","US 287","US 81","IH 27","SL 289","SH 226","SH 36","US 83B","VA","FM 3129","IH 20","US 71","US 79","US 47","US 67","BU90-Y","CS","FM 1960","FM 364","FM 365","SH 347","SH 105","SH 12","SH 124","SH 146","SH 326","SH 61","SH 73","SH 87","SS 380","US 90","US 69","US 96","BS6-R","SH 21","BW 8","US 83","BS 121H","FM 1171","FM 1382","FM 2499","FM 709","FM 740","IH 35E","IH4 5","IH 635","LP 12","LP 354","MH","SH 289","SH 31","SH 66","SH 78","SH 114","SH 121","SH 161","SH 180","SH 183","SH 310","SH 34","SH 342","SH 356","SL 12","SL 288","SP 244","SP 348","SP 366","SPUR 354","US 175","US 380","US 75","US 77","US 377","US 80","US 54","BU 287P","FM 157","IH 820 ","SH 199","SH 26","SH 360","FM 1764","FM 523","FM 1092","FM 1488","FM 518","IH 610","SH 288","SH 332","SH 225","SH 242","SH 249","SH 35","US 90A","IH27","SH 7","FM 1472","LP 20","ODA 181-1","ODA 181-2","ODA 250-1","ODA 250-2","US 82","SH 6","FM 85","LP 281","LP 323","SH 19","SH 198","SH 334","US 259","US 281","FM 1695","FM 3476","FM 933","IH 36","LP 363","SH 195","US 84","BU 287J","IH 44","SH 240","SP 1027 ","US 287 ","US 55","US 70","SH 71"],V=["ATB","CTB","HMA"],W=["GW or GP","SW","SP","GM","SM","GC","SC","ML or OL","MH","CL","CL or OL","CH or OH"],Y=function(e){Object(g.a)(s,e);var t=Object(S.a)(s);function s(e){var a;return Object(f.a)(this,s),(a=t.call(this,e)).handleNext=function(){a.setState({activeStep:a.state.activeStep+1})},a.handleBack=function(){a.setState({activeStep:a.state.activeStep-1})},a.handleReset=function(){a.setState({activeStep:0})},a.state={activeStep:0,stepsLength:3,finished:!1,C18:30,C19:10,C24:2,C25:100,F7:14,F8:570,F16:6,F17:400,F19:539},a}return Object(O.a)(s,[{key:"render",value:function(){var e=this,t=this.props.classes,s=function(){return Object(a.jsx)("div",{className:t.actionsContainer,children:Object(a.jsxs)("div",{children:[Object(a.jsx)(b.a,{variant:"contained",onClick:e.props.toMenu,className:t.button,startIcon:Object(a.jsx)(D.a,{}),children:"To Main Menu"}),Object(a.jsx)(b.a,{disabled:0===e.state.activeStep,onClick:e.handleBack,className:t.button,children:"Back"}),Object(a.jsx)(b.a,{variant:"contained",color:"primary",onClick:e.handleNext,className:t.button,children:e.state.activeStep===e.state.stepsLength-1?"Finish":"Next"})]})})};return this.state.activeStep!==this.state.stepsLength||this.state.finished||this.setState({finished:!0}),Object(a.jsxs)(v.a,{maxWidth:"lg",children:[" ",Object(a.jsxs)(C.a,{elevation:3,children:[Object(a.jsxs)(w.a,{activeStep:this.state.activeStep,orientation:"vertical",children:[Object(a.jsxs)(H.a,{children:[Object(a.jsx)(F.a,{children:"Step 1"}),Object(a.jsxs)(M.a,{children:[Object(a.jsx)("form",{className:t.root,noValidate:!0,autoComplete:"off",children:Object(a.jsxs)(u.a,{container:!0,spacing:4,children:[Object(a.jsxs)(u.a,{container:!0,item:!0,xs:6,spacing:1,justify:"center",children:[Object(a.jsx)(u.a,{item:!0,xs:6,justify:"flex-start",children:Object(a.jsx)(k.a,{margin:"dense",id:"deisgnNo",label:"Design No",defaultValue:"",variant:"filled"})}),Object(a.jsx)(u.a,{item:!0,xs:6,children:Object(a.jsx)(I.a,{margin:"dense",id:"district",options:E,size:"small",freeSolo:!0,style:{marginTop:8,marginBottom:4},renderInput:function(e){return Object(a.jsx)(k.a,Object(m.a)(Object(m.a)({dense:!0},e),{},{label:"DISTRICT",variant:"filled"}))}})}),Object(a.jsx)(u.a,{item:!0,xs:6,children:Object(a.jsx)(I.a,{margin:"dense",id:"highway",options:z,size:"small",freeSolo:!0,style:{marginTop:8,marginBottom:4},renderInput:function(e){return Object(a.jsx)(k.a,Object(m.a)(Object(m.a)({dense:!0},e),{},{label:"HIGHWAY",variant:"filled"}))}})}),Object(a.jsx)(u.a,{item:!0,xs:6,children:Object(a.jsx)(I.a,{margin:"dense",id:"county",options:G,size:"small",style:{marginTop:8,marginBottom:4},renderInput:function(e){return Object(a.jsx)(k.a,Object(m.a)(Object(m.a)({dense:!0},e),{},{label:"COUNTY",variant:"filled"}))}})})]}),Object(a.jsxs)(u.a,{container:!0,item:!0,xs:6,spacing:1,children:[Object(a.jsx)(u.a,{item:!0,xs:6,children:Object(a.jsx)(k.a,{margin:"dense",id:"date",type:"date",label:"DATE",InputLabelProps:{shrink:!0},variant:"filled"})}),Object(a.jsx)(u.a,{item:!0,xs:6,children:Object(a.jsx)(k.a,{margin:"dense",id:"control",label:"CONTROL",defaultValue:"",variant:"filled"})}),Object(a.jsx)(u.a,{item:!0,xs:6,children:Object(a.jsx)(k.a,{margin:"dense",id:"section",label:"SECTION",defaultValue:"",variant:"filled"})}),Object(a.jsx)(u.a,{item:!0,xs:6,children:Object(a.jsx)(k.a,{margin:"dense",id:"job",label:"JOB",defaultValue:"",variant:"filled"})})]}),Object(a.jsx)(u.a,{container:!0,item:!0,xs:12,spacing:1,children:Object(a.jsx)(k.a,{id:"comment",label:"COMMENTS",multiline:!0,rows:4,defaultValue:"",variant:"filled"})})]})}),s()]})]}),Object(a.jsxs)(H.a,{children:[Object(a.jsx)(F.a,{children:"Step 2"}),Object(a.jsxs)(M.a,{children:[Object(a.jsx)("form",{className:t.root,noValidate:!0,autoComplete:"off",children:Object(a.jsxs)(u.a,{container:!0,spacing:4,children:[Object(a.jsxs)(u.a,{container:!0,item:!0,xs:12,spacing:1,alignItems:"flex-end",justify:"center",children:[Object(a.jsx)(u.a,{item:!0,xs:12,justify:"flex-start",children:Object(a.jsx)(d.a,{variant:"h6",children:"Basic design information"})}),Object(a.jsxs)(u.a,{container:!0,item:!0,xs:11,spacing:1,justify:"center",children:[Object(a.jsx)(u.a,{item:!0,xs:8,justify:"flex-start",children:Object(a.jsxs)(u.a,{container:!0,xs:12,justify:"flex-start",children:[Object(a.jsx)("span",{children:"Design life (years)"}),Object(a.jsx)("span",{className:t.dot,style:{flexGrow:1}})]})}),Object(a.jsx)(u.a,{item:!0,xs:4,children:Object(a.jsx)(N.a,{value:this.state.C18,onChange:function(t,s){return e.setState({C18:s})},defaultValue:30,min:1,max:100,id:"C18",valueLabelDisplay:"auto"})}),Object(a.jsx)(u.a,{item:!0,xs:8,justify:"flex-start",children:Object(a.jsxs)(u.a,{container:!0,xs:12,justify:"flex-start",children:[Object(a.jsx)("span",{children:"Total number of lanes in one direction"}),Object(a.jsx)("span",{className:t.dot,style:{flexGrow:1}})]})}),Object(a.jsx)(u.a,{item:!0,xs:4,children:Object(a.jsx)(N.a,{value:this.state.C24,onChange:function(t,s){return e.setState({C24:s})},defaultValue:2,min:1,max:10,id:"C24",valueLabelDisplay:"auto"})}),Object(a.jsx)(u.a,{item:!0,xs:8,justify:"flex-start",children:Object(a.jsxs)(u.a,{container:!0,xs:12,justify:"flex-start",children:[Object(a.jsx)("span",{children:"Total design traffic in one direction (million ESAL)"}),Object(a.jsx)("span",{className:t.dot,style:{flexGrow:1}})]})}),Object(a.jsx)(u.a,{item:!0,xs:4,children:Object(a.jsx)(N.a,{value:this.state.C25,onChange:function(t,s){return e.setState({C25:s})},defaultValue:100,min:10,max:1e3,id:"C25",valueLabelDisplay:"auto"})})]})]}),Object(a.jsxs)(u.a,{container:!0,item:!0,xs:12,spacing:1,alignItems:"flex-end",justify:"center",children:[Object(a.jsx)(u.a,{item:!0,xs:12,justify:"flex-start",children:Object(a.jsx)(d.a,{variant:"h6",children:"Structural design criteria"})}),Object(a.jsxs)(u.a,{container:!0,item:!0,xs:11,spacing:1,justify:"center",children:[Object(a.jsx)(u.a,{item:!0,xs:8,justify:"flex-start",children:Object(a.jsxs)(u.a,{container:!0,xs:12,justify:"flex-start",children:[Object(a.jsx)("span",{children:"Acceptable number of punchouts per mile"}),Object(a.jsx)("span",{className:t.dot,style:{flexGrow:1}})]})}),Object(a.jsx)(u.a,{item:!0,xs:4,children:Object(a.jsx)("input",{})})]})]}),Object(a.jsxs)(u.a,{container:!0,item:!0,xs:12,spacing:1,alignItems:"flex-end",justify:"center",children:[Object(a.jsx)(u.a,{item:!0,xs:12,justify:"flex-start",children:Object(a.jsx)(d.a,{variant:"h6",children:"Concrete Layer/Material information"})}),Object(a.jsxs)(u.a,{container:!0,item:!0,xs:11,spacing:1,justify:"center",children:[Object(a.jsx)(u.a,{item:!0,xs:8,justify:"flex-start",children:Object(a.jsxs)(u.a,{container:!0,xs:12,justify:"flex-start",children:[Object(a.jsx)("span",{children:"Thickness of Concrete Layer (in.)"}),Object(a.jsx)("span",{className:t.dot,style:{flexGrow:1}})]})}),Object(a.jsx)(u.a,{item:!0,xs:4,children:Object(a.jsx)(N.a,{value:this.state.F7,onChange:function(t,s){return e.setState({F7:s})},defaultValue:14,min:2,max:16,id:"F7",valueLabelDisplay:"auto"})}),Object(a.jsx)(u.a,{item:!0,xs:8,justify:"flex-start",children:Object(a.jsxs)(u.a,{container:!0,xs:12,justify:"flex-start",children:[Object(a.jsx)("span",{children:"28-Day Modulus of Rupture (psi)"}),Object(a.jsx)("span",{className:t.dot,style:{flexGrow:1}})]})}),Object(a.jsx)(u.a,{item:!0,xs:4,children:Object(a.jsx)(N.a,{value:this.state.F8,onChange:function(t,s){return e.setState({F8:s})},id:"F8",defaultValue:570,min:1,max:1e3,valueLabelDisplay:"auto"})})]})]})]})}),s()]})]}),Object(a.jsxs)(H.a,{children:[Object(a.jsx)(F.a,{children:"Step 3"}),Object(a.jsxs)(M.a,{children:[Object(a.jsx)("form",{className:t.root,noValidate:!0,autoComplete:"off",children:Object(a.jsxs)(u.a,{container:!0,spacing:4,children:[Object(a.jsxs)(u.a,{container:!0,item:!0,xs:12,spacing:1,alignItems:"flex-end",justify:"center",children:[Object(a.jsx)(u.a,{item:!0,xs:12,justify:"flex-start",children:Object(a.jsx)(d.a,{variant:"h6",children:"Base layer information"})}),Object(a.jsxs)(u.a,{container:!0,item:!0,xs:11,spacing:1,justify:"center",children:[Object(a.jsx)(u.a,{item:!0,xs:8,justify:"flex-start",children:Object(a.jsxs)(u.a,{container:!0,xs:12,justify:"flex-start",children:[Object(a.jsx)("span",{children:"Base type"}),Object(a.jsx)("span",{className:t.dot,style:{flexGrow:1}})]})}),Object(a.jsx)(u.a,{item:!0,xs:4,children:Object(a.jsx)(I.a,{margin:"dense",id:"baseType",options:V,size:"small",renderInput:function(e){return Object(a.jsx)(k.a,Object(m.a)(Object(m.a)({dense:!0},e),{},{label:""}))}})}),Object(a.jsx)(u.a,{item:!0,xs:8,justify:"flex-start",children:Object(a.jsxs)(u.a,{container:!0,xs:12,justify:"flex-start",children:[Object(a.jsx)("span",{children:"Base layer thickness (inches)"}),Object(a.jsx)("span",{className:t.dot,style:{flexGrow:1}})]})}),Object(a.jsx)(u.a,{item:!0,xs:4,children:Object(a.jsx)("input",{})}),Object(a.jsx)(u.a,{item:!0,xs:8,justify:"flex-start",children:Object(a.jsxs)(u.a,{container:!0,xs:12,justify:"flex-start",children:[Object(a.jsx)("span",{children:"Modulus of base layer (ksi)"}),Object(a.jsx)("span",{className:t.dot,style:{flexGrow:1}})]})}),Object(a.jsx)(u.a,{item:!0,xs:4,children:Object(a.jsx)("input",{})})]})]}),Object(a.jsxs)(u.a,{container:!0,item:!0,xs:12,spacing:1,alignItems:"flex-end",justify:"center",children:[Object(a.jsx)(u.a,{item:!0,xs:12,justify:"flex-start",children:Object(a.jsx)(d.a,{variant:"h6",children:"Subgrade layer information"})}),Object(a.jsxs)(u.a,{container:!0,item:!0,xs:11,spacing:1,justify:"center",children:[Object(a.jsx)(u.a,{item:!0,xs:8,justify:"flex-start",children:Object(a.jsxs)(u.a,{container:!0,xs:12,justify:"flex-start",children:[Object(a.jsx)("span",{children:"Soil classification of subgrade"}),Object(a.jsx)("span",{className:t.dot,style:{flexGrow:1}})]})}),Object(a.jsx)(u.a,{item:!0,xs:4,children:Object(a.jsx)(I.a,{margin:"dense",id:"soilSub",options:W,size:"small",renderInput:function(e){return Object(a.jsx)(k.a,Object(m.a)(Object(m.a)({dense:!0},e),{},{label:""}))}})})]})]})]})}),s()]})]})]}),this.state.activeStep===this.state.stepsLength&&Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)(C.a,{square:!0,elevation:0,className:t.resetContainer,children:[Object(a.jsx)(d.a,{children:"All steps completed - you're finished"}),Object(a.jsx)(b.a,{onClick:this.handleReset,className:t.button,children:"Reset"})]})}),this.state.finished?Object(a.jsx)(U,{init:this.state.activeStep===this.state.stepsLength,parameter:{C18:this.state.C18,C19:this.state.C19,C24:this.state.C24,C25:this.state.C25,F7:this.state.F7,F8:this.state.F8,F16:this.state.F16,F17:this.state.F17,F19:this.state.F19}}):""]})]})}}]),s}(i.Component),J=Object(y.a)((function(e){return{root:{width:"100%","& .MuiTextField-root":{width:"100%"},"& input":{width:"100%"}},button:{marginTop:e.spacing(1),marginRight:e.spacing(1)},actionsContainer:{marginBottom:e.spacing(2)},resetContainer:{padding:e.spacing(3)},dot:{borderBottom:"3px dotted",marginBottom:"4px"}}}))(Y),_=Object(o.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},titleNav:{flexGrow:1},title:{color:"white"},cover:{width:"100%",position:"fixed",background:"linear-gradient(0deg,rgba(0,0,0,0) 0,#000 100%), url(".concat(p,") no-repeat center center fixed"),backgroundSize:"cover",height:"100vh",overflow:"hidden",zIndex:-1}}}));var q=function(){var e=n.a.useState("home"),t=Object(l.a)(e,2),s=t[0],i=t[1],r=_();return Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{className:r.cover}),Object(a.jsx)(j.a,{position:"static",children:Object(a.jsx)(h.a,{children:Object(a.jsx)(d.a,{variant:"h6",className:r.titleNav,children:"TxCRCP-ME"})})}),Object(a.jsxs)("div",{className:r.root,children:[Object(a.jsx)(x.a,{direction:"up",in:"home"===s,mountOnEnter:!0,unmountOnExit:!0,children:Object(a.jsxs)(u.a,{container:!0,spacing:5,alignItems:"center",justify:"center",direction:"column",style:{height:"calc(100vh - 64px)",width:"100%"},children:[Object(a.jsx)(u.a,{item:!0,children:Object(a.jsx)(d.a,{variant:"h3",className:r.title,children:"TxDOT Mechanistic-Empirical CRCP Design System"})}),Object(a.jsxs)(u.a,{container:!0,item:!0,alignItems:"stretch",justify:"center",direction:"column",spacing:3,style:{width:"fit-content"},children:[Object(a.jsx)(u.a,{item:!0,children:Object(a.jsx)(b.a,{variant:"contained",color:"primary",style:{width:"100%"},onClick:function(){return i("CRCP")},children:"CRCP Design"})}),Object(a.jsx)(u.a,{item:!0,children:Object(a.jsx)(b.a,{variant:"contained",style:{width:"100%"},children:"Slab Support"})}),Object(a.jsx)(u.a,{item:!0,children:Object(a.jsx)(b.a,{variant:"contained",style:{width:"100%"},children:"Product Disclaimer"})})]})]})}),Object(a.jsx)(x.a,{direction:"up",in:"CRCP"===s,mountOnEnter:!0,unmountOnExit:!0,children:Object(a.jsx)(J,{toMenu:function(){return i("home")}})})]})]})},X=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,295)).then((function(t){var s=t.getCLS,a=t.getFID,i=t.getFCP,n=t.getLCP,r=t.getTTFB;s(e),a(e),i(e),n(e),r(e)}))};c.a.render(Object(a.jsx)(n.a.StrictMode,{children:Object(a.jsx)(q,{})}),document.getElementById("root")),X()}},[[238,1,2]]]);
//# sourceMappingURL=main.f6999a59.chunk.js.map