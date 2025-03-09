import { Layout } from '../templates/templates.module';

export const proccessTemplateHtml = (html: string, params: Record<string, string>) => {
  let result = Layout.replace('{{body}}', html.trim());
  for (const [key, value] of Object.entries(params)) {
    result = result.replaceAll(`[${key}]`, value);
  }
  return result;
};

export const getStaticTemplate = async (name: string, params: Record<string, string>) => {
  const html = await import(`../templates/${name}.template`).then(m => m.default);
  return proccessTemplateHtml(html, params);
};
