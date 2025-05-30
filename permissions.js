// Function to check if the user info label has been populated
function waitForUserInfo() {
  const userEmailLabel = document.getElementById('user-email-display');
  
  if (userEmailLabel && userEmailLabel.textContent) {
    // If the label has email text, proceed to check permissions
    const email = userEmailLabel.textContent.trim();
    if (email) {
      fetchPermissions(email);
    }
  } else {
    // If the label is empty or not populated, retry after 500ms
    setTimeout(waitForUserInfo, 500);
  }
}

// Function to fetch permissions
function fetchPermissions(email) {
  const apiUrl = `https://script.google.com/macros/s/AKfycbwTdFk8jDaPanN7LF26U3rnbmZ30_lCP0eSiTpE5LZ5nfiWYN5U_y_d7Hv0jkjhgzB4jg/exec?mode=permissions&email=${email}`;

  // Fetch permissions from the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Handle the response here
      if (data.allowedMenus) {
        console.log("Allowed Menus:", data.allowedMenus);
        // Show/hide menu items based on permissions
        toggleMenuVisibility(data.allowedMenus);
      } else {
        console.log("No permissions found for this user.");
      }
    })
    .catch(error => {
      console.error("Error fetching permissions:", error);
    });
}

// Function to toggle menu visibility based on allowed menus
function toggleMenuVisibility(allowedMenus) {
  const adminSubmenu = document.querySelector('.admin-submenu');
  const submenuItems = adminSubmenu.querySelectorAll('.submenu-item');

  let hasVisibleItem = false; // Track if at least one submenu should be visible

  submenuItems.forEach(item => {
    const menuId = item.id;

    if (allowedMenus.includes(menuId)) {
      item.style.display = 'block';  // Show if allowed
      hasVisibleItem = true;
    } else {
      item.style.display = 'none';   // Hide if not allowed
    }
  });

  // Show admin main menu's submenu only if at least one child is allowed
  if (hasVisibleItem) {
    adminSubmenu.style.display = 'block';
  } else {
    adminSubmenu.style.display = 'none';
  }
}



// Wait for the user email to be populated in the label
waitForUserInfo();
