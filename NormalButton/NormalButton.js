/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class NormalButton extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./NormalButton/costumes/costume1.svg", {
        x: 103.00000000000003,
        y: 33.72888576763489
      })
    ];

    this.sounds = [new Sound("pop", "./NormalButton/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "BOSS MODE" },
        this.whenIReceiveBossMode
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    while (true) {
      if (this.touching("mouse")) {
        this.size = 110;
        this.effects.brightness = 30;
      } else {
        this.size = 100;
        this.effects.brightness = 0;
      }
      yield;
    }
  }

  *whenthisspriteclicked() {
    this.visible = false;
    this.broadcast("Start");
  }

  *whenIReceiveBossMode() {
    this.visible = false;
  }
}
