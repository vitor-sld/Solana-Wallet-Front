import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background);
  color: var(--foreground);
`;

export const Box = styled.div`
  background: rgba(13, 5, 22, 0.5);
  border: 1px solid rgba(157, 78, 221, 0.4);
  padding: 32px;
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  text-align: center;

  input {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid rgba(157, 78, 221, 0.3);
    background: rgba(255, 255, 255, 0.05);
    color: white;
    margin-bottom: 16px;
  }

  button {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    background: rgba(157, 78, 221, 0.25);
    border: 1px solid rgba(157, 78, 221, 0.6);
    cursor: pointer;
    margin-bottom: 10px;

    &:hover {
      background: rgba(157, 78, 221, 0.4);
    }
  }
`;
