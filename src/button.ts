export class Button {
  element: HTMLDivElement;
  position: "left" | "right";

  constructor(position: "left" | "right") {
    this.position = position;
    this.element = document.createElement("div");
  }

  create() {
    this.element.style.position = "absolute";
    this.element.style.top = "50%";
    this.element.style.cursor = "pointer";
    this.element.style.fontWeight = "bold";
    this.element.style.fontSize = "50px";
    this.element.style.color = "rgb(200 196 200)";
    if (this.position === "left") {
      this.element.innerHTML = "<";
      this.element.style.left = "5%";
    } else if (this.position === "right") {
      this.element.innerHTML = ">";
      this.element.style.right = "5%";
    }
  }
}
