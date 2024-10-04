import { Link2Icon, TagIcon, XIcon } from "lucide-react";
import Button from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateLinkModalProps {
  closeCreateLinksModal: () => void;
}

export default function CreateLinksModal({
  closeCreateLinksModal,
}: CreateLinkModalProps) {
  const { tripId } = useParams();
  const [errorMessage, setErrorMessage] = useState<string>(""); // Estado para mensagem de erro

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(""); // Limpar mensagem de erro

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    // Verificação se ambos os campos estão preenchidos
    if (!title || !url) {
      setErrorMessage("Por favor, preencha tanto o título quanto a URL.");
      return;
    }

    // Enviar os dados para a API
    await api.post(`/trips/${tripId}/links`, { title, url });
    window.document.location.reload(); // Recarregar a página após a criação do link
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[645px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar Link</h2>
            <button type="button" onClick={closeCreateLinksModal}>
              <XIcon className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar os links importantes
          </p>
        </div>

        <form onSubmit={createLink} className="space-y-3">
          <div className="bg-zinc-950 h-14 px-4 border border-zinc-800 rounded-lg flex items-center gap-2">
            <TagIcon className="size-5 text-zinc-400 " />
            <input
              type="text"
              name="title"
              placeholder="Título do link"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <div className="bg-zinc-950 h-14 px-4 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2Icon className="size-5 text-zinc-400 " />
            <input
              type="text"
              name="url"
              placeholder="URL"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          {/* Exibir mensagem de erro se houver */}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <Button type="submit" size="full">
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  );
}
