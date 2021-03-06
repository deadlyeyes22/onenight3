/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Clock extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Clock/costumes/costume1.svg", {
        x: 78,
        y: 41.93020833333327
      }),
      new Costume("costume2", "./Clock/costumes/costume2.svg", {
        x: 78,
        y: 41.930372395833274
      }),
      new Costume("costume3", "./Clock/costumes/costume3.svg", {
        x: 78,
        y: 41.93037708333327
      }),
      new Costume("costume4", "./Clock/costumes/costume4.svg", {
        x: 78,
        y: 41.93037708333327
      }),
      new Costume("costume5", "./Clock/costumes/costume5.svg", {
        x: 78,
        y: 41.93037177083326
      }),
      new Costume("costume6", "./Clock/costumes/costume6.svg", {
        x: 78,
        y: 41.93037645833326
      }),
      new Costume("costume7", "./Clock/costumes/costume7.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [];

    this.triggers = [
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
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "BOSS MODE" },
        this.whenIReceiveBossMode
      )
    ];
  }

  *whenIReceiveEnlargeComms() {
    this.visible = false;
  }

  *whenIReceiveExitFullscreen() {
    this.visible = true;
  }

  *whenGreenFlagClicked() {
    while (true) {
      if (this.costumeNumber == 6) {
        this.costume = "costume7";
        this.moveAhead();
        this.goto(0, 0);
        /* TODO: Implement stop all */ null;
      }
      yield;
    }
  }

  *whenIReceiveStart() {
    this.visible = true;
    this.goto(-29, 142);
    this.stage.vars.sec = "";
    this.costume = "costume1";
    while (true) {
      yield* this.wait(1);
      this.stage.vars.sec += 1;
      if (this.stage.vars.sec == 30) {
        this.stage.vars.sec = "";
        this.costumeNumber += 1;
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    this.visible = false;
  }

  *whenIReceiveBossMode() {
    this.visible = true;
    this.goto(-29, 142);
    this.stage.vars.sec = "";
    this.costume = "costume1";
    while (true) {
      yield* this.wait(1);
      this.stage.vars.sec += 1;
      if (this.stage.vars.sec == 30) {
        this.stage.vars.sec = "";
        this.costumeNumber += 1;
      }
      yield;
    }
  }
}
