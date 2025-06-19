// tax-strategy.ts
import { ProductsDto } from '../../products/data/dtos/products-dto';

export interface TaxStrategy {
  calculateTax(product: ProductsDto, estado: string): number;
}

export class ICMSStrategy implements TaxStrategy {
  calculateTax(product: ProductsDto, estado: string): number {
    // ... lógica de cálculo do ICMS ...
    const aliquota = product.informacoesFiscais.icmsPorEstado[estado]?.aliquota || 0;
    // ... lógica de cálculo do ICMS ...
    const icms = aliquota * product.price.amount();
    return icms;
  }
}


export class ICMSCStStrategy implements TaxStrategy {
  calculateTax(product: ProductsDto, estado: string): number {
    // ... lógica de cálculo do ICMS CST ...
    const aliquota = product.informacoesFiscais.icmsSt
      ? product.informacoesFiscais.icmsSt.aliquota
      : 0;
    // ... lógica de cálculo do ICMS CST ...
    const icmsSt = aliquota * product.price.amount();
    return icmsSt;
  }
}

