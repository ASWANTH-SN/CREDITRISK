// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { 
//   ArrowLeft, 
//   Search, 
//   Shield, 
//   AlertTriangle, 
//   CheckCircle, 
//   XCircle,
//   DollarSign,
//   Calendar,
//   TrendingUp,
//   Building,
//   Globe,
//   BarChart3
// } from "lucide-react";

// // Mock entity data
// const mockCustomers = {
//   high: [
//     { id: "ENT029", entity_id: "ENT029", entity_name: "Aurora Labs 128", score: 0.92, sector: "Technology", country: "Singapore", revenue_usd_m: "3695.26", implied_rating: "B+" },
//     { id: "ENT030", entity_id: "ENT030", entity_name: "Global Manufacturing Corp", score: 0.89, sector: "Manufacturing", country: "Germany", revenue_usd_m: "2450.15", implied_rating: "B" },
//     { id: "ENT031", entity_id: "ENT031", entity_name: "DataTech Solutions", score: 0.85, sector: "Technology", country: "USA", revenue_usd_m: "1800.75", implied_rating: "B-" },
//     { id: "ENT032", entity_id: "ENT032", entity_name: "Energy Holdings Ltd", score: 0.83, sector: "Energy", country: "Norway", revenue_usd_m: "4200.50", implied_rating: "B" },
//     { id: "ENT033", entity_id: "ENT033", entity_name: "Retail Chain Inc", score: 0.81, sector: "Retail", country: "Canada", revenue_usd_m: "950.25", implied_rating: "B-" },
//   ],
//   medium: [
//     { id: "ENT034", entity_id: "ENT034", entity_name: "Industrial Corp", score: 0.65, sector: "Industrial", country: "Japan", revenue_usd_m: "1250.80", implied_rating: "BB" },
//     { id: "ENT035", entity_id: "ENT035", entity_name: "Financial Services Ltd", score: 0.62, sector: "Financial", country: "UK", revenue_usd_m: "3800.45", implied_rating: "BB+" },
//     { id: "ENT036", entity_id: "ENT036", entity_name: "Healthcare Group", score: 0.59, sector: "Healthcare", country: "Switzerland", revenue_usd_m: "2100.30", implied_rating: "BB" },
//     { id: "ENT037", entity_id: "ENT037", entity_name: "Transport Solutions", score: 0.57, sector: "Transportation", country: "France", revenue_usd_m: "1680.90", implied_rating: "BB-" },
//     { id: "ENT038", entity_id: "ENT038", entity_name: "Real Estate Holdings", score: 0.54, sector: "Real Estate", country: "Australia", revenue_usd_m: "750.60", implied_rating: "BB-" },
//   ],
//   low: [
//     { id: "ENT039", entity_id: "ENT039", entity_name: "Tech Innovations Inc", score: 0.25, sector: "Technology", country: "USA", revenue_usd_m: "5200.75", implied_rating: "A-" },
//     { id: "ENT040", entity_id: "ENT040", entity_name: "Pharmaceutical Corp", score: 0.22, sector: "Healthcare", country: "Switzerland", revenue_usd_m: "8900.25", implied_rating: "A" },
//     { id: "ENT041", entity_id: "ENT041", entity_name: "Banking Group", score: 0.19, sector: "Financial", country: "UK", revenue_usd_m: "12500.80", implied_rating: "A+" },
//     { id: "ENT042", entity_id: "ENT042", entity_name: "Utility Company", score: 0.17, sector: "Utilities", country: "Germany", revenue_usd_m: "4800.30", implied_rating: "A" },
//     { id: "ENT043", entity_id: "ENT043", entity_name: "Consumer Goods Ltd", score: 0.15, sector: "Consumer", country: "Netherlands", revenue_usd_m: "6200.45", implied_rating: "A+" },
//   ]
// };

// const RiskCategory = () => {
//   const { category } = useParams<{ category: string }>();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");

//   const riskLevel = category?.toLowerCase() || "high";
//   const customers = mockCustomers[riskLevel as keyof typeof mockCustomers] || [];
  
