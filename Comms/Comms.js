/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Comms extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Comms", "./Comms/costumes/Comms.png", { x: 295, y: 359 }),
      new Costume("Comms2", "./Comms/costumes/Comms2.svg", {
        x: 147.5,
        y: 179.5
      }),
      new Costume("Comms3", "./Comms/costumes/Comms3.svg", {
        x: 147.5,
        y: 179.5
      }),
      new Costume("Comms4", "./Comms/costumes/Comms4.svg", {
        x: 147.5,
        y: 179.5
      }),
      new Costume("Comms5", "./Comms/costumes/Comms5.svg", {
        x: 147.5,
        y: 179.5
      }),
      new Costume("Comms Sabotaged", "./Comms/costumes/Comms Sabotaged.svg", {
        x: 147.5,
        y: 179.5
      })
    ];

    this.sounds = [
      new Sound("Lose", "./Comms/sounds/Lose.mp3"),
      new Sound("Comms Sabotaged", "./Comms/sounds/Comms Sabotaged.mp3")
    ];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Lose" }, this.whenIReceiveLose),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Comms Sabotaged" },
        this.whenIReceiveCommsSabotaged
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Comms Sabotaged" },
        this.whenIReceiveCommsSabotaged2
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
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "BOSS MODE" },
        this.whenIReceiveBossMode
      )
    ];
  }

  *whenIReceiveLose() {
    yield* this.startSound("Lose");
    yield* this.wait(1);
    while (true) {
      this.costume = "Comms";
      yield;
    }
  }

  *whenIReceiveCommsSabotaged() {
    yield* this.startSound("Comms Sabotaged");
    for (let i = 0; i < 100; i++) {
      this.costume = "Comms Sabotaged";
      yield;
    }
    this.stopAllSounds();
  }

  *whenIReceiveCommsSabotaged2() {
    /* TODO: Implement text2speech_speakAndWait */ null;
  }

  *whenIReceiveEnlargeComms() {
    this.size = 100;
    this.moveAhead();
    this.goto(0, 0);
  }

  *whenIReceiveExitFullscreen() {
    this.size = 50;
    this.goto(-168, 90);
    this.costume = "Comms";
  }

  *whenIReceiveStart() {
    this.visible = true;
    this.size = 50;
    this.goto(-168, 90);
    this.costume = "Comms";
    this.stage.vars.onComms = "No";
    while (true) {
      yield* this.wait(this.random(5, 10));
      this.costume = this.random(2, 5);
      this.stage.vars.onComms = "Yes";
      yield* this.wait(this.random(3, 5));
      this.costume = "Comms";
      this.stage.vars.onComms = "No";
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveBossMode() {
    this.visible = true;
    this.size = 50;
    this.goto(-168, 90);
    this.costume = "Comms";
    this.stage.vars.onComms = "No";
    while (true) {
      yield* this.wait(this.random(3, 5));
      this.costume = this.random(2, 5);
      this.stage.vars.onComms = "Yes";
      yield* this.wait(this.random(3, 5));
      this.costume = "Comms";
      this.stage.vars.onComms = "No";
      yield;
    }
  }
}
