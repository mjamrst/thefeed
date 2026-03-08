import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const STORAGE_KEY = "thefeed-launch-tracker-v1";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const WEEKS = [
  { id: 1, label: "Week 1: Foundation", dates: "March 4–9", goal: "Name finalized, domain purchased, email live, insurance purchased" },
  { id: 2, label: "Week 2: Website Launch", dates: "March 10–16", goal: "Website live on custom domain, social media presence established" },
  { id: 3, label: "Week 3: Get the Word Out", dates: "March 17–23", goal: "Network activated, local outreach, community visibility" },
  { id: 4, label: "Week 4: Close the First Client", dates: "March 24–31", goal: "First client booked and scheduled" },
];

const SEED_TASKS = [
  // Week 1
  { id: "w1-1", title: "Finalize business name", week: 1, dueDate: "2026-03-04", assignee: "Both", done: true },
  { id: "w1-2", title: "Purchase domain (.com and .co)", week: 1, dueDate: "2026-03-05", assignee: "Mike", done: true },
  { id: "w1-3", title: "Connect domain to Vercel deployment", week: 1, dueDate: "2026-03-05", assignee: "Mike", done: false },
  { id: "w1-4", title: "Set up Google Workspace — create nellie@ and hello@ emails", week: 1, dueDate: "2026-03-05", assignee: "Mike", done: false },
  { id: "w1-5", title: "Get malpractice / professional liability insurance", week: 1, dueDate: "2026-03-06", assignee: "Nellie", done: false },
  { id: "w1-6", title: "Apply for NPI Number (nppes.cms.hhs.gov)", week: 1, dueDate: "2026-03-06", assignee: "Nellie", done: false },
  { id: "w1-7", title: "File DBA with LA County ($26 + newspaper publication)", week: 1, dueDate: "2026-03-07", assignee: "Mike", done: false },
  { id: "w1-8", title: "File for Redondo Beach Business License + Home Occupation Permit", week: 1, dueDate: "2026-03-07", assignee: "Mike", done: false },
  { id: "w1-9", title: "Complete tier builder at internal tools", week: 1, dueDate: "2026-03-09", assignee: "Nellie", done: false },
  { id: "w1-10", title: "Order business cards (name, credentials, phone, email, website)", week: 1, dueDate: "2026-03-09", assignee: "Both", done: false },

  // Week 2
  { id: "w2-1", title: "Update website with real content — bio, headshot, services, contact form", week: 2, dueDate: "2026-03-12", assignee: "Mike", done: false },
  { id: "w2-2", title: "Verify custom domain working (HTTPS, mobile + desktop)", week: 2, dueDate: "2026-03-12", assignee: "Mike", done: false },
  { id: "w2-3", title: "Set up Google Business Profile (service-area business, hides home address)", week: 2, dueDate: "2026-03-12", assignee: "Both", done: false },
  { id: "w2-4", title: "Create Instagram account — headshot, bio, credentials, website link", week: 2, dueDate: "2026-03-14", assignee: "Nellie", done: false },
  { id: "w2-5", title: "Post 3–5 initial posts on Instagram", week: 2, dueDate: "2026-03-14", assignee: "Nellie", done: false },
  { id: "w2-6", title: "Create Facebook business page", week: 2, dueDate: "2026-03-14", assignee: "Nellie", done: false },
  { id: "w2-7", title: "Write personal intro post for social media and mom groups", week: 2, dueDate: "2026-03-16", assignee: "Nellie", done: false },
  { id: "w2-8", title: "Identify 5–10 local Facebook / mom groups to join", week: 2, dueDate: "2026-03-16", assignee: "Nellie", done: false },

  // Week 3
  { id: "w3-1", title: "Tell professional network — personal messages to colleagues & friends", week: 3, dueDate: "2026-03-18", assignee: "Nellie", done: false },
  { id: "w3-2", title: "Create referral flyer (PDF — photo, credentials, services, QR code)", week: 3, dueDate: "2026-03-18", assignee: "Mike", done: false },
  { id: "w3-3", title: "Drop off business cards + flyers at local spots", week: 3, dueDate: "2026-03-20", assignee: "Nellie", done: false },
  { id: "w3-4", title: "Post in local mom groups (follow group rules)", week: 3, dueDate: "2026-03-20", assignee: "Nellie", done: false },
  { id: "w3-5", title: "Reach out to local doula networks (DoulaMatch.net)", week: 3, dueDate: "2026-03-20", assignee: "Nellie", done: false },
  { id: "w3-6", title: "Set up introductory offer (free 15-min consult or discount)", week: 3, dueDate: "2026-03-23", assignee: "Both", done: false },
  { id: "w3-7", title: "Host free Instagram/Facebook Live Q&A session", week: 3, dueDate: "2026-03-23", assignee: "Nellie", done: false },
  { id: "w3-8", title: "Follow up with referral contacts who didn't respond", week: 3, dueDate: "2026-03-23", assignee: "Nellie", done: false },

  // Week 4
  { id: "w4-1", title: "Follow up on every warm lead — offer free phone calls", week: 4, dueDate: "2026-03-25", assignee: "Nellie", done: false },
  { id: "w4-2", title: "Post consistently on social media (3–4 posts/week min)", week: 4, dueDate: "2026-03-25", assignee: "Nellie", done: false },
  { id: "w4-3", title: "Expand outreach if needed — Nextdoor, personal contacts, Reddit", week: 4, dueDate: "2026-03-27", assignee: "Both", done: false },
  { id: "w4-4", title: "Book and confirm the first appointment", week: 4, dueDate: "2026-03-31", assignee: "Nellie", done: false },
  { id: "w4-5", title: "Prepare client intake form (info, health history, feeding concerns)", week: 4, dueDate: "2026-03-31", assignee: "Mike", done: false },
  { id: "w4-6", title: "Prepare consent / disclosure form (scope of practice, privacy)", week: 4, dueDate: "2026-03-31", assignee: "Mike", done: false },
  { id: "w4-7", title: "Set up payment method (Venmo/Zelle for now)", week: 4, dueDate: "2026-03-31", assignee: "Nellie", done: false },
  { id: "w4-8", title: "Create superbill template for insurance reimbursement", week: 4, dueDate: "2026-03-31", assignee: "Mike", done: false },
];

