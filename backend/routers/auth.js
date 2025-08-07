import express from "express";
import supabase from "../supabaseClient.js";
import supabaseRemover from "../supabaseService.js";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("Auth Endpoint Is Running!");
  console.log("Auth Endpoint was hit!");
});

authRouter.post("/sign-up", async (req, res) => {
  const { name, email, role, password } = req.body;

  if (!name || !email || !role || !password) {
    return res.status(400).json({ message: "Fill all the fields", status: 0 });
  }

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Sign-up error:", error);
      return res
        .status(401)
        .json({ message: "Error creating user", status: 0 });
    }

    console.log("Sign-up success for ID:", data);

    let userID = data.user.id;

    const { error: insertError } = await supabase
      .from("users")
      .insert({ name, role, email, userid: `${userID}` });

    if (insertError) {
      console.error("DB insert error:", insertError);
      return res.status(500).json({
        message: "Error inserting user data into DB",
        status: 0,
      });
    }

    return res
      .status(200)
      .json({ message: "User created!", info: data, status: 1 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ message: "Unexpected error", status: 0 });
  }
});

authRouter.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Fill all the fields", status: 0 });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign-in error:", error);
      return res.status(401).json({
        message: "Invalid email or password",
        status: 0,
      });
    }

    console.log("Sign-in success:", data);

    return res.status(200).json({
      message: "User signed in!",
      info: data,
      status: 1,
    });
  } catch (err) {
    console.error("Unexpected error during sign-in:", err);
    return res.status(500).json({
      message: "Unexpected server error",
      status: 0,
    });
  }
});

authRouter.post("/delete", async (req, res) => {
  const { id } = req.body;
  
  if (!id) {
    console.log("No User ID provided");
    return res.status(400).json({ message: "No ID was provided", status: 0 });
  }

  try {
    const { error: deleteUserError } = await supabase
      .from("users")
      .delete()
      .eq("userid", id);

    if (deleteUserError) {
      console.error(deleteUserError);
      return res
        .status(400)
        .json({ message: "Couldn't delete User data from DB", status: 0 });
    }

    const { error: removeUserError } =
      await supabaseRemover.auth.admin.deleteUser(id);

    if (removeUserError) {
      console.error(removeUserError);
      return res
        .status(400)
        .json({ message: "Couldn't remove User access from DB", status: 0 });
    }

    return res
      .status(200)
      .json({ message: "User removed successfully", status: 1 });
  } catch (error) {
    console.log("Something happened while removing user!");
    return res
        .status(400)
        .json({ message: "Network Error", status: 0 });
  }
});

export default authRouter;