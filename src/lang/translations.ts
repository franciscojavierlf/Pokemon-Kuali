/**
 * Un diccionario para varios idiomas.
 */
const Translations: Dictionary<Dictionary<string>> = {
  baseXp: {
    de: 'Grunderfahrung',
    en: 'Base Experience',
    es: 'Experiencia base',
    fr: 'Expérience de base',
    it: 'Esperianza di base',
    ko: '기본 경험',
    'ja-Hrkt': '基本的な経験',
  },
  types: {
    de: 'Typen',
    en: 'Types',
    es: 'Tipos',
    fr: 'Types',
    it: 'Tipi',
    ko: '유형',
    'ja-Hrkt': 'タイプ',
  },
  previous: {
    de: 'Bisherige',
    en: 'Previous',
    es: 'Anterior',
    fr: 'Précédent',
    it: 'Precedente',
    ko: '이전',
    'ja-Hrkt': '前',
  },
  height: {
    de: 'Höhe',
    en: 'Height',
    es: 'Altura',
    fr: 'Taille',
    it: 'Altezza',
    ko: '신장',
    'ja-Hrkt': '高さ',
  },
  language: {
    de: 'Sprache',
    en: 'Language',
    es: 'Idioma',
    fr: 'Langue',
    it: 'Linguaggio',
    ko: '언어',
    'ja-Hrkt': '言語',
  },
  next: {
    de: 'Nächster',
    en: 'Next',
    es: 'Siguiente',
    fr: 'Prochain',
    it: 'Prossimo',
    ko: '다음',
    'ja-Hrkt': '次',
  },
  weight: {
    de: 'Gewicht',
    en: 'Weight',
    es: 'Peso',
    fr: 'Poids',
    it: 'Peso',
    ko: '무게',
    'ja-Hrkt': '重量',
  },
};

type Dictionary<T> = { [id: string]: T };

export default Translations;
