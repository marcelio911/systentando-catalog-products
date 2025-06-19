import { Injectable } from "@nestjs/common";
import Shopee from "shopee";
import { MarketPlace } from "../utils/market-places";

@Injectable()
export class ScrappingService {

  constructor() { }

  request(productUrl: string) {
    try {
      const marketPlace = MarketPlace.checkUrl(productUrl);
      switch (marketPlace) {
        case MarketPlace.AMAZON:
          this.requestAmazon(productUrl);
          break;
        case MarketPlace.SHOPEE:
          this.requestShopee(productUrl);
          break;
        case MarketPlace.SHEIN:
          this.requestShein(productUrl);
          break;
        default:
          null;
      }
    } catch (error) {
      console.error(error);
    }
  }

  private async requestShopee(productUrl: string) {
    try {

          // TODO: implementar search OPEN PLATFORM SHOPEE
          const shopee = new Shopee(Shopee.BASE_URL.BRAZIL);

          async function run() {
            const product = await shopee.search({
              query: productUrl,
              orderBy: Shopee.SEARCH.ORDER_BY.PRICE,
              orderType: Shopee.SEARCH.ORDER_TYPE.ASC,
              shippings: [
                Shopee.SEARCH.SHIPPING.JNE_REGULAR,
                Shopee.SEARCH.SHIPPING.SI_CEPAT_REG
              ],
              locations: ["Sao paulo", "Ceara", "Pernambuco"],
              priceMax: 30000000
            });
            console.log(product[0].name);
          }

          run();
      } catch (error) {
        console.error(error);
      }
    }

    private async requestAmazon(productUrl: string) {
      try {
        // TODO: implementar search OPEN PLATFORM AMAZON
      } catch (error) {
        console.error(error);
      }
    }

    private async requestShein(productUrl: string) {
      try {
        // TODO: implementar search OPEN PLATFORM SHEIN
      } catch (error) {
        console.error(error);
      }
    }
  
}