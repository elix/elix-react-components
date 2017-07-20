export default function KeyboardMixin(Base) {
  return class Keyboard extends Base {

    constructor(props) {
      super(props);
      this.keydown = this.keydown.bind(this);
    }
    
  }
}
