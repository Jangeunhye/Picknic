import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Place {
  y: number;
  x: number;
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
}

interface Pagination {
  last: number;
  current: number;
  gotoPage: (page: number) => void;
}

interface Props {
  foodKeyword: string;
}
const getCurrentCoordinate = async (): Promise<kakao.maps.LatLng> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const coordinate = new kakao.maps.LatLng(lat, lon);
          resolve(coordinate);
        },
        (error) => {
          reject(new Error("현재 위치를 불러올 수 없습니다."));
        }
      );
    } else {
      reject(new Error("Geolocation API를 지원하지 않습니다."));
    }
  });
};
const KakaoMap: React.FC<Props> = ({ foodKeyword }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KEY}&autoload=false&libraries=services,clusterer`;

    script.onload = () => {
      window.kakao.maps.load(async () => {
        const mapContainer = document.getElementById("map");
        const currentCoordinate = await getCurrentCoordinate();
        console.log("test", currentCoordinate);
        const mapOption = {
          center: currentCoordinate,
          // center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 5,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(
          mapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT
        );

        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        const ps = new window.kakao.maps.services.Places();
        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        searchPlaces();

        async function searchPlaces() {
          const keyword = foodKeyword;

          const options = {
            location: currentCoordinate,
            radius: 1000,
            sort: kakao.maps.services.SortBy.DISTANCE,
          };
          ps.keywordSearch(keyword, placesSearchCB, options);
        }

        function placesSearchCB(
          data: Place[],
          status: any,
          pagination: Pagination
        ) {
          if (status === window.kakao.maps.services.Status.OK) {
            displayPlaces(data);
            displayPagination(pagination);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
            return;
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
            return;
          }
        }

        function displayPlaces(places: Place[]) {
          const listEl = document.getElementById("placesList");
          const menuEl = document.getElementById("menu_wrap");
          const bounds = new window.kakao.maps.LatLngBounds();

          removeAllChildNods(listEl);
          removeMarker();

          for (let i = 0; i < places.length; i++) {
            const placePosition = new window.kakao.maps.LatLng(
              places[i].y,
              places[i].x
            );
            const marker = addMarker(placePosition, i);
            const itemEl = getListItem(i, places[i]);

            bounds.extend(placePosition);

            (function (marker, title) {
              window.kakao.maps.event.addListener(
                marker,
                "mouseover",
                function () {
                  displayInfowindow(marker, title);
                }
              );

              window.kakao.maps.event.addListener(
                marker,
                "mouseout",
                function () {
                  infowindow.close();
                }
              );

              itemEl.onmouseover = function () {
                displayInfowindow(marker, title);
              };

              itemEl.onmouseout = function () {
                infowindow.close();
              };
            })(marker, places[i].place_name);

            listEl?.appendChild(itemEl);
          }

          map.setBounds(bounds);
        }

        function getListItem(index: number, places: Place): HTMLElement {
          const el = document.createElement("li");
          let itemStr =
            '<span class="markerbg marker_' +
            (index + 1) +
            '"></span>' +
            '<div class="info">' +
            "   <h5>" +
            places.place_name +
            "</h5>";

          if (places.road_address_name) {
            itemStr +=
              "    <span>" +
              places.road_address_name +
              "</span>" +
              '   <span class="jibun gray">' +
              places.address_name +
              "</span>";
          } else {
            itemStr += "    <span>" + places.address_name + "</span>";
          }

          itemStr +=
            '  <span class="tel">' + places.phone + "</span>" + "</div>";

          el.innerHTML = itemStr;
          el.className = "item";

          return el;
        }

        function addMarker(position: any, idx: number) {
          const imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
          const imageSize = new window.kakao.maps.Size(36, 37);
          const imgOptions = {
            spriteSize: new window.kakao.maps.Size(36, 691),
            spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
            offset: new window.kakao.maps.Point(13, 37),
          };

          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          );
          const marker = new window.kakao.maps.Marker({
            position: position,
            image: markerImage,
          });

          marker.setMap(map);
          markers.push(marker);

          return marker;
        }

        function removeMarker() {
          for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
          markers = [];
        }

        function displayPagination(pagination: Pagination) {
          const paginationEl = document.getElementById("pagination");
          const fragment = document.createDocumentFragment();

          while (paginationEl?.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild!);
          }

          for (let i = 1; i <= pagination.last; i++) {
            const el = document.createElement("a");
            el.href = "#";
            el.innerHTML = i.toString();

            if (i === pagination.current) {
              el.className = "on";
            } else {
              el.onclick = function () {
                pagination.gotoPage(i);
              };
            }

            fragment.appendChild(el);
          }
          paginationEl?.appendChild(fragment);
        }

        function displayInfowindow(marker: any, title: string) {
          const content =
            '<div style="padding:5px;z-index:1;color:black">' +
            title +
            "</div>";
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }

        function removeAllChildNods(el: HTMLElement | null) {
          while (el?.hasChildNodes()) {
            el.removeChild(el.lastChild!);
          }
        }
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [foodKeyword]);

  let markers: any[] = [];

  return (
    <div className="map_wrap">
      <div
        id="map"
        style={{
          width: "800px",
          height: "500px",
          position: "relative",
          overflow: "hidden",
        }}
      ></div>
      <div id="menu_wrap" className="bg_white">
        <hr />
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default KakaoMap;
