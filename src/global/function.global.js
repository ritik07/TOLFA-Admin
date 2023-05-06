export const handleLogout = () => {
  localStorage.clear();
  sessionStorage.clear()
  window.location.reload();
};

// export const USER_ID = localStorage.getItem("user_id");
