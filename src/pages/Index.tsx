import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, BookOpen, Zap, ArrowRight } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate("/assessment");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-card backdrop-blur-sm px-4 py-2 rounded-full mb-8 shadow-soft">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Professional Assessment Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Collaboration Facilitator
              <span className="block text-primary">Assessment</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover your readiness and fit for becoming an effective Collaboration Facilitator. 
              Our comprehensive assessment evaluates your psychological compatibility, technical skills, 
              and overall readiness across six key dimensions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={handleStartAssessment}
                className="px-12"
              >
                Start Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Takes 20-30 minutes • Free • Instant results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Collaboration Facilitator */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-strong max-w-4xl mx-auto">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-foreground mb-4">
                What is a Collaboration Facilitator?
              </CardTitle>
              <p className="text-lg text-muted-foreground">
                A professional skilled in guiding groups through structured and creative processes 
                to improve communication, conflict resolution, decision-making, and team effectiveness.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Typical Career Paths
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Collaboration Facilitator",
                      "Team Coach", 
                      "Organizational Development Consultant",
                      "Agile Coach",
                      "Project Manager (with facilitation focus)"
                    ].map((career, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="text-muted-foreground">{career}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-secondary" />
                    Key Skills & Traits
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Strong communication & interpersonal skills",
                      "Emotional intelligence & empathy",
                      "Conflict management",
                      "Adaptability & openness to perspectives",
                      "Analytical and creative thinking",
                      "Patience & persistence"
                    ].map((skill, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                        <span className="text-muted-foreground">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Assessment Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comprehensive Assessment Framework
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our assessment evaluates you across three key areas to provide accurate, 
              actionable insights about your fit for collaboration facilitation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-medium hover:shadow-strong transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Psychological Compatibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Evaluate your personality traits, emotional intelligence, and natural inclinations 
                  for group facilitation work.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Big Five personality assessment</li>
                  <li>• Conflict resolution preferences</li>
                  <li>• Group dynamics comfort</li>
                  <li>• Communication style analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-medium hover:shadow-strong transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="text-xl font-semibold">Technical & Domain Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Assess your current understanding of facilitation principles, 
                  group dynamics, and essential methodologies.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Facilitation fundamentals</li>
                  <li>• Process design knowledge</li>  
                  <li>• Meeting management skills</li>
                  <li>• Tool and technique familiarity</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-medium hover:shadow-strong transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-success" />
                </div>
                <CardTitle className="text-xl font-semibold">WISCAR Framework</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Holistic evaluation across six dimensions: Will, Interest, Skill, 
                  Cognitive readiness, Ability to learn, and Real-world alignment.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Motivation and persistence</li>
                  <li>• Learning capacity assessment</li>
                  <li>• Skill gap analysis</li>
                  <li>• Career fit evaluation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-primary backdrop-blur-sm border-0 shadow-glow max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-primary-foreground mb-6">
                Ready to Discover Your Potential?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Get personalized insights, career recommendations, and a detailed learning path 
                tailored to your unique profile.
              </p>
              <Button 
                variant="secondary" 
                size="xl" 
                onClick={handleStartAssessment}
                className="px-12"
              >
                Begin Your Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
