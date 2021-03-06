/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Door extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Door/costumes/costume1.svg", {
        x: 53.929430000000025,
        y: 101.70271999999997
      }),
      new Costume("costume2", "./Door/costumes/costume2.svg", {
        x: 54.5277923863637,
        y: 102.71375363636363
      }),
      new Costume("costume3", "./Door/costumes/costume3.svg", {
        x: 66.4333067723191,
        y: 101.70272
      }),
      new Costume("costume4", "./Door/costumes/costume4.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [
      new Sound("Door", "./Door/sounds/Door.mp3"),
      new Sound(
        "Knocking-on-door-five-knocks",
        "./Door/sounds/Knocking-on-door-five-knocks.mp3"
      ),
      new Sound("Kill", "./Door/sounds/Kill.mp3"),
      new Sound("Footsteps", "./Door/sounds/Footsteps.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Vent" }, this.whenIReceiveVent),
      new Trigger(Trigger.BROADCAST, { name: "Door" }, this.whenIReceiveDoor),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
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
      new Trigger(
        Trigger.BROADCAST,
        { name: "BOSS MODE" },
        this.whenIReceiveBossMode
      )
    ];
  }

  *whenIReceiveVent() {
    this.visible = false;
  }

  *whenIReceiveDoor() {
    this.visible = true;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenthisspriteclicked() {
    yield* this.startSound("Door");
    if (this.costumeNumber == 1) {
      if (this.stage.vars.knocking == "Yes") {
        this.stage.vars.dooropened = "Yes";
        this.costume = "costume3";
        yield* this.wait(2);
        this.moveAhead();
        this.goto(0, 0);
        this.costume = "costume4";
        this.stage.watchers.oxygen.visible = false;
        yield* this.startSound("Kill");
        yield* this.wait(1.15);
        /* TODO: Implement stop all */ null;
      } else {
        this.stage.vars.dooropened = "Yes";
        this.costume = "costume2";
      }
    } else {
      if (this.costumeNumber == 2 || this.costumeNumber == 3) {
        this.stage.vars.dooropened = "No";
        this.costume = "costume1";
      }
    }
  }

  *whenIReceiveEnlargeComms() {
    this.visible = false;
  }

  *whenIReceiveExitFullscreen() {
    if (this.stage.vars.place == "Vent") {
      this.visible = false;
    } else {
      if (this.stage.vars.place == "Door") {
        this.visible = true;
      }
    }
  }

  *whenIReceiveStart() {
    this.visible = false;
    this.size = 100;
    this.goto(190, 25);
    this.stage.vars.knocking = "No";
    this.stage.vars.dooropened = "No";
    this.costume = "costume1";
    while (true) {
      yield* this.wait(5);
      this.stage.vars.knocking = "No";
      yield* this.wait(this.random(5, 30));
      yield* this.playSoundUntilDone("Footsteps");
      yield* this.wait(1);
      this.stage.vars.knocking = "Yes";
      yield* this.startSound("Knocking-on-door-five-knocks");
      for (let i = 0; i < 7; i++) {
        this.size += 10;
        yield* this.wait(0.1);
        this.size += -10;
        yield;
      }
      yield;
    }
  }

  *whenIReceiveBossMode() {
    this.size = 100;
    this.goto(190, 25);
    this.stage.vars.knocking = "No";
    this.stage.vars.dooropened = "No";
    this.costume = "costume1";
    while (true) {
      yield* this.wait(5);
      this.stage.vars.knocking = "No";
      yield* this.wait(this.random(3, 10));
      yield* this.playSoundUntilDone("Footsteps");
      this.stage.vars.knocking = "Yes";
      yield* this.startSound("Knocking-on-door-five-knocks");
      for (let i = 0; i < 7; i++) {
        this.size += 10;
        yield* this.wait(0.1);
        this.size += -10;
        yield;
      }
      yield;
    }
  }
}
