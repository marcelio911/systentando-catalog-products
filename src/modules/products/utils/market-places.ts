
export const MarketPlace = {
  AMAZON: 'amazon',
  SHOPEE: 'shopee',
  ALIEXPRESS: 'aliexpress',
  SHEIN: 'shein',
  checkUrl: (url: string) => {
    // url contains amazon ou shopee ou aliexpress ou shein
    if (url.includes('amazon')) {
      return MarketPlace.AMAZON;
    }
    if (url.includes('shopee')) {
      return MarketPlace.SHOPEE;
    }
    if (url.includes('aliexpress')) {
      return MarketPlace.ALIEXPRESS;
    }
    if (url.includes('shein')) {
      return MarketPlace.SHEIN;
    }
    return null;
  },
}