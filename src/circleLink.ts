export class CircleLink {
    element: HTMLDivElement;
    imageData: string;
  
    constructor(imageData: string) {
      this.imageData = imageData;
      this.element = document.createElement("div");
      this.element.style.borderRadius = "50%";
      this.element.setAttribute("data", imageData);
      this.element.style.width = "15px";
      this.element.style.height = "15px";
      this.element.style.backgroundColor = "rgb(200 196 200)";
      this.element.style.margin = "20px 10px";
      this.element.style.cursor = "pointer";
    }
  }
  