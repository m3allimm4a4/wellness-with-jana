import LayoutTemplate from '../templates/layout.template';

export const proccessTemplateHtml = (html: string, params: Record<string, string>) => {
  let result = LayoutTemplate.replace('{{body}}', html.trim());
  for (const [key, value] of Object.entries(params)) {
    result = result.replaceAll(`[${key}]`, value);
  }
  return result;
};
