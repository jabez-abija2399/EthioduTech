// lib/ai/distress-detector.ts

/**
 * A synchronous safety layer to detect potential distress in student messages.
 * Matches keywords across English and Amharic.
 * If triggered, this MUST bypass the LLM entirely per RULE-012.
 */

const DISTRESS_KEYWORDS = [
  // English
  'kill myself',
  'suicide',
  'want to die',
  'hurt myself',
  'abuse',
  'hitting me',
  // Amharic (approximations for safety rule demonstration)
  'ራሴን ማጥፋት',
  'መሞት እፈልጋለሁ',
  'እራሴን መጉዳት',
  'ጥቃት',
  'እየመታኝ'
]

const DISTRESS_REGEX = new RegExp(DISTRESS_KEYWORDS.join('|'), 'i')

export const SAFE_REPLY_EN = "I'm a coding assistant, but it sounds like you might be going through a really tough time. Please talk to a trusted adult, teacher, or call a local helpline. You don't have to go through this alone."
export const SAFE_REPLY_AM = "እኔ የኮዲንግ ረዳት ነኝ፣ ነገር ግን በጣም ከባድ ጊዜ እያሳለፍክ ያለህ ይመስላል። እባክህ ለምታምነው አዋቂ፣ አስተማሪ ንገራቸው፣ ወይም የአካባቢ የእርዳታ መስመር ይደውሉ። ይህንን ብቻህን ማለፍ የለብህም።"

export function checkDistress(message: string): boolean {
  if (!message) return false
  return DISTRESS_REGEX.test(message)
}

export function getSafeReply(locale: string = 'en'): string {
  return locale === 'am' ? SAFE_REPLY_AM : SAFE_REPLY_EN
}
