/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Commshacker extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Warning", "./Commshacker/costumes/Warning.png", {
        x: 0,
        y: 0
      })
    ];

    this.sounds = [new Sound("Lose", "./Commshacker/sounds/Lose.mp3")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveStart() {
    this.moveAhead();
    this.costume = "Deadly";
    while (true) {
      yield* this.wait(this.random(10, 20));
      yield* this.broadcastAndWait("Comms Sabotaged");
      yield;
    }
  }
}
