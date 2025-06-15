import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectCardProps {
  project: Project;
  openCase: string | null;
  setOpenCase: (id: string | null) => void;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ project, openCase, setOpenCase }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative bg-card rounded-2xl shadow-md flex flex-col group overflow-hidden"
    >
      <img
        src={project.image}
        alt={`Thumbnail do projeto ${project.title}`}
        className="w-full h-40 object-cover transition duration-300 group-hover:scale-105"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="font-playfair text-lg font-semibold text-brand-dark mb-1">{project.title}</h4>
        <div className="text-brand-accent font-semibold text-xs mb-3">{project.role}</div>

        <div className="text-sm text-brand-dark/70 mb-4 space-y-2">
          <p><strong className="font-semibold text-brand-dark">{t('projectProblem')}:</strong> {project.problem}</p>
          <p><strong className="font-semibold text-brand-dark">{t('projectSolution')}:</strong> {project.solution}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.hashtags?.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs font-semibold text-brand-accent bg-brand-accent/10 rounded-full px-2 py-0.5 tracking-tight"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.01em' }}
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          className="mt-auto px-5 py-2 rounded-full bg-brand-accent text-white font-semibold shadow hover:bg-brand-dark/90 transition"
          onClick={() => setOpenCase(project.id)}
        >
          {t('projectCaseStudyButton')}
        </button>
      </div>
      
      {/* Dialog para Case Study */}
      <Dialog open={openCase === project.id} onOpenChange={open => setOpenCase(open ? project.id : null)}>
        <DialogContent className="max-w-2xl rounded-2xl shadow-2xl p-0 overflow-hidden border-0">
          <DialogHeader className="bg-brand-dark/95 py-6 px-6 text-white">
            <DialogTitle className="font-playfair text-2xl">{project.title}</DialogTitle>
            <DialogDescription className="font-semibold">{project.role}</DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <h5 className="text-lg font-bold text-brand-accent mb-2">{t('caseStudyChallenge')}</h5>
            <p className="mb-4">{project.caseStudy.challenge}</p>
            <h5 className="text-lg font-bold text-brand-accent mb-2 mt-4">{t('caseStudyProcess')}</h5>
            <div className="grid gap-5 md:grid-cols-3 mb-4">
              {project.caseStudy.process.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img src={step.img} alt={step.legend} className="w-full h-32 object-cover rounded-md mb-2 border" />
                  <span className="text-xs text-brand-dark/80">{step.legend}</span>
                </div>
              ))}
            </div>
            <h5 className="text-lg font-bold text-brand-accent mb-2 mt-4">{t('caseStudySolution')}</h5>
            <img src={project.caseStudy.solutionImg} alt={project.caseStudy.solutionLegend} className="w-full max-w-lg mx-auto rounded-xl mb-2 border" />
            <span className="block text-sm mb-5">{project.caseStudy.solutionLegend}</span>
            <p className="mb-4">{project.caseStudy.uiNote}</p>
            <h5 className="text-lg font-bold text-brand-accent mb-2 mt-4">{t('caseStudyResults')}</h5>
            <ul className="mb-3 ml-6 list-disc text-brand-dark/80">
              {project.caseStudy.results.map((res, idx) => <li key={idx}>{res}</li>)}
            </ul>
            <div className="text-sm text-brand-dark/70">
              <strong>{t('caseStudyNextSteps')}</strong> {project.caseStudy.next}
            </div>
            <DialogClose asChild>
              <button className="mt-7 px-8 py-2 rounded-full bg-brand-accent text-white font-semibold shadow hover:bg-brand-dark/90 transition">
                {t('caseStudyClose')}
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
};

export default ProjectCard;
