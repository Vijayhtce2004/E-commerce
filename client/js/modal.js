function renderAuthModal() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "authModal";
  modal.innerHTML = `
  <div class="modal-content">
      <span class="close-btn" id="closeModal">&times;</span>
      <div class="tab-buttons">
        <button class="tab-btn active" data-tab="login">Login</button>
        <button class="tab-btn" data-tab="register">Register</button>
      </div>
      <form class="form-tab active" id="loginForm">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <form class="form-tab" id="registerForm">
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  initAuthModal();
}
function initAuthModal() {
  const modal = document.getElementById("authModal");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  document.getElementById("closeModal").onclick = () =>
    modal.classList.remove("show");

  window.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("show");
  };

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      document
        .querySelectorAll(".form-tab")
        .forEach((f) => f.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab + "Form").classList.add("active");
    });
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    console.log("user data :", email, password);
    await loginUser({ email, password });
    modal.classList.remove("show");
    window.location.reload();
  });
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    console.log("user data :", name, email, password);
    await registerUser({ name, email, password });
    modal.classList.remove("show");
    window.location.reload();
  });
}

function openAuthModal() {
  document.getElementById("authModal").classList.add("show");
  //   modal.classList.add("show"); // there is error
}

const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (data.success) {
      if (data.token) {
        localStorage.setItem("token", JSON.stringify(data.token));
        alert(data.message);
      } else {
        alert(data.message || "Register failed");
      }
    } else {
      alert(data.message || "Register failed");
    }
  } catch (error) {
    console.log(error);
  }
};
const loginUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (data.success) {
      if (data.token) {
        localStorage.setItem("token", JSON.stringify(data.token));
        alert(data.message);
      } else {
        alert(data.message || "Login failed");
      }
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.log(error);
  }
};
