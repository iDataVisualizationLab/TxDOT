import React, { useState } from 'react';
import { Container, Paper, Typography, Button, TextField } from '@material-ui/core';
import axios from 'axios';

const TransferFunc = () => {
  const [text, setText] = useState(''); // State for file content
  const [token, setToken] = useState(''); // State for token input

  const uploadFile = async () => {
    const filePath = `src/component/test.js`;
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

    const content = btoa(unescape(encodeURIComponent(text))); // Convert text to base64

    try {
      const response = await axios.put(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
        {
          message: sha ? 'Update TransferFunc.js file' : 'Create TransferFunc.js file',
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
          This is the Transfer Function page content.
        </Typography>
        
        <TextField
          label="File Content"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
          value={text}
          onChange={(e) => setText(e.target.value)}
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
