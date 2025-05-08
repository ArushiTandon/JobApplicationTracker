const JobApplication = require("../model/jobApplication");
const { fn, col } = require("sequelize");


exports.getOverviewStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalApplications = await JobApplication.count({ where: { userId } });

    const statusCounts = await JobApplication.findAll({
      where: { userId },
      attributes: ["status", [fn("COUNT", col("status")), "count"]],
      group: ["status"]
    });

    const stats = {
      totalApplications,
      applied: 0,
      interviewed: 0,
      offered: 0,
      rejected: 0,
      accepted: 0
    };

    statusCounts.forEach((s) => {
      stats[s.status.toLowerCase()] = parseInt(s.dataValues.count);
    });

    res.status(200).json(stats);
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Failed to load overview stats" });
  }
};


exports.getChartData = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const timeline = await JobApplication.findAll({
        where: { userId },
        attributes: [
          [fn("DATE", col("applicationDate")), "date"],
          [fn("COUNT", col("id")), "count"]
        ],
        group: ["date"],
        order: [[fn("DATE", col("applicationDate")), "ASC"]]
      });
  
      res.status(200).json({ timeline });
    } catch (err) {
      console.error("Chart data error:", err);
      res.status(500).json({ error: "Failed to load chart data" });
    }
  };
  