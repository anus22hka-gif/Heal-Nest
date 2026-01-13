import { Search, MapPin, Shield, Clock, Star, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

interface HeroProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Hero = ({ onSearch, searchQuery }: HeroProps) => {
  const stats = [
    { value: "500+", label: "Verified Doctors" },
    { value: "50k+", label: "Happy Patients" },
    { value: "4.9", label: "Average Rating" },
  ];

  return (
    <section className="relative min-h-[85vh] flex flex-col" style={{ background: 'var(--gradient-hero)' }}>
      {/* Header */}
      <header className="w-full bg-primary/10 backdrop-blur-md">
        {/* Top Bar - Logo & Actions */}
        <div className="container mx-auto px-4 py-4 flex items-center justify-between border-b border-primary/20">
          <div className="flex items-center gap-2">
            <img src={logo} alt="HealNest Logo" className="w-10 h-10 object-contain" />
            <span className="font-display font-semibold text-xl text-foreground">HealNest</span>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Sign In
            </Button>
            <Button size="sm" className="bg-healthcare-teal text-primary-foreground hover:bg-healthcare-teal/90">
              Get Started
            </Button>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="border-b border-primary/20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-8 py-3">
              <Link to="/" className="text-sm font-medium text-foreground hover:text-healthcare-teal transition-colors">
                Find Doctors
              </Link>
              <Link to="/medicine" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pharmacy
              </Link>
              <span className="text-sm font-medium text-muted-foreground cursor-default">
                Health Plans
              </span>
              <span className="text-sm font-medium text-muted-foreground cursor-default">
                Online Consultation
              </span>
              <span className="text-sm font-medium text-muted-foreground cursor-default">
                Lab Tests
              </span>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Content */}
      <div className="flex-1 container mx-auto px-4 py-16 md:py-24 flex flex-col justify-center">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border text-sm font-medium text-accent-foreground animate-fade-up">
            <Shield className="w-4 h-4" />
            Trusted by 50,000+ patients across India
          </div>

          {/* Headline */}
          <div className="space-y-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight text-balance">
              Find the Right Doctor,{" "}
              <span className="text-healthcare-teal">Right Now</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Connect with verified healthcare professionals in your area. 
              Book appointments instantly with transparent pricing.
            </p>
          </div>

          {/* Search */}
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-xl shadow-card border border-border max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search doctors, specialties, conditions..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  className="pl-12 pr-4 py-6 text-base border-0 focus-visible:ring-0 bg-transparent"
                />
              </div>
              <Button size="lg" className="bg-healthcare-teal text-primary-foreground hover:bg-healthcare-teal/90 px-6 shadow-sm">
                <MapPin className="mr-2 h-4 w-4" />
                Search Near Me
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-2 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <span className="text-sm text-muted-foreground mr-2">Popular:</span>
            {["Cardiologist", "Dermatologist", "Pediatrician", "Dentist", "Orthopedic"].map((specialty) => (
              <button
                key={specialty}
                onClick={() => onSearch(specialty)}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-t border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Average wait time: 15 mins
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-amber-500" />
              All doctors verified
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
