// ---------- Dane przycisków demo (te same akcje co w prawdziwym panelu) ----------

var DEMO_BUTTONS = [
  { label: "text",   svg: '<path d="M4 6h16M12 6v14"/>' },
  { label: "solid",  svg: '<rect x="4" y="4" width="16" height="16" rx="1"/>' },
  { label: "light",  svg: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M22 12h-3M5 12H2M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12M19.07 19.07l-2.12-2.12M7.05 7.05L4.93 4.93"/>' },
  { label: "shape",  svg: '<path d="M12 3l9 18H3z"/>' },
  { label: "split",  svg: '<path d="M6 3l12 18M18 3L6 21"/>' },
  { label: "null",   svg: '<rect x="4" y="4" width="16" height="16" rx="1" stroke-dasharray="3 3"/>' },
  { label: "camera", svg: '<rect x="3" y="7" width="14" height="11" rx="1"/><path d="M17 10l4-2v8l-4-2"/>' },
  { label: "adj",    svg: '<path d="M5 4v16M12 4v16M19 4v16"/><circle cx="5" cy="9" r="1.6" fill="#dcd4e8"/><circle cx="12" cy="15" r="1.6" fill="#dcd4e8"/><circle cx="19" cy="11" r="1.6" fill="#dcd4e8"/>' },
  { label: "dup",    svg: '<rect x="3" y="7" width="12" height="12" rx="1"/><path d="M8 7V5a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-2"/>' },
  { label: "comp",   svg: '<rect x="4" y="4" width="16" height="4"/><rect x="4" y="10" width="16" height="4"/><rect x="4" y="16" width="16" height="4"/>' },
  { label: "in",     svg: '<path d="M6 3v18M9 12h9M14 8l4 4-4 4"/>' },
  { label: "out",    svg: '<path d="M18 3v18M15 12H6M10 8l-4 4 4 4"/>' }
];

function renderDemoGrid() {
  var grid = document.getElementById("demoGrid");
  if (!grid) return;

  var html = DEMO_BUTTONS.map(function (item) {
    return (
      '<div class="panel-btn">' +
        '<svg viewBox="0 0 24 24">' + item.svg + '</svg>' +
        '<span>' + item.label + '</span>' +
      '</div>'
    );
  }).join("");

  grid.innerHTML = html;
}

// ---------- Fade-in kart przy scrollu ----------

function initScrollReveal() {
  var cards = document.querySelectorAll(".feature-card");
  if (!cards.length) return;

  if (!("IntersectionObserver" in window)) {
    cards.forEach(function (c) { c.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach(function (card) { observer.observe(card); });
}

// ---------- Kopiowanie komendy terminala ----------

function initCopyButtons() {
  var buttons = document.querySelectorAll(".copy-btn");

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = btn.getAttribute("data-copy-target");
      var target = document.getElementById(targetId);
      if (!target) return;

      var text = target.textContent;

      function showCopied() {
        var original = btn.textContent;
        btn.textContent = "Skopiowano";
        btn.classList.add("is-copied");
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove("is-copied");
        }, 1600);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showCopied);
      } else {
        var helper = document.createElement("textarea");
        helper.value = text;
        document.body.appendChild(helper);
        helper.select();
        document.execCommand("copy");
        document.body.removeChild(helper);
        showCopied();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderDemoGrid();
  initScrollReveal();
  initCopyButtons();
});
