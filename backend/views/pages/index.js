console.log("hello");

async function login(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  try {
    const url = "http://localhost:3000/login";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "./bikes.html";
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("unknown errror");
  }
}

async function signup(e) {
  console.log("fsldjf;dsjf;sdaljf;sl");
  e.preventDefault();
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  try {
    const url = "http://localhost:3000/signup";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "./bikes.html";
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("unknown errror");
  }
}
