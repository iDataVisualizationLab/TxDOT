import React, { useState } from 'react';
import { Container, Paper, Typography, Button, TextField } from '@material-ui/core';
import axios from 'axios';
import * as TransferFuncVar from './TransferFuncVar.js';

const TransferFunc = () => {
  const [A, setA] = useState(TransferFuncVar.A);  // State for A
  const [B, setB] = useState(TransferFuncVar.B);  // State for B
  const [C, setC] = useState(TransferFuncVar.C);  // State for C
  const [token, setToken] = useState(''); // State for GitHub token

  const uploadFile = async () => {
    const filePath = `src/component/TransferFuncVar.js`;
    const repoOwner = 'iDataVisualizationLab';
    const repoName = 'TxDOT';
    const branch = 'main';

    if (!token) {
      console.error('GitHub token is required');
      return;
    }

    const getFileSHA = async () => {
      try {
        const res = await axios.get(
          `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${branch}`,
          {
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

    const sha = await getFileSHA();
    console.log('File SHA:', sha);

    // Prepare the updated content for the file
    const updatedContent = `
export const A = ${A};
export const B = ${B};
export const C = ${C};
`;

    const content = btoa(unescape(encodeURIComponent(updatedContent))); // Convert text to base64

    try {
      const response = await axios.put(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
        {
          message: sha ? 'Update TransferFuncVar.js file' : 'Create TransferFuncVar.js file',
          content: content,
          sha: sha,
          branch: branch,
        },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      console.log('File uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Transfer Function Page
        </Typography>
        <Typography variant="body1" align="center">
          Update the values of A, B, and C below.
        </Typography>

        <TextField
          label="Value for A"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={A}
          onChange={(e) => setA(e.target.value)}
        />
        <TextField
          label="Value for B"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={B}
          onChange={(e) => setB(e.target.value)}
        />
        <TextField
          label="Value for C"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={C}
          onChange={(e) => setC(e.target.value)}
        />

        <TextField
          label="GitHub Token"
          type="password" // Hides token input for security
          variant="outlined"
          fullWidth
          margin="normal"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <Button onClick={uploadFile} variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Upload File to GitHub
        </Button>
      </Paper>
    </Container>
  );
};

export default TransferFunc;
