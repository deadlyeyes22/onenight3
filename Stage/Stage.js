/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Clear", "./Stage/costumes/Clear.svg", { x: 240, y: 180 }),
      new Costume("Blackout", "./Stage/costumes/Blackout.svg", {
        x: 240,
        y: 180
      }),
      new Costume("Start", "./Stage/costumes/Start.svg", {
        x: 244.5,
        y: 183.19997500000005
      })
    ];

    this.sounds = [
      new Sound("bensound-newdawn", "./Stage/sounds/bensound-newdawn.mp3"),
      new Sound("Disconnect", "./Stage/sounds/Disconnect.wav")
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "BlackoutCheck" },
        this.whenIReceiveBlackoutcheck
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(
        Trigger.BROADCAST,
        { name: "BOSS MODE" },
        this.whenIReceiveBossMode
      )
    ];

    this.vars.vent = "Closed";
    this.vars.onComms = "No";
    this.vars.sec = 16;
    this.vars.maskOn = "No";
    this.vars.place = "Vent";
    this.vars.knocking = "No";
    this.vars.maskcooldown = 0;
    this.vars.oxygen = 26;
    this.vars.dooropened = "No";
    this.vars.death = "No";

    this.watchers.oxygen = new Watcher({
      label: "Oxygen",
      style: "large",
      visible: false,
      value: () => this.vars.oxygen,
      x: 670,
      y: 170
    });
  }

  *whenIReceiveBlackoutcheck() {
    for (let i = 0; i < 10; i++) {
      if (this.vars.maskOn == "No") {
        this.broadcast("eNdGaMe");
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.costume = "Start";
    yield* this.startSound("bensound-newdawn");
    yield* this.wait(313.47);
    yield* this.startSound("bensound-newdawn");
    yield* this.wait(313.47);
    yield* this.startSound("bensound-newdawn");
    yield* this.wait(313.47);
    yield* this.startSound("bensound-newdawn");
    yield* this.wait(313.47);
    yield* this.startSound("bensound-newdawn");
    yield* this.wait(313.47);
    this.broadcast("Relod");
    yield* this.playSoundUntilDone("Disconnect");
    /* TODO: Implement stop all */ null;
  }

  *whenIReceiveStart() {
    this.stopAllSounds();
    this.watchers.oxygen.visible = true;
    this.costume = "Clear";
    while (true) {
      yield* this.wait(this.random(15, 30));
      this.costume = "Blackout";
      /* TODO: Implement text2speech_speakAndWait */ null;
      this.broadcast("BlackoutCheck");
      yield* this.wait(5);
      this.costume = "Clear";
      yield;
    }
  }

  *whenIReceiveBossMode() {
    this.stopAllSounds();
    this.watchers.oxygen.visible = true;
    this.costume = "Clear";
    while (true) {
      yield* this.wait(this.random(5, 15));
      this.costume = "Blackout";
      /* TODO: Implement text2speech_speakAndWait */ null;
      this.broadcast("BlackoutCheck");
      yield* this.wait(5);
      this.costume = "Clear";
      yield;
    }
  }
}
