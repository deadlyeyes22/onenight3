/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Text extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Text/costumes/costume1.svg", {
        x: 141.761479767119,
        y: 29.571011480116454
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
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
      yield* this.glide(2, -366, 150);
      this.goto(366, 150);
      yield* this.glide(2, 0, 150);
      yield* this.wait(3);
      yield;
    }
  }

  *whenIReceiveStart() {
    this.visible = false;
  }

  *whenIReceiveBossMode() {
    this.visible = false;
  }
}
