// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Input } from "@/components/ui/input";
// import { 
//   Upload, 
//   FileSpreadsheet, 
//   AlertTriangle, 
//   CheckCircle, 
//   XCircle,
//   Users,
//   TrendingUp,
//   Shield,
//   BarChart3,
//   Search
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// // Mock data for demonstration
// const mockResults = {
//   totalRecords: 1247,
//   highRisk: 89,
//   mediumRisk: 234,
//   lowRisk: 924,
//   topRiskyCustomers: [
//     { name: "Aurora Labs 128", score: 0.92, id: "ENT029", entity_id: "ENT029", sector: "Technology", country: "Singapore" },
//     { name: "Global Manufacturing Corp", score: 0.89, id: "ENT030", entity_id: "ENT030", sector: "Manufacturing", country: "Germany" },
//     { name: "DataTech Solutions", score: 0.85, id: "ENT031", entity_id: "ENT031", sector: "Technology", country: "USA" },
//     { name: "Energy Holdings Ltd", score: 0.83, id: "ENT032", entity_id: "ENT032", sector: "Energy", country: "Norway" },
//     { name: "Retail Chain Inc", score: 0.81, id: "ENT033", entity_id: "ENT033", sector: "Retail", country: "Canada" },
//   ]
// };

// const Dashboard = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [isEvaluating, setIsEvaluating] = useState(false);
//   const [hasResults, setHasResults] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//    const [results, setResults] = useState<any | null>(null);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       toast({
//         title: "File Uploaded",
//         description: `${selectedFile.name} ready for analysis`,
//       });
//     }
//   };

//   // const handleEvaluate = () => {
//   //   if (!file) {
//   //     toast({
//   //       title: "No File Selected",
//   //       description: "Please upload a file before evaluation",
//   //       variant: "destructive",
//   //     });
//   //     return;
//   //   }

//   //   setIsEvaluating(true);
    
//   //   // Simulate AI processing
//   //   setTimeout(() => {
//   //     setIsEvaluating(false);
//   //     setHasResults(true);
//   //     toast({
//   //       title: "Analysis Complete",
//   //       description: `Processed ${mockResults.totalRecords} customer records`,
//   //     });
//   //   }, 3000);
//   // };

//   const handleEvaluate = async () => {
//     console.log(file)

//   if (!file) {
//     toast({
//       title: "No File Selected",
//       description: "Please upload a file before evaluation",
//       variant: "destructive",
//     });
//     return;
//   }

//   setIsEvaluating(true);

//   try {
//     const formData = new FormData();
//     formData.append("csvFile", file); // field name must match backend multer field

//     const res = await fetch("http://localhost:5000/api/uploads", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();

