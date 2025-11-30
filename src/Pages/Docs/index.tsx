"use client";

import React from "react";
import { Circle, Square, Ban, Lock, Check } from "lucide-react";
import * as S from "./styles";
import { Header } from "../../Components/Header";

export default function CoreConcepts() {
  return (
    <S.Section>
      <S.SectionTitle title="Core Concepts" />

      <S.ListWrapper>
        <ConceptCard
          title="Shielded Notes"
          icon="orbit"
          description="When you deposit into Veilfi, your assets are converted into shielded notes — encrypted commitments that represent value inside the privacy pool."
          code={`note = (asset_id, amount, recipient_pkd, rho, r, memo)\ncommitment = Poseidon(note)`}
          codeHasSecondLine
        />

        <ConceptCard
          title="Merkle Tree"
          icon="square"
          description="Every shielded note creates a new commitment built into the on-chain Merkle tree. This allows users to later prove membership (ownership) of a note without revealing it."
        />

        <ConceptCard
          title="Nullifiers"
          icon="ban"
          description="To prevent double-spends, every time a note is consumed (spent), a nullifier hash is published. Once a nullifier exists on-chain, that note can never be used again."
        />

        <ConceptCard
          title="Zero-Knowledge Proofs"
          icon="shield"
          description="When spending or withdrawing, the wallet generates a zk/SNARK proof that:"
          hasList
        />
      </S.ListWrapper>
    </S.Section>
  );
}

interface ConceptCardProps {
  title: string;
  description: string;
  code?: string;
  hasList?: boolean;
  icon?: IconName;
  codeHasSecondLine?: boolean;
}

export type IconName = "orbit" | "square" | "ban" | "shield" | "check";

function ConceptCard({ title, description, code, hasList, icon }: ConceptCardProps) {
  const iconMap: Record<IconName, React.ReactNode> = {
    orbit: <Circle size={20} color="#a855f7" />,
    square: <Square size={20} color="#a855f7" />,
    ban: <Ban size={20} color="#a855f7" />,
    shield: <Lock size={20} color="#a855f7" />,
    check: <Check size={20} color="#a855f7" />,
  };

  return (
    <>
    <S.Section>
    <S.Card>
      <S.CardTitle>
        {icon && iconMap[icon]}
        {title}
      </S.CardTitle>

      <S.Description>{description}</S.Description>

      {code && (
        <S.CodeBlock>
          {code.split("\n").map((line, i) => (
            <S.CodeLine key={i} second={i > 0}>
              {line}
            </S.CodeLine>
          ))}
        </S.CodeBlock>
      )}

      {hasList && (
        <S.List>
          <li>The note exists in the Merkle tree</li>
          <li>The user owns it (knows the secret)</li>
          <li>It hasn't been spent yet</li>
          <li>Inputs = Outputs + Fee</li>
        </S.List>
      )}
    </S.Card>
    </S.Section>
    </>
  );
}
