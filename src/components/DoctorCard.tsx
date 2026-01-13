import { Star, MapPin, Clock, Award, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  distanceKm: number;
  availability: string;
  education: string;
  image: string;
  nextAvailable: string;
  consultationFee: number;
}

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile: (doctor: Doctor) => void;
}

const DoctorCard = ({ doctor, onViewProfile }: DoctorCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group shadow-card hover:shadow-card-hover transition-all duration-200 border-border overflow-hidden bg-card">
      <CardContent className="p-5">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <Avatar className="h-16 w-16 ring-2 ring-border">
              <AvatarImage src={doctor.image} alt={doctor.name} />
              <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">
                {doctor.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-healthcare-teal flex items-center justify-center">
              <BadgeCheck className="w-3 h-3 text-primary-foreground" />
            </div>
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground truncate">
                Dr. {doctor.name}
              </h3>
              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
            </div>

            {/* Rating & Experience */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-foreground">{doctor.rating}</span>
                <span className="text-muted-foreground">({doctor.reviews})</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Award className="w-4 h-4" />
                <span>{doctor.experience} yrs</span>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{doctor.distance}</span>
              </div>
              <div className="flex items-center gap-1 text-healthcare-teal font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{doctor.nextAvailable}</span>
              </div>
            </div>

            {/* Education */}
            <p className="text-xs text-muted-foreground truncate">
              {doctor.education}
            </p>
          </div>

          {/* Price & Actions */}
          <div className="flex flex-col items-end justify-between flex-shrink-0">
            <div className="text-right">
              <div className="text-lg font-display font-bold text-foreground">₹{doctor.consultationFee}</div>
              <div className="text-xs text-muted-foreground">Consultation</div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs h-8"
                onClick={() => onViewProfile(doctor)}
              >
                View Profile
              </Button>
              <Button 
                size="sm"
                className="bg-healthcare-teal text-primary-foreground hover:bg-healthcare-teal/90 text-xs h-8"
                onClick={() => navigate(`/book/${doctor.id}`)}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
