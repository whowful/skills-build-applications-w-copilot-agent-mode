import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="app-shell">
      <header className="container py-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div>
                <h1 className="display-6 mb-1">OctoFit Tracker</h1>
                <p className="text-secondary mb-0">Fitness analytics dashboard powered by Django REST.</p>
              </div>
              <a
                className="btn btn-outline-primary"
                href="https://react.dev"
                target="_blank"
                rel="noreferrer"
              >
                React Docs
              </a>
            </div>

            <nav className="navbar navbar-expand-lg mt-4 rounded-3 bg-light border">
              <div className="container-fluid">
                <span className="navbar-brand fw-semibold">Navigation</span>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#octofitNav"
                  aria-controls="octofitNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="octofitNav">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {navItems.map((item) => (
                      <li key={item.to} className="nav-item">
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            `nav-link ${isActive ? 'active fw-semibold' : ''}`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="container pb-5">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
