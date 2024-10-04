import { CalendarIcon, TagIcon, XIcon } from "lucide-react";
import Button from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export default function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const occurs_at = data.get("occurs-at")?.toString();
    const title = data.get("title")?.toString();

    // Verificação para garantir que ambos os campos estão preenchidos
    if (!title || !occurs_at) {
      setErrorMessage(
        "Por favor, preencha todos os campos antes de confirmar."
      );
      return;
    }

    try {
      await api.post(`/trips/${tripId}/activities`, { title, occurs_at });
      window.document.location.reload();
    } catch (error) {
      setErrorMessage(
        "Ocorreu um erro ao salvar a atividade. Tente novamente."
      );
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[645px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button type="button" onClick={closeCreateActivityModal}>
              <XIcon className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar as atividades
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="bg-zinc-950 h-14 px-4 border border-zinc-800 rounded-lg flex items-center gap-2">
            <TagIcon className="size-5 text-zinc-400 " />
            <input
              type="text"
              name="title"
              placeholder="Qual a atividade"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-zinc-950 flex-1 h-14 px-4 border border-zinc-800 rounded-lg flex items-center gap-2">
              <CalendarIcon className="size-5 text-zinc-400 " />
              <input
                type="datetime-local"
                name="occurs-at"
                placeholder="Data e horário da atividade"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 [color-scheme:dark]"
              />
            </div>
          </div>
          {/* Exibição da mensagem de erro, caso ocorra */}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <Button type="submit" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}
