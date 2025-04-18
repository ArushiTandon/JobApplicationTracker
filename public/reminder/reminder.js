const apiUrl = "http://localhost:3000/api/reminder";

const token = localStorage.getItem("authToken");
const headers = {
  "x-auth-token": `Bearer ${token}`,
};

const reminderList = document.getElementById("reminderList");
const reminderForm = document.getElementById("reminderForm");

// Load Reminders
async function fetchReminders() {

  try {
    const res = await axios.get(`${apiUrl}/all`, {
      headers
    });
    
    const reminders = res.data.reminders;
    reminderList.innerHTML = "";
    
    if (reminders.length === 0) {
      reminderList.innerHTML =
        '<li class="list-group-item text-muted">No reminders found.</li>';
      return;
    }

    reminders.forEach((reminder) => {
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-start";
      li.innerHTML = `
            <div>
              <div><strong>Job ID:</strong> ${reminder.jobApplicationId}</div>
              <div><strong>Date:</strong> ${new Date(
                reminder.reminderDate
              ).toLocaleString()}</div>
              <div><strong>Note:</strong> ${reminder.message}</div>
            </div>
            <div>
              <button class="btn btn-sm btn-danger me-2" onclick="deleteReminder(${
                reminder.id
              })">Delete</button>
              <button class="btn btn-sm btn-secondary" onclick='editReminder(${JSON.stringify(
                reminder
              )})'>Edit</button>
            </div>
          `;
      reminderList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    alert("Failed to load reminders");
  }
}

async function populateJobApplications() {
  try {
    const res = await axios.get('http://localhost:3000/jobApplication/all', { headers });
    const select = document.getElementById("jobId");
    select.innerHTML = '<option value="">-- Select Job Application --</option>';

    res.data.jobApplications.forEach(app => {
      const option = document.createElement("option");
      option.value = app.id;
      option.textContent = `${app.jobTitle} at ${app.companyName}`;
      select.appendChild(option);
    });
  } catch (err) {
    console.error("Failed to load job applications:", err);
    document.getElementById("jobId").innerHTML = '<option value="">Error loading applications</option>';
  }
}


// Submit New Reminder
reminderForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const jobApplicationId = document.getElementById("jobId").value;
  const reminderDate = document.getElementById("reminderDate").value;
  const message = document.getElementById("message").value;

  try {
    await axios.post(
      `${apiUrl}/create`,
      { jobApplicationId, reminderDate, message },
      {
        headers
      }
    );

    reminderForm.reset();
    fetchReminders();
  } catch (err) {
    console.error(err);
    alert("Failed to create reminder");
  }
});

// Delete Reminder
async function deleteReminder(reminderId) {
  
  try {
    await axios.delete(`${apiUrl}/delete/${reminderId}`, {
      headers
    });
    fetchReminders();
  } catch (err) {
    console.error(err);
    alert("Failed to delete reminder");
  }
}

// Edit Reminder (basic implementation with prompt)
function editReminder(reminder) {
  // Fill in modal fields
  document.getElementById("editReminderId").value = reminder.id;
  document.getElementById("editReminderMessage").value = reminder.message;
  document.getElementById("editReminderDate").value = new Date(reminder.reminderDate)
    .toISOString()
    .slice(0, 16); // for datetime-local input

  // Show the modal
  const modal = new bootstrap.Modal(document.getElementById('editReminderModal'));
  modal.show();

  // Attach one-time event listener for form submission
  const form = document.getElementById("editReminderForm");

  const submitHandler = async function (e) {
    e.preventDefault();

    const id = document.getElementById("editReminderId").value;
    const message = document.getElementById("editReminderMessage").value;
    const reminderDate = document.getElementById("editReminderDate").value;

    try {
      await axios.put(`${apiUrl}/update/${id}`, { message, reminderDate }, { headers });

      bootstrap.Modal.getInstance(document.getElementById("editReminderModal")).hide();
      fetchReminders();
    } catch (err) {
      console.error(err);
      alert("Failed to update reminder");
    } finally {
      form.removeEventListener("submit", submitHandler); 
    }
  };

  form.addEventListener("submit", submitHandler);
}


addEventListener("DOMContentLoaded", () => {
    fetchReminders();
    populateJobApplications();
})
