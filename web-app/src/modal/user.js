class User {
    constructor() {
        this._id = ""
        this._name = ""
        this._role = ""
        this._username = ""
        this._password = ""
    }

    set id(val) {
        this._id = val
    }

    get id() {
        return this._id
    }

    set name(val) {
        this._name = val
    }

    get name() {
        return this._name
    }

    set role(val) {
        this._role = val
    }

    get role() {
        return this._role
    }

    set username(val) {
        this._username = val
    }

    get username() {
        return this._username
    }

    set password(val) {
        this._password = val
    }

    get password() {
        return this._password
    }
}

export default User