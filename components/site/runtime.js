let session = null;

function mq(q) {
  try {
    return window.matchMedia ? window.matchMedia(q).matches : false;
  } catch {
    return false;
  }
}

function cls(el, name, on) {
  if (!el) return;
  if (on) el.classList.add(name);
  else el.classList.remove(name);
}

function headOffset() {
  const h = document.querySelector(".hdr");
  const b = h ? h.getBoundingClientRect().height : 64;
  return b + 34;
}

function scrollToEl(el) {
  if (!el) return;
  const reduce = mq("(prefers-reduced-motion: reduce)");
  const y = Math.max(
    0,
    el.getBoundingClientRect().top +
      (window.pageYOffset || document.documentElement.scrollTop || 0) -
      headOffset()
  );
  try {
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  } catch {
    window.scrollTo(0, y);
  }
}

function markNav(pathname) {
  const slug = !pathname || pathname === "/" ? "index" : pathname.slice(1);
  document.querySelectorAll(".nav a, .menu a, .sheet a, .ftr a").forEach((a) => {
    const h = a.getAttribute("href") || "";
    const path = h.split("#")[0];
    const active = slug === "index" ? path === "/" : path === `/${slug}`;
    cls(a, "active", active);
  });
}

function initRoute(root, ios) {
  const reduce = mq("(prefers-reduced-motion: reduce)");
  const revs = root.querySelectorAll(".rev");
  if (reduce || !("IntersectionObserver" in window)) {
    revs.forEach((el) => el.classList.add("in"));
  } else {
    const revIO = new IntersectionObserver(
      (list) => {
        list.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          revIO.unobserve(e.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    ios.push(revIO);
    revs.forEach((el) => {
      el.classList.remove("in");
      revIO.observe(el);
    });
  }

  const nums = root.querySelectorAll("[data-count]");
  const count = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const pre = el.getAttribute("data-prefix") || "";
    const suf = el.getAttribute("data-suffix") || "";
    if (Number.isNaN(target)) return;
    if (reduce) {
      el.textContent = pre + target.toLocaleString() + suf;
      return;
    }
    const done = pre + target.toLocaleString() + suf;
    setTimeout(() => {
      if (el.textContent !== done) el.textContent = done;
    }, 2600);
    let t0 = null;
    const frame = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / 2000, 1);
      el.textContent =
        pre + Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString() + suf;
      if (p < 1) requestAnimationFrame(frame);
    };
    frame(performance.now());
  };

  if ("IntersectionObserver" in window) {
    const cntIO = new IntersectionObserver(
      (list) => {
        list.forEach((e) => {
          if (!e.isIntersecting) return;
          const pre = e.target.getAttribute("data-prefix") || "";
          e.target.textContent = pre + "0";
          count(e.target);
          cntIO.unobserve(e.target);
        });
      },
      { threshold: 0.5 }
    );
    ios.push(cntIO);
    nums.forEach((el) => cntIO.observe(el));
  } else {
    nums.forEach(count);
  }

  if (!reduce && mq("(hover:hover)")) {
    root.querySelectorAll(".card").forEach((card) => {
      card.addEventListener(
        "pointermove",
        (e) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", e.clientX - r.left + "px");
          card.style.setProperty("--my", e.clientY - r.top + "px");
        },
        { signal: session.signal }
      );
    });
  }

  const run = root.querySelector(".pill-run[data-demo]");
  if (run && !run.dataset.played) {
    run.dataset.played = "1";
    const steps = ["Verifying", "Logging", "Verified"];
    if (reduce) {
      run.textContent = "Verified";
      run.className = "pill pill-ok";
    } else {
      const step = (i) => {
        if (i >= steps.length) return;
        setTimeout(() => {
          run.style.opacity = "0";
          setTimeout(() => {
            run.textContent = steps[i];
            if (i === steps.length - 1) run.className = "pill pill-ok";
            run.style.opacity = "1";
            step(i + 1);
          }, 220);
        }, 1400);
      };
      step(0);
    }
  }

  const heads = root.querySelectorAll(
    ".prose h2[id], .prose h3[id], .legal h2[id], .legal h3[id]"
  );
  const tocBox = root.querySelector(".toc");
  if (tocBox && heads.length && !tocBox.dataset.built) {
    tocBox.dataset.built = "1";
    heads.forEach((h) => {
      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.textContent = h.textContent;
      if (/^\d+\.\d/.test(h.textContent.trim())) a.className = "toc-sub";
      tocBox.appendChild(a);
    });
  }
  if (tocBox && !tocBox.querySelector("a")) {
    tocBox.hidden = true;
    const art = tocBox.parentNode;
    if (art && art.classList) art.classList.add("no-toc");
  }
  const links = root.querySelectorAll(".toc a");
  if (links.length && heads.length && "IntersectionObserver" in window) {
    const tio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((a) => {
            cls(a, "on", a.getAttribute("href") === `#${e.target.id}`);
          });
        });
      },
      { rootMargin: "-110px 0px -70% 0px" }
    );
    ios.push(tio);
    heads.forEach((h) => tio.observe(h));
  }
}

