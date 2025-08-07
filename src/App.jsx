import { useEffect, useState } from 'react';
import Login from './components/login';
import Sidebar from './components/sidebar';
import Tables from './components/tables';
import Insert from './components/insert';

function App() {
  const [table, setTable] = useState('customers');
  const [insert, setInsert] = useState(false);
  const [session, setSession] = useState(null);
  const [allowed, setAllowed] = useState(false);
  const [initials, setInitials] = useState('EJ');
  const [loggedID, setLoggedID] = useState(null);

  const getConfirmation = async (email) => {
    console.log("Confirmation Checking...");
    console.log("Email: " + email);
    try {
      const response = await fetch("https://water-crm-app.onrender.com/router/confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      console.log("Confirmation Result: " + result.status);
      console.log("Confirmation Message: " + result.message);
      return result.status;
    } catch (error) {
      console.log("An error occured!");
      return 0;
    }
  }

  useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("session-data"));
      if (userData) {
        console.log("Session Data found!");
        setSession(userData);
        setLoggedID(userData.user.id);
        let ini = userData.user.email;
        setInitials(ini.substring(0, 2));  
      }
      console.log("No Session Data found!");
    }, [])

   const userCheck = async () => {
     const userData = JSON.parse(localStorage.getItem("session-data"));
     const status = await getConfirmation(userData.user.email);
        if (status == 1) {
          console.log("User is Allowed");
          setAllowed(true);
        }
   }

  useEffect(() => {
    if (!allowed) {
      userCheck();
    }
  }, [insert, table])

  return (
    <>
      {!session ? (
        <Login setSession={setSession} />
      ) : (
        <section id="main-canvas">
          <div className='sidebar'>
            <Sidebar setTable={setTable} setInsert={setInsert} initials={initials} />
          </div>
          <div className='main-bar'>
            {insert === false ? <Tables table={table} allowed={allowed} loggedID={loggedID} /> : <Insert setInsert={setInsert} allowed={allowed} />}
          </div>
        </section>
      )}
    </>
  );
}

export default App;