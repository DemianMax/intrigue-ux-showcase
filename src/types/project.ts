
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface CaseStudy {
  challenge: string;
  process: { img: string; legend: string }[];
  solutionImg: string;
  solutionLegend: string;
  uiNote: string;
  results: string[];
  next: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  problem: string;
  solution: string;
  hashtags: string[] | null;
  image: string;
  caseStudy: CaseStudy;
  created_at: string;
}
