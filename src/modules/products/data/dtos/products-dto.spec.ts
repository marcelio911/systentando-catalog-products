import { DiscountEvent, DiscountType, PriceDto, ProductsDto } from './products-dto';

describe('ProductsDto', () => {
  it('should be defined', () => {
    expect(new ProductsDto()).toBeDefined();
  });
});

describe('get PriceDto amount into ProductDtoArr', () => {
  it('should be defined', () => {
    const priceDto = new PriceDto()

    priceDto.setDiscount({
      discount: 10,
      event: DiscountEvent.MARKDOWN,
      type: DiscountType.PERCENT,
    })
    priceDto.setComissionPerTransaction(20);
    const product = new ProductsDto();
    product.setPrice(priceDto);
    product.setName('Vestido Rodado Colorido Infantil');
    product.setDescription('');

    product.setSupplierID('');
    product.setUrl('');
    product.setAffiliateUrl('https://s.shopee.com.br/3fjw2r5F88?share_channel_code=1');
    product.setAffiliateID('941760939');
    priceDto.setCostPrice(37);
    product.setThumbnailUrl(new URL('https://down-br.img.susercontent.com/file/br-11134207-7r98o-lw55njobgk8m2b'));
    product.setImageUrls([
      'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lw55njobhyt285',
      'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lw55njobkrxyce',
      'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lw55njobf5o6b2',
    ]);

    product.setBrand('Dfina Kids');
    product.setRecommendedAge('3 - 4 anos');
    product.setModel('');
    product.setColor('');
    product.setDimentions({ weight: 0, height: 0, width: 0, length: 0 });
    
    console.log('product', product);

    expect(product).toBeDefined();
  });
});

