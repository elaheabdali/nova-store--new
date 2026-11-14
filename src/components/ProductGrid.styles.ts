import styled from 'styled-components';

export const Section = styled.section`
  padding: 74px 0 82px;
  scroll-margin-top: 90px;
`;
export const SectionTop = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 25px;
  margin-bottom: 25px;
  .eyebrow {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.orange};
    font-weight: 900;
    letter-spacing: 1px;
    margin-bottom: 9px;
  }
  .title {
    font-size: clamp(24px, 3vw, 32px);
    font-weight: 900;
    margin: 0 0 10px;
    color: ${({ theme }) => theme.colors.navy};
  }
  .desc {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.muted};
    margin: 0;
    line-height: 1.8;
  }
`;
export const CategoryRow = styled.div`
  display: flex;
  gap: 9px;
  overflow: auto;
  padding: 3px 1px 17px;
  scrollbar-width: thin;
`;
export const CategoryChip = styled.button<{ $active?: boolean }>`
  white-space: nowrap;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.colors.orange : theme.colors.border)};
  background: ${({ $active, theme }) => ($active ? theme.colors.orangeSoft : theme.colors.surface)};
  color: ${({ $active, theme }) => ($active ? theme.colors.orange : theme.colors.muted)};
  padding: 9px 15px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 800;
`;
export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin: 5px 0 21px;
`;
export const Sort = styled.label`
  display: flex;
  align-items: center;
  gap: 9px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;
  select {
    height: 39px;
    min-width: 150px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 9px;
    padding: 0 10px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
  }
`;
export const ResultCount = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  gap: 19px;
  @media (max-width: 850px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }
  @media (max-width: 520px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }
`;
export const ProductCard = styled.article`
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 420px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 17px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.colors.shadow};
  }
  @media (max-width: 520px) {
    min-height: 365px;
  }
`;
export const ImageWrap = styled.div`
  height: 250px;
  min-height: 250px;
  max-height: 250px;
  flex: 0 0 250px;
  box-sizing: border-box;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 42px 24px 20px;
  position: relative;
  img {
    display: block;
    flex: 0 1 auto;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    object-position: center;
  }
  @media (max-width: 650px) {
    height: 205px;
    min-height: 205px;
    max-height: 205px;
    flex-basis: 205px;
    padding: 38px 16px 16px;
  }
  @media (max-width: 420px) {
    height: 170px;
    min-height: 170px;
    max-height: 170px;
    flex-basis: 170px;
    padding: 36px 12px 12px;
  }
`;
export const CategoryTag = styled.span`
  position: absolute;
  top: 13px;
  inset-inline-start: 13px;
  padding: 6px 9px;
  border-radius: 99px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 10px;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const ProductInfo = styled.div`
  padding: 16px 17px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-width: 0;
  min-height: 170px;
  @media (max-width: 520px) {
    padding: 12px;
    min-height: 155px;
    gap: 8px;
  }
`;
export const ProductTitle = styled.h3`
  font-size: 13px;
  line-height: 1.75;
  margin: 0;
  min-height: 46px;
  min-width: 0;
  color: ${({ theme }) => theme.colors.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: anywhere;
  @media (max-width: 520px) {
    font-size: 11px;
    min-height: 41px;
  }
`;
export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.muted};
  svg {
    color: #e9a32e;
    fill: #e9a32e;
  }
`;
export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
  padding-top: 7px;
  flex-wrap: wrap;
  strong {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.navy};
  }
  @media (max-width: 520px) {
    strong {
      font-size: 12px;
    }
  }
`;
export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  min-height: 42px;
  flex: 0 0 auto;
  border: 0;
  border-radius: 9px;
  background: ${({ theme }) => theme.colors.orange};
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  margin-top: 5px;
  transition:
    filter 0.18s ease,
    transform 0.18s ease;
  &:hover {
    filter: brightness(0.96);
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;
export const Notice = styled.div`
  margin: 0 0 15px;
  padding: 10px 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.orangeSoft};
  color: ${({ theme }) => theme.colors.orange};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const State = styled.div`
  min-height: 250px;
  display: grid;
  place-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  gap: 13px;
  button {
    justify-self: center;
  }
`;
export const Pager = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 30px;
  button {
    min-width: 37px;
    height: 37px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 9px;
    font-size: 12px;
  }
  .active {
    background: ${({ theme }) => theme.colors.navy};
    color: ${({ theme }) =>
      theme.mode === 'dark' ? theme.colors.background : '#ffffff'};
    border-color: ${({ theme }) => theme.colors.navy};
    font-weight: 800;
  }
  button:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;