export function makeDate(day, month) {
    let trueDay = ''
    let trueMonth = ''
    if (month < 9) {
        trueMonth = '0' + String(+month + 1);
    } else {
        trueMonth = String(+month + 1);
    }
    if (day < 9) {
        trueDay = '0' + String(+day + 1);
    } else {
        trueDay = String(+day + 1)
    }
    return trueDay + '.' + trueMonth
}