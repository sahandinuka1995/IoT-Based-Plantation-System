class EnvData {
    constructor() {
        this._n = 0
        this._p = 0
        this._k = 0
        this._temperature = 0
        this._humidity = 0
        this._ph = 0
        this._rainfall = 0
    }

    set n(val) {
        this._n = val
    }

    get n() {
        return this._n
    }

    set p(val) {
        this._p = val
    }

    get p() {
        return this._p
    }

    set k(val) {
        this._k = val
    }

    get k() {
        return this._k
    }

    set temperature(val) {
        this._temperature = val
    }

    get temperature() {
        return this._temperature
    }

    set humidity(val) {
        this._humidity = val
    }

    get humidity() {
        return this._humidity
    }

    set ph(val) {
        this._ph = val
    }

    get ph() {
        return this._ph
    }

    set rainfall(val) {
        this._rainfall = val
    }

    get rainfall() {
        return this._rainfall
    }

    set date(val) {
        this._date = val
    }

    get date() {
        return this._date
    }
}

export default EnvData
