import  { useEffect, useRef } from 'react';
import { 
  Code, 
  TrendingUp, 
  Calendar, 
  Brain, 
  Target, 
  Award, 
  ArrowRight,
  CheckCircle,
  Clock,
  BarChart3,
  Zap,
  Star,
  Users,
  Trophy,
  Play,
  ChevronRight
} from 'lucide-react';

export default function HeroPage() {
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const floatingCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const gsap = (window as any).gsap;
      
      // Set initial states
      gsap.set('.hero-title', { y: 100, opacity: 0 });
      gsap.set('.hero-subtitle', { y: 80, opacity: 0 });
      gsap.set('.hero-description', { y: 60, opacity: 0 });
      gsap.set('.hero-buttons', { y: 40, opacity: 0 });
      gsap.set('.floating-card', { y: 100, opacity: 0, rotation: 10 });
      gsap.set('.feature-card', { y: 60, opacity: 0, scale: 0.9 });
      gsap.set('.stat-item', { scale: 0, opacity: 0 });
      gsap.set('.cta-content', { y: 50, opacity: 0 });

      // Hero section animations
      const tl = gsap.timeline();
      
      tl.to('.hero-title', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
      })
      .to('.hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8')
      .to('.hero-description', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .to('.hero-buttons', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .to('.floating-card', {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.2
      }, '-=0.8');

      // Floating animation for cards
      gsap.to('.floating-card', {
        y: -20,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

      // Load ScrollTrigger
      const scrollScript = document.createElement('script');
      scrollScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      scrollScript.onload = () => {
        gsap.registerPlugin((window as any).ScrollTrigger);

        gsap.to('.feature-card', {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 80%',
            end: 'bottom 20%',
          }
        });

        gsap.to('.stat-item', {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 80%',
          }
        });

        gsap.to('.cta-content', {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
          }
        });
      };
      document.head.appendChild(scrollScript);

      // Continuous background animation
      gsap.to('.bg-orb-1', {
        x: 100,
        y: -50,
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });

      gsap.to('.bg-orb-2', {
        x: -80,
        y: 100,
        duration: 25,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });

      gsap.to('.bg-orb-3', {
        x: 120,
        y: 80,
        duration: 30,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });
    };
    
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const features = [
    {
      icon: Calendar,
      title: "Smart Tracking",
      description: "Track your daily coding progress with intelligent date-based organization and visual timelines.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "Spaced Repetition",
      description: "Never forget what you've learned with our scientifically-backed spaced repetition system.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Visualize your growth with detailed analytics and performance insights over time.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Set and achieve your coding goals with personalized milestones and achievements.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Problems Solved", icon: Code },
    { number: "5K+", label: "Active Users", icon: Users },
    { number: "95%", label: "Retention Rate", icon: TrendingUp },
    { number: "4.9★", label: "User Rating", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orb-1 absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="bg-orb-2 absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
        <div className="bg-orb-3 absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+Cjwvc3ZnPgo=')] opacity-20"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">LeetTracker</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <button className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center -mt-20 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="hero-title inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-8">
                <Star className="w-4 h-4 text-yellow-400" />
                Trusted by 10,000+ developers
              </div>
              
              <div className="hero-title">
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  Master Your
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Coding Journey
                  </span>
                </h1>
              </div>
              
              <div className="hero-subtitle">
                <p className="text-xl lg:text-2xl text-gray-300 mb-8 font-light leading-relaxed">
                  Transform practice into progress with intelligent tracking, spaced repetition, and comprehensive analytics designed for serious developers.
                </p>
              </div>
              
              <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              {/* Social Proof */}
              <div className="hero-description flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-slate-900"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-slate-900"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full border-2 border-slate-900"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border-2 border-slate-900 flex items-center justify-center text-xs font-bold">
                      5K+
                    </div>
                  </div>
                  <span>Active developers</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2">4.9/5 rating</span>
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Floating Cards */}
            <div ref={floatingCardsRef} className="relative lg:h-[600px]">
              {/* Main Dashboard Card */}
              <div className="floating-card absolute top-0 left-1/2 transform -translate-x-1/2 lg:translate-x-0 lg:left-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-80 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Today's Progress</h3>
                    <p className="text-gray-400 text-sm">Keep up the momentum!</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Two Sum</p>
                      <p className="text-sm text-gray-400">Easy • Array • Hash Table</p>
                    </div>
                    <div className="text-emerald-400 text-sm font-medium">✓ Solved</div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Binary Search</p>
                      <p className="text-sm text-gray-400">Medium • Review due</p>
                    </div>
                    <div className="text-amber-400 text-sm font-medium">Due now</div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Daily streak</span>
                    <span className="font-bold text-orange-400">12 days 🔥</span>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="floating-card absolute top-32 right-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 w-64 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Weekly Analytics</p>
                    <p className="text-sm text-gray-400">Outstanding progress!</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {[20, 12, 25, 8, 15, 30, 18].map((height, index) => (
                    <div key={index} className="flex flex-col items-center gap-1">
                      <div 
                        className="w-6 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t transition-all duration-500"
                        style={{ height: `${height}px` }}
                      ></div>
                      <span className="text-xs text-gray-400">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">This week</span>
                  <span className="font-bold text-purple-400">23 problems</span>
                </div>
              </div>

              {/* Achievement Card */}
              <div className="floating-card absolute bottom-0 left-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 w-72 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Achievement Unlocked!</p>
                    <p className="text-sm text-gray-400">Problem Solving Master</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 mb-4">
                  Solved 100 problems across different difficulty levels. You're on fire! 🚀
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>+500 XP earned</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="features-section py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8">
              Everything You Need to
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Excel at Coding
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Built by developers, for developers. Every feature is designed to accelerate your coding journey and help you retain knowledge effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card group">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-full hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-white/30">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="stats-section py-32 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">Trusted by Developers Worldwide</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of developers who are mastering coding with LeetTracker's proven methodology
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-3">{stat.number}</div>
                  <div className="text-gray-400 text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="cta-section py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="cta-content">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-16 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
              
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <Zap className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold mb-8">
                  Ready to Transform Your
                  <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Coding Journey?
                  </span>
                </h2>
                <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Join the community of successful developers who never let a solved problem go to waste. Start building lasting coding skills today.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button className="group px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-3 justify-center">
                    <Zap className="w-6 h-6" />
                    Start Free Trial
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-12 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-white/40 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    Contact Sales
                  </button>
                </div>
                
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span>Free 14-day trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}