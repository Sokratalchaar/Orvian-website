import { useState, useEffect } from 'react';
import { 
  Bot, 
  Cpu, 
  Code, 
  Workflow, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  TrendingUp,
  Headset,
  X,
  Mail,
  Camera,
  MessageCircle,
  Play,
  Globe,
  Database,
  Send,
  Activity
} from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './index.css';
import orvianLogo from './assets/orvian-logo.png';
import ChatWidget from './ChatWidget';
import PrivacyPolicy from './PrivacyPolicy';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmailField = (email) => {
    if (!email) {
      return '';
    }

    // Modern SaaS minimal regex to check layout correctness
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address (e.g. name@company.com).';
    }

    const domain = email.split('@')[1]?.toLowerCase().trim();
    
    // Obvious typos mapping to catch mistakes on common domains while keeping custom domains safe
    const domainTypos = {
      'gml.com': 'gmail.com',
      'gnail.com': 'gmail.com',
      'gamil.com': 'gmail.com',
      'gmal.com': 'gmail.com',
      'gmaill.com': 'gmail.com',
      'gemail.com': 'gmail.com',
      'gmail.co': 'gmail.com',
      'gmail.con': 'gmail.com',
      'yahooo.com': 'yahoo.com',
      'yaho.com': 'yahoo.com',
      'yahou.com': 'yahoo.com',
      'yahu.com': 'yahoo.com',
      'yahoo.co': 'yahoo.com',
      'hotmial.com': 'hotmail.com',
      'hotmal.com': 'hotmail.com',
      'hotamil.com': 'hotmail.com',
      'outlok.com': 'outlook.com',
      'outlk.com': 'outlook.com',
      'iclou.com': 'icloud.com',
      'icld.com': 'icloud.com',
      'protonmial.com': 'protonmail.com',
      'protonmal.com': 'protonmail.com'
    };

    if (domainTypos[domain]) {
      const suggestedDomain = domainTypos[domain];
      const username = email.split('@')[0];
      return `Did you mean ${username}@${suggestedDomain}?`;
    }

    return '';
  };

  const handleEmailBlur = () => {
    const error = validateEmailField(formData.email);
    setEmailError(error);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'email') {
      // Clean and frictionless UX: clear errors immediately as they type
      setEmailError('');
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email subtly on submit
    const emailErr = validateEmailField(formData.email);
    if (emailErr) {
      setEmailError(emailErr);
      setFormStatus({ type: 'error', message: 'Please correct the email address format.' });
      return;
    }

    if (!formData.phone) {
      setFormStatus({ type: 'error', message: 'Please enter a valid phone number.' });
      return;
    }
    
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://n8n.orvian.me/webhook/ee2d5fc6-209f-4326-b904-2d0127e117ed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setFormStatus({ type: 'success', message: 'Thank you! Your message has been received and we will contact you shortly.' });
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setEmailError('');
    } catch {
      setFormStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentPath !== '/') return;

    const animElements = document.querySelectorAll('.animate-fade-up');
    
    if (!('IntersectionObserver' in window)) {
      animElements.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px 0px -80px 0px', // trigger slightly before entering the full screen for a smoother experience
      threshold: 0.05 // trigger as soon as 5% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animElements.forEach((el) => observer.observe(el));

    return () => {
      animElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentPath]);


  const services = [
    {
      icon: <Bot size={24} />,
      title: "AI Agents",
      description: "Intelligent conversational bots and support agents for your platforms.",
      features: ["Instagram AI bots", "WhatsApp AI bots", "Customer support AI", "Custom chat assistants"]
    },
    {
      icon: <Cpu size={24} />,
      title: "Automation",
      description: "Streamline operations and reduce manual work with intelligent workflows.",
      features: ["n8n workflow automation", "CRM automation", "Lead generation systems", "Business process automation"]
    },
    {
      icon: <Code size={24} />,
      title: "Web Development",
      description: "High-performance, modern web applications built for scale.",
      features: ["Business websites", "Custom dashboards", "SaaS applications", "Web platforms"]
    },
    {
      icon: <Workflow size={24} />,
      title: "AI Integrations",
      description: "Seamlessly connect powerful AI models into your existing systems.",
      features: ["OpenAI integrations", "Voice AI systems", "RAG systems", "AI-powered workflows"]
    }
  ];

  // Dynamic portfolio demo components are directly embedded below.

  const benefits = [
    { icon: <Zap size={24} />, title: "Fast Delivery", description: "Rapid prototyping and deployment." },
    { icon: <Cpu size={24} />, title: "Modern AI Solutions", description: "Using the latest LLMs and tools." },
    { icon: <TrendingUp size={24} />, title: "Scalable Systems", description: "Built to grow with your business." },
    { icon: <Code size={24} />, title: "Clean UI/UX", description: "Premium, user-centric design." },
    { icon: <ShieldCheck size={24} />, title: "Business Focused", description: "ROI-driven automation." },
    { icon: <Headset size={24} />, title: "Ongoing Support", description: "Reliable maintenance and updates." }
  ];

  if (currentPath === '/privacy-policy') {
    return <PrivacyPolicy navigateTo={navigateTo} />;
  }

  return (
    <>
      <div className="bg-glow" style={{ top: '-10%', left: '-10%' }}></div>
      <div className="bg-glow" style={{ top: '40%', right: '-10%', animationDelay: '2s' }}></div>

      {/* Navigation */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-content">
          <a href="#" className="logo">
            <img src={orvianLogo} alt="Orvian" className="logo-img" />
            <span>Orvian</span>
          </a>

          <div className="nav-links">
            <a href="#services" className="nav-link">Services</a>
            <a href="#portfolio" className="nav-link">Portfolio</a>
            <a href="#why-us" className="nav-link">Why Us</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <a href="#contact" className="nav-cta">
            Book a Call <ArrowRight size={14} />
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
            <a href="#services" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#portfolio" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
            <a href="#why-us" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
            <a href="#contact" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a href="#contact" className="mobile-nav-cta" onClick={() => setMobileMenuOpen(false)}>Book a Call</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container hero-section">
        <div className="hero-content">
          
          {/* Left Column - Text content */}
          <div className="hero-text-col animate-fade-up">
            {/* Eyebrow label */}
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot"></span>
              AI Automation &amp; Web Development
            </div>

            <h1 className="hero-title">
              We build <span className="text-gradient-accent">AI-powered systems</span>{' '}
              for modern businesses.
            </h1>

            <p className="hero-description">
              Orvian helps companies automate workflows, deploy intelligent AI agents,
              and launch high-performance digital products — faster than ever.
            </p>

            <div className="hero-cta-row">
              <a href="#contact" className="btn btn-primary">
                Book a Call <ArrowRight size={16} />
              </a>
              <a href="#services" className="btn btn-secondary">
                Explore Services
              </a>
            </div>
            
            <div className="hero-social-proof">
               <div className="avatars flex">
                 <div className="avatar"></div>
                 <div className="avatar"></div>
                 <div className="avatar"></div>
               </div>
               <span>Trusted by innovative teams</span>
            </div>
          </div>

          {/* Right Column - Visual Graphic */}
          <div className="hero-visual-col animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="hero-visual-glow"></div>
            
            <div className="hero-visual-composition">
              {/* Main Dashboard Panel */}
              <div className="hero-panel main-panel">
                <div className="panel-header">
                  <div className="panel-dots">
                     <span></span><span></span><span></span>
                  </div>
                  <div className="panel-title">Workflow Automation</div>
                </div>
                <div className="panel-body">
                   {/* Abstract workflow lines/nodes */}
                   <div className="workflow-diagram">
                     <div className="wf-node icon-node"><Bot size={20} /></div>
                     <div className="wf-line"></div>
                     <div className="wf-node main-node">
                       <div className="wf-bar w-full"></div>
                       <div className="wf-bar w-3-4"></div>
                       <div className="wf-bar w-1-2"></div>
                     </div>
                   </div>
                   
                   <div className="wf-stats">
                      <div className="stat-box">
                        <div className="stat-label">Tasks Automated</div>
                        <div className="stat-value text-gradient-accent">+4,200</div>
                      </div>
                      <div className="stat-box">
                        <div className="stat-label">Time Saved</div>
                        <div className="stat-value text-gradient-accent">142h</div>
                      </div>
                   </div>
                </div>
              </div>
              
              {/* Floating element 1 */}
              <div className="hero-panel floating-panel panel-left">
                 <div className="flex items-center gap-3">
                   <div className="icon-wrapper-small" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                     <CheckCircle2 size={16} />
                   </div>
                   <div>
                     <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>System Sync Complete</div>
                     <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Just now</div>
                   </div>
                 </div>
              </div>

              {/* Floating element 2 */}
              <div className="hero-panel floating-panel panel-right">
                 <div className="flex items-center gap-3">
                   <div className="icon-wrapper-small" style={{ background: 'rgba(109, 40, 217, 0.12)', color: 'var(--accent-color)' }}>
                     <Activity size={16} />
                   </div>
                   <div>
                     <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>AI Agent Active</div>
                     <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Processing queries</div>
                   </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <div className="container">
          <div className="section-header animate-fade-up">
            <h2 className="section-title">Our <span className="text-gradient">Services</span></h2>
            <p className="section-subtitle">Comprehensive solutions to digitize, automate, and scale your operations.</p>
          </div>

          <div className="grid-2">
            {services.map((service, index) => (
              <div key={index} className="glass-card animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="icon-wrapper">
                  {service.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {service.description}
                </p>
                <ul className="flex" style={{ flexDirection: 'column', gap: '0.75rem' }}>
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      <CheckCircle2 size={16} color="#8b5cf6" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio">
        <div className="container">
          <div className="section-header animate-fade-up">
            <h2 className="section-title">Featured <span className="text-gradient">Work</span></h2>
            <p className="section-subtitle">A glimpse into the intelligent systems and platforms we've built.</p>
          </div>

          <div className="grid-3">
            {/* Card 1: AI Chat Demo */}
            <div className="glass-card animate-fade-up interactive-card" onClick={() => setIsChatOpen(true)} style={{ animationDelay: '0.1s' }}>
              <div className="demo-container chat-demo">
                <div className="chat-bubble chat-user">Do you support custom AI models?</div>
                <div className="chat-bubble chat-ai">Yes! We can integrate OpenAI, Anthropic, or custom fine-tuned models for your specific use cases. 🚀</div>
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
              <div style={{ padding: '0.5rem 0' }}>
                <span className="badge" style={{ position: 'relative', top: 0, left: 0, display: 'inline-block', marginBottom: '1rem' }}>AI Agents</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>AI Customer Support</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Intelligent conversational agents that handle customer queries naturally and efficiently.
                </p>
                <div className="flex items-center gap-2" style={{ color: '#8b5cf6', fontSize: '0.9rem', fontWeight: 600, transition: 'color 0.2s' }}>
                  <Play size={14} /> Try Live Demo
                </div>
              </div>
            </div>

            {/* Card 2: Website Mockup Demo */}
            <div className="glass-card animate-fade-up interactive-card" onClick={() => window.open('https://amazon-website-fm3h.onrender.com', '_blank', 'noopener,noreferrer')} style={{ animationDelay: '0.2s' }}>
              <div className="demo-container website-demo">
                <div className="browser-bar">
                  <div className="browser-dot red"></div>
                  <div className="browser-dot yellow"></div>
                  <div className="browser-dot green"></div>
                </div>
                <div className="mockup-glow"></div>
                <div className="mockup-hero">
                  <Globe size={24} color="#3b82f6" style={{ marginBottom: '0.5rem' }} />
                  <div className="mockup-title"></div>
                  <div className="mockup-title" style={{ width: '60%' }}></div>
                  <div className="mockup-text" style={{ marginTop: '1rem' }}></div>
                  <div className="mockup-text" style={{ width: '80%' }}></div>
                  <div className="mockup-btn">Start Free Trial</div>
                </div>
              </div>
              <div style={{ padding: '0.5rem 0' }}>
                <span className="badge" style={{ position: 'relative', top: 0, left: 0, display: 'inline-block', marginBottom: '1rem' }}>Web Platforms</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>SaaS Product Design</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  High-converting, premium landing pages and business web applications.
                </p>
                <div className="flex items-center gap-2" style={{ color: '#8b5cf6', fontSize: '0.9rem', fontWeight: 600, transition: 'color 0.2s' }}>
                  <Play size={14} /> View Prototype
                </div>
              </div>
            </div>

            {/* Card 3: Workflow Demo */}
            <div className="glass-card animate-fade-up interactive-card" onClick={() => setActiveDemo('workflow')} style={{ animationDelay: '0.3s' }}>
              <div className="demo-container workflow-demo">
                <div className="connection conn-1"><div className="data-packet"></div></div>
                <div className="connection conn-2"><div className="data-packet" style={{ animationDelay: '1s' }}></div></div>
                
                <div className="node node-1">
                  <div className="node-icon"><Activity size={12} /></div>
                  Webhook
                </div>
                <div className="node node-2">
                  <div className="node-icon"><Bot size={12} /></div>
                  AI Process
                </div>
                <div className="node node-3">
                  <div className="node-icon"><Database size={12} /></div>
                  CRM Sync
                </div>
              </div>
              <div style={{ padding: '0.5rem 0' }}>
                <span className="badge" style={{ position: 'relative', top: 0, left: 0, display: 'inline-block', marginBottom: '1rem' }}>Automation</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Intelligent Workflows</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Complex n8n automations that connect your data streams and AI logic.
                </p>
                <div className="flex items-center gap-2" style={{ color: '#8b5cf6', fontSize: '0.9rem', fontWeight: 600, transition: 'color 0.2s' }}>
                  <Play size={14} /> Open Workflow
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us">
        <div className="container">
          <div className="section-header animate-fade-up">
            <h2 className="section-title">Why Choose <span className="text-gradient-accent">Orvian</span></h2>
            <p className="section-subtitle">We partner with ambitious brands to deliver outsized results through technology.</p>
          </div>

          <div className="grid-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass-card animate-fade-up flex items-center gap-4" style={{ animationDelay: `${index * 0.1}s`, padding: '1.5rem' }}>
                <div className="icon-wrapper" style={{ margin: 0, minWidth: '48px' }}>
                  {benefit.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{benefit.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <div className="glass-card animate-fade-up contact-card">
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div>
                <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Let's build something <span className="text-gradient">amazing.</span></h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  Ready to automate your workflows or build a custom AI solution? Reach out to our team today.
                </p>
                
                <div className="flex" style={{ flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                  <a href="mailto:contact@orvian.me" className="flex items-center gap-4" style={{ color: 'var(--text-primary)', transition: 'color 0.2s' }}>
                    <div className="icon-wrapper" style={{ margin: 0, width: '40px', height: '40px' }}><Mail size={20} /></div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Email Us</div>
                      <div style={{ fontWeight: 500 }}>contact@orvian.me</div>
                    </div>
                  </a>
                  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4" style={{ color: 'var(--text-primary)', transition: 'color 0.2s' }}>
                    <div className="icon-wrapper" style={{ margin: 0, width: '40px', height: '40px' }}><MessageCircle size={20} /></div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>WhatsApp</div>
                      <div style={{ fontWeight: 500 }}>Message us directly</div>
                    </div>
                  </a>
                  <a href="https://instagram.com/orvian.me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4" style={{ color: 'var(--text-primary)', transition: 'color 0.2s' }}>
                    <div className="icon-wrapper" style={{ margin: 0, width: '40px', height: '40px' }}><Camera size={20} /></div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Instagram</div>
                      <div style={{ fontWeight: 500 }}>@orvian.me</div>
                    </div>
                  </a>
                </div>
              </div>

              <div>
                <form onSubmit={handleSubmit}>
                  {formStatus.message && (
                    <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '0.75rem', backgroundColor: formStatus.type === 'success' ? '#f0fdf4' : '#fef2f2', color: formStatus.type === 'success' ? '#15803d' : '#b91c1c', border: `1px solid ${formStatus.type === 'success' ? '#bbf7d0' : '#fca5a5'}` }}>
                      {formStatus.message}
                    </div>
                  )}
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      onBlur={handleEmailBlur}
                      required 
                      className={`form-control ${emailError ? 'input-error' : ''}`} 
                      placeholder="you@company.com" 
                    />
                    {emailError && (
                      <div className="form-error-inline">
                        <span style={{ fontSize: '0.95rem', lineHeight: 1 }}>⚠</span> {emailError}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <PhoneInput
                      defaultCountry="US"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="form-control phone-input-container"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company (Optional)</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} className="form-control" placeholder="Your Company Ltd" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">How can we help? *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required className="form-control" placeholder="Tell us about your project..."></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container grid-4">
          <div style={{ gridColumn: 'span 2' }}>
            <a href="#" className="logo mb-4">
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
              <li><a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>AI Agents</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Automation</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Web Development</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>AI Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Company</h4>
            <ul className="flex" style={{ flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#portfolio" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Portfolio</a></li>
              <li><a href="#why-us" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Why Us</a></li>
              <li><a href="#contact" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Contact</a></li>
              <li><a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigateTo('/privacy-policy'); }} style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="container">
          <div className="footer-bottom">
            &copy; {new Date().getFullYear()} Orvian. All rights reserved.
          </div>
        </div>
      </footer>
      {/* Interactive Modal Overlay */}
      {activeDemo && (
        <div className="modal-overlay" onClick={() => setActiveDemo(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveDemo(null)}>
              <X size={20} />
            </button>
            
            {activeDemo === 'chat' && (
              <div className="modal-demo-container full-chat">
                <div className="full-chat-header">
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={24} color="#8b5cf6" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem' }}>Orvian Support AI</h3>
                    <div style={{ fontSize: '0.8rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }}></div> Online
                    </div>
                  </div>
                </div>
                <div className="full-chat-messages">
                  <div className="full-chat-bubble" style={{ background: '#F3E8FF', border: '1px solid #D8B4FE', color: '#5B21B6', alignSelf: 'flex-start', borderBottomLeftRadius: 4 }}>
                    Hello! I'm the Orvian AI Assistant. How can I help you scale your business today? 👋
                  </div>
                  <div className="full-chat-bubble" style={{ background: '#E9E3ED', color: '#121212', alignSelf: 'flex-end', borderBottomRightRadius: 4 }}>
                    I'm looking to automate my lead generation process.
                  </div>
                  <div className="full-chat-bubble" style={{ background: '#F3E8FF', border: '1px solid #D8B4FE', color: '#5B21B6', alignSelf: 'flex-start', borderBottomLeftRadius: 4 }}>
                    That's our specialty! We can set up an n8n workflow that captures leads from your website, enriches them using AI, and pushes them directly into your CRM (like HubSpot or Salesforce). Should we look at a quick demo?
                  </div>
                </div>
                <div className="full-chat-input">
                  <input type="text" placeholder="Type a message to the AI..." />
                  <button style={{ background: '#8b5cf6', border: 'none', width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Send size={20} color="white" />
                  </button>
                </div>
              </div>
            )}

            {activeDemo === 'website' && (
              <div className="modal-demo-container full-website">
                <div className="full-website-nav">
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}><Globe color="var(--accent-color)" /> SaaSFlow</div>
                  <div style={{ display: 'flex', gap: '2rem', color: '#4b5563', alignItems: 'center', fontWeight: 500 }}>
                    <span>Features</span>
                    <span>Pricing</span>
                    <span>Docs</span>
                  </div>
                  <div style={{ border: '1px solid #cbd5e1', padding: '0.4rem 1.2rem', borderRadius: 99, fontSize: '0.9rem', display: 'flex', alignItems: 'center', color: '#4b5563', fontWeight: 500 }}>Login</div>
                </div>
                <div className="full-website-hero">
                  <div style={{ position: 'absolute', top: '20%', left: '30%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(109, 40, 217, 0.15) 0%, transparent 70%)', filter: 'blur(40px)' }}></div>
                  <div style={{ background: 'rgba(109, 40, 217, 0.08)', color: 'var(--accent-color)', padding: '0.3rem 1rem', borderRadius: 99, fontSize: '0.8rem', marginBottom: '1.5rem', border: '1px solid rgba(109, 40, 217, 0.2)' }}>v2.0 is now live</div>
                  <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', maxWidth: 800, color: 'var(--text-primary)' }}>The modern platform for <span style={{ color: 'var(--accent-color)' }}>agile teams.</span></h2>
                  <p style={{ color: '#4b5563', fontSize: '1.2rem', maxWidth: 600, marginBottom: '2rem' }}>Streamline your entire product lifecycle with AI-driven insights and real-time collaboration tools.</p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{ background: 'var(--accent-color)', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: 99, fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Get Started Free</button>
                    <button style={{ background: 'transparent', color: '#4b5563', border: '1px solid #cbd5e1', padding: '0.8rem 2rem', borderRadius: 99, fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>View Demo</button>
                  </div>
                </div>
              </div>
            )}

            {activeDemo === 'workflow' && (
              <div className="modal-demo-container full-workflow">
                <div style={{ position: 'absolute', top: 20, left: 20, background: '#f0fdf4', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #bbf7d0', color: '#15803d', fontWeight: 500 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }}></div> Workflow Active
                </div>
                
                <div className="connection" style={{ top: '30%', left: '20%', width: 120, transform: 'rotate(25deg)' }}><div className="data-packet"></div></div>
                <div className="connection" style={{ top: '60%', left: '45%', width: 150, transform: 'rotate(-15deg)' }}><div className="data-packet" style={{ animationDelay: '0.5s' }}></div></div>
                <div className="connection" style={{ top: '40%', left: '45%', width: 150, transform: 'rotate(15deg)' }}><div className="data-packet" style={{ animationDelay: '1.2s' }}></div></div>

                <div className="node" style={{ top: '20%', left: '10%', borderColor: 'rgba(109, 40, 217, 0.3)' }}>
                  <div className="node-icon" style={{ background: 'rgba(109, 40, 217, 0.1)', color: 'var(--accent-color)' }}><Activity /></div>
                  Incoming Webhook
                </div>
                <div className="node" style={{ top: '50%', left: '35%', borderColor: 'rgba(109, 40, 217, 0.3)' }}>
                  <div className="node-icon" style={{ background: 'rgba(109, 40, 217, 0.1)', color: 'var(--accent-color)' }}><Bot /></div>
                  AI Data Extractor
                </div>
                <div className="node" style={{ top: '30%', left: '70%', borderColor: 'rgba(34, 197, 94, 0.5)' }}>
                  <div className="node-icon" style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}><Database /></div>
                  Update CRM
                </div>
                <div className="node" style={{ top: '70%', left: '70%', borderColor: 'rgba(234, 179, 8, 0.5)' }}>
                  <div className="node-icon" style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#eab308' }}><Mail /></div>
                  Send Slack Alert
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <ChatWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </>
  );
}

export default App;
