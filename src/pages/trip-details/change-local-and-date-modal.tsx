import { Calendar, MapPinIcon, XIcon } from "lucide-react";
import Button from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";

interface ChangeLocalDateModalProps {
  closeChangeModal: () => void;
}

export default function ChangeLocalDateModal({
  closeChangeModal,
}: ChangeLocalDateModalProps) {
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();
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
  const { tripId } = useParams();
  async function ChangeLocalDateModal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const destination = data.get("destination")?.toString();
    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return;
    }
    await api.put(`/trips/${tripId}`, {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
    });
    // closeCreateActivityModal();
    window.document.location.reload();
  }
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[645px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Alterar dados de Local e data da Viagem
            </h2>
            <button type="button" onClick={closeChangeModal}>
              <XIcon className="size-5 text-zinc-400" />
            </button>
          </div>
        </div>

        <form onSubmit={ChangeLocalDateModal} className="space-y-3">
          <div className="bg-zinc-950 h-14 px-4 border border-zinc-800 rounded-lg flex items-center gap-2">
            <MapPinIcon className="size-5 text-zinc-400 " />
            <input
              type="text"
              name="destination"
              placeholder="Para onde você vai?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <div className="bg-zinc-950 h-14 px-4 border border-zinc-800 rounded-lg flex items-center gap-2">
            <button
              onClick={openDatePicker}
              className="flex items-center gap-2 text-left "
            >
              <Calendar className="size-5 text-zinc-400 " />
              <span className="text-lg text-zinc-400 flex-1">
                {displayedDate || "Quando?"}
              </span>
            </button>
          </div>

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
                />
              </div>
            </div>
          )}

          <Button type="submit" size="full">
            Confirmar mudanças
          </Button>
        </form>
      </div>
    </div>
  );
}
