import fetch from "node-fetch";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function post(req, res) {
  try {
    const { email, password } = req.body;

     const result = await fetch(`https://jsonplaceholder.typicode.com/users?email=${email}`, {
      method: "GET", // "POST",
    //   headers,
    //   body: JSON.stringify({ email, password }),
    });

    const parsed = await result.json();

    if (typeof parsed.error !== "undefined") {
      throw new Error(parsed.error);
    }

    req.session.token = parsed[0].username; // parsed.token;
    res.end(JSON.stringify({ token: req.session.token }));
  } catch (error) {
    res.end(JSON.stringify({ error: error.message }));
  }
}
