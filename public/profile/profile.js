const apiUrl = 'http://localhost:3000/api/user';
const token = localStorage.getItem("authToken");
const headers = {
  "x-auth-token": `Bearer ${token}`,
};

// Fetch and render user data
async function fetchUserProfile() {
  
  try {

    const res = await axios.get(`${apiUrl}/profile`, { headers });
    const user = res.data.user;

    // View mode
    document.getElementById('userName').innerText = user.username || '—';
    document.getElementById('email').innerText = user.email;
    document.getElementById('phone').innerText = user.phone;
    document.getElementById('location').innerText = user.location || '—';
    document.getElementById('currentRole').innerText = user.currentRole || '—';
    document.getElementById('currentCompany').innerText = user.currentCompany || '—';
    document.getElementById('experienceLevel').innerText = user.experienceLevel || '—';
    document.getElementById('careerGoals').innerText = user.careerGoals || '—';

    // Edit form
    document.getElementById('userNameInput').value = user.username || '';
    document.getElementById('emailInput').value = user.email || '';
    document.getElementById('phoneInput').value = user.phone || '';
    document.getElementById('locationInput').value = user.location || '';
    document.getElementById('currentRoleInput').value = user.currentRole || '';
    document.getElementById('currentCompanyInput').value = user.currentCompany || '';
    document.getElementById('experienceLevelInput').value = user.experienceLevel || '';
    document.getElementById('careerGoalsInput').value = user.careerGoals || '';

  } catch (err) {
    console.error('Error fetching user:', err);
    alert('Failed to load user data.');
  }
}

// Toggle edit form visibility
function toggleEditMode(showEdit = true) {
  document.getElementById('profileView').classList.toggle('d-none', showEdit);
  document.getElementById('profileEditForm').classList.toggle('d-none', !showEdit);
}

// Handle form submit
async function submitUserUpdate(e) {
  e.preventDefault();

  const body = {
    username: document.getElementById('userNameInput').value,
    email: document.getElementById('emailInput').value,
    phone: document.getElementById('phoneInput').value,
    location: document.getElementById('locationInput').value,
    currentRole: document.getElementById('currentRoleInput').value,
    currentCompany: document.getElementById('currentCompanyInput').value,
    experienceLevel: document.getElementById('experienceLevelInput').value,
    careerGoals: document.getElementById('careerGoalsInput').value
  };

  try {
    const res = await axios.put(`${apiUrl}/update`, body, { headers });
    alert(res.data.message || 'Profile updated.');
    await fetchUserProfile();
    toggleEditMode(false);

    window.location.href = "/dashboard";
    
  } catch (err) {
    console.error('Update error:', err);
    alert(err.response?.data?.message || 'Failed to update profile.');
  }
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  fetchUserProfile();

  document.getElementById('editToggleBtn').addEventListener('click', () => toggleEditMode(true));
  document.getElementById('cancelEdit').addEventListener('click', () => toggleEditMode(false));
  document.getElementById('profileEditForm').addEventListener('submit', submitUserUpdate);
});
