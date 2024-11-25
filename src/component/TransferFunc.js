import React, {
  Component
} from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  TextField
} from '@material-ui/core';
import axios from 'axios';
import {
  MathJax,
  MathJaxContext
} from 'better-react-mathjax';
import Plot from 'react-plotly.js'; // Import Plotly component
import * as TransferFuncVar from './TransferFuncVar.js';
import HomeIcon from "@material-ui/icons/Home";
import packagejson from '../../package.json';

class TransferFunc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      A: TransferFuncVar.A,
      B: TransferFuncVar.B,
      C: TransferFuncVar.C,
      version: packagejson.version,
      token: '',
      errorA: false,
      errorB: false,
      errorC: false,
      errorToken: false,
      loading: false,
    };
  }

  // Validation function
  validateInputs = () => {
    let valid = true;
    const {
      A,
      B,
      C,
      token,
      version
    } = this.state;

    if (!A || isNaN(A)) {
      this.setState({
        errorA: true
      });
      valid = false;
    } else {
      this.setState({
        errorA: false
      });
    }

    if (!B || isNaN(B)) {
      this.setState({
        errorB: true
      });
      valid = false;
    } else {
      this.setState({
        errorB: false
      });
    }

    if (!C || isNaN(C)) {
      this.setState({
        errorC: true
      });
      valid = false;
    } else {
      this.setState({
        errorC: false
      });
    }

    if (!version) {
      this.setState({
        errorVersion: true
      });
      valid = false;
    } else {
      this.setState({
        errorVersion: false
      });
    }

    if (!token) {
      this.setState({
        errorToken: true
      });
      valid = false;
    } else {
      this.setState({
        errorToken: false
      });
    }

    return valid;
  };

  uploadVar = async () => {
    const {
      A,
      B,
      C,
      token,
      version
    } = this.state;

    if (!this.validateInputs()) return;

    const filePath = `src/component/TransferFuncVar.js`;
    const repoOwner = 'iDataVisualizationLab';
    const repoName = 'TxDOT';
    const branch = 'main';

    const getFileSHA = async (filePath) => {
      try {
        const res = await axios.get(
          `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${branch}`, 
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        return res.data.sha;  // File exists, return its SHA
      } catch (err) {
        console.warn(`${filePath} does not exist, creating a new one`);
        return null;  // File doesn't exist, return null to create a new file
      }
    };

    this.setState({
      loading: true
    }); 
    const shaTransferFuncVar = await getFileSHA(filePath);
    const shaPackageJson = await getFileSHA('package.json');
    const updatedContent = `
      export const A = ${A};
      export const B = ${B};
      export const C = ${C};
      `;

    const content = btoa(unescape(encodeURIComponent(updatedContent))); // Convert text to base64
    const updatedPackageJson = {
      ...packagejson, // Current content
      version: version, // New version
    };

    const updatedPackageJsonContent = JSON.stringify(updatedPackageJson, null, 2); // Format the JSON

    const contentPackageJson = btoa(unescape(encodeURIComponent(updatedPackageJsonContent))); // Base64 encode

    try {
      const response = await axios.put(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
          message: shaTransferFuncVar ? 'Update TransferFuncVar.js file' : 'Create TransferFuncVar.js file',
          content: content,
          sha: shaTransferFuncVar,
          branch: branch,
        }, {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );

      await axios.put(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/package.json`, {
          message: 'Update package.json version',
          content: contentPackageJson,
          sha: shaPackageJson,
          branch: branch,
        }, {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      console.log('File uploaded successfully', response.data);

      // Show success alert
      alert('File uploaded successfully!');
      this.setState({
        loading: false
      }); 
      this.props.toMenu();
    } catch (error) {
      console.error('Error uploading file', error);

      this.setState({
        loading: false
      }); 
      // Check if the error is due to an invalid token (401 Unauthorized)
      if (error.response && error.response.status === 401) {
        alert('Error: Invalid GitHub token. Please check your token and try again.');
      }
      // Check if the error is related to the repository not found (404 Not Found)
      else if (error.response && error.response.status === 404) {
        alert('Error: Repository not found. Please check the repository name');
      }
      // Check if the error is a network issue (e.g., timeout)
      else if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
        alert('Error: Network error occurred. Please check your internet connection.');
      }
      // General error
      else {
        alert('Error uploading file. Please try again.');
      }
    }
  };

  calculatePO = (FD, A, B, C) => {
    return A / (1 + B * Math.pow(FD, C)); // Formula PO = A / (1 + B * (FD)^C)
  };

  calculateRedPO = (FD) => {
    const A_red = 18.99;
    const B_red = 29.34;
    const C_red = -1.33;
    return this.calculatePO(FD, A_red, B_red, C_red);
  };

  calculateBlackPO = (FD) => {
    return this.calculatePO(FD, TransferFuncVar.A, TransferFuncVar.B, TransferFuncVar.C);
  };

  render() {
    const { A, B, C, token, version, errorA, errorB, errorC, errorToken, errorVersion, loading} = this.state;
  
    // Generate FD values and PO values
    const FDValues = Array.from({ length: 1000 }, (_, i) => Math.pow(10, -3 + (i * 6) / 999)); // From 1e-3 to 1e3
    const POValues = FDValues.map(FD => this.calculatePO(FD, A, B, C)); // New PO values (using dynamic A, B, C)
    const RedPOValues = FDValues.map(FD => this.calculateRedPO(FD)); // 0-6274
    const BlackPOValues = FDValues.map(FD => this.calculateBlackPO(FD)); // Current PO value
  
    return (
      <MathJaxContext>
        <Container maxWidth="xl" style={{ padding: '40px 0' }}>
          <Paper
            elevation={3}
            style={{
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '12px',
            }}
          >
            {/* Title Section */}
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              style={{
                marginBottom: '30px',
                fontWeight: 'bold',
                fontSize: '3rem',
                color: '#333',
              }}
            >
              Transfer Function Page
            </Typography>
            {/* Main Content */}
            <Grid container spacing={4} style={{ marginTop: '40px' }}>
                  {/* Formula Section */}
                  <Grid item xs={12} xl={4}>
                    <Typography variant="body1" align="center" gutterBottom style={{ color: '#e53935', fontSize: '1.7rem' }}>
                      <MathJax style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                        {`\\( (0-6274) \\ PO_{Texas} = \\frac{18.99}{1 + 29.34(FD)^{-1.33}} \\)`}
                      </MathJax>
                    </Typography></Grid>
                  <Grid item xs={12} xl={4}>
                    <Typography variant="body1" align="center" gutterBottom style={{ fontSize: '1.7rem', color: '#444' }}>
                      <MathJax style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                        {`\\( Current \\ PO_{Texas} = \\frac{${TransferFuncVar.A}}{1 + ${TransferFuncVar.B}(FD)^{${TransferFuncVar.C}}} \\)`}
                      </MathJax>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} xl={4}>
                <Typography variant="body1" align="center" gutterBottom style={{ color: '#1976d2', fontSize: '2rem' }}>
                  <MathJax key={`${A}-${B}-${C}`} style={{ fontSize: '2rem', textAlign: 'center' }}>
                    {`\\( New \\ PO_{Texas} = \\frac{${A}}{1 + ${B}(FD)^{${C}}} \\)`}
                  </MathJax>
                </Typography>
              </Grid>

              {/* Plot Section */}
              <Grid item xs={12} sm={8}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: 'auto',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: 'auto', resize: 'both', overflow: 'auto'
                }}>
                  <Plot
                    data={[
                      { x: FDValues, y: RedPOValues, type: 'scatter', mode: 'lines', name: '0-6274', line: { color: '#e53935' } },
                      { x: FDValues, y: BlackPOValues, type: 'scatter', mode: 'lines', name: 'Current PO', line: { color: 'black' } },
                      { x: FDValues, y: POValues, type: 'scatter', mode: 'lines', name: 'New PO', line: { color: '#1976d2' } },
                    ]}
                    layout={{
                      autosize: true,
                      // width: 1250,
                      // height: 550,
                      title: 'Transfer Function for TxCRCP-ME',
                      titlefont: { size: 26, family: 'Arial, sans-serif', color: '#333' },
                      xaxis: {
                        type: 'log',
                        tickmode: 'array',
                        tickvals: [1e-3, 1e-2, 1e-1, 1e0, 1e1, 1e2, 1e3],
                        ticktext: ['1e-3', '1e-2', '1e-1', '1e0', '1e1', '1e2', '1e3'],
                        title: 'Cumulative Damage (FD)',
                        titlefont: { size: 18, color: '#333' },
                      },
                      yaxis: {
                        title: 'Punchout per Lane Mile (PO)',
                        titlefont: { size: 18, color: '#333' },
                      },
                      legend: {
                        font: { size: 18, color: '#333' },
                      },
                      showlegend: true,
                    }}
                  />
                </div>
              </Grid>
              {/* Form Section */}
              <Grid item xs={12} sm={4}>

                <Typography variant="body1" align="center" style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#555' }}>
                  Update the values of A, B, and C below:
                </Typography>

                <Grid container spacing={2}>
                  {/* Row 1: A and C */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Value for A"
                      type="number"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={A}
                      onChange={(e) => this.setState({ A: e.target.value })}
                      error={errorA}
                      helperText={errorA ? 'Please enter a valid value for A.' : ''}
                      InputLabelProps={{ style: { fontSize: '1.5rem' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Value for C"
                      type="number"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={C}
                      onChange={(e) => this.setState({ C: e.target.value })}
                      error={errorC}
                      helperText={errorC ? 'Please enter a valid value for C.' : ''}
                      InputLabelProps={{ style: { fontSize: '1.5rem' } }}
                    />
                  </Grid>

                  {/* Row 2: B and version */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Value for B"
                      type="number"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={B}
                      onChange={(e) => this.setState({ B: e.target.value })}
                      error={errorB}
                      helperText={errorB ? 'Please enter a valid value for B.' : ''}
                      InputLabelProps={{ style: { fontSize: '1.5rem' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Version"
                      type="text"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={version}
                      onChange={(e) => this.setState({ version: e.target.value })}
                      error={errorVersion}
                      helperText={errorVersion ? 'Please enter a valid version.' : ''}
                      InputLabelProps={{ style: { fontSize: '1.5rem' } }}
                    />
                  </Grid>

                  {/* Row 3: GitHub Token */}
                  <Grid item xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        label="GitHub Token"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={token}
                        onChange={(e) => this.setState({ token: e.target.value })}
                        error={errorToken}
                        helperText={errorToken ? 'Please enter a valid GitHub token.' : ''}
                        InputLabelProps={{ style: { fontSize: '1.5rem' } }}
                        style={{ marginRight: '10px' }}
                      />
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={this.props.handleHelpClick}
                        style={{ fontSize: '0.875rem', padding: '2px 16px' }}
                      >
                        What is a Token?
                      </Button>
                    </div>
                  </Grid>

                  {/* Row 4: Buttons */}
                  <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={this.props.toMenu}
                      style={{ marginTop: '20px', fontSize: '1.1rem', borderRadius: '8px', padding: '10px 20px' }}
                      startIcon={<HomeIcon />}
                    >
                      To Main Menu
                    </Button>
                    <Button
                      onClick={this.uploadVar}
                      variant="contained"
                      color="primary"
                      style={{
                        marginTop: '20px',
                        marginLeft: '20px',
                        fontSize: '1.1rem',
                        borderRadius: '8px',
                        padding: '10px 20px',
                      }}
                      disabled={loading}
                    >
                      {loading ? 'Uploading...' : 'Upload Variable to GitHub'}
                    </Button>
                  </Grid>
                </Grid>

              </Grid>

            </Grid>
          </Paper>
        </Container>
      </MathJaxContext>
    );
    
  }
  
}

export default TransferFunc;
