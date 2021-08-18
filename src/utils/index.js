export default function removePartOfString(str, start, end) {
    return str.substr(0,start) + "..." + str.substr(end+1);
}

export function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function formatCurrency(amount, decimalCount = 8, decimal = ".", thousands = ",") {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 8 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseFloat(parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()).toString()
    let j = (i.length > 3) ? i.length % 3 : 0;

    let decimalPart = decimalCount ? Math.abs(amount - i).toFixed(decimalCount).slice(2) : ""
    decimalPart = '0.' + decimalPart

    if (parseFloat(decimalPart) === 0) {
        decimalPart = ''
    } else {
        decimalPart = parseFloat(decimalPart).toString().substring(1, decimalPart.length)
    }

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + decimalPart;
}

export function timeDifference(timestamp) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var now = new Date().getTime()
    var elapsed = now - timestamp;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}