import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function KaKaoMap({ keyword, location }: { keyword: string; location: any }) {
  const [info, setInfo] = useState<any>();
  const [markers, setMarkers] = useState<any>([]);
  const [map, setMap] = useState<any>();

  useEffect(() => {
    if (!map || !location) return; // map과 location이 유효하지 않으면 함수 종료

    const ps = new kakao.maps.services.Places();
    const coordinate = new window.kakao.maps.LatLng(location.lat, location.lng);
    const options = {
      location: coordinate,
      radius: 500,
      sort: window.kakao.maps.services.SortBy.ACCURACY,
    };
    ps.keywordSearch(keyword, placesSearchCB, options);
  }, [map, keyword, location]);

  function placesSearchCB(
    data: string | any[],
    status: kakao.maps.services.Status,
    _pagination: any
  ) {
    if (status === kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      const bounds = new kakao.maps.LatLngBounds();
      let markers = [];
      for (var i = 0; i < data.length; i++) {
        // @ts-ignore
        markers.push({
          road_address_name: data[i].road_address_name,
          position: {
            lat: data[i].y,
            lng: data[i].x,
          },
          place_name: data[i].place_name,
          place_url: data[i].place_url,
        });
        // @ts-ignore
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      setMarkers(markers);

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }
  }

  return (
    <div
      className={
        "min-h-[600px] flex flex-col justify-center sm:min-h-[400px] bg-white sm:w-full md:w-full w-[900px] mx-auto items-center rounded-[50px] sm:rounded-md pb-6"
      }
    >
      {location ? (
        <Map // 로드뷰를 표시할 Container
          center={location}
          style={{
            position: "relative",
            overflow: "hidden",
          }}
          className={
            "my-10 min-h-[600px] min-w-[800px] sm:min-w-full md:min-w-[90%] sm:min-h-[400px] sm:mt-0 sm:mb-12 rounded-[5px]"
          }
          level={3}
          onCreate={setMap}
        >
          {!markers.length && (
            <div className="py-4 px-14 text-[20px] w-full">
              검색결과가 없습니다.
            </div>
          )}

          {markers.map((marker: any) => (
            //marker의 place_name 없으면 div태그로 해당되는 정보가 없습니다 라고 뜨게
            <div className="mb-5 w-full" key={marker.place_name}>
              <MapMarker
                key={`marker-${marker.place_name}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onClick={() => setInfo(marker)}
              >
                {info && info.place_name === marker.place_name && (
                  <span style={{ color: "#000" }}>{marker.place_name}</span>
                )}
              </MapMarker>
              <Link
                href={marker.place_url}
                key={marker.place_name}
                className="w-full"
              >
                <div
                  id="menu_wrap"
                  className={`w-[800px] sm:w-[95%] overflow-y-auto
                  bg-[#f7f7f7]
                  rounded-[10px]
                  mx-auto
                p-5
            `}
                >
                  <h5 className="text-[20px] sm:text-base">
                    {marker.place_name}
                  </h5>
                  <div className="mb-[5px] mt-2 sm:text-sm">
                    {marker.road_address_name}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Map>
      ) : (
        <Image
          src={`/images/loading.gif`}
          alt="loading"
          width={50}
          height={50}
        />
      )}
    </div>
  );
}
export default KaKaoMap;
