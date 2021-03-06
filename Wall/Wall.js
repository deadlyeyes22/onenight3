/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Wall extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Wall/costumes/costume1.svg", {
        x: 66.5,
        y: -69.00000000000009
      }),
      new Costume("costume2", "./Wall/costumes/costume2.svg", {
        x: 66.5,
        y: -69.00000000000009
      })
    ];

    this.sounds = [new Sound("pop", "./Wall/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Enlarge Comms" },
        this.whenIReceiveEnlargeComms
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Exit Fullscreen" },
        this.whenIReceiveExitFullscreen
      ),
      new Trigger(Trigger.BROADCAST, { name: "Door" }, this.whenIReceiveDoor),
      new Trigger(Trigger.BROADCAST, { name: "Vent" }, this.whenIReceiveVent),
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
    for (let i = 0; i < 2; i++) {
      this.moveBehind();
      yield;
    }
  }

  *whenIReceiveEnlargeComms() {
    this.visible = false;
  }

  *whenIReceiveExitFullscreen() {
    if (this.stage.vars.place == "Vent") {
      this.visible = true;
    } else {
      if (this.stage.vars.place == "Door") {
        this.visible = false;
      }
    }
  }

  *whenIReceiveDoor() {
    this.visible = false;
  }

  *whenIReceiveVent() {
    this.visible = true;
  }

  *whenIReceiveStart() {
    this.visible = true;
    this.goto(143, 94);
  }

  *whenIReceiveBossMode() {
    this.visible = true;
    this.goto(143, 94);
  }
}