//     if (data.success) {
//       toast({
//         title: "Analysis Complete",
//         description: `Processed ${data.rowCount} customer records`,
//       });
//       setResults(data); // save API response
//       setHasResults(true);
//     } else {
//       toast({
//         title: "Error",
//         description: data.message || "Something went wrong",
//         variant: "destructive",
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     toast({
//       title: "Error",
//       description: "Failed to upload the file",
//       variant: "destructive",
//     });
//   } finally {
//     setIsEvaluating(false);
//   }
// };


//   const handleRiskClick = (riskLevel: string) => {
//     navigate(`/risk/${riskLevel.toLowerCase()}`);
//   };

//   const getRiskPercentage = (count: number) => {
//     return ((count / mockResults.totalRecords) * 100).toFixed(1);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted">
//       {/* Header */}
//       <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
//   <div className="container mx-auto px-6 py-4">
//     <div className="flex items-center justify-between">
      
//       {/* Left - Logo & Title */}
//       <div className="flex items-center space-x-3">
//         <div className="p-2 bg-gradient-to-br from-primary to-primary-light rounded-lg">
//           <Shield className="h-6 w-6 text-primary-foreground" />
//         </div>
//         <h1 className="text-2xl font-bold text-foreground">CréditVue</h1>
//       </div>

//       {/* Center - Search */}
//       <div className="flex-1 flex justify-center">
//         <div className="relative w-full max-w-md">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search entities..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 w-full"
//           />
//         </div>
//       </div>

//       {/* Right - Logout */}
//       <div>
//         <Button 
//           variant="outline" 
//           onClick={() => navigate("/")}
//           className="border-border/50"
//         >
//           Logout
//         </Button>
//       </div>
//     </div>
//   </div>
// </header>


//       <div className="container mx-auto px-6 py-8 space-y-8">
//         {/* File Upload Section */}
//         <Card className="shadow-card border-border/50">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <Upload className="h-5 w-5 text-primary" />
//               <span>Data Upload & Analysis</span>
//             </CardTitle>
//             <CardDescription>
//               Upload customer data file (CSV/Excel) to begin risk assessment
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
//               <input
//                 type="file"
//                 accept=".csv,.xlsx,.xls"
//                 onChange={handleFileUpload}
//                 className="hidden"
//                 id="file-upload"
//               />
//               <label htmlFor="file-upload" className="cursor-pointer">
//                 <FileSpreadsheet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                 <p className="text-lg font-medium text-foreground">
//                   {file ? file.name : "Choose file to upload"}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   Supports CSV, Excel formats
//                 </p>
//               </label>
//             </div>
            
//             <Button 
//               onClick={handleEvaluate}
//               disabled={isEvaluating}
//               className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-hover hover:to-primary"
//               size="lg"
//             >
//               {isEvaluating ? "Evaluating..." : "Start Risk Evaluation"}
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Results Section */}
//         {hasResults && (
//           <>
//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <Card className="shadow-card border-border/50">
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-2">
//                     <Users className="h-5 w-5 text-accent" />
//                     <span className="text-sm font-medium text-muted-foreground">Total Records</span>
//                   </div>
//                   <p className="text-3xl font-bold text-foreground mt-2">{mockResults.totalRecords}</p>
//                 </CardContent>
//               </Card>

//               <Card 
//                 className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
//                 onClick={() => handleRiskClick("high")}
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-2">
//                     <XCircle className="h-5 w-5 text-risk-high" />
//                     <span className="text-sm font-medium text-muted-foreground">High Risk</span>
//                   </div>
//                   <p className="text-3xl font-bold text-risk-high mt-2">{mockResults.highRisk}</p>
//                   <p className="text-sm text-muted-foreground">entities</p>
//                 </CardContent>
//               </Card>

//               <Card 
//                 className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
//                 onClick={() => handleRiskClick("medium")}
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-2">
//                     <AlertTriangle className="h-5 w-5 text-risk-medium" />
//                     <span className="text-sm font-medium text-muted-foreground">Medium Risk</span>
//                   </div>
//                   <p className="text-3xl font-bold text-risk-medium mt-2">{mockResults.mediumRisk}</p>
//                   <p className="text-sm text-muted-foreground">entities</p>
//                 </CardContent>
//               </Card>

//               <Card 
//                 className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
//                 onClick={() => handleRiskClick("low")}
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-2">
//                     <CheckCircle className="h-5 w-5 text-risk-low" />
//                     <span className="text-sm font-medium text-muted-foreground">Low Risk</span>
//                   </div>
//                   <p className="text-3xl font-bold text-risk-low mt-2">{mockResults.lowRisk}</p>
//                   <p className="text-sm text-muted-foreground">entities</p>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Risk Distribution and Top Risky Customers */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Risk Distribution Gauge */}
//               <Card className="shadow-card border-border/50">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <BarChart3 className="h-5 w-5 text-primary" />
//                     <span>Risk Distribution</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4">
//                     <div>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-sm font-medium text-risk-high">High Risk</span>
//                         <span className="text-sm text-muted-foreground">{getRiskPercentage(mockResults.highRisk)}%</span>
//                       </div>
//                       <Progress value={parseFloat(getRiskPercentage(mockResults.highRisk))} className="h-3 bg-risk-high-light" />
//                     </div>
                    
//                     <div>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-sm font-medium text-risk-medium">Medium Risk</span>
//                         <span className="text-sm text-muted-foreground">{getRiskPercentage(mockResults.mediumRisk)}%</span>
//                       </div>
//                       <Progress value={parseFloat(getRiskPercentage(mockResults.mediumRisk))} className="h-3 bg-risk-medium-light" />
//                     </div>
                    
//                     <div>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-sm font-medium text-risk-low">Low Risk</span>
//                         <span className="text-sm text-muted-foreground">{getRiskPercentage(mockResults.lowRisk)}%</span>
//                       </div>
//                       <Progress value={parseFloat(getRiskPercentage(mockResults.lowRisk))} className="h-3 bg-risk-low-light" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//                 {/* Top 5 Risky Entities */}
//               <Card className="shadow-card border-border/50">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <TrendingUp className="h-5 w-5 text-risk-high" />
//                     <span>Top Risky Entities</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {mockResults.topRiskyCustomers.map((entity, index) => (
//                       <div 
//                         key={entity.id}
//                         className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
//                         onClick={() => navigate(`/customer/${entity.id}`)}
//                       >
//                         <div className="flex items-center space-x-3">
//                           <div className="w-8 h-8 bg-risk-high text-risk-high-foreground rounded-full flex items-center justify-center text-sm font-bold">
//                             {index + 1}
//                           </div>
//                           <div>
//                             <span className="font-medium text-foreground">{entity.name}</span>
//                             <p className="text-xs text-muted-foreground">{entity.sector} • {entity.country}</p>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <span className="text-sm font-bold text-risk-high">{(entity.score * 100).toFixed(0)}%</span>
//                           <p className="text-xs text-muted-foreground">Risk Score</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Input } from "@/components/ui/input";
// import { 
//   Upload, 
//   FileSpreadsheet, 
//   AlertTriangle, 
//   CheckCircle, 
//   XCircle,
//   Users,
//   TrendingUp,
//   Shield,
//   BarChart3,
//   Search
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// // REMOVE mockResults, we’ll fetch live data
// // const mockResults = { ... }

// const Dashboard = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [isEvaluating, setIsEvaluating] = useState(false);
//   const [hasResults, setHasResults] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState<any | null>(null);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   // 🔹 Fetch summary from backend when results available
//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:5000/api/creditrisk/summary");
//         if (!res.ok) throw new Error("Failed to fetch summary");
//         const data = await res.json();
//         setResults(data);
//         setHasResults(true);
//       } catch (err) {
//         console.error(err);
//         toast({
//           title: "Error",
//           description: "Failed to fetch summary",
//           variant: "destructive",
//         });
//       }
//     };

//     fetchSummary();
//   }, []);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       toast({
//         title: "File Uploaded",
//         description: `${selectedFile.name} ready for analysis`,
//       });
//     }
//   };

//   const handleEvaluate = async () => {
//     console.log(file)

//     if (!file) {
//       toast({
//         title: "No File Selected",
//         description: "Please upload a file before evaluation",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsEvaluating(true);

//     try {
//       const formData = new FormData();
//       formData.append("csvFile", file); // field name must match backend multer field

//       const res = await fetch("http://localhost:5000/api/uploads", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (data.success) {
//         toast({
//           title: "Analysis Complete",
//           description: `Processed ${data.rowCount} customer records`,
//         });
//         setResults(data);
//         setHasResults(true);
//       } else {
//         toast({
//           title: "Error",
//           description: data.message || "Something went wrong",
//           variant: "destructive",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       toast({
//         title: "Error",
//         description: "Failed to upload the file",
//         variant: "destructive",
//       });
//     } finally {
//       setIsEvaluating(false);
//     }
//   };

//   const handleRiskClick = (riskLevel: string) => {
//     navigate(`/risk/${riskLevel.toLowerCase()}`);
//   };

//   const getRiskPercentage = (count: number) => {
//     return results ? ((count / results.totalRecords) * 100).toFixed(1) : "0";
//   };

//   return (
//     // <div className="min-h-screen bg-gradient-to-br from-background to-muted">
//     //   {/* ... header code unchanged ... */}

//     //   <div className="container mx-auto px-6 py-8 space-y-8">
//     //     {/* File Upload Section (unchanged) */}
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted">
//       {/* Header */}
//       <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
//   <div className="container mx-auto px-6 py-4">
//     <div className="flex items-center justify-between">
      
//       {/* Left - Logo & Title */}
//       <div className="flex items-center space-x-3">
//         <div className="p-2 bg-gradient-to-br from-primary to-primary-light rounded-lg">
//           <Shield className="h-6 w-6 text-primary-foreground" />
//         </div>
//         <h1 className="text-2xl font-bold text-foreground">CréditVue</h1>
//       </div>

//       {/* Center - Search */}
//       <div className="flex-1 flex justify-center">
//         <div className="relative w-full max-w-md">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search entities..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 w-full"
//           />
//         </div>
//       </div>

//       {/* Right - Logout */}
//       <div>
//         <Button 
//           variant="outline" 
//           onClick={() => navigate("/")}
//           className="border-border/50"
//         >
//           Logout
//         </Button>
//       </div>
//     </div>
//   </div>
// </header>


//       <div className="container mx-auto px-6 py-8 space-y-8">
//         {/* File Upload Section */}
//         <Card className="shadow-card border-border/50">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <Upload className="h-5 w-5 text-primary" />
//               <span>Data Upload & Analysis</span>
//             </CardTitle>
//             <CardDescription>
//               Upload customer data file (CSV/Excel) to begin risk assessment
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
//               <input
//                 type="file"
//                 accept=".csv,.xlsx,.xls"
//                 onChange={handleFileUpload}
//                 className="hidden"
//                 id="file-upload"
//               />
//               <label htmlFor="file-upload" className="cursor-pointer">
//                 <FileSpreadsheet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                 <p className="text-lg font-medium text-foreground">
//                   {file ? file.name : "Choose file to upload"}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   Supports CSV, Excel formats
//                 </p>
//               </label>
//             </div>
            
//             <Button 
//               onClick={handleEvaluate}
//               disabled={isEvaluating}
//               className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-hover hover:to-primary"
//               size="lg"
//             >
//               {isEvaluating ? "Evaluating..." : "Start Risk Evaluation"}
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Results Section */}
//         {hasResults && results && (
//           <>
//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <Card className="shadow-card border-border/50">
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-2">
//                     <Users className="h-5 w-5 text-accent" />
//                     <span className="text-sm font-medium text-muted-foreground">Total Records</span>
//                   </div>
//                   <p className="text-3xl font-bold text-foreground mt-2">{results.totalRecords}</p>
//                 </CardContent>
//               </Card>

