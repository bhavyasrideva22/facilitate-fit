import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Question {
  id: string;
  type: "likert" | "multiple_choice" | "scenario" | "text" | "ranking";
  question: string;
  context?: string;
  options?: string[];
  scenario?: string;
  min?: number;
  max?: number;
  labels?: { min: string; max: string };
}

interface QuestionCardProps {
  question: Question;
  response: any;
  onAnswer: (answer: any) => void;
}

export function QuestionCard({ question, response, onAnswer }: QuestionCardProps) {
  const renderLikertScale = () => (
    <div className="space-y-6">
      <div className="px-4">
        <Slider
          value={response ? [response] : [3]}
          onValueChange={(value) => onAnswer(value[0])}
          max={5}
          min={1}
          step={1}
          className="w-full"
        />
      </div>
      <div className="flex justify-between text-sm text-muted-foreground px-2">
        <span>Strongly Disagree</span>
        <span>Neutral</span>
        <span>Strongly Agree</span>
      </div>
      {response && (
        <div className="text-center">
          <Badge variant="secondary">
            Selected: {response} / 5
          </Badge>
        </div>
      )}
    </div>
  );

  const renderMultipleChoice = () => (
    <RadioGroup value={response || ""} onValueChange={onAnswer}>
      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`${question.id}-${index}`} />
            <Label htmlFor={`${question.id}-${index}`} className="cursor-pointer flex-1">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );

  const renderScenario = () => (
    <div className="space-y-4">
      <Card className="bg-accent/50 border-accent">
        <CardContent className="p-4">
          <p className="text-sm text-foreground italic">
            {question.scenario}
          </p>
        </CardContent>
      </Card>
      <RadioGroup value={response || ""} onValueChange={onAnswer}>
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-start space-x-2">
              <RadioGroupItem value={option} id={`${question.id}-${index}`} className="mt-1" />
              <Label htmlFor={`${question.id}-${index}`} className="cursor-pointer flex-1 leading-relaxed">
                {option}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );

  const renderTextInput = () => (
    <div className="space-y-4">
      <Textarea
        value={response || ""}
        onChange={(e) => onAnswer(e.target.value)}
        placeholder="Share your thoughts..."
        className="min-h-[120px] resize-none"
      />
      <div className="text-sm text-muted-foreground">
        {response?.length || 0} characters
      </div>
    </div>
  );

  const renderRanking = () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Rank these items from most important (1) to least important ({question.options?.length}):
      </p>
      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
            <select
              value={response?.[option] || ""}
              onChange={(e) => onAnswer({ ...response, [option]: parseInt(e.target.value) })}
              className="w-16 px-2 py-1 border border-border rounded"
            >
              <option value="">-</option>
              {Array.from({ length: question.options?.length || 0 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <span className="flex-1">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuestionContent = () => {
    switch (question.type) {
      case "likert":
        return renderLikertScale();
      case "multiple_choice":
        return renderMultipleChoice();
      case "scenario":
        return renderScenario();
      case "text":
        return renderTextInput();
      case "ranking":
        return renderRanking();
      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-medium">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground leading-relaxed">
          {question.question}
        </CardTitle>
        {question.context && (
          <p className="text-muted-foreground mt-2">
            {question.context}
          </p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {renderQuestionContent()}
      </CardContent>
    </Card>
  );
}