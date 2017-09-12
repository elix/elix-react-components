import React from 'react';
import ReactDOM from 'react-dom';

import DesktopMixin from '../DesktopMixin';
import SereneCarousel from './SereneCarousel';
import SereneTabs from './SereneTabs';
import SereneTabPanel from './SereneTabPanel';


const Base =
  DesktopMixin(
    React.Component
  );

  
export default class SereneSamplePage extends Base {

  render() {

    const carouselStyle = {
      'margin': '0 -32px'
    };

    const standardRoomLabel = this.state.desktop ? 'Standard rooms' : 'Standard';
    const deluxeRoomTabLabel = this.state.desktop ? 'Deluxe rooms' : 'Deluxe';

    return (
      <SereneTabs>
        <SereneTabPanel aria-label={standardRoomLabel}>
          <SereneCarousel style={carouselStyle} aria-label="Standard room photos">
            <img src="images/Serene/standard1.png" aria-label="Standard room wide-angle"/>
            <img src="images/Serene/standard2.png" aria-label="Standard room with view of city"/>
            <img src="images/Serene/standard3.png" aria-label="Standard shower"/>
            <img src="images/Serene/standard4.png" aria-label="Standard bathroom"/>
          </SereneCarousel>
          <div>
            <h1>Standard rooms</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum tincidunt eu erat sit amet mollis. Phasellus ut
              consectetur tortor. Aliquam auctor eros vel sapien cursus finibus
              eget a purus. Pellentesque luctus dui eget magna consequat cursus.
              Vestibulum accumsan eu sem vitae mollis. Donec in odio convallis
              elit feugiat laoreet eget ut quam. Ut ultricies erat quis gravida
              cursus. Ut imperdiet tempus leo, et ultricies erat rutrum et. In
              quis orci eu eros lacinia accumsan. Donec vel volutpat quam, eget
              imperdiet sapien. Morbi in euismod neque. Curabitur id turpis nec
              nunc rutrum sagittis vitae vel odio. Aenean congue, mi vel
              malesuada finibus, libero libero pharetra ex, in sodales ligula
              elit dapibus augue. Sed id est nibh. Nullam nunc nulla, luctus eu
              tempor id, sagittis non lacus.
              </p>
          </div>
        </SereneTabPanel>
        <SereneTabPanel aria-label={deluxeRoomTabLabel}>
          <SereneCarousel style={carouselStyle} aria-label="Deluxe room photos">
            <img src="images/Serene/deluxe1.png" aria-label="Deluxe room wide-angle"/>
            <img src="images/Serene/deluxe2.png" aria-label="Deluxe room at night with view of city"/>
            <img src="images/Serene/deluxe3.png" aria-label="Deluxe bathroom at night"/>
            <img src="images/Serene/deluxe4.png" aria-label="Deluxe bathroom sink"/>
          </SereneCarousel>
          <div>
            <h1>Deluxe rooms</h1>
            <p>
              Nunc venenatis congue est vitae cursus. Suspendisse porta, augue
              nec interdum feugiat, lorem erat consequat dolor, eu bibendum
              magna tellus non lacus. Aliquam nulla ipsum, pharetra sed lectus
              vitae, ornare vulputate sem. Nunc a justo massa. Nulla et urna
              eget sem eleifend fringilla nec non nibh. Suspendisse potenti. Sed
              non dapibus augue, imperdiet facilisis magna. Donec laoreet urna
              massa, congue consectetur nunc imperdiet sit amet. Etiam eu purus
              augue. Pellentesque vel ipsum gravida lectus aliquam aliquam. Sed
              in diam et est egestas sodales. Nunc semper purus ut eros
              fermentum mollis. Proin quam erat, scelerisque vitae mattis sed,
              dapibus nec nisl. Ut vel scelerisque lectus. Aenean diam tortor,
              molestie vel velit eu, semper viverra lacus.
              </p>
          </div>
        </SereneTabPanel>
        <SereneTabPanel aria-label="Suites">
          <SereneCarousel style={carouselStyle} aria-label="Suite room photos">
            <img src="images/Serene/suite1.jpg" aria-label="Suite sitting area"/>
            <img src="images/Serene/suite2.jpg" aria-label="Suite bedroom area at night"/>
            <img src="images/Serene/suite3.jpg" aria-label="Suite bathroom at night"/>
            <img src="images/Serene/suite4.jpg" aria-label="Suite bathroom with view of city"/>
          </SereneCarousel>
          <div>
            <h1>Suites</h1>
            <p>
              Quisque molestie posuere ligula at laoreet. Sed nisi est, semper a
              suscipit sit amet, porta ultricies enim. Vivamus a arcu nec arcu
              porttitor gravida eget nec odio. Sed porttitor rutrum turpis, ut
              egestas arcu sagittis condimentum. Integer consequat eros sed
              porttitor ullamcorper. Aliquam elementum vehicula arcu, at
              vulputate mi congue sed. Cras sed nunc ac enim vulputate gravida
              at non nulla. Aenean varius, turpis ac dapibus lacinia, nisl elit
              pretium diam, sit amet ornare magna nibh id diam. Aenean accumsan
              dolor quis massa tristique commodo.
              </p>
          </div>
        </SereneTabPanel>
      </SereneTabs>
    );
  }

}
