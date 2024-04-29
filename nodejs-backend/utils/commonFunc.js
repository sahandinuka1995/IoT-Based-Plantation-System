const {ENV_TYPES} = require("../const/const")

const ParseFloat = (type, value, locationData) => {
    let result = value

    switch (type) {
        case ENV_TYPES.NITROGEN:
            result = normalizeValue(value, 10, 1000)
            break

        case ENV_TYPES.PHOSPHORUS:
            result = normalizeValue(value, 10, 200)
            break

        case ENV_TYPES.POTASSIUM:
            result = normalizeValue(value, 50, 500)
            break

        case ENV_TYPES.HUMIDITY:
            result = normalizeValue(value, 1, 100)
            break

        case ENV_TYPES.TEMPERATURE:
            result = normalizeValue(value, -10, 50)
            break

        case ENV_TYPES.PH:
            result = normalizeValue(value, 3, 10)
            break
    }

    return Number.parseFloat(locationData ? (result + locationData) : result).toFixed(2)
}

const normalizeValue = (value, min, max) => {
    let sum = value

    if (value < min) value += min
    sum = sumDigits(value)
    while (sum >= max) {
        sum = sumDigits(sum);
    }

    return sum
}

function sumDigits(n) {
    let sum = 0;
    while (n > 0) {
        sum += n % 10;
        n = Math.floor(n / 10);
    }
    return sum ?? n;
}

module.exports = {
    ParseFloat
}