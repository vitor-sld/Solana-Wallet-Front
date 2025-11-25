import styled from "styled-components";
import { fontSizes } from "../../styles";

export const Container = styled.section`
  min-height: 100vh;
  padding: 140px 24px 80px;

  background: radial-gradient(
      circle at top,
      rgba(157, 78, 221, 0.15),
      transparent 50%
    ),
    linear-gradient(135deg, #000, #13031f 40%, #000);
`;

export const Card = styled.div`
  margin: 0 auto;
  max-width: 600px;
  background: rgba(15, 15, 20, 0.85);
  backdrop-filter: blur(14px);

  border-radius: 22px;
  padding: 40px;

  border: 1px solid color-mix(in oklab, var(--primary) 22%, transparent);
  box-shadow:
    0 0 35px rgba(157, 78, 221, 0.28),
    inset 0 0 22px rgba(157, 78, 221, 0.12);

  text-align: center;
  transition: 0.25s ease;
`;

export const Title = styled.h1`
  font-size: ${fontSizes.xlarge};
  color: var(--foreground);
  font-weight: 600;
  letter-spacing: -0.5px;
  margin-bottom: 12px;
`;

export const AddressText = styled.p`
  color: var(--muted-foreground);
  word-break: break-all;
  margin-bottom: 25px;
  font-size: ${fontSizes.small};
  opacity: 0.9;
`;

export const BalanceBox = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 22px 18px;
  margin-bottom: 32px;

  border: 1px solid rgba(157, 78, 221, 0.2);

  box-shadow:
    inset 0 0 18px rgba(157, 78, 221, 0.12),
    0 0 12px rgba(157, 78, 221, 0.15);

  strong {
    display: block;
    font-size: 2.2rem;
    margin-top: 6px;
    color: var(--foreground);
    font-weight: 700;
  }

  p {
    margin-top: 6px;
    font-size: ${fontSizes.medium};
    color: var(--foreground);
  }
`;

export const TokenList = styled.div`
  margin-top: 20px;
  text-align: left;
`;

export const TokenItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  strong {
    color: var(--foreground);
    font-size: ${fontSizes.medium};
  }

  span {
    color: var(--primary);
    font-weight: bold;
  }
`;

export const Info = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 18px;

  border: 1px solid color-mix(in oklab, var(--primary) 18%, transparent);

  box-shadow:
    inset 0 0 16px rgba(157, 78, 221, 0.09),
    0 0 12px rgba(157, 78, 221, 0.15);

  word-break: break-all;

  strong {
    display: block;
    font-size: ${fontSizes.small};
    color: var(--muted-foreground);
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  p {
    margin: 0;
    font-size: ${fontSizes.medium};
    color: var(--foreground);
    line-height: 1.45;
  }
`;

export const Actions = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
`;

export const SecondaryButton = styled.button`
  padding: 12px 20px;
  border-radius: 10px;
  background: transparent;

  border: 1px solid color-mix(in oklab, var(--primary) 22%, transparent);
  color: var(--foreground);
  font-weight: 500;

  cursor: pointer;
  transition: 0.2s ease;

  box-shadow: 0 0 10px rgba(157, 78, 221, 0.2);

  &:hover {
    background: color-mix(in oklab, var(--primary) 12%, transparent);
    box-shadow: 0 0 14px rgba(157, 78, 221, 0.35);
    transform: translateY(-2px);
  }
`;
