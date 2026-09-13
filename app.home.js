/* Home page client entry — hydrates the server-rendered markup.
   Mirrors the SSR composition in build.mjs exactly so hydration is clean. */
(function () {
  "use strict";
  var React = window.React, ReactDOM = window.ReactDOM;
  var FALLBACK = { memberCount: 0, apps: [] };

  function navigate(page) {
    var urls = { home: "index.html", apps: "apps.html", terms: "terms.html", links: "links.html" };
    window.location.href = urls[page] || "index.html";
  }

  function useReveal(dep) {
    React.useEffect(function () {
      var els = document.querySelectorAll(".reveal:not(.is-visible)");
      if (!("IntersectionObserver" in window) || els.length === 0) {
        els.forEach(function (e) { e.classList.add("is-visible"); });
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      els.forEach(function (e) { io.observe(e); });
      return function () { io.disconnect(); };
    }, [dep]);
  }

  function App() {
    var s = React.useState(window.__DATA__ || FALLBACK);
    var data = s[0], setData = s[1];

    React.useEffect(function () {
      // Refresh with the latest data after hydration (apps.json updates daily).
      fetch("data/apps.json")
        .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
        .then(function (d) { setData(d); })
        .catch(function () {});
    }, []);

    useReveal(data.apps.length);

    return React.createElement(
      React.Fragment, null,
      React.createElement(window.NavBar, { page: "home", onNavigate: navigate }),
      React.createElement(
        "main", null,
        React.createElement(window.Hero, { memberCount: data.memberCount, appCount: data.apps.length, onNavigate: navigate }),
        React.createElement(window.AppMarquee, { apps: data.apps }),
        React.createElement(window.Philosophy, null),
        React.createElement(window.Benefits, { onNavigate: navigate }),
        React.createElement(window.FAQ, null)
      ),
      React.createElement(window.Footer, { onNavigate: navigate })
    );
  }

  ReactDOM.hydrateRoot(document.getElementById("root"), React.createElement(App));
})();
