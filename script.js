/* ============================================================
   UMAR J PORTFOLIO — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ── 1. LOADING ── */
    var loading = document.getElementById('loading');
    window.addEventListener('load', function () {
        setTimeout(function () { loading.classList.add('gone'); }, 750);
    });

    /* ── 2. CUSTOM CURSOR (desktop only) ── */
    var cursor   = document.getElementById('cursor');
    var follower = document.getElementById('cursorFollower');
    if (cursor && follower && window.matchMedia('(pointer:fine)').matches) {
        document.addEventListener('mousemove', function (e) {
            cursor.style.left   = e.clientX + 'px';
            cursor.style.top    = e.clientY + 'px';
            follower.style.left = e.clientX + 'px';
            follower.style.top  = e.clientY + 'px';
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

    /* ── 3. SMOOTH SCROLL ──
       Works for all anchors with class "smooth-scroll".
       mailto: links are intentionally skipped so email works on PC.
    ── */
    function scrollToId(id) {
        var el = document.getElementById(id);
        if (!el) return;
        var top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: top, behavior: 'smooth' });
    }

    document.querySelectorAll('a.smooth-scroll').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var href = this.getAttribute('href') || '';
            /* Only intercept anchor links, not mailto: or external */
            if (href.charAt(0) !== '#') return;
            e.preventDefault();
            var id = href.slice(1);
            scrollToId(id);
            /* Close mobile menu if open */
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
        });
    });

    /* ── 4. NAV — mobile toggle ── */
    var nav      = document.getElementById('nav');
    var navToggle= document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    /* Close menu on any nav-link click */
    navLinks.querySelectorAll('.nav-link, .nav-cta').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 520) {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        }
    });

    /* ── 5. SCROLL PROGRESS + SOLID NAV + ACTIVE LINK ── */
    var scrollBar   = document.getElementById('scrollBar');
    var sections    = Array.from(document.querySelectorAll('section[id]'));
    var navLinkEls  = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));

    function onScroll() {
        var scrollTop    = window.scrollY;
        var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

        /* Progress bar */
        if (scrollBar) scrollBar.style.width = (scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0) + '%';

        /* Solid nav background */
        nav.classList.toggle('solid', scrollTop > 50);

        /* Active nav link */
        var current = '';
        sections.forEach(function (s) {
            if (scrollTop >= s.offsetTop - 130) current = s.id;
        });
        navLinkEls.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + current);
        });

        /* Skill bars */
        animateSkills();
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(function () { onScroll(); ticking = false; });
            ticking = true;
        }
    });
    onScroll();

    /* ── 6. REVEAL — IntersectionObserver ──
       Hero elements shown immediately so page is never blank.
       Everything else reveals as you scroll.
    ── */
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });

    /* Show hero immediately */
    setTimeout(function () {
        document.querySelectorAll('.hero .reveal').forEach(function (el) {
            el.classList.add('visible');
        });
    }, 200);

    /* ── 7. SKILL BARS ── */
    var skillsDone = false;
    function animateSkills() {
        if (skillsDone) return;
        var bars = document.querySelectorAll('.skill-fill');
        var allIn = true;
        bars.forEach(function (b) {
            if (b.getBoundingClientRect().top < window.innerHeight - 20) {
                b.style.width = b.getAttribute('data-width') + '%';
            } else { allIn = false; }
        });
        if (allIn) skillsDone = true;
    }

    /* ── 8. DRIVE TOOL ── */
    window.openDriveTool = function () {
        window.open(
            'https://script.google.com/macros/s/AKfycbzVgsOWqUD28F0nsJsKYHN2WptsAZO2kX2H3Uo31uDPsXHvImsnn9-YqzG1_24mLslv/exec',
            '_blank', 'noopener,noreferrer'
        );
    };

});
