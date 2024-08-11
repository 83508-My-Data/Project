import React from 'react';
import axios from 'axios';

const FileDownloadButton = ({ fileId }) => {
  const handleDownload = async () => {
    try {
      // Make a GET request to the download endpoint
      const response = await axios.get(`https://localhost:7104/DownloadFile/1`, {
        responseType: 'blob', // Set the response type to blob
      });

      // Create a URL for the file and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', response.headers['content-disposition']?.split('filename=')[1] || 'file');
      
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <button onClick={handleDownload}>
      Download File
    </button>
  );
};

export default FileDownloadButton;
