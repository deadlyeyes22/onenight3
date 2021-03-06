/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class ExitFullscreen extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./ExitFullscreen/costumes/costume1.svg", {
        x: 75,
        y: 21.5
      })
    ];

    this.sounds = [new Sound("pop", "./ExitFullscreen/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Enlarge Comms" },
        this.whenIReceiveEnlargeComms
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(
        Trigger.BROADCAST,
        { name: "BOSS MODE" },
        this.whenIReceiveBossMode
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveEnlargeComms() {
    this.visible = true;
    for (let i = 0; i < 10; i++) {
      this.moveAhead();
      yield;
    }
  }

  *whenthisspriteclicked() {
    this.visible = false;
    this.broadcast("Exit Fullscreen");
  }

  *whenIReceiveStart() {
    this.visible = false;
  }

  *whenIReceiveBossMode() {
    this.visible = false;
  }
}
