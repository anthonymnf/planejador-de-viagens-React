import { CheckCircle2Icon, CircleDashedIcon, XIcon } from "lucide-react";
import { api } from "../../lib/axios";

interface Participants {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

interface ManageGuestsModalProps {
  closeGuestModal: () => void;
  participants: Participants[];
}

export default function ManageGuestsModal({
  closeGuestModal,
  participants,
}: ManageGuestsModalProps) {
  async function confirmParticipant(participantId: string) {
    await api.patch(`/participants/${participantId}/confirm`);
  }
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[645px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Gerenciar convidaos</h2>
            <button type="button" onClick={closeGuestModal}>
              <XIcon className="size-5 text-zinc-400" />
            </button>
          </div>
        </div>
        <div className="space-y-5">
          {participants.map((participant, index) => {
            return (
              <div
                key={participant.id}
                className="flex items-center justify-between"
              >
                <div className="space-y-1.5">
                  <span className="text-zinc-100 block font-medium">
                    {participant.name ?? `Convidado ${index}`}
                  </span>
                  <span className="text-zinc-400 block text-sm truncate">
                    {participant.email}
                  </span>
                </div>
                {participant.is_confirmed ? (
                  <CheckCircle2Icon className="size-5 text-green-400 shrink-0" />
                ) : (
                  <button onClick={() => confirmParticipant(participant.id)}>
                    <CircleDashedIcon className="size-5 text-zinc-400 shrink-0" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
