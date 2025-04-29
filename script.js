const filename = window.location.pathname.split('/').pop();
document.getElementById('page-title').textContent = filename || 'Accueil';

