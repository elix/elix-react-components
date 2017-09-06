import React from 'react';
import ReactDOM from 'react-dom';

import ThemedCarousel from './ThemedCarousel';
import ThemedTabs from './ThemedTabs';
import ThemedTabPanel from './ThemedTabPanel';


export default function ThemedDemo() {

  const desktop = matchMedia('(min-width: 768px)').matches;
  const carouselStyle = desktop ?
    {
      'width': '100%'
    } :
    {
      'margin': '0 -30px'
    };
  
  const deluxeRoomTabLabel = desktop ? "Deluxe rooms" : "Deluxe";

  return (
    <ThemedTabs>
      <ThemedTabPanel aria-label="Standard rooms">
        <ThemedCarousel style={carouselStyle}>
          <img src="images/themed/standard1.png"/>
          <img src="images/themed/standard2.png"/>
          <img src="images/themed/standard3.png"/>
          <img src="images/themed/standard4.png"/>
        </ThemedCarousel>
        <div>
          <h1>Standard rooms</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            tincidunt eu erat sit amet mollis. Phasellus ut consectetur tortor.
            Aliquam auctor eros vel sapien cursus finibus eget a purus.
            Pellentesque luctus dui eget magna consequat cursus. Vestibulum
            accumsan eu sem vitae mollis. Donec in odio convallis elit feugiat
            laoreet eget ut quam. Ut ultricies erat quis gravida cursus. Ut
            imperdiet tempus leo, et ultricies erat rutrum et. In quis orci eu
            eros lacinia accumsan. Donec vel volutpat quam, eget imperdiet sapien.
            Morbi in euismod neque. Curabitur id turpis nec nunc rutrum sagittis
            vitae vel odio. Aenean congue, mi vel malesuada finibus, libero libero
            pharetra ex, in sodales ligula elit dapibus augue. Sed id est nibh.
            Nullam nunc nulla, luctus eu tempor id, sagittis non lacus.          
          </p>
        </div>
      </ThemedTabPanel>
      <ThemedTabPanel aria-label={deluxeRoomTabLabel}>
        <ThemedCarousel style={carouselStyle}>
          <img src="images/themed/deluxe1.png" />
          <img src="images/themed/deluxe2.png" />
          <img src="images/themed/deluxe3.png" />
          <img src="images/themed/deluxe4.png" />
        </ThemedCarousel>
        <div>
          <h1>Deluxe rooms</h1>
          <p>
            Nunc venenatis congue est vitae cursus. Suspendisse porta, augue nec
            interdum feugiat, lorem erat consequat dolor, eu bibendum magna tellus
            non lacus. Aliquam nulla ipsum, pharetra sed lectus vitae, ornare
            vulputate sem. Nunc a justo massa. Nulla et urna eget sem eleifend
            fringilla nec non nibh. Suspendisse potenti. Sed non dapibus augue,
            imperdiet facilisis magna. Donec laoreet urna massa, congue
            consectetur nunc imperdiet sit amet. Etiam eu purus augue.
            Pellentesque vel ipsum gravida lectus aliquam aliquam. Sed in diam et
            est egestas sodales. Nunc semper purus ut eros fermentum mollis. Proin
            quam erat, scelerisque vitae mattis sed, dapibus nec nisl. Ut vel
            scelerisque lectus. Aenean diam tortor, molestie vel velit eu, semper
            viverra lacus.
          </p>
        </div>
      </ThemedTabPanel>
      <ThemedTabPanel aria-label="Suites">
        <ThemedCarousel style={carouselStyle}>
          <img src="images/themed/suite1.jpg" />
          <img src="images/themed/suite2.jpg" />
          <img src="images/themed/suite3.jpg" />
          <img src="images/themed/suite4.jpg" />
        </ThemedCarousel>
        <div>
          <h1>Suites</h1>
          <p>
            Quisque molestie posuere ligula at laoreet. Sed nisi est, semper a
            suscipit sit amet, porta ultricies enim. Vivamus a arcu nec arcu
            porttitor gravida eget nec odio. Sed porttitor rutrum turpis, ut
            egestas arcu sagittis condimentum. Integer consequat eros sed
            porttitor ullamcorper. Aliquam elementum vehicula arcu, at vulputate
            mi congue sed. Cras sed nunc ac enim vulputate gravida at non nulla.
            Aenean varius, turpis ac dapibus lacinia, nisl elit pretium diam, sit
            amet ornare magna nibh id diam. Aenean accumsan dolor quis massa
            tristique commodo.
          </p>
        </div>
      </ThemedTabPanel>
    </ThemedTabs>
  );
}
