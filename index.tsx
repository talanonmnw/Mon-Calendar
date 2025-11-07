/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// --- CALENDRICAL DATA ---
const CALENDAR_DATA = {
  "description": "Comprehensive data for Myanmar and Mon calendrical calculations, based on ceMmDateTime.js. This data is intended for use in AI model system instructions.",
  "languages": { "en": "English", "my": "Myanmar (Unicode)", "mnw": "Mon" },
  "translations": {
    "months_traditional": [
      { "en": "Tagu", "my": "တန်ခူး", "mnw": "ဂိတုစဲ" }, { "en": "Kason", "my": "ကဆုန်", "mnw": "ဂိတုပသာ်" },
      { "en": "Nayon", "my": "နယုန်", "mnw": "ဂိတုဇ်ှေ" }, { "en": "Waso", "my": "ဝါဆို", "mnw": "ဂိတုဒ္ဂိုန်" },
      { "en": "Wagaung", "my": "ဝါခေါင်", "mnw": "ဂိတုခ္ဍဲသဳ" }, { "en": "Tawthalin", "my": "တော်သလင်း", "mnw": "ဂိတုဘတ်" },
      { "en": "Thadingyut", "my": "သီတင်းကျွတ်", "mnw": "ဂိတုဝှ်" }, { "en": "Tazaungmon", "my": "တန်ဆောင်မုန်း", "mnw": "ဂိတုက္ထိုန်" },
      { "en": "Nadaw", "my": "နတ်တော်", "mnw": "ဂိတုမြေက္ကသဵု" }, { "en": "Pyatho", "my": "ပြာသို", "mnw": "ဂိတုပှော်" },
      { "en": "Tabodwe", "my": "တပို့တွဲ", "mnw": "ဂိတုမာ်" }, { "en": "Tabaung", "my": "တပေါင်း", "mnw": "ဂိတုဖဝ်ရဂိုန်" },
      { "en": "First Waso", "my": "ပဝါဆို", "mnw": "ဂိတုပ-ဒ္ဂိုန်" }, { "en": "Second Waso", "my": "ဒုဝါဆို", "mnw": "ဒုဂိတုဒ္ဂိုန်" }
    ],
    "weekdays": [
      { "en": "Sunday", "my": "တနင်္ဂနွေ", "mnw": "တ္ၚဲအဒိုတ်" }, { "en": "Monday", "my": "တနင်္လာ", "mnw": "တ္ၚဲစန်" },
      { "en": "Tuesday", "my": "အင်္ဂါ", "mnw": "တ္ၚဲအင္ၚာ" }, { "en": "Wednesday", "my": "ဗုဒ္ဓဟူး", "mnw": "တ္ၚဲဗုဒ္ဓဝါ" },
      { "en": "Thursday", "my": "ကြာသပတေး", "mnw": "တ္ၚဲဗြဴဗတိ" }, { "en": "Friday", "my": "သောကြာ", "mnw": "တ္ၚဲသိုက်" },
      { "en": "Saturday", "my": "စနေ", "mnw": "တ္ၚဲသ္ၚိသဝ်" }
    ],
    "moon_phases": [
      { "en": "Waxing", "my": "လဆန်း", "mnw": "မံက်" }, { "en": "Full Moon", "my": "လပြည့်", "mnw": "ပေၚ်" },
      { "en": "Waning", "my": "လဆုတ်", "mnw": "စွေက်" }, { "en": "New Moon", "my": "လကွယ်", "mnw": "အိုတ်" }
    ],
    "terms": [
      { "en": "Sabbath", "my": "ဥပုသ်", "mnw": "ဥပုသ်" }, { "en": "Sabbath Eve", "my": "အဖိတ်", "mnw": "အဖိတ်" },
      { "en": "Myanmar Year", "my": "မြန်မာနှစ်", "mnw": "သက္ကရာဇ်ဍုၚ်" }, { "en": "Sasana Year", "my": "သာသနာနှစ်", "mnw": "သက္ကရာဇ်သာသနာ" }
    ]
  }
};