function generateId() {
  return "task-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function isOverdue(dateStr, done) {
  if (done || !dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dateStr + "T12:00:00");
  due.setHours(0, 0, 0, 0);
  return due < today;
}

function isDueToday(dateStr, done) {
  if (done || !dateStr) return false;
  const today = new Date();
  const due = new Date(dateStr + "T12:00:00");
  return today.toDateString() === due.toDateString();
}

// Map Supabase row (snake_case) to app task (camelCase)
function rowToTask(row) {
  return {
    id: row.id,
    title: row.title,
    week: row.week,
    dueDate: row.due_date,
    assignee: row.assignee,
    done: row.done,
  };
}

// Map app task (camelCase) to Supabase row (snake_case)
function taskToRow(task) {
  return {
    id: task.id,
    title: task.title,
    week: task.week,
    due_date: task.dueDate || null,
    assignee: task.assignee,
    done: task.done,
  };
}

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.tasks && parsed.tasks.length > 0) return parsed.tasks;
      }
    } catch {}
    return SEED_TASKS;
  });

  const [filter, setFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newWeek, setNewWeek] = useState(1);
  const [newDueDate, setNewDueDate] = useState("");
  const [newAssignee, setNewAssignee] = useState("Both");
  const [lastSaved, setLastSaved] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null);
  const [syncStatus, setSyncStatus] = useState("loading"); // "loading" | "synced" | "offline"
  const initialFetchDone = useRef(false);

  // Save to localStorage on every change (offline cache)
  const saveLocal = useCallback((tasksToSave) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks: tasksToSave, savedAt: new Date().toISOString() }));
      setLastSaved(new Date());
    } catch {}
  }, []);

  useEffect(() => {
    saveLocal(tasks);
  }, [tasks, saveLocal]);

  // Fetch from Supabase on mount
  useEffect(() => {
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;

    async function fetchTasks() {
      try {
        const { data, error } = await supabase
          .from("launch_tasks")
          .select("*")
          .order("week", { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped = data.map(rowToTask);
          setTasks(mapped);
          setSyncStatus("synced");
        } else {
          // Table exists but is empty — or table doesn't have data yet.
          // Keep localStorage data and mark as synced (user can run migration).
          setSyncStatus("synced");
        }
      } catch {
        // Network error or table doesn't exist yet — fall back to localStorage
        setSyncStatus("offline");
      }
    }

    fetchTasks();
  }, []);

  const toggleTask = (id) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
      // Async Supabase update (fire and forget, optimistic)
      const task = updated.find((t) => t.id === id);
      if (task) {
        supabase
          .from("launch_tasks")
          .update({ done: task.done })
          .eq("id", id)
          .then(({ error }) => {
            if (error) setSyncStatus("offline");
            else setSyncStatus("synced");
          });
      }
      return updated;
    });
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    supabase
      .from("launch_tasks")
      .delete()
      .eq("id", id)
      .then(({ error }) => {
        if (error) setSyncStatus("offline");
        else setSyncStatus("synced");
      });
  };

  const addTask = () => {
    if (!newTitle.trim()) return;
    const task = {
      id: generateId(),
      title: newTitle.trim(),
      week: newWeek,
      dueDate: newDueDate || null,
      assignee: newAssignee,
      done: false,
    };
    setTasks((prev) => [...prev, task]);
    supabase
      .from("launch_tasks")
      .insert(taskToRow(task))
      .then(({ error }) => {
        if (error) setSyncStatus("offline");
        else setSyncStatus("synced");
      });
    setNewTitle("");
    setNewDueDate("");
    setShowAddForm(false);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "todo") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const totalDone = tasks.filter((t) => t.done).length;
  const totalTasks = tasks.length;
  const overallPercent = totalTasks === 0 ? 0 : Math.round((totalDone / totalTasks) * 100);

  const weekStats = (weekId) => {
    const weekTasks = tasks.filter((t) => t.week === weekId);
    const done = weekTasks.filter((t) => t.done).length;
    return { done, total: weekTasks.length, percent: weekTasks.length === 0 ? 0 : Math.round((done / weekTasks.length) * 100) };
  };

  const ASSIGNEE_COLORS = {
    Mike: { bg: "#E8F0FE", text: "#1A56DB", border: "#93B4F5" },
    Nellie: { bg: "#FFF0E8", text: "#A85D3B", border: "#D4956F" },
    Both: { bg: "#F0F0EE", text: "#2C2825", border: "#B0A89C" },
  };

  const SYNC_INDICATOR = {
    loading: { label: "Loading…", color: "#B0A89C" },
    synced: { label: "Synced", color: "#6BBF8A" },
    offline: { label: "Offline", color: "#D94F4F" },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #FFF8F0; color: #2C2825; }
        input, select, button, textarea { font-family: 'DM Sans', sans-serif; }
        ::selection { background: #C4956A; color: white; }

        .task-row:hover .delete-btn { opacity: 1; }
        .delete-btn { opacity: 0; transition: opacity 0.15s; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes checkPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        @media (max-width: 640px) {
          .week-header-row { flex-direction: column !important; align-items: flex-start !important; gap: 6px !important; }
          .task-meta { flex-direction: column !important; align-items: flex-start !important; gap: 4px !important; }
          .filter-bar { flex-direction: column !important; align-items: stretch !important; }
          .add-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(28px, 5vw, 40px)",
            fontWeight: 400,
            letterSpacing: "-0.5px",
            marginBottom: 4,
          }}>
            Launch Tracker
          </h1>
          <p style={{ color: "#8A7F72", fontSize: 14, marginBottom: 20 }}>
            The Feed — 30-Day Plan to First Client by March 31
          </p>

          {/* Overall progress */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#2C2825" }}>
                Overall Progress
              </span>
              <span style={{ fontSize: 13, color: "#8A7F72" }}>
                {totalDone} / {totalTasks} tasks ({overallPercent}%)
              </span>
            </div>
            <div style={{
              height: 8,
              background: "#EDE8E1",
              borderRadius: 4,
              overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                width: `${overallPercent}%`,
                background: overallPercent === 100 ? "#6BBF8A" : "#C4956A",
                borderRadius: 4,
                transition: "width 0.4s ease",
              }} />
            </div>
          </div>

          {/* Filter + Add */}
          <div className="filter-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {["all", "todo", "done"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "6px 14px",
                    fontSize: 13,
                    fontWeight: filter === f ? 600 : 400,
                    border: "1px solid",
                    borderColor: filter === f ? "#C4956A" : "#E0DAD2",
                    background: filter === f ? "#C4956A" : "transparent",
                    color: filter === f ? "white" : "#8A7F72",
                    borderRadius: 6,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {f === "all" ? "All" : f === "todo" ? "To Do" : "Done"}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              style={{
                padding: "6px 16px",
                fontSize: 13,
                fontWeight: 500,
                border: "1px solid #C4956A",
                background: showAddForm ? "#2C2825" : "transparent",
                color: showAddForm ? "white" : "#C4956A",
                borderRadius: 6,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {showAddForm ? "Cancel" : "+ Add Task"}
            </button>
          </div>
        </div>

        {/* Add task form */}
        {showAddForm && (
          <div style={{
            background: "white",
            border: "1px solid #E0DAD2",
            borderRadius: 10,
            padding: 20,
            marginBottom: 24,
            animation: "fadeIn 0.2s ease",
          }}>
            <div className="add-form-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 14,
            }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontSize: 12, color: "#8A7F72", display: "block", marginBottom: 4 }}>Task</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  placeholder="What needs to get done?"
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: 14,
                    border: "1px solid #E0DAD2",
                    borderRadius: 6,
                    outline: "none",
                    background: "#FFFBF7",
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#8A7F72", display: "block", marginBottom: 4 }}>Week</label>
                <select
                  value={newWeek}
                  onChange={(e) => setNewWeek(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: 14,
                    border: "1px solid #E0DAD2",
                    borderRadius: 6,
                    background: "#FFFBF7",
                    cursor: "pointer",
                  }}
                >
                  {WEEKS.map((w) => (
                    <option key={w.id} value={w.id}>Week {w.id}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#8A7F72", display: "block", marginBottom: 4 }}>Due Date</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: 14,
                    border: "1px solid #E0DAD2",
                    borderRadius: 6,
                    background: "#FFFBF7",
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#8A7F72", display: "block", marginBottom: 4 }}>Assignee</label>
                <select
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: 14,
                    border: "1px solid #E0DAD2",
                    borderRadius: 6,
                    background: "#FFFBF7",
                    cursor: "pointer",
                  }}
                >
                  <option value="Mike">Mike</option>
                  <option value="Nellie">Nellie</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <button
                  onClick={addTask}
                  disabled={!newTitle.trim()}
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: 14,
                    fontWeight: 600,
                    border: "none",
                    borderRadius: 6,
                    background: newTitle.trim() ? "#C4956A" : "#E0DAD2",
                    color: newTitle.trim() ? "white" : "#B0A89C",
                    cursor: newTitle.trim() ? "pointer" : "default",
                    transition: "all 0.15s",
                  }}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Week sections */}
        {WEEKS.map((week) => {
          const weekTasks = filteredTasks.filter((t) => t.week === week.id);
          const stats = weekStats(week.id);

          if (weekTasks.length === 0 && filter !== "all") return null;

          return (
            <div key={week.id} style={{ marginBottom: 28 }}>
              {/* Week header */}
              <div className="week-header-row" style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                paddingBottom: 8,
                borderBottom: "1px solid #E0DAD2",
              }}>
                <div>
                  <h2 style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(18px, 3vw, 22px)",
                    fontWeight: 400,
                    marginBottom: 2,
                  }}>
                    {week.label}
                  </h2>
                  <p style={{ fontSize: 12, color: "#B0A89C" }}>{week.dates}</p>
                </div>
                <div style={{ textAlign: "right", minWidth: 100 }}>
                  <span style={{ fontSize: 12, color: "#8A7F72" }}>
                    {stats.done}/{stats.total}
                  </span>
                  <div style={{
                    height: 4,
                    width: 100,
                    background: "#EDE8E1",
                    borderRadius: 2,
                    marginTop: 4,
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${stats.percent}%`,
                      background: stats.percent === 100 ? "#6BBF8A" : "#C4956A",
                      borderRadius: 2,
                      transition: "width 0.4s ease",
                    }} />
                  </div>
                </div>
              </div>

              {/* Goal */}
              <p style={{ fontSize: 12, color: "#A09888", fontStyle: "italic", marginBottom: 10, paddingLeft: 2 }}>
                Goal: {week.goal}
              </p>

              {/* Tasks */}
              {weekTasks.length === 0 ? (
                <p style={{ fontSize: 13, color: "#B0A89C", padding: "12px 0", textAlign: "center" }}>
                  No tasks match filter
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {weekTasks.map((task) => {
                    const overdue = isOverdue(task.dueDate, task.done);
                    const dueToday = isDueToday(task.dueDate, task.done);
                    const ac = ASSIGNEE_COLORS[task.assignee] || ASSIGNEE_COLORS.Both;

                    return (
                      <div
                        key={task.id}
                        className="task-row"
                        onMouseEnter={() => setHoveredTask(task.id)}
                        onMouseLeave={() => setHoveredTask(null)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          borderRadius: 8,
                          background: hoveredTask === task.id ? "#FFFBF7" : "transparent",
                          transition: "background 0.1s",
                        }}
                      >
                        {/* Checkbox */}
                        <div
                          onClick={() => toggleTask(task.id)}
                          style={{
                            width: 20,
                            height: 20,
                            minWidth: 20,
                            borderRadius: 5,
                            border: `2px solid ${task.done ? "#C4956A" : "#D0C9C0"}`,
                            background: task.done ? "#C4956A" : "transparent",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.15s",
                            animation: task.done ? "checkPop 0.2s ease" : "none",
                          }}
                        >
                          {task.done && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>

                        {/* Title + meta */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{
                            fontSize: 14,
                            color: task.done ? "#B0A89C" : "#2C2825",
                            textDecoration: task.done ? "line-through" : "none",
                            lineHeight: 1.4,
                          }}>
                            {task.title}
                          </span>
                          <div className="task-meta" style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
                            {task.dueDate && (
                              <span style={{
                                fontSize: 11,
                                color: overdue ? "#D94F4F" : dueToday ? "#C4956A" : "#B0A89C",
                                fontWeight: overdue || dueToday ? 600 : 400,
                              }}>
                                {overdue ? "Overdue — " : dueToday ? "Today — " : ""}{formatDate(task.dueDate)}
                              </span>
                            )}
                            <span style={{
                              fontSize: 11,
                              padding: "1px 8px",
                              borderRadius: 10,
                              background: ac.bg,
                              color: ac.text,
                              border: `1px solid ${ac.border}`,
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                            }}>
                              {task.assignee}
                            </span>
                          </div>
                        </div>

                        {/* Delete */}
                        <button
                          className="delete-btn"
                          onClick={() => deleteTask(task.id)}
                          title="Delete task"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 4,
                            color: "#C8C0B5",
                            fontSize: 16,
                            lineHeight: 1,
                            transition: "color 0.15s",
                          }}
                          onMouseEnter={(e) => (e.target.style.color = "#D94F4F")}
                          onMouseLeave={(e) => (e.target.style.color = "#C8C0B5")}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Footer */}
        <div style={{
          textAlign: "center",
          paddingTop: 20,
          borderTop: "1px solid #EDE8E1",
          color: "#B0A89C",
          fontSize: 12,
        }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
          }}>
            <span style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: SYNC_INDICATOR[syncStatus].color,
              display: "inline-block",
            }} />
            {SYNC_INDICATOR[syncStatus].label}
          </span>
          {lastSaved && (
            <>
              <span style={{ margin: "0 8px" }}>·</span>
              <span>
                Saved {lastSaved.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
              </span>
            </>
          )}
          <span style={{ margin: "0 8px" }}>·</span>
          <span>The Feed — Internal Tools</span>
        </div>
      </div>
    </>
  );
}
