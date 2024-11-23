import React, { useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Typography, Button, Toolbar, Grid, Slide, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import coverPic from './image/cover.jpg';
import CRCP from './component/CRCP';
import TransferFunc from './component/TransferFunc';
import logo from "./image/logo_g.png";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import headerPic from './image/Header_EXBD_prnt_fromMac.png';
import packagejson from '../package.json';

let theme = createMuiTheme({
  palette: {
    primary: { main: '#14375A' },
    secondary: { main: '#CC7B29' },
    text: { primary: '#000000' }
  },
  typography: {
    fontFamily: ['Franklin Gothic Book', 'Franklin Gothic Demi Cond', 'arial'].join(','),
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
    paddingLeft: 5,
    paddingTop: 2
  },
  title: {
    color: 'white'
  },
  cover: {
    width: '100%',
    position: 'fixed',
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
  const [anchorEl, setAnchorEl] = useState(null); // State to manage the settings menu
  const [openAboutModal, setOpenAboutModal] = useState(false); // About modal state
  const [openHelpModal, setOpenHelpModal] = useState(false); // Help modal state
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const classes = useStyles();
  const AnalysisPunchoutsFunc = (d) => d === undefined ? AnalysisPunchouts : setAnalysisPunchouts(d);
  const AnalysisSlabThicknessFunc = (d) => d === undefined ? AnalysisSlabThickness : setAnalysisSlabThickness(d);
  
  const handleAboutClick = () => setOpenAboutModal(true);
  const handleHelpClick = () => setOpenHelpModal(true);

  const handleCloseAboutModal = () => setOpenAboutModal(false);
  const handleCloseHelpModal = () => setOpenHelpModal(false);
  const handleCloseUpdateDialog = () => {setOpenUpdateDialog(false);
    setIsShown(true);}
  async function checkForUpdates() {
    const repo = "iDataVisualizationLab/TxDOT";
    const branch = "main";
  
    try {
      // Use the GitHub API to get the latest commit
      const response = await fetch(`https://api.github.com/repos/${repo}/commits/${branch}`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      const latestCommitHash = data.sha;
  
      // Compare with the local commit hash
      if (process.env.LOCAL_COMMIT_HASH !== latestCommitHash) {
        if (!isShown) {
          setOpenUpdateDialog(true);
        } else {
          setOpenUpdateDialog(false);          
        }
      } else {
        console.log("You are using the latest version.");
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
    }
  }
  checkForUpdates();
  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className={classes.cover}></div>
        <AppBar position="static" style={{ backgroundImage: `url(${headerPic})`, backgroundSize: 'cover' }}>
          <Toolbar>
            <img src={logo} alt="description" style={{ width: 50 }} />
            <Typography variant="h6" className={classes.titleNav}>
              TxCRCP-ME Analysis
            </Typography>

            {/* Settings Icon Button */}
            <IconButton
              color="inherit"
              aria-controls="settings-menu"
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)} // Open menu
            >
              <SettingsIcon />
            </IconButton>

            {/* Settings Menu */}
            <Menu
              id="settings-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)} // Close menu
            >
              <MenuItem onClick={() => {setPage('TransferFunc');checkForUpdates();}}>Transfer Function</MenuItem>
              <MenuItem onClick={handleHelpClick}>Help</MenuItem>
              <MenuItem onClick={handleAboutClick}>About</MenuItem>
            </Menu>
            
          </Toolbar>
        </AppBar>
        {/* Dialog for Update Information */}
        <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update Available</DialogTitle>
        <DialogContent>
          <p>A newer version of this application is available.</p>
          <p>
            Please download the latest version from{' '}
            <a href="https://github.com/iDataVisualizationLab/TxDOT/releases" target="_blank" rel="noopener noreferrer">
              GitHub Releases
            </a>.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
        {/* About Modal */}
        <Dialog open={openAboutModal} onClose={handleCloseAboutModal}>
          <DialogTitle>About</DialogTitle>
          <DialogContent>
            <h3>Program Name</h3>
            <p>TxDOT Mechanistic-Empirical CRCP Design System</p> 

            <h3>Version</h3>
            <p>{packagejson.version}</p> 

            <h3>Developed By</h3>
            <p>iDataVisualizationLab</p> 
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAboutModal} color="primary">Close</Button>
          </DialogActions>
        </Dialog>

        {/* Help Modal */}
        <Dialog open={openHelpModal} onClose={handleCloseHelpModal}>
          <DialogTitle>Help</DialogTitle>
          <DialogContent>
            <h3>How to Generate a Private Access Token</h3>
            <ol>
              <li>Go to your GitHub account and navigate to <strong>Settings</strong>.</li>
              <li>Under <strong>Developer settings</strong>, select <strong>Personal access tokens</strong>.</li>
              <li>Click <strong>Fine-grained tokens</strong>, then <strong>Generate new token</strong>.</li>
              <li>Enter a descriptive <strong>Name</strong> for the token.</li>
              <li>Set the <strong>Repository Access</strong> scope to include <strong>iDataVisualizationLab/TxDOT</strong>.</li>
              <li>Select appropriate permissions (e.g., read/write for releases).</li>
              <li>Click <strong>Generate token</strong> and copy the token for use.</li>
            </ol>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseHelpModal} color="primary">Close</Button>
          </DialogActions>
        </Dialog>

        <div className={classes.root}>
          {/* Home Page */}
          <Slide direction="up" in={page === 'home'} mountOnEnter unmountOnExit>
            <Grid container spacing={5} alignItems="center" justify="center" direction={"column"} style={{ height: 'calc(100vh - 64px)', width: '100%' }}>
              <Grid item>
                <Typography variant="h3" className={classes.title}>
                  TxDOT Mechanistic-Empirical CRCP Design System
                </Typography>
              </Grid>
              <Grid container item alignItems="stretch" justify="center" direction={"column"} spacing={3} style={{ width: 'fit-content' }}>
                <Grid item>
                  <Button variant="contained" color="primary" style={{ width: '100%' }} onClick={() => {setPage('CRCP');checkForUpdates();}}>CRCP Design</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" style={{ width: '100%' }}>Slab Support</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" style={{ width: '100%' }}>Product Disclaimer</Button>
                </Grid>
              </Grid>
            </Grid>
          </Slide>

          {/* CRCP Page */}
          <Slide direction="up" in={page === 'CRCP'} mountOnEnter unmountOnExit>
            <CRCP
              toMenu={() => {setPage('home');checkForUpdates();}}
              AnalysisPunchouts={AnalysisPunchoutsFunc}
              AnalysisSlabThickness={AnalysisSlabThicknessFunc}
            />
          </Slide>

          {/* Transfer Function Page */}
          <Slide direction="up" in={page === 'TransferFunc'} mountOnEnter unmountOnExit>
            <div>
              <TransferFunc 
                toMenu={() => {setPage('home');checkForUpdates();}}
                handleHelpClick = {handleHelpClick} />
            </div>
          </Slide>
        </div>

      </div>
    </ThemeProvider>
  );
}

export default App;
