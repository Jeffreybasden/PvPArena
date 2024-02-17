"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useContext, useState } from "react";

import { SessionContext } from "@/context/session";
import { createGame } from "@/lib/game";

export default function CreateGame() {
  const session = useContext(SessionContext);
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter();
  async function submitCreateGame(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session?.user?.id) return;
    setButtonLoading(true);

    const target = e.target as HTMLFormElement;
    const unlisted = target.elements.namedItem("createUnlisted") as HTMLInputElement;
    const tokenAmount = (target.elements.namedItem("tokenAmount") as HTMLInputElement).value;
    const startingSide = (target.elements.namedItem("createStartingSide") as HTMLSelectElement).value;
    const token = (target.elements.namedItem("token") as HTMLSelectElement).value
    console.log('tokenAmount: ',tokenAmount)
    console.log('token :',token)
    const game = await createGame(startingSide, unlisted.checked, token, tokenAmount);

    if (game) {
      router.push(`/${game.code}`);
    } else {
      setButtonLoading(false);
      // TODO: Show error message
    }
  }

  return (
    <form className="form-control space-y-4" onSubmit={submitCreateGame}>
    <div className="flex items-center">
      <input type="checkbox" className="checkbox" name="createUnlisted" id="createUnlisted" />
      <label className="label cursor-pointer ml-2">
        <span className="label-text">Unlisted/invite-only</span>
      </label>
    </div>
    {/* This for the coins */}
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Choose Token</span>
      </label>
      <select className="select select-bordered" name="token" id="Token">
        <option value="ETH">ETH  10% fee</option>
        <option value="PVP">PvP  5% fee</option>
      </select>
    </div>
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Select your side</span>
      </label>
      <select className="select select-bordered" name="createStartingSide" id="createStartingSide">
        <option value="random">Random</option>
        <option value="white">White</option>
        <option value="black">Black</option>
      </select>
    </div>
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Wager Amount</span>
      </label>
      <input type="number" className="input input-bordered" name="tokenAmount" id="tokenAmount" step="0.0000001" />
    </div>
    <button
      className={
        "btn" +
        (buttonLoading ? " loading" : "") +
        (!session?.user?.id ? " btn-disabled text-base-content" : "")
      }
      type="submit"
    >
      Create
    </button>
  </form>
  
  );
}
