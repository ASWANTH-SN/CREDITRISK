
// // FileUpload.tsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { 
//   Upload, 
//   FileSpreadsheet, 
//   Shield,
//   Search
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const FileUpload = () => {
//  const [file, setFile] = useState<File | null>(null);
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
//         <div className="flex justify-center">
//           <Card className="shadow-card border-border/50 w-full max-w-2xl">
//             <CardHeader className="text-center">
//               <CardTitle className="flex items-center justify-center space-x-2 text-3xl">
//                 <Upload className="h-8 w-8 text-primary" />
//                 <span>Data Upload & Analysis</span>
//               </CardTitle>
//               <CardDescription className="text-lg">
//                 Upload customer data file (CSV/Excel) to begin risk assessment
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
//                 <input
//                   type="file"
//                   accept=".csv,.xlsx,.xls"
//                   onChange={handleFileUpload}
//                   className="hidden"
//                   id="file-upload"
//                 />
//                 <label htmlFor="file-upload" className="cursor-pointer">
//                   <FileSpreadsheet className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
//                   <p className="text-xl font-medium text-foreground mb-2">
//                     {file ? file.name : "Choose file to upload"}
//                   </p>
//                   <p className="text-muted-foreground">
//                     Supports CSV, Excel formats (Max 50MB)
//                   </p>
//                 </label>
//               </div>
              
//               {file && (
//                 <div className="p-4 bg-muted/50 rounded-lg">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="font-medium text-foreground">{file.name}</p>
//                       <p className="text-sm text-muted-foreground">
//                         Size: {(file.size / 1024 / 1024).toFixed(2)} MB
//                       </p>
//                     </div>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => setFile(null)}
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 </div>
//               )}
              
//               <Button 
//                 onClick={handleEvaluate}
//                 disabled={isEvaluating || !file}
//                 className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-hover hover:to-primary text-lg py-6"
//                 size="lg"
//               >
//                 {isEvaluating ? "Evaluating... Please wait" : "Start Risk Evaluation"}
//               </Button>

//               {isEvaluating && (
//                 <div className="text-center space-y-2">
//                   <div className="w-full bg-muted rounded-full h-2">
//                     <div className="bg-primary h-2 rounded-full animate-pulse" style={{width: "60%"}}></div>
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     Processing your data with AI algorithms...
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileUpload;

// FileUpload.tsx - With API Integration
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Upload, 
  FileSpreadsheet, 
  Shield,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast({
        title: "File Uploaded",
        description: `${selectedFile.name} ready for analysis`,
      });
    }
  };

  const handleEvaluate = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please upload a file before evaluation",
        variant: "destructive",
      });
      return;
    }

    setIsEvaluating(true);

    try {
      const formData = new FormData();
      formData.append("csvFile", file); // field name must match backend multer field

      const res = await fetch("http://localhost:5000/api/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: "Analysis Complete",
          description: `Processed ${data.rowCount} customer records`,
        });
        
        // Navigate to evaluated page after successful processing
        navigate("/evaluated");
      } else {
        toast({
          title: "Error",
          description: data.message || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to upload the file",
        variant: "destructive",
      });
    } finally {
      setIsEvaluating(false);
    }
  };

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
              <h1 className="text-2xl font-bold text-foreground">CréditVue</h1>
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

            {/* Right - Logout */}
            <div>
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
        {/* File Upload Section */}
        <div className="flex justify-center">
          <Card className="shadow-card border-border/50 w-full max-w-2xl">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2 text-3xl">
                <Upload className="h-8 w-8 text-primary" />
                <span>Data Upload & Analysis</span>
              </CardTitle>
              <CardDescription className="text-lg">
                Upload customer data file (CSV/Excel) to begin risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileSpreadsheet className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                  <p className="text-xl font-medium text-foreground mb-2">
                    {file ? file.name : "Choose file to upload"}
                  </p>
                  <p className="text-muted-foreground">
                    Supports CSV, Excel formats (Max 50MB)
                  </p>
                </label>
              </div>
              
              {file && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleEvaluate}
                disabled={isEvaluating || !file}
                className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-hover hover:to-primary text-lg py-6"
                size="lg"
              >
                {isEvaluating ? "Evaluating... Please wait" : "Start Risk Evaluation"}
              </Button>

              {isEvaluating && (
                <div className="text-center space-y-4">
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-primary h-3 rounded-full animate-pulse transition-all duration-1000" style={{width: "70%"}}></div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Processing your data with AI algorithms...
                    </p>
                    <p className="text-xs text-muted-foreground">
                      This may take a few moments depending on file size
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;