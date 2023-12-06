"use client";

import { useState } from "react";

export default function Login() {
  // const [buttonLoading, setButtonLoading] = useState(false);
  return (
    <div className="form-control">
      <label htmlFor="loginName" className="label">
        <span className="label-text">Connect Wallet</span>
      </label>
      <button className={"btn"} type='button'>
        Connect     
      </button>
      <label htmlFor="loginPassword" className="label">
        <span className="label-text">Password</span>
      </label>
      <input
        type="password"
        id="loginPassword"
        name="loginPassword"
        placeholder="password"
        className="input input-bordered"
        minLength={3}
        required
      />
    </div>
  );
}
