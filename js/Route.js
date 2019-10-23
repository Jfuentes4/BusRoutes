import Base from './Base.js';

class Route {
    constructor () {
        this._origin = null;
    }

    addBase = (baseData) => {
        let success = false;
        if (!this._findBase(baseData.name)) {
            this._addBase(baseData);
            success = true;
        } else {
            window.alert('La base Ingresada ya se encuentra registrada');
        }

        return success;
    };

    insertAfter = (basePrev, newBaseData) => {
        let success = false;
        if (!this._findBase(newBaseData.name)) {
            if (this._findBase((basePrev))) {
                if (this._insertAfter(newBaseData, basePrev))
                    success = true;
            } else {
                window.alert('La base anterior no se encuentra en esta ruta.\nLa Base no fue Agregada.');
            }
        } else {
            window.alert('La base Ingresada ya se encuentra registrada');
        }

        return success;
    };

    search = (strSearched) => {
        let result = this._findBase(strSearched);

        if (result){
            window.alert('' + result.data.toString());
        } else {
            window.alert('La base solicitada no se encuentra en esta ruta');
        }
    };

    deleteBase = (baseName) => {
        let success = false;
        if (this._remove(baseName)) {
            window.alert('La base a sido removida de la ruta exitosamnete');
            success = true;
        } else {
            window.alert('La base seleccionada no se encuentra en esta ruta');
        }

        return success;
    };

    basesAsString = () => {
        let strBases = 'Bases Actualmente Registradas en esta Ruta:<br /><br />';
        let current = this._origin;
        do {
            strBases += current.data.toString() + '<br />';
            current = current.next;
        } while (current !== this._origin);

        return strBases;
    };

    generateRoute = (startBase, startTime, endTime) => {
        let current = this._origin;
        let difference = this._getDifferenceBetweenTimes(startTime, endTime);
        let strRoute = 'Ruta Actual de ' + this._convertTo12HoursFormat(startTime) + ' a ' + this._convertTo12HoursFormat(endTime) + '<br /><br />';

        while (current.data.name !== startBase) {
            current = current.next;
        }
        do {
            strRoute += this._convertTo12HoursFormat(startTime) + ' ' + current.data.name + '<br />';
            startTime = this._timePlusMinutes(startTime, current.data.time);
            difference -= current.data.time;
            current = current.next;
        } while (difference > 0);

        return strRoute;
    };

    _getDifferenceBetweenTimes = (time1, time2) => {
        let hour1 = Number((time1.split(':'))[0]);
        let minutes1 = (hour1 * 60) + Number((time1.split(':'))[1]);
        let hour2 = Number((time2.split(':'))[0]);
        let minutes2 = (hour2 * 60) + Number((time2.split(':'))[1]);

        let difference = minutes2 > minutes1 ? ((24 * 60) - minutes1) - minutes2 : ((24 * 60) - minutes1) + minutes2;

        console.log(difference);
        return difference;
    };

    _timePlusMinutes = (time, minutesAded) => {
        let hour = Number((time.split(':'))[0]);
        let minutes = Number((time.split(':'))[1]);

        let newHour = Math.floor(minutesAded / 60);
        hour += newHour - (Math.floor(newHour / 24) * 24);
        minutes += minutesAded - (newHour * 60);

        if (minutes > 59) {
            minutes -= 60;
            hour++;
        }
        if (hour > 23) {
            hour -= 24;
        }
        if (minutes < 10) {
            return hour + ':0' + minutes;
        }

        return hour + ':' + minutes;
    };

    _convertTo12HoursFormat = (time) => {
        let hour = Number((time.split(':'))[0]);
        let minutes = Number((time.split(':'))[1]);
        let ampm;

        if (hour > 12) {
            hour -= 12;
            ampm = 'PM';
        } else {
            ampm = 'AM';
        }

        if (minutes < 10) {
            return hour + ':0' + minutes + ' ' + ampm;
        }

        return hour + ':' + minutes + ' ' + ampm;
    };

    _addBase = (baseData) => {
        let success = false;
        if (this._origin !== null) {
            let current = this._origin;
            let temp = {prev: current.prev, data: new Base(baseData.name, baseData.time), next: current};
            current.prev = temp;
            current.prev.prev.next = temp;
            success = true;
        } else {
            this._origin = {prev: this._origin, data: new Base(baseData.name, baseData.time), next: this._origin,};
            this._origin.next = this._origin;
            this._origin.prev = this._origin;
            success = true;
        }
        console.log(this._origin);
        return success;
    };

    _insertAfter = (baseData, basePrev) => {
        let current = this._origin;
        while (current.data.name !== basePrev) {
            current = current.next;
        }
        let temp = {prev: current, data: new Base(baseData.name, baseData.time), next: current.next};
        current.next = temp;
        current.next.next.prev = temp;

        return true;
    };

    _remove = (baseName) => {
        let base = this._findBase(baseName), succes;
        if(base) {
            base = base.prev;
            base.next = base.next.next;
            base.next.prev = base;
            succes = true;
        } else {
            succes = false;
        }
        return succes;
    };

    _findBase = (strSearched) => {
        let current = this._origin, found = false;
        if (current === null) {
            return found;
        }
        console.log(current.data.name);
        do {
            if (current.data.name === strSearched){
                found = current;
            } else {
                current = current.next;
            }
        } while (!found && current !== this._origin);

        return found;
    };
}

export default Route;