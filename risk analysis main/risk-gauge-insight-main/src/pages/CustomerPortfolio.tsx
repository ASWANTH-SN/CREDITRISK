import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  User, 
  DollarSign, 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Building,
  Globe
} from "lucide-react";

// Mock detailed entity data
const mockCustomerDetails = {
  "ENT029": {
    entity_name: "Aurora Labs 128",
    entity_id: "ENT029",
    riskScore: 0.92,
    riskCategory: "high",
    entityInfo: {
      sector: "Technology",
      country: "Singapore",
      revenue_usd_m: "3695.26",
      implied_rating: "B+"
    },
    financialData: {
      annualIncome: "$45,000",
      employmentStatus: "Part-time",
      yearsEmployed: "2.5 years",
      monthlyExpenses: "$3,200",
      debtToIncome: "75%",
      creditScore: 580,
      loanAmount: "$180,000",
      loanType: "Mortgage",
      loanTerm: "30 years",
      interestRate: "6.8%",
      monthlyPayment: "$1,180"
    },
    paymentHistory: {
      totalPayments: 24,
      onTimePayments: 16,
      latePayments: 8,
      missedPayments: 2,
      lastPaymentDate: "January 15, 2024",
      lastPaymentAmount: "$1,180",
      nextPaymentDue: "February 15, 2024"
    },
    riskFactors: [
      { factor: "High debt-to-income ratio", severity: "high", impact: "25%" },
      { factor: "Recent late payments", severity: "high", impact: "20%" },
      { factor: "Low credit score", severity: "medium", impact: "15%" },
      { factor: "Irregular employment", severity: "medium", impact: "12%" },
      { factor: "No emergency savings", severity: "low", impact: "8%" }
    ]
  },
  // Add more mock data for other entities...
  "default": {
    entity_name: "Sample Entity",
    entity_id: "ENT000",
    riskScore: 0.45,
    riskCategory: "medium",
    entityInfo: {
      sector: "Technology",
      country: "USA",
      revenue_usd_m: "1500.00",
      implied_rating: "BB"
    },
    financialData: {
      annualIncome: "$65,000",
      employmentStatus: "Full-time",
      yearsEmployed: "5 years",
      monthlyExpenses: "$2,800",
      debtToIncome: "45%",
      creditScore: 720,
      loanAmount: "$145,000",
      loanType: "Mortgage",
      loanTerm: "30 years",
      interestRate: "5.2%",
      monthlyPayment: "$890"
    },
    paymentHistory: {
      totalPayments: 36,
      onTimePayments: 34,
      latePayments: 2,
      missedPayments: 0,
      lastPaymentDate: "January 15, 2024",
      lastPaymentAmount: "$890",
      nextPaymentDue: "February 15, 2024"
    },
    riskFactors: [
      { factor: "Moderate debt-to-income ratio", severity: "medium", impact: "15%" },
      { factor: "Occasional late payments", severity: "low", impact: "8%" },
      { factor: "Stable employment", severity: "positive", impact: "-10%" }
    ]
  }
};

const CustomerPortfolio = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const customer = mockCustomerDetails[id as keyof typeof mockCustomerDetails] || mockCustomerDetails.default;

  const getRiskConfig = (category: string) => {
    switch (category) {
      case "high":
        return {
          icon: XCircle,
          color: "text-risk-high",
          bgColor: "bg-risk-high text-risk-high-foreground",
          label: "High Risk"
        };
      case "medium":
        return {
          icon: AlertTriangle,
          color: "text-risk-medium",
          bgColor: "bg-risk-medium text-risk-medium-foreground",
          label: "Medium Risk"
        };
      case "low":
        return {
          icon: CheckCircle,
          color: "text-risk-low",
          bgColor: "bg-risk-low text-risk-low-foreground",
          label: "Low Risk"
        };
      default:
        return {
          icon: Shield,
          color: "text-primary",
          bgColor: "bg-primary text-primary-foreground",
          label: "Assessment"
        };
    }
  };

  const config = getRiskConfig(customer.riskCategory);
  const IconComponent = config.icon;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-risk-high";
      case "medium": return "text-risk-medium";
      case "low": return "text-muted-foreground";
      case "positive": return "text-risk-low";
      default: return "text-muted-foreground";
    }
  };

  const onTimePercentage = (customer.paymentHistory.onTimePayments / customer.paymentHistory.totalPayments) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(-1)}
                className="border-border/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-primary to-primary-light rounded-lg">
                  <User className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Entity Portfolio</h1>
                  <p className="text-sm text-muted-foreground">Detailed risk assessment and profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-6">
        {/* Customer Overview */}
        <Card className="shadow-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{customer.entity_name}</h2>
                  <p className="text-muted-foreground">Entity ID: {customer.entity_id}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={config.bgColor}>
                      <IconComponent className="h-3 w-3 mr-1" />
                      {config.label}
                    </Badge>
                    <Badge variant="outline">
                      Score: {(customer.riskScore * 100).toFixed(0)}%
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-bold ${config.color}`}>
                  {(customer.riskScore * 100).toFixed(0)}%
                </div>
                <p className="text-sm text-muted-foreground">Risk Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Entity Information */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-primary" />
                <span>Entity Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Entity ID</p>
                    <p className="font-medium">{customer.entity_id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Entity Name</p>
                    <p className="font-medium">{customer.entity_name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Sector</p>
                    <p className="font-medium">{customer.entityInfo.sector}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Country</p>
                    <p className="font-medium">{customer.entityInfo.country}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Overview */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span>Financial Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Annual Income</p>
                  <p className="text-lg font-bold text-foreground">{customer.financialData.annualIncome}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Credit Score</p>
                  <p className="text-lg font-bold text-foreground">{customer.financialData.creditScore}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Debt-to-Income</p>
                  <p className="text-lg font-bold text-foreground">{customer.financialData.debtToIncome}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Employment</p>
                  <p className="text-lg font-bold text-foreground">{customer.financialData.employmentStatus}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loan Details */}
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span>Loan Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Loan Amount</p>
                <p className="text-2xl font-bold text-foreground">{customer.financialData.loanAmount}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                <p className="text-2xl font-bold text-foreground">{customer.financialData.monthlyPayment}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Interest Rate</p>
                <p className="text-2xl font-bold text-foreground">{customer.financialData.interestRate}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Loan Term</p>
                <p className="text-2xl font-bold text-foreground">{customer.financialData.loanTerm}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment History */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Payment History</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">On-time Payment Rate</span>
                <span className="font-bold text-foreground">{onTimePercentage.toFixed(1)}%</span>
              </div>
              <Progress value={onTimePercentage} className="h-3" />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-risk-low">{customer.paymentHistory.onTimePayments}</p>
                  <p className="text-sm text-muted-foreground">On Time</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-risk-high">{customer.paymentHistory.latePayments}</p>
                  <p className="text-sm text-muted-foreground">Late</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <span>Risk Factors</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {customer.riskFactors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{factor.factor}</p>
                      <p className={`text-sm ${getSeverityColor(factor.severity)}`}>
                        {factor.severity.charAt(0).toUpperCase() + factor.severity.slice(1)} Impact
                      </p>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {factor.impact}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortfolio;