//               <Card 
//                 className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
//                 onClick={() => handleRiskClick("high")}
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-2">
//                     <XCircle className="h-5 w-5 text-risk-high" />
//                     <span className="text-sm font-medium text-muted-foreground">High Risk</span>
//                   </div>
//                   <p className="text-3xl font-bold text-risk-high mt-2">{results.highRisk}</p>
//                   <p className="text-sm text-muted-foreground">entities</p>
//                 </CardContent>
//               </Card>

//               <Card 
//                 className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
//                 onClick={() => handleRiskClick("medium")}
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-2">
//                     <AlertTriangle className="h-5 w-5 text-risk-medium" />
//                     <span className="text-sm font-medium text-muted-foreground">Medium Risk</span>
//                   </div>
//                   <p className="text-3xl font-bold text-risk-medium mt-2">{results.mediumRisk}</p>
//                   <p className="text-sm text-muted-foreground">entities</p>
//                 </CardContent>
//               </Card>

//               <Card 
//                 className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
//                 onClick={() => handleRiskClick("low")}
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-2">
//                     <CheckCircle className="h-5 w-5 text-risk-low" />
//                     <span className="text-sm font-medium text-muted-foreground">Low Risk</span>
//                   </div>
//                   <p className="text-3xl font-bold text-risk-low mt-2">{results.lowRisk}</p>
//                   <p className="text-sm text-muted-foreground">entities</p>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Risk Distribution and Top Risky Customers */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Risk Distribution Gauge */}
//               <Card className="shadow-card border-border/50">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <BarChart3 className="h-5 w-5 text-primary" />
//                     <span>Risk Distribution</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4">
//                     <div>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-sm font-medium text-risk-high">High Risk</span>
//                         <span className="text-sm text-muted-foreground">{getRiskPercentage(results.highRisk)}%</span>
//                       </div>
//                       <Progress value={parseFloat(getRiskPercentage(results.highRisk))} className="h-3 bg-risk-high-light" />
//                     </div>
                    