// --- START OF ceMmDateTime LOGIC ---
// Logic from ceMmDateTime.js to ensure accurate calendar calculations.
class ceDateTime {
	// FIX: Added missing class properties for TypeScript.
	m_jd: number;
	m_tz: number;
	m_ct: number;
	m_SG: number;

	constructor(m_jd?, m_tz?, m_ct = 0, m_SG = 2361222) {
		// 2361222 - Gregorian start in British calendar (1752/Sep/14)
		if (m_tz == undefined) this.m_tz = ceDateTime.ltzoh();
		else this.m_tz = m_tz;// time zone for this particular instance 
		if (m_jd == undefined) this.m_jd = ceDateTime.jdnow();
		else this.m_jd = m_jd;// julian date in UTC
		this.m_ct = m_ct; // calendar type [0=British (default), 1=Gregorian, 2=Julian]
		this.m_SG = m_SG; // Beginning of Gregorian calendar in JDN [default=2361222]
	}
	static j2w(jd, ct = 0, SG = 2361222) {
		var j, jf, y, m, d, h, n, s;
		if (ct == 2 || (ct == 0 && (jd < SG))) {
			var b, c, f, e;
			j = Math.floor(jd + 0.5); jf = jd + 0.5 - j;
			b = j + 1524; c = Math.floor((b - 122.1) / 365.25); f = Math.floor(365.25 * c);
			e = Math.floor((b - f) / 30.6001); m = (e > 13) ? (e - 13) : (e - 1);
			d = b - f - Math.floor(30.6001 * e); y = m < 3 ? (c - 4715) : (c - 4716);
		}
		else {
			j = Math.floor(jd + 0.5); jf = jd + 0.5 - j; j -= 1721119;
			y = Math.floor((4 * j - 1) / 146097); j = 4 * j - 1 - 146097 * y; d = Math.floor(j / 4);
			j = Math.floor((4 * d + 3) / 1461); d = 4 * d + 3 - 1461 * j;
			d = Math.floor((d + 4) / 4); m = Math.floor((5 * d - 3) / 153); d = 5 * d - 3 - 153 * m;
			d = Math.floor((d + 5) / 5); y = 100 * y + j;
			if (m < 10) { m += 3; }
			else { m -= 9; y = y + 1; }
		}
		jf *= 24; h = Math.floor(jf); jf = (jf - h) * 60; n = Math.floor(jf); s = (jf - n) * 60;
		return { y: y, m: m, d: d, h: h, n: n, s: s };
	}
	static t2d(h, n, s) { return ((h - 12) / 24 + n / 1440 + s / 86400); }
	static w2j(y, m, d, h = 12, n = 0, s = 0, ct = 0, SG = 2361222) {
		var a = Math.floor((14 - m) / 12); y = y + 4800 - a; m = m + (12 * a) - 3;
		var jd = d + Math.floor((153 * m + 2) / 5) + (365 * y) + Math.floor(y / 4);
		if (ct == 1) jd = jd - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
		else if (ct == 2) jd = jd - 32083;
		else {
			jd = jd - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
			if (jd < SG) {
				jd = d + Math.floor((153 * m + 2) / 5) + (365 * y) + Math.floor(y / 4) - 32083;
				if (jd > SG) jd = SG;
			}
		}
		return jd + ceDateTime.t2d(h, n, s);
	}
	// FIX: Added missing static methods to resolve errors.
	static u2j(ut) {
		var jd = 2440587.5 + ut / 86400.0;
		return jd;
	}
	static jdnow() {
		var dt = new Date();
		var ut = dt.getTime() / 1000.0;
		return ceDateTime.u2j(ut);
	}
	static ltzoh() {
		var dt = new Date();
		var tz = dt.getTimezoneOffset() / 60.0;
		return -tz;
	}
}

