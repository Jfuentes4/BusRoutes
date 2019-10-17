class Base {
    constructor (name, time){
        this._name = name;
        this._time = time;
    }

    get name () {
        return this._name;
    };

    get time () {
        return this._time;
    };
}