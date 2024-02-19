/**
 * FROM https://github.com/reZach/moontool
 * AND https://stackoverflow.com/a/64074211
 *
 * I DO NOT OWN ANY OF THIS CODE
 */

var epoch = 2444238.5,
    elonge = 278.83354,
    elongp = 282.596403,
    eccent = 0.016718,
    sunsmax = 149598500,
    sunangsiz = 0.533128,
    mmlong = 64.975464,
    mmlongp = 349.383063,
    mlnode = 151.950429,
    minc = 5.145396,
    mecc = 0.0549,
    mangsiz = 0.5181,
    msmax = 384401,
    mparallax = 0.9507,
    synmonth = 29.53058868,
    lunatbase = 2423436,
    earthrad = 6378.16,
    PI = 3.141592653589793,
    epsilon = 1e-6;
function sgn(x) {
    return x < 0 ? -1 : x > 0 ? 1 : 0;
}
function abs(x) {
    return x < 0 ? -x : x;
}
function fixAngle(a) {
    return a - 360 * Math.floor(a / 360);
}
function toRad(d) {
    return d * (PI / 180);
}
function toDeg(d) {
    return d * (180 / PI);
}
function dsin(x) {
    return Math.sin(toRad(x));
}
function dcos(x) {
    return Math.cos(toRad(x));
}
function toJulianTime(date) {
    var year, month, day;
    year = date.getFullYear();
    var m = (month = date.getMonth() + 1) > 2 ? month : month + 12,
        y = month > 2 ? year : year - 1,
        d =
            (day = date.getDate()) +
            date.getHours() / 24 +
            date.getMinutes() / 1440 +
            (date.getSeconds() + date.getMilliseconds() / 1e3) / 86400,
        b = isJulianDate(year, month, day) ? 0 : 2 - y / 100 + y / 100 / 4;
    return Math.floor(365.25 * (y + 4716) + Math.floor(30.6001 * (m + 1)) + d + b - 1524.5);
}
function isJulianDate(year, month, day) {
    if (year < 1582) return !0;
    if (year > 1582) return !1;
    if (month < 10) return !0;
    if (month > 10) return !1;
    if (day < 5) return !0;
    if (day > 14) return !1;
    throw 'Any date in the range 10/5/1582 to 10/14/1582 is invalid!';
}
function jyear(td, yy, mm, dd) {
    var z, f, alpha, b, c, d, e;
    return (
        (f = (td += 0.5) - (z = Math.floor(td))),
        (b =
            (z < 2299161 ? z : z + 1 + (alpha = Math.floor((z - 1867216.25) / 36524.25)) - Math.floor(alpha / 4)) +
            1524),
        (c = Math.floor((b - 122.1) / 365.25)),
        (d = Math.floor(365.25 * c)),
        (e = Math.floor((b - d) / 30.6001)),
        {
            day: Math.floor(b - d - Math.floor(30.6001 * e) + f),
            month: Math.floor(e < 14 ? e - 1 : e - 13),
            year: Math.floor(mm > 2 ? c - 4716 : c - 4715),
        }
    );
}
function jhms(j) {
    var ij;
    return (
        (j += 0.5),
        (ij = Math.floor(86400 * (j - Math.floor(j)) + 0.5)),
        { hour: Math.floor(ij / 3600), minute: Math.floor((ij / 60) % 60), second: Math.floor(ij % 60) }
    );
}
function jwday(j) {
    return Math.floor(j + 1.5) % 7;
}
function meanphase(sdate, k) {
    var t, t2;
    return (
        2415020.75933 +
        synmonth * k +
        1178e-7 * (t2 = (t = (sdate - 2415020) / 36525) * t) -
        155e-9 * (t2 * t) +
        33e-5 * dsin(166.56 + 132.87 * t - 0.009173 * t2)
    );
}
function truephase(k, phase) {
    var t,
        t2,
        t3,
        pt,
        m,
        mprime,
        f,
        apcor = !1;
    if (
        ((pt =
            2415020.75933 +
            synmonth * (k += phase) +
            1178e-7 * (t2 = (t = k / 1236.85) * t) -
            155e-9 * (t3 = t2 * t) +
            33e-5 * dsin(166.56 + 132.87 * t - 0.009173 * t2)),
        (m = 359.2242 + 29.10535608 * k - 333e-7 * t2 - 347e-8 * t3),
        (mprime = 306.0253 + 385.81691806 * k + 0.0107306 * t2 + 1236e-8 * t3),
        (f = 21.2964 + 390.67050646 * k - 0.0016528 * t2 - 239e-8 * t3),
        phase < 0.01 || abs(phase - 0.5) < 0.01
            ? ((pt +=
                  (0.1734 - 393e-6 * t) * dsin(m) +
                  0.0021 * dsin(2 * m) -
                  0.4068 * dsin(mprime) +
                  0.0161 * dsin(2 * mprime) -
                  4e-4 * dsin(3 * mprime) +
                  0.0104 * dsin(2 * f) -
                  0.0051 * dsin(m + mprime) -
                  0.0074 * dsin(m - mprime) +
                  4e-4 * dsin(2 * f + m) -
                  4e-4 * dsin(2 * f - m) -
                  6e-4 * dsin(2 * f + mprime) +
                  0.001 * dsin(2 * f - mprime) +
                  5e-4 * dsin(m + 2 * mprime)),
              (apcor = !0))
            : (abs(phase - 0.25) < 0.01 || abs(phase - 0.75) < 0.01) &&
              ((pt +=
                  (0.1721 - 4e-4 * t) * dsin(m) +
                  0.0021 * dsin(2 * m) -
                  0.628 * dsin(mprime) +
                  0.0089 * dsin(2 * mprime) -
                  4e-4 * dsin(3 * mprime) +
                  0.0079 * dsin(2 * f) -
                  0.0119 * dsin(m + mprime) -
                  0.0047 * dsin(m - mprime) +
                  3e-4 * dsin(2 * f + m) -
                  4e-4 * dsin(2 * f - m) -
                  6e-4 * dsin(2 * f + mprime) +
                  0.0021 * dsin(2 * f - mprime) +
                  3e-4 * dsin(m + 2 * mprime) +
                  4e-4 * dsin(m - 2 * mprime) -
                  3e-4 * dsin(2 * m + mprime)),
              (pt +=
                  phase < 0.5
                      ? 0.0028 - 4e-4 * dcos(m) + 3e-4 * dcos(mprime)
                      : 4e-4 * dcos(m) - 0.0028 - 3e-4 * dcos(mprime)),
              (apcor = !0)),
        !apcor)
    )
        throw 'Error calculating moon phase!';
    return pt;
}
function phasehunt(sdate, phases) {
    var adate,
        k1,
        k2,
        nt1,
        nt2,
        yy,
        mm,
        dd,
        jyearResult = jyear((adate = sdate - 45), yy, mm, dd);
    for (
        yy = jyearResult.year,
            mm = jyearResult.month,
            dd = jyearResult.day,
            adate = nt1 = meanphase(adate, (k1 = Math.floor(12.3685 * (yy + (1 / 12) * (mm - 1) - 1900))));
        (nt2 = meanphase((adate += synmonth), (k2 = k1 + 1))), !(nt1 <= sdate && nt2 > sdate);

    )
        (nt1 = nt2), (k1 = k2);
    return (
        (phases[0] = truephase(k1, 0)),
        (phases[1] = truephase(k1, 0.25)),
        (phases[2] = truephase(k1, 0.5)),
        (phases[3] = truephase(k1, 0.75)),
        (phases[4] = truephase(k2, 0)),
        phases
    );
}
function kepler(m, ecc) {
    var e, delta;
    e = m = toRad(m);
    do {
        e -= (delta = e - ecc * Math.sin(e) - m) / (1 - ecc * Math.cos(e));
    } while (abs(delta) > epsilon);
    return e;
}
function getMoonPhase(julianDate) {
    var Day,
        N,
        M,
        Ec,
        Lambdasun,
        ml,
        MM,
        MN,
        Ev,
        Ae,
        MmP,
        mEc,
        lP,
        lPP,
        NP,
        y,
        x,
        MoonAge,
        MoonPhase,
        MoonDist,
        MoonDFrac,
        MoonAng,
        F,
        SunDist,
        SunAng;
    return (
        (N = fixAngle((360 / 365.2422) * (Day = julianDate - epoch))),
        (Ec = kepler((M = fixAngle(N + elonge - elongp)), eccent)),
        (Ec = Math.sqrt((1 + eccent) / (1 - eccent)) * Math.tan(Ec / 2)),
        (Lambdasun = fixAngle((Ec = 2 * toDeg(Math.atan(Ec))) + elongp)),
        (F = (1 + eccent * Math.cos(toRad(Ec))) / (1 - eccent * eccent)),
        (SunDist = sunsmax / F),
        (SunAng = F * sunangsiz),
        (ml = fixAngle(13.1763966 * Day + mmlong)),
        (MM = fixAngle(ml - 0.1114041 * Day - mmlongp)),
        (MN = fixAngle(mlnode - 0.0529539 * Day)),
        (MmP =
            MM +
            (Ev = 1.2739 * Math.sin(toRad(2 * (ml - Lambdasun) - MM))) -
            (Ae = 0.1858 * Math.sin(toRad(M))) -
            0.37 * Math.sin(toRad(M))),
        (lPP =
            (lP = ml + Ev + (mEc = 6.2886 * Math.sin(toRad(MmP))) - Ae + 0.214 * Math.sin(toRad(2 * MmP))) +
            0.6583 * Math.sin(toRad(2 * (lP - Lambdasun)))),
        (NP = MN - 0.16 * Math.sin(toRad(M))),
        (y = Math.sin(toRad(lPP - NP)) * Math.cos(toRad(minc))),
        (x = Math.cos(toRad(lPP - NP))),
        toDeg(Math.atan2(y, x)),
        NP,
        toDeg(Math.asin(Math.sin(toRad(lPP - NP)) * Math.sin(toRad(minc)))),
        (MoonAge = lPP - Lambdasun),
        (MoonPhase = (1 - Math.cos(toRad(MoonAge))) / 2),
        (MoonDist = (msmax * (1 - mecc * mecc)) / (1 + mecc * Math.cos(toRad(MmP + mEc)))),
        (MoonAng = mangsiz / (MoonDFrac = MoonDist / msmax)),
        mparallax / MoonDFrac,
        {
            moonIllumination: MoonPhase,
            moonAgeInDays: synmonth * (fixAngle(MoonAge) / 360),
            distanceInKm: MoonDist,
            angularDiameterInDeg: MoonAng,
            distanceToSun: SunDist,
            sunAngularDiameter: SunAng,
            moonPhase: fixAngle(MoonAge) / 360,
        }
    );
}
function getMoonInfo(date) {
    return null == date
        ? {
              moonPhase: 0,
              moonIllumination: 0,
              moonAgeInDays: 0,
              distanceInKm: 0,
              angularDiameterInDeg: 0,
              distanceToSun: 0,
              sunAngularDiameter: 0,
          }
        : getMoonPhase(toJulianTime(date));
}
function getEaster(year) {
    var previousMoonInfo,
        moonInfo,
        fullMoon = new Date(year, 2, 21),
        gettingDarker = void 0;
    do {
        (previousMoonInfo = getMoonInfo(fullMoon)),
            fullMoon.setDate(fullMoon.getDate() + 1),
            (moonInfo = getMoonInfo(fullMoon)),
            void 0 === gettingDarker
                ? (gettingDarker = moonInfo.moonIllumination < previousMoonInfo.moonIllumination)
                : gettingDarker &&
                  moonInfo.moonIllumination > previousMoonInfo.moonIllumination &&
                  (gettingDarker = !1);
    } while (
        (gettingDarker && moonInfo.moonIllumination < previousMoonInfo.moonIllumination) ||
        (!gettingDarker && moonInfo.moonIllumination > previousMoonInfo.moonIllumination)
    );
    for (fullMoon.setDate(fullMoon.getDate() - 1); 0 !== fullMoon.getDay(); ) fullMoon.setDate(fullMoon.getDate() + 1);
    return fullMoon;
}

export { getMoonInfo, getEaster };
