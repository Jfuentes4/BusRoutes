class Main {
    constructor () {
        document.getElementById('addBase').addEventListener('click', this._addBase);
        document.getElementById('btnSearch').addEventListener('click', this._searchBase);
        document.getElementById('btnDelete').addEventListener('click', this._deleteBase);
        document.getElementById('btnPrint').addEventListener('click', this._print);
    }

    _addBase = () => {
        let base = this._getData();
    };

    _searchBase = () => {

    };

    _deleteBase = () => {

    };

    _print = () => {

    };

    _getData = () => {
        let name = document.getElementById('name').value;
        let time = Number(document.getElementById('time').value);
        let basePrev = document.getElementById('basePrev').value;

        let objBase = {
            name,
            time,
            basePrev
        }

        return objBase;
    };
}

let main = new Main();