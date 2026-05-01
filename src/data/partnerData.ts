export type PartnerColor = "blue" | "gold" | "green" | "orange";

export interface Partner {
  name: string;
  subtitle: string;
}

export interface PartnerCategory {
  id: string;
  label: string;
  color: PartnerColor;
  partners: Partner[];
}

export const partnerCategories: PartnerCategory[] = [
  {
    id: "university",
    label: "University Partners",
    color: "blue",
    partners: [
      { name: "Northeastern University", subtitle: "Boston, MA" },
      { name: "Fairleigh Dickinson", subtitle: "FDU · New Jersey" },
      { name: "Drexel University", subtitle: "Philadelphia, PA" },
      { name: "Claremont Graduate", subtitle: "Claremont, CA" },
    ],
  },
  {
    id: "workforce",
    label: "Workforce Dev Partners",
    color: "gold",
    partners: [
      { name: "US Chamber of Commerce", subtitle: "National advocacy" },
      { name: "Department of Defense", subtitle: "SkillBridge program" },
      { name: "Vets in Tech", subtitle: "Veteran transitions" },
    ],
  },
  {
    id: "business",
    label: "Business Partners",
    color: "green",
    partners: [
      { name: "SBDC", subtitle: "Small Business Dev Center" },
      { name: "Amazon AWS", subtitle: "Cloud infrastructure" },
      { name: "HubSpot", subtitle: "CRM & marketing" },
      { name: "Prime Corporate Services", subtitle: "Service partner" },
      { name: "App Forge Solutions", subtitle: "Tech dev partner" },
    ],
  },
  {
    id: "coming_soon",
    label: "Coming Soon",
    color: "orange",
    partners: [
      { name: "ClickUp", subtitle: "Project management" },
      { name: "Google Workspace", subtitle: "Productivity suite" },
      { name: "LinkedIn", subtitle: "Talent & network" },
    ],
  },
];
