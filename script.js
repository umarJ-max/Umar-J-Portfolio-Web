/* ============================================================
   UMAR J PORTFOLIO — script.js
   Fixed: smooth scroll, reveal observer, skill bars, nav, mailto
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ── 1. LOADING SCREEN ── */
    var loading = document.getElementById('loading');
    window.addEventListener('load', function () {
        setTimeout(function () {
            loading.classList.add('gone');
        }, 800);
    });

    /* ── 2. CUSTOM CURSOR ── */
    var cursor   = document.getElementById('cursor');
    var follower = document.getElementById('cursorFollower');
    if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
        var cx = 0, cy = 0;
        document.addEventListener('mousemove', function (e) {
            cx = e.clientX; cy = e.clientY;
            cursor.style.left = cx + 'px';
            cursor.style.top  = cy + 'px';
            follower.style.left = cx + 'px';
            follower.style.top  = cy + 'px';
        });
        document.querySelectorAll('a, button').forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                follower.style.transform = 'translate(-50%,-50%) scale(1.7)';
            });
            el.addEventListener('mouseleave', function () {
                follower.style.transform = 'translate(-50%,-50%) scale(1)';
            });
        });
    }

    /* ── 3. SMOOTH SCROLL ── */
    /* Handles all anchors with class "smooth-scroll" and plain href="#..." anchors */
    function smoothScrollTo(targetId) {
        var target = document.querySelector(targetId);
        if (!target) return;
        var offset = target.getBoundingClientRect().top + window.scrollY - 75;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    }

    document.querySelectorAll('a.smooth-scroll').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href);
                /* Close mobile menu if open */
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
            }
        });
    });

    /* ── 4. NAVIGATION ── */
    var nav      = document.getElementById('nav');
    var navToggle= document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    /* Close mobile menu on any nav-link click */
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    /* ── 5. SCROLL PROGRESS + NAV SOLID + ACTIVE LINK ── */
    var scrollBar = document.getElementById('scrollBar');
    var sections  = Array.from(document.querySelectorAll('section[id]'));
    var allNavLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));

    function onScroll() {
        var scrollTop    = window.scrollY;
        var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

        /* Scroll bar */
        if (scrollBar) {
            var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            scrollBar.style.width = pct + '%';
        }

        /* Solid nav */
        if (scrollTop > 50) {
            nav.classList.add('solid');
        } else {
            nav.classList.remove('solid');
        }

        /* Active nav link */
        var current = '';
        sections.forEach(function (sec) {
            if (scrollTop >= sec.offsetTop - 130) {
                current = sec.id;
            }
        });
        allNavLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            link.classList.toggle('active', href === '#' + current);
        });
    }

    var scrollTicking = false;
    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            requestAnimationFrame(function () {
                onScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });
    onScroll();

    /* ── 6. REVEAL ON SCROLL (IntersectionObserver) ── */
    /* We use IntersectionObserver so elements animate in as they scroll into view.
       The hero elements get shown immediately after load so the page isn't blank. */
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); /* Fire once only */
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
        revealObserver.observe(el);
    });

    /* Show hero reveals immediately so the hero is never blank on load */
    setTimeout(function () {
        document.querySelectorAll('.hero .reveal').forEach(function (el) {
            el.classList.add('visible');
        });
    }, 300);

    /* ── 7. SKILL BAR ANIMATION ── */
    var skillsDone = false;

    function animateSkillBars() {
        if (skillsDone) return;
        var bars = document.querySelectorAll('.skill-fill');
        var allVisible = true;
        bars.forEach(function (bar) {
            var rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 30) {
                bar.style.width = bar.getAttribute('data-width') + '%';
            } else {
                allVisible = false;
            }
        });
        if (allVisible) skillsDone = true;
    }

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();

    /* ── 8. DRIVE TOOL ── */
    window.openDriveTool = function () {
        window.open(
            'https://script.google.com/macros/s/AKfycbzVgsOWqUD28F0nsJsKYHN2WptsAZO2kX2H3Uo31uDPsXHvImsnn9-YqzG1_24mLslv/exec',
            '_blank',
            'noopener,noreferrer'
        );
    };

    /* ── 9. CLOSE MOBILE MENU ON RESIZE ── */
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        }
    });

});
