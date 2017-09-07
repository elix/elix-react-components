const desktopMediaQuery = matchMedia('(min-width: 768px)');


export default function DesktopMixin(Base) {
  return class Desktop extends Base {

    constructor(props) {
      super(props);
      this.state = Object.assign({}, this.state, {
        desktop: desktopMediaQuery.matches
      });
      desktopMediaQuery.addListener(event => {
        this.setState({ desktop: desktopMediaQuery.matches });
      });
    }

  }
}
