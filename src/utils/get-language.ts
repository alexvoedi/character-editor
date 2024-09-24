import type { Language } from '@/data/languages'
import { LANGUAGES } from '@/data/languages'

export function getLanguage(languageId: Language) {
  const language = LANGUAGES.find(language => language.id === languageId)

  if (!language)
    throw new Error(`Language with id ${languageId} not found`)

  return language
}
