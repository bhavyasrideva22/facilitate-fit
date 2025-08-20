export interface Question {
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

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export const assessmentData = {
  sections: [
    {
      id: "psychometric",
      title: "Psychological Compatibility",
      description: "Understanding your personality traits and interpersonal preferences",
      questions: [
        {
          id: "psych_1",
          type: "likert",
          question: "I enjoy helping groups of people work together more effectively.",
          context: "This measures your natural inclination toward facilitation work."
        },
        {
          id: "psych_2",
          type: "likert",
          question: "I remain calm and composed when tensions arise in group settings.",
          context: "Emotional stability is crucial for effective facilitation."
        },
        {
          id: "psych_3",
          type: "likert",
          question: "I genuinely enjoy hearing different perspectives, even when they conflict with my own views.",
          context: "Openness to diverse viewpoints is essential for collaborative leadership."
        },
        {
          id: "psych_4",
          type: "multiple_choice",
          question: "When faced with a group conflict, what is your natural tendency?",
          options: [
            "Step in immediately to mediate and find common ground",
            "Listen carefully to all sides before suggesting solutions",
            "Encourage the group to work it out themselves with minimal intervention",
            "Avoid getting involved unless specifically asked to help"
          ]
        },
        {
          id: "psych_5",
          type: "likert",
          question: "I find it energizing to guide discussions and keep groups focused on their goals.",
          context: "This indicates your natural energy for facilitation activities."
        },
        {
          id: "psych_6",
          type: "scenario",
          scenario: "You're facilitating a team meeting when two members begin arguing loudly about a project approach. The rest of the team looks uncomfortable and the discussion has derailed.",
          question: "What would be your most natural response?",
          options: [
            "Immediately pause the discussion and address the conflict directly",
            "Acknowledge the passion and redirect to structured problem-solving",
            "Take a break and speak with the individuals separately",
            "Ask the group how they'd like to handle the situation"
          ]
        }
      ]
    },
    {
      id: "technical",
      title: "Technical & Domain Knowledge",
      description: "Assessing your current understanding of facilitation principles and methods",
      questions: [
        {
          id: "tech_1",
          type: "multiple_choice",
          question: "Which of these best describes the primary role of a collaboration facilitator?",
          options: [
            "To make decisions for the group when they can't agree",
            "To guide the process while remaining neutral on content",
            "To provide expert advice on the topic being discussed",
            "To ensure everyone gets equal speaking time"
          ]
        },
        {
          id: "tech_2",
          type: "multiple_choice",
          question: "What is the most important element of successful group brainstorming?",
          options: [
            "Having a clear agenda and sticking to it",
            "Ensuring all ideas are evaluated immediately for feasibility",
            "Creating psychological safety for idea sharing",
            "Limiting the session to 30 minutes to maintain energy"
          ]
        },
        {
          id: "tech_3",
          type: "scenario",
          scenario: "A team is struggling to make a decision. Some members are vocal about their preferred option, while others remain quiet. You notice the quiet members seem to have concerns but aren't speaking up.",
          question: "What facilitation technique would be most effective?",
          options: [
            "Go with the majority opinion since most people have spoken",
            "Use anonymous polling to gather all perspectives",
            "Break into smaller groups to encourage quieter voices",
            "Ask the quiet members directly what they think"
          ]
        },
        {
          id: "tech_4",
          type: "ranking",
          question: "Rank these facilitation skills in order of importance:",
          options: [
            "Active listening",
            "Conflict resolution",
            "Time management",
            "Process design",
            "Group dynamics awareness"
          ]
        },
        {
          id: "tech_5",
          type: "multiple_choice",
          question: "When should a facilitator share their own opinion on the topic being discussed?",
          options: [
            "Never - facilitators must remain completely neutral",
            "Only when specifically asked by the group",
            "When the group is stuck and needs expert input",
            "After clearly stepping out of the facilitator role"
          ]
        }
      ]
    },
    {
      id: "wiscar",
      title: "WISCAR Framework Assessment",
      description: "Comprehensive evaluation across six key readiness dimensions",
      questions: [
        {
          id: "will_1",
          type: "likert",
          question: "I am genuinely motivated to develop skills in group facilitation, even if it takes years of practice."
        },
        {
          id: "will_2",
          type: "text",
          question: "Describe a time when you persisted through a challenging interpersonal situation. What kept you motivated?",
          context: "This helps us understand your internal drive and resilience."
        },
        {
          id: "interest_1",
          type: "likert",
          question: "I find myself naturally curious about how teams and groups function together."
        },
        {
          id: "interest_2",
          type: "multiple_choice",
          question: "Which of these activities sounds most interesting to you?",
          options: [
            "Designing a workshop to help a team improve communication",
            "Analyzing data to understand team performance patterns",
            "One-on-one coaching to develop individual skills",
            "Creating training materials for leadership development"
          ]
        },
        {
          id: "skill_1",
          type: "likert",
          question: "People often come to me when they need help resolving interpersonal conflicts."
        },
        {
          id: "skill_2",
          type: "likert",
          question: "I am effective at asking questions that help people think more deeply about issues."
        },
        {
          id: "cognitive_1",
          type: "scenario",
          scenario: "A project team is stuck because they can't agree on priorities. Member A wants to focus on technical excellence, Member B prioritizes meeting deadlines, and Member C is concerned about budget constraints.",
          question: "What's your first step in helping them move forward?",
          options: [
            "Help them find a compromise solution that partially addresses each concern",
            "Facilitate a discussion to understand the underlying values driving each position",
            "Suggest they vote on which priority should take precedence",
            "Break down the project to see where each priority matters most"
          ]
        },
        {
          id: "ability_1",
          type: "likert",
          question: "I actively seek feedback about my interpersonal effectiveness and use it to improve."
        },
        {
          id: "real_world_1",
          type: "multiple_choice",
          question: "Which work environment appeals to you most?",
          options: [
            "Fast-paced startup where I'd wear multiple hats",
            "Large corporation with structured processes and clear roles",
            "Consulting where I'd work with different clients regularly",
            "Non-profit focused on social impact and collaboration"
          ]
        }
      ]
    }
  ] as AssessmentSection[]
};