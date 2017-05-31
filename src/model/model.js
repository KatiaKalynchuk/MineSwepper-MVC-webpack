
let options = {
    width: 10, //ширина поля
    height: 10, //высота поля
    mineCount: 10, //количество мин
    openCount: 0,//количество открытых
    field: [], //поле

    STATUS_WIN: 'win',
    STATUS_LOSE: 'lose',
    STATUS_PLAYING: 'playing',
    statusGame: ''
}


class Model {
    constructor(updateModel, model = {}) {
        this._model = model;
        this.updateModel = updateModel;
        this._callbacks = [];
    }

    get state() {
        return this._model;
    }

    update(action) {
        this._model = updateModel(this._model, action);
        this._callbacks.forEach( (callback) => {
            callback();
        } )
    }

    subscrible(callback) {
        this._callbacks.push(callback);
        return () => {
            this._callbacks = this._callbacks.filter( cb => cb !== callback);
        }
    }

}

function updateModel(model, action) {
    let newState = Object.assign({}, model);
    switch (action.type) {
        case 'FIELD':
            return Object.assign({}, model, {
                field: [
                ...action.field
                ]
            });
        case 'IS_OPEN':
            newState.field[action.x][action.y].isOpen = action.isOpen;
            return newState;
        case 'MINE_AROUND':
            newState.field[action.x][action.y].mineAround = action.mineAround;
            return newState;
        case 'IS_MINE':
            newState.field[action.x][action.y].isMine = action.isMine;
            return newState;
        case 'OPEN_COUNT':
            newState.openCount = action.openCount;
            return newState;
        case 'DIFF':
            newState.width = action.width;
            newState.height = action.height;
            newState.mineCount = action.mineCount;
            return newState;
        case 'COUNT':
             newState.openCount += action.count;
             return newState;
        default:
            return model;
    }
}

let GameModel = new Model(updateModel, options);
export default GameModel;

GameModel.subscrible(()=>{

})