//   const filteredCustomers = customers.filter(customer =>
//     customer.entity_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.entity_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.country.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getRiskConfig = (level: string) => {
//     switch (level) {
//       case "high":
//         return {
//           title: "High Risk Entities",
//           icon: XCircle,
//           color: "text-risk-high",
//           bgColor: "bg-risk-high-light",
//           badgeColor: "bg-risk-high text-risk-high-foreground"
//         };
//       case "medium":
//         return {
//           title: "Medium Risk Entities",
//           icon: AlertTriangle,
//           color: "text-risk-medium",
//           bgColor: "bg-risk-medium-light",
//           badgeColor: "bg-risk-medium text-risk-medium-foreground"
//         };
//       case "low":
//         return {
//           title: "Low Risk Entities",
//           icon: CheckCircle,
//           color: "text-risk-low",
//           bgColor: "bg-risk-low-light",
//           badgeColor: "bg-risk-low text-risk-low-foreground"
//         };
//       default:
//         return {
//           title: "Risk Assessment",
//           icon: Shield,
//           color: "text-primary",
//           bgColor: "bg-primary/10",
//           badgeColor: "bg-primary text-primary-foreground"
//         };
//     }
//   };

//   const config = getRiskConfig(riskLevel);
//   const IconComponent = config.icon;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted">
//       {/* Header */}
//       <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button 
//                 variant="outline" 
//                 size="sm"
//                 onClick={() => navigate("/dashboard")}
//                 className="border-border/50"
//               >
//                 <ArrowLeft className="h-4 w-4 mr-2" />
//                 Back to Dashboard
//               </Button>
//               <div className="flex items-center space-x-3">
//                 <div className={`p-2 ${config.bgColor} rounded-lg`}>
//                   <IconComponent className={`h-6 w-6 ${config.color}`} />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold text-foreground">{config.title}</h1>
//                   <p className="text-sm text-muted-foreground">{filteredCustomers.length} entities found</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-6 py-8">
//         {/* Risk Gauge Meter */}
//         <Card className="shadow-card border-border/50 mb-6">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <BarChart3 className="h-5 w-5 text-primary" />
//               <span>Risk Distribution Overview</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-3 gap-4">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-risk-high">89</div>
//                 <div className="text-sm text-muted-foreground">High Risk</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-risk-medium">234</div>
//                 <div className="text-sm text-muted-foreground">Medium Risk</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-risk-low">924</div>
//                 <div className="text-sm text-muted-foreground">Low Risk</div>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-risk-high">High Risk</span>
//                 <span className="text-sm text-muted-foreground">7.1%</span>
//               </div>
//               <Progress value={7.1} className="h-2" style={{ '--tw-bg-opacity': '0.2' } as any} />
              
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-risk-medium">Medium Risk</span>
//                 <span className="text-sm text-muted-foreground">18.8%</span>
//               </div>
//               <Progress value={18.8} className="h-2" style={{ '--tw-bg-opacity': '0.2' } as any} />
              
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-risk-low">Low Risk</span>
//                 <span className="text-sm text-muted-foreground">74.1%</span>
//               </div>
//               <Progress value={74.1} className="h-2" style={{ '--tw-bg-opacity': '0.2' } as any} />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Search and Filters */}
//         <Card className="shadow-card border-border/50 mb-6">
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search entities by name, ID, sector, or country..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//               <Badge variant="outline" className="px-3 py-2">
//                 {filteredCustomers.length} Results
//               </Badge>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Entity List */}
//         <div className="space-y-4">
//           {filteredCustomers.map((entity) => (
//             <Card 
//               key={entity.id}
//               className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
//               onClick={() => navigate(`/customer/${entity.id}`)}
//             >
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <div className="flex-1">
//                       <div className="flex items-center space-x-3 mb-2">
//                         <h3 className="text-lg font-semibold text-foreground">{entity.entity_name}</h3>
//                         <Badge className={config.badgeColor}>
//                           {(entity.score * 100).toFixed(0)} Risk Score
//                         </Badge>
//                       </div>
                      
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                         <div className="flex items-center space-x-2">
//                           <Shield className="h-4 w-4 text-muted-foreground" />
//                           <div>
//                             <p className="text-muted-foreground">Entity ID</p>
//                             <p className="font-medium text-foreground">{entity.entity_id}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center space-x-2">
//                           <Building className="h-4 w-4 text-muted-foreground" />
//                           <div>
//                             <p className="text-muted-foreground">Sector</p>
//                             <p className="font-medium text-foreground">{entity.sector}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center space-x-2">
//                           <Globe className="h-4 w-4 text-muted-foreground" />
//                           <div>
//                             <p className="text-muted-foreground">Country</p>
//                             <p className="font-medium text-foreground">{entity.country}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center space-x-2">
//                           <DollarSign className="h-4 w-4 text-muted-foreground" />
//                           <div>
//                             <p className="text-muted-foreground">Revenue (USD M)</p>
//                             <p className="font-medium text-foreground">{entity.revenue_usd_m}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="text-right">
//                     <div className={`text-3xl font-bold ${config.color}`}>
//                       {(entity.score * 100).toFixed(0)}
//                     </div>
//                     <p className="text-sm text-muted-foreground">Risk Score</p>
//                     <p className="text-xs text-muted-foreground">{entity.implied_rating}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {filteredCustomers.length === 0 && (
//           <Card className="shadow-card border-border/50">
//             <CardContent className="p-12 text-center">
//               <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//               <h3 className="text-lg font-semibold text-foreground mb-2">No entities found</h3>
//               <p className="text-muted-foreground">Try adjusting your search criteria</p>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RiskCategory;


