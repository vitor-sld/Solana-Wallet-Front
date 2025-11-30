import { useState } from "react";
import { PrimaryButton } from "../../styles";
import ModalCreate from "../ModalCreate";
import ModalImport from "../ModalImport";
import * as S from "./styles";
import { Shield, Eye, Lock, Zap, Key, CheckCircle2 } from "lucide-react";

export function PrivacyTech() {
  const [open, setOpen] = useState(false);
  
  const [openCreate, setOpenCreate] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  
  
  return (
    <S.Section id="privacyTech">
      

        <S.CTA>
          <h3>Your Privacy is Guaranteed</h3>
          <p>Veilfi uses cutting-edge zero-knowledge cryptography to ensure complete privacy. Your transaction details are mathematically proven to be private without revealing any information.</p>
            <S.Button onClick={() => setOpenCreate(true)}>
              Read Techinical Docs →
            </S.Button>
          
        </S.CTA>
    </S.Section>
  );
}
