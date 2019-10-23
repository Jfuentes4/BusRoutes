import Route from './Route.js';

class Main {
    constructor () {
        this._route = new Route();
        document.getElementById('addBase').addEventListener('click', this._addBase);
        document.getElementById('btnSearch').addEventListener('click', this._searchBase);
        document.getElementById('btnDelete').addEventListener('click', this._deleteBase);
        document.getElementById('btnPrint').addEventListener('click', this._print);
        document.getElementById('btnGenerateRoute').addEventListener('click', this._generateRoute);
    }

    _addBase = () => {
        let base = this._getData();
        if (base.basePrev !== '') {
            this._insertBaseAfter(base.basePrev, base);
        } else {
            this._insertBaseAtEnd(base);
        }
    };

    _insertBaseAtEnd = (base) => {
        if (this._route.addBase(base)) {
            let option = document.createElement('option');
            option.value = base.name;
            option.textContent = base.name;
            document.getElementById('startBase').appendChild(option);
        }
    };

    _insertBaseAfter = (basePrev, newBase) => {
        if (this._route.insertAfter(basePrev, newBase)) {
            let option = document.createElement('option');
            option.value = newBase.name;
            option.textContent = newBase.name;
            let select = document.getElementById('baseInicio');
            for (let i = 0; i < select.length; i++) {
                if (select.options[i].value === basePrev) {
                    select.options.splice(i+1, 0, option);
                }
            }
            window.alert('La base se a añadido correctamente.');
        }
    };

    _searchBase = () => {
        let baseName = document.getElementById('strName').value;
        this._route.search(baseName);
    };

    _deleteBase = () => {
        let baseName = document.getElementById('strName').value;
        if (this._route.deleteBase(baseName)) {
            let select = document.getElementById('baseInicio');
            for (let i = 0; i < select.length; i++) {
                if (select.options[i].value === baseName)
                    select.options[i].remove();
            }
        }
    };

    _print = () => {
        let strBases = this._route.basesAsString();
        if (strBases) {
            document.getElementById('report').innerHTML = strBases;
        }
    };

    _generateRoute = () => {
        let startBase = document.getElementById('startBase').value;
        let startTime = document.getElementById('startTime').value;
        let endTime = document.getElementById('endTime').value;

        document.getElementById('report'). innerHTML = this._route.generateRoute(startBase, startTime, endTime);
    };

    _getData = () => {
        let name = document.getElementById('name').value;
        let time = Number(document.getElementById('time').value);
        let basePrev = document.getElementById('basePrev').value;

        return {
            name,
            time,
            basePrev
        }
    };
}

let main = new Main();