//                     <div>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-sm font-medium text-risk-medium">Medium Risk</span>
//                         <span className="text-sm text-muted-foreground">{getRiskPercentage(results.mediumRisk)}%</span>
//                       </div>
//                       <Progress value={parseFloat(getRiskPercentage(results.mediumRisk))} className="h-3 bg-risk-medium-light" />
//                     </div>
                    
//                     <div>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-sm font-medium text-risk-low">Low Risk</span>
//                         <span className="text-sm text-muted-foreground">{getRiskPercentage(results.lowRisk)}%</span>
//                       </div>
//                       <Progress value={parseFloat(getRiskPercentage(results.lowRisk))} className="h-3 bg-risk-low-light" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Top 5 Risky Entities */}
//               <Card className="shadow-card border-border/50">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <TrendingUp className="h-5 w-5 text-risk-high" />
//                     <span>Top Risky Entities</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {results.topRiskyCustomers.map((entity: any, index: number) => (
//                       <div 
//                         key={entity.entity_id}
//                         className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
//                         onClick={() => navigate(`/customer/${entity.entity_id}`)}
//                       >
//                         <div className="flex items-center space-x-3">
//                           <div className="w-8 h-8 bg-risk-high text-risk-high-foreground rounded-full flex items-center justify-center text-sm font-bold">
//                             {index + 1}
//                           </div>
//                           <div>
//                             <span className="font-medium text-foreground">{entity.entity_name}</span>
//                             <p className="text-xs text-muted-foreground">{entity.sector} • {entity.country}</p>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <span className="text-sm font-bold text-risk-high">
//                             {(entity.PD_1y_pct * 100).toFixed(0)}%
//                           </span>
//                           <p className="text-xs text-muted-foreground">Risk Score</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Input } from "@/components/ui/input";
// import { 
//   Upload, 
//   FileSpreadsheet, 
//   AlertTriangle, 
//   CheckCircle, 
//   XCircle,
//   Users,
//   TrendingUp,
//   Shield,
//   BarChart3,
//   Search
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const Dashboard = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [isEvaluating, setIsEvaluating] = useState(false);
//   const [hasResults, setHasResults] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState<any | null>(null);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       toast({
//         title: "File Uploaded",
//         description: `${selectedFile.name} ready for analysis`,
//       });
//     }
//   };

//   const handleEvaluate = async () => {
//     if (!file) {
//       toast({
//         title: "No File Selected",
//         description: "Please upload a file before evaluation",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsEvaluating(true);

//     try {
//       const formData = new FormData();
//       formData.append("csvFile", file); // field name must match backend multer field

//       const res = await fetch("http://localhost:5000/api/uploads", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (data.success) {
//         toast({
//           title: "Analysis Complete",
//           description: `Processed ${data.rowCount} customer records`,
//         });

//         // ✅ fetch summary after upload
//         const summaryRes = await fetch("http://localhost:5000/api/creditrisk/summary");
//         const summaryData = await summaryRes.json();

//         setResults(summaryData);
//         setHasResults(true);
//       } else {
//         toast({
//           title: "Error",
//           description: data.message || "Something went wrong",
//           variant: "destructive",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       toast({
//         title: "Error",
//         description: "Failed to upload the file",
//         variant: "destructive",
//       });
//     } finally {
//       setIsEvaluating(false);
//     }
//   };

//   const handleRiskClick = (riskLevel: string) => {
//     navigate(`/risk/${riskLevel.toLowerCase()}`);
//   };

//   const getRiskPercentage = (count: number) => {
//     return results ? ((count / results.totalRecords) * 100).toFixed(1) : "0";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted">
//       {/* Header */}
//       <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             {/* Left - Logo & Title */}
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-gradient-to-br from-primary to-primary-light rounded-lg">
//                 <Shield className="h-6 w-6 text-primary-foreground" />
//               </div>
//               <h1 className="text-2xl font-bold text-foreground">CréditVue</h1>
//             </div>

//             {/* Center - Search */}
//             <div className="flex-1 flex justify-center">
//               <div className="relative w-full max-w-md">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search entities..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 w-full"
//                 />
//               </div>
//             </div>

//             {/* Right - Logout */}
//             <div>
//               <Button 
//                 variant="outline" 
//                 onClick={() => navigate("/")}
//                 className="border-border/50"
//               >
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-6 py-8 space-y-8">
//         {/* File Upload Section */}
//         <Card className="shadow-card border-border/50">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <Upload className="h-5 w-5 text-primary" />
//               <span>Data Upload & Analysis</span>
//             </CardTitle>
//             <CardDescription>
//               Upload customer data file (CSV/Excel) to begin risk assessment
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
//               <input
//                 type="file"
//                 accept=".csv,.xlsx,.xls"
//                 onChange={handleFileUpload}
//                 className="hidden"
//                 id="file-upload"
//               />
//               <label htmlFor="file-upload" className="cursor-pointer">
//                 <FileSpreadsheet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                 <p className="text-lg font-medium text-foreground">
//                   {file ? file.name : "Choose file to upload"}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   Supports CSV, Excel formats
//                 </p>
//               </label>
//             </div>
            
//             <Button 
//               onClick={handleEvaluate}
//               disabled={isEvaluating}
//               className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-hover hover:to-primary"
//               size="lg"
//             >
//               {isEvaluating ? "Evaluating..." : "Start Risk Evaluation"}
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Results Section – only show after upload */}
//         {hasResults && results && (
//           <>
//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <Card className="shadow-card border-border/50">
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-2">
//                     <Users className="h-5 w-5 text-accent" />
//                     <span className="text-sm font-medium text-muted-foreground">Total Records</span>
//                   </div>
//                   <p className="text-3xl font-bold text-foreground mt-2">{results.totalRecords}</p>
//                 </CardContent>
//               </Card>

