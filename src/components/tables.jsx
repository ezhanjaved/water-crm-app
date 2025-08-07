import { useState, useEffect } from "react";
import '../App.css';

export default function Tables({ table, allowed, loggedID }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);
    const [userID, setUserID] = useState(null);
    const [del, setDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(null);
                setLoading(true);
                setError(false);
                console.log("Table: " + table);
                const response = await fetch(`http://localhost:3000/router/fetch`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ table }),
                });

                const result = await response.json();
                setData(result.results);
                console.log("Data we got: " + data);
            } catch (err) {
                console.error("An error occurred while fetching data from DB", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [table]);

    const deleteUser = async (e) => {
        e.preventDefault();

        if (!userID && !allowed) {
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/auth/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: userID })
            })

            const result = await response.json()
            if (result.status == 1) {
                console.log("User is deleted");
                setDelete(true);
                if (loggedID === userID) {
                      localStorage.removeItem("session-data");
                      window.location.reload();
                }
            }
        } catch (error) {
            console.log("Something happened!")
        }
    }

    return (
        <>
            <h2>{table} table</h2>

            {loading && <h3>Your data is getting fetched...</h3>}
            {error && data === null && <h3>Something went wrong while fetching the data.</h3>}
            {!loading && data && data.length > 0 && table === 'users' && (
                <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Created At</th>
                            <th>USER ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{new Date(row.created_at).toLocaleString()}</td>
                                <td>{row.userid}</td>
                                <td>{row.name}</td>
                                <td>{row.role}</td>
                                <td>{row.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!loading && data && data.length > 0 && table === 'users' && allowed && (
                <>
                    <h2>delete user</h2>
                    <form className="form-in" onSubmit={(e) => deleteUser(e)}>
                        <label>Enter User ID</label> <br />
                        <input value={userID} type="text" onChange={(e) => setUserID(e.target.value)} />
                        <button type="submit">Submit</button>
                    </form>
                </>
            )}

            {del && (
                <div className="alert-div">
                    <span>User has been removed</span>
                    <button onClick={() => setDelete(false)}>Okay</button>
                </div>
            )}

            {!loading && data && data.length > 0 && table === 'customers' && (
                <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Created At</th>
                            <th>Name</th>
                            <th>Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{new Date(row.created_at).toLocaleString()}</td>
                                <td>{row.name}</td>
                                <td>{row.company}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!loading && data && data.length > 0 && table === 'products' && (
                <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Created At</th>
                            <th>Product Name</th>
                            <th>Company</th>
                            <th>Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{new Date(row.created_at).toLocaleString()}</td>
                                <td>{row.product_name}</td>
                                <td>{row.company}</td>
                                <td>{row.expiry}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!loading && data && data.length > 0 && table === 'sales' && (
                <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Created At</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Expiry Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{new Date(row.created_at).toLocaleString()}</td>
                                <td>{row.product_name}</td>
                                <td>{row.quantity}</td>
                                <td>{row.expiry}</td>
                                <td>{row.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}


            {!loading && data && data.length > 0 && table === 'purchase' && (
                <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Created At</th>
                            <th>Product Name</th>
                            <th>Company</th>
                            <th>Quantity</th>
                            <th>Expiry Date</th>
                            <th>Amount</th>
                            <th>Date Of Purchase</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{new Date(row.created_at).toLocaleString()}</td>
                                <td>{row.product_name}</td>
                                <td>{row.company}</td>
                                <td>{row.quantity}</td>
                                <td>{row.expiry}</td>
                                <td>{row.amount}</td>
                                <td>{row.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!loading && data && data.length > 0 && table === 'inventory' && (
                <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Created At</th>
                            <th>Product Name</th>
                            <th>Company</th>
                            <th>Stock</th>
                            <th>Expiry Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{new Date(row.created_at).toLocaleString()}</td>
                                <td>{row.product_name}</td>
                                <td>{row.company}</td>
                                <td>{row.stock}</td>
                                <td>{row.expiry}</td>
                                <td>{row.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!loading && data && data.length > 0 && table === 'invoice' && (
                <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Created At</th>
                            <th>Product Name</th>
                            <th>Company</th>
                            <th>Customer</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Date of Issue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{new Date(row.created_at).toLocaleString()}</td>
                                <td>{row.product_name}</td>
                                <td>{row.company}</td>
                                <td>{row.customer}</td>
                                <td>{row.quantity}</td>
                                <td>{row.amount}</td>
                                <td>{row.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!loading && data && data.length === 0 && <p>No records found.</p>}

        </>
    );
}