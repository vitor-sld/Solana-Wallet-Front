import styled from "styled-components"

export const Section = styled.section`
  margin-bottom: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 24px;
`

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const Card = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 12px;
  padding: 24px;
`

export const CardTitle = styled.h3`
  color: #fff;
  font-weight: 600;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Description = styled.p`
  color: #9ca3af;
  font-size: 14px;
  margin-bottom: 12px;
`

export const CodeBlock = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  overflow-x: auto;
  font-family: monospace;
  font-size: 12px;
  color: #4ade80;
  white-space: pre-line;
`

export const CodeLine = styled.div<{ second?: boolean }>`
  color: ${({ second }) => (second ? "#60a5fa" : "#4ade80")};
`

export const List = styled.ul`
  color: #9ca3af;
  font-size: 14px;
  margin-left: 16px;
  list-style: disc;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #fff;
  }

  .icon {
    width: 20px;
    height: 20px;
    color: #22c55e;
  }
`;
