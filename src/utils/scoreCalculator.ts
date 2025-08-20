interface AssessmentResponse {
  [questionId: string]: any;
}

interface ScoreResult {
  score: number;
  description: string;
  insights: string[];
}

interface WiscarDimension {
  dimension: string;
  score: number;
  fullMark: number;
}

interface Results {
  overallRecommendation: "Yes" | "Maybe" | "No";
  confidenceScore: number;
  overallInsight: string;
  psychologicalFit: ScoreResult;
  technicalReadiness: ScoreResult;
  wiscarOverall: ScoreResult;
  wiscarDimensions: WiscarDimension[];
  detailedInsights: string[];
  learningPath: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
  alternatives: string[];
  topRoles: string[];
}

export function calculateResults(responses: AssessmentResponse): Results {
  // Calculate psychological fit score
  const psychologicalQuestions = ['psych_1', 'psych_2', 'psych_3', 'psych_5'];
  const psychScore = calculateLikertAverage(responses, psychologicalQuestions);
  
  // Calculate technical readiness score  
  const techScore = calculateTechnicalScore(responses);
  
  // Calculate WISCAR dimensions
  const wiscarDimensions = calculateWiscarDimensions(responses);
  const wiscarOverallScore = wiscarDimensions.reduce((sum, dim) => sum + dim.score, 0) / wiscarDimensions.length;
  
  // Calculate overall confidence score
  const confidenceScore = Math.round((psychScore + techScore + wiscarOverallScore) / 3);
  
  // Determine recommendation
  const recommendation = getRecommendation(confidenceScore, psychScore, techScore, wiscarOverallScore);
  
  return {
    overallRecommendation: recommendation,
    confidenceScore,
    overallInsight: getOverallInsight(recommendation, confidenceScore),
    psychologicalFit: {
      score: Math.round(psychScore),
      description: getPsychologicalDescription(psychScore),
      insights: getPsychologicalInsights(responses, psychScore)
    },
    technicalReadiness: {
      score: Math.round(techScore),
      description: getTechnicalDescription(techScore),
      insights: getTechnicalInsights(responses, techScore)
    },
    wiscarOverall: {
      score: Math.round(wiscarOverallScore),
      description: getWiscarDescription(wiscarOverallScore),
      insights: getWiscarInsights(wiscarDimensions)
    },
    wiscarDimensions,
    detailedInsights: getDetailedInsights(recommendation, responses),
    learningPath: getLearningPath(recommendation),
    alternatives: getAlternatives(recommendation),
    topRoles: getTopRoles()
  };
}

function calculateLikertAverage(responses: AssessmentResponse, questionIds: string[]): number {
  const scores = questionIds
    .map(id => responses[id])
    .filter(score => typeof score === 'number');
  
  if (scores.length === 0) return 50;
  return (scores.reduce((sum, score) => sum + score, 0) / scores.length) * 20; // Convert to 0-100 scale
}

function calculateTechnicalScore(responses: AssessmentResponse): number {
  let score = 0;
  let maxScore = 0;
  
  // Question tech_1 - correct answer is option 2 (index 1)
  if (responses.tech_1 === "To guide the process while remaining neutral on content") {
    score += 20;
  }
  maxScore += 20;
  
  // Question tech_2 - correct answer is option 3 (index 2)
  if (responses.tech_2 === "Creating psychological safety for idea sharing") {
    score += 20;
  }
  maxScore += 20;
  
  // Question tech_3 - best answer is option 3 (index 2)
  if (responses.tech_3 === "Break into smaller groups to encourage quieter voices") {
    score += 20;
  }
  maxScore += 20;
  
  // Question tech_5 - best answer is option 4 (index 3)
  if (responses.tech_5 === "After clearly stepping out of the facilitator role") {
    score += 20;
  }
  maxScore += 20;
  
  // Question tech_4 - ranking question (simplified scoring)
  if (responses.tech_4) {
    score += 20; // Give points for completing the ranking
  }
  maxScore += 20;
  
  return maxScore > 0 ? (score / maxScore) * 100 : 50;
}

function calculateWiscarDimensions(responses: AssessmentResponse): WiscarDimension[] {
  return [
    {
      dimension: "Will",
      score: calculateLikertAverage(responses, ['will_1']) + (responses.will_2 ? 10 : 0),
      fullMark: 100
    },
    {
      dimension: "Interest", 
      score: calculateLikertAverage(responses, ['interest_1']) + (responses.interest_2 ? 20 : 0),
      fullMark: 100
    },
    {
      dimension: "Skill",
      score: calculateLikertAverage(responses, ['skill_1', 'skill_2']),
      fullMark: 100
    },
    {
      dimension: "Cognitive",
      score: responses.cognitive_1 ? 75 : 50, // Simplified scoring
      fullMark: 100
    },
    {
      dimension: "Ability to Learn",
      score: calculateLikertAverage(responses, ['ability_1']),
      fullMark: 100
    },
    {
      dimension: "Real-world Fit",
      score: responses.real_world_1 ? 70 : 50, // Simplified scoring
      fullMark: 100
    }
  ];
}

function getRecommendation(overall: number, psych: number, tech: number, wiscar: number): "Yes" | "Maybe" | "No" {
  if (overall >= 75 && psych >= 70 && tech >= 65) return "Yes";
  if (overall >= 60 || (psych >= 70 && wiscar >= 65)) return "Maybe";
  return "No";
}

