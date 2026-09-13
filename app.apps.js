/* Apps page client entry — hydrates the server-rendered app gallery. */
(function () {
  "use strict";
  var React = window.React, ReactDOM = window.ReactDOM;
  var FALLBACK = { memberCount: 0, apps: [] };

  function navigate(page) {
    var urls = { home: "index.html", apps: "apps.html", terms: "terms.html", links: "links.html" };
    window.location.href = urls[page] || "index.html";
  }

  function App() {
    var s = React.useState(window.__DATA__ || FALLBACK);
    var data = s[0], setData = s[1];

    React.useEffect(function () {
      fetch("data/apps.json")
        .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
        .then(function (d) { setData(d); })
        .catch(function () {});
    }, []);

    return React.createElement(
      React.Fragment, null,
      React.createElement(window.NavBar, { page: "apps", onNavigate: navigate }),
      React.createElement(window.AppsPage, { apps: data.apps, memberCount: data.memberCount }),
      React.createElement(window.Footer, { onNavigate: navigate })
    );
  }

  ReactDOM.hydrateRoot(document.getElementById("root"), React.createElement(App));
})();
