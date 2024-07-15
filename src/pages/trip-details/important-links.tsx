import { Link2Icon, PlusIcon } from "lucide-react";
import Button from "../../components/button";

export default function ImportantLinks() {
  return (
    <div className="space-y-6 ">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-zinc-100 block font-medium">
              Reserva do AirBnB
            </span>
            <a
              href="#"
              className="text-zinc-400 hover:text-zinc-200 block text-xs truncate"
            >
              https://www.airbnb.com.br/
            </a>
          </div>
          <Link2Icon className="size-5 text-zinc-400 shrink-0" />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-zinc-100 block font-medium">
              Reserva do AirBnB
            </span>
            <a
              href="#"
              className="text-zinc-400 hover:text-zinc-200 block text-xs truncate"
            >
              https://www.airbnb.com.br/
            </a>
          </div>
          <Link2Icon className="size-5 text-zinc-400 shrink-0" />
        </div>
      </div>

      <Button variant="secondary" size="full">
        <PlusIcon className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
