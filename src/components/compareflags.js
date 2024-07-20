// Import the countries data and flag data
const countries = require('./countries.json');

const easyFlags = ["US", "CA", "GB", "FR", "DE", "IT", "ES", "CN", "JP", "AU", "RU", "BR", "IN", "MX"];
const mediumFlags = ["AR", "ZA", "KR", "NL", "SE", "NO", "DK", "FI", "BE", "CH", "PL", "PT", "AT", "GR", "TR", "SA", "EG", "IL", "NZ", "IE"];
const hardFlags = ["AD", "AE", "AF", "AG", "AM", "AZ", "BA", "BD", "BH", "BY", "BO", "BW", "HR", "CY", "CZ", "DO", "EE", "ET", "FJ", "GE", "GH", "GT", "HN", "HU", "ID", "IQ", "IR", "JM", "JO", "KE", "KW", "LB", "LT", "LU", "MY", "MT", "MU", "MD", "MN", "MA", "NA", "NP", "NG", "MK", "OM", "PK", "PA", "PG", "PY", "PE", "PH", "QA", "RO", "RS", "SG", "SK", "SI", "LK", "SY", "TH", "TT", "TN", "UA", "UZ", "VE", "VN", "ZM", "ZW"];
const extremelyHardFlags = ["AI", "AO", "AQ", "AS", "AW", "AX", "BB", "BZ", "BJ", "BM", "BT", "BV", "BF", "BI", "CV", "BQ", "CC", "KM", "CK", "CW", "DJ", "DM", "GQ", "FO", "GF", "PF", "TF", "GA", "GL", "GD", "GP", "GU", "GN", "GW", "GY", "HM", "IM", "KZ", "KI", "XK", "KG", "LA", "LS", "LR", "LY", "MO", "MG", "MW", "MV", "ML", "MH", "MQ", "MR", "YT", "FM", "MC", "ME", "MS", "MM", "NR", "NC", "NI", "NE", "NF", "MP", "PW", "PS", "PN", "PR", "RE", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SN", "SC", "SL", "SX", "SB", "SO", "GS", "SS", "SR", "SJ", "SZ", "TJ", "TZ", "TL", "TG", "TK", "TO", "TM", "TC", "TV", "UM", "VU", "VG", "VI", "WF", "EH", "YE"];

const allFlags = [...easyFlags, ...mediumFlags, ...hardFlags, ...extremelyHardFlags];

const missingFlags = allFlags.filter(flag => !countries[flag]);

console.log('Missing countries:', missingFlags);