function getOverallInsight(recommendation: string, score: number): string {
  switch (recommendation) {
    case "Yes":
      return "You demonstrate strong natural aptitude for collaboration facilitation with excellent psychological fit and solid foundational knowledge.";
    case "Maybe":
      return "You show promising potential for collaboration facilitation. With focused development in a few key areas, you could excel in this field.";
    case "No":
      return "While collaboration facilitation may not be your strongest natural fit, there are related fields that might better align with your profile.";
    default:
      return "Assessment complete.";
  }
}

function getPsychologicalDescription(score: number): string {
  if (score >= 80) return "Excellent psychological fit with strong interpersonal skills and natural facilitation instincts.";
  if (score >= 60) return "Good psychological foundation with solid interpersonal abilities and moderate facilitation instincts.";
  return "Developing psychological fit that would benefit from focused interpersonal skill development.";
}

function getPsychologicalInsights(responses: AssessmentResponse, score: number): string[] {
  const insights = [];
  
  if (responses.psych_1 >= 4) {
    insights.push("Strong natural motivation for collaborative work");
  }
  if (responses.psych_2 >= 4) {
    insights.push("Good emotional regulation under pressure");
  }
  if (responses.psych_3 >= 4) {
    insights.push("High openness to diverse perspectives");
  }
  if (score < 60) {
    insights.push("Consider developing conflict resolution skills");
  }
  
  return insights.length > 0 ? insights : ["Developing foundational interpersonal skills"];
}

function getTechnicalDescription(score: number): string {
  if (score >= 80) return "Strong understanding of facilitation principles and best practices.";
  if (score >= 60) return "Good basic knowledge with room for growth in advanced techniques.";
  return "Foundational knowledge that would benefit from formal training in facilitation methods.";
}

function getTechnicalInsights(responses: AssessmentResponse, score: number): string[] {
  const insights = [];
  
  if (score >= 80) {
    insights.push("Strong grasp of facilitation fundamentals");
    insights.push("Good understanding of group dynamics");
  } else if (score >= 60) {
    insights.push("Solid basic knowledge foundation");
    insights.push("Ready for intermediate training");
  } else {
    insights.push("Would benefit from foundational facilitation training");
    insights.push("Consider starting with basic group dynamics courses");
  }
  
  return insights;
}

function getWiscarDescription(score: number): string {
  if (score >= 80) return "Exceptional readiness across all WISCAR dimensions.";
  if (score >= 60) return "Strong readiness with some areas for focused development.";
  return "Developing readiness that would benefit from targeted skill building.";
}

function getWiscarInsights(dimensions: WiscarDimension[]): string[] {
  const insights = [];
  const sortedDims = [...dimensions].sort((a, b) => b.score - a.score);
  
  insights.push(`Strongest in ${sortedDims[0].dimension.toLowerCase()} (${Math.round(sortedDims[0].score)}%)`);
  insights.push(`Greatest growth opportunity in ${sortedDims[sortedDims.length - 1].dimension.toLowerCase()}`);
  
  const avgScore = dimensions.reduce((sum, dim) => sum + dim.score, 0) / dimensions.length;
  if (avgScore >= 70) {
    insights.push("Well-rounded profile across all dimensions");
  }
  
  return insights;
}

function getDetailedInsights(recommendation: string, responses: AssessmentResponse): string[] {
  const insights = [];
  
  switch (recommendation) {
    case "Yes":
      insights.push("Your natural empathy and communication skills create a strong foundation for facilitation work.");
      insights.push("You demonstrate the emotional intelligence needed to navigate group dynamics effectively.");
      insights.push("Your openness to different perspectives will help you remain neutral while guiding discussions.");
      break;
    case "Maybe":
      insights.push("You have several key strengths that align well with facilitation work.");
      insights.push("With focused development in a few areas, you could become very effective in this role.");
      insights.push("Consider gaining more experience in group settings to build confidence.");
      break;
    case "No":
      insights.push("While facilitation may not be your strongest natural fit, you have transferable skills.");
      insights.push("Consider roles that leverage your strengths in different ways.");
      insights.push("You might find success in related fields that involve less group facilitation.");
      break;
  }
  
  return insights;
}

function getLearningPath(recommendation: string) {
  return {
    beginner: [
      "Complete a basic facilitation skills workshop",
      "Read 'The Skilled Facilitator' by Roger Schwarz", 
      "Practice active listening techniques daily",
      "Observe experienced facilitators in action"
    ],
    intermediate: [
      "Pursue IAF (International Association of Facilitators) certification",
      "Learn advanced conflict resolution techniques",
      "Practice designing workshops and group processes",
      "Develop expertise in virtual facilitation tools"
    ],
    advanced: [
      "Specialize in organizational development or change management",
      "Mentor other developing facilitators",
      "Create your own facilitation methodologies",
      "Build a practice as an independent consultant"
    ]
  };
}

function getAlternatives(recommendation: string): string[] {
  if (recommendation === "Yes") {
    return [
      "Agile Coach - Guide teams in agile methodologies",
      "Organizational Development Consultant - Design change processes"
    ];
  }
  
  return [
    "Project Manager - Coordinate teams with some facilitation",
    "Team Coach - Focus on team performance improvement", 
    "Training & Development Specialist - Design learning experiences",
    "HR Business Partner - Support organizational effectiveness"
  ];
}

function getTopRoles(): string[] {
  return [
    "Collaboration Facilitator",
    "Agile Coach", 
    "Team Effectiveness Consultant",
    "Organizational Development Specialist",
    "Change Management Facilitator",
    "Workshop Design Consultant"
  ];
}