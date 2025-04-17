const apiUrl = "http://localhost:3000/jobs";
const jobListEl = document.getElementById("jobList");
const token = localStorage.getItem("authToken");
const headers = {
  "x-auth-token": `Bearer ${token}`,
};

async function fetchJobs() {
  try {
    const res = await axios.get(`${apiUrl}/all`, {
      headers
    });
    const jobs = res.data.jobs;

    const savedRes = await axios.get(`${apiUrl}/saved`, {
      headers
    });
    const savedJobs = savedRes.data.savedJobs.map((j) => j.jobId);

    renderJobs(jobs, savedJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
}

function renderJobs(jobs, savedJobIds) {
  jobListEl.innerHTML = ""; 

  jobs.forEach((job) => {
    const isSaved = savedJobIds.includes(job.id);
    const card = document.createElement("div");
    card.className = "col-md-6 mb-4";

    card.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${job.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${job.companyName} • ${job.location}</h6>
          <p class="card-text">${job.description}</p>
          <p><strong>Type:</strong> ${job.jobType}</p>
          <p><strong>Salary:</strong> ${job.salary}</p>
          <div class="d-flex gap-2">
            <button class="btn ${isSaved ? 'btn-success' : 'btn-outline-primary'} save-btn" data-jobid="${job.id}">
              ${isSaved ? 'Unsave' : 'Save'}
            </button>
            <a href="/jobApplications/jobApplications.html?companyId=${job.companyId}&jobId=${job.id}" class="btn btn-primary">Apply</a>
          </div>
        </div>
      </div>
    `;

    jobListEl.appendChild(card);
  });

  attachSaveListeners();
}


function attachSaveListeners() {
  const buttons = document.querySelectorAll(".save-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const jobId = btn.getAttribute("data-jobid");
      const isSaved = btn.classList.contains("btn-success");

      if (isSaved) {
        await unsaveJob(jobId, btn);
      } else {
        await saveJob(jobId, btn);
      }
    });
  });
}

async function saveJob(jobId, button) {
  try {
    await axios.post(
      `${apiUrl}/save`,
      { jobId },
      { headers }
    );
    button.classList.remove("btn-outline-primary");
    button.classList.add("btn-success");
    button.innerText = "Unsave";
  } catch (error) {
    console.error("Error saving job:", error);
  }
}

async function unsaveJob(jobId, button) {
  try {
    await axios.delete(`${apiUrl}/unsave/${jobId}`, {
      headers
    });
    button.classList.remove("btn-success");
    button.classList.add("btn-outline-primary");
    button.innerText = "Save";
  } catch (error) {
    console.error("Error unsaving job:", error);
  }
}


fetchJobs();
