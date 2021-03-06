/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Ventbutton extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Button1", "./Ventbutton/costumes/Button1.svg", {
        x: 24.500000000000057,
        y: 24.5
      }),
      new Costume("Button2", "./Ventbutton/costumes/Button2.svg", {
        x: 24.500000000000057,
        y: 24.5
      })
    ];

    this.sounds = [new Sound("vent", "./Ventbutton/sounds/vent.wav")];

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
      new Trigger(Trigger.BROADCAST, { name: "Door" }, this.whenIReceiveDoor),
      new Trigger(Trigger.BROADCAST, { name: "Vent" }, this.whenIReceiveVent),
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start" },
        this.whenIReceiveStart2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "BOSS MODE" },
        this.whenIReceiveBossMode
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "BOSS MODE" },
        this.whenIReceiveBossMode2
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenthisspriteclicked() {
    if (this.stage.vars.vent == "Closed") {
      yield* this.startSound("vent");
      this.costume = "Button1";
      this.stage.vars.vent = "Open";
      this.broadcast("Open Vent");
    } else {
      if (this.stage.vars.vent == "Open") {
        yield* this.startSound("vent");
        this.costume = "Button2";
        this.stage.vars.vent = "Closed";
        this.broadcast("Close Vent");
      }
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
    this.costume = "Button2";
    this.goto(43, 47);
    while (true) {
      if (this.stage.vars.oxygen < 1 || this.stage.vars.oxygen == 0) {
        this.broadcast("-_-");
      }
      yield;
    }
  }

  *whenIReceiveStart2() {
    this.visible = true;
    this.goto(43, 47);
    this.stage.vars.oxygen = 30;
    this.stage.vars.vent = "Closed";
    this.stage.watchers.oxygen.visible = true;
    this.costume = "Button2";
    while (true) {
      if (
        (this.stage.vars.vent == "Open" ||
          this.stage.vars.dooropened == "Yes") &&
        this.stage.vars.oxygen < 30
      ) {
        yield* this.wait(1);
        this.stage.vars.oxygen += 1;
      } else {
        yield* this.wait(3);
        this.stage.vars.oxygen += -1;
      }
      yield;
    }
  }

  *whenIReceiveBossMode() {
    this.visible = true;
    this.goto(43, 47);
    this.stage.vars.oxygen = 20;
    this.stage.watchers.oxygen.visible = true;
    this.stage.vars.vent = "Closed";
    this.costume = "Button2";
    while (true) {
      if (
        (this.stage.vars.vent == "Open" ||
          this.stage.vars.dooropened == "Yes") &&
        this.stage.vars.oxygen < 30
      ) {
        yield* this.wait(0.5);
        this.stage.vars.oxygen += 1;
      } else {
        yield* this.wait(0.5);
        this.stage.vars.oxygen += -1;
      }
      yield;
    }
  }

  *whenIReceiveBossMode2() {
    this.visible = true;
    this.costume = "Button2";
    this.goto(43, 47);
    while (true) {
      if (this.stage.vars.oxygen < 1 || this.stage.vars.oxygen == 0) {
        this.visible = true;
        this.moveAhead();
        this.goto(0, 0);
        this.costume = "Button3";
        this.stage.watchers.oxygen.visible = false;
        /* TODO: Implement stop all */ null;
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.stage.vars.death = "No";
    for (let i = 0; i < 10; i++) {
      this.costume = "Button2";
      yield;
    }
  }
}
