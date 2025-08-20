import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadarChart } from "@/components/results/RadarChart";
import { ScoreCard } from "@/components/results/ScoreCard";
import { RecommendationCard } from "@/components/results/RecommendationCard";
import { calculateResults } from "@/utils/scoreCalculator";
import { ArrowLeft, Download, Share2 } from "lucide-react";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const responses = location.state?.responses;
    if (!responses) {
      navigate("/");
      return;
    }

    const calculatedResults = calculateResults(responses);
    setResults(calculatedResults);
  }, [location.state, navigate]);

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-strong">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Calculating your results...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Yes": return "success";
      case "Maybe": return "warning";
      case "No": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-medium">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold text-foreground mb-2">
                    Your Assessment Results
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Comprehensive analysis of your readiness for a Collaboration Facilitator role
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Overall Recommendation */}
        <div className="mb-8">
          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-strong">
            <CardContent className="p-8">
              <div className="text-center">
                <Badge 
                  variant={getRecommendationColor(results.overallRecommendation) as any}
                  className="text-lg px-4 py-2 mb-4"
                >
                  Recommendation: {results.overallRecommendation}
                </Badge>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {results.confidenceScore}% Confidence Score
                </h2>
                <Progress value={results.confidenceScore} className="w-full max-w-md mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {results.overallInsight}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <ScoreCard
            title="Psychological Fit"
            score={results.psychologicalFit.score}
            description={results.psychologicalFit.description}
            insights={results.psychologicalFit.insights}
          />
          <ScoreCard
            title="Technical Readiness"
            score={results.technicalReadiness.score}
            description={results.technicalReadiness.description}
            insights={results.technicalReadiness.insights}
          />
          <ScoreCard
            title="WISCAR Overall"
            score={results.wiscarOverall.score}
            description={results.wiscarOverall.description}
            insights={results.wiscarOverall.insights}
          />
        </div>

        {/* WISCAR Radar Chart */}
        <div className="mb-8">
          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-medium">
            <CardHeader>
              <CardTitle className="text-xl font-bold">WISCAR Framework Analysis</CardTitle>
              <p className="text-muted-foreground">
                Your readiness across six key dimensions
              </p>
            </CardHeader>
            <CardContent>
              <RadarChart data={results.wiscarDimensions} />
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <RecommendationCard
            recommendation={results.overallRecommendation}
            insights={results.detailedInsights}
            learningPath={results.learningPath}
            alternatives={results.alternatives}
            topRoles={results.topRoles}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate("/")} className="px-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <Button variant="hero" onClick={() => navigate("/assessment")} className="px-8">
            Retake Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}