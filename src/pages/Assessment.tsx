import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { assessmentData } from "@/data/assessmentData";

export default function Assessment() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});

  const sections = assessmentData.sections;
  const section = sections[currentSection];
  const question = section.questions[currentQuestion];
  const totalQuestions = sections.reduce((sum, s) => sum + s.questions.length, 0);
  const answeredQuestions = Object.keys(responses).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswer = (questionId: string, answer: any) => {
    setResponses(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      setCurrentQuestion(0);
    } else {
      // Assessment complete - navigate to results
      navigate("/results", { state: { responses } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
    }
  };

  const canProceed = responses[question.id] !== undefined;
  const isFirstQuestion = currentSection === 0 && currentQuestion === 0;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-medium">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    Collaboration Facilitator Assessment
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">
                    Section {currentSection + 1} of {sections.length}: {section.title}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {section.questions.length}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Overall: {answeredQuestions} / {totalQuestions}
                  </div>
                </div>
              </div>
              <Progress value={progress} className="mt-4" />
            </CardHeader>
          </Card>
        </div>

        {/* Question */}
        <div className="mb-8">
          <QuestionCard
            question={question}
            response={responses[question.id]}
            onAnswer={(answer) => handleAnswer(question.id, answer)}
          />
        </div>

        {/* Navigation */}
        <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-medium">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={isFirstQuestion}
              >
                Previous
              </Button>

              <div className="text-sm text-muted-foreground">
                {section.description}
              </div>

              <Button
                variant="hero"
                onClick={handleNext}
                disabled={!canProceed}
              >
                {currentSection === sections.length - 1 && 
                 currentQuestion === section.questions.length - 1
                  ? "View Results"
                  : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}