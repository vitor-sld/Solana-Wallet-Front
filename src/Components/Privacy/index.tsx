
import * as S from "./styles";
import { useNavigate } from "react-router-dom";

export function PrivacyTech() {

  const navigate = useNavigate();

  function redirect() {
    navigate("/docs");
  }

  return (
    <S.Section id="privacyTech">
      <S.CTA>
        <h3>Your Privacy is Guaranteed</h3>
        <p>
          Veilfi uses cutting-edge zero-knowledge cryptography to ensure
          complete privacy. Your transaction details are mathematically proven
          to be private without revealing any information.
        </p>

        <S.Button onClick={redirect}>
          Read Technical Docs →
        </S.Button>
      </S.CTA>
    </S.Section>
  );
}