class ceMmDateTime extends ceDateTime {
	static GetMyConst(my) {
		var EI, WO, NM, EW = 0, i; var fme, wte;
		if (my >= 1312) {
			EI = 3; WO = -0.5; NM = 8;
			fme = [[1377, 1]];
			wte = [1344, 1345];
		}
		else if (my >= 1217) {
			EI = 2; WO = -1; NM = 4;
			fme = [[1234, 1], [1261, -1]];
			wte = [1263, 1264];
		}
		else if (my >= 1100) {
			EI = 1.3; WO = -0.85; NM = -1;
			fme = [[1120, 1], [1126, -1], [1150, 1], [1172, -1], [1207, 1]];
			wte = [1201, 1202];
		}
		else if (my >= 798) {
			EI = 1.2; WO = -1.1; NM = -1;
			fme = [[813, -1], [849, -1], [851, -1], [854, -1], [927, -1], [933, -1], [936, -1],
			[938, -1], [949, -1], [952, -1], [963, -1], [968, -1], [1039, -1]];
			wte = [];
		}
		else {
			EI = 1.1; WO = -1.1; NM = -1;
			fme = [[205, 1], [246, 1], [471, 1], [572, -1], [651, 1], [653, 2], [656, 1], [672, 1],
			[729, 1], [767, -1]];
			wte = [];
		}
		i = ceMmDateTime.bSearch2(my, fme); if (i >= 0) WO += fme[i][1];
		i = ceMmDateTime.bSearch1(my, wte); if (i >= 0) EW = 1;
		return { EI: EI, WO: WO, NM: NM, EW: EW };
	}
	static bSearch2(k, A) {
		var i = 0; var l = 0; var u = A.length - 1;
		while (u >= l) {
			i = Math.floor((l + u) / 2);
			if (A[i][0] > k) u = i - 1;
			else if (A[i][0] < k) l = i + 1;
			else return i;
		} return -1;
	}
	static bSearch1(k, A) {
		var i = 0; var l = 0; var u = A.length - 1;
		while (u >= l) {
			i = Math.floor((l + u) / 2);
			if (A[i] > k) u = i - 1;
			else if (A[i] < k) l = i + 1;
			else return i;
		} return -1;
	}
	static cal_watat(my) {
		var SY = 1577917828.0 / 4320000.0;
		var LM = 1577917828.0 / 53433336.0;
		var MO = 1954168.050623;
		var c = ceMmDateTime.GetMyConst(my);
		var TA = (SY / 12 - LM) * (12 - c.NM);
		var ed = (SY * (my + 3739)) % LM;
		if (ed < TA) ed += LM;
		var fm = Math.round(SY * my + MO - ed + 4.5 * LM + c.WO);
		var TW = 0, watat = 0;
		if (c.EI >= 2) {
			TW = LM - (SY / 12 - LM) * c.NM;
			if (ed >= TW) watat = 1;
		}
		else {
			watat = (my * 7 + 2) % 19; if (watat < 0) watat += 19;
			watat = Math.floor(watat / 12);
		}
		watat ^= c.EW;
		return { fm: fm, watat: watat };
	}
	static cal_my(my) {
		var yd = 0, y1, nd = 0, werr = 0, fm = 0;
		var y2 = ceMmDateTime.cal_watat(my); var myt = y2.watat;
		do { yd++; y1 = ceMmDateTime.cal_watat(my - yd); } while (y1.watat == 0 && yd < 3);
		if (myt) {
			nd = (y2.fm - y1.fm) % 354; myt = Math.floor(nd / 31) + 1;
			fm = y2.fm; if (nd != 30 && nd != 31) { werr = 1; }
		}
		else fm = y1.fm + 354 * yd;
		var tg1 = y1.fm + 354 * yd - 102;
		return { myt: myt, tg1: tg1, fm: fm, werr: werr };
	}
	static j2m(jdn) {
		jdn = Math.round(jdn);
		var SY = 1577917828.0 / 4320000.0;
		var MO = 1954168.050623;
		var my, yo, dd, myl, mmt, a, b, c, e, f, mm, md;
		my = Math.floor((jdn - 0.5 - MO) / SY);
		yo = ceMmDateTime.cal_my(my);
		dd = jdn - yo.tg1 + 1;
		b = Math.floor(yo.myt / 2); c = Math.floor(1 / (yo.myt + 1));
		myl = 354 + (1 - c) * 30 + b;
		mmt = Math.floor((dd - 1) / myl);
		dd -= mmt * myl; a = Math.floor((dd + 423) / 512);
		mm = Math.floor((dd - b * a + c * a * 30 + 29.26) / 29.544);
		e = Math.floor((mm + 12) / 16); f = Math.floor((mm + 11) / 16);
		md = dd - Math.floor(29.544 * mm - 29.26) - b * e + c * f * 30;
		mm += f * 3 - e * 4 + 12 * mmt;
		return { myt: yo.myt, my: my, mm: mm, md: md };
	}
	static cal_mp(md, mm, myt) {
		var mml = ceMmDateTime.cal_mml(mm, myt);
		return (Math.floor((md + 1) / 16) + Math.floor(md / 16) + Math.floor(md / mml));
	}
	static cal_mml(mm, myt) {
		var mml = 30 - mm % 2;
		if (mm == 3) mml += Math.floor(myt / 2);
		return mml;
	}
	static cal_mf(md) {
		return (md - 15 * Math.floor(md / 16));
	}
	static my2sy(my, mm, md, k = 0) {
		var buddhistEraOffset = 1182;
		if (k == 1) {
			if (mm >= 13) buddhistEraOffset = 1183;
		}
		else if (k == 2) {
			if ((mm == 1) || (mm == 2 && md < 15)) buddhistEraOffset = 1181;
		}
		return (my + buddhistEraOffset);
	}
	static cal_sabbath(md, mm, myt) {
		var mml = ceMmDateTime.cal_mml(mm, myt);
		var s = 0; if ((md == 8) || (md == 15) || (md == 23) || (md == mml)) s = 1;
		if ((md == 7) || (md == 14) || (md == 22) || (md == (mml - 1))) s = 2;
		return s;
	}
}
// --- END OF ceMmDateTime LOGIC ---

