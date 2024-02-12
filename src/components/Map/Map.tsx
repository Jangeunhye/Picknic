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
  id: string;
}

interface Pagination {
  last: number;
  current: number;
  gotoPage: (page: number) => void;
}

interface Props {
  foodKeyword: string;
}
// 현재 위치를 얻어오는 함수
const getCurrentCoordinate = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const coordinate = new window.kakao.maps.LatLng(lat, lon);
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
const Map: React.FC<Props> = ({ foodKeyword }: { foodKeyword: string }) => {
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
            radius: 500,
            sort: window.kakao.maps.services.SortBy.ACCURACY,
          };
          ps.keywordSearch(keyword, placesSearchCB, options);
        }

        function placesSearchCB(
          data: Place[],
          status: any,
          pagination: Pagination
        ) {
          const placesList = document.getElementById("placesList");
          if (status === window.kakao.maps.services.Status.OK) {
            displayPlaces(data);
            displayPagination(pagination);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            removeAllChildNods(placesList);
            placesList?.appendChild(createNoResultElement());
            console.log("검색 결과가 존재하지 않습니다.");
            return;
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            console.log("검색 결과 중 오류가 발생했습니다.");
            return;
          }
        }

        function displayPlaces(places: Place[]) {
          let listEl = document.getElementById("placesList"),
            menuEl = document.getElementById("menu_wrap"),
            fragment = document.createDocumentFragment(),
            bounds = new window.kakao.maps.LatLngBounds(),
            listStr = "";

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
            fragment.appendChild(itemEl);
          }

          // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
          listEl?.appendChild(fragment);
          if (menuEl) {
            menuEl.scrollTop = 0;
          }

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }

        function getListItem(index: number, places: Place): HTMLElement {
          const el = document.createElement("li");

          let itemStr =
            `<a href=https://map.kakao.com/link/map/${places.id}>` + // 링크 추가
            '<div class="info" style="background-color: #f7f7f7; padding: 10px; border-radius: 10px; margin-top: 10px;">' +
            "   <h5 style='font-size: 20px; margin-bottom: 5px;'>" +
            places.place_name +
            "</h5>";

          if (places.road_address_name) {
            itemStr +=
              "    <span style='display: block; margin-bottom: 5px;'>" +
              places.road_address_name +
              "</span>";
          } else {
            itemStr += "    <span>" + places.address_name + "</span>";
          }

          el.innerHTML = itemStr;
          el.className = "item";

          return el;
        }

        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position: any, idx: number) {
          var imageSrc =
              "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new window.kakao.maps.Size(36, 37), // 마커 이미지의 크기
            imgOptions = {
              spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
              spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
              offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new window.kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
              imgOptions
            ),
            marker = new window.kakao.maps.Marker({
              position: position, // 마커의 위치
              image: markerImage,
            });

          marker.setMap(map); // 지도 위에 마커를 표출합니다
          markers.push(marker); // 배열에 생성된 마커를 추가합니다

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

          // 기존에 추가된 페이지번호를 삭제합니다
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

        function createNoResultElement() {
          const noResultElement = document.createElement("div");
          noResultElement.textContent = "검색 결과가 없습니다.";
          return noResultElement;
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
    <div
      className={`flex flex-col justify-center bg-white w-[900px] pb-20 mx-auto items-center rounded-[50px] `}
    >
      <div
        id="map"
        style={{
          minWidth: "800px",
          minHeight: "600px",
          position: "relative",
          overflow: "hidden",
          borderRadius: "10px",
        }}
        className={`my-10 `}
      ></div>
      <div
        id="menu_wrap"
        className={`bg_white w-[800px] overflow-y-auto
            `}
      >
        <ul id="placesList"></ul>
      </div>
    </div>
  );
};

export default Map;
