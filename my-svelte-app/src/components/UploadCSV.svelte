<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    let file;
  
    const uploadFile = async () => {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        await axios.post('http://localhost:3001/csv', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('File uploaded successfully');
      } catch (error) {
        console.error(error);
        alert('Error uploading file');
      }
    };
  </script>
  
  <input type="file" bind:this={file} accept=".csv" />
  <button on:click={uploadFile}>Upload CSV</button>
  