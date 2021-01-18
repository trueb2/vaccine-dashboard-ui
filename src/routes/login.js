import fetch from "node-fetch";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  'Access-Control-Allow-Origin': '*',
};

export async function post(req, res) {
  try {
    const { email, password } = req.body;

    const result = await fetch(`http://localhost:6969/login`, {
        method: "POST",
        mode: 'cors',
        headers,
        body: JSON.stringify({ username: email, password }),
      });
  
      const parsed = await result.json();
  
      if (typeof parsed.error !== "undefined") {
        throw new Error(parsed.error);
      }
  
      req.session.token = parsed.token;
      res.end(JSON.stringify({ token: req.session.token }));
  } catch (error) {
    res.end(JSON.stringify({ error: error.message }));
  }
}
