/* ===========================================================================
   وصلة ميديا — Wasla Media
   Rendering + interactions. No dependencies.
   =========================================================================== */
(function () {
  'use strict';

  var D = window.WASLA;
  var I = window.I18N;
  var IMG = 'assets/img/projects/';

  /* ---------- helpers ---------------------------------------------------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var lang = 'ar';
  function t(key) { return (I[lang] && I[lang][key]) || (I.ar && I.ar[key]) || key; }
  function L(obj) { return obj ? (obj[lang] != null ? obj[lang] : obj.ar) : ''; }

  var nf = function (n) { return new Intl.NumberFormat('en-US').format(n); };

  // Truncates rather than rounds — never show a figure larger than the real one.
  function compact(n) {
    if (n >= 1000000) return (Math.floor(n / 100000) / 10).toString().replace(/\.0$/, '') + 'M';
    if (n >= 100000) return Math.floor(n / 1000) + 'K';
    if (n >= 1000) return (Math.floor(n / 100) / 10).toString().replace(/\.0$/, '') + 'K';
    return String(n);
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- icons (Lucide-style, 24px stroke) -------------------------- */
  var ICONS = {
    branding: '<path d="M12 2 4 6v6c0 5 3.4 9.2 8 10 4.6-.8 8-5 8-10V6l-8-4Z"/><path d="m9 12 2 2 4-4"/>',
    web: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20"/><circle cx="5.5" cy="6.5" r=".6" fill="currentColor"/><circle cx="8" cy="6.5" r=".6" fill="currentColor"/>',
    apps: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18.5h2"/><path d="M10 5h4"/>',
    social: '<path d="M17 8a3 3 0 1 0-2.8-4H14"/><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.6 6.8-4.2M8.6 13.4l6.8 4.2"/>',
    graphic: '<circle cx="13.5" cy="6.5" r="1.4"/><circle cx="17.5" cy="10.5" r="1.4"/><circle cx="8.5" cy="7.5" r="1.4"/><circle cx="6.5" cy="12.5" r="1.4"/><path d="M12 2a10 10 0 1 0 0 20c.9 0 1.6-.7 1.6-1.6 0-.4-.2-.8-.5-1.1-.3-.3-.4-.7-.4-1.1 0-.9.7-1.6 1.6-1.6H16a6 6 0 0 0 6-6c0-4.9-4.5-8.6-10-8.6Z"/>',
    video: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3.5v11L16 14"/>',
    ads: '<path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
    subs: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/>',

    layers: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
    chart: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m7 14 3.5-4 3 3L19 7"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    shield: '<path d="M12 2 4 6v6c0 5 3.4 9.2 8 10 4.6-.8 8-5 8-10V6l-8-4Z"/><path d="m9.5 12 2 2 3.5-4"/>',

    whatsapp: '<path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2Z"/><path d="M8.6 7.6c-.3 0-.6.1-.8.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.8 4.3 3.8 2.1.8 2.6.7 3 .6.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.1-.7.1l-.8 1c-.1.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.5-.8-.7-1.4-1.6-1.6-1.9-.1-.3 0-.4.1-.6l.5-.6c.2-.2.2-.4.3-.6 0-.2 0-.4-.1-.6l-.8-1.9c-.2-.4-.4-.4-.6-.4h-.5Z" fill="currentColor" stroke="none"/>',
    mail: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M14 9V7.5c0-.8.5-1.5 1.5-1.5H17V3h-2.5A4.5 4.5 0 0 0 10 7.5V9H7.5v3H10v9h4v-9h2.5l.5-3H14Z"/>',
    tiktok: '<path d="M16 3c.4 2.4 1.9 4 4.5 4.2v3.2c-1.7.1-3.2-.4-4.5-1.3v6.1c0 3.6-2.7 6.1-6 6.1S4 18.8 4 15.4c0-3.2 2.4-5.6 5.5-5.7v3.3c-1.3.1-2.3 1.1-2.3 2.4a2.5 2.5 0 0 0 5 .1V3H16Z"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.2v.1M12 17v-3.6c0-1 .8-1.9 1.9-1.9s1.9.9 1.9 1.9V17"/>',
    youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10.5 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none"/>',

    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    arrowUp: '<path d="M12 19V5"/><path d="m6 11 6-6 6 6"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M2 12h2M20 12h2M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    trend: '<path d="M3 17 9 11l4 4 8-8"/><path d="M15 7h6v6"/>',
    external: '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  };

  function icon(name, cls) {
    var body = ICONS[name];
    if (!body) return '';
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  }

  /* ---------- language & theme ------------------------------------------ */
  function applyStaticStrings() {
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-ph]').forEach(function (el) { el.placeholder = t(el.getAttribute('data-i18n-ph')); });
    $$('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    $$('[data-i18n-title]').forEach(function (el) { el.setAttribute('title', t(el.getAttribute('data-i18n-title'))); });

    document.title = t('meta.title');
    var md = $('meta[name="description"]');
    if (md) md.setAttribute('content', t('meta.desc'));
  }

  function setLang(next, persist) {
    lang = next === 'en' ? 'en' : 'ar';
    var html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    if (persist !== false) { try { localStorage.setItem('wasla-lang', lang); } catch (e) {} }

    var btn = $('#langToggle');
    if (btn) btn.textContent = lang === 'ar' ? 'EN' : 'ع';

    applyStaticStrings();
    renderAll();
  }

  function setTheme(next, persist) {
    document.documentElement.setAttribute('data-theme', next);
    if (persist !== false) { try { localStorage.setItem('wasla-theme', next); } catch (e) {} }
    var btn = $('#themeToggle');
    if (btn) btn.innerHTML = icon(next === 'dark' ? 'sun' : 'moon');
  }

  /* ---------- WhatsApp link --------------------------------------------- */
  function waNumber() {
    var n = String(D.site.whatsapp || '').replace(/\D/g, '');
    // Reject the shipped placeholder so we never open a dead chat.
    return /^0+$|^970000000000$|^$/.test(n) ? '' : n;
  }

  function waLink(text) {
    var n = waNumber();
    if (!n) return '';
    return 'https://wa.me/' + n + (text ? '?text=' + encodeURIComponent(text) : '');
  }

  // ".gaza" is not a real top-level domain, so the shipped address can never
  // receive mail. Treat it as unset rather than pointing buttons at a dead inbox.
  function emailOk() {
    var e = String(D.site.email || '');
    return e.indexOf('@') > 0 && !/\.gaza$/i.test(e);
  }

  function mailLink(subject, body) {
    if (!emailOk()) return '';
    return 'mailto:' + D.site.email +
      (subject ? '?subject=' + encodeURIComponent(subject) : '') +
      (body ? (subject ? '&' : '?') + 'body=' + encodeURIComponent(body) : '');
  }

  /* Best contact link available, in order of preference. Falls back to the
     Instagram profile so no call-to-action is ever a dead end. */
  function contactLink(text, subject) {
    return waLink(text) || mailLink(subject || t('nav.cta'), text) || D.site.social.instagram || '#contact';
  }

  function defaultWaText() {
    return lang === 'ar'
      ? 'مرحبا وصلة ميديا 👋 حابب أستفسر عن خدماتكم.'
      : 'Hello Wasla Media 👋 I would like to ask about your services.';
  }

  /* ---------- renderers -------------------------------------------------- */
  function renderServices() {
    var host = $('#servicesGrid');
    if (!host) return;
    host.innerHTML = D.services.map(function (s, i) {
      var msg = lang === 'ar'
        ? 'مرحبا 👋 بدي أستفسر عن خدمة: ' + s.title.ar
        : 'Hello 👋 I would like to ask about: ' + s.title.en;
      var href = contactLink(msg, L(s.title));
      return '' +
        '<article class="card service reveal" style="--delay:' + (i % 4) * 70 + 'ms">' +
          '<div class="service__icon">' + icon(s.icon) + '</div>' +
          '<h3>' + esc(L(s.title)) + '</h3>' +
          '<p>' + esc(L(s.desc)) + '</p>' +
          '<div class="service__items">' +
            L(s.items).map(function (x) { return '<span class="tag">' + esc(x) + '</span>'; }).join('') +
          '</div>' +
          '<a class="service__link" href="' + esc(href) + '" target="_blank" rel="noopener">' +
            '<span>' + esc(t('services.ask')) + '</span>' + icon('arrow') +
          '</a>' +
        '</article>';
    }).join('');
  }

  function renderResults() {
    var host = $('#resultsGrid');
    if (!host) return;

    host.innerHTML = D.results.map(function (r, i) {
      var growth = r.before.followers > 0 ? r.after.followers / r.before.followers : 0;
      var growthTxt = growth >= 10 ? Math.round(growth) : growth.toFixed(1);
      return '' +
        '<article class="card result reveal" style="--delay:' + i * 90 + 'ms">' +
          '<div class="result__head">' +
            '<div>' +
              '<div class="result__handle">@' + esc(r.handle) + '</div>' +
              '<div class="result__field">' + esc(L(r.field)) + '</div>' +
            '</div>' +
            '<div class="result__badge" title="' + esc(t('results.growth')) + '">' +
              esc(t('results.times')) + growthTxt + ' <small>' + esc(t('results.growth')) + '</small>' +
            '</div>' +
          '</div>' +
          '<p>' + esc(L(r.note)) + '</p>' +
          '<div class="compare">' +
            '<div class="compare__side">' +
              '<div class="compare__label">' + esc(t('results.before')) + '</div>' +
              '<div class="compare__num" data-count="' + r.before.followers + '" data-compact="1">0</div>' +
              '<div class="compare__unit">' + esc(t('results.followers')) + '</div>' +
            '</div>' +
            '<div class="compare__arrow">' + icon('arrow') + '</div>' +
            '<div class="compare__side compare__side--after">' +
              '<div class="compare__label">' + esc(t('results.after')) + '</div>' +
              '<div class="compare__num" data-count="' + r.after.followers + '" data-compact="1">0</div>' +
              '<div class="compare__unit">' + esc(t('results.followers')) + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="result__bar"><div class="result__fill" data-fill="100"></div></div>' +
          '<div class="result__meta">' +
            '<span>' + nf(r.before.posts) + ' → ' + nf(r.after.posts) + ' ' + esc(t('results.posts')) + '</span>' +
            (r.url
              ? '<a href="' + esc(r.url) + '" target="_blank" rel="noopener nofollow" class="service__link">' +
                  '<span>' + esc(t('results.visit')) + '</span>' + icon('external') + '</a>'
              : '') +
          '</div>' +
        '</article>';
    }).join('');
  }

  var activeFilter = 'all';

  function renderFilters() {
    var host = $('#workFilters');
    if (!host) return;

    var used = {};
    D.projects.forEach(function (p) { (p.category || []).forEach(function (c) { used[c] = true; }); });

    var cats = [{ id: 'all', label: t('work.all') }].concat(
      D.services.filter(function (s) { return used[s.id]; })
                .map(function (s) { return { id: s.id, label: L(s.title) }; })
    );

    host.innerHTML = cats.map(function (c) {
      return '<button type="button" class="chip" data-filter="' + esc(c.id) + '" ' +
             'aria-pressed="' + (c.id === activeFilter) + '">' + esc(c.label) + '</button>';
    }).join('');
  }

  function renderProjects() {
    var host = $('#workGrid');
    if (!host) return;

    var list = D.projects.filter(function (p) {
      return activeFilter === 'all' || (p.category || []).indexOf(activeFilter) !== -1;
    });

    if (!list.length) {
      host.innerHTML = '<p class="empty">' + esc(t('work.empty')) + '</p>';
      return;
    }

    host.innerHTML = list.map(function (p, i) {
      var n = (p.images || []).length;
      return '' +
        '<button type="button" class="project reveal" data-project="' + esc(p.id) + '" ' +
                'style="--delay:' + (i % 3) * 80 + 'ms" aria-label="' + esc(t('work.view') + ' — ' + L(p.title)) + '">' +
          '<div class="project__media">' +
            '<img src="' + IMG + esc(p.cover) + '-thumb.webp" alt="' + esc(L(p.title)) + '" ' +
                 'loading="lazy" decoding="async" width="700" height="875">' +
            (n > 1 ? '<span class="project__count">' + n + ' ' + esc(t('work.count')) + '</span>' : '') +
          '</div>' +
          '<div class="project__body">' +
            (p.client ? '<span class="project__client">' + esc(p.client) + '</span>' : '') +
            '<h3 class="project__title">' + esc(L(p.title)) + '</h3>' +
            '<p class="project__summary">' + esc(L(p.summary)) + '</p>' +
            '<div class="project__tags">' +
              L(p.tags).map(function (x) { return '<span class="tag">' + esc(x) + '</span>'; }).join('') +
            '</div>' +
          '</div>' +
        '</button>';
    }).join('');
  }

  function renderProcess() {
    var host = $('#processGrid');
    if (!host) return;
    host.innerHTML = D.process.map(function (s, i) {
      return '<article class="step reveal" style="--delay:' + i * 80 + 'ms">' +
               '<h3>' + esc(L(s.title)) + '</h3><p>' + esc(L(s.desc)) + '</p>' +
             '</article>';
    }).join('');
  }

  function renderWhy() {
    var host = $('#whyGrid');
    if (!host) return;
    host.innerHTML = D.why.map(function (w, i) {
      return '<article class="why reveal" style="--delay:' + (i % 2) * 90 + 'ms">' +
               '<div class="why__icon">' + icon(w.icon) + '</div>' +
               '<div><h3>' + esc(L(w.title)) + '</h3><p>' + esc(L(w.desc)) + '</p></div>' +
             '</article>';
    }).join('');
  }

  function renderContact() {
    var wa = waLink(defaultWaText());
    var items = [];

    if (wa) {
      items.push({ icon: 'whatsapp', label: t('contact.whatsapp'), value: '+' + waNumber(), href: wa, ext: true });
    }
    if (emailOk()) {
      items.push({ icon: 'mail', label: t('contact.email'), value: D.site.email, href: 'mailto:' + D.site.email });
    }
    if (!wa && !emailOk() && D.site.social.instagram) {
      items.push({
        icon: 'instagram', label: t('contact.follow'),
        value: '@' + D.site.social.instagram.replace(/\/+$/, '').split('/').pop().split('?')[0],
        href: D.site.social.instagram, ext: true,
      });
    }
    items.push({ icon: 'pin', label: t('contact.location'), value: L(D.site.location), rtlText: true });

    var host = $('#contactList');
    if (host) {
      host.innerHTML = items.map(function (it) {
        var inner =
          '<span class="contact-item__icon">' + icon(it.icon) + '</span>' +
          '<span>' +
            '<span class="contact-item__label">' + esc(it.label) + '</span><br>' +
            '<span class="contact-item__value' + (it.rtlText ? ' is-rtl' : '') + '">' + esc(it.value) + '</span>' +
          '</span>';
        return it.href
          ? '<a class="contact-item" href="' + esc(it.href) + '"' + (it.ext ? ' target="_blank" rel="noopener"' : '') + '>' + inner + '</a>'
          : '<div class="contact-item">' + inner + '</div>';
      }).join('');
    }

    var socialHost = $('#socialLinks');
    if (socialHost) {
      var order = ['instagram', 'facebook', 'tiktok', 'linkedin', 'youtube'];
      socialHost.innerHTML = order.filter(function (k) { return D.site.social[k]; }).map(function (k) {
        return '<a class="social" href="' + esc(D.site.social[k]) + '" target="_blank" rel="noopener" ' +
               'aria-label="' + esc(k) + '">' + icon(k) + '</a>';
      }).join('');
    }

    // Every "talk to us" CTA on the page
    var cta = contactLink(defaultWaText());
    $$('[data-wa]').forEach(function (el) { el.setAttribute('href', cta); });

    // Service <select>
    var sel = $('#formService');
    if (sel) {
      sel.innerHTML =
        '<option value="">' + esc(t('form.servicePh')) + '</option>' +
        D.services.map(function (s) { return '<option value="' + esc(L(s.title)) + '">' + esc(L(s.title)) + '</option>'; }).join('') +
        '<option value="__other">' + esc(t('form.serviceOther')) + '</option>';
    }
  }

  function renderFooter() {
    var host = $('#footerServices');
    if (host) {
      host.innerHTML = D.services.map(function (s) {
        return '<li><a href="#services">' + esc(L(s.title)) + '</a></li>';
      }).join('');
    }
    var y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
    var brand = $('#footerBrand');
    if (brand) brand.textContent = t('brand.name');
  }

  function renderHeroStats() {
    var gained = D.results.reduce(function (sum, r) {
      return sum + Math.max(0, r.after.followers - r.before.followers);
    }, 0);
    var el = $('#statFollowers');
    if (el) { el.setAttribute('data-count', gained); el.setAttribute('data-compact', '1'); el.setAttribute('data-prefix', '+'); }
    var sv = $('#statServices');
    if (sv) sv.setAttribute('data-count', D.services.length);
  }

  function renderMarquee() {
    var host = $('#marqueeTrack');
    if (!host) return;
    var half = '<div class="marquee__half">' + D.services.map(function (s) {
      return '<span class="marquee__item">' + esc(L(s.title)) + '</span>';
    }).join('') + '</div>';
    // Two identical halves so the 50% translate loops with no seam.
    host.innerHTML = half + half;
  }

  function renderAll() {
    renderMarquee();
    renderHeroStats();
    renderServices();
    renderResults();
    renderFilters();
    renderProjects();
    renderProcess();
    renderWhy();
    renderContact();
    renderFooter();
    observeReveals();
    observeCounters();
  }

  /* ---------- scroll reveal --------------------------------------------- */
  var revealObserver = null;
  function observeReveals() {
    if (reduceMotion) { $$('.reveal').forEach(function (el) { el.classList.add('is-in'); }); return; }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); revealObserver.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -60px 0px', threshold: .12 });
    }
    $$('.reveal:not(.is-in)').forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- counters --------------------------------------------------- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var isCompact = el.getAttribute('data-compact') === '1';
    var prefix = el.getAttribute('data-prefix') || '';
    var fmt = function (v) { return prefix + (isCompact ? compact(Math.round(v)) : nf(Math.round(v))); };

    if (reduceMotion) { el.textContent = fmt(target); return; }

    var start = null, dur = 1400;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* Safety net: IntersectionObserver can coalesce callbacks during a fast
     scroll and skip elements that flew past, which would leave them invisible
     for good. A cheap rect check on scroll catches anything the observer
     missed. */
  function sweepVisible() {
    var vh = window.innerHeight;
    $$('.reveal:not(.is-in)').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh - 40 && r.bottom > 0) el.classList.add('is-in');
    });
    $$('[data-count], [data-fill]').forEach(function (el) {
      if (el.getAttribute('data-done')) return;
      var r = el.getBoundingClientRect();
      if (r.top >= vh || r.bottom <= 0) return;
      el.setAttribute('data-done', '1');
      if (counterObserver) counterObserver.unobserve(el);
      if (el.hasAttribute('data-fill')) el.style.inlineSize = el.getAttribute('data-fill') + '%';
      else countUp(el);
    });
  }

  var counterObserver = null;
  function observeCounters() {
    if (!counterObserver) {
      counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          counterObserver.unobserve(el);
          if (el.getAttribute('data-done')) return;
          el.setAttribute('data-done', '1');
          if (el.hasAttribute('data-fill')) {
            el.style.inlineSize = el.getAttribute('data-fill') + '%';
          } else {
            countUp(el);
          }
        });
      }, { threshold: .4 });
    }
    $$('[data-count], [data-fill]').forEach(function (el) { counterObserver.observe(el); });
  }

  /* ---------- lightbox --------------------------------------------------- */
  var lb = {
    root: null, img: null, caption: null, counter: null, thumbs: null,
    titleEl: null, clientEl: null,
    project: null, index: 0, lastFocus: null,
  };

  function openLightbox(id) {
    var p = D.projects.filter(function (x) { return x.id === id; })[0];
    if (!p || !p.images || !p.images.length) return;

    lb.project = p;
    lb.index = 0;
    lb.lastFocus = document.activeElement;

    lb.titleEl.textContent = L(p.title);
    lb.clientEl.textContent = p.client || '';

    lb.thumbs.innerHTML = p.images.map(function (im, i) {
      return '<button type="button" class="lightbox__thumb" data-idx="' + i + '" aria-label="' + (i + 1) + '">' +
               '<img src="' + IMG + esc(im.file) + '-thumb.webp" alt="" loading="lazy" decoding="async">' +
             '</button>';
    }).join('');
    lb.thumbs.hidden = p.images.length < 2;

    var multi = p.images.length > 1;
    $$('.lightbox__nav').forEach(function (b) { b.hidden = !multi; });

    showSlide(0);
    lb.root.classList.add('is-open');
    lb.root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    $('#lbClose').focus();
  }

  function closeLightbox() {
    lb.root.classList.remove('is-open');
    lb.root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    lb.project = null;
    if (lb.lastFocus && lb.lastFocus.focus) lb.lastFocus.focus();
  }

  function showSlide(i) {
    var p = lb.project;
    if (!p) return;
    var n = p.images.length;
    lb.index = (i % n + n) % n;
    var im = p.images[lb.index];

    lb.img.src = IMG + im.file + '.webp';
    lb.img.alt = L(im.caption) || L(p.title);
    lb.caption.textContent = L(im.caption) || '';
    lb.counter.textContent = (lb.index + 1) + ' ' + t('lightbox.of') + ' ' + n;

    $$('.lightbox__thumb', lb.thumbs).forEach(function (b, bi) {
      b.classList.toggle('is-active', bi === lb.index);
    });
  }

  /* ---------- contact form ---------------------------------------------- */
  function initForm() {
    var form = $('#contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = $('#formName');
      var phone = $('#formPhone');
      var service = $('#formService');
      var message = $('#formMessage');
      var status = $('#formStatus');
      var ok = true;

      function mark(input, bad, msg) {
        var field = input.closest('.field');
        field.classList.toggle('has-error', bad);
        $('.field__error', field).textContent = bad ? msg : '';
        if (bad) ok = false;
      }

      mark(name, !name.value.trim(), t('form.errName'));
      mark(message, message.value.trim().length < 10, t('form.errMessage'));
      if (!ok) { (name.value.trim() ? message : name).focus(); return; }

      var svc = service.value === '__other' ? t('form.serviceOther') : service.value;
      var lines = lang === 'ar'
        ? ['مرحبا وصلة ميديا 👋', '', 'الاسم: ' + name.value.trim(),
           phone.value.trim() ? 'رقم التواصل: ' + phone.value.trim() : '',
           svc ? 'الخدمة: ' + svc : '', '', message.value.trim()]
        : ['Hello Wasla Media 👋', '', 'Name: ' + name.value.trim(),
           phone.value.trim() ? 'Phone: ' + phone.value.trim() : '',
           svc ? 'Service: ' + svc : '', '', message.value.trim()];

      var body = lines.filter(function (l, i) { return l !== '' || i === 1 || i === 5; }).join('\n');
      var link = waLink(body);

      if (!link) {
        var mail = mailLink(t('nav.cta') + ' — ' + name.value.trim(), body);
        if (mail) { window.location.href = mail; return; }
        // Nothing configured: send them somewhere real rather than nowhere.
        if (D.site.social.instagram) {
          window.open(D.site.social.instagram, '_blank', 'noopener');
          status.textContent = t('form.errWhatsapp');
          return;
        }
        status.textContent = t('form.errWhatsapp');
        return;
      }

      window.open(link, '_blank', 'noopener');
      status.textContent = t('form.sent');
      form.reset();
    });

    // Clear the error as soon as the user starts fixing it.
    $$('#contactForm input, #contactForm textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        var field = el.closest('.field');
        if (field.classList.contains('has-error')) {
          field.classList.remove('has-error');
          $('.field__error', field).textContent = '';
        }
      });
    });
  }

  /* ---------- header / nav ----------------------------------------------- */
  function initChrome() {
    var header = $('#header');
    var toTop = $('#toTop');
    var nav = $('#nav');
    var navToggle = $('#navToggle');

    var ticking = false;
    function onScroll() {
      var y = window.scrollY;
      header.classList.toggle('is-stuck', y > 8);
      toTop.classList.toggle('is-visible', y > 700);
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () { ticking = false; sweepVisible(); });
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('load', onScroll);
    onScroll();

    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    function closeNav() {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.innerHTML = icon('menu');
    }
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.innerHTML = icon(open ? 'close' : 'menu');
    });
    $$('#nav a').forEach(function (a) { a.addEventListener('click', closeNav); });
    window.addEventListener('resize', function () { if (window.innerWidth > 960) closeNav(); });

    // Active section highlight
    var links = $$('#nav .nav__link');
    var sections = links.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
    if (sections.length) {
      var so = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id);
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (s) { so.observe(s); });
    }
  }

  /* ---------- boot -------------------------------------------------------- */
  function init() {
    // Restore preferences
    var savedLang, savedTheme;
    try { savedLang = localStorage.getItem('wasla-lang'); } catch (e) {}
    try { savedTheme = localStorage.getItem('wasla-theme'); } catch (e) {}

    setTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'), false);
    setLang(savedLang || 'ar', false);

    $('#langToggle').addEventListener('click', function () { setLang(lang === 'ar' ? 'en' : 'ar'); });
    $('#themeToggle').addEventListener('click', function () {
      setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });

    // Lightbox wiring
    lb.root = $('#lightbox');
    lb.img = $('#lbImage');
    lb.caption = $('#lbCaption');
    lb.counter = $('#lbCounter');
    lb.thumbs = $('#lbThumbs');
    lb.titleEl = $('#lbTitle');
    lb.clientEl = $('#lbClient');

    document.addEventListener('click', function (e) {
      var card = e.target.closest('[data-project]');
      if (card) { openLightbox(card.getAttribute('data-project')); return; }

      var chip = e.target.closest('[data-filter]');
      if (chip) {
        activeFilter = chip.getAttribute('data-filter');
        $$('#workFilters .chip').forEach(function (c) {
          c.setAttribute('aria-pressed', String(c === chip));
        });
        renderProjects();
        observeReveals();
        return;
      }

      var thumb = e.target.closest('.lightbox__thumb');
      if (thumb) { showSlide(parseInt(thumb.getAttribute('data-idx'), 10)); return; }
    });

    $('#lbClose').addEventListener('click', closeLightbox);
    $('#lbPrev').addEventListener('click', function () { showSlide(lb.index - 1); });
    $('#lbNext').addEventListener('click', function () { showSlide(lb.index + 1); });
    lb.root.addEventListener('click', function (e) {
      if (e.target === lb.root || e.target.classList.contains('lightbox__stage')) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lb.project) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') showSlide(lang === 'ar' ? lb.index - 1 : lb.index + 1);
      else if (e.key === 'ArrowLeft') showSlide(lang === 'ar' ? lb.index + 1 : lb.index - 1);
    });

    initChrome();
    initForm();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
