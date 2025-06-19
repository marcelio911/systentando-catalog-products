import { roundNumber } from "../../utils/numbers";

export enum DiscountEvent {
  OFFERS = 'OFFERS',
  PROMOTION = 'PROMOTION',
  MARKDOWN = 'MARKDOWN'
}

export enum DiscountType {
  PERCENT = 'percent',
  FIXED = 'fixed'
}

export class PriceDto {


  productValue: number;
  costPrice: number;
  discount?: number;
  event?: DiscountEvent;
  type?: DiscountType;
  currency: 'BRL';
  comissionPerTransaction?: number;
  taxes?: number;

  setComissionPerTransaction(value: number) {
    this.comissionPerTransaction = value;
  }

  setCostPrice(value: number) {
    this.costPrice = value;
  }
  setDiscount({ discount, type, event }: {
    discount: number,
    type: DiscountType,
    event: DiscountEvent
  }) {
    // calculate discount per type

    this.discount = discount;
    this.type = type;
    this.event = event;
  }
  comissionCalc(): number {
    return this.productValue * (this.comissionPerTransaction || 0);
  }

  amount(): number {
    this.productValue = roundNumber(this.costPrice - (this.discount || 0));
    //calc taxes
    this.productValue = this.productValue + this.comissionCalc() + this.calcTaxes();
    return this.productValue;
  }
  calcTaxes(): number {
    // TODO: considered rules of taxes attributes
    return this.productValue * (this.taxes || 0)
  }


}

export class ProductsDto {
  _id: string;
  name: string;
  description: string;

  supplierID: string;
  url: string;

  affiliateUrl?: string;
  affiliateID?: string;

  //price
  price: PriceDto;

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

  unidadeMedida: 'UN' | 'KG' | 'M' | 'L'; // ... adicione outras unidades

  informacoesFiscais: {
    cest?: string; // Quando aplicável
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
    icmsSt?: { // Informações para Substituição Tributária
      baseDeCalculo: number;
      aliquota: number;
      mva: number;
    };
  };


  // pensando em tributacao quais campos necessários ainda faltam ?


  setPrice(priceDto: PriceDto) {
    this.price = priceDto;
  }
  setName(text: string) {
    this.name = text;
  }
  setDescription(text: string) {
    this.description = text;
  }
  setSupplierID(ID: string) {
    this.supplierID = ID;
  }
  setUrl(text: string) {
    this.url = text;
  }
  setRecommendedAge(ages: string) {
    this.recommendedAge = ages;
  }
  setAffiliateUrl(url: string) {
    this.affiliateUrl = url;
  }
  setAffiliateID(ID: string) {
    this.affiliateID = ID;
  }
  setThumbnailUrl(url: URL) {
    this.thumbnailUrl = url;
  }
  setImageUrls(array: string[]) {
    this.imageUrl = array;
  }
  setBrand(text: string) {
    this.brand = text;
  }
  setModel(text: string) {
    this.model = text;
  }
  setColor(type: string) {
    this.color = type;
  }
  setDimentions(obj: { weight: number; height: number; width: number; length: number; }) {
    this.dimensions = obj;
  }
  setQuantityInStock(amount: number) {
    this.quantityInStock = amount;
  }
}
