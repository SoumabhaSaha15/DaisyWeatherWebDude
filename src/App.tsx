import useRipple from "use-ripple-hook";
import { IoMdClose } from "react-icons/io";
import { useHotkeys } from "react-hotkeys-hook";
import { FaSearchLocation } from "react-icons/fa";
import WeatherCity from "./components/weather/City";
import ForecastCity from "./components/forecast/City";
import WeatherCoords from "./components/weather/Coords";
import { useModal } from "./context/modal/ModalContext";
import { useCachedCities } from "./hooks/cachedCities";
import ForecastCoords from "./components/forecast/Coords";
import { useState, useRef, type FC, useMemo } from "react";
import useGeolocation from "./context/geolocation/GeolocationContext";

const App: FC = () => {

  const cachedCities = useCachedCities();
  const { geolocation } = useGeolocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>('');
  const [city, setCity] = useState<string | null>(null);
  const { openModal, modalRef, closeModal } = useModal();
  const [rippleClose, eventClose] = useRipple<HTMLButtonElement>();
  const [rippleSearch, eventSearch] = useRipple<HTMLButtonElement>();

  const handleOpenSearch = () => {
    openModal();
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  useHotkeys('mod+k', handleOpenSearch, { preventDefault: true });

  const viewContent = useMemo(() => {
    if (city === null && geolocation !== null)
      return (
        <>
          <WeatherCoords {...geolocation} />
          <ForecastCoords {...geolocation} />
        </>
      );
    const targetCity = city ?? "kolkata";
    return (
      <>
        <WeatherCity q={targetCity} />
        <ForecastCity q={targetCity} />
      </>
    );
  }, [city, geolocation]);

  return (
    <>
      <div className="min-h-dvh bg-transparent overflow-y-auto">
        {viewContent}
        <div className="fab">
          <button
            className="btn btn-circle btn-secondary btn-lg focus:outline-none! focus:ring-0 focus:ring-accent"
            ref={rippleSearch}
            onPointerDown={eventSearch}
            onClick={handleOpenSearch}
          >
            <FaSearchLocation className="text-lg" />
          </button>
        </div>
      </div>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box min-h-80">
          <h3 className="font-bold text-lg flex items-center gap-2 w-full justify-between px-2">
            <span>
              Search Weather &nbsp; <kbd className="kbd rounded-xl" children="ctrl/⌘+k" />
            </span>
            <button
              className="btn btn-md btn-circle btn-error focus:outline-none! focus:ring-0 focus:ring-accent"
              id="ModalClose"
              ref={rippleClose}
              onPointerDown={eventClose}
              onClick={() => closeModal()}
            >
              <IoMdClose className="text-2xl font-black" />
            </button>
          </h3>

          <div className="py-4 dropdown dropdown-center w-full" >
            <div className="flex justify-center">
              <label
                className="input rounded-full w-[calc(100%-8px)] px-2 focus-within:outline-none! focus-within:ring-1 focus-within:ring-primary"
                htmlFor="NameInput"
                tabIndex={0}
              >
                <FaSearchLocation className="text-md" />
                <input
                  type="search"
                  id="NameInput"
                  value={search}
                  ref={inputRef}
                  onChange={({ currentTarget: { value } }) => setSearch(value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (search.trim().length === 0) return;
                      setCity(search);
                      closeModal();
                      e.currentTarget.blur();
                    }
                  }}
                  placeholder="Search Place"
                  required
                />
              </label>
            </div>
            {cachedCities.length ? (<ul tabIndex={-1} className="dropdown-content menu bg-base-300 rounded-box z-1 w-full p-2 mt-1 shadow-sm">
              {cachedCities.map((item, index) => (
                <li key={index} onClick={() => {
                  setSearch(item);
                  setCity(item);
                  closeModal();
                }}>
                  <a className="bg-base-100 hover:bg-accent mb-0.5" >{item}</a>
                </li>
              ))}
            </ul>) : (<></>)}
          </div>
        </div>
      </dialog>
    </>
  )
}

export default App;