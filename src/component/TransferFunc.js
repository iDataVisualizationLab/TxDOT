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

    const getFileSHA = async () => {
      try {
        const res = await axios.get(
          `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${branch}`, {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        return res.data.sha;
      } catch (err) {
        console.warn('File does not exist, creating a new one');
        return null; // File doesn't exist, so no SHA to pass
      }
    };

    this.setState({
      loading: true
    }); 
    const sha = await getFileSHA();
    this.setState({
      loading: false
    }); // Reset loading after the request is done
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
          message: sha ? 'Update TransferFuncVar.js file' : 'Create TransferFuncVar.js file',
          content: content,
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
    } catch (error) {
      console.error('Error uploading file', error);

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

  calculatePO = (FC, A, B, C) => {
    return A / (1 + B * Math.pow(FC, C)); // Formula PO = A / (1 + B * (FC)^C)
  };

  calculateRedPO = (FC) => {
    const A_red = 18.99;
    const B_red = 29.34;
    const C_red = -1.33;
    return this.calculatePO(FC, A_red, B_red, C_red);
  };

  calculateBlackPO = (FC) => {
    return this.calculatePO(FC, TransferFuncVar.A, TransferFuncVar.B, TransferFuncVar.C);
  };

  render() {
    const { A, B, C, token, version, errorA, errorB, errorC, errorToken, errorVersion, loading } = this.state;
  
    // Generate FC values and PO values
    const FCValues = Array.from({ length: 1000 }, (_, i) => Math.pow(10, -3 + (i * 6) / 999)); // From 1e-3 to 1e3
    const POValues = FCValues.map(FC => this.calculatePO(FC, A, B, C)); // New PO values (using dynamic A, B, C)
    const RedPOValues = FCValues.map(FC => this.calculateRedPO(FC)); // 0-6274
    const BlackPOValues = FCValues.map(FC => this.calculateBlackPO(FC)); // Current PO value
  
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
              {/* Form Section */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" align="center" gutterBottom style={{ color: '#1976d2', fontSize: '2rem' }}>
                  <MathJax style={{ fontSize: '2rem', textAlign: 'center' }}>
                    {`\\( New \\ PO_{Texas} = \\frac{${A}}{1 + ${B} \\cdot (FC)^{${C}}} \\)`}
                  </MathJax>
                </Typography>
    
                <Typography variant="body1" align="center" style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#555' }}>
                  Update the values of A, B, and C below:
                </Typography>
    
                {/* Input Fields */}
                {[
                  { label: 'Value for A', value: A, error: errorA, onChange: (e) => this.setState({ A: e.target.value }) },
                  { label: 'Value for B', value: B, error: errorB, onChange: (e) => this.setState({ B: e.target.value }) },
                  { label: 'Value for C', value: C, error: errorC, onChange: (e) => this.setState({ C: e.target.value }) },
                  { label: 'GitHub Token', value: token, error: errorToken, type: 'password', onChange: (e) => this.setState({ token: e.target.value }) },
                  { label: 'Version', value: version, error: errorVersion, type: 'text', onChange: (e) => this.setState({ version: e.target.value }) }
                ].map(({ label, value, error, type = 'number', onChange }, index) => (
                  <TextField
                    key={index}
                    label={label}
                    type={type}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={value}
                    onChange={onChange}
                    error={error}
                    helperText={error ? `Please enter a valid ${label.toLowerCase()}.` : ''}
                    style={{ fontSize: '1.2rem', marginBottom: '20px' }}
                  />
                ))}
    
                {/* Buttons */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                </div>
              </Grid>
    
              {/* Plot Section */}
              <Grid item xs={12} sm={6}>
            <Grid container spacing={4} style={{ marginTop: '40px' }}>
            {/* Formula Section */}
            <Grid item xs={12} xl={6}>
            <Typography variant="body1" align="center" gutterBottom style={{ color: '#e53935', fontSize: '1.7rem' }}>
              <MathJax style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                {`\\( (0-6274) \\ PO_{Texas} = \\frac{18.99}{1 + 29.34 \\cdot (FC)^{-1.33}} \\)`}
              </MathJax>
            </Typography></Grid>
            <Grid item xs={12} xl={6}>
            <Typography variant="body1" align="center" gutterBottom style={{ fontSize: '1.7rem', color: '#444' }}>
              <MathJax style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                {`\\( Current \\ PO_{Texas} = \\frac{${TransferFuncVar.A}}{1 + ${TransferFuncVar.B} \\cdot (FC)^{${TransferFuncVar.C}}} \\)`}
              </MathJax>
            </Typography>
            </Grid>
            </Grid>
                <Plot
                  data={[
                    { x: FCValues, y: RedPOValues, type: 'scatter', mode: 'lines', name: '0-6274', line: { color: '#e53935' } },
                    { x: FCValues, y: BlackPOValues, type: 'scatter', mode: 'lines', name: 'Current PO', line: { color: 'black' } },
                    { x: FCValues, y: POValues, type: 'scatter', mode: 'lines', name: 'New PO', line: { color: '#1976d2' } },
                  ]}
                  layout={{
                    autosize: true,
                    width: 800,
                    height: 500,
                    title: 'Transfer Function for TxCRCP-ME',
                    titlefont: { size: 26, family: 'Arial, sans-serif', color: '#333' },
                    xaxis: {
                      type: 'log',
                      tickmode: 'array',
                      tickvals: [1e-3, 1e-2, 1e-1, 1e0, 1e1, 1e2, 1e3],
                      ticktext: ['1e-3', '1e-2', '1e-1', '1e0', '1e1', '1e2', '1e3'],
                      title: 'Cumulative Damage (FC)',
                      titlefont: { size: 18, color: '#333' },
                    },
                    yaxis: {
                      title: 'Punchout per Lane Mile (PO)',
                      titlefont: { size: 18, color: '#333' },
                    },
                    showlegend: true,
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </MathJaxContext>
    );
    
  }
  
}

export default TransferFunc;