// RiskCategory.tsx
// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { 
//   ArrowLeft, 
//   User, 
//   Shield,
//   AlertTriangle,
//   CheckCircle,
//   XCircle,
//   Search,
//   Building,
//   Globe,
//   TrendingUp
// } from "lucide-react";
// import { useState } from "react";

// // Mock data for different risk categories
// const mockRiskData = {
//   high: [
//     { name: "Aurora Labs 128", score: 0.92, id: "ENT029", entity_id: "ENT029", sector: "Technology", country: "Singapore", revenue: "$3,695M" },
//     { name: "Global Manufacturing Corp", score: 0.89, id: "ENT030", entity_id: "ENT030", sector: "Manufacturing", country: "Germany", revenue: "$2,840M" },
//     { name: "DataTech Solutions", score: 0.85, id: "ENT031", entity_id: "ENT031", sector: "Technology", country: "USA", revenue: "$1,920M" },
//     { name: "Energy Holdings Ltd", score: 0.83, id: "ENT032", entity_id: "ENT032", sector: "Energy", country: "Norway", revenue: "$4,150M" },
//     { name: "Retail Chain Inc", score: 0.81, id: "ENT033", entity_id: "ENT033", sector: "Retail", country: "Canada", revenue: "$2,680M" },
//   ],
//   medium: [
//     { name: "Tech Innovations Ltd", score: 0.65, id: "ENT034", entity_id: "ENT034", sector: "Technology", country: "UK", revenue: "$1,450M" },
//     { name: "Healthcare Solutions", score: 0.62, id: "ENT035", entity_id: "ENT035", sector: "Healthcare", country: "France", revenue: "$890M" },
//     { name: "Green Energy Corp", score: 0.58, id: "ENT036", entity_id: "ENT036", sector: "Energy", country: "Denmark", revenue: "$1,230M" },
//     { name: "Financial Services Inc", score: 0.55, id: "ENT037", entity_id: "ENT037", sector: "Finance", country: "Switzerland", revenue: "$3,200M" },
//     { name: "Logistics Group", score: 0.52, id: "ENT038", entity_id: "ENT038", sector: "Logistics", country: "Netherlands", revenue: "$780M" },
//   ],
//   low: [
//     { name: "Stable Manufacturing", score: 0.25, id: "ENT039", entity_id: "ENT039", sector: "Manufacturing", country: "Japan", revenue: "$2,100M" },
//     { name: "Reliable Services", score: 0.22, id: "ENT040", entity_id: "ENT040", sector: "Services", country: "Australia", revenue: "$1,340M" },
//     { name: "Conservative Banking", score: 0.18, id: "ENT041", entity_id: "ENT041", sector: "Finance", country: "Switzerland", revenue: "$5,670M" },
//     { name: "Utility Company", score: 0.15, id: "ENT042", entity_id: "ENT042", sector: "Utilities", country: "Sweden", revenue: "$920M" },
//     { name: "Insurance Group", score: 0.12, id: "ENT043", entity_id: "ENT043", sector: "Insurance", country: "Germany", revenue: "$4,200M" },
//   ]
// };

