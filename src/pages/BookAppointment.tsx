import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doctorsData } from "@/data/doctorsData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, IndianRupee, MapPin, Clock, ArrowLeft, Smartphone, CreditCard, Building2, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const doctor = doctorsData.find((d) => d.id === Number(doctorId));

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    reason: "",
    upiId: "",
  });

  const [selectedPayment, setSelectedPayment] = useState("upi");

  const paymentMethods = [
    { id: "upi", name: "UPI", description: "GPay, PhonePe, Paytm", icon: Smartphone },
    { id: "card", name: "Card", description: "Debit/Credit Card", icon: CreditCard },
    { id: "netbanking", name: "Net Banking", description: "All major banks", icon: Building2 },
    { id: "wallet", name: "Wallet", description: "Paytm, Amazon Pay", icon: Wallet },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Success
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with Dr. ${doctor?.name} has been confirmed for ${formData.date} at ${formData.time}.`,
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Doctor not found</h1>
          <Button onClick={() => navigate("/")}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-healthcare-teal/10 via-background to-healthcare-green/5 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6 hover:bg-accent transition-[var(--transition-smooth)]"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Doctors
        </Button>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Doctor Info Sidebar */}
          <Card className="md:col-span-1 h-fit border-border shadow-[var(--shadow-soft)]">
            <CardHeader>
              <CardTitle className="text-lg">Doctor Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center space-y-3">
                <Avatar className="h-24 w-24 border-2 border-healthcare-teal/20">
                  <AvatarImage src={doctor.image} alt={doctor.name} />
                  <AvatarFallback className="bg-healthcare-teal/10 text-healthcare-teal text-2xl font-semibold">
                    {doctor.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">Dr. {doctor.name}</h3>
                  <p className="text-muted-foreground">{doctor.specialty}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-healthcare-teal" />
                  <span className="text-muted-foreground">{doctor.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-healthcare-green" />
                  <span className="text-muted-foreground">Next: {doctor.nextAvailable}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <IndianRupee className="w-4 h-4 text-healthcare-blue" />
                  <span className="font-semibold text-foreground">₹{doctor.consultationFee} Consultation Fee</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card className="md:col-span-2 border-border shadow-[var(--shadow-soft)]">
            <CardHeader>
              <CardTitle className="text-2xl">Book Your Appointment</CardTitle>
              <p className="text-muted-foreground">Fill in your details to schedule a consultation</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="border-input focus:border-healthcare-teal"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-input focus:border-healthcare-teal"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="border-input focus:border-healthcare-teal"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">
                      Preferred Date <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                      className="border-input focus:border-healthcare-teal"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">
                      Preferred Time <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="border-input focus:border-healthcare-teal"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Visit (Optional)</Label>
                  <Textarea
                    id="reason"
                    name="reason"
                    placeholder="Please describe your symptoms or reason for consultation..."
                    value={formData.reason}
                    onChange={handleChange}
                    rows={4}
                    className="border-input focus:border-healthcare-teal resize-none"
                  />
                </div>

                {/* Payment Methods */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Payment Method</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <label
                          key={method.id}
                          className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                            selectedPayment === method.id
                              ? "border-primary bg-primary/5 ring-1 ring-primary"
                              : "border-border hover:border-primary/50 hover:bg-accent/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                            className="sr-only"
                          />
                          <Icon className={`w-5 h-5 ${selectedPayment === method.id ? "text-primary" : "text-muted-foreground"}`} />
                          <div>
                            <p className={`font-medium ${selectedPayment === method.id ? "text-primary" : "text-foreground"}`}>
                              {method.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{method.description}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {/* UPI ID Input - shown when UPI is selected */}
                  {selectedPayment === "upi" && (
                    <div className="space-y-2 animate-fade-up">
                      <Label htmlFor="upiId">
                        UPI ID <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="upiId"
                        name="upiId"
                        type="text"
                        placeholder="yourname@upi or 9876543210@paytm"
                        value={formData.upiId}
                        onChange={handleChange}
                        className="border-input focus:border-primary"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter your UPI ID (e.g., name@oksbi, mobile@paytm)
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-accent/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Consultation Fee:</span>
                    <span className="text-2xl font-bold text-foreground">₹{doctor.consultationFee}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Pay securely using {paymentMethods.find(m => m.id === selectedPayment)?.name}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 hover:bg-accent transition-[var(--transition-smooth)]"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-healthcare-teal hover:bg-healthcare-teal/90 transition-[var(--transition-smooth)]"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Confirm Booking
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
