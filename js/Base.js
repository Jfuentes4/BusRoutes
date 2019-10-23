class Base {
    constructor (name, time){
        this._name = name;
        this._time = time;
    }

    get name () {
        return this._name;
    };

    get time () {
        return Number(this._time);
    };

    toString () {
        return 'Base: ' + this._name + ', \nTiempo: ' + this._time;
    }
}

export default Base;