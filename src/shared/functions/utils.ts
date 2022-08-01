import moment from 'moment';
import { Buffer } from 'buffer';

export const formatDate = (date: string, format?: string) => date && moment(date).format(format || 'DD/MM/YYYY');

// Provides status of language proficiency based on passed value.
export const languageStatusProvider = (value?: number): string => {
  const valuesMap: Record<number, string> = {
    0: "No Proficiency",
    20: "Elementary Proficiency",
    40: "Limited Working Proficiency",
    60: "Professional Working Proficiency",
    80: "Full Professional Proficiency",
    100: "Native / Bilingual Proficiency",
  };

  return valuesMap[value || 0];
};

export const b64toFile = (b64Data: string, name: string = '', contentType = '') => {
  const byteArrays = Buffer.from(b64Data, 'base64');
  const file = new File([byteArrays], name, { type: contentType });
  return file;
}