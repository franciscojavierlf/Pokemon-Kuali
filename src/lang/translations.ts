/**
 * Un diccionario para varios idiomas.
 */
const Translations: Dictionary<Dictionary<string>> = {
  baseXp: {
    en: 'Base Experience',
    es: 'Experiencia base',
  },
  types: {
    en: 'Types',
    es: 'Tipos',
  },
  previous: {
    en: 'Previous',
    es: 'Anterior',
  },
  height: {
    en: 'Height',
    es: 'Altura',
  },
  language: {
    en: 'Language',
    es: 'Idioma',
  },
  next: {
    en: 'Next',
    es: 'Siguiente',
  },
  weight: {
    en: 'Weight',
    es: 'Peso',
  },
};

type Dictionary<T> = { [id: string]: T };

export default Translations;
