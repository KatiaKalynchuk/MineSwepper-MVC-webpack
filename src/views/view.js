import GameModel from '../model/model.js';
import controller from '../controllers/controller.js';
import { IS_OPEN, OPEN_COUNT, DIFF, COUNT } from '../actions/actions.js';

export default class GameView {
  constructor() {
    this.table = null;
    this.field = document.getElementById('field');
  }

  init() {
    controller.start();// генерация нового поля
    this.btnStart = document.querySelector('.start');
    this.btnStart.addEventListener('click', this.init.bind(this));

    this.btnDiff = document.getElementById('diff');
    this.btnDiff.addEventListener('click', (e)=>{
      controller.setDifficult(e, this);
    });

    this.div = document.querySelector('.field'); // получаем блок для вывода
    this.drawField();//вызываем отрисовку поля
    let self = this; //сохраняем this
    this.div.addEventListener('click', function (e) {
      if (e.target.matches('td') && !(e.target.matches('.lock'))) self.open(e);
    })
    this.div.addEventListener('contextmenu', self.lock);
  }

  drawField() { //отрисовка поля
    this.div = document.querySelector('.field');
    this.div.innerHTML = ''; //очистка поля
    let table = document.createElement('table'); //создание основной таблици
    this.table = table; //сохранение таблицы в поле класса
    for (let i = 0; i < GameModel.state.height; i++) { //цикл создания строк
      let tr = document.createElement('tr'); //создание строки
      for (let j = 0; j < GameModel.state.width; j++) { //цикл создания ячеек
        let td = document.createElement('td'); //создание ячейки
        tr.appendChild(td); //вставка ячейки в строку
      }
      table.appendChild(tr); // вставка строки в таблицу
    }
    this.div.appendChild(table); //вставка таблици в основной блок
  }

  open(e) { // обработчик клика по ячейке
    let x = e.target.cellIndex; //получение номера столбца
    let y = e.target.parentNode.rowIndex; //получение номера строки
    this.recurceOpen(x,y); //открываем ячейку
  }

  recurceOpen(x,y) { // ф-ия рекурсивного открытия ячеек
        let td = this.table.rows[y].children[x]; //получаем ячейку по координатам
        if (GameModel.state.field[x][y].isOpen) return; // если уже открывали - выходим
            if (GameModel.state.field[x][y].isMine){ // если попали на мину
              alert('Game Over');
              controller.start();
              this.drawField();
            } else { // если мины нет:
                td.innerHTML = GameModel.state.field[x][y].mineAround; //записываем в ячейку таблици к-во мин рядом
                IS_OPEN.y = y;
                IS_OPEN.x = x;

                GameModel.update(IS_OPEN);// ставим метку, что ячейка открыта
                td.classList.add('open'); //добавляем класс открытой ячейки
                // инкрементируем счетчик открытых
                GameModel.update(COUNT);
                if (GameModel.state.width * GameModel.state.height - GameModel.state.mineCount == GameModel.state.openCount){ // если ячейка последняя
                  alert('You win!'); // победа
                  controller.start();
                  this.drawField();
            }

            if (GameModel.state.field[x][y].mineAround == 0){ //если рядом мин нет, то
                let xStart = x > 0 ? x-1 : x;
                let yStart = y > 0 ? y-1 : y;
                let xEnd = x < GameModel.state.width-1 ? x+1 : x;
                let yEnd = y < GameModel.state.height-1 ? y+1 : y;
                for (let i = xStart; i <= xEnd; i++){ //пробегаемся по всем соседним ячейкам
                    for (let j = yStart; j <= yEnd; j++){
                        this.recurceOpen(i,j); // и открываем их
                    }
                }
            }
        }
    }

  lock(e, coordinates) {
      let x = e.target.cellIndex;
      let y = e.target.parentNode.rowIndex;
      if (GameModel.state.field[x][y].isOpen) return;
      e.target.classList.toggle('lock');
      e.preventDefault();
    }

}
