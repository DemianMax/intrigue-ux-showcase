
export interface Project {
  id: string;
  title: string;
  role: string;
  problem: string;
  solution: string;
  hashtags: string[] | null;
  image: string;
  caseStudy: {
    challenge: string;
    process: { img: string; legend: string }[];
    solutionImg: string;
    solutionLegend: string;
    uiNote: string;
    results: string[];
    next: string;
  };
  created_at: string;
}
