import styled from "styled-components";
import { PrimaryButton } from "../../styles";

interface ModalProps {
  error?: boolean;
}

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #120720;
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: fadeIn 0.25s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const Description = styled.div`
  width: 96%;
  max-width: 600px;
  font-weight: 200;
  margin-bottom: 20px;

  h2 {
    font-size: 30px;
  }

  p {
    padding-top: 10px;
    opacity: 0.7;
  }

  @media (max-width: 480px) {
    h2 { font-size: 22px; }
    p { font-size: 0.85rem; }
  }
`;

export const ModalContainer = styled.div<ModalProps>`
  background: var(--secondary);
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  padding: 32px;
  border-radius: 16px;
  max-width: 600px;
  width: 96%;
  animation: scaleIn 0.25s ease;

  ${({ error }) =>
    error &&
    `
      border-color: #ff3b3b !important;
      animation: shake 0.3s ease;
    `
  }

  @keyframes scaleIn {
    from { transform: scale(0.92); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @keyframes shake {
    0% { transform: translateX(0); }
    20% { transform: translateX(-4px); }
    40% { transform: translateX(4px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
    100% { transform: translateX(0); }
  }

  h2 {
    color: var(--foreground);
    margin-bottom: 8px;
    font-size: 1rem;
  }

  h3 {
    color: var(--foreground);
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    padding: 22px;
    h3 { font-size: 1rem; }
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  background: #111;
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  color: var(--foreground);
  font-size: 1rem;

  &:focus {
    outline: 2px solid var(--primary);
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 10px 14px;
  }
`;

export const SeedBox = styled.div`
  background: #111;
  border: 1px solid color-mix(in oklab, var(--primary) 25%, transparent);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  color: var(--foreground);
  font-size: 0.95rem;
  line-height: 1.4;
  word-break: break-word;
  position: relative;
  height: 200px;

  button {
    position: absolute;
    bottom: 8px;
    right: 8px;
    padding: 8px 12px;
    font-size: 0.75rem;
    border-radius: 6px;
    background: var(--primary);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: .25s;

    &:hover {
      background: color-mix(in oklab, var(--primary) 80%, white);
    }
  }

  @media (max-width: 480px) {
    height: 150px;
    font-size: 0.9rem;
    button {
      padding: 6px 10px;
      font-size: 0.7rem;
    }
  }
`;

export const CheckRow = styled.div`
  display: flex;
  align-items: start;
  gap: 10px;
  margin-bottom: 20px;

  label {
    color: var(--foreground);
    font-size: 0.8rem;
    font-weight: 200;
    line-height: 1.3;
    margin-top: -4px;
  }

  &.error span {
    color: #ff3b3b;
  }

  @media (max-width: 480px) {
    label { font-size: 0.75rem; }
  }
`;

export const ErrorMsg = styled.div`
  color: #ff3b3b;
  font-size: 0.9rem;
  margin-bottom: 16px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

export const SecondaryButton = styled.button`
  padding: 12px 20px;
  background: transparent;
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  color: var(--foreground);
  border-radius: 8px;
  cursor: pointer;
  transition: .25s;

  &:hover {
    background: color-mix(in oklab, var(--primary) 10%, transparent);
  }
`;

export const PrimaryButtonStyled = styled(PrimaryButton)`
  padding: 12px 20px;
`;
