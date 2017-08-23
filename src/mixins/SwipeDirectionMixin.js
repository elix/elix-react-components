export default function SwipeDirectionMixin(Base) {
  return class SwipeDirection extends Base {

    swipeLeft() {
      this.goRight();
    }

    swipeRight() {
      this.goLeft();
    }

  }
}
