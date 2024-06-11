import { carouselContainer, carouselImageWrapper, image_array } from "./selectors";
import { Button } from "./button";
import { NavigatorCircleContainer } from "./navigatorCircleContainer";
import { CircleLink } from "./circleLink";

const imageWidth = 640;
const HOLD_TIME = 2500;
let currentIndex = 0;
let leftClick = 0;
let rightClick = 0;
let HOLD_TIMEOUT: number | undefined;
const carouselImageWrapperWidth = image_array.length * imageWidth;

export function initializeCarousel() {
  carouselImageWrapper.style.left = "0px";
  
  for (let i = 0; i < image_array.length; i++) {
    image_array[i].setAttribute("data", i.toString());
    console.log(image_array[i].getAttribute("data"));
  }

  const leftButton = new Button("left");
  leftButton.create();
  carouselContainer.appendChild(leftButton.element);

  const rightButton = new Button("right");
  rightButton.create();
  carouselContainer.appendChild(rightButton.element);

  const navContainer = new NavigatorCircleContainer();
  carouselContainer.appendChild(navContainer.element);

  eventListeners(navContainer, leftButton, rightButton);
  activeButton(currentIndex, navContainer.navigationCircles);
}

function activeButton(currentIndex: number, navigationCircles: CircleLink[]) {
  currentIndex = parseInt(currentIndex.toString());
  navigationCircles.forEach((circle) => {
    circle.element.classList.remove("active__button");
    if (circle.imageData == currentIndex.toString()) {
      circle.element.classList.add("active__button");
    }
  });
}

function animate(slideInt: number, navigationCircles: CircleLink[], event?: Event) {
  let leftWidth = parseInt(carouselImageWrapper.style.left);
  if (leftWidth % imageWidth !== 0) {
    return;
  }
  clearTimeout(HOLD_TIMEOUT);
  let holdTime = imageWidth;
  let slideInterval: number | undefined;
  if (slideInt < 0) {
    currentIndex += 1;
    leftClick = 0;
    rightClick += 1;
  } else if (slideInt > 0) {
    currentIndex -= 1;
    rightClick = 0;
    leftClick += 1;
  }

  activeButton(currentIndex, navigationCircles);
  slideInterval = window.setInterval(() => {
    let leftWidth = parseInt(carouselImageWrapper.style.left);
    if (rightClick) {
      leftWidth -= 10;
      holdTime -= 10;
      if (holdTime <= 0) {
        clearInterval(slideInterval);
        HOLD_TIMEOUT = window.setTimeout(() => {
          animate(-imageWidth, navigationCircles);
        }, HOLD_TIME);
      }
      if (leftWidth < -carouselImageWrapperWidth + imageWidth) {
        currentIndex = image_array.length - 1;
        animate(imageWidth, navigationCircles);
        clearInterval(slideInterval);
        return;
      }
    } else if (leftClick) {
      leftWidth += 10;
      holdTime -= 10;
      if (holdTime === 0) {
        clearInterval(slideInterval);
        HOLD_TIMEOUT = window.setTimeout(() => {
          animate(imageWidth, navigationCircles);
        }, HOLD_TIME);
      }
      if (leftWidth > 0) {
        currentIndex = 0;
        animate(-imageWidth, navigationCircles);
        clearInterval(slideInterval);
        return;
      }
    }
    carouselImageWrapper.style.left = `${leftWidth}px`;
  }, 5);
}

function eventListeners(navContainer: NavigatorCircleContainer, leftButton: Button, rightButton: Button) {
  HOLD_TIMEOUT = window.setTimeout(() => {
    animate(-imageWidth, navContainer.navigationCircles);
  }, 3000);

  rightButton.element.addEventListener("click", () => {
    animate(-imageWidth, navContainer.navigationCircles);
  });

  leftButton.element.addEventListener("click", () => {
    animate(imageWidth, navContainer.navigationCircles);
  });

  navContainer.navigationCircles.forEach((circle) => {
    circle.element.addEventListener("click", () => {
      let transition: number;
      let gap = (currentIndex - parseInt(circle.imageData)) * imageWidth;
      currentIndex = parseInt(circle.imageData);
      clearTimeout(HOLD_TIMEOUT);
      if (gap > 0) {
        transition = 10;
      } else {
        transition = -10;
        gap = -gap;
      }
      window.setInterval(() => {
        let leftWidth = parseInt(carouselImageWrapper.style.left);
        if (gap <= 0) {
          return;
        }
        leftWidth += transition;
        gap -= 10;
        carouselImageWrapper.style.left = `${leftWidth}px`;
      }, 1);
      HOLD_TIMEOUT = window.setTimeout(() => {
        animate(imageWidth, navContainer.navigationCircles);
      }, HOLD_TIME);
      activeButton(currentIndex, navContainer.navigationCircles);
    });
  });
}
