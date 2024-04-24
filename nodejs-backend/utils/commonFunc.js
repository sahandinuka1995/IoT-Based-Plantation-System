const roundValues = (value) => {
    let result = value
    if (value > 1000) result = value / 1000
    if (value > 100) result = value / 100

    return Number.parseFloat(result).toFixed(2)
}

module.exports = {
    roundValues
}