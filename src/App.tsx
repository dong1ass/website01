import React, { useState, useEffect } from 'react';
import { Brain, MessageSquare, Database, ChevronRight, ArrowRight } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    const handleScroll = () => {
      if (window.innerWidth > 992) {
        setScrollY(window.scrollY);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Chat Agents",
      description: "Advanced conversational AI that understands and responds naturally to your customers"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Lead Generation",
      description: "Automated lead capture and qualification powered by cutting-edge AI"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "CRM Integration",
      description: "Seamless integration with your existing CRM systems for enhanced workflow"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold tracking-tighter">GOMORRA.AI</div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-gray-400 hover:text-white transition-colors tracking-wide"
              >
                Features
              </button>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors tracking-wide">About</a>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-400 hover:text-white transition-colors tracking-wide"
              >
                Contact
              </button>
            </div>
            <button className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-none flex items-center space-x-2 transition-all tracking-wider">
              <span>View Docs</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-light mb-8 leading-tight tracking-tight space-y-4">
            <div className="h-[80px] md:h-[120px] flex items-center justify-center overflow-visible">
              <div 
                className="header-text"
                style={{
                  transform: window.innerWidth > 992 ? `translateY(${scrollY * 0.2}px)` : 'none'
                }}
              >
                Intelligent Automation
              </div>
            </div>
            <span className="block text-white/60 text-2xl md:text-3xl font-normal tracking-widest uppercase">Business Solutions</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 tracking-wide">
            Transform your customer interactions with AI-powered automation. Generate leads, engage customers, and streamline your CRM workflow.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="glow-effect bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-none text-lg font-semibold flex items-center justify-center space-x-2 transition-all tracking-wider"
            >
              <span>Book a Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-gradient-to-b from-black to-zinc-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/30 transition-all">
                <div className="mb-6 text-white">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 tracking-wider">{feature.title}</h3>
                <p className="text-gray-400 tracking-wide">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="p-12 bg-zinc-900/50 border border-white/10">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-6 tracking-tighter">Ready to Transform Your Business?</h2>
              <p className="text-gray-400 mb-8 tracking-wide">Join the AI revolution and stay ahead of the competition. Book a call with our experts today.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 bg-black/50 border border-white/20 focus:border-white outline-none rounded-none tracking-wider"
                />
                <button className="glow-effect bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-none font-semibold whitespace-nowrap transition-all tracking-wider">
                  Book a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-20 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold tracking-tighter">About Mr Gomorra</h2>
              <div className="space-y-4 text-gray-400">
                <p className="leading-relaxed tracking-wide">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p className="leading-relaxed tracking-wide">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="leading-relaxed tracking-wide">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                </p>
              </div>
            </div>
            <div 
              className="relative overflow-hidden rounded-lg"
              onMouseMove={handleMouseMove}
              style={{
                transform: !isMobile ? `perspective(1000px) rotateY(${mousePosition.x * 15}deg) rotateX(${-mousePosition.y * 15}deg)` : 'none',
                transition: 'transform 0.2s ease-out'
              }}
            >
              <img
                src="../assets/gomorraphoto01.jpg"
                alt="Mr Gomorra Portrait"
                className="w-[600px] h-[900px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;