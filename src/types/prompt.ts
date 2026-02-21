export interface PromptItem {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  slug: string;
  tag: string;
  icon: string;
  targetAI: string;
  variables: string[];
  basePrompt: string;
  exampleOutput: string;
}