import './App.css';
import React, { useEffect, useState } from 'react';
import AttendanceSheet from './components/AttendanceSheet';
import DataGridDemo from './components/DisplayAttendance';
import { Routes, Route, Link } from 'react-router-dom';


function App() {
  const [token, setToken] = useState(false);
  const [labClass, setlabClass] = useState('');

  useEffect(() => {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      setToken(true);
    }
  }, []);

  return (
    <Routes>
      <Route path="/user" element={< DataGridDemo />} />
      <Route path="/admin" element={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh',
            rowGap: '10px',
            width: '100%',
          }}
        >
          {
            !token ? (
              <>
                <input
                  style={{
                    width: '220px',
                    fontSize: '20px',
                    padding: '15px',
                    borderRadius: '5px',
                    border: '1px solid black',
                    marginBottom: '10px',
                  }}
                  type="password"
                  placeholder="Enter Password"
                />
                <div
                  onClick={() => {
                    const password = document.querySelector('input').value;
                    fetch('/attendance/api/check-password', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ password }),
                    })
                      .then((response) => {
                        response.json().then((data) => {
                          console.log(data);
                          if (data.token) {
                            console.log(data.token);
                            localStorage.setItem('token', data.token);
                            setToken(true);
                          }
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                  className="btn-2"
                >
                  <span>Submit!</span>
                </div>
              </>
            ) : labClass && labClass.length > 0 ? (
              <AttendanceSheet
                labClass={labClass}
                changeRoute={(data) => {
                  setlabClass(data);
                }}
                logout={setToken}
              />
            ) : (
              <>
                <button
                  className="glow-on-hover"
                  type="button"
                  onClick={(e) => {
                    setlabClass(e.target.innerText);
                  }}
                >
                  CSE231L.07
                </button>
                <button
                  className="glow-on-hover"
                  type="button"
                  onClick={(e) => {
                    setlabClass(e.target.innerText);
                  }}
                >
                  CSE332L.01
                </button>
                <button
                  className="glow-on-hover"
                  type="button"
                  onClick={(e) => {
                    setlabClass(e.target.innerText);
                  }}
                >
                  CSE332L.03
                </button>
                <button
                  className="glow-on-hover"
                  type="button"
                  onClick={(e) => {
                    setlabClass(e.target.innerText);
                  }}
                >
                  CSE332L.06
                </button>
                <div
                  onClick={() => {
                    localStorage.removeItem('token');
                    setToken(false);
                  }}
                  className="btn-2"
                >
                  <span>Sign Out!</span>
                </div>
              </>
            )
          }
        </div>
      } />
      <Route path="/" element={
        <>
          <nav>
            <ul>
              <li>
                <Link to="/user">User</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            </ul>
          </nav>
        </>}
      />
    </Routes>
  );
}

export default App;