// const RiskCategory = () => {
//   const { category } = useParams<{ category: string }>();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");

//   const categoryData = mockRiskData[category as keyof typeof mockRiskData] || [];
  
//   const getRiskConfig = (cat: string) => {
//     switch (cat) {
//       case "high":
//         return { 
//           icon: XCircle, 
//           color: "text-risk-high", 
//           bgColor: "bg-risk-high text-risk-high-foreground", 
//           label: "High Risk Entities",
//           description: "Entities requiring immediate attention and enhanced monitoring"
//         };
//       case "medium":
//         return { 
//           icon: AlertTriangle, 
//           color: "text-risk-medium", 
//           bgColor: "bg-risk-medium text-risk-medium-foreground", 
//           label: "Medium Risk Entities",
//           description: "Entities with moderate risk factors that need regular review"
//         };
//       case "low":
//         return { 
//           icon: CheckCircle, 
//           color: "text-risk-low", 
//           bgColor: "bg-risk-low text-risk-low-foreground", 
//           label: "Low Risk Entities",
//           description: "Entities with minimal risk factors and stable profiles"
//         };
//       default:
//         return { 
//           icon: Shield, 
//           color: "text-primary", 
//           bgColor: "bg-primary text-primary-foreground", 
//           label: "Risk Assessment",
//           description: "Entity risk evaluation"
//         };
//     }
//   };

//   const config = getRiskConfig(category || "");
//   const IconComponent = config.icon;

