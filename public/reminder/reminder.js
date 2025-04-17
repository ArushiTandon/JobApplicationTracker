const apiUrl = "http://localhost:3000/reminder";

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
  if (!confirm("Delete this reminder?")) return;
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
async function editReminder(reminder) {
  const newMessage = prompt("Edit message:", reminder.message);
  if (!newMessage) return;

  try {
    await axios.put(
      `${apiUrl}/update/${reminder.id}`,
      {
        message: newMessage,
      },
      {
        headers
      }
    );

    fetchReminders();
  } catch (err) {
    console.error(err);
    alert("Failed to update reminder");
  }
}

addEventListener("DOMContentLoaded", () => {
    fetchReminders();
    
})
