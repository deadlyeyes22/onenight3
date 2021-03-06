/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Button2door extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Button2door/costumes/costume1.svg", {
        x: 24.93809221026433,
        y: 47.404178165572006
      }),
      new Costume("costume2", "./Button2door/costumes/costume2.svg", {
        x: 25.75003395709433,
        y: 47.404176331144015
      })
    ];

    this.sounds = [new Sound("pop", "./Button2door/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
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
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "BOSS MODE" },
        this.whenIReceiveBossMode
      )
    ];
  }

  *whenthisspriteclicked() {
    if (this.costumeNumber == 1) {
      this.broadcast("Door");
      this.stage.vars.place = "Door";
      this.costumeNumber += 1;
    } else {
      if (this.costumeNumber == 2) {
        this.broadcast("Vent");
        this.stage.vars.place = "Vent";
        this.costumeNumber += 1;
      }
    }
  }

  *whenIReceiveEnlargeComms() {
    this.visible = false;
  }

  *whenIReceiveExitFullscreen() {
    this.visible = true;
  }

  *whenIReceiveStart() {
    this.visible = true;
    this.size = 100;
    this.effects.clear();
    this.stage.vars.place = "Vent";
    this.goto(-208, -128);
    this.costume = "costume1";
    while (true) {
      if (this.touching("mouse")) {
        this.size = 110;
        this.effects.brightness = 40;
      } else {
        this.size = 100;
        this.effects.brightness = 0;
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveBossMode() {
    this.visible = true;
    this.size = 100;
    this.effects.clear();
    this.stage.vars.place = "Vent";
    this.goto(-208, -128);
    this.costume = "costume1";
    while (true) {
      if (this.touching("mouse")) {
        this.size = 110;
        this.effects.brightness = 40;
      } else {
        this.size = 100;
        this.effects.brightness = 0;
      }
      yield;
    }
  }
}
