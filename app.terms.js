/* Terms page client entry — hydrates the server-rendered terms document.
   window.__TERMS_MD__ is set inline (build-time) so TermsPage's initial state
   matches the server-rendered markup. */
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
      React.createElement(window.NavBar, { page: "terms", onNavigate: navigate }),
      React.createElement(window.TermsPage, null),
      React.createElement(window.Footer, { onNavigate: navigate })
    );
  }

  ReactDOM.hydrateRoot(document.getElementById("root"), React.createElement(App));
})();
