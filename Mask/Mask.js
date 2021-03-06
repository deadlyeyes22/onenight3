/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Mask extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("InsideMask", "./Mask/costumes/InsideMask.png", {
        x: 480,
        y: 360
      }),
      new Costume("Mask2", "./Mask/costumes/Mask2.svg", {
        x: 46.63539683736269,
        y: 47.464614175915784
      }),
      new Costume("Mask3", "./Mask/costumes/Mask3.svg", {
        x: 46.63539427862145,
        y: 47.46462253293345
      }),
      new Costume("Mask4", "./Mask/costumes/Mask4.svg", {
        x: 46.63540171988021,
        y: 47.46462088995111
      }),
      new Costume("Mask5", "./Mask/costumes/Mask5.svg", {
        x: 46.63539916113899,
        y: 47.464619246968766
      }),
      new Costume("Mask6", "./Mask/costumes/Mask6.svg", {
        x: 46.635396602397776,
        y: 47.464617603986426
      }),
      new Costume("Mask", "./Mask/costumes/Mask.svg", {
        x: 46.635399396103935,
        y: 47.46462581889813
      })
    ];

    this.sounds = [new Sound("pop", "./Mask/sounds/pop.wav")];

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
      new Trigger(
        Trigger.BROADCAST,
        { name: "MaskCooldown" },
        this.whenIReceiveMaskcooldown
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
    if (this.stage.vars.maskcooldown == 0) {
      if (this.stage.vars.maskOn == "No") {
        this.goto(0, 0);
        this.moveAhead();
        this.stage.watchers.oxygen.visible = false;
        this.stage.vars.maskOn = "Yes";
        this.costume = "InsideMask";
        yield* this.wait(6);
        this.goto(158, -130);
        this.costume = "Mask";
        this.stage.vars.maskOn = "No";
        this.broadcast("MaskCooldown");
      } else {
        if (this.stage.vars.maskOn == "Yes") {
          this.moveAhead();
          this.goto(158, -130);
          this.stage.watchers.oxygen.visible = true;
          this.stage.vars.maskOn = "No";
          this.costume = "Mask";
          this.broadcast("MaskCooldown");
        }
      }
    } else {
      null;
    }
  }

  *whenIReceiveEnlargeComms() {
    this.visible = false;
  }

  *whenIReceiveExitFullscreen() {
    this.visible = true;
  }

  *whenIReceiveMaskcooldown() {
    this.stage.vars.maskcooldown = 5;
    this.costume = "Mask2";
    yield* this.wait(1);
    this.stage.vars.maskcooldown = 4;
    this.costume = "Mask3";
    yield* this.wait(1);
    this.stage.vars.maskcooldown = 3;
    this.costume = "Mask4";
    yield* this.wait(1);
    this.stage.vars.maskcooldown = 2;
    this.costume = "Mask5";
    yield* this.wait(1);
    this.stage.vars.maskcooldown = 1;
    this.costume = "Mask6";
    yield* this.wait(1);
    this.stage.vars.maskcooldown = 0;
    this.costume = "Mask";
  }

  *whenIReceiveStart() {
    this.visible = true;
    this.goto(158, -130);
    this.costume = "Mask";
    this.stage.vars.maskOn = "No";
    this.stage.vars.maskcooldown = 0;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveBossMode() {
    this.visible = true;
    this.goto(158, -130);
    this.costume = "Mask";
    this.stage.vars.maskOn = "No";
    this.stage.vars.maskcooldown = 0;
  }
}
