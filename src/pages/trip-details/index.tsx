import { PlusIcon } from "lucide-react";
import { useState } from "react";
import CreateActivityModal from "./create-activity-modal";
import ImportantLinks from "./important-links";
import Guests from "./guests";
import Activies from "./activies";
import DestinitationAndDateHeader from "./destinitation-and-date-header";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);
  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }
  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <DestinitationAndDateHeader />
      <main className="flex gap-16 px-4 flex-wrap">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between max-lg:gap-2 flex-wrap">
            <h2 className="text-3xl font-semibold max-lg:text-xl">
              Atividades
            </h2>
            <button
              onClick={openCreateActivityModal}
              className="rounded-lg bg-lime-300 text-lime-950 px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400 max-lg:py-2 max-lg:px-1.5 max-sm:w-full max-sm:justify-center"
            >
              <PlusIcon className="size-5" />
              Cadastrar atividade
            </button>
          </div>
          <Activies />
        </div>
        <div className="w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>
      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  );
}