//   const filteredEntities = categoryData.filter(entity =>
//     entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     entity.entity_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     entity.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     entity.country.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted">
//       {/* Header */}
//       <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button 
//                 variant="outline" 
//                 size="sm"
//                 onClick={() => navigate("/evaluated")}
//                 className="border-border/50"
//               >
//                 <ArrowLeft className="h-4 w-4 mr-2" />
//                 Back to Dashboard
//               </Button>
//               <div className="flex items-center space-x-3">
//                 <div className={p-2 rounded-lg ${config.bgColor}}>
//                   <IconComponent className="h-6 w-6" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold text-foreground">{config.label}</h1>
//                   <p className="text-sm text-muted-foreground">{config.description}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Right - Actions */}
//             <div className="flex items-center space-x-3">
//               <Button 
//                 variant="outline" 
//                 size="sm"
//                 onClick={() => navigate("/upload")}
//                 className="border-border/50"
//               >
//                 New Analysis
//               </Button>
//               <Button 
//                 variant="outline" 
//                 size="sm"
//                 onClick={() => navigate("/")}
//                 className="border-border/50"
//               >
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-6 py-8 space-y-6">
//         {/* Summary Card */}
//         <Card className="shadow-card border-border/50">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className={p-3 rounded-full ${config.bgColor}}>
//                   <IconComponent className="h-8 w-8" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-foreground">
//                     {filteredEntities.length} {config.label}
//                   </h2>
//                   <p className="text-muted-foreground">{config.description}</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-muted-foreground">Category</p>
//                 <p className={text-2xl font-bold capitalize ${config.color}}>
//                   {category} Risk
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Search */}
//         <Card className="shadow-card border-border/50">
//           <CardContent className="p-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search entities by name, ID, sector, or country..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Entity List */}
//         <div className="grid grid-cols-1 gap-4">
//           {filteredEntities.length > 0 ? (
//             filteredEntities.map((entity, index) => (
//               <Card 
//                 key={entity.id}
//                 className="shadow-card border-border/50 hover:shadow-hover transition-all duration-200 cursor-pointer"
//                 onClick={() => navigate(/customer/${entity.id})}
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-4">
//                       <div className={w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${config.bgColor}}>
//                         {index + 1}
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-lg font-semibold text-foreground">{entity.name}</h3>
//                         <div className="flex items-center space-x-4 mt-1">
//                           <div className="flex items-center space-x-1">
//                             <Shield className="h-3 w-3 text-muted-foreground" />
//                             <span className="text-sm text-muted-foreground">{entity.entity_id}</span>
//                           </div>
//                           <div className="flex items-center space-x-1">
//                             <Building className="h-3 w-3 text-muted-foreground" />
//                             <span className="text-sm text-muted-foreground">{entity.sector}</span>
//                           </div>
//                           <div className="flex items-center space-x-1">
//                             <Globe className="h-3 w-3 text-muted-foreground" />
//                             <span className="text-sm text-muted-foreground">{entity.country}</span>
//                           </div>
//                           <div className="flex items-center space-x-1">
//                             <TrendingUp className="h-3 w-3 text-muted-foreground" />
//                             <span className="text-sm text-muted-foreground">{entity.revenue}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className={text-2xl font-bold ${config.color}}>
//                         {(entity.score * 100).toFixed(0)}%
//                       </div>
//                       <p className="text-xs text-muted-foreground">Risk Score</p>
//                       <Badge className={mt-2 ${config.bgColor}}>
//                         <IconComponent className="h-3 w-3 mr-1" />
//                         {category?.charAt(0).toUpperCase() + category?.slice(1)} Risk
//                       </Badge>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))
//           ) : (
//             <Card className="shadow-card border-border/50">
//               <CardContent className="p-12 text-center">
//                 <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-foreground mb-2">No entities found</h3>
//                 <p className="text-muted-foreground">
//                   Try adjusting your search terms or check back later.
//                 </p>
//               </CardContent>
//             </Card>
//           )}
//         </div>

        
//       </div>
//     </div>
//   );
// };

// export default RiskCategory;







import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Building,
  Globe,
  TrendingUp
} from "lucide-react";
import { useState } from "react";

// Mock data for different risk categories
const mockRiskData = {
  high: [
    { name: "Aurora Labs 128", score: 0.92, id: "ENT029", entity_id: "ENT029", sector: "Technology", country: "Singapore", revenue: "$3,695M" },
    { name: "Global Manufacturing Corp", score: 0.89, id: "ENT030", entity_id: "ENT030", sector: "Manufacturing", country: "Germany", revenue: "$2,840M" },
    { name: "DataTech Solutions", score: 0.85, id: "ENT031", entity_id: "ENT031", sector: "Technology", country: "USA", revenue: "$1,920M" },
    { name: "Energy Holdings Ltd", score: 0.83, id: "ENT032", entity_id: "ENT032", sector: "Energy", country: "Norway", revenue: "$4,150M" },
    { name: "Retail Chain Inc", score: 0.81, id: "ENT033", entity_id: "ENT033", sector: "Retail", country: "Canada", revenue: "$2,680M" },
  ],
  medium: [
    { name: "Tech Innovations Ltd", score: 0.65, id: "ENT034", entity_id: "ENT034", sector: "Technology", country: "UK", revenue: "$1,450M" },
    { name: "Healthcare Solutions", score: 0.62, id: "ENT035", entity_id: "ENT035", sector: "Healthcare", country: "France", revenue: "$890M" },
    { name: "Green Energy Corp", score: 0.58, id: "ENT036", entity_id: "ENT036", sector: "Energy", country: "Denmark", revenue: "$1,230M" },
    { name: "Financial Services Inc", score: 0.55, id: "ENT037", entity_id: "ENT037", sector: "Finance", country: "Switzerland", revenue: "$3,200M" },
    { name: "Logistics Group", score: 0.52, id: "ENT038", entity_id: "ENT038", sector: "Logistics", country: "Netherlands", revenue: "$780M" },
  ],
  low: [
    { name: "Stable Manufacturing", score: 0.25, id: "ENT039", entity_id: "ENT039", sector: "Manufacturing", country: "Japan", revenue: "$2,100M" },
    { name: "Reliable Services", score: 0.22, id: "ENT040", entity_id: "ENT040", sector: "Services", country: "Australia", revenue: "$1,340M" },
    { name: "Conservative Banking", score: 0.18, id: "ENT041", entity_id: "ENT041", sector: "Finance", country: "Switzerland", revenue: "$5,670M" },
    { name: "Utility Company", score: 0.15, id: "ENT042", entity_id: "ENT042", sector: "Utilities", country: "Sweden", revenue: "$920M" },
    { name: "Insurance Group", score: 0.12, id: "ENT043", entity_id: "ENT043", sector: "Insurance", country: "Germany", revenue: "$4,200M" },
  ]
};

