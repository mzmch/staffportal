document.addEventListener('DOMContentLoaded', function () {
  const menuLinks = document.querySelectorAll('.navbar-menu a[data-content]');
  const contentArea = document.querySelector('.content');
  const userEmailDisplay = document.getElementById('user-email-display');
  const logoutButton = document.getElementById('logout-btn');

  function loadContent(contentId) {
    let title = '';
    let content = '';

    switch (contentId) {
      case 'dashboard':
        title = 'Dashboard';
        content = '<p>This is the dashboard content.</p>';
        break;
      case 'leave-apply':
        title = 'Apply Leave';
        content = '<p>Content for applying leave.</p>';
        break;
      case 'leave-status':
        title = 'Leave Status';
        content = '<p>Your leave request status.</p>';
        break;
      case 'leave-history':
        title = 'Leave History';
        content = '<p>Past leave requests.</p>';
        break;
      case 'purchase-new':
        window.location.href = 'purchaserequest.html';
        return;
      case 'purchase-status':
        title = 'Purchase Request Status';
        content = '<p>Status of your purchase requests.</p>';
        break;
      case 'purchase-history':
        title = 'Purchase Request History';
        content = '<p>Past purchase requests.</p>';
        break;
      case 'service-new':
        title = 'New Service Request';
        content = '<p>Create a new service request.</p>';
        break;
      case 'service-status':
        title = 'Service Request Status';
        content = '<p>Status of your service requests.</p>';
        break;
      case 'service-history':
        title = 'Service Request History';
        content = '<p>Past service requests.</p>';
        break;
      default:
        title = 'Dashboard';
        content = '<p>This is the default dashboard content.</p>';
    }

    contentArea.innerHTML = `<h1>${title}</h1>${content}`;
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const contentId = this.getAttribute('data-content');
      loadContent(contentId);
    });
  });

  const loggedInUser = localStorage.getItem('user');
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    userEmailDisplay.textContent = `Logged in as: ${user.email}`;
  } else {
    window.location.href = 'index.html';
  }

  logoutButton.addEventListener('click', function () {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  });

  // Initial load
  loadContent('dashboard');
});
