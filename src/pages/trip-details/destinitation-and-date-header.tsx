import { MapPinIcon, CalendarIcon, Settings2Icon } from "lucide-react";
import Button from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import ChangeLocalDateModal from "./change-local-and-date-modal";

interface Trip {
  id: string;
  destination: string;
  ends_at: string;
  starts_at: string;
  is_confirmed: boolean;
}

export default function DestinitationAndDateHeader() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();
  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);
  const displayedDate = trip
    ? format(trip.starts_at, "d' de 'LLL")
        .concat(" até ")
        .concat(format(trip.ends_at, "d' de 'LLL"))
    : null;
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  function openChangeModal() {
    setIsChangeModalOpen(true);
  }
  function closeChangeModal() {
    setIsChangeModalOpen(false);
  }
  return (
    <div className="px-4 h-16 bg-zinc-900 rounded-xl flex justify-between items-center shadow-shape">
      <div className="flex items-center gap-2">
        <MapPinIcon className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>
        <div className="bg-zinc-800 w-px h-6" />
        <Button onClick={openChangeModal} variant="secondary">
          Alterar local/data <Settings2Icon className="size-5" />
        </Button>
      </div>
      {isChangeModalOpen && (
        <ChangeLocalDateModal closeChangeModal={closeChangeModal} />
      )}
    </div>
  );
}
