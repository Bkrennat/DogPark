const currentPage = window.location.pathname.split('/').pop() || 'index.html';

function loadPartial(id, file) {
  fetch(file)
    .then(r => r.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (id === 'navbar-placeholder') {
        document.querySelectorAll('.dog-navbar .nav-link[data-navlink]').forEach(link => {
          if (link.dataset.navlink === currentPage) {
            link.classList.add('active');
          }
        });
      }
    });
}

loadPartial('navbar-placeholder', 'partials/navbar.html');
loadPartial('footer-placeholder', 'partials/footer.html');