//               <Card 
//                 className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
//                 onClick={() => handleRiskClick("high")}
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-2">
//                     <XCircle className="h-5 w-5 text-risk-high" />
//                     <span className="text-sm font-medium text-muted-foreground">High Risk</span>
//                   </div>
//                   <p className="text-3xl font-bold text-risk-high mt-2">{results.highRisk}</p>
//                   <p className="text-sm text-muted-foreground">entities</p>
//                 </CardContent>
//               </Card>

//               <Card 
//                 className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
//                 onClick={() => handleRiskClick("medium")}
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-2">
//                     <AlertTriangle className="h-5 w-5 text-risk-medium" />
//                     <span className="text-sm font-medium text-muted-foreground">Medium Risk</span>
//                   </div>
//                   <p className="text-3xl font-bold text-risk-medium mt-2">{results.mediumRisk}</p>
//                   <p className="text-sm text-muted-foreground">entities</p>
//                 </CardContent>
//               </Card>

//               <Card 
//                 className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
//                 onClick={() => handleRiskClick("low")}
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-2">
//                     <CheckCircle className="h-5 w-5 text-risk-low" />
//                     <span className="text-sm font-medium text-muted-foreground">Low Risk</span>
//                   </div>
//                   <p className="text-3xl font-bold text-risk-low mt-2">{results.lowRisk}</p>
//                   <p className="text-sm text-muted-foreground">entities</p>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Risk Distribution and Top Risky Customers */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Risk Distribution Gauge */}
//               <Card className="shadow-card border-border/50">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <BarChart3 className="h-5 w-5 text-primary" />
//                     <span>Risk Distribution</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4">
//                     <div>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-sm font-medium text-risk-high">High Risk</span>
//                         <span className="text-sm text-muted-foreground">{getRiskPercentage(results.highRisk)}%</span>
//                       </div>
//                       <Progress value={parseFloat(getRiskPercentage(results.highRisk))} className="h-3 bg-risk-high-light" />
//                     </div>
                    
//                     <div>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-sm font-medium text-risk-medium">Medium Risk</span>
//                         <span className="text-sm text-muted-foreground">{getRiskPercentage(results.mediumRisk)}%</span>
//                       </div>
//                       <Progress value={parseFloat(getRiskPercentage(results.mediumRisk))} className="h-3 bg-risk-medium-light" />
//                     </div>
                    
