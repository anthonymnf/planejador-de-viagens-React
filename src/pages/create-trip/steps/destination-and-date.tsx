import {
  ArrowRightIcon,
  Calendar,
  MapPinIcon,
  Settings2,
  XIcon,
} from "lucide-react";
import Button from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface DestinationAndDateProps {
  isGuestsInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  errorMessageStep1: string;
}

export default function DestinationAndDate({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
  errorMessageStep1,
}: DestinationAndDateProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }
  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null;

  return (
    <div>
      <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape flex-wrap max-sm:h-auto max-sm:py-4">
        <div className="flex items-center gap-2 flex-1">
          <MapPinIcon className="size-5 text-zinc-400 " />
          <input
            type="text"
            placeholder="Para onde você vai?"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 max-md:truncate"
            disabled={isGuestsInputOpen}
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>

        <button
          onClick={openDatePicker}
          disabled={isGuestsInputOpen}
          className="flex items-center gap-2 text-left w-[250px] max-sm:flex-1"
        >
          <Calendar className="size-5 text-zinc-400 " />
          <span className="text-lg text-zinc-400  w-40 flex-1 truncate">
            {displayedDate || "Quando?"}
          </span>
        </button>

        {isDatePickerOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Selecione a data</h2>

                  <button type="button" onClick={closeDatePicker}>
                    <XIcon className="size-5 text-zinc-400" />
                  </button>
                </div>
              </div>

              <DayPicker
                mode="range"
                selected={eventStartAndEndDates}
                onSelect={setEventStartAndEndDates}
                modifiersStyles={{
                  selected: { backgroundColor: "#bef264", color: "#09090b" },
                }}
              />
            </div>
          </div>
        )}

        <div className="w-px h-6 bg-zinc-500" />

        {isGuestsInputOpen ? (
          <Button onClick={closeGuestsInput} variant="secondary">
            Alterar local/data <Settings2 className="size-5" />
          </Button>
        ) : (
          <Button onClick={openGuestsInput}>
            Continuar <ArrowRightIcon className="size-5" />
          </Button>
        )}
      </div>
      {errorMessageStep1 !== "" && (
        <span className="text-xs text-red-400 px-2">{errorMessageStep1}</span>
      )}
    </div>
  );
}
