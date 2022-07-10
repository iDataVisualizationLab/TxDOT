import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Typography,Button,Toolbar,Grid,Slide} from '@material-ui/core';
import coverPic from './image/cover.jpg';
import CRCP from './component/CRCP'
import logo from "./image/logo_g.png";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import headerPic from './image/Header_EXBD_prnt_fromMac.png';

let theme = createMuiTheme({
  palette: {
    primary: {main:'#14375A'},
    secondary: {main: '#CC7B29'},
    // grey: 500,

    text: {primary: '#000000'}
  },
  typography: {
    // fontSize: 16,
    fontFamily: [
      'Franklin Gothic Book','Franklin Gothic Demi Cond',
      'arial'
    ].join(','),
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleNav: {
    flexGrow: 1,
    paddingLeft:5,
    paddingTop:2
  },
  title: {
    color: 'white'
  },
  cover: {
    width:'100%',
    position:'fixed',
    background: `linear-gradient(0deg,rgba(0,0,0,0) 0,#000 100%), url(${coverPic}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    height: '100vh',
    overflow: 'hidden',
    zIndex: -1
  },
}));

function App() {
  const [page, setPage] = React.useState('home');
  const [AnalysisPunchouts, setAnalysisPunchouts] = React.useState(0);
  const [AnalysisSlabThickness, setAnalysisSlabThickness] = React.useState(0);
  const classes = useStyles();
  const AnalysisPunchoutsFunc = (d)=>d===undefined?AnalysisPunchouts:setAnalysisPunchouts(d);
  const AnalysisSlabThicknessFunc = (d)=>d===undefined?AnalysisSlabThickness:setAnalysisSlabThickness(d);
  return (
      <ThemeProvider theme={theme}>
        <div >
          <div className={classes.cover}></div>
          <AppBar position="static" style={{backgroundImage: `url(${headerPic})`, backgroundSize:'cover'}}>
            {/*<AppBar position="static">*/}
            <Toolbar>
              <img src={logo} style={{width:50}} alt={"title"}/>
              <Typography variant="h6" className={classes.titleNav}>
                TxCRCP-ME Analysis
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.root}>
            <Slide direction="up" in={page==='home'} mountOnEnter unmountOnExit>
              <Grid container spacing={5} alignItems="center" justify="center" direction={"column"} style={{height: 'calc(100vh - 64px)',width:'100%'}}>
                <Grid item>
                  <Typography variant="h3" className={classes.title}>
                    TxDOT Mechanistic-Empirical CRCP Design System
                  </Typography>
                </Grid>
                <Grid container item alignItems="stretch" justify="center" direction={"column"} spacing={3} style={{width:'fit-content'}}>
                  <Grid item>
                    <Button variant="contained" color="primary" style={{width:'100%'}} onClick={()=>setPage('CRCP')}>CRCP Design</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" style={{width:'100%'}}>Slab Support</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" style={{width:'100%'}}>Product Disclaimer</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Slide>
            <Slide direction="up" in={page==='CRCP'} mountOnEnter unmountOnExit>
              <CRCP
                  toMenu={()=>setPage('home')}
                  // print={(d)=>{setReportData(d);setPage('Print')}}
                  AnalysisPunchouts={AnalysisPunchoutsFunc}
                  AnalysisSlabThickness={AnalysisSlabThicknessFunc}
              />
            </Slide>
            {/*<Slide direction="up" in={page==='Print'} mountOnEnter unmountOnExit>*/}
            {/*  <Report*/}
            {/*      data={reportData}*/}
            {/*      toMenu={()=>setPage('home')}*/}
            {/*      toCRCP={()=>setPage('CRCP')}*/}
            {/*      AnalysisPunchouts={AnalysisPunchoutsFunc()}*/}
            {/*  />*/}
            {/*</Slide>*/}
          </div>
        </div>
      </ThemeProvider>
  );
}

export default App;
