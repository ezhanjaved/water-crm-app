import { useState } from "react"

export default function Insert({ setInsert, allowed }) {
    const [mode, setMode] = useState('insert');
    const [picked, setPicked] = useState('customers');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [product_name, setPD] = useState('');
    const [expiry, setExpiry] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [amount, setAmount] = useState(0);
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState(null);
    const [id, setID] = useState(null);

    const sendData = async (e, number) => {
        e.preventDefault();

        let insert = {};
        if (number === 1) {
            insert = { name, role, email, number };
        } else if (number === 2) {
            insert = { name, company, number };
        } else if (number == 3) {
            insert = { product_name, company, expiry, number }
        } else if (number == 4) {
            insert = { product_name, quantity, amount, expiry, number }
        } else if (number == 5) {
            insert = { product_name, company, quantity, amount, expiry, date, number }
        } else if (number == 6) {
            insert = { product_name, company, quantity, amount, expiry, number }
        } else if (number == 7) {
            insert = { product_name, company, customer, quantity, amount, date, number }
        }

        try {
            setLoading(true);
            const response = await fetch(
                'http://localhost:3000/router/insert',
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(insert),
                }
            );

            const result = await response.json();
            console.log("Result:", result);
        } catch (error) {
            console.error("Error sending data:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateData = async (e) => {
        e.preventDefault();

        let update = {};
        if (picked == 'users') {
            update = { id, name, role, email, number: 1 };
        } else if (picked == 'customers') {
            update = { id, name, company, number: 2 };
        } else if (picked == 'products') {
            update = { id, product_name, company, expiry, number: 3 }
        } else if (picked == 'sales') {
            update = { id, product_name, quantity, amount, expiry, number: 4 }
        } else if (picked == 'purchase') {
            update = { id, product_name, company, quantity, amount, expiry, date, number: 5 }
        } else if (picked == 'inventory') {
            update = { id, product_name, company, quantity, amount, expiry, number: 6 }
        } else if (picked == 'invoice') {
            update = { id, product_name, company, customer, quantity, amount, date, number: 7 }
        }

        try {
            setLoading(true);
            const response = await fetch(
                'http://localhost:3000/router/update',
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(update),
                }
            );

            const result = await response.json();
            console.log("Result:", result);
        } catch (error) {
            console.error("Error sending data:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteData = async (e) => {
        e.preventDefault();

        let del = {};
        if (picked == 'users') {
            del = { id, number: 1 };
        } else if (picked == 'customers') {
            del = { id, number: 2 };
        } else if (picked == 'products') {
            del = { id, number: 3 }
        } else if (picked == 'sales') {
            del = { id, number: 4 }
        } else if (picked == 'purchase') {
            del = { id, number: 5 }
        } else if (picked == 'inventory') {
            del = { id, number: 6 }
        } else if (picked == 'invoice') {
            del = { id, number: 7 }
        }

        try {
            setLoading(true);
            const response = await fetch(
                'http://localhost:3000/router/delete',
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(del),
                }
            );

            const result = await response.json();
            console.log("Result:", result);
        } catch (error) {
            console.error("Error sending data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!allowed && (
                <div className="alert-div">
                    <span>You are not allowed to make changes!</span>
                    <button onClick={() => setInsert(false)}>Go Back</button>
                </div>
            )}

            {mode === 'insert' ? (
                <h2>Insert Data</h2>
            ) : mode === 'update' ? (
                <h2>Update Data</h2>
            ) : (
                <h2>Delete Data</h2>
            )}

            <select className="select-in" name="table" id="table" onChange={(e) => setPicked(e.target.value)}>
                <option value="customers">Customers</option>
                <option value="products">Products</option>
                <option value="sales">Sales</option>
                <option value="purchase">Purchase</option>
                <option value="inventory">Inventory</option>
                <option value="invoice">Invoice</option>
            </select>

            <select className="select-in" name="table" id="table" onChange={(e) => setMode(e.target.value)}>
                <option value="insert">Insert Mode</option>
                <option value="update">Update Mode</option>
                <option value="delete">Delete Mode</option>
            </select>

            {mode === 'update' && (
                <>
                    <form className="form-in" onSubmit={(e) => updateData(e)}>
                        <label>ID (Update): </label>
                        <input type="text" value={id} onChange={(e) => setID(e.target.value)} />
                        <button disabled={!allowed} type="submit">Update</button>
                    </form>
                </>
            )}

            {mode === 'delete' && (
                <>
                    <form className="form-in" onSubmit={(e) => deleteData(e)}>
                        <label>ID (Delete): </label>
                        <input type="text" value={id} onChange={(e) => setID(e.target.value)} />
                        <button disabled={!allowed} type="submit">Delete</button>
                    </form>
                </>
            )}

            {picked === 'users' && (
                <>
                    <form className="form-in" onSubmit={(e) => sendData(e, 1)}>
                        <label>Name: </label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <label>Role: </label>
                        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
                        <label>Email: </label>
                        <input type="text" value={role} onChange={(e) => setEmail(e.target.value)} />
                        <button disabled={mode != 'insert' || !allowed} type="submit">Submit</button>
                    </form>
                    <span className="span-al">IT'S NOT RECOMMANDED TO INSERT/DELETE USER FROM HERE. USE SIGN UP PAGE FOR CREATING/INSERTING USER!</span>
                </>
            )}

            {picked === 'customers' && (
                <form className="form-in" onSubmit={(e) => sendData(e, 2)}>
                    <label>Name: </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <label>Company: </label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                    <button disabled={mode != 'insert' || !allowed} type="submit">Submit</button>
                </form>
            )}


            {picked === 'products' && (
                <form className="form-in" onSubmit={(e) => sendData(e, 3)}>
                    <label>Product Name: </label>
                    <input type="text" value={product_name} onChange={(e) => setPD(e.target.value)} />
                    <label>Company: </label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                    <label>Expiry: </label>
                    <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                    <button disabled={mode != 'insert' || !allowed} type="submit">Submit</button>
                </form>
            )}

            {picked === 'sales' && (
                <form className="form-in" onSubmit={(e) => sendData(e, 4)}>
                    <label>Product Name: </label>
                    <input type="text" value={product_name} onChange={(e) => setPD(e.target.value)} />
                    <label>Quantity: </label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <label>Amount(PKR): </label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <label>Expiry: </label>
                    <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                    <button disabled={mode != 'insert' || !allowed} type="submit">Submit</button>
                </form>
            )}

            {picked === 'purchase' && (
                <form className="form-in" onSubmit={(e) => sendData(e, 5)}>
                    <label>Product Name: </label>
                    <input type="text" value={product_name} onChange={(e) => setPD(e.target.value)} />
                    <label>Company: </label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                    <label>Quantity: </label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <label>Amount(PKR): </label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <label>Expiry: </label>
                    <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                    <label>Date Of Purchase: </label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <button disabled={mode != 'insert' || !allowed} type="submit">Submit</button>
                </form>
            )}

            {picked === 'inventory' && (
                <form className="form-in" onSubmit={(e) => sendData(e, 6)}>
                    <label>Product Name: </label>
                    <input type="text" value={product_name} onChange={(e) => setPD(e.target.value)} />
                    <label>Company: </label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                    <label>Stock: </label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <label>Amount(PKR): </label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <label>Expiry: </label>
                    <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                    <button disabled={mode != 'insert' || !allowed} type="submit">Submit</button>
                </form>
            )}

            {picked === 'invoice' && (
                <form className="form-in" onSubmit={(e) => sendData(e, 7)}>
                    <label>Product Name: </label>
                    <input type="text" value={product_name} onChange={(e) => setPD(e.target.value)} />
                    <label>Company: </label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                    <label>Customer/Agent Name: </label>
                    <input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} />
                    <label>Quantity: </label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <label>Amount(PKR): </label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <label>Date of Issue: </label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <button disabled={mode != 'insert' || !allowed} type="submit">Submit</button>
                </form>
            )}

            {loading && (
                <h2>WAIT...</h2>
            )}

        </>
    );
}
