import { X, Star, MapPin, Award, GraduationCap, Calendar, Clock, Phone, Mail, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import type { Doctor } from "./DoctorCard";

interface DoctorProfileProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
}

const DoctorProfile = ({ doctor, isOpen, onClose }: DoctorProfileProps) => {
  const navigate = useNavigate();

  if (!doctor) return null;

  const handleBookAppointment = () => {
    onClose();
    navigate(`/book/${doctor.id}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Doctor Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex gap-6">
            <Avatar className="h-32 w-32 border-4 border-healthcare-teal/20">
              <AvatarImage src={doctor.image} alt={doctor.name} />
              <AvatarFallback className="bg-healthcare-teal/10 text-healthcare-teal text-3xl font-semibold">
                {doctor.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Dr. {doctor.name}</h2>
                <p className="text-xl text-healthcare-teal">{doctor.specialty}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg">{doctor.rating}</span>
                  <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                </div>
                <Badge className="bg-healthcare-green text-white">Available</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="w-4 h-4" />
                <span className="text-sm">Experience</span>
              </div>
              <p className="font-semibold">{doctor.experience} Years</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Location</span>
              </div>
              <p className="font-semibold">{doctor.distance}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Next Available</span>
              </div>
              <p className="font-semibold">{doctor.nextAvailable}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Working Hours</span>
              </div>
              <p className="font-semibold">9 AM - 6 PM</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Consultation</span>
              </div>
              <p className="font-semibold text-healthcare-teal">${doctor.consultationFee}</p>
            </div>
          </div>

          <Separator />

          {/* Education & Qualifications */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <GraduationCap className="w-5 h-5 text-healthcare-teal" />
              <h3>Education & Qualifications</h3>
            </div>
            <div className="bg-accent/30 p-4 rounded-lg">
              <p className="text-foreground">{doctor.education}</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Board Certified in {doctor.specialty}</li>
                <li>• Member of National Medical Association</li>
                <li>• Published research in leading medical journals</li>
              </ul>
            </div>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-muted-foreground leading-relaxed">
              Dr. {doctor.name} is a highly experienced {doctor.specialty.toLowerCase()} with {doctor.experience} years of practice. 
              Known for providing compassionate care and staying current with the latest medical advances. 
              Committed to patient education and personalized treatment plans.
            </p>
          </div>

          {/* Specializations */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {["Diagnosis", "Treatment", "Surgery", "Consultation", "Emergency Care"].map((spec) => (
                <Badge key={spec} variant="outline" className="bg-healthcare-teal/5 text-healthcare-teal border-healthcare-teal/20">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{doctor.name.toLowerCase().replace(" ", ".")}@healthcare.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{doctor.location}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              className="flex-1 bg-healthcare-teal hover:bg-healthcare-teal/90 transition-[var(--transition-smooth)]"
              onClick={handleBookAppointment}
            >
              Book Appointment
            </Button>
            <Button variant="outline" className="flex-1 hover:bg-accent transition-[var(--transition-smooth)]">
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorProfile;
