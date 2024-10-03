<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    let csvData = [];
  
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/csv');
      csvData = response.data;
    };
  
    const deleteData = async (id) => {
      await axios.delete(`http://localhost:3001/csv/${id}`);
      fetchData(); // Refresh the data after deletion
    };
  
    onMount(() => {
      fetchData();
    });
  </script>
  
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Body</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each csvData as row}
        <tr>
          <td>{row.id}</td>
          <td>{row.name}</td>
          <td>{row.email}</td>
          <td>{row.body}</td>
          <td>
            <button on:click={() => deleteData(row.id)}>Delete</button>
            <!-- Implement modal for update here -->
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  