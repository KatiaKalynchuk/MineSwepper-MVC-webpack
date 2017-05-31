import GameModel from '../model/model.js';
import controller from '../controllers/controller.js';
import { FIELD_ACTION, IS_OPEN, MINE_AROUND, IS_MINE, OPEN_COUNT, DIFF } from '../actions/actions.js';

export default class ConsoleView {

  constructor(view) {
    this.view = view;
  }


  showHelp() {
    console.log('game');
    console.log('   .setDiff(\'easy\'/\'normal\'/\'hard\') - set difficult: easy 10*10, normal 15*15, hard 15*25');
    console.log('   .setDiff start/reload game!');
    console.log('   .start() - start/reload game');
    console.log('   .resign() - resign and lose');
    console.log('   .open(x, y) - open cell on x, y');
    console.log('   .setFlag(x, y) - set flag on x, y');
    console.log('   .removeFlag(x, y) - remove flag from x, y');
    console.log('   .cancel() - cancel last action');
    console.log('   .show() - show field');
  }

  show() {
  }

  open(x, y){
    this.view.recurceOpen(x,y);

  }

  setDifficult(difficultType) {
    let type = difficultType || 'easy';
    controller.setDifficult(null, this.view, type);
  }
}
