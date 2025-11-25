import { useWalletStore } from "../../store/walletStore";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import * as S from "./styles";
import QRCode from "react-qr-code";
import { PrimaryButton } from "../../styles";

export default function Deposit() {
  const { address } = useWalletStore();

  if (!address) {
    return (
      <>
        <Header />
        <S.Container>
          <S.Card>
            <h1>No wallet found</h1>
            <p>Please create or import a Solana wallet first.</p>
          </S.Card>
        </S.Container>
        <Footer />
      </>
    );
  }

  const copyAddress = () => navigator.clipboard.writeText(address);

  return (
    <>
      <Header />

      <S.Container>
        <S.Card>
          <h1>Deposit SOL</h1>
          <p>Send SOL to your personal deposit address</p>

          <S.QRWrapper>
            <QRCode value={address} size={180} />
          </S.QRWrapper>

          <S.AddressBox>
            <strong>Your SOL Address</strong>
            <p>{address}</p>
            <PrimaryButton className="btn-sm" onClick={copyAddress}>
              Copy Address
            </PrimaryButton>
          </S.AddressBox>

          <S.InfoText>
            Deposits are generally confirmed in less than 5 seconds.
          </S.InfoText>
        </S.Card>
      </S.Container>

      <Footer />
    </>
  );
}
