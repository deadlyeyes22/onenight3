import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Vent from "./Vent/Vent.js";
import Wall from "./Wall/Wall.js";
import Ventbutton from "./Ventbutton/Ventbutton.js";
import Comms from "./Comms/Comms.js";
import VentDeadly from "./VentDeadly/VentDeadly.js";
import Commshacker from "./Commshacker/Commshacker.js";
import Clock from "./Clock/Clock.js";
import CommsButton from "./CommsButton/CommsButton.js";
import ExitFullscreen from "./ExitFullscreen/ExitFullscreen.js";
import Mask from "./Mask/Mask.js";
import Button2door from "./Button2door/Button2door.js";
import Door from "./Door/Door.js";
import Oxygen from "./Oxygen/Oxygen.js";
import BossButton from "./BossButton/BossButton.js";
import NormalButton from "./NormalButton/NormalButton.js";
import Text from "./Text/Text.js";
import Relod from "./Relod/Relod.js";
import Thumb from "./Thumb/Thumb.js";

const stage = new Stage({ costumeNumber: 3 });

const sprites = {
  Vent: new Vent({
    x: 150,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 2
  }),
  Wall: new Wall({
    x: 143,
    y: 94,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  Ventbutton: new Ventbutton({
    x: 43,
    y: 47,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 15
  }),
  Comms: new Comms({
    x: -168,
    y: 90,
    direction: 90,
    costumeNumber: 6,
    size: 50,
    visible: false,
    layerOrder: 12
  }),
  VentDeadly: new VentDeadly({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 16
  }),
  Commshacker: new Commshacker({
    x: 12.411947049852357,
    y: -63.444790823801775,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 17
  }),
  Clock: new Clock({
    x: -29,
    y: 142,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 4
  }),
  CommsButton: new CommsButton({
    x: -166,
    y: -24,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 3
  }),
  ExitFullscreen: new ExitFullscreen({
    x: -165,
    y: -160,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 13
  }),
  Mask: new Mask({
    x: 158,
    y: -130,
    direction: 90,
    costumeNumber: 7,
    size: 100,
    visible: false,
    layerOrder: 14
  }),
  Button2door: new Button2door({
    x: -208,
    y: -128,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 6
  }),
  Door: new Door({
    x: 190,
    y: 25,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 9
  }),
  Oxygen: new Oxygen({
    x: 116,
    y: 159,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 5
  }),
  BossButton: new BossButton({
    x: -1,
    y: -72,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 8
  }),
  NormalButton: new NormalButton({
    x: 0,
    y: 4.945059662696025,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 11
  }),
  Text: new Text({
    x: 51.97199999999998,
    y: 150,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 7
  }),
  Relod: new Relod({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 10
  }),
  Thumb: new Thumb({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 18
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
