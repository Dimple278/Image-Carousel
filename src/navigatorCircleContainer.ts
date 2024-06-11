// navigatorCircleContainer.ts

import { image_array } from "./selectors";
import { CircleLink } from "./circleLink";

export class NavigatorCircleContainer {
  element: HTMLDivElement;
  navigationCircles: CircleLink[];

  constructor() {
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.display = "flex";
    this.element.style.left = "50%";
    this.element.style.transform = "translateX(-50%)";
    this.element.style.bottom = "0px";
    this.navigationCircles = [];

    Array.from(image_array).forEach((imageElement) => {
      let image_data = imageElement.getAttribute("data")!;
      let circle = new CircleLink(image_data);
      this.element.appendChild(circle.element);
      this.navigationCircles.push(circle);
    });
  }
}
