const apiUrl = 'http://localhost:3000/jobApplication';

const token = localStorage.getItem("authToken");
const headers = {
  "x-auth-token": `Bearer ${token}`,
};

async function addJobApplication(event) {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const companyId = params.get('companyId');
    const jobId = params.get('jobId');

    const form = document.getElementById("jobApplicationForm");

    const formData = new FormData(form);
    formData.append("companyId", companyId);
    formData.append("jobId", jobId);

    try {

      const res = await axios.post(`${apiUrl}/create`, formData, { headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },});

      alert(res.data.message);

    } catch (err) {
      console.error(err);
      alert("Error submitting job application");
    }
}

async function fetchJobApplications() {
  try {
    const res = await axios.get(`${apiUrl}/all`, { headers });
    const jobApplications = res.data.jobApplications;

    
    renderTable(jobApplications);
    
  } catch (err) {
    console.error("Failed to load job applications:", err);
    alert("Could not fetch job applications");
  }
}


async function searchApplications() {

  const keyword = document.getElementById("keyword").value;
    const status = document.getElementById("statusFilter").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (status) params.append("status", status);
    if (startDate && endDate) {
      params.append("startDate", startDate);
      params.append("endDate", endDate);
    }

    try {
      const res = await axios.get(`${apiUrl}/search?${params.toString()}`, { headers });
      renderTable(res.data.applications);
    } catch (err) {
      console.error(err);
            alert("Search failed");
    }
  }

  // Render applications to table
  function renderTable(applications) {
    const tbody = document.querySelector("#applicationsTable tbody");
    tbody.innerHTML = "";

    if (applications.length === 0) {
      tbody.innerHTML = "<tr><td colspan='8' class='text-center'>No applications found</td></tr>";
      return;
    }

    applications.forEach((app) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${app.companyName || "-"}</td>
        <td>${app.jobTitle}</td>
        <td>${app.status}</td>
        <td>${new Date(app.applicationDate).toLocaleDateString()}</td>
        <td>${app.location || "-"}</td>
        <td>${app.notes || "-"}</td>
        <td>
          ${
            app.resumeUrl
              ? `<a href="${app.resumeUrl}" target="_blank">View</a>`
              : "-"
          }
        </td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteApplication(${app.id})">Delete</button>
        </td>
      `;

      tbody.appendChild(tr);
    });
}

async function deleteApplication(id) {
  try {

    console.log("Sending DELETE for id:", id);
    
    await axios.delete(`${apiUrl}/delete/${id}`, {
      headers
    });
    fetchJobApplications(); 
  } catch (err) {
    console.error(err);
    alert("Failed to delete application");
  }
}



document.addEventListener("DOMContentLoaded", async () => {
  
  fetchJobApplications();

});
  
  