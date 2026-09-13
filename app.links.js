/* Links page client entry — hydrates the server-rendered link directory.
   window.__LINKS_FALLBACK__ is set inline (build-time) so LinksPage's initial
   state matches the server-rendered markup. */
(function () {
  "use strict";
  var React = window.React, ReactDOM = window.ReactDOM;

  function navigate(page) {
    var urls = { home: "index.html", apps: "apps.html", terms: "terms.html", links: "links.html" };
    window.location.href = urls[page] || "index.html";
  }

  function App() {
    return React.createElement(
      React.Fragment, null,
      React.createElement(window.NavBar, { page: "links", onNavigate: navigate }),
      React.createElement(window.LinksPage, { onNavigate: navigate }),
      React.createElement(window.Footer, { onNavigate: navigate })
    );
  }

  ReactDOM.hydrateRoot(document.getElementById("root"), React.createElement(App));
})();
