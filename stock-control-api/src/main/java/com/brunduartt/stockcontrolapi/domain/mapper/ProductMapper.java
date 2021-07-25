package com.brunduartt.stockcontrolapi.domain.mapper;

import com.brunduartt.stockcontrolapi.domain.Product;
import com.brunduartt.stockcontrolapi.domain.dto.ProductDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {

    Product toEntity(ProductDTO dto);

    ProductDTO toDto(Product entity);

}
