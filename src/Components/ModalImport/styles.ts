// src/Components/ModalImport/styles.ts
import styled from "styled-components";

export const ModalContainer = styled.div`
  background: var(--secondary);
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  padding: 32px;
  border-radius: 16px;
  max-width: 420px;
   box-shadow:
    0 0 30px rgba(157, 78, 221, 0.3),
    inset 0 0 20px rgba(157, 78, 221, 0.1);
  animation: scaleIn 0.25s ease; 
  width: 90%;

  label{
  margin-bottom: 10px;

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
    font-size: 1.8rem;
  }

  h3 {
    color: var(--foreground);
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  p {
    color: var(--muted-foreground);
  }
`;

export const Label = styled.label`
margin-bottom: 10px;
`

/* 🔥 CORRIGIDO: era Input, agora é TextArea */
export const TextArea = styled.textarea`
  width: 100%;
  min-height: 110px;
  resize: none;
  margin-top: 25px;

  background: #101010;
  border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
  color: var(--foreground);

  border-radius: 10px;
  padding: 14px;
  font-size: 0.95rem;
  line-height: 1.4;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

export const ErrorMsg = styled.p`
  color: #ff5b5b;
  font-size: 0.9rem;
  margin-bottom: 14px;
  text-align: center;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: end;
  gap: 14px;
  margin-top: 10px;
`;

export const SecondaryButton = styled.button`
  padding: 14px;
  border: 1px solid color-mix(in srgb, var(--primary) 30%, transparent);
  border-radius: 10px;
  background: transparent;
  color: var(--foreground);
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #222;
  }
`;

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

export const PageContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Box = styled.div`
  background: var(--secondary);
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  box-shadow:
    0 0 30px rgba(157, 78, 221, 0.3),
    inset 0 0 20px rgba(157, 78, 221, 0.1);
  border-radius: 16px;
  padding: 32px;
  width: 90%;
  max-width: 420px;
  animation: scaleIn 0.25s ease;

  @keyframes scaleIn {
    from { transform: scale(0.92); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;
