export type Prompt = {
  title: string;
  content: string | null;
  description: string | null;
  color: string | null;
  icon: string | null;
  publish_status: boolean | null;
  authorId: number;
  categoryId: number;
  id: number;
  slug: string;
  created_at: string;
  updated_at: string;
}



export type PromptCategory = {
    id: number;
    name: string;
}

export type PromptWithCategory = Prompt & {category: PromptCategory}