import { useProvider } from "@/context/AvailabilityContext";
import getTimezoneData from "@/lib/timezones";
import { useState } from "react";

const { groupLookupMap, timeZoneMap } = getTimezoneData();

export default function TimezonePicker() {
  const {
    state: { timeZone },
    dispatch,
  } = useProvider();

  // Convert timeZoneMap to array for easier handling
  const timeZones = [...timeZoneMap].map(([display, { value }]) => ({
    display,
    value,
  }));

  // Get the selected timezone value
  const selectedTimeZoneValue = groupLookupMap.get(timeZone);

  // Find the display corresponding to the selectedTimeZoneValue
  const selectedTimeZoneDisplay = timeZones.find(
    (tz) => tz.value === selectedTimeZoneValue
  )?.display || "";

  const [searchTerm, setSearchTerm] = useState(selectedTimeZoneDisplay);
  const [isOpen, setIsOpen] = useState(false);

  // Filter time zones based on search term
  const filteredTimeZones = timeZones.filter((tz) =>
    `GMT${tz.display}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-1/2 invisible">
      <label
        htmlFor="location"
        className="block text-sm font-medium leading-0 text-gray-900"
      >
        Fuseau horaire
      </label>

      {/* Search input */}
      <input
        type="text"
        placeholder="Rechercher un fuseau horaire..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)} // Delay to allow for selection
        className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-accent-600 sm:text-sm sm:leading-6"
      />

      {/* Dropdown with filtered options */}
      {isOpen && (
        <ul className="absolute z-10 mt-1 rounded-md border border-gray-300 bg-white shadow-lg">
          {filteredTimeZones.length > 0 ? (
            filteredTimeZones.map((tz) => (
              <li
                key={tz.value}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                onClick={() => {
                  dispatch({
                    type: "SET_TIMEZONE",
                    payload: tz.value,
                  });
                  setSearchTerm(`GMT${tz.display}`); // Optionally reset search term
                  setIsOpen(false); // Close dropdown
                }}
              >
                {`GMT${tz.display}`}
              </li>
            ))
          ) : (
            <li className="py-2 pl-3 pr-9 text-gray-500">Aucun résultat</li>
          )}
        </ul>
      )}
    </div>
  );
}
