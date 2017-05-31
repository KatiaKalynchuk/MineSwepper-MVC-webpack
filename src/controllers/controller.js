import GameModel from '../model/model.js';
import ViewModel from '../views/view.js';
import { FIELD_ACTION, IS_OPEN, MINE_AROUND, IS_MINE, OPEN_COUNT, DIFF } from '../actions/actions.js';

class Point {
  constructor() {
        this.isMine = false; //стоит ли мина
        this.mineAround = 0; //мин рядом
        this.isOpen = false; //открыта ли
    }
}

class GameController {

  fillField() { //метод заполнения поля
    let res = [];
      for (let i = 0; i < GameModel.state.width; i++) { //проходим по колонкам
          let tmp = []; //создаем колонку
          for (let j = 0; j < GameModel.state.height; j++) { //заполняем ее ячейками
            tmp.push(new Point());
          }

         res.push(tmp); //вставляем колонку в поле
      }
      FIELD_ACTION.field = res;
      GameModel.update(FIELD_ACTION);
        // цикл расстановки мин:
      let arrField = GameModel.state.field;
      for (let i = 0; i < GameModel.state.mineCount;) { // пока не все мины расставлены
          let x = parseInt(Math.random() * GameModel.state.width - 0.0001); //генерируем координату Х
          let y = parseInt(Math.random() * GameModel.state.height - 0.0001); //генерируем координату У
           if (!(GameModel.state.field[x][y].isMine)) { // если сдесь еще нет мины
             IS_MINE.y = y;
             IS_MINE.x = x;
             GameModel.update(IS_MINE);
              i++;
           }
      }
  }
  startMineCounter() { //пробегает по всем ячейкам и вызывает расчет кол-ва мин рядом
      for (let i = 0; i < GameModel.state.width; i++) {
          for (let j = 0; j < GameModel.state.height; j++) {
              this.mineAroundCounter(i, j);
          }
      }
  }

  mineAroundCounter(x, y) { // считает количество мин вокруг ячейки и записывает его в нее
    let xStart = x > 0 ? x-1 : x;
    let yStart = y > 0 ? y-1 : y;
    let xEnd = x < GameModel.state.width-1 ? x+1 : x;
    let yEnd = y < GameModel.state.height-1 ? y+1 : y;
    let count = 0;
    for (let i = xStart; i <= xEnd; i++){
        for (let j = yStart; j <= yEnd; j++){
            if (GameModel.state.field[i][j].isMine && !(x == i && y == j)) count++;

        }
    }
    MINE_AROUND.x = x;
    MINE_AROUND.y = y;
    MINE_AROUND.mineAround = count;
    GameModel.update(MINE_AROUND);
  }

   setDifficult(e, veiw, difficultType) {
    let type = 'easy';
    if (!e){
      type = difficultType
    }else{
      type = e.target.innerHTML;
    }

    let drawField = veiw.drawField.bind(veiw);
    switch(type) {
      case 'easy':
        DIFF.width = 10;
        DIFF.height = 10;
        DIFF.mineCount = 10;
        GameModel.update(DIFF);
        this.start();
        drawField();
        break;

      case 'normal':
        DIFF.width = 15;
        DIFF.height = 15;
        DIFF.mineCount = 20;
        GameModel.update(DIFF);
        this.start();
        drawField();
        break;

      case 'hard':
        DIFF.width = 25;
        DIFF.height = 20;
        DIFF.mineCount = 35;
        GameModel.update(DIFF);
        this.start();
        drawField();
        break;
    }
  }

  start() { // "новая игра" - пересоздает поле
    GameModel.update(OPEN_COUNT);
    this.fillField();
    this.startMineCounter();
  }
}

let controller = new GameController();
export default controller;

