import { Calendar, MapPinIcon, XIcon } from "lucide-react";
import Button from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";

interface ChangeLocalDateModalProps {
  closeChangeModal: () => void;
  currentDestination: string | undefined; // Adicionamos para verificar o destino atual
  currentStartDate: string | undefined; // Adicionamos para verificar a data atual
  currentEndDate: string | undefined; // Adicionamos para verificar a data atual
}

export default function ChangeLocalDateModal({
  closeChangeModal,
  currentDestination,
  currentStartDate,
  currentEndDate,
}: ChangeLocalDateModalProps) {
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  async function handleChangeLocalDate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(""); // Limpa mensagem de erro

    const data = new FormData(event.currentTarget);
    const destination = data.get("destination")?.toString();

    // Verificação de preenchimento dos campos
    if (
      !eventStartAndEndDates?.from ||
      !eventStartAndEndDates?.to ||
      !destination
    ) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    // Verificação se a data de início não é anterior à data atual
    const currentDate = new Date(); // Data atual
    if (eventStartAndEndDates.from < currentDate) {
      setErrorMessage("A data de início não pode ser anterior à data atual.");
      return;
    }

    // Converter as strings `currentStartDate` e `currentEndDate` em objetos `Date`
    const currentStartDateObject = currentStartDate
      ? new Date(currentStartDate)
      : null;
    const currentEndDateObject = currentEndDate
      ? new Date(currentEndDate)
      : null;

    // Verificação de duplicidade (se destino e datas são iguais às atuais)
    const isDestinationEqual = destination === currentDestination;
    const isStartDateEqual =
      eventStartAndEndDates.from &&
      currentStartDateObject &&
      eventStartAndEndDates.from.getTime() === currentStartDateObject.getTime();
    const isEndDateEqual =
      eventStartAndEndDates.to &&
      currentEndDateObject &&
      eventStartAndEndDates.to.getTime() === currentEndDateObject.getTime();

    if (isDestinationEqual && isStartDateEqual && isEndDateEqual) {
      setErrorMessage("O destino e as datas são os mesmos já cadastrados.");
      return;
    }

    // Atualização dos dados da viagem
    await api.put(`/trips/${tripId}`, {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
    });

    // Recarrega a página após a atualização
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

        <form onSubmit={handleChangeLocalDate} className="space-y-3">
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
              type="button"
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
                  modifiersStyles={{
                    selected: { backgroundColor: "#bef264", color: "#09090b" },
                  }}
                />
              </div>
            </div>
          )}

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <Button type="submit" size="full">
            Confirmar mudanças
          </Button>
        </form>
      </div>
    </div>
  );
}
