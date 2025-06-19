import { Module } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { TaxCalculatorService } from './tax-calculator/tax-calculator.service';
import { TaxStrategyService } from './tax-strategy/tax-strategy.service';

@Module({
  providers: [TaxesService, TaxCalculatorService, TaxStrategyService]
})
export class TaxesModule {}
