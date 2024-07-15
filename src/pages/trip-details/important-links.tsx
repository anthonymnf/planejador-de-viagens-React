import { Link2Icon, PlusIcon } from "lucide-react";
import Button from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface TripLinks {
  id: string;
  title: string;
  url: string;
}

export default function ImportantLinks() {
  const { tripId } = useParams();
  const [links, setLinks] = useState<TripLinks[]>([]);

  useEffect(() => {
    api
      .get(`trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links));
  }, [tripId]);
  return (
    <div className="space-y-6 ">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        {links.length > 0 ? (
          links.map((link) => {
            return (
              <div key={link.id} className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <span className="text-zinc-100 block font-medium">
                    {link.title}
                  </span>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-zinc-200 block text-xs truncate"
                  >
                    {link.url}
                  </a>
                </div>
                <Link2Icon className="size-5 text-zinc-400 shrink-0" />
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <span className="text-zinc-400 block font-medium">
                Sem links cadastrados
              </span>
            </div>
          </div>
        )}
      </div>

      <Button variant="secondary" size="full">
        <PlusIcon className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
