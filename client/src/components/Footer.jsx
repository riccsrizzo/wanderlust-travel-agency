// src/components/Footer.jsx
export function Footer() {
  return (
    <footer id="about" className="footer bg-[#090d16] text-[#64748b] py-8 text-[0.9rem]">
      <div className="max-w-full mx-auto px-6 sm:px-10 lg:px-16 footer-content flex flex-wrap justify-between items-center gap-4">
        <p>&copy; 2026 Wanderlust Travel Agency. All rights reserved.</p>
        <ul className="footer-links flex gap-6 list-none m-0 p-0">
          <li>
            <a
              href="#hero"
              className="text-[#64748b] no-underline transition-colors duration-200 hover:text-white"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#hero"
              className="text-[#64748b] no-underline transition-colors duration-200 hover:text-white"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="#hero"
              className="text-[#64748b] no-underline transition-colors duration-200 hover:text-white"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