// --- MON CALENDAR CALCULATION ENGINE ---
const MonCalendar = (() => {
    // FIX: Refactored tmap creation to be type-safe and avoid TypeScript errors.
    const createSubMap = (items: Readonly<Array<{ en: string; my: string; mnw: string }>>) =>
        items.reduce((acc: Record<string, string>, item) => {
            acc[item.en] = item.mnw;
            return acc;
        }, {});

    const tmap = {
        months_traditional: createSubMap(CALENDAR_DATA.translations.months_traditional),
        weekdays: createSubMap(CALENDAR_DATA.translations.weekdays),
        moon_phases: createSubMap(CALENDAR_DATA.translations.moon_phases),
        terms: createSubMap(CALENDAR_DATA.translations.terms),
    };

    const mma = ["First Waso", "Tagu", "Kason", "Nayon", "Waso", "Wagaung", "Tawthalin",
			"Thadingyut", "Tazaungmon", "Nadaw", "Pyatho", "Tabodwe", "Tabaung", "Late Tagu", "Late Kason"];
    const mpa = ["Waxing", "Full Moon", "Waning", "New Moon"];

    return {
        getDate: (year, month, day) => { // month is 0-indexed from UI
            const jdn = ceDateTime.w2j(year, month + 1, day);
            const mDate = ceMmDateTime.j2m(jdn);
            if (!mDate) return null;

            const { myt, my, mm, md } = mDate;

            const mp = ceMmDateTime.cal_mp(md, mm, myt);
            const mdp = ceMmDateTime.cal_mf(md);

            const sabbathStatus = ceMmDateTime.cal_sabbath(md, mm, myt);
            const isSabbath = sabbathStatus === 1;
            const isSabbathEve = sabbathStatus === 2;
            
            let month_en = mma[mm];
            if (mm === 4 && myt > 0) { // Waso in a leap year is Second Waso
                month_en = "Second Waso";
            }
            const phase_en = mpa[mp];
            
            let sabbathTerm = "";
            if (isSabbath) {
                sabbathTerm = tmap.terms["Sabbath"];
            } else if (isSabbathEve) {
                sabbathTerm = tmap.terms["Sabbath Eve"];
            }

            return {
                myt, my, mm, md, // Pass through original data for other calculations
                month: tmap.months_traditional[month_en] || month_en,
                moonPhase: tmap.moon_phases[phase_en] || phase_en,
                moonDay: mdp,
                isSabbath: isSabbath,
                isSabbathEve: isSabbathEve,
                sabbathTerm: sabbathTerm,
            };
        }
    };
})();

