const LANGUAGES = [
  {
    id: 'common',
    name: 'Gemeinsprache',
    description: 'Die Gemeinsprache ist die Sprache, die von den meisten Menschen gesprochen wird.',
  },
] as const

const LANGUAGE_LEVELS = [
  {
    name: 'Anfänger',
    description: 'Der Charakter kann nur einzelne Wörter und einfache Phrasen verstehen.',
  },
  {
    name: 'Grundkenntnisse',
    description: 'Der Charakter kann einfache Sätze bilden und verstehen.',
  },
  {
    name: 'Fortgeschrittene Sprachkenntnisse',
    description: '',
  },
  {
    name: 'Fließend',
    description: 'Der Charakter kann komplexe Sätze bilden und verstehen.',
  },
  {
    name: 'Fachkundige Sprachkenntnisse',
    description: '',
  },
  {
    name: 'Muttersprachler',
    description: 'Der Charakter spricht die Sprache fließend und ohne Akzent.',
  },
] as const

type Language = typeof LANGUAGES[number]['id']
type LanguageLevels = typeof LANGUAGE_LEVELS

type LanguageToLevelMap = {
  [T in Language]: typeof LANGUAGE_LEVELS['length']
}

export { Language, LANGUAGE_LEVELS, LanguageLevels, LANGUAGES, LanguageToLevelMap }
