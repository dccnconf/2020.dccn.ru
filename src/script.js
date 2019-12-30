// 
const toggleCollapsingNav = function () {
  const menu = document.getElementById('navCollapsingMenu');
  menu.classList.toggle('hidden');
};

const collapseNav = function () {
  const cl = document.getElementById('navCollapsingMenu').classList;
  if (!cl.contains('hidden'))
    cl.add('hidden');
};

const handleNavClick = function (event) {
  const target = event.target;
  console.log('click at ', target);
  if (target.classList.contains('menu-item') || target.parentElement.classList.contains('menu-item')) {
    collapseNav();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('navbar').addEventListener('click', handleNavClick);
});
