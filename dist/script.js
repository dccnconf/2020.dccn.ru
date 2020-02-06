"use strict";

// 
var toggleCollapsingNav = function toggleCollapsingNav() {
  var menu = document.getElementById('navCollapsingMenu');
  menu.classList.toggle('hidden');
};

var collapseNav = function collapseNav() {
  var cl = document.getElementById('navCollapsingMenu').classList;
  if (!cl.contains('hidden')) cl.add('hidden');
};

var handleNavClick = function handleNavClick(event) {
  var target = event.target;
  console.log('click at ', target);

  if (target.classList.contains('menu-item') || target.parentElement.classList.contains('menu-item')) {
    collapseNav();
  }
};

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('navbar').addEventListener('click', handleNavClick);
});
//# sourceMappingURL=script.js.map
