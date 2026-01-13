import { Stethoscope, Brain, Heart, Baby, Eye, Ear, Activity, Users, Smile, Bone, Pill, Microscope, Dna, Droplet, Syringe, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpecialtyFilterProps {
  selectedSpecialty: string | null;
  onSelectSpecialty: (specialty: string | null) => void;
}

const specialties = [
  { name: "All", icon: Users },
  { name: "Cardiologist", icon: Heart },
  { name: "Neurologist", icon: Brain },
  { name: "Pediatrician", icon: Baby },
  { name: "ENT Specialist", icon: Ear },
  { name: "Ophthalmologist", icon: Eye },
  { name: "Gynecologist", icon: Activity },
  { name: "General Physician", icon: Stethoscope },
  { name: "Dermatologist", icon: Smile },
  { name: "Dentist", icon: Smile },
  { name: "Orthopedic", icon: Bone },
  { name: "Psychiatrist", icon: Brain },
  { name: "Endocrinologist", icon: Pill },
  { name: "Urologist", icon: Droplet },
  { name: "Oncologist", icon: Dna },
  { name: "Radiologist", icon: Radio },
  { name: "Anesthesiologist", icon: Syringe },
  { name: "Pathologist", icon: Microscope },
];

const SpecialtyFilter = ({ selectedSpecialty, onSelectSpecialty }: SpecialtyFilterProps) => {
  return (
    <section className="py-8 bg-secondary/30 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-display font-semibold text-foreground mb-1">Browse by Specialty</h3>
          <p className="text-sm text-muted-foreground">Find the right specialist for your needs</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {specialties.map(({ name, icon: Icon }) => {
            const isSelected = selectedSpecialty === name || (name === "All" && !selectedSpecialty);
            
            return (
              <button
                key={name}
                onClick={() => onSelectSpecialty(name === "All" ? null : name)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all",
                  isSelected 
                    ? "bg-healthcare-teal text-primary-foreground shadow-sm" 
                    : "bg-card border border-border text-foreground hover:border-healthcare-teal/50 hover:bg-card/80"
                )}
              >
                <Icon className="w-4 h-4" />
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecialtyFilter;
