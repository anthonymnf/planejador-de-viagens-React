import { MailIcon, UserIcon, XIcon } from "lucide-react";
import { FormEvent } from "react";
import Button from "../../components/button";
import { format } from "date-fns";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  destination: string;
  eventStartDate: string | undefined;
  eventEndDate: string | undefined;
}

export default function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName,
  destination,
  eventEndDate,
  eventStartDate,
}: ConfirmTripModalProps) {
  const displayedDate =
    eventStartDate && eventEndDate
      ? format(eventStartDate, "d' de 'LLL")
          .concat(" a ")
          .concat(format(eventEndDate, "d' de 'LLL"))
      : null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[645px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>

            <button type="button" onClick={closeConfirmTripModal}>
              <XIcon className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-zinc-100">{destination}</span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">
              {displayedDate || "Período não informado"}
            </span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="bg-zinc-950 h-14 px-4 border border-zinc-800 rounded-lg flex items-center gap-2">
            <UserIcon className="size-5 text-zinc-400 " />
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>
          <div className="bg-zinc-950 h-14 px-4 border border-zinc-800 rounded-lg flex items-center gap-2">
            <MailIcon className="size-5 text-zinc-400 " />
            <input
              type="email"
              name="email"
              placeholder="Seu email pessoal"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>
          <Button type="submit" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}
