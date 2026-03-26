/* ============================================================
   UMAR J PORTFOLIO — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Loading screen ──────────────────────────────────────
    const loading = document.getElementById('loading');
    window.addEventListener('load', () => {
        setTimeout(() => loading.classList.add('gone'), 900);
    });

    // ── Custom cursor ────────────────────────────────────────
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
        let mx = 0, my = 0, fx = 0, fy = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
        const animateCursor = () => {
            cursor.style.left = mx + 'px';
            cursor.style.top  = my + 'px';
            fx += (mx - fx) * 0.12;
            fy += (my - fy) * 0.12;
            follower.style.left = fx + 'px';
            follower.style.top  = fy + 'px';
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Grow follower on interactive elements
        document.querySelectorAll('a, button, [data-scroll]').forEach(el => {
            el.addEventListener('mouseenter', () => follower.style.transform = 'translate(-50%,-50%) scale(1.8)');
            el.addEventListener('mouseleave', () => follower.style.transform = 'translate(-50%,-50%) scale(1)');
        });
    }

    // ── Navigation ───────────────────────────────────────────
    const nav      = document.getElementById('nav');
    const toggle   = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    toggle?.addEventListener('click', () => {
        toggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks?.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
        link.addEventListener('click', () => {
            toggle?.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // Smooth scroll for [data-scroll] elements
    document.querySelectorAll('[data-scroll], a[href^="#"]').forEach(el => {
        el.addEventListener('click', e => {
            const href = el.getAttribute('href') || el.getAttribute('data-href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    // ── Scroll effects ───────────────────────────────────────
    const scrollBar = document.getElementById('scrollBar');
    const allNavLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections    = document.querySelectorAll('section[id]');

    function onScroll() {
        const scrollTop    = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct          = scrollTop / scrollHeight;

        // Scroll bar
        if (scrollBar) scrollBar.style.width = (pct * 100) + '%';

        // Nav solid
        nav.classList.toggle('solid', scrollTop > 60);

        // Active nav link
        let current = '';
        sections.forEach(sec => {
            if (scrollTop >= sec.offsetTop - 120) current = sec.id;
        });
        allNavLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === '#' + current);
        });

        // Reveal elements
        revealElements();

        // Skill bars
        animateSkillBars();
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(() => { onScroll(); ticking = false; }); ticking = true; }
    });
    onScroll(); // initial

    // ── Reveal on scroll ─────────────────────────────────────
    function revealElements() {
        document.querySelectorAll('[data-reveal]:not(.visible)').forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 80) el.classList.add('visible');
        });
    }
    revealElements();

    // ── Skill bars ────────────────────────────────────────────
    const skillsDone = new Set();
    function animateSkillBars() {
        document.querySelectorAll('.skill-fill').forEach(bar => {
            if (skillsDone.has(bar)) return;
            const top = bar.getBoundingClientRect().top;
            if (top < window.innerHeight - 40) {
                bar.style.width = bar.dataset.width + '%';
                skillsDone.add(bar);
            }
        });
    }

    // ── Drive tool ───────────────────────────────────────────
    window.openDriveTool = () => {
        window.open(
            'https://script.google.com/macros/s/AKfycbzVgsOWqUD28F0nsJsKYHN2WptsAZO2kX2H3Uo31uDPsXHvImsnn9-YqzG1_24mLslv/exec',
            '_blank'
        );
    };

    // ── Resize: reset mobile menu ─────────────────────────────
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            toggle?.classList.remove('open');
            navLinks?.classList.remove('open');
        }
    });

});
