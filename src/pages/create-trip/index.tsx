import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import InviteGuestsModal from "./invite-guests-modal";
import ConfirmTripModal from "./confirm-trip-modal";
import DestinationAndDate from "./steps/destination-and-date";
import InviteGuestsStep from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [emailToInvite, setEmailToInvite] = useState([
    "diego@rocketseat.com.br",
    "john@acme.com",
  ]);

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessageStep1, setErrorMessageStep1] = useState("");
  const [errorMessageConfirmTrip, setErrorMessageConfirmTrip] = useState("");

  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  function openGuestsInput() {
    if (destination === "" || eventStartAndEndDates == undefined) {
      setErrorMessageStep1("Por favor, preencha todos os campos");
      return;
    }
    // Verifica se a data de início do evento está definida
    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      setErrorMessageStep1("Por favor, preencha todos os campos");
      return;
    }

    // Verifica se a data de início do evento é anterior à data atual
    const currentDate = new Date(); // Data atual
    if (eventStartAndEndDates.from < currentDate) {
      setErrorMessageStep1(
        "A data de início não pode ser anterior à data atual."
      );
      return;
    }
    setErrorMessageStep1("");
    setIsGuestsInputOpen(true);
  }
  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }
  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }
  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }
  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessageEmail("");
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();
    if (!email) {
      return;
    }
    if (emailToInvite.includes(email)) {
      setErrorMessageEmail("Esse e-mail já foi convidado!");
      return;
    }
    setEmailToInvite([...emailToInvite, email]);
    event.currentTarget.reset();
  }

  function removeEmailToInvites(emailToRemove: string) {
    const newList = emailToInvite.filter((email) => email !== emailToRemove);
    setEmailToInvite(newList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destination) {
      return;
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return;
    }

    if (emailToInvite.length === 0) {
      return;
    }

    if (!ownerName || !ownerEmail) {
      setErrorMessageConfirmTrip("Por favor, informe o seu nome e email");
      return;
    }
    if (emailToInvite.includes(ownerEmail)) {
      setErrorMessageConfirmTrip(
        "Esse e-mail faz parte da lista de convidados, informe um email diferente!"
      );
      return;
    }
    setErrorMessageConfirmTrip("");

    const response = await api.post("/trips", {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data;

    navigate(`/trip/${tripId}`);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-6">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>
        <div className="space-y-4">
          <DestinationAndDate
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
            errorMessageStep1={errorMessageStep1}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailToInvite={emailToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </div>
        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br />
          com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade
          </a>
          .
        </p>
      </div>
      {isGuestsModalOpen && (
        <InviteGuestsModal
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          emailToInvite={emailToInvite}
          removeEmailToInvites={removeEmailToInvites}
          errorMessage={errorMessageEmail}
        />
      )}
      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          eventEndDate={eventStartAndEndDates?.to?.toString()}
          eventStartDate={eventStartAndEndDates?.from?.toString()}
          destination={destination}
          errorMessageConfirmTrip={errorMessageConfirmTrip}
        />
      )}
    </div>
  );
}

export default CreateTripPage;
