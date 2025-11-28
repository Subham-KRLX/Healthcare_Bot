import React, { useState } from 'react';
import { MessageCircle, Activity, Shield, ArrowRight, CheckCircle, Heart, Stethoscope, Users, Zap, Star } from 'lucide-react';

function App() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Multi-layer gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/30 via-transparent to-blue-900/30" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Enhanced Navbar */}
        <nav className="px-6 py-4 backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 border-b border-white/10 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl blur-lg opacity-75"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-xl">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-white">Health</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Bot.AI</span>
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
              <a href="#" className="hover:text-cyan-400 transition-colors relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transform">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-grow flex items-center px-6 md:px-20 py-16">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Left Column - Text Content */}
              <div className="space-y-8">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-medium backdrop-blur-sm shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  AI-Powered Healthcare Assistant
                </div>

                <h2 className="text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
                  <span className="text-white">Your Health, </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient">
                    Reimagined.
                  </span>
                </h2>

                <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-lg">
                  Experience the future of medical assistance. Instant diagnosis, personalized health plans, and 24/7 monitoring powered by advanced artificial intelligence.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 blur-xl transition-all"></div>
                    <span className="relative text-white flex items-center gap-2">
                      Start Diagnosis
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all backdrop-blur-sm hover:scale-105 transform">
                    Learn More
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">24/7</div>
                    <div className="text-sm text-slate-400">Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">100K+</div>
                    <div className="text-sm text-slate-400">Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">98%</div>
                    <div className="text-sm text-slate-400">Accuracy</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Feature Cards */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: Activity,
                    title: 'Real-time Analysis',
                    description: 'Instant symptom checking and health monitoring',
                    gradient: 'from-cyan-500 to-blue-600',
                    bgGradient: 'from-cyan-500/20 to-blue-500/20'
                  },
                  {
                    icon: Shield,
                    title: 'Secure & Private',
                    description: 'Your health data is encrypted and protected',
                    gradient: 'from-blue-500 to-purple-600',
                    bgGradient: 'from-blue-500/20 to-purple-500/20'
                  },
                  {
                    icon: Heart,
                    title: 'Personalized Care',
                    description: 'Tailored health recommendations just for you',
                    gradient: 'from-purple-500 to-pink-600',
                    bgGradient: 'from-purple-500/20 to-pink-500/20'
                  },
                  {
                    icon: Zap,
                    title: 'Lightning Fast',
                    description: 'Get instant responses to your health queries',
                    gradient: 'from-yellow-500 to-orange-600',
                    bgGradient: 'from-yellow-500/20 to-orange-500/20'
                  }
                ].map((card, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`group p-6 rounded-2xl bg-gradient-to-br ${card.bgGradient} border border-white/10 backdrop-blur-xl transition-all duration-300 cursor-pointer ${hoveredCard === index ? 'scale-105 shadow-2xl' : 'hover:scale-105'}`}
                  >
                    <div className={`relative mb-4 w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 ${hoveredCard === index ? 'rotate-12 scale-110' : ''}`}>
                      <card.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-2 text-lg">{card.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
