import fetch from "node-fetch";

export async function get(req, res) {
  try {
    const result = await fetch(`http://localhost:6969/districts/summary`, {
        method: "GET",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${req.session.token}`,
        },
      });
  
      const parsed = await result.json();
  
      if (typeof parsed.error !== "undefined") {
        throw new Error(parsed.error);
      }
  
      res.end(JSON.stringify(parsed));
  } catch (error) {
    res.end(JSON.stringify({ error: error.message }));
  }
}