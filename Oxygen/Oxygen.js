/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Oxygen extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Oxygen/costumes/costume1.svg", {
        x: 67.00059706119785,
        y: 25.722501518747578
      })
    ];

    this.sounds = [new Sound("pop", "./Oxygen/sounds/pop.wav")];

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
    this.stage.watchers.oxygen.visible = false;
  }

  *whenIReceiveEnlargeComms() {
    this.visible = false;
    this.stage.watchers.oxygen.visible = false;
  }

  *whenIReceiveExitFullscreen() {
    this.visible = true;
    this.stage.watchers.oxygen.visible = true;
  }

  *whenIReceiveStart() {
    this.visible = true;
    this.goto(116, 159);
    this.stage.watchers.oxygen.visible = true;
    this.stage.vars.oxygen = 30;
  }

  *whenIReceiveBossMode() {
    this.visible = true;
    this.goto(116, 159);
    this.stage.watchers.oxygen.visible = true;
    this.stage.vars.oxygen = 20;
  }
}
