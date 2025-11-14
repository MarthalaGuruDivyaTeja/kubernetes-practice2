import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const HostelManager = () => {
  const [hostels, setHostels] = useState([]);
  const [hostel, setHostel] = useState({
    id: '',
    name: '',
    location: '',
    type: '',
    capacity: '',
    wardenName: '',
    wardenContact: '',
    email: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedHostel, setFetchedHostel] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${import.meta.env.VITE_API_URL}/hostelapi`;

  useEffect(() => {
    fetchAllHostels();
  }, []);

  const fetchAllHostels = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setHostels(res.data);
    } catch (error) {
      setMessage('Failed to fetch hostels.');
    }
  };

  const handleChange = (e) => {
    setHostel({ ...hostel, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in hostel) {
      if (!hostel[key] || hostel[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addHostel = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, hostel);
      setMessage('Hostel added successfully.');
      fetchAllHostels();
      resetForm();
    } catch (error) {
      setMessage('Error adding hostel.');
    }
  };

  const updateHostel = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, hostel);
      setMessage('Hostel updated successfully.');
      fetchAllHostels();
      resetForm();
    } catch (error) {
      setMessage('Error updating hostel.');
    }
  };

  const deleteHostel = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllHostels();
    } catch (error) {
      setMessage('Error deleting hostel.');
    }
  };

  const getHostelById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedHostel(res.data);
      setMessage('');
    } catch (error) {
      setFetchedHostel(null);
      setMessage('Hostel not found.');
    }
  };

  const handleEdit = (hstl) => {
    setHostel(hstl);
    setEditMode(true);
    setMessage(`Editing hostel with ID ${hstl.id}`);
  };

  const resetForm = () => {
    setHostel({
      id: '',
      name: '',
      location: '',
      type: '',
      capacity: '',
      wardenName: '',
      wardenContact: '',
      email: ''
    });
    setEditMode(false);
  };

  return (
    <div className="hostel-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Hostel Management</h2>

      <div>
        <h3>{editMode ? 'Edit Hostel' : 'Add Hostel'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={hostel.id} onChange={handleChange} />
          <input type="text" name="name" placeholder="Hostel Name" value={hostel.name} onChange={handleChange} />
          <input type="text" name="location" placeholder="Location" value={hostel.location} onChange={handleChange} />
          <select name="type" value={hostel.type} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="BOYS">BOYS</option>
            <option value="GIRLS">GIRLS</option>
          </select>
          <input type="number" name="capacity" placeholder="Capacity" value={hostel.capacity} onChange={handleChange} />
          <input type="text" name="wardenName" placeholder="Warden Name" value={hostel.wardenName} onChange={handleChange} />
          <input type="text" name="wardenContact" placeholder="Warden Contact" value={hostel.wardenContact} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={hostel.email} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addHostel}>Add Hostel</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateHostel}>Update Hostel</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Hostel By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getHostelById}>Fetch</button>

        {fetchedHostel && (
          <div>
            <h4>Hostel Found:</h4>
            <pre>{JSON.stringify(fetchedHostel, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Hostels</h3>
        {hostels.length === 0 ? (
          <p>No hostels found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(hostel).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hostels.map((hstl) => (
                  <tr key={hstl.id}>
                    {Object.keys(hostel).map((key) => (
                      <td key={key}>{hstl[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(hstl)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteHostel(hstl.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default HostelManager;
