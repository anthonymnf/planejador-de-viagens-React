import { CheckCircle2Icon, CircleDashedIcon, UserCogIcon } from "lucide-react";
import Button from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import ManageGuestsModal from "./manage-guests-modal";

interface Participants {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export default function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participants[]>([]);
  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }
  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
    window.document.location.reload();
  }
  return (
    <div className="space-y-6 ">
      <h2 className="font-semibold text-xl">Convidados</h2>
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
                <CircleDashedIcon className="size-5 text-zinc-400 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      <Button onClick={openGuestsModal} variant="secondary" size="full">
        <UserCogIcon className="size-5" />
        Gerenciar convidados
      </Button>

      {isGuestsModalOpen && (
        <ManageGuestsModal
          closeGuestModal={closeGuestsModal}
          participants={participants}
        />
      )}
    </div>
  );
}
