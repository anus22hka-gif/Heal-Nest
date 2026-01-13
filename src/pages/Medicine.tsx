import { Pill, Search, ShoppingCart, Star, Heart, Truck, Shield, Clock, Plus, Minus, X, CreditCard, Check, Upload, Package, MapPin, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Medicine {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  inStock: boolean;
  prescription: boolean;
  manufacturer: string;
  image: string;
}

interface CartItem extends Medicine {
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'processing' | 'shipped' | 'out-for-delivery' | 'delivered';
  date: string;
  address: string;
}

const medicineImages = [
  // Pills & Tablets
  "https://cdn-icons-png.flaticon.com/512/4320/4320350.png",
  "https://cdn-icons-png.flaticon.com/512/4320/4320371.png",
  "https://cdn-icons-png.flaticon.com/512/3140/3140343.png",
  // Syrups & Bottles
  "https://cdn-icons-png.flaticon.com/512/4320/4320337.png",
  "https://cdn-icons-png.flaticon.com/512/2966/2966484.png",
  "https://cdn-icons-png.flaticon.com/512/4320/4320366.png",
  // Injections & Syringes
  "https://cdn-icons-png.flaticon.com/512/4320/4320339.png",
  "https://cdn-icons-png.flaticon.com/512/2966/2966322.png",
  "https://cdn-icons-png.flaticon.com/512/4320/4320359.png",
  // Medical Equipment
  "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
  "https://cdn-icons-png.flaticon.com/512/4320/4320344.png",
  "https://cdn-icons-png.flaticon.com/512/2966/2966486.png",
  // First Aid & Capsules
  "https://cdn-icons-png.flaticon.com/512/4320/4320377.png",
  "https://cdn-icons-png.flaticon.com/512/3140/3140310.png",
  "https://cdn-icons-png.flaticon.com/512/4320/4320355.png",
  // Colorful Medical Items
  "https://cdn-icons-png.flaticon.com/512/2966/2966334.png",
  "https://cdn-icons-png.flaticon.com/512/4320/4320362.png",
  "https://cdn-icons-png.flaticon.com/512/3140/3140327.png",
];

const getRandomImage = (id: number) => medicineImages[id % medicineImages.length];

const medicines: Medicine[] = [
  { id: 1, name: "Paracetamol 500mg", category: "Pain Relief", price: 135, rating: 4.8, inStock: true, prescription: false, manufacturer: "Cipla", image: getRandomImage(1) },
  { id: 2, name: "Amoxicillin 250mg", category: "Antibiotics", price: 225, rating: 4.7, inStock: true, prescription: true, manufacturer: "Sun Pharma", image: getRandomImage(2) },
  { id: 3, name: "Vitamin D3 1000IU", category: "Vitamins", price: 349, rating: 4.9, inStock: true, prescription: false, manufacturer: "HealthKart", image: getRandomImage(3) },
  { id: 4, name: "Ibuprofen 400mg", category: "Pain Relief", price: 145, rating: 4.6, inStock: true, prescription: false, manufacturer: "Abbott", image: getRandomImage(4) },
  { id: 5, name: "Metformin 500mg", category: "Diabetes", price: 189, rating: 4.5, inStock: true, prescription: true, manufacturer: "USV", image: getRandomImage(5) },
  { id: 6, name: "Omeprazole 20mg", category: "Digestive", price: 175, rating: 4.7, inStock: true, prescription: false, manufacturer: "Dr. Reddy's", image: getRandomImage(6) },
  { id: 7, name: "Cetirizine 10mg", category: "Allergy", price: 155, rating: 4.8, inStock: true, prescription: false, manufacturer: "Cipla", image: getRandomImage(7) },
  { id: 8, name: "Multivitamin Complex", category: "Vitamins", price: 499, rating: 4.9, inStock: true, prescription: false, manufacturer: "Himalaya", image: getRandomImage(8) },
  { id: 9, name: "Azithromycin 500mg", category: "Antibiotics", price: 289, rating: 4.6, inStock: true, prescription: true, manufacturer: "Zydus", image: getRandomImage(9) },
  { id: 10, name: "Pantoprazole 40mg", category: "Digestive", price: 195, rating: 4.7, inStock: true, prescription: false, manufacturer: "Alkem", image: getRandomImage(10) },
  { id: 11, name: "Dolo 650", category: "Pain Relief", price: 130, rating: 4.9, inStock: true, prescription: false, manufacturer: "Micro Labs", image: getRandomImage(11) },
  { id: 12, name: "Crocin Advance", category: "Pain Relief", price: 142, rating: 4.8, inStock: true, prescription: false, manufacturer: "GSK", image: getRandomImage(12) },
  { id: 13, name: "Limcee Vitamin C", category: "Vitamins", price: 135, rating: 4.7, inStock: true, prescription: false, manufacturer: "Abbott", image: getRandomImage(13) },
  { id: 14, name: "Becosules Capsules", category: "Vitamins", price: 145, rating: 4.6, inStock: true, prescription: false, manufacturer: "Pfizer", image: getRandomImage(14) },
  { id: 15, name: "Allegra 120mg", category: "Allergy", price: 265, rating: 4.5, inStock: true, prescription: false, manufacturer: "Sanofi", image: getRandomImage(15) },
  { id: 16, name: "Montair LC", category: "Allergy", price: 295, rating: 4.7, inStock: true, prescription: true, manufacturer: "Cipla", image: getRandomImage(16) },
  { id: 17, name: "Glycomet 500mg", category: "Diabetes", price: 165, rating: 4.6, inStock: true, prescription: true, manufacturer: "USV", image: getRandomImage(17) },
  { id: 18, name: "Janumet 50/500mg", category: "Diabetes", price: 550, rating: 4.8, inStock: true, prescription: true, manufacturer: "MSD", image: getRandomImage(18) },
  { id: 19, name: "Digene Tablets", category: "Digestive", price: 185, rating: 4.5, inStock: true, prescription: false, manufacturer: "Abbott", image: getRandomImage(19) },
  { id: 20, name: "Rantac 150mg", category: "Digestive", price: 155, rating: 4.6, inStock: true, prescription: false, manufacturer: "JB Chemicals", image: getRandomImage(20) },
  { id: 21, name: "Combiflam Tablet", category: "Pain Relief", price: 138, rating: 4.8, inStock: true, prescription: false, manufacturer: "Sanofi", image: getRandomImage(21) },
  { id: 22, name: "Sumo Tablet", category: "Pain Relief", price: 128, rating: 4.5, inStock: true, prescription: false, manufacturer: "Alkem", image: getRandomImage(22) },
  { id: 23, name: "Shelcal 500mg", category: "Vitamins", price: 295, rating: 4.7, inStock: true, prescription: false, manufacturer: "Torrent", image: getRandomImage(23) },
  { id: 24, name: "Revital H", category: "Vitamins", price: 385, rating: 4.8, inStock: true, prescription: false, manufacturer: "Sun Pharma", image: getRandomImage(24) },
  { id: 25, name: "Disprin Tablet", category: "Pain Relief", price: 115, rating: 4.4, inStock: true, prescription: false, manufacturer: "Reckitt", image: getRandomImage(25) },
  { id: 26, name: "Vicks Action 500", category: "Pain Relief", price: 155, rating: 4.6, inStock: true, prescription: false, manufacturer: "P&G", image: getRandomImage(26) },
  { id: 27, name: "Zincovit Tablet", category: "Vitamins", price: 225, rating: 4.7, inStock: true, prescription: false, manufacturer: "Apex", image: getRandomImage(27) },
  { id: 28, name: "Supradyn Tablet", category: "Vitamins", price: 275, rating: 4.8, inStock: true, prescription: false, manufacturer: "Bayer", image: getRandomImage(28) },
  { id: 29, name: "Ciprofloxacin 500mg", category: "Antibiotics", price: 195, rating: 4.5, inStock: true, prescription: true, manufacturer: "Cipla", image: getRandomImage(29) },
  { id: 30, name: "Levofloxacin 500mg", category: "Antibiotics", price: 245, rating: 4.6, inStock: true, prescription: true, manufacturer: "Sun Pharma", image: getRandomImage(30) },
  { id: 31, name: "Metrogyl 400mg", category: "Antibiotics", price: 165, rating: 4.4, inStock: true, prescription: true, manufacturer: "JB Chemicals", image: getRandomImage(31) },
  { id: 32, name: "Doxycycline 100mg", category: "Antibiotics", price: 175, rating: 4.5, inStock: true, prescription: true, manufacturer: "Alkem", image: getRandomImage(32) },
  { id: 33, name: "Glimepiride 2mg", category: "Diabetes", price: 185, rating: 4.6, inStock: true, prescription: true, manufacturer: "USV", image: getRandomImage(33) },
  { id: 34, name: "Sitagliptin 100mg", category: "Diabetes", price: 495, rating: 4.7, inStock: true, prescription: true, manufacturer: "MSD", image: getRandomImage(34) },
  { id: 35, name: "Voglibose 0.3mg", category: "Diabetes", price: 225, rating: 4.5, inStock: true, prescription: true, manufacturer: "Cipla", image: getRandomImage(35) },
  { id: 36, name: "Insulin Glargine", category: "Diabetes", price: 1250, rating: 4.9, inStock: true, prescription: true, manufacturer: "Sanofi", image: getRandomImage(36) },
  { id: 37, name: "Loperamide 2mg", category: "Digestive", price: 125, rating: 4.4, inStock: true, prescription: false, manufacturer: "Sun Pharma", image: getRandomImage(37) },
  { id: 38, name: "Domperidone 10mg", category: "Digestive", price: 145, rating: 4.5, inStock: true, prescription: false, manufacturer: "Dr. Reddy's", image: getRandomImage(38) },
  { id: 39, name: "Rabeprazole 20mg", category: "Digestive", price: 185, rating: 4.6, inStock: true, prescription: false, manufacturer: "Alkem", image: getRandomImage(39) },
  { id: 40, name: "Esomeprazole 40mg", category: "Digestive", price: 215, rating: 4.7, inStock: true, prescription: false, manufacturer: "Sun Pharma", image: getRandomImage(40) },
  { id: 41, name: "Fexofenadine 180mg", category: "Allergy", price: 285, rating: 4.6, inStock: true, prescription: false, manufacturer: "Sanofi", image: getRandomImage(41) },
  { id: 42, name: "Levocetirizine 5mg", category: "Allergy", price: 165, rating: 4.7, inStock: true, prescription: false, manufacturer: "Cipla", image: getRandomImage(42) },
  { id: 43, name: "Montelukast 10mg", category: "Allergy", price: 195, rating: 4.5, inStock: true, prescription: true, manufacturer: "Sun Pharma", image: getRandomImage(43) },
  { id: 44, name: "Desloratadine 5mg", category: "Allergy", price: 175, rating: 4.4, inStock: true, prescription: false, manufacturer: "Zydus", image: getRandomImage(44) },
  { id: 45, name: "Omega 3 Fatty Acids", category: "Vitamins", price: 445, rating: 4.8, inStock: true, prescription: false, manufacturer: "HealthKart", image: getRandomImage(45) },
  { id: 46, name: "Calcium + D3", category: "Vitamins", price: 325, rating: 4.7, inStock: true, prescription: false, manufacturer: "Himalaya", image: getRandomImage(46) },
  { id: 47, name: "Iron + Folic Acid", category: "Vitamins", price: 195, rating: 4.6, inStock: true, prescription: false, manufacturer: "Pfizer", image: getRandomImage(47) },
  { id: 48, name: "Biotin 10000mcg", category: "Vitamins", price: 395, rating: 4.8, inStock: true, prescription: false, manufacturer: "HealthKart", image: getRandomImage(48) },
  { id: 49, name: "Aspirin 75mg", category: "Pain Relief", price: 125, rating: 4.5, inStock: true, prescription: false, manufacturer: "USV", image: getRandomImage(49) },
  { id: 50, name: "Diclofenac 50mg", category: "Pain Relief", price: 155, rating: 4.6, inStock: true, prescription: false, manufacturer: "Novartis", image: getRandomImage(50) },
  { id: 51, name: "Naproxen 250mg", category: "Pain Relief", price: 175, rating: 4.4, inStock: true, prescription: false, manufacturer: "Cipla", image: getRandomImage(51) },
  { id: 52, name: "Piroxicam 20mg", category: "Pain Relief", price: 165, rating: 4.3, inStock: true, prescription: false, manufacturer: "Sun Pharma", image: getRandomImage(52) },
  { id: 53, name: "Clarithromycin 500mg", category: "Antibiotics", price: 285, rating: 4.6, inStock: true, prescription: true, manufacturer: "Abbott", image: getRandomImage(53) },
  { id: 54, name: "Cefixime 200mg", category: "Antibiotics", price: 225, rating: 4.5, inStock: true, prescription: true, manufacturer: "Zydus", image: getRandomImage(54) },
  { id: 55, name: "Cefpodoxime 200mg", category: "Antibiotics", price: 265, rating: 4.6, inStock: true, prescription: true, manufacturer: "Alkem", image: getRandomImage(55) },
  { id: 56, name: "Ofloxacin 200mg", category: "Antibiotics", price: 175, rating: 4.4, inStock: true, prescription: true, manufacturer: "Cipla", image: getRandomImage(56) },
  { id: 57, name: "Pioglitazone 15mg", category: "Diabetes", price: 195, rating: 4.5, inStock: true, prescription: true, manufacturer: "USV", image: getRandomImage(57) },
  { id: 58, name: "Empagliflozin 10mg", category: "Diabetes", price: 425, rating: 4.7, inStock: true, prescription: true, manufacturer: "Boehringer", image: getRandomImage(58) },
  { id: 59, name: "Dapagliflozin 10mg", category: "Diabetes", price: 395, rating: 4.6, inStock: true, prescription: true, manufacturer: "AstraZeneca", image: getRandomImage(59) },
  { id: 60, name: "Linagliptin 5mg", category: "Diabetes", price: 455, rating: 4.7, inStock: true, prescription: true, manufacturer: "Boehringer", image: getRandomImage(60) },
  { id: 61, name: "Sucralfate 1g", category: "Digestive", price: 175, rating: 4.4, inStock: true, prescription: false, manufacturer: "Abbott", image: getRandomImage(61) },
  { id: 62, name: "Ondansetron 4mg", category: "Digestive", price: 155, rating: 4.5, inStock: true, prescription: false, manufacturer: "Sun Pharma", image: getRandomImage(62) },
  { id: 63, name: "Itopride 50mg", category: "Digestive", price: 185, rating: 4.3, inStock: true, prescription: false, manufacturer: "Cipla", image: getRandomImage(63) },
  { id: 64, name: "Lafutidine 10mg", category: "Digestive", price: 215, rating: 4.4, inStock: true, prescription: false, manufacturer: "Torrent", image: getRandomImage(64) },
  { id: 65, name: "Bilastine 20mg", category: "Allergy", price: 245, rating: 4.5, inStock: true, prescription: false, manufacturer: "Menarini", image: getRandomImage(65) },
  { id: 66, name: "Rupatadine 10mg", category: "Allergy", price: 195, rating: 4.4, inStock: true, prescription: false, manufacturer: "Dr. Reddy's", image: getRandomImage(66) },
  { id: 67, name: "Ebastine 10mg", category: "Allergy", price: 175, rating: 4.3, inStock: true, prescription: false, manufacturer: "Sun Pharma", image: getRandomImage(67) },
  { id: 68, name: "Hydroxyzine 25mg", category: "Allergy", price: 145, rating: 4.2, inStock: true, prescription: true, manufacturer: "Cipla", image: getRandomImage(68) },
  { id: 69, name: "Mecobalamin 1500mcg", category: "Vitamins", price: 275, rating: 4.7, inStock: true, prescription: false, manufacturer: "Abbott", image: getRandomImage(69) },
  { id: 70, name: "Alpha Lipoic Acid", category: "Vitamins", price: 345, rating: 4.6, inStock: true, prescription: false, manufacturer: "HealthKart", image: getRandomImage(70) },
  { id: 71, name: "CoQ10 100mg", category: "Vitamins", price: 495, rating: 4.8, inStock: true, prescription: false, manufacturer: "Himalaya", image: getRandomImage(71) },
  { id: 72, name: "Zinc 50mg", category: "Vitamins", price: 175, rating: 4.5, inStock: true, prescription: false, manufacturer: "Pfizer", image: getRandomImage(72) },
  { id: 73, name: "Tramadol 50mg", category: "Pain Relief", price: 195, rating: 4.3, inStock: true, prescription: true, manufacturer: "Sun Pharma", image: getRandomImage(73) },
  { id: 74, name: "Etoricoxib 90mg", category: "Pain Relief", price: 225, rating: 4.5, inStock: true, prescription: true, manufacturer: "MSD", image: getRandomImage(74) },
];

const categories = ["All", "Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Digestive", "Allergy"];
const manufacturers = ["All Brands", "Cipla", "Sun Pharma", "Abbott", "Sanofi", "Alkem", "Zydus", "USV", "Himalaya", "Dr. Reddy's", "GSK", "Pfizer", "HealthKart", "MSD", "Torrent"];

const Medicine = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedManufacturer, setSelectedManufacturer] = useState("All Brands");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("medicines");
  const { toast } = useToast();

  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || med.category === selectedCategory;
    const matchesManufacturer = selectedManufacturer === "All Brands" || med.manufacturer === selectedManufacturer;
    return matchesSearch && matchesCategory && matchesManufacturer;
  });

  const addToCart = (medicine: Medicine) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === medicine.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...medicine, quantity: 1 }];
    });
    toast({
      title: "Added to cart",
      description: `${medicine.name} has been added to your cart.`,
    });
  };

  const toggleWishlist = (medicineId: number) => {
    setWishlist((prev) => {
      if (prev.includes(medicineId)) {
        toast({
          title: "Removed from wishlist",
          description: "Item removed from your wishlist.",
        });
        return prev.filter((id) => id !== medicineId);
      } else {
        toast({
          title: "Added to wishlist",
          description: "Item added to your wishlist.",
        });
        return [...prev, medicineId];
      }
    });
  };

  const removeFromCart = (medicineId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== medicineId));
  };

  const updateQuantity = (medicineId: number, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === medicineId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckout(true);
  };

  const handlePlaceOrder = () => {
    const newOrder: Order = {
      id: `ORD${Date.now()}`,
      items: [...cart],
      total: cartTotal,
      status: 'processing',
      date: new Date().toLocaleDateString('en-IN'),
      address: 'Mumbai, Maharashtra',
    };
    setOrders((prev) => [newOrder, ...prev]);
    setOrderPlaced(true);
    setTimeout(() => {
      setCart([]);
      setIsCheckout(false);
      setOrderPlaced(false);
    }, 3000);
  };

  const handlePrescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrescriptionFile(file);
      toast({
        title: "Prescription uploaded",
        description: "Your prescription has been uploaded successfully. Our pharmacist will review it.",
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing': return 'bg-yellow-500';
      case 'shipped': return 'bg-blue-500';
      case 'out-for-delivery': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'processing': return 'Processing';
      case 'shipped': return 'Shipped';
      case 'out-for-delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  const wishlistMedicines = medicines.filter((med) => wishlist.includes(med.id));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-healthcare-green/90 to-emerald-400 text-white py-6 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src={logo} alt="HealNest Logo" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-bold font-display">HealNest</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link to="/" className="hover:text-white/80 transition-colors font-medium hidden sm:block">
                Find Doctors
              </Link>
              
              {/* Wishlist Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-white border-white/70 bg-white/10 hover:bg-white/30 relative">
                    <Heart className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Wishlist</span>
                    {wishlist.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      Your Wishlist ({wishlist.length} items)
                    </DialogTitle>
                  </DialogHeader>
                  {wishlistMedicines.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Your wishlist is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {wishlistMedicines.map((med) => (
                        <div key={med.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <img src={med.image} alt={med.name} className="w-14 h-14 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{med.name}</h4>
                            <p className="text-sm text-healthcare-teal font-semibold">{formatPrice(med.price)}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => addToCart(med)} className="bg-healthcare-teal hover:bg-healthcare-teal/90">
                              <Plus className="w-3 h-3 mr-1" /> Add
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => toggleWishlist(med.id)} className="text-red-500">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {/* Order Tracking Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-white border-white/70 bg-white/10 hover:bg-white/30">
                    <Package className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Orders</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Order Tracking
                    </DialogTitle>
                  </DialogHeader>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No orders yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="font-semibold">{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                            </div>
                            <Badge className={`${getStatusColor(order.status)} text-white`}>
                              {getStatusText(order.status)}
                            </Badge>
                          </div>
                          
                          {/* Order Timeline */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${order.status !== 'processing' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                              <Check className="w-3 h-3" />
                            </div>
                            <div className={`flex-1 h-1 ${order.status !== 'processing' ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${order.status === 'shipped' || order.status === 'out-for-delivery' || order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}>
                              <Truck className="w-3 h-3" />
                            </div>
                            <div className={`flex-1 h-1 ${order.status === 'out-for-delivery' || order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${order.status === 'out-for-delivery' || order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}>
                              <MapPin className="w-3 h-3" />
                            </div>
                            <div className={`flex-1 h-1 ${order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}>
                              <Check className="w-3 h-3" />
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{order.items.length} items</span>
                            <span className="font-semibold text-healthcare-teal">{formatPrice(order.total)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </DialogContent>
              </Dialog>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="text-white border-white/70 bg-white/10 hover:bg-white/30 relative">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Your Cart ({cartItemCount} items)
                    </SheetTitle>
                  </SheetHeader>
                  
                  {orderPlaced ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Check className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Order Placed Successfully!</h3>
                      <p className="text-muted-foreground">Your medicines will be delivered within 2-3 days.</p>
                    </div>
                  ) : isCheckout ? (
                    <div className="mt-6 space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Delivery Address</h3>
                        <Input placeholder="Full Name" />
                        <Input placeholder="Phone Number" />
                        <Input placeholder="Address Line 1" />
                        <Input placeholder="Address Line 2" />
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="City" />
                          <Input placeholder="PIN Code" />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold">Payment Method</h3>
                        <div className="space-y-2">
                          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
                            <input type="radio" name="payment" defaultChecked className="accent-healthcare-teal" />
                            <CreditCard className="w-5 h-5" />
                            <span>Cash on Delivery</span>
                          </label>
                          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
                            <input type="radio" name="payment" className="accent-healthcare-teal" />
                            <CreditCard className="w-5 h-5" />
                            <span>UPI / Card Payment</span>
                          </label>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Delivery</span>
                          <span className="text-green-600">FREE</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span className="text-healthcare-teal">{formatPrice(cartTotal)}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsCheckout(false)} className="flex-1">
                          Back
                        </Button>
                        <Button onClick={handlePlaceOrder} className="flex-1 bg-healthcare-teal hover:bg-healthcare-teal/90">
                          Place Order
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mt-6 space-y-4 max-h-[50vh] overflow-y-auto">
                        {cart.length === 0 ? (
                          <div className="text-center py-12">
                            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Your cart is empty</p>
                          </div>
                        ) : (
                          cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-600"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                      
                      {cart.length > 0 && (
                        <SheetFooter className="mt-6">
                          <div className="w-full space-y-4">
                            <Separator />
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-semibold">Total:</span>
                              <span className="text-2xl font-bold text-healthcare-teal">{formatPrice(cartTotal)}</span>
                            </div>
                            <Button
                              className="w-full bg-healthcare-teal hover:bg-healthcare-teal/90"
                              size="lg"
                              onClick={handleCheckout}
                            >
                              Proceed to Checkout
                            </Button>
                          </div>
                        </SheetFooter>
                      )}
                    </>
                  )}
                </SheetContent>
              </Sheet>
              
              <div className="bg-emerald-300 rounded-lg p-1">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-healthcare-teal/10 via-background to-healthcare-green/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Health, <span className="text-healthcare-teal">Delivered</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Order medicines online and get them delivered to your doorstep. Quality medications at affordable prices.
          </p>
          
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search medicines, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-full shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Truck className="w-5 h-5 text-healthcare-teal" />
              <span>Free Delivery on ₹500+</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-5 h-5 text-healthcare-teal" />
              <span>100% Authentic</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5 text-healthcare-teal" />
              <span>Same Day Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <main className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="medicines" className="flex items-center gap-2">
              <Pill className="w-4 h-4" />
              Medicines
            </TabsTrigger>
            <TabsTrigger value="prescription" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Upload Prescription
            </TabsTrigger>
          </TabsList>

          <TabsContent value="medicines">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Manufacturers */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <span className="text-sm text-muted-foreground self-center mr-2">By Brand:</span>
              {manufacturers.map((manufacturer) => (
                <Button
                  key={manufacturer}
                  variant={selectedManufacturer === manufacturer ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedManufacturer(manufacturer)}
                  className={selectedManufacturer === manufacturer ? "bg-healthcare-green hover:bg-healthcare-green/90" : "text-muted-foreground hover:text-foreground"}
                >
                  {manufacturer}
                </Button>
              ))}
            </div>

            {/* Medicine Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedicines.map((medicine) => (
                <Card key={medicine.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {medicine.category}
                      </Badge>
                      <button 
                        className={`transition-colors ${wishlist.includes(medicine.id) ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
                        onClick={() => toggleWishlist(medicine.id)}
                      >
                        <Heart className={`w-5 h-5 ${wishlist.includes(medicine.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <div className="w-full h-32 rounded-lg flex items-center justify-center mt-2 overflow-hidden">
                      <img 
                        src={medicine.image} 
                        alt={medicine.name}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <CardTitle className="text-lg mb-1">{medicine.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mb-2">{medicine.manufacturer}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">{medicine.rating}</span>
                    </div>
                    {medicine.prescription && (
                      <Badge variant="outline" className="text-xs text-orange-600 border-orange-600">
                        Prescription Required
                      </Badge>
                    )}
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-healthcare-teal">{formatPrice(medicine.price)}</span>
                    <Button 
                      size="sm" 
                      disabled={!medicine.inStock}
                      className="bg-healthcare-teal hover:bg-healthcare-teal/90"
                      onClick={() => addToCart(medicine)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredMedicines.length === 0 && (
              <div className="text-center py-12">
                <Pill className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No medicines found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="prescription">
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-healthcare-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-10 h-10 text-healthcare-teal" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Upload Your Prescription</h2>
                  <p className="text-muted-foreground">
                    Upload your prescription and we'll prepare your medicines. Our pharmacist will review and verify.
                  </p>
                </div>

                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-healthcare-teal transition-colors">
                  <input
                    type="file"
                    id="prescription"
                    accept="image/*,.pdf"
                    onChange={handlePrescriptionUpload}
                    className="hidden"
                  />
                  <label htmlFor="prescription" className="cursor-pointer">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-foreground font-medium mb-2">
                      {prescriptionFile ? prescriptionFile.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-muted-foreground">PNG, JPG or PDF (max. 10MB)</p>
                  </label>
                </div>

                {prescriptionFile && (
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-green-700 dark:text-green-400">Prescription uploaded successfully!</p>
                      <p className="text-sm text-green-600 dark:text-green-500">Our pharmacist will review it within 24 hours.</p>
                    </div>
                  </div>
                )}

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-accent rounded-lg text-center">
                    <Shield className="w-6 h-6 text-healthcare-teal mx-auto mb-2" />
                    <p className="text-sm font-medium">100% Secure</p>
                  </div>
                  <div className="p-4 bg-accent rounded-lg text-center">
                    <Clock className="w-6 h-6 text-healthcare-teal mx-auto mb-2" />
                    <p className="text-sm font-medium">24hr Review</p>
                  </div>
                  <div className="p-4 bg-accent rounded-lg text-center">
                    <Truck className="w-6 h-6 text-healthcare-teal mx-auto mb-2" />
                    <p className="text-sm font-medium">Fast Delivery</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Medicine;
