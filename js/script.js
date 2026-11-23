/* ==========================================================================
   PRECISION WORKS — site interactions (vanilla JS, no dependencies)
   All data below is fictional demonstration content: edit it to match
   the real business.
   ========================================================================== */
(() => {
  "use strict";

  document.documentElement.classList.add("js");

  /* ------------------------------------------------------------------
     Config
     ------------------------------------------------------------------ */
  // Leave empty for the demo: WhatsApp opens with the message and lets the
  // user choose a contact. Add the real number (e.g. "919XXXXXXXXX") later.
  const WHATSAPP_NUMBER = "";
  const ALLOWED_EXT = ["pdf", "jpg", "jpeg", "png", "dxf", "dwg", "step", "stp"];
  const MAX_FILES = 5;
  const MAX_FILE_MB = 25;

  const img = (id, w = 900, q = 72) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

  /* ------------------------------------------------------------------
     Data: capabilities (sample offerings)
     ------------------------------------------------------------------ */
  const CAPABILITIES = [
    {
      title: "CNC Machining",
      image: "1727292485858-588c7652ad69",
      alt: "CNC machine control panel next to the machining area",
      text: "Computer-controlled machining for components that need consistent, drawing-based results.",
      points: ["Precision component machining", "Custom part manufacturing", "Machined metal components"],
      detail: "CNC machining is suited to components with defined geometry, repeat requirements or features that benefit from programmed operations. Share your drawing and quantity and the team can review whether CNC is the right route."
    },
    {
      title: "Metal Fabrication",
      image: "1598302936625-6075fbd98dd7",
      alt: "Fabricator grinding a steel beam with sparks flying",
      text: "Cutting, joining and finishing of metal sections into structures and assemblies.",
      points: ["Metal structures", "Custom fabrication", "Industrial frames and assemblies"],
      detail: "Fabrication covers frames, stands, structures and assemblies built from plates, pipes and sections. Requirements are reviewed for size, material and finishing before work is planned."
    },
    {
      title: "Turning & Milling",
      image: "1666634157070-6fd830fb5672",
      alt: "Metal rod held in a lathe chuck being turned by a cutting tool",
      text: "Conventional machining operations for round and prismatic components.",
      points: ["Custom turning operations", "Milling operations", "Component finishing"],
      detail: "Turning is used for shafts, pins, bushes and other round parts; milling for faces, slots and pockets. Many components combine both, which is discussed during technical review."
    },
    {
      title: "Welding Services",
      image: "1455165814004-1126a7199f9b",
      alt: "Welder in protective gloves welding a metal joint",
      text: "Welding for structural members, brackets and custom assemblies.",
      points: ["Metal welding", "Structural fabrication", "Custom welded assemblies"],
      detail: "Welding work is planned according to the material, joint type and application. Let us know about any specific weld or finishing requirements in your enquiry."
    },
    {
      title: "Sheet Metal Work",
      image: "1764114235891-66ff86abaf87",
      alt: "Industrial cutting machine working on a metal sheet",
      text: "Cutting, bending and forming of sheet metal into enclosures, covers and brackets.",
      points: ["Sheet cutting", "Bending and forming", "Custom enclosures"],
      detail: "Sheet metal work suits enclosures, panels, covers, trays and brackets. Share flat or 3D drawings, sheet thickness and finish requirements for review."
    },
    {
      title: "Custom Engineering",
      image: "1769147339214-076740872485",
      alt: "Machined metal parts resting on engineering blueprints",
      text: "Made-to-order solutions developed from your drawings, samples or ideas.",
      points: ["Prototype components", "Made-to-order products", "Customized industrial solutions"],
      detail: "For requirements that don't fit a standard category, we start with a discussion of the application, then review drawings or samples to suggest a practical manufacturing approach."
    }
  ];

  /* ------------------------------------------------------------------
     Data: products (fictional demonstration entries)
     ------------------------------------------------------------------ */
  const PRODUCTS = [
    {
      id: "machined-components", name: "Precision Machined Components", category: "Machined Parts", filter: "Machined Parts",
      image: "1723632670536-e3104577a19c", alt: "Machined aluminium components on a workbench",
      short: "Drawing-based machined parts for machinery and equipment.",
      material: "Steel / Aluminium (sample)", application: "Industrial machinery",
      description: "Machined components produced to customer drawings, such as housings, blocks, spacers and fittings. Operations can include turning, milling, drilling and finishing depending on the part.",
      materials: ["Mild steel", "Alloy steel", "Aluminium", "Stainless steel"],
      custom: ["Dimensions as per drawing", "Hole and thread features", "Surface finish requirements", "Batch or repeat quantities"]
    },
    {
      id: "metal-brackets", name: "Industrial Metal Brackets", category: "Fabricated Components", filter: "Fabrication",
      image: "1564182842834-681b7be6de4b", alt: "Fabricator measuring a metal frame in a workshop",
      short: "Fabricated brackets for mounting equipment and sub-assemblies.",
      material: "Mild Steel (sample)", application: "Equipment mounting",
      description: "Mounting brackets, clamps and supports made by cutting, bending, drilling and welding. Designed around the load, fixing points and space available in your equipment.",
      materials: ["Mild steel", "Stainless steel", "Galvanised sheet"],
      custom: ["Hole patterns and slots", "Bent or welded construction", "Painted or coated finish", "Custom thickness"]
    },
    {
      id: "steel-shafts", name: "Custom Steel Shafts", category: "Turned Components", filter: "Turned Components",
      image: "1758873263428-f4b2edb45fe1", alt: "Rows of turned metal components on a textured surface",
      short: "Turned shafts and pins for mechanical assemblies.",
      material: "Alloy Steel (sample)", application: "Mechanical assemblies",
      description: "Shafts, pins and spindles turned to required diameters and lengths, with features such as steps, keyways, grooves and threads as per drawing.",
      materials: ["EN-series alloy steel", "Mild steel", "Stainless steel"],
      custom: ["Diameters and lengths", "Keyways and grooves", "Threaded ends", "Heat treatment (on request, via review)"]
    },
    {
      id: "sheet-enclosures", name: "Sheet Metal Enclosures", category: "Sheet Metal", filter: "Sheet Metal",
      image: "1564363748063-d52dc96f039a", alt: "Grey sheet metal enclosures mounted on a wall",
      short: "Enclosures and cabinets for electrical and industrial equipment.",
      material: "Sheet Metal (sample)", application: "Industrial electrical equipment",
      description: "Boxes, cabinets, covers and panels made from cut and bent sheet metal, with cut-outs, mounting plates and doors as needed by the application.",
      materials: ["CRCA sheet", "Galvanised sheet", "Stainless steel sheet", "Aluminium sheet"],
      custom: ["Size and thickness", "Cut-outs and ventilation", "Doors, hinges and locks", "Powder-coated finish"]
    },
    {
      id: "welded-frames", name: "Welded Metal Frames", category: "Fabrication", filter: "Fabrication",
      image: "1745162391671-244e8d3ccd5f", alt: "Steel beams and structural frame members",
      short: "Welded frames and stands for machines and structures.",
      material: "Structural Steel (sample)", application: "Industrial support structures",
      description: "Base frames, machine stands, platforms and support structures fabricated from sections, tubes and plates, welded and finished to suit the application.",
      materials: ["Structural steel sections", "MS tubes and pipes", "MS plates"],
      custom: ["Overall size and layout", "Mounting plates and holes", "Levelling pads or castors", "Primer and paint finish"]
    },
    {
      id: "machine-parts", name: "Custom Machine Parts", category: "Custom Components", filter: "Custom Components",
      image: "1780034766267-cf76b8484212", alt: "Assorted machined parts and blueprints on a table",
      short: "Replacement and custom parts made from drawings or samples.",
      material: "Based on requirement", application: "Industrial machinery",
      description: "Parts for new machines or replacements for existing ones, made from customer drawings or, where suitable, by reviewing a sample part.",
      materials: ["Selected after review", "Steel, aluminium, brass and more"],
      custom: ["Drawing or sample based", "Single pieces or batches", "Combined machining and fabrication", "Assembly support"]
    },
    {
      id: "flanges", name: "Industrial Flanges", category: "Machined Parts", filter: "Machined Parts",
      image: "1548683726-203119be6a39", alt: "Group of metal flanges arranged on a table",
      short: "Machined flanges for pipe and equipment connections.",
      material: "Steel (sample)", application: "Industrial connections",
      description: "Flanges machined to the required outer diameter, bore, PCD and hole pattern for connecting pipes, shafts or equipment.",
      materials: ["Mild steel", "Stainless steel", "Alloy steel"],
      custom: ["OD, ID and thickness", "Bolt hole pattern", "Face finish", "Custom (non-standard) designs"]
    },
    {
      id: "metal-assemblies", name: "Custom Metal Assemblies", category: "Fabrication", filter: "Fabrication",
      image: "1655103954950-bf0f41b107b8", alt: "Worker handling a machined metal component",
      short: "Combined machined and fabricated assemblies, ready to fit.",
      material: "Based on requirement", application: "Equipment assemblies",
      description: "Assemblies that bring together machined parts, fabricated structures and fasteners, supplied as sub-assemblies for your equipment.",
      materials: ["Selected after review"],
      custom: ["Machined + fabricated parts", "Fit-up and assembly", "Finishing and marking", "Packing for dispatch"]
    }
  ];

  /* ------------------------------------------------------------------
     Data: projects (sample portfolio work)
     ------------------------------------------------------------------ */
  const PROJECTS = [
    {
      title: "Custom Industrial Machine Frame", industry: "Industrial Machinery",
      image: "1717386255773-a456c611dc4e", alt: "Machine frames and control panel in an industrial facility",
      short: "A welded base frame designed to carry a machine and its control equipment.",
      scope: ["Drawing review and material planning", "Cutting and welding of structural sections", "Machining of mounting pads", "Primer and paint finish"],
      outcome: "Frame prepared according to the agreed drawing, inspected for key dimensions and finish before dispatch."
    },
    {
      title: "Precision Aluminium Components", industry: "General Manufacturing",
      image: "1780034766288-9b436534d428", alt: "Machined aluminium parts on technical drawings",
      short: "A batch of machined aluminium parts produced from customer drawings.",
      scope: ["Technical review of drawings", "CNC machining operations", "Deburring and finishing", "Dimensional checks"],
      outcome: "Components machined and checked against the drawing, then packed to protect the finish."
    },
    {
      title: "Sheet Metal Enclosure Project", industry: "Electrical Equipment",
      image: "1544724569-5f546fd6f2b5", alt: "Electrical switch box with circuit breakers",
      short: "Sheet metal enclosures with cut-outs and mounting plates for electrical equipment.",
      scope: ["Sheet cutting and bending", "Cut-outs for components", "Hinged door and mounting plate", "Powder-coated finish"],
      outcome: "Enclosures built to the layout shared by the customer and reviewed visually and dimensionally."
    },
    {
      title: "Agricultural Equipment Components", industry: "Agriculture & Farm Equipment",
      image: "1530267981375-f0de937f5f13", alt: "Tractor working in an agricultural field",
      short: "Brackets and turned parts for a farm implement application.",
      scope: ["Fabricated mounting brackets", "Turned pins and bushes", "Drilling and assembly fit-up", "Paint finish"],
      outcome: "Parts manufactured as per sample and drawing, and checked for fit before delivery."
    },
    {
      title: "Custom Steel Fabrication", industry: "Construction & Infrastructure",
      image: "1564182998523-6923112e7d6b", alt: "Angle grinder cutting steel with sparks",
      short: "Custom steel structures fabricated for a site requirement.",
      scope: ["Requirement discussion and site dimensions", "Cutting, welding and grinding", "Surface preparation", "Coordination of delivery"],
      outcome: "Structure fabricated in sections for easier transport and installation on site."
    },
    {
      title: "Industrial Equipment Assembly", industry: "Commercial Equipment",
      image: "1717386255773-1e3037c81788", alt: "Large industrial machine assembly inside a building",
      short: "A sub-assembly combining machined parts and a fabricated structure.",
      scope: ["Machined and fabricated parts", "Assembly and alignment", "Functional fit check", "Packing for dispatch"],
      outcome: "Sub-assembly delivered ready for integration into the customer's equipment."
    }
  ];

  /* ------------------------------------------------------------------
     Data: testimonials (fictional sample reviews)
     ------------------------------------------------------------------ */
  const TESTIMONIALS = [
    { name: "Rahul Patil", org: "Agricultural equipment manufacturer (sample)", rating: 5, text: "The team took time to understand our drawings and suggested a practical change that made the brackets easier to fabricate. Communication was clear throughout." },
    { name: "Sneha Kulkarni", org: "Electrical panel maker (sample)", rating: 5, text: "We needed sheet metal enclosures with specific cut-outs. They reviewed the layout with us before starting, and the finished enclosures matched what we discussed." },
    { name: "Amit Deshmukh", org: "Industrial machinery workshop (sample)", rating: 4, text: "Good support for small-batch turned parts. They were upfront about what was feasible and kept us updated on progress." },
    { name: "Vikram Jadhav", org: "Fabrication contractor (sample)", rating: 5, text: "Helpful for a custom frame requirement where we only had rough dimensions. They helped convert it into a workable drawing first." }
  ];

  /* ------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const openWhatsApp = (message) => {
    const msg = encodeURIComponent(message);
    const url = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}` : `https://wa.me/?text=${msg}`;
    window.open(url, "_blank", "noopener");
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ------------------------------------------------------------------
     1. Render capabilities
     ------------------------------------------------------------------ */
  const capGrid = $("#capGrid");
  capGrid.innerHTML = CAPABILITIES.map((c, i) => `
    <article class="cap-card reveal">
      <div class="cap-card__media">
        <img src="${img(c.image, 800)}" alt="${esc(c.alt)}" loading="lazy" width="800" height="500">
        <span class="cap-card__no mono"><b>0${i + 1}</b> / CAPABILITY</span>
      </div>
      <div class="cap-card__body">
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.text)}</p>
        <ul class="cap-card__list">${c.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        <button type="button" class="cap-card__more" data-cap="${i}" aria-label="Learn more about ${esc(c.title)}">Learn More <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
      </div>
    </article>`).join("");

  /* ------------------------------------------------------------------
     2. Render products + filtering
     ------------------------------------------------------------------ */
  const productGrid = $("#productGrid");
  productGrid.innerHTML = PRODUCTS.map((p) => `
    <article class="prod-card" data-category="${esc(p.filter)}">
      <div class="prod-card__media">
        <img src="${img(p.image, 640)}" alt="${esc(p.alt)}" loading="lazy" width="640" height="480">
        <span class="prod-card__cat">${esc(p.category)}</span>
      </div>
      <div class="prod-card__body">
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.short)}</p>
        <dl class="prod-meta">
          <div><dt>Material</dt><dd>${esc(p.material)}</dd></div>
          <div><dt>Application</dt><dd>${esc(p.application)}</dd></div>
        </dl>
        <p class="prod-price"><i class="fa-solid fa-tag" aria-hidden="true"></i> Enquire for Pricing</p>
        <div class="prod-card__actions">
          <button type="button" class="btn btn--outline" data-product="${p.id}">View Details</button>
          <button type="button" class="btn btn--accent" data-quote="${esc(p.name)}">Request a Quote</button>
        </div>
      </div>
    </article>`).join("");

  // Product names as suggestions in the RFQ form
  $("#productList").innerHTML = PRODUCTS.map((p) => `<option value="${esc(p.name)}">`).join("");

  const filterBtns = $$(".filter");
  const filterCount = $("#filterCount");
  const applyFilter = (filter) => {
    let shown = 0;
    $$(".prod-card", productGrid).forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.hidden = !match;
      if (match) {
        shown++;
        card.style.animation = "none";
        void card.offsetWidth; // restart entrance animation
        card.style.animation = "";
      }
    });
    filterBtns.forEach((b) => {
      const active = b.dataset.filter === filter;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    filterCount.textContent = `Showing ${shown} of ${PRODUCTS.length} sample products`;
  };
  filterBtns.forEach((b) => b.addEventListener("click", () => applyFilter(b.dataset.filter)));
  applyFilter("all");

  // Footer category links pre-select a filter
  $$("[data-filter-link]").forEach((a) => a.addEventListener("click", () => applyFilter(a.dataset.filterLink)));

  /* ------------------------------------------------------------------
     3. Render projects
     ------------------------------------------------------------------ */
  $("#projectGrid").innerHTML = PROJECTS.map((p, i) => `
    <article class="proj-card reveal">
      <div class="proj-card__media">
        <img src="${img(p.image, 760)}" alt="${esc(p.alt)}" loading="lazy" width="760" height="520">
        <span class="proj-card__badge">Sample project</span>
      </div>
      <div class="proj-card__body">
        <p class="proj-card__ind">${esc(p.industry)}</p>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.short)}</p>
        <button type="button" class="btn btn--outline" data-project="${i}">View Project <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
      </div>
    </article>`).join("");

  /* ------------------------------------------------------------------
     4. Modal (shared by products, projects and capabilities)
     ------------------------------------------------------------------ */
  const modal = $("#modal");
  const modalContent = $("#modalContent");
  let lastFocus = null;

  const openModal = (html, title) => {
    lastFocus = document.activeElement;
    modalContent.innerHTML = html;
    modal.setAttribute("aria-label", title);
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    $(".modal__dialog", modal).scrollTop = 0;
    $(".modal__close", modal).focus();
  };
  const closeModal = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    modalContent.innerHTML = "";
    if (lastFocus) lastFocus.focus();
  };

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeModal();
    const q = e.target.closest("[data-modal-quote]");
    if (q) { closeModal(); goToQuote(q.dataset.modalQuote); }
    const w = e.target.closest("[data-modal-wa]");
    if (w) openWhatsApp(w.dataset.modalWa);
  });
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") { // simple focus trap
      const f = $$("button, a[href], input, select, textarea", modal).filter((el) => !el.disabled && el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  const productModal = (p) => `
    <div class="md">
      <div class="md__media"><img src="${img(p.image, 1000, 75)}" alt="${esc(p.alt)}"><span class="tag">Demo product</span></div>
      <div class="md__body">
        <p class="md__cat">${esc(p.category)}</p>
        <h2 id="modalTitle">${esc(p.name)}</h2>
        <p>${esc(p.description)}</p>
        <dl class="md__specs">
          <div><dt>Category</dt><dd>${esc(p.category)}</dd></div>
          <div><dt>Typical application</dt><dd>${esc(p.application)}</dd></div>
          <div><dt>Material (sample)</dt><dd>${esc(p.material)}</dd></div>
          <div><dt>Pricing</dt><dd>Enquire for Pricing</dd></div>
        </dl>
        <h3 class="md__h">Material options (sample)</h3>
        <ul class="md__list">${p.materials.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
        <h3 class="md__h">Customization possibilities</h3>
        <ul class="md__list">${p.custom.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
        <p class="md__note"><i class="fa-solid fa-circle-info" aria-hidden="true"></i><span>Final specifications and material suitability depend on engineering review and customer requirements. Product details shown are fictional demonstration content.</span></p>
        <div class="md__actions">
          <button type="button" class="btn btn--accent" data-modal-quote="${esc(p.name)}">Request a Quote <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
          <button type="button" class="btn btn--wa" data-modal-wa="${esc(`Hello PRECISION WORKS, I would like to enquire about: ${p.name}.`)}"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp Enquiry</button>
        </div>
      </div>
    </div>`;

  const projectModal = (p) => `
    <div class="md">
      <div class="md__media"><img src="${img(p.image, 1000, 75)}" alt="${esc(p.alt)}"><span class="tag">Sample portfolio work</span></div>
      <div class="md__body">
        <p class="md__cat">${esc(p.industry)}</p>
        <h2 id="modalTitle">${esc(p.title)}</h2>
        <p>${esc(p.short)}</p>
        <h3 class="md__h">Scope of work (sample)</h3>
        <ul class="md__list">${p.scope.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
        <h3 class="md__h">Outcome</h3>
        <p>${esc(p.outcome)}</p>
        <p class="md__note"><i class="fa-solid fa-circle-info" aria-hidden="true"></i><span>This is a fictional sample project used for demonstration. It does not represent work for a real customer.</span></p>
        <div class="md__actions">
          <button type="button" class="btn btn--accent" data-modal-quote="${esc(p.title)}">Request a Similar Quote <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
          <button type="button" class="btn btn--outline" data-close>Close</button>
        </div>
      </div>
    </div>`;

  const capabilityModal = (c) => `
    <div class="md">
      <div class="md__media"><img src="${img(c.image, 1000, 75)}" alt="${esc(c.alt)}"><span class="tag">Sample capability</span></div>
      <div class="md__body">
        <p class="md__cat">Manufacturing capability</p>
        <h2 id="modalTitle">${esc(c.title)}</h2>
        <p>${esc(c.detail)}</p>
        <h3 class="md__h">Typical work</h3>
        <ul class="md__list">${c.points.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
        <p class="md__note"><i class="fa-solid fa-circle-info" aria-hidden="true"></i><span>Capabilities are sample offerings and can be edited to match the real business.</span></p>
        <div class="md__actions">
          <button type="button" class="btn btn--accent" data-modal-quote="${esc(c.title)} requirement">Request a Quote <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
          <button type="button" class="btn btn--wa" data-modal-wa="${esc(`Hello PRECISION WORKS, I have a ${c.title} requirement.`)}"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp</button>
        </div>
      </div>
    </div>`;

  /* ------------------------------------------------------------------
     5. Request-a-Quote shortcut: scroll to RFQ and prefill product
     ------------------------------------------------------------------ */
  const rfqProduct = $("#rfqProduct");
  const goToQuote = (productName) => {
    if (productName) {
      rfqProduct.value = productName;
      rfqProduct.closest(".field").classList.remove("has-error");
      $(".field__error", rfqProduct.closest(".field")).textContent = "";
    }
    scrollToId("rfq");
    setTimeout(() => $("#rfqCompany").focus({ preventScroll: true }), 650);
  };

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-product], [data-quote], [data-project], [data-cap]");
    if (!t) return;
    if (t.dataset.product) {
      const p = PRODUCTS.find((x) => x.id === t.dataset.product);
      openModal(productModal(p), p.name);
    } else if (t.dataset.quote) {
      goToQuote(t.dataset.quote);
    } else if (t.dataset.project) {
      const p = PROJECTS[+t.dataset.project];
      openModal(projectModal(p), p.title);
    } else if (t.dataset.cap) {
      const c = CAPABILITIES[+t.dataset.cap];
      openModal(capabilityModal(c), c.title);
    }
  });

  /* ------------------------------------------------------------------
     6. Header: sticky shadow, mobile menu, active nav state
     ------------------------------------------------------------------ */
  const header = $("#header");
  const nav = $("#nav");
  const hamburger = $("#hamburger");
  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  document.body.appendChild(overlay);

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    overlay.classList.toggle("is-open", open);
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("no-scroll", open);
  };
  hamburger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  overlay.addEventListener("click", () => setMenu(false));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); hamburger.focus(); } });
  window.matchMedia("(min-width: 1025px)").addEventListener("change", (m) => { if (m.matches) setMenu(false); });

  const navLinks = $$(".nav__link");
  const sections = $$("main > section[id]");
  const toTop = $("#toTop");

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 10);
    toTop.classList.toggle("is-visible", y > 700);

    // Active nav: the section currently under the header
    const probe = y + header.offsetHeight + 120;
    let current = sections[0].id;
    sections.forEach((s) => { if (s.offsetTop <= probe) current = s.id; });
    if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) current = "contact";
    navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${current}`));
  };
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(() => { onScroll(); ticking = false; }); ticking = true; }
  }, { passive: true });
  onScroll();

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ------------------------------------------------------------------
     7. Scroll reveal
     ------------------------------------------------------------------ */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 60}ms`;
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ------------------------------------------------------------------
     8. FAQ accordion (one open at a time)
     ------------------------------------------------------------------ */
  $$(".acc-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".acc-item");
      const open = !item.classList.contains("is-open");
      $$(".acc-item.is-open").forEach((it) => {
        it.classList.remove("is-open");
        $(".acc-btn", it).setAttribute("aria-expanded", "false");
      });
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ------------------------------------------------------------------
     9. Testimonials carousel
     ------------------------------------------------------------------ */
  const track = $("#testimonialTrack");
  const dots = $("#testiDots");
  track.innerHTML = TESTIMONIALS.map((t, i) => `
    <figure class="testi" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${TESTIMONIALS.length}">
      <span class="tag tag--demo testi__demo">Sample review</span>
      <div class="testi__stars" aria-label="${t.rating} out of 5 stars">${"★".repeat(t.rating)}${"☆".repeat(5 - t.rating)}</div>
      <blockquote>${esc(t.text)}</blockquote>
      <figcaption class="testi__who">
        <span class="testi__avatar" aria-hidden="true">${t.name.split(" ").map((n) => n[0]).join("")}</span>
        <div><strong>${esc(t.name)}</strong><span>${esc(t.org)}</span></div>
      </figcaption>
    </figure>`).join("");
  dots.innerHTML = TESTIMONIALS.map((_, i) => `<button type="button" class="carousel__dot" role="tab" aria-label="Show testimonial ${i + 1}" aria-selected="${i === 0}"></button>`).join("");

  let slide = 0;
  let autoTimer = null;
  const slides = $$(".testi", track);
  const goTo = (i) => {
    slide = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${slide * 100}%)`;
    slides.forEach((s, k) => s.setAttribute("aria-hidden", String(k !== slide)));
    $$(".carousel__dot", dots).forEach((d, k) => d.setAttribute("aria-selected", String(k === slide)));
  };
  const startAuto = () => {
    stopAuto();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) autoTimer = setInterval(() => goTo(slide + 1), 6500);
  };
  const stopAuto = () => clearInterval(autoTimer);
  $("#testiPrev").addEventListener("click", () => { goTo(slide - 1); startAuto(); });
  $("#testiNext").addEventListener("click", () => { goTo(slide + 1); startAuto(); });
  $$(".carousel__dot", dots).forEach((d, i) => d.addEventListener("click", () => { goTo(i); startAuto(); }));
  const carousel = $("#testimonialCarousel");
  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);
  carousel.addEventListener("focusin", stopAuto);
  // Touch swipe
  let touchX = null;
  track.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  track.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) goTo(slide + (dx < 0 ? 1 : -1));
    touchX = null; startAuto();
  });
  goTo(0);
  startAuto();

  /* ------------------------------------------------------------------
     10. WhatsApp buttons
     ------------------------------------------------------------------ */
  $$(".js-whatsapp").forEach((btn) => btn.addEventListener("click", () => {
    openWhatsApp(btn.dataset.waMessage || "Hello PRECISION WORKS, I have an enquiry.");
  }));

  /* ------------------------------------------------------------------
     11. Form validation (shared)
     ------------------------------------------------------------------ */
  const MOBILE_RE = /^(?:\+?91|0)?[6-9]\d{9}$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const validateField = (el) => {
    const field = el.closest(".field");
    const errEl = field && $(".field__error", field);
    const val = el.value.trim();
    let msg = "";
    if (el.required && !val) msg = "This field is required.";
    else if (val && el.dataset.validate === "mobile" && !MOBILE_RE.test(val.replace(/[\s-]/g, ""))) msg = "Enter a valid 10-digit Indian mobile number (starting with 6–9).";
    else if (val && el.dataset.validate === "email" && !EMAIL_RE.test(val)) msg = "Enter a valid email address.";
    else if (val && el.type === "number" && (+val < 1 || !Number.isFinite(+val))) msg = "Enter a quantity of 1 or more.";
    if (field) field.classList.toggle("has-error", !!msg);
    if (errEl) errEl.textContent = msg;
    el.setAttribute("aria-invalid", String(!!msg));
    if (errEl && msg) {
      if (!errEl.id) errEl.id = `${el.id}-err`;
      el.setAttribute("aria-describedby", errEl.id);
    }
    return !msg;
  };

  const wireForm = (form, onValid) => {
    const inputs = $$("input:not([type=file]), select, textarea", form).filter((el) => el.required || el.dataset.validate);
    inputs.forEach((el) => {
      el.addEventListener("blur", () => validateField(el));
      el.addEventListener("input", () => { if (el.closest(".field").classList.contains("has-error")) validateField(el); });
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const results = inputs.map(validateField);
      const extraOk = form.dataset.extraValid !== "false";
      if (results.every(Boolean) && extraOk) onValid(form);
      else {
        const firstBad = inputs.find((el) => el.getAttribute("aria-invalid") === "true");
        if (firstBad) firstBad.focus();
      }
    });
  };

  /* ------------------------------------------------------------------
     12. RFQ file selection (local only — nothing is uploaded)
     ------------------------------------------------------------------ */
  const fileInput = $("#rfqFiles");
  const fileList = $("#fileList");
  const fileError = $("#fileError");
  const dropzone = $("#dropzone");
  let selectedFiles = [];

  const fileIcon = (ext) => ({ pdf: "fa-regular fa-file-pdf", jpg: "fa-regular fa-file-image", jpeg: "fa-regular fa-file-image", png: "fa-regular fa-file-image" }[ext] || "fa-solid fa-compass-drafting");
  const fmtSize = (b) => (b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`);

  const renderFiles = () => {
    fileList.innerHTML = selectedFiles.map((f, i) => {
      const ext = f.name.split(".").pop().toLowerCase();
      return `<li class="file-item">
        <span class="file-item__ic"><i class="${fileIcon(ext)}" aria-hidden="true"></i></span>
        <span class="file-item__meta"><span class="file-item__name" title="${esc(f.name)}">${esc(f.name)}</span><span class="file-item__size">${fmtSize(f.size)} · selected locally</span></span>
        <span class="file-item__ext">${esc(ext.toUpperCase())}</span>
        <button type="button" class="file-item__rm" data-rm="${i}" aria-label="Remove ${esc(f.name)}"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
      </li>`;
    }).join("");
  };

  const addFiles = (files) => {
    const errors = [];
    [...files].forEach((f) => {
      const ext = f.name.includes(".") ? f.name.split(".").pop().toLowerCase() : "";
      if (!ALLOWED_EXT.includes(ext)) errors.push(`"${f.name}" is not an allowed file type.`);
      else if (f.size > MAX_FILE_MB * 1024 * 1024) errors.push(`"${f.name}" is larger than ${MAX_FILE_MB} MB.`);
      else if (selectedFiles.some((s) => s.name === f.name && s.size === f.size)) errors.push(`"${f.name}" is already selected.`);
      else if (selectedFiles.length >= MAX_FILES) errors.push(`You can attach up to ${MAX_FILES} files.`);
      else selectedFiles.push(f);
    });
    fileError.textContent = errors.length ? `${[...new Set(errors)].join(" ")} Allowed: PDF, JPG, PNG, DXF, DWG, STEP, STP.` : "";
    renderFiles();
    fileInput.value = ""; // allow re-selecting the same file after removal
  };

  fileInput.addEventListener("change", () => addFiles(fileInput.files));
  fileList.addEventListener("click", (e) => {
    const rm = e.target.closest("[data-rm]");
    if (!rm) return;
    selectedFiles.splice(+rm.dataset.rm, 1);
    fileError.textContent = "";
    renderFiles();
  });
  ["dragenter", "dragover"].forEach((ev) => dropzone.addEventListener(ev, (e) => { e.preventDefault(); dropzone.classList.add("is-drag"); }));
  ["dragleave", "drop"].forEach((ev) => dropzone.addEventListener(ev, (e) => { e.preventDefault(); dropzone.classList.remove("is-drag"); }));
  dropzone.addEventListener("drop", (e) => { if (e.dataTransfer && e.dataTransfer.files.length) addFiles(e.dataTransfer.files); });

  /* ------------------------------------------------------------------
     13. Wire up RFQ + Enquiry forms (demo confirmation only)
     ------------------------------------------------------------------ */
  wireForm($("#rfqForm"), (form) => {
    const data = new FormData(form);
    const box = $("#rfqSuccess");
    const fileNote = selectedFiles.length
      ? `${selectedFiles.length} drawing file(s) were selected locally and were not uploaded.`
      : "No drawing files were attached.";
    box.innerHTML = `
      <h4><i class="fa-solid fa-circle-check" aria-hidden="true"></i> RFQ details validated (demo)</h4>
      <p>Thank you, ${esc(data.get("contact"))}. This is a demonstration website, so <strong>no quotation request has been sent</strong> and no data has been stored. On a live website, the PRECISION WORKS team would review your requirement and contact you.</p>
      <ul>
        <li><strong>Company:</strong> ${esc(data.get("company"))}</li>
        <li><strong>Component:</strong> ${esc(data.get("product"))} · Qty ${esc(data.get("quantity"))}</li>
        <li><strong>Files:</strong> ${esc(fileNote)}</li>
      </ul>`;
    box.hidden = false;
    box.focus();
    form.reset();
    selectedFiles = [];
    renderFiles();
    fileError.textContent = "";
  });

  wireForm($("#enquiryForm"), (form) => {
    const data = new FormData(form);
    const box = $("#enquirySuccess");
    box.innerHTML = `
      <h4><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Enquiry validated (demo)</h4>
      <p>Thank you, ${esc(data.get("name"))}. Your ${esc(data.get("service"))} enquiry passed validation. As this is a frontend-only demo, nothing has been sent or stored.</p>`;
    box.hidden = false;
    box.focus();
    form.reset();
  });
})();
