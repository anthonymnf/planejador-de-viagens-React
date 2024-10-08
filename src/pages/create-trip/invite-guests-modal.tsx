import { AtSignIcon, PlusIcon, XIcon } from "lucide-react";
import { FormEvent } from "react";
import Button from "../../components/button";

interface InviteGuestsModalProps {
  closeGuestsModal: () => void;
  emailToInvite: string[];
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailToInvites: (email: string) => void;
  errorMessage: string;
}

export default function InviteGuestsModal({
  addNewEmailToInvite,
  closeGuestsModal,
  emailToInvite,
  removeEmailToInvites,
  errorMessage,
}: InviteGuestsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[645px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button type="button" onClick={closeGuestsModal}>
              <XIcon className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {emailToInvite.map((email) => {
            return (
              <div
                key={email}
                className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
              >
                <span className="text-zinc-300">{email}</span>
                <button
                  type="button"
                  onClick={() => removeEmailToInvites(email)}
                >
                  <XIcon className="size-4 text-zinc-400" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <form
          onSubmit={addNewEmailToInvite}
          className="bg-zinc-950 p-2.5 border border-zinc-800 rounded-lg flex items-center gap-2 max-md:block"
        >
          <div className="px-2 flex items-center flex-1 gap-2 max-md:mb-3">
            <AtSignIcon className="size-5 text-zinc-400 " />
            <input
              type="email"
              name="email"
              placeholder="Digite o email do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 truncate "
            />
          </div>
          <Button type="submit">
            Convidar <PlusIcon className="size-5" />
          </Button>
        </form>
        <span className="text-xs text-red-400 px-2">{errorMessage}</span>
      </div>
    </div>
  );
}
