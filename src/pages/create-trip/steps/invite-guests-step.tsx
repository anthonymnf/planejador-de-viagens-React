import { ArrowRightIcon, UserRoundPlusIcon } from "lucide-react";
import Button from "../../../components/button";

interface InviteGuestsStepProps {
  openGuestsModal: () => void;
  emailToInvite: string[];
  openConfirmTripModal: () => void;
}

export default function InviteGuestsStep({
  emailToInvite,
  openConfirmTripModal,
  openGuestsModal,
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape flex-wrap max-sm:h-auto max-sm:py-4">
      <button
        type="button"
        onClick={openGuestsModal}
        className="flex items-center gap-2 flex-1 text-left"
      >
        <UserRoundPlusIcon className="sixe-5 text-zinc-400 " />

        {emailToInvite.length > 0 ? (
          <span className="text-lg flex-1 text-zinc-100">
            {emailToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-lg flex-1 text-zinc-400">
            Quem estará na viagem?
          </span>
        )}
      </button>
      <div className="w-px h-6 bg-zinc-500" />

      <Button onClick={openConfirmTripModal}>
        Confirmar viagem <ArrowRightIcon className="size-5" />
      </Button>
    </div>
  );
}
