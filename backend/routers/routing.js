import express from 'express';
import supabase from '../supabaseClient.js';

const myrouter = express.Router();

myrouter.get("/hello", (req, res) => {
    res.send("Hello Router Connected!");
})

myrouter.post("/fetch", async (req, res) => {
    const { table } = req.body;
    console.log("Table: " + table);
    const { data, error } = await supabase.from(`${table}`).select();

    if (error) {
        console.error("Something happened:", error.message);
        return res.status(401).json({ message: "ERROR" });
    }
    console.log("Data: " + data);
    res.status(200).json({ message: "SUCCESS", results: data });
});

myrouter.post("/insert", async (req, res) => {
    const { name, role, email, company, product_name, expiry, quantity, amount, customer, date, number } = req.body;

    try {
        if (number === 1) {
            const { error } = await supabase
                .from('users')
                .insert({ name, email, role });

            if (error) {
                console.error("Insert error (users):", error);
                return res.status(500).json({ message: "Insert failed for users", error });
            }
        } else if(number === 2) {
            const { error } = await supabase
                .from('customers')
                .insert({ name, company });

            if (error) {
                console.error("Insert error (customers):", error);
                return res.status(500).json({ message: "Insert failed for customers", error });
            }
        } else if(number === 3) {
            const { error } = await supabase
                .from('products')
                .insert({ product_name, company, expiry });

            if (error) {
                console.error("Insert error (products):", error);
                return res.status(500).json({ message: "Insert failed for products", error });
            }
        } else if (number === 4) {
            const { error } = await supabase
                .from('sales')
                .insert({ product_name, quantity, amount, expiry });

            if (error) {
                console.error("Insert error (sales):", error);
                return res.status(500).json({ message: "Insert failed for sales", error });
            }
        } else if (number === 5) {
            const { error } = await supabase
                .from('purchase')
                .insert({ product_name, company, quantity, amount, expiry, date });

            if (error) {
                console.error("Insert error (purchase):", error);
                return res.status(500).json({ message: "Insert failed for purchase", error });
            }
        } else if (number === 6) {
            let stock = quantity;
            const { error } = await supabase
                .from('inventory')
                .insert({ product_name, company, stock, amount, expiry });

            if (error) {
                console.error("Insert error (inventory):", error);
                return res.status(500).json({ message: "Insert failed for inventory", error });
            }
        } else if (number === 7) {
            const { error } = await supabase
                .from('invoice')
                .insert({ product_name, company, customer, quantity, amount, date });

            if (error) {
                console.error("Insert error (invoice):", error);
                return res.status(500).json({ message: "Insert failed for invoice", error });
            }
        }

        console.log("Insert successful for number:", number);
        res.status(200).json({ message: "SUCCESS" });

    } catch (err) {
        console.error("Unexpected server error:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
});

myrouter.post("/update", async (req, res) => {
    const { id, name, role, email, company, product_name, expiry, quantity, amount, customer, date, number } = req.body;

    try {
        if (number === 1) {
            const { error } = await supabase
                .from('users')
                .update({ name: `${name}`, role: `${role}`, email: `${email}`})
                .eq('id', id);

            if (error) {
                console.error("Update error (users):", error);
                return res.status(500).json({ message: "Update failed for users", error });
            }
        } else if(number === 2) {
            const { error } = await supabase
                .from('customers')
                .update({ name: `${name}`, company: `${company}` })
                .eq('id', id);

            if (error) {
                console.error("Update error (customers):", error);
                return res.status(500).json({ message: "Update failed for customers", error });
            }
        } else if(number === 3) {
            const { error } = await supabase
                .from('products')
                .update({ product_name: `${product_name}`, company: `${company}`, expiry: `${expiry}` })
                .eq('id', id);

            if (error) {
                console.error("Update error (products):", error);
                return res.status(500).json({ message: "Update failed for products", error });
            }
        } else if (number === 4) {
            const { error } = await supabase
                .from('sales')
                .update({ product_name: `${product_name}`, quantity: `${quantity}`, amount: `${amount}`, expiry: `${expiry}` })
                .eq('id', id);

            if (error) {
                console.error("Update error (sales):", error);
                return res.status(500).json({ message: "Update failed for sales", error });
            }
        } else if (number === 5) {
            const { error } = await supabase
                .from('purchase')
                .update({ product_name: `${product_name}`, company: `${company}`, quantity: `${quantity}`, amount: `${amount}`, expiry: `${expiry}`, date: `${date}` })
                .eq('id', id);

            if (error) {
                console.error("Update error (purchase):", error);
                return res.status(500).json({ message: "Update failed for purchase", error });
            }
        } else if (number === 6) {
            let stock = quantity;
            const { error } = await supabase
                .from('inventory')
                .update({ product_name: `${product_name}`, company: `${company}`, stock: `${stock}`, amount: `${amount}`, expiry: `${expiry}` })
                .eq('id', id);

            if (error) {
                console.error("Update error (inventory):", error);
                return res.status(500).json({ message: "Update failed for inventory", error });
            }
        } else if (number === 7) {
            const { error } = await supabase
                .from('invoice')
                .update({ product_name: `${product_name}`, company: `${company}`, customer: `${customer}`, quantity: `${quantity}`, amount: `${amount}`, date: `${date}` })
                .eq('id', id);

            if (error) {
                console.error("Update error (invoice):", error);
                return res.status(500).json({ message: "Update failed for invoice", error });
            }
        }

        console.log("Update successful for number:", number);
        res.status(200).json({ message: "SUCCESS" });

    } catch (err) {
        console.error("Unexpected server error:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
});

myrouter.post("/delete", async (req, res) => {
    const { id, number } = req.body;

    try {
        if (number === 1) {
            const { error } = await supabase
                .from('users')
                .delete()
                .eq('id', Number(id));

            if (error) {
                console.error("Delete error (users):", error);
                return res.status(500).json({ message: "Delete failed for users", error });
            }
        } else if(number === 2) {
            const { error } = await supabase
                .from('customers')
                .delete()
                .eq('id', Number(id));

            if (error) {
                console.error("Delete error (customers):", error);
                return res.status(500).json({ message: "Delete failed for customers", error });
            }
        } else if(number === 3) {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', Number(id));

            if (error) {
                console.error("Delete error (products):", error);
                return res.status(500).json({ message: "Delete failed for products", error });
            }
        } else if (number === 4) {
            const { error } = await supabase
                .from('sales')
                .delete()
                .eq('id', Number(id));

            if (error) {
                console.error("Delete error (sales):", error);
                return res.status(500).json({ message: "Delete failed for sales", error });
            }
        } else if (number === 5) {
            const { error } = await supabase
                .from('purchase')
                .delete()
                .eq('id', Number(id));

            if (error) {
                console.error("Delete error (purchase):", error);
                return res.status(500).json({ message: "Delete failed for purchase", error });
            }
        } else if (number === 6) {
            const { error } = await supabase
                .from('inventory')
                .delete()
                .eq('id', Number(id));

            if (error) {
                console.error("Delete error (inventory):", error);
                return res.status(500).json({ message: "Delete failed for inventory", error });
            }
        } else if (number === 7) {
            const { error } = await supabase
                .from('invoice')
                .delete()
                .eq('id', Number(id));

            if (error) {
                console.error("Delete error (invoice):", error);
                return res.status(500).json({ message: "Delete failed for invoice", error });
            }
        }

        console.log("Delete successful for number:", number);
        res.status(200).json({ message: "SUCCESS" });

    } catch (err) {
        console.error("Unexpected server error:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
});

myrouter.post("/confirmation", async (req, res) => {
    const {email} = req.body;

    if (!email) {
        return res.status(400).json({message: "Email not provided", status: 0});
    }

    const {data, error} = await supabase.from('users').select('role').eq('email', email).single();

    if (error) {
        return res.status(400).json({message: "An error occured while fetching data", status: 0});
    }

    console.log("Role: " + data.role);

    let status = 0

    if (data.role === "Admin") {
        status = 1
    }

    return res.status(200).json({message: "Role is fetched", status});
})

export default myrouter;