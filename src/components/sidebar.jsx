export default function Sidebar({setTable, setInsert, initials}) {

    const logout = () => {
        localStorage.removeItem("session-data");
        window.location.reload();
    }

    return (
        <>
        <h2>{initials.toUpperCase()}</h2>
        <a onClick={() => {setTable('users'); setInsert(false);}}>User</a>
        <a onClick={() => {setTable('customers'); setInsert(false);}}>Customer</a>
        <a onClick={() => {setTable('products'); setInsert(false);}}>Products</a>
        <a onClick={() => {setTable('sales'); setInsert(false);}}>Sales</a>
        <a onClick={() => {setTable('purchase'); setInsert(false);}}>Purchase</a>
        <a onClick={() => {setTable('inventory'); setInsert(false);}}>Inventroy</a>
        <a onClick={() => {setTable('invoice'); setInsert(false);}}>Invoice</a>
        <button onClick={() => setInsert((prev) => !prev)}>Operations</button>
        <button onClick={() => logout()}>Logout</button>
        </>
    )
}