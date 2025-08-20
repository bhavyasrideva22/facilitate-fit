import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, TrendingUp, ArrowRight } from "lucide-react";

interface RecommendationCardProps {
  recommendation: string;
  insights: string[];
  learningPath?: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
  alternatives?: string[];
  topRoles?: string[];
}

export function RecommendationCard({ 
  recommendation, 
  insights, 
  learningPath, 
  alternatives, 
  topRoles 
}: RecommendationCardProps) {
  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case "Yes": return "✅";
      case "Maybe": return "⚡";
      case "No": return "🔄";
      default: return "📋";
    }
  };

  return (
    <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-strong">
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getRecommendationIcon(recommendation)}</span>
          <div>
            <CardTitle className="text-2xl font-bold">
              Detailed Recommendations
            </CardTitle>
            <p className="text-muted-foreground">
              Your personalized career guidance and next steps
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="learning">Learning Path</TabsTrigger>
            <TabsTrigger value="roles">Top Roles</TabsTrigger>
            <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Why This Recommendation?
              </h3>
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-accent/30 rounded-lg">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-foreground">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="learning" className="mt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Your Learning Journey
              </h3>
              
              {learningPath && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Badge variant="secondary">1</Badge>
                      Beginner Level
                    </h4>
                    <ul className="space-y-2 ml-8">
                      {learningPath.beginner.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <ArrowRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Badge variant="secondary">2</Badge>
                      Intermediate Level
                    </h4>
                    <ul className="space-y-2 ml-8">
                      {learningPath.intermediate.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <ArrowRight className="w-4 h-4 mt-0.5 text-secondary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Badge variant="secondary">3</Badge>
                      Advanced Level
                    </h4>
                    <ul className="space-y-2 ml-8">
                      {learningPath.advanced.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <ArrowRight className="w-4 h-4 mt-0.5 text-success flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="roles" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Top Career Opportunities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topRoles?.map((role, index) => (
                  <Card key={index} className="bg-accent/20 border-accent">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">{role}</h4>
                        <Badge variant="outline">Match</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alternatives" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Alternative Career Paths
              </h3>
              <div className="space-y-3">
                {alternatives?.map((alt, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <span className="text-foreground">{alt}</span>
                    <Button variant="outline" size="sm">
                      Explore
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}