// --- UTILITIES ---
const toMonDigits = (num) => {
    const monDigits = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];
    return String(num).split('').map(digit => monDigits[parseInt(digit, 10)]).join('');
};


// --- CONSTANTS ---
const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const MON_MONTH_NAMES = [
    "ဂျာန်ဏာဝရဳ", "ဖေဖဝ်ဝရဳ", "မာဇ်", "အေပြဳလ်", "မေ", "ဂျုန်",
    "ဂျူလာယ်", "အဝ်ဂါသ်", "သေပ်တေမ်ဗာ", "အံက်တဝ်ဗာ", "နောဝေမ်ဗာ", "ဒဳဇြေမ်ဗာ"
];
const DAYS_EN = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const DAYS_MON = [
    "တ္ၚဲအဒိုတ်", "တ္ၚဲစန်", "တ္ၚဲအၚာ", "တ္ၚဲဗုဒ္ဓဝါ",
    "တ္ၚဲဗြဴဗတိ", "တ္ၚဲသိုက်", "တ္ၚဲသ္ၚိသဝ်"
];

// --- MAIN APP ---
const App = () => {
    const appElement = document.getElementById('app');
    if (!appElement) return;

    const today = new Date();

    // State to hold the currently displayed month and year
    const state = {
        month: today.getMonth(),
        year: today.getFullYear(),
    };

    const renderCalendar = (year, month) => {
        appElement.innerHTML = '';

        const calendarContainer = document.createElement('div');
        calendarContainer.className = 'calendar-container';

        // Header
        const header = document.createElement('div');
        header.className = 'calendar-header';

        const prevButton = document.createElement('button');
        prevButton.className = 'nav-button';
        prevButton.setAttribute('aria-label', 'Previous month');
        prevButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
        prevButton.addEventListener('click', () => {
            state.month--;
            if (state.month < 0) {
                state.month = 11;
                state.year--;
            }
            renderCalendar(state.year, state.month);
        });

        const headerTextContainer = document.createElement('div');
        headerTextContainer.className = 'header-text-container';

        const monthYearText = document.createElement('h2');
        monthYearText.className = 'month-year-text';
        monthYearText.textContent = `${MON_MONTH_NAMES[month]}~${MONTH_NAMES[month].toLowerCase()} ${year}`;

        headerTextContainer.appendChild(monthYearText);

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayMon = MonCalendar.getDate(year, month, 1);
        const lastDayMon = MonCalendar.getDate(year, month, daysInMonth);
        
        if (firstDayMon && lastDayMon) {
            const myanmarYearText = document.createElement('div');
            myanmarYearText.className = 'myanmar-year-text';
            const sasanaYearStart = ceMmDateTime.my2sy(firstDayMon.my, firstDayMon.mm, firstDayMon.md);
            const sasanaYearEnd = ceMmDateTime.my2sy(lastDayMon.my, lastDayMon.mm, lastDayMon.md);
            myanmarYearText.textContent = `${CALENDAR_DATA.translations.terms[2].mnw} ${toMonDigits(firstDayMon.my)}` +
                (firstDayMon.my !== lastDayMon.my ? `/${toMonDigits(lastDayMon.my)}` : ``) + 
                ` (${CALENDAR_DATA.translations.terms[3].mnw} ${toMonDigits(sasanaYearStart)}${sasanaYearStart !== sasanaYearEnd ? `/${toMonDigits(sasanaYearEnd)}`: ''})`;
            headerTextContainer.appendChild(myanmarYearText);
        }

        const nextButton = document.createElement('button');
        nextButton.className = 'nav-button';
        nextButton.setAttribute('aria-label', 'Next month');
        nextButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
        nextButton.addEventListener('click', () => {
            state.month++;
            if (state.month > 11) {
                state.month = 0;
                state.year++;
            }
            renderCalendar(state.year, state.month);
        });

        header.appendChild(prevButton);
        header.appendChild(headerTextContainer);
        header.appendChild(nextButton);
        calendarContainer.appendChild(header);

        // Grid
        const calendarGrid = document.createElement('div');
        calendarGrid.className = 'calendar-grid';

        // Day names
        DAYS_EN.forEach((day, index) => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';

            const engName = document.createElement('span');
            engName.className = 'day-name-eng';
            engName.textContent = day;

            const monName = document.createElement('span');
            monName.className = 'day-name-mon';
            monName.textContent = DAYS_MON[index];

            dayHeader.appendChild(engName);
            dayHeader.appendChild(monName);
            calendarGrid.appendChild(dayHeader);
        });

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        const daysInMonthGrid = new Date(year, month + 1, 0).getDate();
        const totalCells = (firstDayOfMonth + daysInMonthGrid) > 35 ? 42 : 35;

        for (let i = 0; i < totalCells; i++) {
            const dayCell = document.createElement('div');
            const dayContent = document.createElement('div');
            dayContent.className = 'day-content';

            let day, currentMonth, currentYear;

            if (i < firstDayOfMonth) {
                day = daysInPrevMonth - firstDayOfMonth + 1 + i;
                currentMonth = month - 1;
                currentYear = year;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                dayCell.className = 'day-cell other-month';
            } else if (i < firstDayOfMonth + daysInMonthGrid) {
                day = i - firstDayOfMonth + 1;
                currentMonth = month;
                currentYear = year;
                dayCell.className = 'day-cell';
            } else {
                day = i - (firstDayOfMonth + daysInMonthGrid) + 1;
                currentMonth = month + 1;
                currentYear = year;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                dayCell.className = 'day-cell other-month';
            }
            
            const monDate = MonCalendar.getDate(currentYear, currentMonth, day);

            if (monDate) {
                 if (monDate.isSabbath) dayCell.classList.add('sabbath');
                 if (monDate.isSabbathEve) dayCell.classList.add('sabbath-eve');
            }

            const dayNumber = document.createElement('span');
            dayNumber.className = 'day-number';
            dayNumber.textContent = day.toString();
            
            if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dayNumber.classList.add('today');
            }

            dayContent.appendChild(dayNumber);
            
            if (monDate) {
                const lunarInfo = document.createElement('div');
                lunarInfo.className = 'lunar-info';
                
                const monDayNumberEl = document.createElement('span');
                monDayNumberEl.className = 'lunar-day-number';
                monDayNumberEl.textContent = toMonDigits(monDate.moonDay);
                lunarInfo.appendChild(monDayNumberEl);

                const lunarTextEl = document.createElement('span');
                lunarTextEl.className = 'lunar-text';
                if (monDate.isSabbath || monDate.isSabbathEve) {
                    lunarTextEl.textContent = monDate.sabbathTerm;
                } else {
                    lunarTextEl.textContent = monDate.moonPhase;
                }
                lunarInfo.appendChild(lunarTextEl);
                
                dayContent.appendChild(lunarInfo);
            }

            dayCell.appendChild(dayContent);
            calendarGrid.appendChild(dayCell);
        }

        calendarContainer.appendChild(calendarGrid);
        appElement.appendChild(calendarContainer);
    };

    // Initial Render
    renderCalendar(state.year, state.month);
};

App();