function fitHeadings() {
  document.querySelectorAll(".route .head h2").forEach((h) => {
    h.classList.remove("oneline");
    const parent = h.parentNode;
    const host = h.closest(".cf-site") || parent;
    const avail = parent.getBoundingClientRect().width;
    const probe = h.cloneNode(true);
    probe.style.cssText =
      "position:absolute;visibility:hidden;white-space:nowrap;max-width:none;width:max-content;left:0;top:0;pointer-events:none";
    host.appendChild(probe);
    const need = probe.getBoundingClientRect().width;
    probe.remove();
    if (need > 0 && need <= avail - 1) h.classList.add("oneline");
  });
}

function bindDash(root) {
  const dash = root.querySelector(".dash");
  if (!dash || dash.dataset.bound) return;
  dash.dataset.bound = "1";
  const tabs = dash.querySelectorAll(".dtab");
  const panes = dash.querySelectorAll(".dpane");
  const ink = dash.querySelector(".dtab-ink");
  tabs.forEach((tab, n) => {
    tab.addEventListener(
      "click",
      () => {
        dash.className = "dash manual";
        tabs.forEach((t, j) => cls(t, "on", j === n));
        panes.forEach((p, j) => cls(p, "on", j === n));
        if (ink) ink.style.transform = `translateX(${n * 100}%)`;
      },
      { signal: session.signal }
    );
  });
}

function bindChrome() {
  const { signal } = session;
  const hdr = document.querySelector(".hdr");
  let stuck = false;
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset || 0;
    if (!stuck && y > 24) stuck = true;
    else if (stuck && y < 8) stuck = false;
    else return;
    cls(hdr, "stuck", stuck);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true, signal });

  const burger = document.querySelector(".burger");
  const sheet = document.querySelector(".sheet");
  if (burger && sheet && burger.id === "burger") {
    burger.addEventListener(
      "click",
      () => {
        const on = sheet.classList.toggle("on");
        cls(burger, "on", on);
        burger.setAttribute("aria-expanded", String(on));
        document.body.style.overflow = on ? "hidden" : "";
      },
      { signal }
    );
    const acc = sheet.querySelector(".acc");
    const accT = sheet.querySelector(".acc-t");
    if (acc && accT) {
      accT.addEventListener(
        "click",
        () => {
          const open = acc.classList.toggle("open");
          accT.setAttribute("aria-expanded", String(open));
        },
        { signal }
      );
    }
    sheet.addEventListener(
      "click",
      (e) => {
        if (!e.target.closest("a")) return;
        sheet.classList.remove("on");
        burger.classList.remove("on");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        if (acc) {
          acc.classList.remove("open");
          accT.setAttribute("aria-expanded", "false");
        }
      },
      { signal }
    );
  }

  document.querySelectorAll(".drop").forEach((drop) => {
    drop.addEventListener(
      "click",
      (e) => {
        const a = e.target.closest && e.target.closest("a");
        if (!a) return;
        try {
          a.blur();
        } catch {
          /* ignore */
        }
        drop.classList.add("closed");
      },
      { signal }
    );
    drop.addEventListener("mouseleave", () => drop.classList.remove("closed"), { signal });
    drop.addEventListener(
      "focusout",
      () => {
        if (!drop.contains(document.activeElement)) drop.classList.remove("closed");
      },
      { signal }
    );
  });
}

function motionSetup(root) {
  const doc = document;
  const reduce = mq("(prefers-reduced-motion: reduce)");
  const fine = mq("(hover:hover) and (pointer:fine)");
  const { signal } = session;

  const MASK_SEL = ".head h2, .phero h1, .mini-cta h2, .band-in h2";
  root.querySelectorAll(MASK_SEL).forEach((h) => {
    if (h.dataset.masked) return;
    h.dataset.masked = "1";
    const inner = doc.createElement("span");
    while (h.firstChild) inner.appendChild(h.firstChild);
    const outer = doc.createElement("span");
    outer.className = "mask";
    outer.appendChild(inner);
    h.appendChild(outer);
  });

  const STAGGER_SEL = ".logos, .rows, .stats, .checks, .ftr-in, .segs";
  document.querySelectorAll(STAGGER_SEL).forEach((box) => {
    if (!box.classList.contains("rev") || box.dataset.stag) return;
    box.dataset.stag = "1";
    box.classList.add("stagger");
    Array.from(box.children).forEach((kid, i) => {
      if (kid.hasAttribute && kid.hasAttribute("data-d")) return;
      kid.style.setProperty("--sd", (Math.min(i, 9) * 0.055).toFixed(3) + "s");
    });
  });

  const seen = [];
  root.querySelectorAll(".rev").forEach((el) => {
    const p = el.parentNode;
    if (!p || p.classList.contains("stagger") || seen.indexOf(p) > -1) return;
    seen.push(p);
    const sibs = Array.from(p.children).filter(
      (c) => c.classList && c.classList.contains("rev")
    );
    if (sibs.length < 2 || sibs.length > 4) return;
    sibs.forEach((s, i) => {
      if (s.hasAttribute("data-d")) return;
      s.style.setProperty("--sd", (Math.min(i, 3) * 0.07).toFixed(3) + "s");
    });
  });

  if (!reduce) {
    const REPLAY_SEL =
      ".hero h1 .ln>span, .fu, .panel, .fitem, .phero .inner>*, .phero .mask>span";
    root.querySelectorAll(REPLAY_SEL).forEach((el) => {
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = "";
    });
  }

  if (!reduce && fine) {
    root.querySelectorAll(".rcard, .blk, .tile, .logo-cell").forEach((el) => {
      el.addEventListener(
        "pointermove",
        (e) => {
          const r = el.getBoundingClientRect();
          if (!r.width) return;
          el.style.setProperty("--mx", e.clientX - r.left + "px");
          el.style.setProperty("--my", e.clientY - r.top + "px");
        },
        { signal }
      );
    });
  }

  if (!reduce && "IntersectionObserver" in window) {
    root.querySelectorAll(".stat .num[data-count]").forEach((el) => {
      const io = new IntersectionObserver(
        (list) => {
          list.forEach((e) => {
            if (!e.isIntersecting) return;
            el.classList.add("counting");
            setTimeout(() => el.classList.remove("counting"), 2000);
            io.unobserve(el);
          });
        },
        { threshold: 0.5 }
      );
      session.ios.push(io);
      io.observe(el);
    });
  }
}

