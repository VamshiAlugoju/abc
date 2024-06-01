console.log("hello");

async function login(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/bikes";
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("unknown errror");
  }
}
