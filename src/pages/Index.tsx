import { useState } from "react";
import { Search } from "lucide-react";
import Hero from "@/components/Hero";
import SpecialtyFilter from "@/components/SpecialtyFilter";
import DoctorCard from "@/components/DoctorCard";
import DoctorProfile from "@/components/DoctorProfile";
import SortFilter, { SortOption } from "@/components/SortFilter";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import type { Doctor } from "@/components/DoctorCard";
import { doctorsData } from "@/data/doctorsData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("distance");

  const handleViewProfile = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsProfileOpen(true);
  };

  const filteredAndSortedDoctors = doctorsData
    .filter((doctor) => {
      const matchesSearch =
        searchQuery === "" ||
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        !selectedSpecialty || doctor.specialty === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "distance":
          return a.distanceKm - b.distanceKm;
        case "price-low":
          return a.consultationFee - b.consultationFee;
        case "price-high":
          return b.consultationFee - a.consultationFee;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Hero onSearch={setSearchQuery} searchQuery={searchQuery} />
      <SpecialtyFilter
        selectedSpecialty={selectedSpecialty}
        onSelectSpecialty={setSelectedSpecialty}
      />

      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                {selectedSpecialty ? `${selectedSpecialty}s` : "Available Doctors"}
              </h2>
              <p className="text-muted-foreground mt-1">
                {filteredAndSortedDoctors.length} doctors found near you
              </p>
            </div>
            <SortFilter currentSort={sortOption} onSortChange={setSortOption} />
          </div>

          {filteredAndSortedDoctors.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-xl border border-border">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-xl font-display font-semibold text-foreground">No doctors found</p>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredAndSortedDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Testimonials />
      <Footer />

      <DoctorProfile
        doctor={selectedDoctor}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
};

export default Index;
