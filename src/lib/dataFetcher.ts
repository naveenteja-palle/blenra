import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { PromptItem } from '@/types/prompt';

// In-memory cache so we only read the hard drive once for blazing speed
let cachedPrompts: PromptItem[] | null = null;

async function loadDatabase(): Promise<PromptItem[]> {
  if (cachedPrompts) return cachedPrompts;

  // Securely locate the CSV file on the server
  const filePath = path.join(process.cwd(), 'src', 'data', 'blenra_database_export.csv');
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // Parse the CSV safely
    const { data } = Papa.parse(fileContents, {
      header: true,
      skipEmptyLines: true,
    });

    // Map the raw CSV rows to our strict TypeScript schema
    cachedPrompts = data.map((row: any) => {
      // THE FIX: Clean the slug dynamically to remove brackets, spaces, and invalid chars
      const safeSlug = (row.slug || '')
        .replace(/[\[\]]/g, '') // Strips out the problematic [ and ] brackets
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replaces spaces/special characters with a hyphen
        .replace(/^-+|-+$/g, ''); // Trims trailing or leading hyphens

      return {
        id: row.id,
        title: row.title,
        category: row.category,
        categorySlug: row.categorySlug,
        slug: safeSlug, // We now pass the sanitized slug instead of row.slug
        tag: row.tag,
        icon: row.icon,
        targetAI: row.targetAI,
        // Safely parse the JSON string back into a usable array for our UI
        variables: JSON.parse(row.variables || '[]'),
        basePrompt: row.basePrompt,
        exampleOutput: row.exampleOutput,
      };
    }) as PromptItem[];

    return cachedPrompts;
  } catch (error) {
    console.error("Failed to load CSV database:", error);
    return []; // Return empty array so the site doesn't crash if the file is missing
  }
}

// Function 1: Get all active prompts (Used for Sitemap and Homepage)
export async function getAllPrompts(): Promise<PromptItem[]> {
  return await loadDatabase();
}

// Function 2: Get a single prompt by its exact SEO slug
export async function getPromptBySlug(slug: string): Promise<PromptItem | null> {
  const prompts = await loadDatabase();
  return prompts.find(p => p.slug === slug) || null;
}

// Function 3: Get all prompts matching a category
export async function getPromptsByCategory(categorySlug: string): Promise<PromptItem[]> {
  const prompts = await loadDatabase();
  return prompts.filter(p => p.categorySlug === categorySlug);
}

// Function 4: Search prompts by keyword
export async function searchPrompts(query: string): Promise<PromptItem[]> {
  const prompts = await loadDatabase();
  const lowerQuery = query.toLowerCase();
  
  return prompts.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) ||
    p.tag.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.basePrompt.toLowerCase().includes(lowerQuery)
  );
}