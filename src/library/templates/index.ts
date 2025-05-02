import { researchTemplate } from './research';
import { bmjTemplate } from './bmj';
import { goodTemplate } from './good';
import { vascularTemplate } from './vascular';
import { medicalTemplate } from './medical';
import { urologyTemplate } from './urology';

export const SVG_TEMPLATES = {
  research: researchTemplate,
  bmj: bmjTemplate,
  good: goodTemplate,
  vascular: vascularTemplate,
  medical: medicalTemplate,
  urology: urologyTemplate
} as const;

export type TemplateType = keyof typeof SVG_TEMPLATES;