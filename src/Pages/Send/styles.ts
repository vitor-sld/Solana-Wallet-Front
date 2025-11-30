// src/Pages/Send/styles.ts
import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-items: center;
  background: var(--background);
  color: var(--foreground);
  display: grid;
  grid-template-rows: 100px 1fr;
  justify-content: center;
  align-items: center;
`;


/* NAVBAR FIXED + RESPONSIVA */
export const NavBar = styled.div`
  width: 520px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;

  button {
    display: flex;
    align-items: center;
    justify-content: left ;
    background: none;
    border: none;
    color: var(--muted-foreground);
    cursor: pointer;
    font-size: 16px;
    padding: 8px;
    flex: 1;

    &:hover {
      color: var(--foreground);
    }
  }

  h2 {
    flex: 1;
    font-size: 1.2rem;
    color: var(--foreground);
    text-align: center;
  }
`;


export const Box = styled.div`
margin-top: -50px;
  width: 100%;
  height: auto;
  max-width: 640px;
  background: rgba(13, 5, 22, 0.6);
  border: 1px solid rgba(157, 78, 221, 0.3);
  padding: 24px;
  border-radius: 16px;
  text-align: center;
`;

export const Field = styled.div`
margin-top: 30px;
  margin-bottom: 14px;

  label {
    display: block;
    font-size: 0.85rem;
    color: #cfc6e6;
    margin-bottom: 6px;
    text-align: left;
  }

  input {
    width: 100%;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.02);
    color: var(--foreground);
    font-size: 0.95rem;
  }

  .mono {
    font-family: "Menlo", "Courier New", monospace;
    background: rgba(255, 255, 255, 0.02);
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.04);
  }

  button.quick {
    background: rgba(157, 78, 221, 0.18);
    border: 1px solid rgba(157, 78, 221, 0.5);
    color: #f3e9ff;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
  }

  button.info {
    background: transparent;
    border: 1px dashed rgba(255, 255, 255, 0.06);
    color: #ddd;
    padding: 8px 10px;
    border-radius: 8px;
    cursor: pointer;
  }

  button.primary {
    background: linear-gradient(90deg, #9d4edd, #7c3aed);
    color: #fff;
    border: none;
    padding: 10px 16px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
  }

  button.secondary {
    background: transparent;
    color: #cfc6e6;
    border: 1px solid rgba(255, 255, 255, 0.04);
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
  }
`;

export const Info = styled.div`
display: flex;
margin-top: 20px;
gap: 10px;
color:  white;
padding: 10px;
background-color:rgba(73, 0, 4, 0.5);
border-radius: 7px;

.alert{
  width:16px;
  stroke: white;
  
}
`

