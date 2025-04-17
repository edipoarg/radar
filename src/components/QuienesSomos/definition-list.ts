type Definition = {
  paragraphs: string[];
};

type Term = {
  definitions: Definition[];
  members: string[];
};

export type DefinitionList = {
  title: string;
  terms: Record<string, Term>;
};

export type DefinitionListWithCategories = {
  title: string;
  categories: Record<
    string,
    {
      terms: Record<string, Term>;
    }
  >;
};
