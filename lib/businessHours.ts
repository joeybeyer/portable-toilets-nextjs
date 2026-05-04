// Business hours check using phone area code to estimate lead's timezone
// Prevents calling leads between 9pm-9am in their local time

const PACIFIC_CODES = new Set([
  '206','209','213','253','310','323','341','360','408','415','424','425',
  '442','503','509','510','530','559','562','619','626','627','628','650',
  '657','661','669','707','714','747','760','775','805','818','831','858',
  '909','916','925','949','951','971'
]);

const MOUNTAIN_CODES = new Set([
  '303','307','385','406','435','480','505','520','575','602','623','720',
  '801','928','970'
]);

const CENTRAL_CODES = new Set([
  '205','210','214','217','224','225','228','251','254','256','262','281',
  '309','312','314','316','318','319','320','325','331','334','346','361',
  '402','405','409','414','417','430','432','469','479','484','501','507',
  '512','515','520','563','573','601','608','612','615','618','630','636',
  '651','660','662','682','701','708','712','713','715','716','717','731',
  '763','769','773','779','785','806','815','816','817','830','832','847',
  '850','870','901','903','913','918','920','936','940','952','956','972',
  '979','985'
]);

// Everything else defaults to Eastern

function getTimezoneOffset(phone: string): number {
  // Extract area code from phone number
  const cleaned = phone.replace(/[^0-9]/g, '');
  let areaCode = '';
  
  if (cleaned.startsWith('1') && cleaned.length === 11) {
    areaCode = cleaned.substring(1, 4);
  } else if (cleaned.length === 10) {
    areaCode = cleaned.substring(0, 3);
  } else {
    return -5; // Default to Eastern
  }

  if (PACIFIC_CODES.has(areaCode)) return -8;   // Pacific (UTC-8 standard, -7 DST)
  if (MOUNTAIN_CODES.has(areaCode)) return -7;   // Mountain (UTC-7 standard, -6 DST)
  if (CENTRAL_CODES.has(areaCode)) return -6;    // Central (UTC-6 standard, -5 DST)
  return -5; // Eastern (UTC-5 standard, -4 DST)
}

function isDST(): boolean {
  // Simple DST check for US: second Sunday in March to first Sunday in November
  const now = new Date();
  const month = now.getUTCMonth(); // 0-indexed
  if (month > 2 && month < 10) return true;  // Apr-Oct always DST
  if (month < 2 || month > 10) return false; // Jan-Feb, Dec never DST
  // March or November - approximate
  const day = now.getUTCDate();
  if (month === 2) return day >= 10; // After ~March 10
  if (month === 10) return day < 3;  // Before ~Nov 3
  return false;
}

export function isBusinessHours(phone: string): boolean {
  const standardOffset = getTimezoneOffset(phone);
  const dstAdjust = isDST() ? 1 : 0;
  const offset = standardOffset + dstAdjust;
  
  const now = new Date();
  const utcHour = now.getUTCHours();
  const localHour = (utcHour + offset + 24) % 24;
  
  // Business hours: 9am to 9pm local time
  return localHour >= 9 && localHour < 21;
}

export function getLocalHour(phone: string): number {
  const standardOffset = getTimezoneOffset(phone);
  const dstAdjust = isDST() ? 1 : 0;
  const offset = standardOffset + dstAdjust;
  
  const now = new Date();
  const utcHour = now.getUTCHours();
  return (utcHour + offset + 24) % 24;
}
