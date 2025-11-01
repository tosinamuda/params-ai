export const defaultPrompt =
  `As a top creative social media strategist, come up with a social media content for a business whose name is {{Business Name}} in {{industry}} industry and located in {{location}}.
Rules for Content Generation:
The content must be related to  the campaign objective: {{Campaign Objective}}
The content should be generated in {{language}} language
The content should use the local lingo of the location of the business
The content should be in the {{tone}} tone
`


export const defaultPrompt2 =
  `As a top creative social media strategist, come up with a social media content for a business whose name is {{Business Name}} in {{industry}} industry and located in {{location}}.
Rules for Content Generation:
The content must be related to  the campaign objective: {{Campaign Objective}}
The content should be generated in {{language}} language
The content should use the local lingo of the location of the business
The content should be in the {{tone}} tone
The content should have word length of {{word length}} words
`

export const prompts = [
  {
    backgroundColor: "rgb(244, 225, 250)",
    borderColor: "rgb(244, 225, 250)",
    category: "Information & knowledge",
    title: "Create Content",
    updated: "3 minutes ago",
    created: "Mar 17, 2024",
    content:
`As a top creative social media strategist, come up with a social media content for a business whose name is Stargirl Strategy in Digital Agency industry and located in Lagos, Nigeria.

Rules for Content Generation:
The content must be related to  the campaign objective: Lead Generation
The content should be generated in English language
The content should use the local lingo of the location of the business
The content should be in the professional tone
`
  },
  {
    backgroundColor: "rgb(255, 245, 204)",
    borderColor: "rgb(255, 245, 204)",
    category: "Creativity & content creation",
    title: "Generate Content Ideas",
    updated: "3 minutes ago",
    created: "Mar 17, 2024",
    content: `You are a content marketing strategist tasked with developing a content plan for Trello, a project management software tool. Brainstorm at least 5 different content type ideas that Trello could create to engage with their target audience of remote teams, freelancers, and small businesses. For each content type, provide a brief description of the topic or angle it could cover to showcase Trello's features and benefits.
    `
  },
  {
    backgroundColor: "rgb(213, 246, 241)",
    borderColor: "rgb(213, 246, 241)",
    category: "Solutions & decisions",
    title: "Lcm of a list",
    updated: "13 days ago",
    created: "Mar 3, 2024",
    content: `You are a content marketing strategist tasked with developing a content plan for Trello, a project management software tool. Brainstorm at least 5 different content type ideas that Trello could create to engage with their target audience of remote teams, freelancers, and small businesses. For each content type, provide a brief description of the topic or angle it could cover to showcase Trello's features and benefits.
    `
  },
];


export const metaPromptKey = "[[prompt]]"



export const promptTemplateMetaPrompt =
  `Task: Convert the given prompt into a reusable prompt template by replacing varying entities with variable placeholders.

Input Format:
<OriginalPrompt>[The original prompt filled with specific values]</OriginalPrompt>
Output Format:
<PromptTemplate>[The prompt with varying values replaced by {{variable}} placeholders]</PromptTemplate>

Instructions:

1. Identify the specific values or entities in the original prompt that could potentially vary across different use cases. These may include:
- Named entities (people, organizations, locations, product names, etc.)
- Attribute values (industry, campaign objective, language, tone, etc.)
- Any other words or phrases representing variable values rather than instructions
2. For each identified varying value or entity, replace it with a variable placeholder enclosed in double curly braces {{}}. The variable name inside the braces should be a concise, readable label indicating what that value represents.
3. Return the updated prompt with variable placeholders substituted for the original varying values, in the following format:
<PromptTemplate> [The prompt with varying values replaced by {{variable}} placeholders] </PromptTemplate>
4. Your output should be only the XML for Prompt Temeplate like: <PromptTemplate></PromptTemplate>

Prompt:
<OriginalPrompt>[[prompt]]</OriginalPrompt>
PromptTemplate:

`
