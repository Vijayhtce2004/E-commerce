import { getProfile } from "./user.js";

const darkToggle = document.getElementById("dark-toggle");
// const mobileDarkToggle = document.getElementById("mobile-dark-toggle");
const body = document.body;

if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
  darkToggle.textContent = "🌙";
  // mobileDarkToggle.textContent = "🌙";
}

darkToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDarkMode = body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
  // mobileDarkToggle.textContent = isDarkMode ? "🌙" : "🌙";
});

// mobileDarkToggle.addEventListener("click", () => {
//   body.classList.toggle("dark-mode");
//   const isDarkMode = body.classList.contains("dark-mode");
//   localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
//   mobileDarkToggle.textContent = isDarkMode ? "🌙" : "🌙";
// });

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeBtn = document.getElementById("close-btn");
const menu_overlay = document.getElementById("menu_overlay");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  menu_overlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  menu_overlay.classList.remove("active");
  document.body.style.overflow = "";
});

menu_overlay.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  menu_overlay.classList.remove("active");
  document.body.style.overflow = "";
});

const shopChevron = document.getElementById("shop-chevron");
const mobileMegaMenu = document.getElementById("mobile-mega-menu");

if (shopChevron) {
  shopChevron.addEventListener("click", (e) => {
    e.preventDefault();
    mobileMegaMenu.classList.toggle("active");
    shopChevron.classList.toggle("fa-chevron-down");
    shopChevron.classList.toggle("fa-chevron-up");
  });
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  alert("Logged out!");
});

export async function userNavbarHandler() {
  let user = "";
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    user = await getProfile();
  }
  const loginBtn = document.getElementById("loginBtn");
  const profileDropdown = document.getElementById("profileDropdown");
  const profileSection = document.getElementById("profileSection");
  const dropdownMenu = document.getElementById("dropdownMenu");
  if (user?.user?.name) {
    loginBtn.style.display = "none";
    profileDropdown.style.display = "block";
    profileSection.textContent = `${user?.user?.name.slice(0, 1)}`; // Amar
  } else {
    loginBtn.style.display = "block";
    profileDropdown.style.display = "none";
  }
  profileSection.addEventListener("click", () => {
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });
}
