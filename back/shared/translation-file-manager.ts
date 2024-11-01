import { Label } from '../models/label.model';
import { Language } from '../types/language.type';
import { mkdir, readFile, rename, writeFile } from 'fs/promises';

const getFilePath = (language: Language) => {
  return `./public/i18n/${language}.json`;
};

const getTmpFilePath = (language: Language) => {
  return `./public/i18n/${language}.tmp.json`;
};

const writeJson = async (language: Language, data: Record<string, string>) => {
  const tempFilePath = getTmpFilePath(language);
  const filePath = getFilePath(language);
  await writeFile(tempFilePath, JSON.stringify(data), { encoding: 'utf-8' });
  await rename(tempFilePath, filePath);
};

export const createTranslationFiles = async (languages: Language[]) => {
  await mkdir('./public/i18n/', { recursive: true });

  const labels = await Label.find();

  const writePromises = languages.map(language => {
    const res: Record<string, string> = {};
    labels.forEach(label => {
      res[label.name] = label[language];
    });
    return writeJson(language, res);
  });

  await Promise.all(writePromises);
};

export const updateTranslationFile = async (labels: { name: string; label: string }[], language: Language) => {
  const data = await readFile(getFilePath(language), 'utf8');
  const jsonData: Record<string, string> = JSON.parse(data);
  labels.forEach(({ name, label }) => {
    jsonData[name] = label;
  });
  await writeJson(language, jsonData);
};

export const removeLabelFromTranslationFile = async (id: string, language: Language) => {
  const data = await readFile(getFilePath(language), 'utf8');
  const jsonData: Record<string, string> = JSON.parse(data);
  delete jsonData[id];
  await writeJson(language, jsonData);
};
