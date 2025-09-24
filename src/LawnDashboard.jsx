
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const seasons = ["Spring", "Summer", "Autumn", "Winter"];

const taskTemplates = {
  Spring: [
    "Mow every 7–10 days",
    "Apply Fertech Fusion + Hicure",
    "Apply pre-emergent (Barricade)",
    "Weed control with Bow & Arrow",
    "Water 2–3x/week if dry"
  ],
  Summer: [
    "Mow every 5–7 days",
    "Fertilise with Accelerate or Elevate",
    "Apply wetting agent",
    "Use Acelepryn GR if pests present",
    "Water deeply (20–25mm/session)"
  ],
  Autumn: [
    "Mow every 10–14 days",
    "Apply Endurance fertiliser",
    "Use Kelpro for root health",
    "Weed control for broadleaf/winter grass",
    "Aerate if needed"
  ],
  Winter: [
    "Mow monthly if needed",
    "Apply Endurance (low N, high K)",
    "Use iron supplements for colour",
    "Spot weed control",
    "Review irrigation system"
  ]
};

function LawnDashboard() {
  const [season, setSeason] = React.useState("Spring");
  const [tasks, setTasks] = React.useState([]);
  const [completed, setCompleted] = React.useState(() => JSON.parse(localStorage.getItem('completedTasks') || '{}'));

  React.useEffect(() => {
    const currentMonth = new Date().getMonth();
    if (currentMonth >= 9 || currentMonth < 2) setSeason("Spring");
    else if (currentMonth >= 2 && currentMonth < 5) setSeason("Summer");
    else if (currentMonth >= 5 && currentMonth < 8) setSeason("Autumn");
    else setSeason("Winter");
  }, []);

  React.useEffect(() => {
    const seasonTasks = taskTemplates[season] || [];
    setTasks(seasonTasks);
  }, [season]);

  const toggleTask = (task) => {
    const updated = { ...prev, [task]: !prev[task] }; localStorage.setItem('completedTasks', JSON.stringify(updated)); return updated; 
      ...prev,
      [task]: !prev[task]
    }));
  };

  const completionRate =
    tasks.length > 0
      ? (tasks.filter((task) => completed[task]).length / tasks.length) * 100
      : 0;

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Kikuyu Lawn Care Dashboard</h1>

      <div style={{ marginTop: "1rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.25rem" }}>Current Season: {season}</h2>
          <button onClick={() => setSeason((prev) => {
            const nextIndex = (seasons.indexOf(prev) + 1) % 4;
            return seasons[nextIndex];
          })}>
            Switch Season
          </button>
        </div>
        <div style={{ height: "10px", backgroundColor: "#e0e0e0", borderRadius: "4px", marginTop: "0.5rem" }}>
          <div style={{ width: `${completionRate}%`, backgroundColor: "#4caf50", height: "100%", borderRadius: "4px" }}></div>
        </div>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task}
            style={{
              backgroundColor: completed[task] ? "#d4edda" : "#fff",
              textDecoration: completed[task] ? "line-through" : "none",
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "0.75rem",
              marginBottom: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            {task}
            <button
              onClick={() => toggleTask(task)}
              style={{ padding: "0.25rem 0.5rem" }}
            >
              {completed[task] ? "Undo" : "Done"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LawnDashboard />
  </React.StrictMode>
);
