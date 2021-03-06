/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Vent extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Vent/costumes/costume1.svg", {
        x: 79.5,
        y: 62.5
      })
    ];

    this.sounds = [new Sound("pop", "./Vent/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Open Vent" },
        this.whenIReceiveOpenVent
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Close Vent" },
        this.whenIReceiveCloseVent
      ),
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
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(
        Trigger.BROADCAST,
        { name: "BOSS MODE" },
        this.whenIReceiveBossMode
      )
    ];
  }

  *whenIReceiveOpenVent() {
    for (let i = 0; i < 10; i++) {
      this.y += 10;
      yield;
    }
  }

  *whenIReceiveCloseVent() {
    this.broadcast("Oxygen");
    for (let i = 0; i < 10; i++) {
      this.y += -10;
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

  *whenGreenFlagClicked() {
    this.visible = false;
    this.moveBehind();
  }

  *whenIReceiveStart() {
    this.visible = true;
    this.goto(150, 0);
  }

  *whenIReceiveBossMode() {
    this.visible = true;
    this.goto(150, 0);
  }
}
