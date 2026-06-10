const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const inHtmlFolder = window.location.pathname.includes('/html/');
const assetPrefix = inHtmlFolder ? '../' : '';

function pageHref(page) {
  if (page === 'index.html') {
    return inHtmlFolder ? '../index.html' : 'index.html';
  }
  return inHtmlFolder ? page : `html/${page}`;
}

function fixPartialPaths(container) {
  container.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    link.setAttribute('href', pageHref(href.split('/').pop()));
  });

  container.querySelectorAll('a[data-local-page]').forEach(link => {
    link.setAttribute('href', pageHref(link.dataset.localPage));
  });

  container.querySelectorAll('img[src^="images/"]').forEach(img => {
    img.setAttribute('src', assetPrefix + img.getAttribute('src'));
  });
}

function loadPartial(id, file) {
  fetch(assetPrefix + file)
    .then(r => r.text())
    .then(html => {
      const container = document.getElementById(id);
      container.innerHTML = html;
      fixPartialPaths(container);

      if (id === 'navbar-placeholder') {
        const activePage = (currentPage === 'park-info.html') ? 'parks.html' : currentPage;

        document.querySelectorAll('.dog-navbar .nav-link[data-navlink]').forEach(link => {
          if (link.dataset.navlink === activePage) {
            link.classList.add('active');
          }
        });
      }
    });
}

loadPartial('navbar-placeholder', 'partials/navbar.html');
loadPartial('footer-placeholder', 'partials/footer.html');