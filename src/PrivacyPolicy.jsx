import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Lock, 
  Eye, 
  ShieldCheck, 
  Database, 
  Share2, 
  HelpCircle, 
  Trash2, 
  Mail, 
  Globe, 
  RefreshCw,
  Camera,
  MessageCircle
} from 'lucide-react';
import orvianLogo from './assets/orvian-logo.png';

const sections = [
  { id: 'introduction', label: '1. Introduction' },
  { id: 'information-collect', label: '2. Information We Collect' },
  { id: 'how-use-information', label: '3. How We Use Information' },
  { id: 'data-sharing', label: '4. Data Sharing' },
  { id: 'data-storage', label: '5. Data Storage & Security' },
  { id: 'third-party', label: '6. Third-Party Services' },
  { id: 'user-rights', label: '7. User Rights' },
  { id: 'data-retention', label: '8. Data Retention' },
  { id: 'contact-info', label: '9. Contact Information' },
  { id: 'changes-policy', label: '10. Changes to This Policy' }
];

function PrivacyPolicy({ navigateTo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // Account for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="privacy-page-wrapper">
      <div className="bg-glow" style={{ top: '-10%', left: '-10%' }}></div>
      <div className="bg-glow" style={{ top: '60%', right: '-10%', animationDelay: '3s' }}></div>

      {/* Navigation */}
      <nav className="scrolled">
        <div className="container nav-content">
          <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); }} className="logo">
            <img src={orvianLogo} alt="Orvian" className="logo-img" />
            <span>Orvian</span>
          </a>

          <div className="nav-links">
            <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); }} className="nav-link">Home</a>
            <a href="/#services" onClick={(e) => { e.preventDefault(); navigateTo('/'); setTimeout(() => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="nav-link">Services</a>
            <a href="/#portfolio" onClick={(e) => { e.preventDefault(); navigateTo('/'); setTimeout(() => { document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="nav-link">Portfolio</a>
            <a href="/#why-us" onClick={(e) => { e.preventDefault(); navigateTo('/'); setTimeout(() => { document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="nav-link">Why Us</a>
            <a href="/#contact" onClick={(e) => { e.preventDefault(); navigateTo('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="nav-link">Contact</a>
          </div>

          <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="nav-cta">
            Book a Call <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
          </a>

          <button
            className={`mobile-menu-btn${mobileMenuOpen ? ' is-open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-links">
            <a href="/" className="mobile-nav-item" onClick={(e) => { e.preventDefault(); navigateTo('/'); setMobileMenuOpen(false); }}>Home</a>
            <a href="/#services" className="mobile-nav-item" onClick={(e) => { e.preventDefault(); navigateTo('/'); setMobileMenuOpen(false); setTimeout(() => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}>Services</a>
            <a href="/#portfolio" className="mobile-nav-item" onClick={(e) => { e.preventDefault(); navigateTo('/'); setMobileMenuOpen(false); setTimeout(() => { document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}>Portfolio</a>
            <a href="/#why-us" className="mobile-nav-item" onClick={(e) => { e.preventDefault(); navigateTo('/'); setMobileMenuOpen(false); setTimeout(() => { document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}>Why Us</a>
            <a href="/#contact" className="mobile-nav-item" onClick={(e) => { e.preventDefault(); navigateTo('/'); setMobileMenuOpen(false); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}>Contact</a>
            <a href="/" className="mobile-nav-cta" onClick={(e) => { e.preventDefault(); navigateTo('/'); setMobileMenuOpen(false); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}>Book a Call</a>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="privacy-hero">
        <div className="container">
          <div className="privacy-hero-content">
            <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); }} className="back-link">
              <ArrowLeft size={16} /> Back to Home
            </a>
            <h1>Privacy Policy</h1>
            <p className="last-updated">Last Updated: June 11, 2026</p>
            <div className="hero-divider-line"></div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="privacy-main-container container">
        <div className="privacy-layout">
          {/* Sticky Sidebar Navigation */}
          <aside className="privacy-sidebar">
            <div className="sidebar-card">
              <h3>Table of Contents</h3>
              <ul>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={(e) => handleNavClick(e, section.id)}
                      className={activeSection === section.id ? 'active' : ''}
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main text block */}
          <article className="privacy-content-article">
            
            {/* Section 1: Introduction */}
            <section id="introduction" className="privacy-section">
              <div className="section-title-wrapper">
                <div className="section-icon-container">
                  <Lock size={20} />
                </div>
                <h2>1. Introduction</h2>
              </div>
              <div className="section-body-text">
                <p>
                  At <strong>Orvian</strong>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy describes how we collect, use, store, share, and protect your information when you interact with our website, services, and digital products, including our AI agents, custom automation tools, and messaging integrations.
                </p>
                <p>
                  By using our services or accessing our website at <a href="https://orvian.me">orvian.me</a>, you agree to the collection and use of information in accordance with this policy. We ensure that our processes are transparent and fully aligned with platform developer policies, including Meta Platform Terms and Developer Policies, to maintain the highest levels of trust and compliance.
                </p>
              </div>
            </section>

            {/* Section 2: Information We Collect */}
            <section id="information-collect" className="privacy-section">
              <div className="section-title-wrapper">
                <div className="section-icon-container">
                  <Eye size={20} />
                </div>
                <h2>2. Information We Collect</h2>
              </div>
              <div className="section-body-text">
                <p>
                  We collect information necessary to provide and optimize our AI-powered systems and automation workflows. This includes:
                </p>
                <ul className="bullets-list">
                  <li>
                    <strong>Messages and Conversational Data:</strong> Text, media, messages, and associated metadata transmitted through Instagram, Facebook Messenger, WhatsApp, client websites, or other connected communications platforms where our AI agents are deployed.
                  </li>
                  <li>
                    <strong>Basic Account Information:</strong> Basic profile data provided directly through Meta APIs (such as user IDs, names, usernames, profile pictures, and locale information) when you interact with our automated messaging channels.
                  </li>
                  <li>
                    <strong>Contact and Business Information:</strong> Contact details voluntarily submitted by users or clients, including name, email address, phone number, company name, and message details entered via our contact forms.
                  </li>
                  <li>
                    <strong>Technical and Usage Information:</strong> Technical details required to host and secure our services, such as IP addresses, browser types, operating system details, access times, pages viewed, and telemetry data regarding your interactions with our automated systems.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3: How We Use Information */}
            <section id="how-use-information" className="privacy-section">
              <div className="section-title-wrapper">
                <div className="section-icon-container">
                  <Database size={20} />
                </div>
                <h2>3. How We Use Information</h2>
              </div>
              <div className="section-body-text">
                <p>
                  We utilize the collected information to operate, optimize, and secure Orvian's AI automation services. Specifically, we use it to:
                </p>
                <ul className="bullets-list">
                  <li><strong>Provide AI-powered responses:</strong> Generate contextually relevant, accurate answers to user queries sent through active integration channels.</li>
                  <li><strong>Deliver automation services:</strong> Execute customized business automation actions, run active workflows (such as n8n processes), and route data securely between integrations.</li>
                  <li><strong>Improve platform performance:</strong> Analyze conversational success metrics to train, refine, and optimize AI models, and improve overall system response quality.</li>
                  <li><strong>Provide customer support:</strong> Respond to feedback, resolve technical issues, troubleshoot integrations, and address contact requests.</li>
                  <li><strong>Maintain service security:</strong> Monitor, detect, and prevent fraudulent activity, security incidents, spam, or unauthorized access to our platforms.</li>
                </ul>
              </div>
            </section>

            {/* Section 4: Data Sharing */}
            <section id="data-sharing" className="privacy-section">
              <div className="section-title-wrapper">
                <div className="section-icon-container">
                  <Share2 size={20} />
                </div>
                <h2>4. Data Sharing</h2>
              </div>
              <div className="section-body-text">
                <p>
                  We prioritize your trust above all. <strong>Orvian does not sell, lease, or rent your personal information to third parties.</strong>
                </p>
                <p>
                  We may only share information with trusted third-party service providers required to host, operate, and maintain our systems. These providers are bound by strict contractual obligations to use your information solely for the purposes for which it is shared, and to protect it with equivalent security standards.
                </p>
                <p>
                  We may also disclose information if required to do so by law, regulation, or legal process, or to protect the safety, rights, and property of Orvian, our users, or the general public.
                </p>
              </div>
            </section>

            {/* Section 5: Data Storage and Security */}
            <section id="data-storage" className="privacy-section">
              <div className="section-title-wrapper">
                <div className="section-icon-container">
                  <ShieldCheck size={20} />
                </div>
                <h2>5. Data Storage and Security</h2>
              </div>
              <div className="section-body-text">
                <p>
                  We implement industry-standard administrative, physical, and technical security measures designed to safeguard your information against unauthorized access, loss, alteration, disclosure, or misuse.
                </p>
                <p>
                  All data transmitted to and from our services is encrypted in transit using Transport Layer Security (TLS) and protected using modern encryption standards at rest. While we take reasonable steps to secure your information, no transmission or electronic storage method can guarantee absolute security.
                </p>
              </div>
            </section>

            {/* Section 6: Third-Party Services */}
            <section id="third-party" className="privacy-section">
              <div className="section-title-wrapper">
                <div className="section-icon-container">
                  <Globe size={20} />
                </div>
                <h2>6. Third-Party Services</h2>
              </div>
              <div className="section-body-text">
                <p>
                  Our services, automation workflows, and AI integrations interact directly with third-party tools. Orvian may integrate with:
                </p>
                <ul className="bullets-list">
                  <li><strong>Meta Platforms:</strong> Instagram, Facebook, and Facebook Messenger APIs to enable seamless customer support and conversation automation.</li>
                  <li><strong>OpenAI:</strong> Advanced large language models to power context-aware conversational AI and text processing.</li>
                  <li><strong>n8n:</strong> Secure node-based workflow automation engines to link external apps and synchronize database events.</li>
                  <li><strong>Other approved third-party business tools:</strong> Customer Relationship Management (CRM) databases, notification tools, and hosting providers used exclusively to operate our service.</li>
                </ul>
                <p>
                  These third-party platforms govern their own data practices. We encourage you to review their respective privacy policies to understand how they handle your personal data.
                </p>
              </div>
            </section>

            {/* Section 7: User Rights */}
            <section id="user-rights" className="privacy-section">
              <div className="section-title-wrapper">
                <div className="section-icon-container">
                  <HelpCircle size={20} />
                </div>
                <h2>7. User Rights</h2>
              </div>
              <div className="section-body-text">
                <p>
                  Depending on your jurisdiction, you may have specific rights regarding your personal information. These generally include the right to request:
                </p>
                <ul className="bullets-list">
                  <li><strong>Access:</strong> Request copies of the personal data we hold about you.</li>
                  <li><strong>Correction:</strong> Request that we update or correct inaccurate or incomplete information.</li>
                  <li><strong>Deletion:</strong> Request that we erase your personal data where applicable and in accordance with legal retention obligations.</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us at <a href="mailto:contact@orvian.me">contact@orvian.me</a>. We will respond to your request within a commercially reasonable timeframe and in compliance with applicable laws.
                </p>
              </div>
            </section>

            {/* Section 8: Data Retention */}
            <section id="data-retention" className="privacy-section">
              <div className="section-title-wrapper">
                <div className="section-icon-container">
                  <Trash2 size={20} />
                </div>
                <h2>8. Data Retention</h2>
              </div>
              <div className="section-body-text">
                <p>
                  We retain personal data only as long as necessary to fulfill the operational purposes detailed in this policy, deliver our automation services, and satisfy legal, accounting, compliance, or regulatory requirements.
                </p>
                <p>
                  When personal information is no longer needed, we safely delete or anonymize it so it can no longer be associated with you.
                </p>
              </div>
            </section>

            {/* Section 9: Contact Information */}
            <section id="contact-info" className="privacy-section">
              <div className="section-title-wrapper">
                <div className="section-icon-container">
                  <Mail size={20} />
                </div>
                <h2>9. Contact Information</h2>
              </div>
              <div className="section-body-text">
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data processing practices, please contact our team:
                </p>
                <div className="contact-details-box">
                  <div className="contact-line">
                    <span className="label">Email:</span>
                    <a href="mailto:contact@orvian.me">contact@orvian.me</a>
                  </div>
                  <div className="contact-line">
                    <span className="label">Website:</span>
                    <a href="https://orvian.me" target="_blank" rel="noopener noreferrer">https://orvian.me</a>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 10: Changes to This Policy */}
            <section id="changes-policy" className="privacy-section">
              <div className="section-title-wrapper">
                <div className="section-icon-container">
                  <RefreshCw size={20} />
                </div>
                <h2>10. Changes to This Policy</h2>
              </div>
              <div className="section-body-text">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our services, integration platforms, or regulatory requirements. 
                </p>
                <p>
                  Any updates will be posted on this page with an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                </p>
              </div>
            </section>

          </article>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="container grid-4">
          <div style={{ gridColumn: 'span 2' }}>
            <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); }} className="logo mb-4">
              <img src={orvianLogo} alt="Orvian" className="logo-img logo-img--footer" />
              <span>Orvian</span>
            </a>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '300px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Empowering modern businesses with cutting-edge AI systems, automation, and web development.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com/orvian.me" target="_blank" rel="noopener noreferrer"><Camera /></a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"><MessageCircle /></a>
              <a href="mailto:contact@orvian.me"><Mail /></a>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Services</h4>
            <ul className="flex" style={{ flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); setTimeout(() => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>AI Agents</a></li>
              <li><a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); setTimeout(() => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Automation</a></li>
              <li><a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); setTimeout(() => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Web Development</a></li>
              <li><a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); setTimeout(() => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>AI Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Company</h4>
            <ul className="flex" style={{ flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); setTimeout(() => { document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Portfolio</a></li>
              <li><a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); setTimeout(() => { document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Why Us</a></li>
              <li><a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Contact</a></li>
              <li><a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigateTo('/privacy-policy'); }} style={{ color: 'var(--accent-color)', fontWeight: 600, transition: 'color 0.2s' }}>Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="container">
          <div className="footer-bottom">
            &copy; {new Date().getFullYear()} Orvian. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PrivacyPolicy;
