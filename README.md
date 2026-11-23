# PRECISION WORKS – Manufacturing & Engineering Workshop Demo

**Live demo:** https://precisionworks-demo.pages.dev

A premium, responsive single-page B2B website for a **fictional** manufacturing and engineering workshop based in Sangli, Maharashtra, India.

*Engineering Precision. Delivering Excellence.*

Built with plain **HTML5, CSS3 and vanilla JavaScript** (plus Font Awesome and Google Fonts from CDNs): no frameworks, no build step and no backend. Open `index.html` in a browser to run it.

> ⚠️ **Demo content notice**
> All business information, product details, specifications, machinery, capabilities, projects, testimonials and contact details are **fictional demonstration content**. PRECISION WORKS is not a real company. Testimonials are sample text, not genuine customer endorsements. Machinery is illustrative, with no brands, models or capacities claimed. No certifications, tolerances or delivery guarantees are claimed. Photos are from Unsplash and do not depict a real workshop or real projects.

## Structure

```
precision-works/
├── index.html        # All sections, SEO meta, Open Graph, LocalBusiness JSON-LD (placeholders)
├── css/style.css     # Design tokens (CSS variables), layout, components, responsive rules
├── js/script.js      # Capabilities, products, projects, testimonials data + all interactions
└── assets/images/    # Favicon (add client photos/logo here)
```

## Sections

Top bar · Sticky header · Hero · Company introduction · Manufacturing capabilities · Product catalogue with filters · Industries · Machinery & infrastructure · Why choose us · Manufacturing process timeline · Custom manufacturing · **RFQ with drawing selection** · Quality & inspection · Project showcase · Testimonials carousel · FAQ · Business enquiry · Contact & map · Final CTA · Footer

## Features

- Sticky navigation with active-section highlighting and a mobile slide-in menu
- Product category filtering (All, Machined Parts, Fabrication, Sheet Metal, Turned Components, Custom Components)
- Product details, project details and capability "Learn More" modals (Esc / backdrop close, focus trap)
- "Request a Quote" buttons scroll to the RFQ form and prefill the component name
- RFQ form with validation and a drag-and-drop drawing picker (PDF, JPG/PNG, DXF/DWG, STEP/STP): file-name display, extension, size and count validation. **Files are only selected locally and never uploaded.**
- Business enquiry form with required-field, Indian mobile number and email validation
- Demo-only confirmation messages (nothing is sent or stored)
- WhatsApp buttons with prefilled messages
- FAQ accordion, testimonial carousel (buttons, dots, swipe, auto-play), scroll reveal, back-to-top button
- Horizontal process timeline on desktop, vertical on tablet/mobile
- Lazy-loaded images, semantic HTML, accessible labels, `prefers-reduced-motion` support

## Customising

- **Contact details:** replace the `+91 XXXXX XXXXX`, `info@example.com`, address and hours placeholders in `index.html`, and update the JSON-LD block.
- **WhatsApp:** set `WHATSAPP_NUMBER` at the top of `js/script.js` (e.g. `"919XXXXXXXXX"`).
- **Products, capabilities, projects, testimonials:** edit the arrays at the top of `js/script.js`.
- **Colours & fonts:** edit the CSS variables in `:root` in `css/style.css`.
- **Map:** replace the Google Maps embed `src` with the real workshop location.
- **Forms:** connect the RFQ and enquiry forms to a backend or form service before going live.
