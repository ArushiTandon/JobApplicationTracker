const apiUrl = 'http://localhost:3000/dashboard';

const token = localStorage.getItem("authToken");
const headers = {
  "x-auth-token": `Bearer ${token}`,
};

document.addEventListener("DOMContentLoaded", () => {
  fetchOverviewStats();
  fetchChartData();
});


// async function fetchProfile() {
//   try {
//     const response = await axios.get("http://localhost:3000/", { headers });
//     const data = response.data;
//     document.getElementById("userName").textContent = data.name;
//     document.getElementById("userEmail").textContent = data.email;
//     document.getElementById("userGoal").textContent = data.careerGoal || "Not set";
//   } catch (error) {
//     console.error("Profile fetch error:", error);
//   }
// }

async function fetchOverviewStats() {
  try {
    const response = await axios.get(`${apiUrl}/overview`, { headers });
    const stats = response.data;

    document.getElementById("totalApplications").textContent = stats.totalApplications || 0;
    document.getElementById("applied").textContent = stats.applied || 0;
    document.getElementById("interviewed").textContent = stats.interviewed || 0;
    document.getElementById("offered").textContent = stats.offered || 0;
    document.getElementById("rejected").textContent = stats.rejected || 0;
    document.getElementById("accepted").textContent = stats.accepted || 0;
  } catch (error) {
    console.error("Overview stats fetch error:", error);
  }
}

async function fetchChartData() {
  try {
    const response = await axios.get(`${apiUrl}/charts`, { headers });
    const timeline = response.data.timeline;

    const dates = timeline.map(t => t.date);
    const counts = timeline.map(t => parseInt(t.count));
    renderChart(dates, counts);
  } catch (error) {
    console.error("Chart data fetch error:", error);
  }
}

function renderChart(labels, data) {
  const ctx = document.getElementById("timelineChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Applications",
        data: data,
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13, 110, 253, 0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          precision: 0
        }
      }
    }
  });
}
