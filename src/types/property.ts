// types/property.ts

export type PropertyStatus = 'FOR SALE' | 'FOR RENT' | 'SOLD';
export type ListingType = 'Just listed' | 'Price reduced' | 'Foreclosure';

export interface Property {
  imageUrl: string | null; // ✅ Replaced `any` with explicit type
  address: string;
  id: number;
  status: PropertyStatus;
  listingType?: ListingType;
  price: number;
  arvPrice?: number;
  county: string;
  city: string;
  state: string;
  zip: string;
  beds: number;
  baths: number;
  sqft: number;
}