function bindWindowChrome() {
  const { signal } = session;
  const reduce = mq("(prefers-reduced-motion: reduce)");
  document.documentElement.style.setProperty(
    "--page-w",
    document.documentElement.clientWidth + "px"
  );
  window.addEventListener(
    "resize",
    () => {
      document.documentElement.style.setProperty(
        "--page-w",
        document.documentElement.clientWidth + "px"
      );
      fitHeadings();
    },
    { passive: true, signal }
  );

  let toTop = document.querySelector(".totop");
  if (!toTop) {
    toTop = document.createElement("button");
    toTop.className = "totop";
    toTop.type = "button";
    toTop.setAttribute("aria-label", "Back to top");
    toTop.tabIndex = -1;
    toTop.setAttribute("aria-hidden", "true");
    toTop.innerHTML =
      '<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(toTop);
  }
  toTop.addEventListener(
    "click",
    () => {
      try {
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      } catch {
        window.scrollTo(0, 0);
      }
    },
    { signal }
  );

  let queued = false;
  let topOn = null;
  const raf = window.requestAnimationFrame || ((f) => setTimeout(f, 16));
  const frame = () => {
    queued = false;
    const y = window.pageYOffset || document.documentElement.scrollTop || 0;
    const showTop = y > 640;
    if (showTop !== topOn) {
      topOn = showTop;
      toTop.classList.toggle("on", showTop);
      toTop.tabIndex = showTop ? 0 : -1;
      toTop.setAttribute("aria-hidden", showTop ? "false" : "true");
    }
  };
  const onScroll = () => {
    if (!queued) {
      queued = true;
      raf(frame);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true, signal });
  onScroll();

  document.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const h = a.getAttribute("href");
      if (!h || h === "#" || h.indexOf("#/") === 0) return;
      const id = h.slice(1);
      const active = document.querySelector(".route");
      let t = null;
      try {
        t = active && active.querySelector("#" + CSS.escape(id));
      } catch {
        t = active && active.querySelector(`[id="${id}"]`);
      }
      if (t) {
        e.preventDefault();
        scrollToEl(t);
      }
    },
    { signal }
  );
}

export function destroySite() {
  if (!session) return;
  session.ac.abort();
  session.ios.forEach((io) => io.disconnect());
  session = null;
  document.body.style.overflow = "";
}

export function bootSite(pageRoot, pathname) {
  destroySite();
  if (!pageRoot) return;
  session = { ac: new AbortController(), ios: [], signal: null };
  session.signal = session.ac.signal;

  const reduce = mq("(prefers-reduced-motion: reduce)");
  pageRoot.classList.remove("rt-out");
  if (!reduce) {
    pageRoot.classList.remove("rt-in");
    void pageRoot.offsetWidth;
    pageRoot.classList.add("rt-in");
  }

  const yr = document.getElementById("yr");
  if (yr) yr.textContent = String(new Date().getFullYear());

  markNav(pathname);
  motionSetup(pageRoot);
  initRoute(pageRoot, session.ios);
  bindDash(pageRoot);
  bindChrome();
  bindWindowChrome();
  fitHeadings();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (session) fitHeadings();
    });
  }

  if (window.location.hash && window.location.hash.indexOf("#/") !== 0) {
    const id = decodeURIComponent(window.location.hash.slice(1));
    let t = null;
    try {
      t = pageRoot.querySelector("#" + CSS.escape(id));
    } catch {
      t = pageRoot.querySelector(`[id="${id}"]`);
    }
    if (t) requestAnimationFrame(() => scrollToEl(t));
  }
}
