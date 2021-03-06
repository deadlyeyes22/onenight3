/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class VentDeadly extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Deadly", "./VentDeadly/costumes/Deadly.svg", {
        x: 64,
        y: 165.41342163085938
      }),
      new Costume("Warning", "./VentDeadly/costumes/Warning.png", {
        x: 480,
        y: 360
      }),
      new Costume("Warning2", "./VentDeadly/costumes/Warning2.png", {
        x: 480,
        y: 360
      }),
      new Costume("Warning3", "./VentDeadly/costumes/Warning3.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [
      new Sound("Lose", "./VentDeadly/sounds/Lose.mp3"),
      new Sound("Kill", "./VentDeadly/sounds/Kill.mp3")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "eNdGaMe" },
        this.whenIReceiveEndgame
      ),
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(Trigger.BROADCAST, { name: "-_-" }, this.whenIReceive)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveEndgame() {
    this.visible = true;
    this.stage.watchers.oxygen.visible = false;
    this.goto(0, 0);
    this.moveAhead();
    this.costume = "Warning2";
    yield* this.startSound("Kill");
    yield* this.wait(1.15);
    /* TODO: Implement stop all */ null;
  }

  *whenIReceiveStart() {
    this.moveAhead();
    this.costume = "Deadly";
    while (true) {
      if (this.stage.vars.onComms == "Yes" && this.stage.vars.vent == "Open") {
        this.visible = true;
        this.broadcast("Lose");
        for (let i = 0; i < 100; i++) {
          yield* this.glide(0, this.random(1, 5), this.random(-1, -5));
          yield;
        }
        this.stage.watchers.oxygen.visible = false;
        this.goto(0, 0);
        this.moveAhead();
        this.costume = "Warning";
        /* TODO: Implement stop all */ null;
      }
      yield;
    }
  }

  *whenIReceive() {
    this.moveAhead();
    this.costume = "Warning3";
    /* TODO: Implement stop all */ null;
  }
}
