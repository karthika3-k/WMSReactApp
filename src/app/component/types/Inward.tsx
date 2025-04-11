export interface Inward {
  id: number;
  docEntry: number | null;
  docNum: number | null;
  docDate: string | null; // ISO string format (e.g., "2025-04-08T12:34:56Z")
  transType: number | null;
  cardCode: string | null;
  cardName: string | null;
  itemCode: string | null;
  itemName: string | null;
  quantity: number | null;
  createdDateTime: string | null; // ISO string
  userSign: string | null;
  isAllocated : string | null;
}
