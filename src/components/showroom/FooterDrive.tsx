export function FooterDrive() {
  return (
    <section
      aria-hidden="true"
      className="footer-drive relative overflow-hidden border-t border-line/60"
    >
      <div className="footer-drive__glow" />
      <div className="container relative py-8 md:py-10">
        <div className="footer-drive__scene">
          <div className="footer-drive__sky">
            <span className="footer-drive__sun" />
            <span className="footer-drive__cloud footer-drive__cloud--one" />
            <span className="footer-drive__cloud footer-drive__cloud--two" />
            <div className="footer-drive__birds">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="footer-drive__mountains">
            <span className="footer-drive__mountain footer-drive__mountain--back footer-drive__mountain--one" />
            <span className="footer-drive__mountain footer-drive__mountain--back footer-drive__mountain--two" />
            <span className="footer-drive__mountain footer-drive__mountain--front footer-drive__mountain--three" />
            <span className="footer-drive__mountain footer-drive__mountain--front footer-drive__mountain--four" />
          </div>

          <div className="footer-drive__forest">
            <span className="footer-drive__tree footer-drive__tree--one" />
            <span className="footer-drive__tree footer-drive__tree--two" />
            <span className="footer-drive__tree footer-drive__tree--three" />
            <span className="footer-drive__tree footer-drive__tree--four" />
            <span className="footer-drive__tree footer-drive__tree--five" />
            <span className="footer-drive__tree footer-drive__tree--six" />
          </div>

          <div className="footer-drive__river">
            <span className="footer-drive__river-shine" />
            <div className="footer-drive__animals">
              <div className="footer-drive__animal footer-drive__animal--deer">
                <span className="footer-drive__animal-body" />
                <span className="footer-drive__animal-head" />
                <span className="footer-drive__animal-leg footer-drive__animal-leg--one" />
                <span className="footer-drive__animal-leg footer-drive__animal-leg--two" />
                <span className="footer-drive__animal-leg footer-drive__animal-leg--three" />
                <span className="footer-drive__animal-leg footer-drive__animal-leg--four" />
              </div>
              <div className="footer-drive__animal footer-drive__animal--deer footer-drive__animal--small">
                <span className="footer-drive__animal-body" />
                <span className="footer-drive__animal-head" />
                <span className="footer-drive__animal-leg footer-drive__animal-leg--one" />
                <span className="footer-drive__animal-leg footer-drive__animal-leg--two" />
                <span className="footer-drive__animal-leg footer-drive__animal-leg--three" />
                <span className="footer-drive__animal-leg footer-drive__animal-leg--four" />
              </div>
            </div>
          </div>

          <div className="footer-drive__road">
            <span className="footer-drive__lane-markers" />
            <div className="footer-drive__car">
              <span className="footer-drive__car-shadow" />
              <svg
                viewBox="0 0 420 170"
                className="footer-drive__car-svg"
                role="presentation"
              >
                <defs>
                  <linearGradient id="footer-car-body" x1="42" y1="32" x2="366" y2="136" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#102534" />
                    <stop offset="0.48" stopColor="#2F6176" />
                    <stop offset="1" stopColor="#7FD0E3" />
                  </linearGradient>
                  <linearGradient id="footer-car-glass" x1="104" y1="44" x2="256" y2="96" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E5F8FF" />
                    <stop offset="1" stopColor="#88BDD5" />
                  </linearGradient>
                </defs>
                <path d="M60 112C77 76 123 55 172 55H265C307 55 345 73 365 103L388 132H39L60 112Z" fill="url(#footer-car-body)" />
                <path d="M135 56L181 23H258L319 56H135Z" fill="#ECF6FB" fillOpacity="0.95" />
                <path d="M190 30H246L289 55H152L190 30Z" fill="url(#footer-car-glass)" fillOpacity="0.92" />
                <circle cx="132" cy="131" r="26" fill="#0E1721" />
                <circle cx="132" cy="131" r="12" fill="#DDE7EE" />
                <circle cx="303" cy="131" r="26" fill="#0E1721" />
                <circle cx="303" cy="131" r="12" fill="#DDE7EE" />
                <rect x="354" y="91" width="28" height="9" rx="4.5" fill="#FFF5B3" />
                <rect x="64" y="96" width="16" height="8" rx="4" fill="#FF7B6F" />
              </svg>
              <span className="footer-drive__light footer-drive__light--head" />
              <span className="footer-drive__light footer-drive__light--tail" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
