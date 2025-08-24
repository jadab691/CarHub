import React from "react";
import list from "../../public/list.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";

function Display() {
  const filterData = list.filter((data) => data.catagory === "Frontend");
  console.log(filterData);
  var settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="max-w-screen-2xl cntainer mx-auto md:px-20 py-4">
        <h1 className="font-semibold text-xl pb-2">New Arrival</h1>

        <div className="pt-1 pb-10">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
            nesciunt quasi ducimus eligendi eveniet vero. Accusantium odio
            incidunt minus earum minima tempora non ex nisi. Ad doloribus magni
            fugiat id facilis debitis, officiis recusandae explicabo!
            Voluptatibus fugit nisi ducimus? Consectetur laudantium itaque
            magnam nesciunt sint explicabo magni suscipit porro quam, excepturi
            qui repellat maiores earum eius veritatis similique totam! Ut,
            explicabo nostrum repellendus eveniet nihil laudantium sunt
            repudiandae consequatur deleniti quam esse delectus fugit veritatis
            non magnam obcaecati ex illum, cumque necessitatibus rerum! Earum
            officia voluptate non, sed natus ullam illum molestias quo beatae
            harum quasi laboriosam eius vel minus, iure explicabo ad veritatis
            illo dolore. Mollitia exercitationem nesciunt excepturi iste eos
            voluptas minima, quibusdam nobis. Numquam rerum, ullam corrupti,
            ratione suscipit laudantium, asperiores libero voluptates vero ipsum
            similique incidunt tenetur maxime blanditiis et. Dolorem, iste
            soluta quaerat, sit possimus, explicabo laboriosam autem enim eius
            ea dolore molestias distinctio quisquam voluptates quos sequi.
            Libero dignissimos consectetur est officia inventore, expedita sunt
            quisquam laudantium? Dicta aliquid in impedit ex voluptatibus
            quisquam soluta exercitationem ipsa, iste reprehenderit nihil
            sapiente doloremque totam blanditiis debitis est asperiores hic
            quaerat commodi cumque! Esse, facilis odit? Numquam quo dolore
            perspiciatis, aliquid ab aspernatur minima facilis qui sapiente
            magni. Harum fuga fugit eligendi nostrum? Odit natus voluptatum ex
            numquam voluptates eum beatae modi ab nesciunt excepturi architecto
            iusto, aut enim asperiores placeat ipsum omnis labore perferendis
            officia ullam. Voluptatibus eius repudiandae odit dolorem culpa non,
            iure dolor magni tenetur quia, ex sed. In, maxime, perspiciatis ipsa
            enim a tempore ipsum, praesentium reiciendis laudantium aliquam
            adipisci accusantium delectus incidunt nihil ex expedita nam tenetur
            quis aperiam dolores. Earum voluptates neque, eveniet adipisci, vero
            quasi sunt dolore nemo est aspernatur, porro ipsam unde
            necessitatibus omnis! Quos laudantium earum maiores mollitia
            incidunt at dicta magnam et dolores delectus, rem nam dignissimos
            facilis a officiis ipsum quas tempore necessitatibus repudiandae
            sint iure soluta. Quae magni eveniet molestias voluptatum sit nobis
            praesentium eum quod numquam dicta maiores qui, et cum totam, vitae
            asperiores? Totam commodi nobis natus inventore sequi adipisci
            similique laborum repellendus et tenetur aspernatur quis eos beatae
            excepturi voluptas, modi iusto magnam, doloremque ipsam? Quidem
            perferendis nostrum quis sunt ducimus explicabo fugiat tenetur
            quibusdam error dolor obcaecati possimus harum ipsum eveniet commodi
            voluptatem, rem eum. Quam libero facere accusamus aliquam assumenda
            hic magni.
          </p>
        </div>
        {/* card container  */}
        {/* slder container  */}
        <div className="slider-container ">
          <Slider {...settings}>
            {filterData.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Display;
