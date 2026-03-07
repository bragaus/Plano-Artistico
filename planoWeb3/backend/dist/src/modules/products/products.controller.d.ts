import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<import("./entities/product.entity").Product[]>;
    findOne(id: string): Promise<import("./entities/product.entity").Product>;
    create(dto: CreateProductDto): Promise<import("./entities/product.entity").Product>;
    update(id: string, dto: UpdateProductDto): Promise<import("./entities/product.entity").Product>;
    remove(id: string): Promise<import("./entities/product.entity").Product>;
}