//                     <div>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-sm font-medium text-risk-low">Low Risk</span>
//                         <span className="text-sm text-muted-foreground">{getRiskPercentage(results.lowRisk)}%</span>
//                       </div>
//                       <Progress value={parseFloat(getRiskPercentage(results.lowRisk))} className="h-3 bg-risk-low-light" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Top 5 Risky Entities */}
//               <Card className="shadow-card border-border/50">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <TrendingUp className="h-5 w-5 text-risk-high" />
//                     <span>Top Risky Entities</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {results.topRiskyCustomers.map((entity: any, index: number) => (
//                       <div 
//                         key={entity.entity_id}
//                         className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
//                         onClick={() => navigate(`/customer/${entity.entity_id}`)}
//                       >
//                         <div className="flex items-center space-x-3">
//                           <div className="w-8 h-8 bg-risk-high text-risk-high-foreground rounded-full flex items-center justify-center text-sm font-bold">
//                             {index + 1}
//                           </div>
//                           <div>
//                             <span className="font-medium text-foreground">{entity.entity_name}</span>
//                             <p className="text-xs text-muted-foreground">{entity.sector} • {entity.country}</p>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <span className="text-sm font-bold text-risk-high">
//                             {(entity.PD_1y_pct * 100).toFixed(0)}%
//                           </span>
//                           <p className="text-xs text-muted-foreground">Risk Score</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// Dashboard.tsx (Evaluated Results Page) - With API Integration
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Input } from "@/components/ui/input";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { 
//   Upload, 
//   AlertTriangle, 
//   CheckCircle, 
//   XCircle,
//   Users,
//   TrendingUp,
//   Shield,
//   BarChart3,
//   Search,
//   RefreshCw,
//   Loader2
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const Dashboard = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { toast } = useToast();


//   const pieData = [
//   { name: 'High Risk', value: results.highRisk },
//   { name: 'Medium Risk', value: results.mediumRisk },
//   { name: 'Low Risk', value: results.lowRisk },
// ];


// const COLORS = ['#DC2626', '#F59E42', '#34D399'];

//   // Fetch summary from backend when component loads
//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("http://localhost:5000/api/creditrisk/summary");
        
//        if (!res.ok) {
//   throw new Error(`HTTP error! status: ${res.status}`);
// }

        
//         const data = await res.json();
//         console.log('Fetched summary data:', data);
//         setResults(data);
//       } catch (err) {
//         console.error('Error fetching summary:', err);
//         toast({
//           title: "Error",
//           description: "Failed to fetch summary data. Please ensure data has been uploaded.",
//           variant: "destructive",
//         });
        
//         // If no data available, redirect to upload page
//         setTimeout(() => {
//           navigate("/upload");
//         }, 2000);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSummary();
//   }, [navigate, toast]);

 
//   const handleRiskClick = (riskLevel: string) => {
//     navigate(`/risk/${riskLevel.toLowerCase()}`);
//   };

//   const handleNewUpload = () => {
//     toast({
//       title: "Starting New Analysis",
//       description: "Redirecting to file upload...",
//     });
//     navigate("/upload");
//   };

//   const getRiskPercentage = (count: number) => {
//     return results ? ((count / results.totalRecords) * 100).toFixed(1) : "0";
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
//         <Card className="shadow-card border-border/50 p-8">
//           <CardContent className="flex flex-col items-center space-y-4">
//             <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             <h3 className="text-lg font-medium text-foreground">Loading Analysis Results</h3>
//             <p className="text-sm text-muted-foreground text-center">
//               Fetching your risk assessment data...
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   // No data state - should redirect to upload
//   if (!results) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
//         <Card className="shadow-card border-border/50 p-8">
//           <CardContent className="flex flex-col items-center space-y-4 text-center">
//             <XCircle className="h-12 w-12 text-muted-foreground" />
//             <h3 className="text-lg font-medium text-foreground">No Analysis Data Found</h3>
//             <p className="text-sm text-muted-foreground">
//               Please upload a dataset first to view analysis results.
//             </p>
//             <Button onClick={() => navigate("/upload")} className="mt-4">
//               Go to Upload
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted">
//       {/* Header */}
//       <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             {/* Left - Logo & Title */}
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-gradient-to-br from-primary to-primary-light rounded-lg">
//                 <Shield className="h-6 w-6 text-primary-foreground" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-foreground">CréditVue</h1>
//                 <p className="text-sm text-muted-foreground">Risk Analysis Dashboard</p>
//               </div>
//             </div>

//             {/* Center - Search */}
//             <div className="flex-1 flex justify-center">
//               <div className="relative w-full max-w-md">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search entities..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 w-full"
//                 />
//               </div>
//             </div>

//             {/* Right - Actions */}
//             <div className="flex items-center space-x-3">
//               <Button 
//                 variant="outline" 
//                 onClick={handleNewUpload}
//                 className="border-border/50"
//               >
//                 <RefreshCw className="h-4 w-4 mr-2" />
//                 New Analysis
//               </Button>
//               <Button 
//                 variant="outline" 
//                 onClick={() => navigate("/")}
//                 className="border-border/50"
//               >
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-6 py-8 space-y-8">
//         {/* Analysis Status */}
//         <Card className="shadow-card border-border/50 bg-gradient-to-r from-primary/5 to-primary-light/5">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="p-3 bg-primary/10 rounded-full">
//                   <CheckCircle className="h-6 w-6 text-primary" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-foreground">Analysis Complete</h3>
//                   <p className="text-muted-foreground">
//                     Successfully processed {results.totalRecords} customer records
//                   </p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-muted-foreground">Analysis Date</p>
//                 <p className="font-medium text-foreground">{new Date().toLocaleDateString()}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <Card className="shadow-card border-border/50">
//             <CardContent className="p-6">
//               <div className="flex items-center space-x-2">
//                 <Users className="h-5 w-5 text-accent" />
//                 <span className="text-sm font-medium text-muted-foreground">Total Records</span>
//               </div>
//               <p className="text-3xl font-bold text-foreground mt-2">{results.totalRecords}</p>
//               <p className="text-sm text-muted-foreground">entities analyzed</p>
//             </CardContent>
//           </Card>

//           <Card 
//             className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
//             onClick={() => handleRiskClick("high")}
//           >
//             <CardContent className="p-6">
//               <div className="flex items-center space-x-2">
//                 <XCircle className="h-5 w-5 text-risk-high" />
//                 <span className="text-sm font-medium text-muted-foreground">High Risk</span>
//               </div>
//               <p className="text-3xl font-bold text-risk-high mt-2">{results.highRisk}</p>
//               <p className="text-sm text-muted-foreground">
//                 {getRiskPercentage(results.highRisk)}% of total
//               </p>
//             </CardContent>
//           </Card>

//           <Card 
//             className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
//             onClick={() => handleRiskClick("medium")}
//           >
//             <CardContent className="p-6">
//               <div className="flex items-center space-x-2">
//                 <AlertTriangle className="h-5 w-5 text-risk-medium" />
//                 <span className="text-sm font-medium text-muted-foreground">Medium Risk</span>
//               </div>
//               <p className="text-3xl font-bold text-risk-medium mt-2">{results.mediumRisk}</p>
//               <p className="text-sm text-muted-foreground">
//                 {getRiskPercentage(results.mediumRisk)}% of total
//               </p>
//             </CardContent>
//           </Card>

//           <Card 
//             className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
//             onClick={() => handleRiskClick("low")}
//           >
//             <CardContent className="p-6">
//               <div className="flex items-center space-x-2">
//                 <CheckCircle className="h-5 w-5 text-risk-low" />
//                 <span className="text-sm font-medium text-muted-foreground">Low Risk</span>
//               </div>
//               <p className="text-3xl font-bold text-risk-low mt-2">{results.lowRisk}</p>
//               <p className="text-sm text-muted-foreground">
//                 {getRiskPercentage(results.lowRisk)}% of total
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Risk Distribution Progress Bars */}
//         {/* <Card className="shadow-card border-border/50">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <BarChart3 className="h-5 w-5 text-primary" />
//               <span>Risk Distribution Overview</span>
//             </CardTitle>
//             <CardDescription>
//               Visual breakdown of risk categories across all analyzed entities
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-4">
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium text-risk-high">High Risk</span>
//                   <span className="text-sm text-muted-foreground">{getRiskPercentage(results.highRisk)}%</span>
//                 </div>
//                 <Progress value={parseFloat(getRiskPercentage(results.highRisk))} className="h-3" />
//               </div>
              
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium text-risk-medium">Medium Risk</span>
//                   <span className="text-sm text-muted-foreground">{getRiskPercentage(results.mediumRisk)}%</span>
//                 </div>
//                 <Progress value={parseFloat(getRiskPercentage(results.mediumRisk))} className="h-3" />
//               </div>
              
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium text-risk-low">Low Risk</span>
//                   <span className="text-sm text-muted-foreground">{getRiskPercentage(results.lowRisk)}%</span>
//                 </div>
//                 <Progress value={parseFloat(getRiskPercentage(results.lowRisk))} className="h-3" />
//               </div>
//             </div>
//           </CardContent>
//         </Card> */}
//         <Card className="shadow-card border-border/50">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <BarChart3 className="h-5 w-5 text-primary" />
//               <span>Risk Distribution Overview</span>
//             </CardTitle>
//             <CardDescription>
//               Visual breakdown of risk categories across all analyzed entities
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6 flex flex-col items-center">
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}} fill={COLORS[index]`} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Top Risky Entities */}
//         <Card className="shadow-card border-border/50">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <TrendingUp className="h-5 w-5 text-risk-high" />
//               <span>Top Risk Entities</span>
//             </CardTitle>
//             <CardDescription>
//               Entities requiring immediate attention based on risk assessment
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {results.topRiskyCustomers && results.topRiskyCustomers.length > 0 ? (
//                 results.topRiskyCustomers.map((entity: any, index: number) => (
//                   <div 
//                     key={entity.entity_id}
//                     className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer border border-border/30 hover:border-border"
//                     onClick={() => navigate(`/customer/${entity.entity_id}`)}

//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="w-10 h-10 bg-risk-high text-risk-high-foreground rounded-full flex items-center justify-center text-sm font-bold">
//                         {index + 1}
//                       </div>
//                       <div>
//                         <span className="font-medium text-foreground text-lg">{entity.entity_name}</span>
//                         <p className="text-sm text-muted-foreground">
//                           {entity.sector} • {entity.country} • ID: {entity.entity_id}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-xl font-bold text-risk-high">
//                         {entity.PD_1y_pct ? (entity.PD_1y_pct * 100).toFixed(0) : 'N/A'}%
//                       </span>
//                       <p className="text-xs text-muted-foreground">Risk Score</p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-8 text-muted-foreground">
//                   <p>No high-risk entities found in the current dataset.</p>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Quick Actions */}
//         <Card className="shadow-card border-border/50">
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//             <CardDescription>
//               Common tasks and navigation options
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <Button 
//                 variant="outline" 
//                 className="h-20 flex flex-col space-y-2"
//                 onClick={() => handleRiskClick("high")}
//               >
//                 <XCircle className="h-6 w-6 text-risk-high" />
//                 <span>View High Risk</span>
//               </Button>
//               <Button 
//                 variant="outline" 
//                 className="h-20 flex flex-col space-y-2"
//                 onClick={handleNewUpload}
//               >
//                 <Upload className="h-6 w-6 text-primary" />
//                 <span>New Analysis</span>
//               </Button>
//               {results.topRiskyCustomers && results.topRiskyCustomers.length > 0 && (
//                 <Button 
//                   variant="outline" 
//                   className="h-20 flex flex-col space-y-2"
//                  onClick={() => navigate(`/customer/${results.topRiskyCustomers[0].entity_id}`)}

//                 >
//                   <Users className="h-6 w-6 text-accent" />
//                   <span>Top Risk Entity</span>
//                 </Button>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// Dashboard.tsx (Evaluated Results Page) - With API Integration
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Users,
  TrendingUp,
  Shield,
  BarChart3,
  Search,
  RefreshCw,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Define colors for the pie chart
  // Red for High, Amber for Medium, Green for Low
  const COLORS = ['#DC2626', '#F59E42', '#34D399'];

  // Fetch summary from backend when component loads
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/creditrisk/summary");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log('Fetched summary data:', data);
        setResults(data);
      } catch (err) {
        console.error('Error fetching summary:', err);
        toast({
          title: "Error",
          description: "Failed to fetch summary data. Please ensure data has been uploaded.",
          variant: "destructive",
        });
        
        // If no data available, redirect to upload page
        setTimeout(() => {
          navigate("/upload");
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [navigate, toast]);

  // Create pie chart data from results - only when results are available
  const getPieData = () => {
    if (!results) return [];
    
    return [
      { 
        name: 'High Risk', 
        value: results.highRisk,
        percentage: ((results.highRisk / results.totalRecords) * 100).toFixed(1)
      },
      { 
        name: 'Medium Risk', 
        value: results.mediumRisk,
        percentage: ((results.mediumRisk / results.totalRecords) * 100).toFixed(1)
      },
      { 
        name: 'Low Risk', 
        value: results.lowRisk,
        percentage: ((results.lowRisk / results.totalRecords) * 100).toFixed(1)
      },
    ];
  };

  const handleRiskClick = (riskLevel: string) => {
    navigate(`/risk/${riskLevel.toLowerCase()}`);
  };

  const handleNewUpload = () => {
    toast({
      title: "Starting New Analysis",
      description: "Redirecting to file upload...",
    });
    navigate("/upload");
  };

  const getRiskPercentage = (count: number) => {
    return results ? ((count / results.totalRecords) * 100).toFixed(1) : "0";
  };

  // Custom label function for pie chart
  const renderCustomLabel = ({ name, percentage }: any) => {
    return `${name}: ${percentage}%`;
  };

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            Count: {data.value} entities
          </p>
          <p className="text-sm text-muted-foreground">
            Percentage: {data.percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <Card className="shadow-card border-border/50 p-8">
          <CardContent className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <h3 className="text-lg font-medium text-foreground">Loading Analysis Results</h3>
            <p className="text-sm text-muted-foreground text-center">
              Fetching your risk assessment data...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No data state
  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <Card className="shadow-card border-border/50 p-8">
          <CardContent className="flex flex-col items-center space-y-4 text-center">
            <XCircle className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground">No Analysis Data Found</h3>
            <p className="text-sm text-muted-foreground">
              Please upload a dataset first to view analysis results.
            </p>
            <Button onClick={() => navigate("/upload")} className="mt-4">
              Go to Upload
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pieData = getPieData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Logo & Title */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary-light rounded-lg">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">CréditVue</h1>
                <p className="text-sm text-muted-foreground">Risk Analysis Dashboard</p>
              </div>
            </div>

            {/* Center - Search */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search entities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={handleNewUpload}
                className="border-border/50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                New Analysis
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
                className="border-border/50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Analysis Status */}
        <Card className="shadow-card border-border/50 bg-gradient-to-r from-primary/5 to-primary-light/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Analysis Complete</h3>
                  <p className="text-muted-foreground">
                    Successfully processed {results.totalRecords} customer records
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Analysis Date</p>
                <p className="font-medium text-foreground">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="shadow-card border-border/50">
                <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-accent" />
                        <span className="text-sm font-medium text-muted-foreground">Total Records</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mt-2">{results.totalRecords}</p>
                    <p className="text-sm text-muted-foreground">entities analyzed</p>
                </CardContent>
            </Card>

            <Card 
                className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
                onClick={() => handleRiskClick("high")}
            >
                <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                        <XCircle className="h-5 w-5 text-risk-high" />
                        <span className="text-sm font-medium text-muted-foreground">High Risk</span>
                    </div>
                    <p className="text-3xl font-bold text-risk-high mt-2">{results.highRisk}</p>
                    <p className="text-sm text-muted-foreground">
                        {getRiskPercentage(results.highRisk)}% of total
                    </p>
                </CardContent>
            </Card>

            <Card 
                className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
                onClick={() => handleRiskClick("medium")}
            >
                <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-risk-medium" />
                        <span className="text-sm font-medium text-muted-foreground">Medium Risk</span>
                    </div>
                    <p className="text-3xl font-bold text-risk-medium mt-2">{results.mediumRisk}</p>
                    <p className="text-sm text-muted-foreground">
                        {getRiskPercentage(results.mediumRisk)}% of total
                    </p>
                </CardContent>
            </Card>

            <Card 
                className="shadow-card border-border/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
                onClick={() => handleRiskClick("low")}
            >
                <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-risk-low" />
                        <span className="text-sm font-medium text-muted-foreground">Low Risk</span>
                    </div>
                    <p className="text-3xl font-bold text-risk-low mt-2">{results.lowRisk}</p>
                    <p className="text-sm text-muted-foreground">
                        {getRiskPercentage(results.lowRisk)}% of total
                    </p>
                </CardContent>
            </Card>
        </div>

        {/* Risk Distribution Pie Chart */}
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Risk Distribution Overview</span>
            </CardTitle>
            <CardDescription>
              Visual breakdown of risk categories across all analyzed entities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      label={renderCustomLabel}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        // ✅ CORRECTED THIS LINE
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend with Statistics */}
              <div className="space-y-4 flex flex-col justify-center">
                <h4 className="font-semibold text-foreground mb-4">Risk Breakdown</h4>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                  <div className="w-4 h-4 rounded-full bg-red-600"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-red-700 dark:text-red-400">High Risk</span>
                      <span className="text-sm font-bold text-red-700 dark:text-red-400">
                        {results.highRisk} entities
                      </span>
                    </div>
                    <p className="text-sm text-red-600 dark:text-red-500">
                      {getRiskPercentage(results.highRisk)}% of total portfolio
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-orange-700 dark:text-orange-400">Medium Risk</span>
                      <span className="text-sm font-bold text-orange-700 dark:text-orange-400">
                        {results.mediumRisk} entities
                      </span>
                    </div>
                    <p className="text-sm text-orange-600 dark:text-orange-500">
                      {getRiskPercentage(results.mediumRisk)}% of total portfolio
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-green-700 dark:text-green-400">Low Risk</span>
                      <span className="text-sm font-bold text-green-700 dark:text-green-400">
                        {results.lowRisk} entities
                      </span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-500">
                      {getRiskPercentage(results.lowRisk)}% of total portfolio
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-muted/50">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">Total Entities</span>
                    <span className="font-bold text-foreground">{results.totalRecords}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Risky Entities */}
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-risk-high" />
              <span>Top Risk Entities</span>
            </CardTitle>
            <CardDescription>
              Entities requiring immediate attention based on risk assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.topRiskyCustomers && results.topRiskyCustomers.length > 0 ? (
                results.topRiskyCustomers.map((entity: any, index: number) => (
                  <div 
                    key={entity.entity_id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer border border-border/30 hover:border-border"
                    onClick={() => navigate(`/customer/${entity.entity_id}`)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-risk-high text-risk-high-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <span className="font-medium text-foreground text-lg">{entity.entity_name}</span>
                        <p className="text-sm text-muted-foreground">
                          {entity.sector} • {entity.country} • ID: {entity.entity_id}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-risk-high">
                        {entity.PD_1y_pct ? (entity.PD_1y_pct * 1).toFixed(2) : 'N/A'}%
                      </span>
                      <p className="text-xs text-muted-foreground">Risk Score</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No high-risk entities found in the current dataset.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Dashboard;