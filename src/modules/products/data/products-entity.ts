export interface Product {
  _id: string;
  name: string;
  description: string;

  supplierID: string;
  url: string;

  affiliateUrl?: string;
  affiliateID?: string;

  //price
  price: Price;

  //assets
  thumbnailUrl: URL;
  imageUrl?: string[];

  brand?: string;
  model?: string;
  color?: string;
  recommendedAge?: string;
  dimensions: { weight: number; height: number; width: number; length: number; };
  quantityInStock?: number;

  createdAt: number;
  updatedAt?: number;
  isDeleted?: boolean;

  ncm: string; // Ex: "8517.12.00"
  ean13: string; // Código de barras
  sku: string;

  unidadeMedida: 'UN' | 'KG' | 'M' | 'L';

  informacoesFiscais: {
    cest?: string;
    isento: boolean;
    naoTributado: boolean;
    tributadoIntegralmente: boolean;
    estadoOrigem?: string;
    certificacoes?: string[];
    icmsPorEstado: {
      [estado: string]: {
        origem: 'Interna' | 'Externa';
        aliquota: number;
      }
    };
    icmsSt?: {
      baseDeCalculo: number;
      aliquota: number;
      mva: number;
    };
  };
}

export enum DiscountEvent {
  OFFERS = 'OFFERS',
  PROMOTION = 'PROMOTION',
  MARKDOWN = 'MARKDOWN'
}

export enum DiscountType {
  PERCENT = 'percent',
  FIXED = 'fixed'
}

export interface Price {


  productValue: number;
  costPrice: number;
  discount?: number;
  event?: DiscountEvent;
  type?: DiscountType;
  currency: 'BRL';
  comissionPerTransaction?: number;
  taxes?: number;
}