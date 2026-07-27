/* ═══════════════════════════════════════════════════════════════
   WARISAN MALAYSIA — SHARED NAVIGATION BEHAVIOUR
   ---------------------------------------------------------------
   Handles the mobile hamburger menu, the mobile dropdown accordion,
   closing menus on an outside click, and automatically highlighting
   the link that points at the page you are currently viewing.

   Include on every page, just before </body>:
       <script src="NavFooter/navfooter.js"></script>
   ═══════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    function initNav() {
        var navToggle = document.getElementById('navToggle');
        var navLinksWrapper = document.getElementById('navLinks');
        var navMenuIcon = document.getElementById('navMenuIcon');

        /* ── Hamburger open / close ─────────────────── */
        if (navToggle && navLinksWrapper) {
            navToggle.addEventListener('click', function () {
                var isOpen = navToggle.classList.toggle('open');
                navLinksWrapper.classList.toggle('open', isOpen);
                navToggle.setAttribute('aria-expanded', String(isOpen));
                if (navMenuIcon) navMenuIcon.className = isOpen ? 'ph ph-x' : 'ph ph-list';
            });
        }

        /* ── Mobile dropdown accordion ──────────────── */
        document.querySelectorAll('.nav-item > .nav-link').forEach(function (link) {
            link.addEventListener('click', function (e) {
                if (window.innerWidth > 768) return;
                var item = link.closest('.nav-item');
                if (item && item.querySelector('.dropdown')) {
                    e.preventDefault();
                    /* Accordion: only one panel open at a time */
                    document.querySelectorAll('.nav-item').forEach(function (other) {
                        if (other !== item) other.classList.remove('open');
                    });
                    item.classList.toggle('open');
                }
            });
        });

        /* ── Close everything on an outside click ───── */
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.nav-item')) {
                document.querySelectorAll('.nav-item').forEach(function (item) {
                    item.classList.remove('open');
                });
            }
            if (!e.target.closest('.main-nav')) {
                if (navToggle) {
                    navToggle.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    if (navMenuIcon) navMenuIcon.className = 'ph ph-list';
                }
                if (navLinksWrapper) navLinksWrapper.classList.remove('open');
            }
        });

        /* ── Close the mobile menu with Escape ──────── */
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            document.querySelectorAll('.nav-item').forEach(function (item) {
                item.classList.remove('open');
            });
            if (navToggle) {
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                if (navMenuIcon) navMenuIcon.className = 'ph ph-list';
            }
            if (navLinksWrapper) navLinksWrapper.classList.remove('open');
        });

        highlightCurrentPage();
    }

    /* ── Mark the link pointing at this page as active ── */
    function highlightCurrentPage() {
        var file = decodeURIComponent(window.location.pathname.split('/').pop() || '');
        var current = (file || 'Homepage_Sw.html').toLowerCase();

        document.querySelectorAll('.nav-links-wrapper a[href]').forEach(function (link) {
            var href = link.getAttribute('href');
            if (!href || href.charAt(0) === '#') return;

            var target = href.split('#')[0].split('/').pop().toLowerCase();
            if (!target || target !== current) return;

            link.classList.add('active');
            var item = link.closest('.nav-item');
            if (item) {
                var parent = item.querySelector('.nav-link');
                if (parent) parent.classList.add('active');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }
})();