const RiskCategory = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const categoryData = mockRiskData[category as keyof typeof mockRiskData] || [];
  
  const getRiskConfig = (cat: string) => {
    switch (cat) {
      case "high":
        return { 
          icon: XCircle, 
          color: "text-risk-high", 
          bgColor: "bg-risk-high text-risk-high-foreground", 
          label: "High Risk Entities",
          description: "Entities requiring immediate attention and enhanced monitoring"
        };
      case "medium":
        return { 
          icon: AlertTriangle, 
          color: "text-risk-medium", 
          bgColor: "bg-risk-medium text-risk-medium-foreground", 
          label: "Medium Risk Entities",
          description: "Entities with moderate risk factors that need regular review"
        };
      case "low":
        return { 
          icon: CheckCircle, 
          color: "text-risk-low", 
          bgColor: "bg-risk-low text-risk-low-foreground", 
          label: "Low Risk Entities",
          description: "Entities with minimal risk factors and stable profiles"
        };
      default:
        return { 
          icon: Shield, 
          color: "text-primary", 
          bgColor: "bg-primary text-primary-foreground", 
          label: "Risk Assessment",
          description: "Entity risk evaluation"
        };
    }
  };

  const config = getRiskConfig(category || "");
  const IconComponent = config.icon;

  const filteredEntities = categoryData.filter(entity =>
    entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.entity_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/evaluated")}
              className="border-border/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${config.bgColor}`}>
                <IconComponent className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{config.label}</h1>
                <p className="text-sm text-muted-foreground">{config.description}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/upload")}
              className="border-border/50"
            >
              New Analysis
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/")}
              className="border-border/50"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-6">
        {/* Summary Card */}
        <Card className="shadow-card border-border/50">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${config.bgColor}`}>
                <IconComponent className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {filteredEntities.length} {config.label}
                </h2>
                <p className="text-muted-foreground">{config.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Category</p>
              <p className={`text-2xl font-bold capitalize ${config.color}`}>
                {category} Risk
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Card className="shadow-card border-border/50">
          <CardContent className="p-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search entities by name, ID, sector, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </CardContent>
        </Card>

        {/* Entity List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredEntities.length > 0 ? (
            filteredEntities.map((entity, index) => (
              <Card 
                key={entity.id}
                className="shadow-card border-border/50 hover:shadow-hover transition-all duration-200 cursor-pointer"
                onClick={() => navigate(`/customer/${entity.id}`)}
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                                     <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${config.bgColor}`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{entity.name}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Shield className="h-3 w-3" />
                          <span>{entity.entity_id}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Building className="h-3 w-3" />
                          <span>{entity.sector}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Globe className="h-3 w-3" />
                          <span>{entity.country}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>{entity.revenue}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-2xl font-bold ${config.color}`}>
                      {(entity.score * 100).toFixed(0)}%
                    </div>
                    <p className="text-xs text-muted-foreground">Risk Score</p>
                    <Badge className={`mt-2 ${config.bgColor} flex items-center space-x-1`}>
                      <IconComponent className="h-3 w-3" />
                      <span>{category?.charAt(0).toUpperCase() + category?.slice(1)} Risk</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="shadow-card border-border/50">
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No entities found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or check back later.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskCategory;

